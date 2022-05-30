using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Models.UserManagement
{
    public class User
    {
        public int Id { get; set; }
        public string googleaccountid { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string locale { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuperAdmin { get; set; }
        public int PackagePlanId { get; set; }
        public string SubscriptionId { get; set; }
        public string LastPaymentDate { get; set; }
        public string NextPaymentDate { get; set; }
        public string PaymentSoFor { get; set; }
        public string SubscriptionStatus { get; set; }
    }
}
