using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Models
{
    public class PaymentGatewayDetail
    {
        public int Id { get; set; }
        public string Paypal_ClientId { get; set; }
        public string Paypal_Secret { get; set; }
        public bool TestMode { get; set; }
    }
}
