using Dapper;
using ExcelDataReader;
using ExcelNumberFormat;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic.FileIO;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using ReportingApp.Common;
using ReportingApp.Data;
using ReportingApp.Models;
using ReportingApp.Models.UserManagement;
using ReportingApp.ViewModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace ReportingApp.Controllers
{
    [PatternFilter]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly SessionManager _sessionManager;
     //  
        //Staging FileZilla and puuty
  
        //systemctl restart ReportingTool
        //systemctl status ReportingTool
        //firewall-cmd --permanent --add-port=8089/tcp
        //firewall-cmd --reload

        ///staging server for reporting
        ///

        //systemctl restart ReportingToolStaging.service



        /// <summary>
        /// clientid=495447302183-ul6n1bgt9gdcjelhuniqlt1qce24ohp7.apps.googleusercontent.com
        ///client secret= p_vnqLtvTdVSUCUpWA5zi0XD
        /// </summary>
        /// <param name="logger"></param>
        public HomeController(ILogger<HomeController> logger, IConfiguration configuration, SessionManager sessionManager)
        {
            _logger = logger;
            _configuration = configuration;
            _sessionManager = sessionManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult pdfhtml()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [RequestFormLimits(MultipartBodyLengthLimit = 100000000)]
        [RequestSizeLimit(100000000)]
        [HttpPost]
        public IActionResult UploadMedia(IFormCollection data)
        {
            try
            {
                string FileName = data.Files[0].FileName;

                var filePath = Path.Combine("wwwroot/uploads", FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    data.Files[0].CopyTo(fileStream);
                }

                DateTime requestReceivedTime = DateTime.Now;

                string jsonObj = "";
                string formattedJsonObj = "";
                List<string> Columns = new List<string>();
                string secret = GenerateRandomString();

                if (FileName.EndsWith(".csv"))
                {
                    ExcelData obj = new ExcelData();
                    obj = ReadCSVFile(filePath);
                    jsonObj = obj.data;
                    formattedJsonObj = obj.data;
                    Columns = obj.columns;
                }
                else if (FileName.EndsWith(".xls") || FileName.EndsWith(".xlsx"))
                {
                    DataSet formattedDataTable = new DataSet();
                    var dataset = ReadExcelFile(filePath, secret);
                    foreach (DataTable datatable in dataset.Tables)
                    {
                        List<string> nameCol = new List<string>();
                        for (int i = 0; i < datatable.Columns.Count; i++)
                        {
                            if (datatable.Columns[i].ColumnName.Contains(secret))
                            {
                                nameCol.Add(datatable.Columns[i].ColumnName);
                            }
                        }
                        foreach (var name in nameCol)
                        {
                            datatable.Columns.Remove(name);
                        }

                        //    foreach (DataColumn column in datatable.Columns)
                        //    {
                        //        Columns.Add(column.ColumnName);
                        //    }
                    }

                    //int workingSheet = -1;
                    foreach (DataTable dt in dataset.Tables)
                    {
                        //workingSheet++;
                        if (dt.Columns.Count == 0)
                        {
                            continue;
                        }
                        else
                        {
                            foreach (DataColumn column in dt.Columns)
                            {
                                Columns.Add(column.ColumnName);
                            }
                            formattedDataTable = GetFormattedData(filePath, dt);
                            break;
                        }
                    }
                    jsonObj = dataSetToJSON(dataset);
                    formattedJsonObj = dataSetToJSON(formattedDataTable);
                }
                else
                {
                    ExcelData obj = new ExcelData();
                }

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                DateTime processingEndTime = DateTime.Now;
                //if(Columns.Count>0)
                //{
                //    Columns = Columns.OrderBy(x => x).ToList();
                //}
                return new JsonResult(new { status = true, data = jsonObj, formattedData = formattedJsonObj, columns = Columns, processingEndTime = processingEndTime, requestReceivedTime = requestReceivedTime });
            }
            catch (Exception ex)
            {
                string FileName = data.Files[0].FileName;
                var filePath = Path.Combine("wwwroot/uploads", FileName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                return new JsonResult(new { status = false });
            }
        }

        [HttpGet]
        public IActionResult GetIDData()
        {
            try
            {
                using (IDbConnection con = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    string queryInternal = "SELECT * FROM Users WHERE IsSuperAdmin!=true";
                    List<InternalDashboard> usersList = (con.Query<User>(queryInternal, commandType: CommandType.Text))
                        .Select(t => new InternalDashboard()
                        {
                            CustomerId = t.Id,
                            Name = t.name,
                            Email = t.email,
                            StartDate = t.CreatedDate,
                            ToDate = DateTime.Now,
                            Days = (int)(DateTime.Now - t.CreatedDate).TotalDays,
                            Month = System.Math.Round((double)((int)(DateTime.Now - t.CreatedDate).TotalDays) / 30, 2),
                            LastPaymentDate = t.LastPaymentDate,
                            NextPaymentDate = t.NextPaymentDate,
                            PaidSoFor = t.PaymentSoFor,
                            SubscriptionStatus = t.SubscriptionStatus,
                            UserStatus = t.IsActive,
                        }).ToList();


                    return new JsonResult(new { status = true, data = usersList });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = true });
            }


        }
        public string GenerateRandomString()
        {
            int length = 5;

            // creating a StringBuilder object()
            StringBuilder str_build = new StringBuilder();
            Random random = new Random();

            char letter;

            for (int i = 0; i < length; i++)
            {
                double flt = random.NextDouble();
                int shift = Convert.ToInt32(Math.Floor(25 * flt));
                letter = Convert.ToChar(shift + 65);
                str_build.Append(letter);
            }
            return str_build.ToString();
        }

        ExcelData ReadCSVFile(string csv_file_path)
        {
            ExcelData returnData = new ExcelData();
            DataTable csvData = new DataTable();
            string jsonString = string.Empty;
            try
            {
                using (TextFieldParser csvReader = new TextFieldParser(csv_file_path))
                {
                    csvReader.SetDelimiters(new string[] { "," });
                    csvReader.HasFieldsEnclosedInQuotes = true;
                    string[] colFields;
                    bool tableCreated = false;
                    while (tableCreated == false)
                    {
                        colFields = csvReader.ReadFields();
                        foreach (string column in colFields)
                        {
                            DataColumn datecolumn = new DataColumn(column);
                            datecolumn.AllowDBNull = true;
                            csvData.Columns.Add(datecolumn);
                            returnData.columns.Add(datecolumn.ToString());
                        }
                        tableCreated = true;
                    }
                    while (!csvReader.EndOfData)
                    {
                        csvData.Rows.Add(csvReader.ReadFields());
                    }
                }

                //var cfg = new CsvHelper.Configuration.CsvConfiguration(CultureInfo.CreateSpecificCulture("en-US")) { Delimiter = ",", HasHeaderRecord = true };
                //using (var sr = new StreamReader(csv_file_path))
                //{
                //    using (var rdr = new CsvHelper.CsvReader(sr, cfg))
                //    using (var dataRdr = new CsvHelper.CsvDataReader(rdr))
                //    {
                //        csvData.Load(dataRdr);
                //    }
                //}

                //DataSet ds = new DataSet();
                //ds.Tables.Add(csvData);

                //jsonString = dataSetToJSON(ds);

                //returnData.status = true;
                //returnData.data = jsonString;
                //return returnData;
            }
            catch (Exception ex)
            {
                //return returnData;
            }

            try
            {
                DataSet ds = new DataSet();
                ds.Tables.Add(csvData);

                jsonString = dataSetToJSON(ds);
                var text = Regex.Replace(jsonString, @"[^\u0020-\u007E]", string.Empty);

                //var inputBytes = Encoding.UTF8.GetBytes(jsonString);
                //var outputBytes = Encoding.Convert(Encoding.UTF8, Encoding.GetEncoding(1252), inputBytes);
                //var output = Encoding.ASCII.GetString(outputBytes);

                returnData.status = true;
                returnData.data = text;
                return returnData;
            }
            catch
            {
                return returnData;
            }
        }

        DataSet ReadExcelFile(string filePath, string secret)
        {
            DataSet dataSet = new DataSet();
            try
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        var conf = new ExcelDataSetConfiguration
                        {
                            ConfigureDataTable = _ => new ExcelDataTableConfiguration
                            {
                                UseHeaderRow = true,
                                EmptyColumnNamePrefix = secret
                            }
                        };

                        dataSet = reader.AsDataSet(conf);
                        return dataSet;
                    }
                }
            }
            catch (Exception ex)
            {
                return dataSet;
            }
        }

        DataTable GetFormattedValue(IExcelDataReader reader, int columnsCount)
        {
            DataTable dt = new DataTable();
            int loopCount = 0;
            List<int> notCols = new List<int>();
            do
            {
                while (reader.Read())
                {
                    List<object> newRow = new List<object>();
                    for (var i = 0; i < columnsCount; i++)
                    {
                        var value = reader.GetValue(i);

                        //if (value != null)
                        //{
                        if (loopCount == 0)
                        {
                            if (value == null)
                            {
                                notCols.Add(i);
                                continue;
                            }
                            if (dt.Columns.Contains(value.ToString()))
                            {
                                int repeatIndex = 0;
                                foreach (var colName in dt.Columns)
                                {
                                    if (colName.ToString().Contains(value.ToString()))
                                    {
                                        repeatIndex++;
                                    }
                                }
                                dt.Columns.Add(value.ToString() + "_" + repeatIndex.ToString());
                            }
                            else
                            {
                                dt.Columns.Add(value.ToString());
                            }
                        }
                        else
                        {
                            if (notCols.Contains(i))
                            {
                                continue;
                            }
                            else if (value == null)
                            {
                                newRow.Add(string.Empty);
                                continue;
                            }
                            string finalValue;
                            var formatString = reader.GetNumberFormatString(i);
                            if (formatString != null)
                            {
                                var format = new NumberFormat(formatString);
                                finalValue = format.Format(value, CultureInfo.InvariantCulture);
                            }
                            else
                            {
                                finalValue = Convert.ToString(value, CultureInfo.InvariantCulture);
                            }
                            newRow.Add(finalValue);
                        }
                        //}
                        //else
                        //{
                        //    if (loopCount != 0)
                        //    {
                        //        newRow.Add(string.Empty);
                        //    }
                        //}
                    }
                    if (loopCount != 0)
                    {
                        dt.Rows.Add(newRow.ToArray());
                    }
                    loopCount++;
                }

            } while (reader.NextResult());
            return dt;
        }

        DataSet GetFormattedData(string filePath, DataTable asliDt)
        {
            DataTable dt = new DataTable();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    //int columnsCount = reader.FieldCount;
                    int loopCount = 0;
                    int colIndex = 0;
                    List<int> notCols = new List<int>();
                    do
                    {
                        while (reader.Read())
                        {
                            if (asliDt.TableName.Equals(reader.Name))
                            {
                                int columnsCount = reader.FieldCount;
                                List<object> newRow = new List<object>();
                                for (var i = 0; i < columnsCount; i++)
                                {
                                    var value = reader.GetValue(i);

                                    //if (value != null)
                                    //{
                                    if (loopCount == 0)
                                    {
                                        if (value == null)
                                        {
                                            notCols.Add(i);
                                            continue;
                                        }
                                        if (dt.Columns.Contains(value.ToString()))
                                        {
                                            int repeatIndex = 0;
                                            foreach (var colName in dt.Columns)
                                            {
                                                if (colName.ToString().Contains(value.ToString()))
                                                {
                                                    repeatIndex++;
                                                }
                                            }
                                            dt.Columns.Add(value.ToString() + "_" + repeatIndex.ToString());
                                        }
                                        else
                                        {
                                            dt.Columns.Add(value.ToString());
                                        }
                                    }
                                    else
                                    {
                                        if (notCols.Contains(i))
                                        {
                                            continue;
                                        }

                                        if ((loopCount - 1) >= asliDt.Rows.Count || colIndex >= asliDt.Columns.Count)
                                        {
                                            continue;
                                        }

                                        if (value == null)
                                        {
                                            value = "";
                                        }

                                        string asliValue = asliDt.Rows[loopCount - 1][colIndex].ToString();
                                        if (!asliValue.Equals(value.ToString()))
                                        {
                                            continue;
                                        }

                                        colIndex++;

                                        //string asliValue = asliDt.Rows[loopCount - 1][i].ToString();
                                        //if (value == null)
                                        //{
                                        //    if (!asliValue.Equals(""))
                                        //    {
                                        //        continue;
                                        //    }
                                        //}
                                        //else
                                        //{
                                        //    if (!asliValue.Equals(value.ToString()))
                                        //    {
                                        //        continue;
                                        //    }
                                        //}


                                        //if (value == null)
                                        //{
                                        //    newRow.Add(string.Empty);
                                        //    continue;
                                        //}
                                        string finalValue;
                                        var formatString = reader.GetNumberFormatString(i);
                                        if (formatString != null)
                                        {
                                            var format = new NumberFormat(formatString);
                                            finalValue = format.Format(value, CultureInfo.InvariantCulture);
                                        }
                                        else
                                        {
                                            finalValue = Convert.ToString(value, CultureInfo.InvariantCulture);
                                        }
                                        newRow.Add(finalValue);
                                    }
                                    //}
                                    //else
                                    //{
                                    //    if (loopCount != 0)
                                    //    {
                                    //        newRow.Add(string.Empty);
                                    //    }
                                    //}
                                }
                                if (loopCount != 0)
                                {
                                    dt.Rows.Add(newRow.ToArray());
                                }
                                loopCount++;
                                colIndex = 0;
                            }
                        }

                    } while (reader.NextResult());
                }
            }

            for (int i = dt.Rows.Count - 1; dt.Rows.Count - asliDt.Rows.Count > 0; i--)
            {
                dt.Rows[i].Delete();
            }

            DataSet ds = new DataSet();
            ds.Tables.Add(dt);
            return ds;
        }

        string dataSetToJSON(DataSet ds)
        {
            try
            {

                ArrayList root = new ArrayList();
                List<Dictionary<string, object>> table;
                Dictionary<string, object> data;

                foreach (DataTable dt in ds.Tables)
                {
                    if (dt.Columns.Count == 0)
                    {
                        continue;
                    }
                    else
                    {
                        table = new List<Dictionary<string, object>>();
                        foreach (DataRow dr in dt.Rows)
                        {
                            data = new Dictionary<string, object>();
                            foreach (DataColumn col in dt.Columns)
                            {
                                data.Add(col.ColumnName, dr[col]);
                            }
                            table.Add(data);
                        }
                        root.Add(table);
                        break;
                    }
                }
                return JsonConvert.SerializeObject(root);
            }
            catch
            {
                return JsonConvert.SerializeObject("");
            }
        }

        [HttpPost]
        public IActionResult CheckLicense(int userId)
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                User user = context.Users.Where(x => x.Id == userId).FirstOrDefault();
                if (user == null)
                {
                    AccountController ac = new AccountController(_sessionManager);
                    CustomerSessionManager csm = ac.LogoutFunc(HttpContext);
                    return new JsonResult(new { status = false, msg = "Please update your package", id = 0, model = csm });
                }

                if (!user.IsActive)
                {
                    AccountController ac = new AccountController(_sessionManager);
                    CustomerSessionManager csm = ac.LogoutFunc(HttpContext);
                    return new JsonResult(new { status = false, msg = "Please update your package", id = 0, model = csm });
                }

                return new JsonResult(new { status = true });
            }
            catch
            {
                AccountController ac = new AccountController(_sessionManager);
                CustomerSessionManager csm = ac.LogoutFunc(HttpContext);
                return new JsonResult(new { status = false, msg = "Please update your package", id = 0, model = csm });
            }
        }

        [DisableRequestSizeLimit]
        [HttpPost]
        public IActionResult SaveChart(IFormCollection data)
        {
            try
            {
                var file = data.Files[0];
                var fileText = new StringBuilder();
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    while (reader.Peek() >= 0)
                        fileText.AppendLine(reader.ReadLine());
                }

                SaveChartData obj = new SaveChartData();
                obj.id = int.Parse(data["id"].ToString());
                obj.name = data["name"].ToString();
                obj.columns = data["columns"].ToString();
                obj.palette = data["palette"].ToString();
                obj.charts = data["charts"].ToString();
                obj.filters = data["filters"].ToString();
                obj.chartIds = data["chartIds"].ToString();
                obj.cFields = data["cFields"].ToString();
                obj.cDateFields = data["cDateFields"].ToString();
                obj.selectedpalletid = data["selectedpalletid"].ToString();
                obj.commentsForRow = data["commentsForRow"].ToString();
                obj.lastFilterVal = data["lastFilterVal"].ToString();
                obj.mainHtml = fileText.ToString();


                var createdBy = _sessionManager.UserId();
                if (CheckExistingChartByName(obj.name, createdBy, obj.id) > 0)
                {
                    return new JsonResult(new { status = false, msg = "Report name already exists" });
                }
                var dateAndTime = DateTime.Now;
                var date = dateAndTime.Day;
                var month = dateAndTime.Month;
                string monthName = new DateTime(dateAndTime.Year, dateAndTime.Month, dateAndTime.Day).ToString("MMM", CultureInfo.InvariantCulture);
                var year = dateAndTime.Year;
                string createdDate = date + " " + monthName + " " + year;
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                string query = "";

                if (obj.id > 0)
                {
                    //UPDATE
                    parameters.Add("@id", obj.id);
                    query = $"UPDATE ChartsData SET name=@name, columns=@columns, palette=@palette, charts=@charts, filters=@filters, mainHtml=@mainHtml, chartIds=@chartIds, cFields=@cFields, cDateFields=@cDateFields, selectedpalletid=@selectedpalletid, commentsForRow=@commentsForRow, lastFilterVal=@lastFilterVal WHERE id=@id";
                }
                else
                {
                    //CREATE NEW
                    query = $"INSERT INTO ChartsData (name, columns, palette, charts, filters, mainHtml, chartIds, cFields, cDateFields, createdOn, selectedpalletid, CreatedBy, commentsForRow, lastFilterVal) VALUES (@name, @columns, @palette, @charts, @filters, @mainHtml, @chartIds, @cFields, @cDateFields, @createdOn, @selectedpalletid, @CreatedBy, @commentsForRow, @lastFilterVal) ; SELECT LAST_INSERT_ID();";
                    parameters.Add("@CreatedBy", createdBy);
                }
                parameters.Add("@name", obj.name);
                parameters.Add("@columns", obj.columns);
                parameters.Add("@palette", obj.palette);
                parameters.Add("@charts", obj.charts);
                parameters.Add("@filters", obj.filters);
                parameters.Add("@mainHtml", obj.mainHtml);
                parameters.Add("@chartIds", obj.chartIds);
                parameters.Add("@cFields", obj.cFields);
                parameters.Add("@cDateFields", obj.cDateFields);
                parameters.Add("@createdOn", createdDate);
                parameters.Add("@selectedpalletid", obj.selectedpalletid);
                parameters.Add("@commentsForRow", obj.commentsForRow);
                parameters.Add("@lastFilterVal", obj.lastFilterVal);
                int result = MySqlQuries.SqlNoResult(query, parameters);
                if (obj.id > 0)
                {
                    return new JsonResult(new { status = true, msg = "Report updated...", id = obj.id });
                }
                else if (result > 0)
                {

                    return new JsonResult(new { status = true, msg = "Report Saved...", id = result });
                }
                else
                {
                    return new JsonResult(new { status = false, msg = "Report not saved..." });
                }
            }
            catch
            {
                return new JsonResult(new { status = false, msg = "Report not saved..." });
            }
        }

        int CheckExistingChartByName(string name, int userId, int chartId)
        {
            string query = $"SELECT id FROM ChartsData WHERE name=@name AND CreatedBy=@CreatedBy AND id!=@id";
            Dictionary<string, object> parameters = new Dictionary<string, object>();
            parameters.Add("@id", chartId);
            parameters.Add("@name", name);
            parameters.Add("@CreatedBy", userId);
            DataTable dt = MySqlQuries.SqlGetResult(query, parameters);

            return dt.Rows.Count;
        }

        [HttpPost]
        public IActionResult GetChart(int id)
        {
            try
            {
                SaveChartData obj = new SaveChartData();
                string query = $"SELECT * FROM ChartsData WHERE id=@id";
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("@id", id);
                DataTable dt = MySqlQuries.SqlGetResult(query, parameters);
                foreach (DataRow row in dt.Rows)
                {
                    obj.id = int.Parse(row["id"].ToString());
                    obj.charts = row["charts"].ToString();
                    obj.columns = row["columns"].ToString();
                    obj.chartIds = row["chartIds"].ToString();
                    obj.filters = row["filters"].ToString();
                    obj.mainHtml = row["mainHtml"].ToString();
                    obj.name = row["name"].ToString();
                    obj.palette = row["palette"].ToString();
                    obj.selectedpalletid = row["selectedpalletid"].ToString();
                    obj.cFields = row["cFields"].ToString();
                    obj.cDateFields = row["cDateFields"].ToString();
                    obj.commentsForRow = row["commentsForRow"].ToString();
                    obj.lastFilterVal = row["lastFilterVal"].ToString();
                    break;
                }
                return new JsonResult(new { status = true, data = obj });
            }
            catch
            {
                return new JsonResult(new { status = false });
            }
        }
        [HttpPost]
        public IActionResult DeleteChart(int id)
        {
            try
            {
                SaveChartData obj = new SaveChartData();
                string query = $"DELETE FROM ChartsData WHERE id=@id";
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                parameters.Add("@id", id);
                int dt = MySqlQuries.DeleteChart(query, parameters);
                return new JsonResult(new { status = true, data = obj });
            }
            catch
            {
                return new JsonResult(new { status = false });
            }
        }

        [HttpPost]
        public IActionResult GetAllCharts()
        {
            try
            {
                var createdBy = _sessionManager.UserId();
                List<GetAllCharts> returnObj = new List<GetAllCharts>();
                string query = $"SELECT id, name, chartIds, createdOn FROM ChartsData WHERE CreatedBy=" + createdBy + " ORDER BY name";
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                DataTable dt = MySqlQuries.SqlGetResult(query, parameters);
                foreach (DataRow row in dt.Rows)
                {
                    GetAllCharts obj = new GetAllCharts();
                    obj.name = row["name"].ToString();
                    obj.id = int.Parse(row["id"].ToString());
                    obj.chartIds = row["chartIds"].ToString();
                    obj.createdOn = row["createdOn"].ToString();

                    returnObj.Add(obj);
                }
                return new JsonResult(new { status = true, data = returnObj });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = false });
            }
        }




        [HttpPost]
        public IActionResult UpdateChartConfiguration(SaveChartData obj)
        {
            try
            {
                var dateAndTime = DateTime.Now;
                var date = dateAndTime.Day;
                var month = dateAndTime.Month;
                string monthName = new DateTime(dateAndTime.Year, dateAndTime.Month, dateAndTime.Day).ToString("MMM", CultureInfo.InvariantCulture);
                var year = dateAndTime.Year;
                string createdDate = date + " " + monthName + " " + year;
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                string query = "";

                if (obj.id > 0)
                {
                    //UPDATE
                    parameters.Add("@id", obj.id);
                    query = $"UPDATE ChartsData SET  columns=@columns, charts=@charts, cFields=@cFields WHERE id=@id";
                }
                parameters.Add("@charts", obj.charts);
                parameters.Add("@columns", obj.columns);
                parameters.Add("@cFields", obj.cFields);
                int result = MySqlQuries.SqlNoResult(query, parameters);

                return new JsonResult(new { status = true, msg = "Chart updated...", id = obj.id });
            }
            catch
            {
                return new JsonResult(new { status = false });
            }
        }

        [HttpPost]
        public IActionResult GetVedioTutorialsSrcs(int id)
        {
            try
            {
                VedioTutorials obj = new VedioTutorials();
                string query = $"SELECT * FROM VideoTutorials";
                Dictionary<string, object> parameters = new Dictionary<string, object>();
                DataTable dt = MySqlQuries.SqlGetResult(query, parameters);
                foreach (DataRow row in dt.Rows)
                {
                    obj.Id = int.Parse(row["Id"].ToString());
                    obj.Title = row["Title"].ToString();
                    obj.Source = row["Source"].ToString();
                    break;
                }
                return new JsonResult(new { status = true, data = obj });
            }
            catch
            {
                return new JsonResult(new { status = false });
            }
        }


        [HttpGet]
        public IActionResult GetFreeUsers()
        {
            try
            {
                using (IDbConnection con = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    string queryInternal = "SELECT * FROM Users WHERE IsSuperAdmin!=true and IsFreeUsers=true";
                    List<InternalDashboard> usersList = (con.Query<User>(queryInternal, commandType: CommandType.Text))
                        .Select(t => new InternalDashboard()
                        {
                            CustomerId = t.Id,
                            Name = t.name,
                            Email = t.email,
                            UserStatus = t.IsActive,
                        }).ToList();


                    return new JsonResult(new { status = true, data = usersList });
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = true });
            }


        }


        //[HttpPost]
        //public IActionResult GetAllColumns(int id)
        //{

        //    return new JsonResult(new { status = false });
        //}
    }

    public class GetAllCharts
    {
        public int id { get; set; }
        public string name { get; set; }
        public string chartIds { get; set; }
        public string createdOn { get; set; }
    }

    public class SaveChartData
    {
        public int id { get; set; }
        public string name { get; set; }
        public string filters { get; set; }
        public string mainHtml { get; set; }
        public string columns { get; set; }
        public string palette { get; set; }
        public string chartIds { get; set; }
        public string charts { get; set; }
        public string cFields { get; set; }
        public string cDateFields { get; set; }
        public string selectedpalletid { get; set; }
        public string commentsForRow { get; set; }
        public string lastFilterVal { get; set; }
    }
    public class VedioTutorials
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Source { get; set; }
    }
    class ExcelData
    {
        public ExcelData()
        {
            columns = new List<string>();
        }
        public bool status { get; set; }
        public List<string> columns { get; set; }
        public string data { get; set; }
    }
}