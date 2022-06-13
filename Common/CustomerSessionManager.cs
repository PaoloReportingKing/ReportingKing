
using ReportingApp.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Common
{
    public class CustomerSessionManager
    {
        public  int UserId { get; set; }
        public  string UserName { get; set; }
        public string UserEmail { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuperAdmin { get; set; }
        public bool IsLogin { get; set; }
        public int PackagePlanId  { get; set; }
        public string PackagePlanName { get; set; }
        public bool IsFreeUser { get; set; }

        public List<ComponentRight> Components { get; set; }

    }
   
}
