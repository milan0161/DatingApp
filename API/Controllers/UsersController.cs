using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this._userRepository = userRepository;
            this._mapper = mapper;
        }

        [HttpGet] //method atribut
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUser()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")] //u uglaste zaglade stavljas params
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberASync(username);


        }
        [HttpGet]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            if(user == null) return NotFound();
            _mapper.Map(memberUpdateDto, user);

            if( await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
            
        }
    }
}
//Ako je asinhrono request se prosledi drugom tredu (delegatu) a u medjuvremenu tred koji je primio request moze da obradjuje druge requeste ili sta drugo treba da radi. Nije blokiran. Kad se zavrsi query main tred pokupi podatka i vraca response kroz response.

//dekoratori [Authorized] [AllowAnonymous]