using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AccountManagement.Models
{
    //public class AppDbContext : DbContext 
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<AssignmentRequest> AssignmentRequests { get; set; }
        public DbSet<Location> Locations { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure base Identity configuration is included
            modelBuilder.Entity<ApplicationUser>().HasKey(u => u.Id);
            modelBuilder.Entity<ApplicationUser>().HasAlternateKey(u => u.UserId);
            //Identity relationships
            modelBuilder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.HasKey(l => new { l.UserId, l.LoginProvider, l.ProviderKey });
            });

            modelBuilder.Entity<IdentityUserRole<string>>(b =>
            {
                b.HasKey(ur => new { ur.UserId, ur.RoleId });
            });

            modelBuilder.Entity<IdentityUserToken<string>>(b =>
            {
                b.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            });
           // modelBuilder.Entity<Customer>()
           //.HasOne(c => c.BdOfficer)
           ////.WithMany()
           //.WithMany(u => u.CustomersAsBdOfficer)
           //.HasForeignKey(c => c.BdOfficerId)
           //.OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Customer>()
                .HasOne(c => c.AssignedAgent)
                //.WithMany()
                .WithMany(u => u.CustomersAsAssignedAgent)
                .HasForeignKey(c => c.AssignedAgentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
