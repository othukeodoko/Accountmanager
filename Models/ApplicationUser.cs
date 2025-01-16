using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountManagement.Models
{
    public class ApplicationUser : IdentityUser
    {
        public override string Id { get; set; } = Guid.NewGuid().ToString();
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? UserId { get; set; }
        public string Name { get; set; }
        public string AgentCode { get; set; }
        public string? ContactInfo { get; set; }
        public int? LocationId { get; set; }
        public Location? Location { get; set; }
        public virtual ICollection<Customer>? CustomersAsBdOfficer { get; set; }
        public virtual ICollection<Customer>? CustomersAsAssignedAgent { get; set; }
    }
}
