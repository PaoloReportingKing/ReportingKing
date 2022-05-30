using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Models
{
    public class ExportViewModel
    {
        public List<string> ColumnNames { get; set; }
        //public List<object> FilteredData { get; set; }

        public List<ChartsConfiguration> ChartsConfigurations { get; set; }

        public string FileName { get; set; }
        public ExportViewModel()
        {
            ColumnNames = new List<string>();
            //FilteredData = new List<object>();
            ChartsConfigurations = new List<ChartsConfiguration>();

        }
    }
    public class ChartYAxis
    {
        public string label { get; set; }
        public string seriestype { get; set; }
        public bool showlabel { get; set; }
        public bool opposite { get; set; }
        public bool EditSeriesType { get; set; }
    }
   

    public class YaxisData
    {
        public string name { get; set; }
        public List<string> data { get; set; }
    }
    public class ChartsConfiguration
    {
        public string chartId { get; set; }
        public string chartType { get; set; }
        public string chartAxis { get; set; }
        public string chartXAxis { get; set; }
        public List<ChartYAxis> chartYAxises { get; set; }
        public List<string> chartXAxisLabels { get; set; }
        //public List<List<object>> chartSeries { get; set; }
        public List<YaxisData> yaxisdata { get; set; }
        public string comments { get; set; }
    }

}
