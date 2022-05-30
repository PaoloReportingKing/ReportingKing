using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Common
{
    public class InternalResponseViewModel
    {
        public bool Status { get; set; }

        public dynamic Model { get; set; }
        public dynamic DynamicList { get; set; }
        public string Message { get; set; }

        public string LogoPath { get; set; }
        public Exception exception { get; set; }
        public string UserName { get; set; }
        public InternalResponseViewModel()
        {
            responseCollection = new List<ResponseCollection>();
        }
        public List<ResponseCollection> responseCollection { get; set; }
    }
    public class ResponseCollection
    {
        public string ElementId { get; set; }
        public string Message { get; set; }
        public bool Status { get; set; }
        public int Id { get; set; }
        public string key { get; set; }
        public Exception exception { get; set; }

        public int EmailTempId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Contact { get; set; }
        public string Dob { get; set; }
        public int tourId { get; set; }
        public string BType { get; set; }
        public bool IsLeader { get; set; }
        public bool IsGrouped { get; set; }
        public string GroupId { get; set; }
        public bool SubmitHealthForm { get; set; }
        public bool FormStatus { get; set; }
        public string BookingReference { get; set; }
    }
}
