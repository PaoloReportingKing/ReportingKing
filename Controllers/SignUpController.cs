using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReportingApp.Common;
using ReportingApp.Data;
using ReportingApp.Models;
using ReportingApp.Models.UserManagement;
using ReportingApp.ViewModel;
using RestSharp;
using System;
using System.Linq;

namespace ReportingApp.Controllers
{
    //Sandbox: https://api-m.sandbox.paypal.com
    //Live: https://api-m.paypal.com

    public class SignUpController : Controller
    {
        //private readonly SessionManager _sessionManager;
        ApplicationDbContext context;
        string paypal_base_api_url;

        public SignUpController(/*SessionManager sessionManager*/)
        {
            //_sessionManager = sessionManager;
            context = new ApplicationDbContext();
        }

        public IActionResult PaymentCancel()
        {
            return View();
        }

        string GetPaypalAccessToken()
        {
            try
            {
                PaymentGatewayDetail paymentGatewayDetail = context.PaymentGatewayDetails.FirstOrDefault();
                if (paymentGatewayDetail == null)
                {
                    return "";
                }

                string URL = "";
                if (paymentGatewayDetail.TestMode)
                {
                    URL = "https://api.sandbox.paypal.com/v1/oauth2/token";
                    paypal_base_api_url = "https://api-m.sandbox.paypal.com/";
                }
                else
                {
                    URL = "https://api.paypal.com/v1/oauth2/token";
                    paypal_base_api_url = "https://api-m.paypal.com/";
                }

                string ClientId = paymentGatewayDetail.Paypal_ClientId;// "AbhY28r6JUlSAoo2tN1k8-6N3Ttyc4IFm-kMSBavU5FAUFHTK1skRw5rivtIrv5bTJ0PyTWPN3qWq5vl";
                string Secret = paymentGatewayDetail.Paypal_Secret; //"ELS5FydC0udEX0dkc6El4D0WDq8n0GQpLOYb4qvtdda0i-qhIbfuB9z4L6edB9ntDe7_7ZGo2S87cQrp";
                string encoded = Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes(ClientId + ":" + Secret));
                var client = new RestClient(URL);
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Authorization", "Basic " + encoded);
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddParameter("grant_type", "client_credentials");
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    PaypalAuthResponse data = JsonConvert.DeserializeObject<PaypalAuthResponse>(response.Content);
                    return data.access_token;
                }
                else
                {
                    return "";
                }
            }
            catch
            {
                return "";
            }
        }

        TransactionDataResponse GetTransactionDetails(string access_token, string subscriptionID)
        {
            try
            {
                var client = new RestClient(paypal_base_api_url + "v1/billing/subscriptions/" + subscriptionID);
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                request.AddHeader("Authorization", "Bearer " + access_token);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    TransactionDataResponse data = JsonConvert.DeserializeObject<TransactionDataResponse>(response.Content);
                    return data;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }

        bool CancelSubscriptionFunc(string access_token, string subscriptionID)
        {
            try
            {
                var client = new RestClient(paypal_base_api_url + "v1/billing/subscriptions/" + subscriptionID + "/cancel");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Authorization", "Bearer " + access_token);
                request.AddHeader("Content-Type", "application/json");
                var body = @"{""reason"": ""maza nai aya""}";
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        [HttpPost]
        public IActionResult PaymentSuccess(TransactionData transactionData)
        {
            try
            {
                string access_token = GetPaypalAccessToken();
                if (string.IsNullOrEmpty(access_token))
                {
                    return new JsonResult(new { status = false, msg = "Payment Gateway Authentication Failed" });
                }

                //Check subscriptionID is valid or not
                TransactionDataResponse data = GetTransactionDetails(access_token, transactionData.subscriptionID);
                if (data == null)
                {
                    return new JsonResult(new { status = false, data = "Invalid Payment Id" });
                }

                //Check subscriptionID is already used or not
                if (context.Users.Where(x => x.SubscriptionId.Equals(transactionData.subscriptionID)).FirstOrDefault() != null)
                {
                    return new JsonResult(new { status = false, data = "Invalid Payment Id" });
                }

                return new JsonResult(new { status = true });
            }
            catch
            {
                return new JsonResult(new { status = false, msg = "Something Went Wrong" });
            }
        }

        [HttpPost]
        public IActionResult GetSubscriptionInfo(int userId)
        {
            try
            {
                User user = context.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user == null)
                {
                    return new JsonResult(new { status = false, msg = "No user found" });
                }
                if (user.IsFreeUsers)
                {
                    return new JsonResult(new { status = false, msg = "No account connect. Please contact with Admin." });
                }
                string access_token = GetPaypalAccessToken();
                if (string.IsNullOrEmpty(access_token))
                {
                    return new JsonResult(new { status = false, msg = "Payment Gateway Authentication Failed" });
                }

                string subscriptionID = user.SubscriptionId;

                TransactionDataResponse data = GetTransactionDetails(access_token, subscriptionID);
                if (data == null)
                {
                    return new JsonResult(new { status = false, data = "Invalid Payment Id" });
                }

                CancelledSubscription cancelledSubscription = context.CancelledSubscriptions.Where(x => x.UserId == userId).FirstOrDefault();

                return new JsonResult(new { status = true, data = data, cancelledInfo = cancelledSubscription });
            }
            catch
            {
                return new JsonResult(new { status = false, msg = "Something Went Wrong" });
            }
        }

        [HttpPost]
        public IActionResult CancelSubscription(int userId)
        {
            try
            {
                User user = context.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user == null)
                {
                    return new JsonResult(new { status = false, msg = "No user found" });
                }

                string access_token = GetPaypalAccessToken();
                if (string.IsNullOrEmpty(access_token))
                {
                    return new JsonResult(new { status = false, msg = "Payment Gateway Authentication Failed" });
                }

                string subscriptionID = user.SubscriptionId;
                TransactionDataResponse data = GetTransactionDetails(access_token, subscriptionID);
                if (data == null)
                {
                    return new JsonResult(new { status = false, data = "Invalid Subscription" });
                }
                else
                {
                    if (DateTime.Now.Date > data.billing_info.next_billing_time.Date)
                    {
                        bool val = CancelSubscriptionFunc(access_token, subscriptionID);
                        if (val)
                        {
                            return new JsonResult(new { status = true, msg = "Subscription Cancelled" });
                        }
                        else
                        {
                            return new JsonResult(new { status = false, msg = "Something went wrong... Please try again" });
                        }
                    }
                    else if (DateTime.Now.Date < data.billing_info.next_billing_time.Date)
                    {
                        if (context.CancelledSubscriptions.Where(x => x.UserId == user.Id && x.SubscriptionId == subscriptionID).FirstOrDefault() != null)
                        {
                            return new JsonResult(new { status = true, msg = "Subscription Already Cancelled" });
                        }
                        CancelledSubscription cancel_subscription = new CancelledSubscription();
                        cancel_subscription.CancelDate = data.billing_info.next_billing_time.Date.ToString("yyyy-MM-dd");
                        cancel_subscription.SubscriptionId = subscriptionID;
                        cancel_subscription.UserId = user.Id;
                        context.CancelledSubscriptions.Add(cancel_subscription);
                        context.SaveChanges();

                        return new JsonResult(new { status = true, msg = "Subscription Cancelled" });
                    }
                    else if (DateTime.Now.Date == data.billing_info.next_billing_time.Date)
                    {
                        bool val = CancelSubscriptionFunc(access_token, subscriptionID);
                        if (val)
                        {
                            //AccountController ac = new AccountController(_sessionManager);
                            //CustomerSessionManager csm = ac.LogoutFunc(HttpContext);

                            context.Users.Remove(user);
                            context.SaveChanges();
                            return new JsonResult(new { status = true, msg = "Subscription Cancelled" });
                        }
                        else
                        {
                            return new JsonResult(new { status = false, msg = "Something went wrong... Please try again" });
                        }
                    }
                    return new JsonResult(new { status = false, msg = "Something Went Wrong" });
                }
            }
            catch
            {
                return new JsonResult(new { status = false, msg = "Something Went Wrong" });
            }
        }
    }
}
