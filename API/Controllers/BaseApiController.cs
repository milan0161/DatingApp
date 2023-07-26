
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //Podsetnik, ovaj atribut ti omogucava izmedju ostalog da ne pises [fromBody], kao i da se validacija izvrsi na dto pre nego da stigne do kontroler, da ga nema, manualno bi morao da proveravas "ModelState" seti se debilka iz pokemonreview
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")] // /api/users, controler je placeholder
    public class BaseApiController : ControllerBase
    {

    }
}