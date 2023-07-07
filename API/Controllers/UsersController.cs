using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // /api/users, controler je placeholder
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            this._context = context;
        }

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