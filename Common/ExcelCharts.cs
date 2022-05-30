using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OfficeOpenXml;
using OfficeOpenXml.Drawing.Chart;
using OfficeOpenXml.Drawing;
using System.Drawing;
using System.Data;
using Newtonsoft.Json;
using ReportingApp.Models;

namespace ReportingApp.Common
{
    public class ExcelCharts
    {
        public DataSet ConvertWebDataToTable(ExportViewModel model)
        {
            try
            {
                DataSet ds = new DataSet();
                foreach (var chart in model.ChartsConfigurations)
                {
                    if (chart.chartType == "number_chart")
                    {
                        continue;
                        chart.chartXAxisLabels.RemoveRange(0, chart.chartXAxisLabels.Count);
                        chart.chartXAxisLabels.Add("Column1");
                        chart.chartXAxis = "Column1";
                    }

                    if (chart.chartType == "pie_chart" && chart.chartXAxisLabels.Count == 0)
                    {
                        chart.chartXAxisLabels.Add("Column1");
                        chart.chartXAxis = "Column1";
                    }

                    DataTable dt = new DataTable();
                    dt.TableName = chart.chartId;
                    //if(chart.chartXAxis == "")
                    //{
                    //    chart.chartXAxis = "Column1";
                    //}
                    dt.Columns.Add(chart.chartXAxis);
                    foreach (var y in chart.chartYAxises)
                    {
                        dt.Columns.Add(y.label);
                    }
                    int labelsIndex = 0;


                    foreach (var thischart in chart.yaxisdata)
                    {
                        List<string> thisdata = new List<string>();
                        if (chart.chartType == "scatter_chart" && chart.chartXAxisLabels.Count != thischart.data.Count)
                        {

                            foreach (var d in thischart.data)
                            {
                                thisdata.Add(d.Split(",")[0]);
                            }


                            for (int i = 0; i < chart.chartXAxisLabels.Count; i++)
                            {
                                try
                                {
                                    //if(i> thisdata.Count)
                                    //{
                                    //    thisdata.Add( chart.chartXAxisLabels[i]);
                                    //    thischart.data.Add( chart.chartXAxisLabels[i] + ",0");
                                    //}
                                    //else 
                                    if (i < thisdata.Count && !chart.chartXAxisLabels[i].Equals(thisdata[i]))
                                    {
                                        thisdata.Insert(i, chart.chartXAxisLabels[i]);
                                        thischart.data.Insert(i, chart.chartXAxisLabels[i] + ",0");
                                    }
                                }
                                catch (Exception ex)
                                {

                                    if (i == chart.chartXAxisLabels.Count - 1)
                                    {
                                        thischart.data.Insert(i, chart.chartXAxisLabels[i] + ",0");
                                    }
                                    else
                                    {
                                        throw ex;
                                    }
                                }
                            }
                        }
                    }


                    foreach (var labels in chart.chartXAxisLabels)
                    {
                        DataRow dr = dt.NewRow();
                        dr[chart.chartXAxis] = labels;

                        foreach (var y in chart.yaxisdata)
                        {
                            try
                            {
                                double temp = 0;
                                if (chart.chartType == "scatter_chart")
                                {

                                    if (double.TryParse(y.data[labelsIndex].Split(",")[1], out temp))
                                    {
                                        dr[y.name] = temp;
                                    }
                                    else
                                    {
                                        dr[y.name] = y.data[labelsIndex].Split(",")[1];
                                    }
                                }
                                else if (chart.chartType == "table_chart")
                                {
                                    dr[y.name] = y.data[labelsIndex].ToString();
                                }
                                else if (double.TryParse(y.data[labelsIndex], out temp))
                                {
                                    dr[y.name] = temp;
                                }
                                else
                                {
                                    dr[y.name] = y.data[labelsIndex];
                                }
                            }
                            catch (Exception ex)
                            {

                            }

                            //foreach (var d in y.data)
                            //{
                            //    dr[y.name] = d;
                            //}
                        }
                        dt.Rows.Add(dr);
                        labelsIndex++;
                    }
                    ds.Tables.Add(dt);
                }
                //DataTable dt = new DataTable();
                //foreach (var column in model.ColumnNames)
                //{
                //    dt.Columns.Add(column);
                //}
                //foreach (var item in model.FilteredData)
                //{
                //    DataRow dr = dt.NewRow();
                //    //Object obj = JsonConvert.DeserializeObject<Object>(item);
                //    Dictionary<string, string> receivedData = JsonConvert.DeserializeObject<Dictionary<string, string>>(item.ToString());
                //    foreach (var column in model.ColumnNames)
                //    {
                //        dr[column] = receivedData.GetValueOrDefault(column);
                //        //Console.WriteLine("Column name is : " + column + " value is : " + receivedData.GetValueOrDefault(column));
                //    }
                //    dt.Rows.Add(dr);
                //}
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string CreateWorkSheet(DataSet ds, List<ChartsConfiguration> chartsConfigurations)
        {
            string filedate = DateTime.Now.ToString("dd_MM_yyyy HH_mm_ss").Trim();
            filedate = filedate.Replace(":", "");
            try
            {
                filedate = filedate.Replace(" ", "_");
            }
            catch (Exception ex)
            {

            }
            FileInfo newFile = Utils.GetFileInfo(filedate + "_charts.xlsx");
            using (ExcelPackage pck = new ExcelPackage(newFile))
            {
                int tablesCount = 1;
                foreach (DataTable dt in ds.Tables)
                {
                    ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Sheet" + tablesCount);
                    ws.Cells["A1"].LoadFromDataTable(dt, true);
                    int columnIndex = 1;
                    foreach (var columns in dt.Columns)
                    {
                        //if (columnIndex > 1)
                        //{
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        int cellCount = 1;
                        foreach (var cell in ws.Cells[excelColumnName + ":" + excelColumnName])
                        {
                            if (cellCount > 1)
                            {
                                if (chartsConfigurations[tablesCount - 1].chartType != "table_chart")
                                {
                                    try
                                    {
                                        cell.Value = Convert.ToDecimal(cell.Value);
                                    }
                                    catch (Exception ex)
                                    {

                                    }
                                }
                            }

                            cellCount++;
                        }

                        //}
                        columnIndex++;
                    }
                    ws.InsertColumn(dt.Columns.Count + 1, 1);
                    ws.Cells[GetExcelColumnName(dt.Columns.Count + 1) + "20"].Value = "Comments: " + chartsConfigurations[tablesCount - 1].comments;
                    //  ws.Cells[GetExcelColumnName(dt.Columns.Count + 1) + "20"].Value =   chartsConfigurations[tablesCount - 1].comments;
                    tablesCount++;
                }
                pck.Save();
            }
            return newFile.Name;
        }
        public void GenerateBarChart(string fileName, ChartsConfiguration chartInfo, DataTable dt, int tablesCount)
        {
            FileInfo newFile = Utils.GetFileInfo(fileName, false);
            using (ExcelPackage package = new ExcelPackage(newFile))
            {
                int rowLength = dt.Rows.Count + 1;
                ExcelWorksheet chart_sheet = package.Workbook.Worksheets["Sheet" + tablesCount];
                //var chart = (chart_sheet.Drawings.AddChart("BarChart", eChartType.BarStacked) as ExcelBarChart);
                var chart = (ExcelBarChart)chart_sheet.Drawings.AddChart("barChart", eChartType.ColumnClustered);
                //chart.Title.Text = "Total";
                //From row 1 colum 5 with five pixels offset
                chart.SetPosition(0, 0, 5, 5);
                chart.SetSize(600, 300);
                //ExcelAddress valueAddress = new ExcelAddress("E2:E49, G2:G49");
                int columnIndex = 1;
                foreach (var columns in dt.Columns)
                {
                    if (columnIndex > 1)
                    {
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        chart.Series.Add(excelColumnName + "2:" + excelColumnName + rowLength, "A2:A" + rowLength).Header = columns.ToString(); ;
                    }
                    columnIndex++;
                }
                //var ser = (chart.Series.Add(valueAddress.Address, "V2:V49") as ExcelBarChartSerie);
                //chart.Series.Add(ExcelRange.GetAddress(2,5,48,5), ExcelRange.GetAddress(2, 22, 48, 22));
                chart.DataLabel.ShowCategory = false;
                chart.DataLabel.ShowPercent = false;
                chart.Legend.Border.LineStyle = eLineStyle.Solid;
                chart.Legend.Border.Fill.Style = eFillStyle.SolidFill;
                chart.Legend.Border.Fill.Color = Color.DarkBlue;
                //Switch the PageLayoutView back to normal
                chart_sheet.View.PageLayoutView = false;
                // save our new workbook and we are done!
                package.Save();
            }
        }


        public void GenerateLineChart(string fileName, ChartsConfiguration chartInfo, DataTable dt, int tablesCount)
        {
            FileInfo newFile = Utils.GetFileInfo(fileName, false);
            using (ExcelPackage package = new ExcelPackage(newFile))
            {
                int rowLength = dt.Rows.Count + 1;
                ExcelWorksheet chart_sheet = package.Workbook.Worksheets["Sheet" + tablesCount];
                //var chart = (chart_sheet.Drawings.AddChart("BarChart", eChartType.BarStacked) as ExcelBarChart);
                var chart = (ExcelLineChart)chart_sheet.Drawings.AddChart("lineChart", eChartType.Line);
                //chart.Title.Text = "Total";
                //From row 1 colum 5 with five pixels offset
                chart.SetPosition(0, 0, 5, 5);
                chart.SetSize(600, 300);

                //ExcelAddress valueAddress = new ExcelAddress("E2:E49, G2:G49");
                int columnIndex = 1;
                foreach (var columns in dt.Columns)
                {
                    if (columnIndex > 1)
                    {
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        chart.Series.Add(excelColumnName + "2:" + excelColumnName + rowLength, "A2:A" + rowLength).Header = columns.ToString();
                    }
                    columnIndex++;
                }
                //var ser = (chart.Series.Add(valueAddress.Address, "V2:V49") as ExcelBarChartSerie);

                //chart.Series.Add(ExcelRange.GetAddress(2,5,48,5), ExcelRange.GetAddress(2, 22, 48, 22));
                chart.DataLabel.ShowCategory = false;
                chart.DataLabel.ShowPercent = false;

                chart.Legend.Border.LineStyle = eLineStyle.Solid;
                chart.Legend.Border.Fill.Style = eFillStyle.SolidFill;
                chart.Legend.Border.Fill.Color = Color.DarkBlue;
                //Switch the PageLayoutView back to normal
                chart_sheet.View.PageLayoutView = false;
                // save our new workbook and we are done!

                package.Save();
            }
        }
        public void GenerateMixedChart(string fileName, ChartsConfiguration chartInfo, DataTable dt, int tablesCount)
        {
            FileInfo newFile = Utils.GetFileInfo(fileName, false);
            using (ExcelPackage package = new ExcelPackage(newFile))
            {
                int rowLength = dt.Rows.Count + 1;
                ExcelWorksheet chart_sheet = package.Workbook.Worksheets["Sheet" + tablesCount];
                //var chart = (chart_sheet.Drawings.AddChart("BarChart", eChartType.BarStacked) as ExcelBarChart);
                var chart = (ExcelBarChart)chart_sheet.Drawings.AddChart("MixedChart", eChartType.ColumnClustered);
                //chart.Title.Text = "Total";
                //From row 1 colum 5 with five pixels offset


                //ExcelAddress valueAddress = new ExcelAddress("E2:E49, G2:G49");
                int columnIndex = 1;
                foreach (var columns in dt.Columns)
                {
                    if (columnIndex == 2)
                    {
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        chart.Series.Add(excelColumnName + "2:" + excelColumnName + rowLength, "A2:A" + rowLength).Header = columns.ToString();
                    }
                    if (columnIndex > 2)
                    {
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        var chartType2 = chart.PlotArea.ChartTypes.Add(eChartType.Line);
                        var serie2 = chartType2.Series.Add(excelColumnName + "2:" + excelColumnName + rowLength, "A2:A" + rowLength).Header = columns.ToString();
                    }
                    columnIndex++;
                }
                chart.SetPosition(0, 0, 5, 5);
                chart.SetSize(600, 300);
                //var ser = (chart.Series.Add(valueAddress.Address, "V2:V49") as ExcelBarChartSerie);

                //chart.Series.Add(ExcelRange.GetAddress(2,5,48,5), ExcelRange.GetAddress(2, 22, 48, 22));
                chart.DataLabel.ShowCategory = false;
                chart.DataLabel.ShowPercent = false;

                chart.Legend.Border.LineStyle = eLineStyle.Solid;
                chart.Legend.Border.Fill.Style = eFillStyle.SolidFill;
                chart.Legend.Border.Fill.Color = Color.DarkBlue;
                //Switch the PageLayoutView back to normal
                chart_sheet.View.PageLayoutView = false;
                // save our new workbook and we are done!

                package.Save();
            }
        }
        public void GenerateScatterChart(string fileName, ChartsConfiguration chartInfo, DataTable dt, int tablesCount)
        {
            FileInfo newFile = Utils.GetFileInfo(fileName, false);
            using (ExcelPackage package = new ExcelPackage(newFile))
            {
                int rowLength = dt.Rows.Count + 1;
                ExcelWorksheet chart_sheet = package.Workbook.Worksheets["Sheet" + tablesCount];
                //var chart = (chart_sheet.Drawings.AddChart("BarChart", eChartType.BarStacked) as ExcelBarChart);
                var chart = (ExcelScatterChart)chart_sheet.Drawings.AddChart("MixedChart", eChartType.XYScatter);
                //chart.Title.Text = "Total";
                //From row 1 colum 5 with five pixels offset


                //ExcelAddress valueAddress = new ExcelAddress("E2:E49, G2:G49");
                int columnIndex = 1;
                foreach (var columns in dt.Columns)
                {
                    if (columnIndex > 1)
                    {
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        chart.Series.Add(excelColumnName + "2:" + excelColumnName + rowLength, "A2:A" + rowLength).Header = columns.ToString();
                    }
                    columnIndex++;
                }
                chart.SetPosition(0, 0, 5, 5);
                chart.SetSize(600, 300);
                //var ser = (chart.Series.Add(valueAddress.Address, "V2:V49") as ExcelBarChartSerie);

                //chart.Series.Add(ExcelRange.GetAddress(2,5,48,5), ExcelRange.GetAddress(2, 22, 48, 22));
                //chart.DataLabel.ShowCategory = true;
                //chart.DataLabel.ShowPercent = true;

                chart.Legend.Border.LineStyle = eLineStyle.Solid;
                chart.Legend.Border.Fill.Style = eFillStyle.SolidFill;
                chart.Legend.Border.Fill.Color = Color.DarkBlue;
                //Switch the PageLayoutView back to normal
                chart_sheet.View.PageLayoutView = false;
                // save our new workbook and we are done!

                package.Save();
            }
        }
        public void GenerateNumberChart(string fileName, ChartsConfiguration chartInfo)
        {

        }
        public void GenerateTableChart(string fileName, ChartsConfiguration chartInfo)
        {

        }
        public void GeneratePieChart(string fileName, ChartsConfiguration chartInfo, DataTable dt, int tablesCount)
        {
            FileInfo newFile = Utils.GetFileInfo(fileName, false);
            using (ExcelPackage package = new ExcelPackage(newFile))
            {
                int rowLength = dt.Rows.Count + 1;
                ExcelWorksheet chart_sheet = package.Workbook.Worksheets["Sheet" + tablesCount];
                //var chart = (chart_sheet.Drawings.AddChart("BarChart", eChartType.BarStacked) as ExcelBarChart);
                var chart = (ExcelPieChart)chart_sheet.Drawings.AddChart("barChart", eChartType.Pie);
                //chart.Title.Text = "Total";
                //From row 1 colum 5 with five pixels offset
                chart.SetPosition(0, 0, 5, 5);
                chart.SetSize(600, 300);
                //ExcelAddress valueAddress = new ExcelAddress("E2:E49, G2:G49");
                int columnIndex = 1;
                foreach (var columns in dt.Columns)
                {
                    if (columnIndex > 1)
                    {
                        string excelColumnName = GetExcelColumnName(columnIndex);
                        chart.Series.Add(excelColumnName + "2:" + excelColumnName + rowLength, "A2:A" + rowLength).Header = columns.ToString(); ;
                    }
                    columnIndex++;
                }
                //var ser = (chart.Series.Add(valueAddress.Address, "V2:V49") as ExcelBarChartSerie);
                //chart.Series.Add(ExcelRange.GetAddress(2,5,48,5), ExcelRange.GetAddress(2, 22, 48, 22));
                chart.DataLabel.ShowCategory = true;
                chart.DataLabel.ShowPercent = true;
                chart.Legend.Border.LineStyle = eLineStyle.Solid;
                chart.Legend.Border.Fill.Style = eFillStyle.SolidFill;
                chart.Legend.Border.Fill.Color = Color.DarkBlue;
                //Switch the PageLayoutView back to normal
                chart_sheet.View.PageLayoutView = false;
                // save our new workbook and we are done!
                package.Save();
            }
        }


        private string GetExcelColumnName(int columnNumber)
        {
            int dividend = columnNumber;
            string columnName = String.Empty;
            int modulo;

            while (dividend > 0)
            {
                modulo = (dividend - 1) % 26;
                columnName = Convert.ToChar(65 + modulo).ToString() + columnName;
                dividend = (int)((dividend - modulo) / 26);
            }

            return columnName;
        }


    }
}
