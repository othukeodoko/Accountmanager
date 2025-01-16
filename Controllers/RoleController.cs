using AccountManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AccountManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        //[HttpPost("assign")]
        ////[Authorize(Policy = "AdminPolicy")] // Only allow admins to assign roles
        //public async Task<IActionResult> AssignRole([FromBody] AssignRoleRequest request)
        //{
        //    var user = await _userManager.FindByEmailAsync(request.Email);
        //    if (user == null)
        //    {
        //        return NotFound($"User with email '{request.Email}' not found.");
        //    }

        //    var roleExists = await _roleManager.RoleExistsAsync(request.Role);
        //    if (!roleExists)
        //    {
        //        return BadRequest($"Role '{request.Role}' does not exist.");
        //    }

        //    var isInRole = await _userManager.IsInRoleAsync(user, request.Role);
        //    if (isInRole)
        //    {
        //        return BadRequest($"User '{request.Email}' is already in role '{request.Role}'.");
        //    }

        //    await _userManager.AddToRoleAsync(user, request.Role);

        //    return Ok($"Role '{request.Role}' assigned to user '{request.Email}'.");
        //}
        [HttpPost("assign")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return NotFound($"User with email '{request.Email}' not found.");
                }

                var roleExists = await _roleManager.RoleExistsAsync(request.Role);
                if (!roleExists)
                {
                    return BadRequest($"Role '{request.Role}' does not exist.");
                }

                var isInRole = await _userManager.IsInRoleAsync(user, request.Role);
                if (isInRole)
                {
                    return BadRequest($"User '{request.Email}' is already in role '{request.Role}'.");
                }

                //    await _userManager.AddToRoleAsync(user, request.Role);
                //    return Ok($"Role '{request.Role}' assigned to user '{request.Email}'.");
                //}
                //catch (Exception ex)Microsoft.EntityFrameworkCore.DbUpdateException: 'An error occurred while saving the entity changes. See the inner exception for details
                //{
                //    return StatusCode(500, $"Error assigning role: {ex.Message}");
                //}

                var result = await _userManager.AddToRoleAsync(user, request.Role);
                if (!result.Succeeded)
                {
                    return StatusCode(500, $"Failed to assign role: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }

                return Ok($"Role '{request.Role}' assigned to user '{request.Email}'.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error assigning role: {ex.Message} - Inner Exception: {ex.InnerException?.Message}");
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpGet("roles/{email}")]
        public async Task<IActionResult> GetUserRoles([Required] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"User with email '{email}' not found.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        {
            // Validation
            if (string.IsNullOrEmpty(request.RoleName))
            {
                return BadRequest("Role name is required.");
            }

            var existingRole = await _roleManager.RoleExistsAsync(request.RoleName);
            if (existingRole)
            {
                return BadRequest($"Role '{request.RoleName}' already exists.");
            }

            var newRole = new IdentityRole(request.RoleName);
            var result = await _roleManager.CreateAsync(newRole);

            if (!result.Succeeded)
            {
                return StatusCode(500, $"Error creating role: {result.Errors.FirstOrDefault().Description}");
            }

            return Ok($"Role '{request.RoleName}' created successfully.");
        }
        public class CreateRoleRequest
        {
            [Required]
            public string RoleName { get; set; }
        }

        public class AssignRoleRequest
        {
            public string Email { get; set; }
            public string Role { get; set; }
        }
    }
}
