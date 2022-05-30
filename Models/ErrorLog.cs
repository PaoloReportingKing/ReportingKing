using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Models
{
    public class ErrorLog
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string ErrorMessage { get; set; }
    }
}
