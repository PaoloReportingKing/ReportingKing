using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReportingApp.Common;
using ReportingApp.Data;
using ReportingApp.Models.UserManagement;
using ReportingApp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Controllers
{
    [PatternFilter]
    public class AccountController : Controller
    {
        private readonly SessionManager _sessionManager;
        ApplicationDbContext context;




        public AccountController(SessionManager sessionManager)
        {
            _sessionManager = sessionManager;
            context = new ApplicationDbContext();
            //       var str = _httpContextAccessor.HttpContext.Session.GetString("User");
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CheckUserExists(string email)
        {
            try
            {
                if (context.Users.Where(x => x.email == email).FirstOrDefault() != null)
                {
                    return new JsonResult(new { status = true, msg = "You are already registered. Please log in." });
                }

                return new JsonResult(new { status = false });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = false });
            }
        }

        public IActionResult SignUpAndLogin(UserViewModel obj)
        {
            try
            {
                if (context.Users.Where(x => x.email == obj.email).FirstOrDefault() != null)
                {
                    return new JsonResult(new { status = false, msg = "You are already registered. Please log in.", id = 0 });
                }
                User userobj = new User();
                userobj.CreatedDate = DateTime.Now;
                userobj.email = obj.email;
                userobj.googleaccountid = obj.id;
                userobj.locale = obj.locale;
                userobj.name = obj.name;
                userobj.PackagePlanId = 2;
                userobj.SubscriptionId = obj.SubscriptionId;
                userobj.IsSuperAdmin = false;
                userobj.IsActive = true;
                context.Users.Add(userobj);
                context.SaveChanges();


                CustomerSessionManager csm = initializesessionmanager(userobj.Id);
                HttpContext.Session.SetString("CustomerManager", JsonConvert.SerializeObject(csm));//Loginuser.Userobj.Id.ToString());
                HttpContext.Response.Cookies.Append("UserCookie",
                JsonConvert.SerializeObject(csm),//Loginuser.Userobj.Id.ToString(),
                new Microsoft.AspNetCore.Http.CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(1)
                });
                return new JsonResult(new { status = true, msg = "Your package updated successfully", id = 0, model = csm });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = false });
            }
        }

        public IActionResult Login(UserViewModel obj)
        {
            try
            {
                User userobj = context.Users.Where(x => x.email == obj.email).FirstOrDefault();
                if (userobj == null)
                {
                    return new JsonResult(new { status = false, msg = "Please Signup to update your package", id = 0 });
                }

                if (!userobj.IsActive)
                {
                    return new JsonResult(new { status = false, msg = "Your account is blocked. Kindly contact system administrator.", id = 0 });
                }

                //HttpContext.Session.Clear();
                //Response.Cookies.Delete("UserCookie");
                CustomerSessionManager csm = initializesessionmanager(userobj.Id);
                HttpContext.Session.SetString("CustomerManager", JsonConvert.SerializeObject(csm));//Loginuser.Userobj.Id.ToString());
                HttpContext.Response.Cookies.Append("UserCookie",
                JsonConvert.SerializeObject(csm),//Loginuser.Userobj.Id.ToString(),
                new Microsoft.AspNetCore.Http.CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(1)
                });


                return new JsonResult(new { status = true, msg = "User Saved...Please update your package", id = 0, model = csm });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = false });
            }
        }
        public CustomerSessionManager initializesessionmanager(int userid)
        {
            HttpContext.Session.Clear();
            Response.Cookies.Delete("UserCookie");
            CustomerSessionManager csm = new CustomerSessionManager();
            User userobj = context.Users.Where(x => x.Id == userid).FirstOrDefault();
            csm.UserName = userobj.name;
            csm.UserId = userobj.Id;
            csm.UserEmail = userobj.email;
            csm.IsActive = userobj.IsActive;
            csm.IsLogin = true;
            csm.IsSuperAdmin = userobj.IsSuperAdmin;
            csm.PackagePlanId = userobj.PackagePlanId;
            csm.PackagePlanName = context.PackagePlans.Where(x => x.Id == userobj.PackagePlanId).Select(x => x.PackageName).FirstOrDefault();
            csm.Components = context.ComponentRights.Where(x => x.PackagePlanId == csm.PackagePlanId).ToList();
            return csm;
        }
        [HttpPost]
        public IActionResult Logout()
        {
            try
            {
                CustomerSessionManager csm = LogoutFunc(HttpContext);
                //HttpContext.Session.Clear();
                //Response.Cookies.Delete("UserCookie");
                //CustomerSessionManager csm = initializesessionmanagerWithOutLogin();
                //HttpContext.Session.SetString("CustomerManager", JsonConvert.SerializeObject(csm));//Loginuser.Userobj.Id.ToString());
                //HttpContext.Response.Cookies.Append("UserCookie",
                //JsonConvert.SerializeObject(csm),//Loginuser.Userobj.Id.ToString(),
                //new Microsoft.AspNetCore.Http.CookieOptions
                //{
                //    Expires = DateTimeOffset.Now.AddDays(1)
                //});
                return new JsonResult(new { status = true, msg = "Please update your package", id = 0, model = csm });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = false });
            }
        }   

        public CustomerSessionManager LogoutFunc(HttpContext httpContext)
        {
            httpContext.Session.Clear();
            httpContext.Response.Cookies.Delete("UserCookie");
            CustomerSessionManager csm = initializesessionmanagerWithOutLogin();
            httpContext.Session.SetString("CustomerManager", JsonConvert.SerializeObject(csm));//Loginuser.Userobj.Id.ToString());
            httpContext.Response.Cookies.Append("UserCookie",
            JsonConvert.SerializeObject(csm),//Loginuser.Userobj.Id.ToString(),
            new Microsoft.AspNetCore.Http.CookieOptions
            {
                Expires = DateTimeOffset.Now.AddDays(1)
            });

            return csm;
        }

        public CustomerSessionManager initializesessionmanagerWithOutLogin()
        {
            CustomerSessionManager csm = new CustomerSessionManager();
            csm.IsLogin = false;
            csm.PackagePlanName = "Free";
            csm.PackagePlanId = context.PackagePlans.Where(x => x.PackageName == "Free").Select(x => x.Id).FirstOrDefault();
            csm.Components = context.ComponentRights.Where(x => x.PackagePlanId == csm.PackagePlanId).ToList();
            return csm;
        }


        public IActionResult GetSessionManagerData()
        {
            try
            {
                CustomerSessionManager csm = _sessionManager.GetCustomerSetting();
                return new JsonResult(new { status = true, msg = "User Saved...Please update your package", id = 0, model = csm });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = false });
            }
        }
        [HttpPost]
        public IActionResult SaveNewFreeUser(string Email)
        {
            try
            {


                if (!string.IsNullOrEmpty(Email))
                {
                    if (context.Users.Where(x => x.email == Email).FirstOrDefault() != null)
                    {
                        return new JsonResult(new { status = false, msg = "User is already exist against this email", id = 0 });
                    }
                    User userobj = new User();
                    userobj.CreatedDate = DateTime.Now;
                    userobj.email = Email;
                    userobj.googleaccountid ="Free";
                    userobj.locale = "Free";
                    userobj.name = Email;
                    userobj.PackagePlanId = 2;
                    userobj.SubscriptionId = "Free";
                    userobj.IsSuperAdmin = false;
                    userobj.IsActive = true;
                    userobj.IsFreeUsers = true;
                    context.Users.Add(userobj);
                    context.SaveChanges();
                }


                return new JsonResult(new { status = true, msg = "User is added successfully..." });
            }
            catch
            {
                return new JsonResult(new { status = false });
            }
        }


        
  [HttpPost]
        public IActionResult DeleteFreeUser(int Id)
        {
            try
            {


                if (Id>0)
                {
                    var user = context.Users.Where(x => x.Id == Id).FirstOrDefault();
                    if (user == null)
                    {
                        return new JsonResult(new { status = false, msg = "No User Exist"});
                    }
                
                    context.Users.Remove(user);
                    context.SaveChanges();
                }


                return new JsonResult(new { status = true, msg = "User is deleted successfully..." });
            }
            catch
            {
                return new JsonResult(new { status = false });
            }
        }
    }
}
  