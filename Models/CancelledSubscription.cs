using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Models
{
    public class CancelledSubscription
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SubscriptionId { get; set; }
        public string CancelDate { get; set; }
    }
}
