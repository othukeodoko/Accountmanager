using AccountManagement.Models;
using AccountManagement.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AppDbContext _context;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("ValidateLogin")]
        public async Task<IActionResult> Login([FromForm]string username, [FromForm] string password)
        {
            //Loginviewmodel model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var passwordValid = await _userManager.CheckPasswordAsync(user, password);
            if (!passwordValid)
            {
                return BadRequest("Invalid password");
            }
            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault();
            // Retrieve additional user data

            //var UserId = int.Parse(user.Id);
            //var userId = user.Id.ToString(); // Keep UserId as string
                                             // Retrieve LocationName using LocationId
            var location = await _context.Locations.FindAsync(user.LocationId);
            if (location == null)
            {
                return NotFound("Location not found");
            }
            var userData = new Loginviewmodel
            {
                username = user.UserName,
                role = userRole,
                location = location.LocationName, // Add location retrieval logic if needed
                locationId = user.LocationId, // Add location ID retrieval logic if needed
                userId = user.Id,
                agentcode = user.AgentCode,
                //userid = UserId,
            };

            // Generate JWT token (optional)
            // var token = GenerateJwtToken(userData.UserId, userData.Username, ...);
            // return Ok(new { token, userData });

            return Ok(new { userData });
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            var user = new ApplicationUser { UserName = model.Username, Email = model.Email, AgentCode = model.AgentCode, Name=model.Name, LocationId = model.LocationId };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                // Registration successful
                return Ok(result);
            }
            // Registration failed
            return BadRequest(result);
        }
    }
    //public class AuthController : ControllerBase
    //{
    //    private readonly AppDbContext _context;
    //    public AuthController(AppDbContext context)
    //    {
    //        _context = context;   
    //    }
//    [HttpPost("validateLogin")]
//    public async Task<ActionResult<string>> GetLoginData([FromForm] string username, [FromForm] string password)
//    {
//        try
//        {
//            var returnUser = await _context.Users
//                .Select(x => new
//                {
//                    Username = x.Username,
//                    Password = x.Password,
//                    Role = x.Role,
//                    LocationName = x.Location.LocationName,
//                    LocationId = x.Location.LocationId,
//                    UserId = x.UserId,
//                })
//                .FirstOrDefaultAsync(e => e.Username == username && e.Password == password);
//            if (returnUser == null)
//                return NotFound();

//            //var token = GenerateJwtToken(user.FormRefno, user.Surname, user.MobilePhone, user.Ssn, user.Email); // Generate JWT token

//            var userdetails = new Loginviewmodel
//            {
//                username = returnUser.Username,
//                role = returnUser.Role,
//                location = returnUser.LocationName,
//                locationId = returnUser.LocationId,
//                userid = returnUser.UserId,
//            };

//            return Ok(new { userdetails });
//        }
//        catch (Exception ex)
//        {
//            return BadRequest(new { error = ex.Message });
//        }
//    }
//}
}
