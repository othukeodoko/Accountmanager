using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountManagement.Models
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long CommentId { get; set; }
        public string? CommentDetails { get; set; }
        public DateTime CommentDate { get; set; }
        // Reference back to the customer
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
    }
}
