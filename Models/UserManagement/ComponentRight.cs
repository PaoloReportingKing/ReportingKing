using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Models.UserManagement
{
    public class ComponentRight
    {
        public int PackagePlanId { get; set; }
        public int Id { get; set; }
        public string Description { get; set; }
        public string HiddenDescription { get; set; }
        public bool Add { get; set; }
        public bool View { get; set; }
        public bool Edit  { get; set; }
        public bool Delete { get; set; }
    }
}
