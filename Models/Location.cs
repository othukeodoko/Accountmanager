using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountManagement.Models
{
    public class Location
    {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int LocationId { get; set; }
            [MaxLength(100)]
            public string? LocationName { get; set; }
            [MaxLength(50)]
            public string? LocationCode { get; set; }
            //public ICollection<User>? Users { get; set; }
            //public ICollection<Customer>? Customers { get; set; }   

    }
}
