using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            this._context = context;
        }
        [AllowAnonymous]
        [HttpGet] //method atribut
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        [HttpGet("{id}")] //u uglaste zaglade stavljas params
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);

        }
    }
}
//Ako je asinhrono request se prosledi drugom tredu (delegatu) a u medjuvremenu tred koji je primio request moze da obradjuje druge requeste ili sta drugo treba da radi. Nije blokiran. Kad se zavrsi query main tred pokupi podatka i vraca response kroz response.

//dekoratori [Authorized] [AllowAnonymous]