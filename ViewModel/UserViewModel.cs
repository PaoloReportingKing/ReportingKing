using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.ViewModel
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string locale { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public string SubscriptionId { get; set; }
    }
}
