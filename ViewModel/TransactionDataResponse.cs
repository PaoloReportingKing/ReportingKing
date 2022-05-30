using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.ViewModel
{
    public class TransactionDataResponse
    {
        public string status { get; set; }
        public DateTime status_update_time { get; set; }
        public string id { get; set; }
        public string plan_id { get; set; }
        public DateTime start_time { get; set; }
        public string quantity { get; set; }
        public Shipping_Amount shipping_amount { get; set; }
        public Subscriber subscriber { get; set; }
        public Billing_Info billing_info { get; set; }
        public DateTime create_time { get; set; }
        public DateTime update_time { get; set; }
        public bool plan_overridden { get; set; }
        public Link[] links { get; set; }
    }

    public class Shipping_Amount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }

    public class Subscriber
    {
        public string email_address { get; set; }
        public string payer_id { get; set; }
        public Name name { get; set; }
        public Shipping_Address shipping_address { get; set; }
    }

    public class Name
    {
        public string given_name { get; set; }
        public string surname { get; set; }
    }

    public class Shipping_Address
    {
        public Address address { get; set; }
    }

    public class Address
    {
        public string address_line_1 { get; set; }
        public string admin_area_2 { get; set; }
        public string admin_area_1 { get; set; }
        public string postal_code { get; set; }
        public string country_code { get; set; }
    }

    public class Billing_Info
    {
        public Outstanding_Balance outstanding_balance { get; set; }
        public Cycle_Executions[] cycle_executions { get; set; }
        public Last_Payment last_payment { get; set; }
        public DateTime next_billing_time { get; set; }
        public int failed_payments_count { get; set; }
    }

    public class Outstanding_Balance
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }

    public class Last_Payment
    {
        public Amount amount { get; set; }
        public DateTime time { get; set; }
    }

    public class Amount
    {
        public string currency_code { get; set; }
        public string value { get; set; }
    }

    public class Cycle_Executions
    {
        public string tenure_type { get; set; }
        public int sequence { get; set; }
        public int cycles_completed { get; set; }
        public int cycles_remaining { get; set; }
        public int current_pricing_scheme_version { get; set; }
        public int total_cycles { get; set; }
    }

    public class Link
    {
        public string href { get; set; }
        public string rel { get; set; }
        public string method { get; set; }
    }
}
