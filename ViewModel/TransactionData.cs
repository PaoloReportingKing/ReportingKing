using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.ViewModel
{
    public class TransactionData
    {
        public string billingToken { get; set; }
        public string facilitatorAccessToken { get; set; }
        public string orderID { get; set; }
        public string paymentID { get; set; }
        public string subscriptionID { get; set; }
    }
}
