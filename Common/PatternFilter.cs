using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using ReportingApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Common
{
    public class PatternFilter : ActionFilterAttribute
    {
        //public string Controller { get; set; }
        public string Method { get; set; }
        public string Right { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                //var datastring = "";
                //CustomerSessionManager csm1 = new CustomerSessionManager();
                //csm1.IsLogin = false;
                //csm1.PackagePlanName = "Free";

                //datastring = JsonConvert.SerializeObject(csm1);
                //filterContext.HttpContext.Response.Cookies.Append("UserCookie", datastring,
                //                                    new Microsoft.AspNetCore.Http.CookieOptions
                //                                    {
                //                                        Expires = DateTimeOffset.Now.AddDays(1)
                //                                    });
                //filterContext.HttpContext.Session.SetString("CustomerManager", datastring);


                var ActionMethod = ((Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)filterContext.ActionDescriptor).ActionName;
                var str = "";
                if (filterContext.HttpContext.Request.Cookies["UserCookie"] != null)
                {
                    str = filterContext.HttpContext.Request.Cookies["UserCookie"].ToString();
                }
                else if(filterContext.HttpContext.Session.GetString("CustomerManager") !=null)
                {
                    str = filterContext.HttpContext.Session.GetString("CustomerManager");
                }
                if(str!="")
                {
                    filterContext.HttpContext.Response.Cookies.Append("UserCookie", str,
                                    new Microsoft.AspNetCore.Http.CookieOptions
                                    {
                                        Expires = DateTimeOffset.Now.AddDays(1)
                                    });
                    filterContext.HttpContext.Session.SetString("CustomerManager", str);
                }
                else
                {

                    CustomerSessionManager csm = new CustomerSessionManager();
                    ApplicationDbContext context = new ApplicationDbContext();
                    csm.IsLogin = false;
                    csm.PackagePlanName = "Free";
                    csm.PackagePlanId = context.PackagePlans.Where(x => x.PackageName == "Free").Select(x => x.Id).FirstOrDefault();
                    csm.Components = context.ComponentRights.Where(x => x.PackagePlanId == csm.PackagePlanId).ToList();
                    str = JsonConvert.SerializeObject(csm);
                    filterContext.HttpContext.Response.Cookies.Append("UserCookie", str,
                                                        new Microsoft.AspNetCore.Http.CookieOptions
                                                        {
                                                            Expires = DateTimeOffset.Now.AddDays(1)
                                                        });
                    filterContext.HttpContext.Session.SetString("CustomerManager", str);
                }
            }
            catch (Exception ex)
            {
                filterContext.HttpContext.Session.Clear();
                filterContext.HttpContext.Response.StatusCode = 800;
                filterContext.HttpContext.Response.Cookies.Delete("UserCookie");
                filterContext.Result = new RedirectToActionResult("Login", "Account", "");
            }
        }
    }
}
