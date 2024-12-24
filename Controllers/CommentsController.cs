using AccountManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AccountManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly CustomerService _customerService;
        private readonly AppDbContext _context;
        //private readonly IHttpContextAccessor _httpContextAccessor;

        public CommentsController(CustomerService customerService, AppDbContext context)
        {
            _customerService = customerService;
            _context = context;
            //_httpContextAccessor = httpContextAccessor;
        }

        // Retrieve all comments for a customer
        [HttpGet("{customerId}/comments")]
        public async Task<IActionResult> GetComments(int customerId)
        {
            var comments = await _customerService.GetCommentsForCustomerAsync(customerId);
            if (comments == null || !comments.Any())
                return NotFound("No comments found for this customer.");

            return Ok(comments);
        }

        // Post a comment for a customer
        [HttpPost("{customerId}/comments")]
        public async Task<IActionResult> PostComment(
        [FromBody] CommentRequest request)
        {
            try
            {
                await _context.Comments.AddAsync(new Comment
                {
                    CustomerId = request.CustomerId,
                    CommentDetails = request.CommentDetails,
                    CommentDate = DateTime.Now
                });
                await _context.SaveChangesAsync();
                return Ok("Comment added successfully.");
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public class CommentRequest
        {
            public int CustomerId { get; set; }
            public string? CommentDetails { get; set; }
        }

    }
    }
