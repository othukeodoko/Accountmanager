using Microsoft.EntityFrameworkCore;

namespace AccountManagement.Models
{
    public class CustomerService
    {
        private readonly AppDbContext _context;

        public CustomerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetCommentsForCustomerAsync(int customerId)
        {
            return await _context.Comments
                .Where(c => c.CustomerId == customerId)
                .ToListAsync();
        }

        public async Task AddCommentAsync(int customerId, string commentDetails, string accountId)
        {
            var customer = await _context.Customers
                .Include(c => c.AssignedAgent)
                .FirstOrDefaultAsync(c => c.CustomerId == customerId);

            if (customer == null)
                throw new Exception("Customer not found");

        if (customer.BdOfficerId != accountId)
                throw new UnauthorizedAccessException("You are not authorized to comment on this customer.");

            var comment = new Comment
            {
                CommentDetails = commentDetails,
                CommentDate = DateTime.Now,
                CustomerId = customerId
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
        }
    }

}
