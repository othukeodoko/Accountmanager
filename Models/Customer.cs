using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountManagement.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerId { get; set; }

        [MaxLength(100)]
        public string? Surname { get; set; }

        [MaxLength(100)]
        public string? Firstname { get; set; }

        [MaxLength(100)]
        public string? Othername { get; set; }

        [MaxLength(200)]
        public string? RSAPin { get; set; }

        [MaxLength(50)]
        public string? Email { get; set; }

        [MaxLength(200)]
        public string? MobileNumber { get; set; }

        [MaxLength(20)]
        public string? AUM { get; set; }

        [MaxLength(200)]
        public string? ContactInfo { get; set; }
        //[ForeignKey("BdOfficerId")]
        //public virtual ApplicationUser? BdOfficer { get; set; }
        public string? BdOfficerId { get; set; }
        
        [ForeignKey("AssignedAgentId")]
        public virtual ApplicationUser? AssignedAgent { get; set; }
        public string? AssignedAgentId { get; set; }
        public int? LocationId { get; set; }
        public Location? Location { get; set; }
        public string? AssignmentRequestStatus { get; set; }
        public ICollection<Comment>? CommentDetails { get; set; }
    }
}
