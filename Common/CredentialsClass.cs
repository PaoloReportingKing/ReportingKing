using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ReportingApp.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Common
{
    public static class CredentialsClass
    {
        //internal static KeyValuePair<string, string> GetCredentials()
        //{
        //    ApplicationDbContext context = new ApplicationDbContext();
        //    var config = context.Configurations.FirstOrDefault();
        //    var credentialsObject = new KeyValuePair<string, string>("auth_info", "{\"login\":\"" + config.Por_UserName + "\",\"token\":\"" + config.Por_Token + "\"}");
        //    return credentialsObject;
        //}
        internal static string PortaBaseURL()
        {
            string baseurl = "";
            try { 
            var configurationBuilder = new ConfigurationBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            return configurationBuilder.Build().GetSection("PortaBaseUrl").Value;
            }
            catch (Exception ex)
            {

            }
            return baseurl;

        }
        internal static string SplynxBaseURL()
        {
            string baseurl = "";
            try
            {
                var configurationBuilder = new ConfigurationBuilder();
                string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                configurationBuilder.AddJsonFile(path, false);
                return configurationBuilder.Build().GetSection("SplynxBaseUrl").Value;
            }
            catch (Exception ex)
            {

            }
            return baseurl;

        }
        internal static string M2BaseURL()
        {
            string baseurl = "";
            try
            {
                var configurationBuilder = new ConfigurationBuilder();
                string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                configurationBuilder.AddJsonFile(path, false);
                return configurationBuilder.Build().GetSection("M2BaseUrl").Value;
            }
            catch (Exception ex)
            {

            }
            return baseurl;

        }
        public static string convertToJson(Object obj)
        {
            var pjson = JsonConvert.SerializeObject(obj,
                            Newtonsoft.Json.Formatting.None,
                            new JsonSerializerSettings
                            {
                                NullValueHandling = NullValueHandling.Ignore,
                                DefaultValueHandling = DefaultValueHandling.Ignore
                            });
            return pjson;
        }
        public static string currencySymbol(string code)
        {

            var currencySymbol = code;
            if (code == "EUR")
            {
                currencySymbol = "€";
            }
            if (code == "GBP")
            {
                currencySymbol = "£";
            }
            if (code == "USD")
            {
                currencySymbol = "$";
            }
            return currencySymbol;
        }
    }
}
