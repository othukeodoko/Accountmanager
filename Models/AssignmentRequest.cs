using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace AccountManagement.Models
{
    public class AssignmentRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public int AssignmentRequestId { get; set; }
        
        [MaxLength(50)]
        [JsonIgnore]
        public string? Status { get; set; }
        [JsonIgnore]
        public long? CommentId { get; set; }
        [JsonIgnore]
        public Comment? Comments { get; set; }

        [Required]
        public int CustomerId { get; set; }
        [JsonIgnore]
        public Customer? Customer { get; set; }
        [Required]
        public string? BdOfficerId { get; set; }
        [JsonIgnore]
        public ApplicationUser? AssignedAgent{ get; set; }

    }
}
