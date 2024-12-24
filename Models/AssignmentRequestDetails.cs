namespace AccountManagement.Models
{
    public class AssignmentRequestDetails : AssignmentRequest
    {
        public Customer? Customer { get; set; }
        public ApplicationUser? BdTeamLead { get; set; }
    }

}
