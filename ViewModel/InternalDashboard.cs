using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.ViewModel
{
    public class InternalDashboard
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Plan { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ToDate { get; set; }
        public int Days { get; set; }
        public Double Month { get; set; }
        public string LastPaymentDate { get; set; }
        public string NextPaymentDate { get; set; }
        public string PaidSoFor { get; set; }
        public string SubscriptionStatus { get; set; }
        public bool UserStatus { get; set; }
    }
}
