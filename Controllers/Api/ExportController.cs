using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReportingApp.Common;
using ReportingApp.Models;
using System;
using System.Data;

namespace ReportingApp.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportController : ControllerBase
    {
        [Route("Excel")]
        [HttpPost]
        public IActionResult Excel(ExportViewModel model)
        {
            try
            {
                ExcelCharts excelCharts = new ExcelCharts();
                DataSet ds = excelCharts.ConvertWebDataToTable(model);
                //var chartconfiguration=model.ChartsConfigurations)
                string fileName = excelCharts.CreateWorkSheet(ds, model.ChartsConfigurations);
                int counter = 0;
                foreach (var item in model.ChartsConfigurations)
                {
                    if (item.chartType == "bar_chart")
                    {
                        excelCharts.GenerateBarChart(fileName, item, ds.Tables[counter], counter + 1);
                    }
                    if (item.chartType == "line_chart")
                    {
                        excelCharts.GenerateLineChart(fileName, item, ds.Tables[counter], counter + 1);
                    }
                    if (item.chartType == "mixed_chart")
                    {
                        excelCharts.GenerateMixedChart(fileName, item, ds.Tables[counter], counter + 1);
                    }
                    if (item.chartType == "scatter_chart")
                    {
                        excelCharts.GenerateScatterChart(fileName, item, ds.Tables[counter], counter + 1);
                    }
                    if (item.chartType == "number_chart")
                    {
                        continue;
                        excelCharts.GenerateNumberChart(fileName, item);
                    }
                    if (item.chartType == "pie_chart")
                    {
                        excelCharts.GeneratePieChart(fileName, item, ds.Tables[counter], counter + 1);
                    }
                    if (item.chartType == "table_chart")
                    {
                        excelCharts.GenerateTableChart(fileName, item);
                    }
                    counter++;
                }
                return Ok(new { status = "success", downloadLink = "/uploads/" + fileName, fileName = fileName });
            }
            catch (Exception ex)
            {
                return NotFound(new { status = "fail", msg = ex.Message });
            }
        }
    }
}
