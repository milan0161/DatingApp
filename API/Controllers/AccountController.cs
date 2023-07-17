using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._context = context;
            this._tokenService = tokenService;
        }

        [HttpPost("register")] //POST: /api/account/register
        public async Task<ActionResult<UserDto>> Register(RegsterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
            {
                return BadRequest("Username is already taken");
            }

            //using koristimo da ne bi zauzimali mesto u memoriju
            //poziva se dispose metoda i oslobadja nam memoriju
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        [HttpPost("login")] //POST: /api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //find je dobar ako znas id
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());

            if (user == null)
            {
                return Unauthorized("Invalid Username");
            }
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid Password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };


        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}