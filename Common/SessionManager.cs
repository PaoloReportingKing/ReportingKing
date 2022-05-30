using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using ReportingApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Common
{
    public class SessionManager
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISession _session;
        ApplicationDbContext context;
        public SessionManager(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _session = _httpContextAccessor.HttpContext.Session;
            context = new ApplicationDbContext();
        }
        public string GetTokenSession()
        {
            return _session.GetString("_token");
        }
        public CustomerSessionManager GetCustomerSetting()
        {
            CustomerSessionManager obj = new CustomerSessionManager();
            var sessionString= _session.GetString("CustomerManager");
            obj = JsonConvert.DeserializeObject<CustomerSessionManager>(sessionString);
            return obj;
        }
        public int UserId()
        {
            CustomerSessionManager obj = new CustomerSessionManager();
            var sessionString = _session.GetString("CustomerManager");
            obj = JsonConvert.DeserializeObject<CustomerSessionManager>(sessionString);
            return obj.UserId;
        }
       
        
        //public int SuperAdminId()
        //{
        //    var SAdmin = context.Users.Where(x => x.IsSuperAdmin).FirstOrDefault();
        //    return SAdmin.Id;
        //}
        public void SetSessionPortaType(CustomerSessionManager csm)
        {
            _session.SetString("CustomerManager", JsonConvert.SerializeObject(csm));
        }
    }
}
