using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Common
{
    public class CustomMethods
    {
        
        public static string getValueFromAppSettings(string key)
        {
            var configurationBuilder = new ConfigurationBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            string cs = configurationBuilder.Build().GetSection(key).Value;
            return cs;
        }

      public static CustomerSessionManager getCsm(int userId)
        {
            //ApplicationDbContext db = new ApplicationDbContext();
            //var myuser = db.Users.Find(userId);
            CustomerSessionManager csm = new CustomerSessionManager();
            //PermissionRepo prrepobj = new PermissionRepo(csm);


            //csm = prrepobj.InitilizeCustomerManager(myuser, 0).Model;
            return csm;
        }
    }
}
