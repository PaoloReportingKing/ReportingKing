/*import _ from 'lodash'*/

var DownLoadPdfMessage = "Downloading...";
var DownLoadExcelMessage = "Downloading...";
var DownLoadPngMessage ="Generating Images..."
var SaveReportsMessage = "Save...";
var UpdateChartsMessage = 'Updating Charts...';
var DeleteReportsMessage = 'Deleting..';
var SyncAllChartsMessage = "Sync All Reports...";
var DownLoadingReportMessage = "Downloading Report";
var LoadingMessage = "Loading...";
var UploadFileMessage = "Uploading...";
var TableLockMinRows = "6";
var TableLockMaxRows = "6";

var pallet1 = ['#A50044', '#004D98', '#EDBB00', '#e6d600', '#ff1a79', '#1a8cff', '#cca000', '#b3a700', '#ff80b5', '#4da3ff', '#b38900', '#807700'];//['#A50044', '#004D98', '#EDBB00', '#e6d600', '#ff1a79', '#1a8cff', '#e6b400', '#b3a700', '#ff80b5', '#4da3ff', '#b38900', '#e6d200'];//needs to change in view
var pallet2 = ['#A800FF', '#0079FF', '#00F11D', '#e6d600', '#d580ff', '#3392ff', '#00cc18', '#ccbe00', '#df99ff', '#66a8ff', '#00b315', '#b3a700'];//['#A800FF', '#0079FF', '#00F11D', '#e6d600', '#d580ff', '#3392ff', '#00cc18', '#ccbe00', '#df99ff', '#66a8ff', '#00cc11', '#e6d200'];
var pallet3 = ['#010101', '#4BE1EC', '#F53C3C', '#377280', '#666666', '#16c3d0', '#f76e6e', '#70b1c2', '#1297a1', '#13aeb9', '#fb9d9d', '#84bbc8'];//['#010101', '#4BE1EC', '#F53C3C', '#377280', '#666666', '#16c3d0', '#f76e6e', '#70b1c2', '#1297a1', '#15c4d1', '#fb9d9d', '#84bbc8'];
var pallet4 = ['#510C6C', '#E74164', '#F7CC3D', '#38C8A7', '#9b17cf', '#ee7791', '#dcab09', '#2ca085', '#d88ef0', '#f3a5b8', '#c49808', '#239073'];//['#510C6C', '#E74164', '#F7CC3D', '#38C8A7', '#9b17cf', '#ee7791', '#dcab09', '#37c8a6', '#d88ef0', '#f3a5b8', '#dcaf09', '#239073'];
var pallet5 = ['#F79400', '#136BAE', '#000000', '#4C6887', '#ffc266', '#47a4eb', '#666666', '#6c8aac', '#ffb84d', '#125887', '#bfbfbf', '#9db1c8'];//['#F79400', '#136BAE', '#000000', '#4C6887', '#ffc266', '#47a4eb', '#666666', '#6c8aac', '#ffb84d', '#125887', '#bfbfbf', '#9db1c8'];
var pallet6 = ['#097275', '#ee6055', '#dfbf6d', '#C96C1C', '#0eb8be', '#f6a8a2', '#dbb857', '#e7944b', '#5be9f1', '#fad3d1', '#685418', '#703d0f'];//['#097275', '#ee6055', '#dfbf6d', '#C96C1C', '#0eb8be', '#f6a8a2', '#dbb857', '#e7944b', '#5be9f1', '#fad3d1', '#685418', '#703d0f'];
var pallet7 = ['#DE3036', '#0061CB', '#EDAA02', '#82B216', '#ed9194', '#4da3ff', '#fcbc1d', '#a7e31c', '#e77e83', '#007bff', '#805b00', '#53700f'];//['#DE3036', '#0061CB', '#EDAA02', '#82B216', '#ed9194', '#4da3ff', '#fcbc1d', '#a7e31c', '#e77e83', '#4da0ff', '#805b00', '#53700f'];
var pallet8 = ['#EB4E21', '#01A4EF', '#80BB01', '#FFB901', '#f4a18a', '#67cefe', '#577f01', '#cc9200', '#f38872', '#004666', '#456501', '#805b00'];//['#EB4E21', '#01A4EF', '#80BB01', '#FFB901', '#f4a18a', '#67cefe', '#577f01', '#ffb700', '#f38872', '#004666', '#456501', '#805b00'];
var pallet9 = ['#383be0', '#0F8567', '#13A0F0', '#05ada2', '#2023c5', '#17cfa1', '#27a7f1', '#047c74', '#6868e3', '#0d7359', '#107dbc', '#03635d'];//['#383be0', '#0F8567', '#13A0F0', '#05ada2', '#2023c5', '#17cfa1', '#27a7f1', '#047c74', '#6868e3', '#0d7359', '#107dbc', '#057a76'];
var pallet10 = ['#2e294e', '#DADADA', '#01f594', '#fee33f', '#453e75', '#b3b3b3', '#34fead', '#fedc01', '#6358a7', '#999999', '#67fec2', '#b29a01'];//['#2e294e', '#DADADA', '#01f594', '#fee33f', '#453e75', '#b3b3b3', '#34fead', '#fde64e', '#6358a7', '#d9d9d9', '#67fec2', '#feee80'];
var pallet11 = ['#2b2d41', '#92dbe5', '#ff65d8', '#f7ec59', '#474a6b', '#5bc9d7', '#ff1ac6', '#f6e93c', '#666a99', '#32bbcd', '#cc0099', '#dbcd0a'];//['#2b2d41', '#92dbe5', '#ff65d8', '#f7ec59', '#474a6b', '#5bc9d7', '#ff99e6', '#f6e93c', '#666a99', '#84d6e1', '#ff66d9', '#f8ef6d'];
var pallet12 = ['#1230f6', '#fedc04', '#93c5a6', '#019c3c', '#5369f9', '#e4c601', '#6aaf84', '#01e458', '#9da9fb', '#b29a01', '#50956b', '#34fe81'];//['#1230f6', '#fedc04', '#93c5a6', '#019c3c', '#5369f9', '#fee74d', '#6aaf84', '#01e458', '#9da9fb', '#fedc01', '#9cc9ad', '#34fe81'];
var pallet13 = ['#ffb610', '#19953d', '#02040a', '#ffee00', '#ffc94d', '#21c44f', '#0d1940', '#ccbe00', '#ffe099', '#51e17a', '#1a327f', '#998f00'];//['#ffb610', '#19953d', '#02040a', '#ffee00', '#ffc94d', '#21c44f', '#0d1940', '#fff01a', '#ffe099', '#51e17a', '#1a327f', '#e6d600'];
var pallet14 = ['#1d1d1b', '#c6c6c6', '#e32228', '#fece2c', '#353531', '#a6a6a6', '#eb6065', '#fedb67', '#5d5d56', '#808080', '#f4a4a7', '#fee79a'];//['#1d1d1b', '#c6c6c6', '#e32228', '#fece2c', '#353531', '#a6a6a6', '#eb6065', '#fedb67', '#5d5d56', '#cccccc', '#f4a4a7', '#fee79a'];
var pallet15 = ['#E30613', '#C6c6c6', '#009640', '#ea5b0c', '#fa3845', '#a6a6a6', '#00cc58', '#f57d3d', '#fc838b', '#808080', '#1aff7d', '#f9ae86'];//['#E30613', '#C6c6c6', '#009640', '#ea5b0c', '#fa3845', '#a6a6a6', '#00cc58', '#f57d3d', '#fc838b', '#cccccc', '#1aff7d', '#f9ae86'];
var pallet16 = ['#511B29', '#A29C9B', '#DA324D', '#564A4E', '#862d44', '#c2bdbd', '#e3687d', '#7b6b70', '#bf4062', '#dad7d7', '#efa9b5', '#a09296'];//['#511B29', '#A29C9B', '#DA324D', '#564A4E', '#862d44', '#c2bdbd', '#e3687d', '#7b6b70', '#bf4062', '#dad7d7', '#efa9b5', '#a09296'];
var pallet17 = ['#320f3b', '#a6cfd5', '#dadada', '#002986', '#681f7a', '#cbe3e7', '#b3b3b3', '#003dcc', '#9b2fb6', '#96c6cf', '#999999', '#1a5eff'];//['#320f3b', '#a6cfd5', '#dadada', '#002986', '#681f7a', '#cbe3e7', '#b3b3b3', '#003dcc', '#9b2fb6', '#96c6cf', '#d9d9d9', '#1a5eff'];
var pallet18 = ['#571f4e', '#dadada', '#a2fba3', '#4f759b', '#832f75', '#b3b3b3', '#6cf96e', '#7899ba', '#bb44a7', '#999999', '#0af50e', '#abbfd4'];//['#571f4e', '#dadada', '#a2fba3', '#4f759b', '#832f75', '#b3b3b3', '#6cf96e', '#7899ba', '#bb44a7', '#d9d9d9', '#9dfb9f', '#abbfd4'];
var pallet19 = ['#571f4e', '#dadada', '#ff00ed', '#a2fba3', '#832f75', '#b3b3b3', '#ff4df3', '#6cf96e', '#bb44a7', '#999999', '#ff99f8', '#09dc0d'];//['#571f4e', '#dadada', '#ff00ed', '#a2fba3', '#832f75', '#b3b3b3', '#ff4df3', '#6cf96e', '#bb44a7', '#d9d9d9', '#ff99f8', '#9dfb9f'];
var pallet20 = ['#3b5593', '#99c3f6', '#e6007e', '#8898bd', '#5b79be', '#5b9ef1', '#ff33a3', '#adb8d2', '#92a5d3', '#1269d3', '#ff80c6', '#ced4e4'];//['#3b5593', '#99c3f6', '#e6007e', '#8898bd', '#5b79be', '#5b9ef1', '#ff33a3', '#adb8d2', '#92a5d3', '#a1c8f7', '#ff80c6', '#ced4e4'];
var firstrowfirstchartredraw = true;
var secondrowfirstchartredraw = true;
var thirdrowfirstchartredraw = true;
var fourrowfirstchartredraw = true;
var fiverowfirstchartredraw = true;
var selectedpallet = pallet1;
var selectedpalletid = "customSwitch1";
var firstlink = true;

var palleteArray = [

    ['#A50044', '#004D98', '#EDBB00', '#e6d600', '#ff1a79', '#1a8cff', '#cca000', '#b3a700', '#ff80b5', '#4da3ff', '#b38900', '#b3a700'],
    ['#A800FF', '#0079FF', '#00F11D', '#e6d600', '#d580ff', '#3392ff', '#00cc18', '#ccbe00', '#df99ff', '#66a8ff', '#00b315', '#b3a700'],
    ['#010101', '#4BE1EC', '#F53C3C', '#377280', '#666666', '#16c3d0', '#f76e6e', '#70b1c2', '#1297a1', '#13aeb9', '#fb9d9d', '#84bbc8'],
    ['#510C6C', '#E74164', '#F7CC3D', '#38C8A7', '#9b17cf', '#ee7791', '#dcab09', '#2ca085', '#d88ef0', '#f3a5b8', '#c49808', '#239073'],
    ['#F79400', '#136BAE', '#000000', '#4C6887', '#ffc266', '#47a4eb', '#666666', '#6c8aac', '#ffb84d', '#125887', '#bfbfbf', '#9db1c8'],
    ['#097275', '#ee6055', '#dfbf6d', '#C96C1C', '#0eb8be', '#f6a8a2', '#dbb857', '#e7944b', '#5be9f1', '#fad3d1', '#685418', '#703d0f'],
    ['#DE3036', '#0061CB', '#EDAA02', '#82B216', '#ed9194', '#4da3ff', '#fcbc1d', '#a7e31c', '#e77e83', '#007bff', '#805b00', '#53700f'],
    ['#EB4E21', '#01A4EF', '#80BB01', '#FFB901', '#f4a18a', '#67cefe', '#577f01', '#cc9200', '#f38872', '#004666', '#456501', '#805b00'],
    ['#383be0', '#0F8567', '#13A0F0', '#05ada2', '#2023c5', '#17cfa1', '#27a7f1', '#047c74', '#6868e3', '#0d7359', '#107dbc', '#03635d'],
    ['#2e294e', '#DADADA', '#01f594', '#fee33f', '#453e75', '#b3b3b3', '#34fead', '#fedc01', '#6358a7', '#999999', '#67fec2', '#b29a01'],
    ['#2b2d41', '#92dbe5', '#ff65d8', '#f7ec59', '#474a6b', '#5bc9d7', '#ff1ac6', '#f6e93c', '#666a99', '#32bbcd', '#cc0099', '#dbcd0a'],
    ['#1230f6', '#fedc04', '#93c5a6', '#019c3c', '#5369f9', '#e4c601', '#6aaf84', '#01e458', '#9da9fb', '#b29a01', '#50956b', '#34fe81'],
    ['#ffb610', '#19953d', '#02040a', '#ffee00', '#ffc94d', '#21c44f', '#0d1940', '#ccbe00', '#ffe099', '#51e17a', '#1a327f', '#998f00'],
    ['#1d1d1b', '#c6c6c6', '#e32228', '#fece2c', '#353531', '#a6a6a6', '#eb6065', '#fedb67', '#5d5d56', '#808080', '#f4a4a7', '#fee79a'],
    ['#E30613', '#C6c6c6', '#009640', '#ea5b0c', '#fa3845', '#a6a6a6', '#00cc58', '#f57d3d', '#fc838b', '#808080', '#1aff7d', '#f9ae86'],
    ['#511B29', '#A29C9B', '#DA324D', '#564A4E', '#862d44', '#c2bdbd', '#e3687d', '#7b6b70', '#bf4062', '#dad7d7', '#efa9b5', '#a09296'],
    ['#320f3b', '#a6cfd5', '#dadada', '#002986', '#681f7a', '#cbe3e7', '#b3b3b3', '#003dcc', '#9b2fb6', '#96c6cf', '#999999', '#1a5eff'],
    ['#571f4e', '#dadada', '#a2fba3', '#4f759b', '#832f75', '#b3b3b3', '#6cf96e', '#7899ba', '#bb44a7', '#999999', '#0af50e', '#abbfd4'],
    ['#571f4e', '#dadada', '#ff00ed', '#a2fba3', '#832f75', '#b3b3b3', '#ff4df3', '#6cf96e', '#bb44a7', '#999999', '#ff99f8', '#09dc0d'],
    ['#3b5593', '#99c3f6', '#e6007e', '#8898bd', '#5b79be', '#5b9ef1', '#ff33a3', '#adb8d2', '#92a5d3', '#1269d3', '#ff80c6', '#ced4e4']
];
var tablepallet1 = ['#f7f7f7', '#ededed', '#fefee8', '#fef7f5', '#e8f0fe', '#fceff7', '#f9f9d4', '#fefee6'];
var tablepallet2 = ['#f7f7f7', '#ededed', '#fefee8', '#fef7f5', '#e8f0fe', '#fceff7', '#f9f9d4', '#fefee6'];
var tablepallet3 = ['#fdec4f', '#e7bc40', '#1c4d93', '#982944'];
var tableselectedpallet = tablepallet1;
var selectedcharttype = "";
var chartheight = 300;
var mixchartheight = 210;
var piechartheight = 260;
var numberchart = 298;
var piemargintop = -15;
var pieoffset = 30;
var currentscroll = 0;
console.log("current scroll init to zero")
var tblcommentmargin = '32px';
var tblBarHeight = 14;
var fontReduction = 2.3;
var chartsInnerFontFactor = 0;
var chartsLabelsFontFactor = 0;
var chartsLabelsFontWeightFactor = 0;
var tableLockRows = 8;
if (window.screen.width > 1500 & window.screen.width < 1900) {
    chartheight = 440;
    mixchartheight = 350;
    piechartheight = 355;
    numberchart = 440;
    piemargintop = 30;
    tblBarHeight = 12;

    fontReduction = 2.5;
    chartsInnerFontFactor = 3;
    chartsLabelsFontFactor = -5;
    chartsLabelsFontWeightFactor = 100;
}
if (window.screen.width > 1900) {
    chartheight = 540;
    mixchartheight = 450;
    piechartheight = 430;
    numberchart = 540;
    piemargintop = 56;
    tblBarHeight = 10;

    fontReduction = 2.5;
    chartsInnerFontFactor = 3;
    chartsLabelsFontFactor = -5;
    chartsLabelsFontWeightFactor = 100;
}
if (window.screen.width > 1367 && window.screen.width < 1499) {
    chartheight = 385;
    mixchartheight = 290;
    piechartheight = 320;
    numberchart = 382;
    piemargintop = 10;
    tableLockRows = 6;
}
if (window.screen.width < 1367 ) {
    tableLockRows = 6;
}

//this is for save report pannel
var RplaceAbleFields = [];
var selectedreportid;
var selectedreportcolumns = [];
var selectedreportmissingfields = [];
var selectedreportchartconfiguration = [];

var selectedreportcFields = [];
var selectedreportcDateFields = [];
var formulaName = [];
var PinkFields = [];
var selectedreportchartIds = [];
var selectedreportpallet = [];
var selectedreportmainhtml = "";
var selectedreportchartsfilter = "";
var selectedreportname = "";
var selectedreportpalletid = "";
var selectedreportrowcomments = [];
var selectedLastFilterVal = "";


//end

function getUsedColumns(chartobj) {
    //RplaceAbleFields.push(chartobj.chartXAxis);
    if (chartobj.chartXAxis != "") {
        if ($.inArray(chartobj.chartXAxis, RplaceAbleFields) === -1) {
            RplaceAbleFields.push(chartobj.chartXAxis);
        }
    }

    $.each(chartobj.chartYAxises, function (i, item) {
        //RplaceAbleFields.push(item.label);
        if ($.inArray(item.label, RplaceAbleFields) === -1) {
            RplaceAbleFields.push(item.label);
        }

    });
    //$.each(chartobj.chartXAxisLabels, function (i, item) {
    //    if (chartobj.chartType == "pie_chart") {
    //        if ($.inArray(item, RplaceAbleFields) === -1) {
    //            RplaceAbleFields.push(item);
    //        }
    //    }
    //});
}

function getFormulaFields(chartobj) {
    $.each(chartobj, function (i, item) {
        if ($.inArray(item, RplaceAbleFields) === -1) {
            RplaceAbleFields.push(item);
        }

    });
}

//for all charts configuration
var fixfloat = 2;
var chartsconfigurations = [];
var chartconfigurationobj = {
    chartId: "",
    chartType: "",
    chartAxis: "",
    chartXAxis: "",
    chartYAxises: [],
    chartXAxisLabels: [],
    chartXAxisShowLabels: [],
    chartSeries: [],
    ShowTotals: false,
    Options: {},
    TableChartStyle: "tblStyle1",
    TableChartRowColour: tablepallet1[0],
    TableSortedColumn: "",
    TableSortedColumnId: "",
    TableSortedColumnClass: "",
    TableLocked:false,
    chartxaxismaximum: 0,
}






//common function for all charts
function SetSelectedColourPallets(id, fromsave) {
    debugger;

    if (!getpermissionstatus("ColourPallet") && id != "customSwitch1" && id != "customSwitch2") {
        popupShow('Update Package Plan...', 'fail');
        return false;
    }
    if (id != null && document.getElementById(id).checked) {
        if (id == 'customSwitch1') {
            selectedpallet = pallet1;
        }
        if (id == 'customSwitch2') {
            selectedpallet = pallet2;
        }
        if (id == 'customSwitch3') {
            selectedpallet = pallet3;
        }
        if (id == 'customSwitch4') {
            selectedpallet = pallet4;
        }

        if (id == 'customSwitch5') {
            selectedpallet = pallet5;
        }
        if (id == 'customSwitch6') {
            selectedpallet = pallet6;
        }
        if (id == 'customSwitch7') {
            selectedpallet = pallet7;
        }
        if (id == 'customSwitch8') {
            selectedpallet = pallet8;
        }
        if (id == 'customSwitch9') {
            selectedpallet = pallet9;
        }
        if (id == 'customSwitch10') {
            selectedpallet = pallet9;
        }
        if (id == 'customSwitch10') {
            selectedpallet = pallet10;
        }
        if (id == 'customSwitch11') {
            selectedpallet = pallet11;
        }
        if (id == 'customSwitch12') {
            selectedpallet = pallet12;
        }
        if (id == 'customSwitch9') {
            selectedpallet = pallet9;
        }
        if (id == 'customSwitch13') {
            selectedpallet = pallet13;
        }
        if (id == 'customSwitch14') {
            selectedpallet = pallet14;
        }
        if (id == 'customSwitch15') {
            selectedpallet = pallet15;
        }
        if (id == 'customSwitch16') {
            selectedpallet = pallet16;
        }
        if (id == 'customSwitch17') {
            selectedpallet = pallet17;
        }
        if (id == 'customSwitch18') {
            selectedpallet = pallet18;
        }
        if (id == 'customSwitch19') {
            selectedpallet = pallet19;
        }
        if (id == 'customSwitch20') {
            selectedpallet = pallet20;
        }

        selectedpalletid = id;
        debugger;
        if (!fromsave || fromsave != undefined) {

            $.each(chartsconfigurations, function (i, chart) {
                if (chartsconfigurations[i].TableChartStyle == "tblStyle3") {

                    chartsconfigurations[i].TableChartRowColour = selectedpallet[0];
                }
                if (chartsconfigurations[i].TableChartStyle != "tblStyle1" || chartsconfigurations[i].TableChartStyle != "tblStyle2" && chartsconfigurations[i].TableChartStyle != "tblStyle3") {

                    chartsconfigurations[i].chartselectedpallet = [];
                }

                for (var m = 0; m < selectedpallet.length; m++) {
                    chartsconfigurations[i].chartselectedpallet.push(selectedpallet[m]);
                }

            });

        }
        //  RefreshAllCharts(fromsave);
    }

    if (fromsave != true) {
        $(".close-panel-btn").each(function (index) {
            if ($(this).parents("nav").is(":visible")) {
                $(this).trigger("click");
            }
        });
        // if (fromsave != true) {
        RefreshAllCharts(fromsave);
        //}
    }
}

function updatechart(axis, cat, chartType, chartId) {
    if (droppedd) {
        return;
    }

    var validationflag = ValidationChartDuplicateColumn(cat, chartId);
    var chartconfigurationobj = chartsconfigurations.find(x => x.chartId == chartId);
    var yaxisobject = {
        label: cat,
        seriestype: getseriestype(chartType),
        showlabel: false,
        opposite: false,
        EditSeriesType: false,
        LabelType: "Percentage",
        LabelSideOrOverLap: "OverLap",
        TableChartValueType: "Value",
        TableChartBar: false,
        seriesusage: true,
        LabelStyle: "Style1",
        
    }
    if (chartconfigurationobj != undefined && chartconfigurationobj.chartType == "number_chart" && chartconfigurationobj.chartYAxises.length == 1) {
        popupShow("Not Allowed", "error")
        return false;
    }
    if (chartconfigurationobj != undefined && chartconfigurationobj.chartType == "comments_chart" && chartconfigurationobj.chartYAxises.length == 1) {
        popupShow("Not Allowed", "error")
        return false;
    }

    if (chartType == "comments_chart") {
        var qwerty = {
            chartId: "",
            chartType: "",
            chartAxis: "",
            chartXAxis: "",
            chartYAxises: [],
            chartXAxisLabels: [],
            chartXAxisShowLabels: [],
            chartSeries: [],
            chartselectedpallet: [],
            comments: "",
            Options: {},
            TableChartStyle: "tblStyle1",
            TableChartRowColour: tablepallet1[0],
            TableSortedColumn: "",
            TableSortedColumnId: "",
            TableSortedColumnClass: "",
        }
        for (var i = 0; i < selectedpallet.length; i++) {
            qwerty.chartselectedpallet.push(selectedpallet[i]);
        }
        qwerty.chartYAxises.push(yaxisobject);
        qwerty.chartType = chartType;
        qwerty.chartId = chartId;
        qwerty.chartXAxis = "";
        chartsconfigurations.push(qwerty);

        rerenderchart(chartId);
        return false;
    }


  //  loading_start();
    if (axis == "x") {
        chartconfigurationobj = {
            chartId: "",
            chartType: "",
            chartAxis: "",
            chartXAxis: "",
            chartYAxises: [],
            chartXAxisLabels: [],
            chartXAxisShowLabels: [],
            chartSeries: [],
            chartselectedpallet: [],
            comments: "",
            Options: {},
            TableChartStyle: "tblStyle1",
            TableChartRowColour: tablepallet1[0],
            TableSortedColumn: "",
            TableSortedColumnId: "",
            TableLocked: false,
            TableSortedColumnClass: "",
            TableLockedRows: 8//TableLockMinRows,
        }
        for (var i = 0; i < selectedpallet.length; i++) {
            chartconfigurationobj.chartselectedpallet.push(selectedpallet[i]);
        }
        chartconfigurationobj.chartType = chartType;
        chartconfigurationobj.chartId = chartId;
        //  chartconfigurationobj.chartXAxis = cat;
        chartconfigurationobj.chartXAxis = "";
        chartsconfigurations.push(chartconfigurationobj);
    }
    var sampleValue;//formattedFileData[0][fieldName];
    for (var i = 0; i < filteredData.length; i++) {

        if (filteredData[i][cat] != undefined && filteredData[i][cat] != null && filteredData[i][cat].length < 1) {
            sampleValue = filteredData[i][cat];
        }
        else {
            sampleValue = filteredData[i][cat];
            break;
        }
    }
    var isstring = isNaN(sampleValue);
    //if (validationflag && chartType == "table_chart") {
    //    chartconfigurationobj.chartYAxises.push(yaxisobject);
    //}
    //else {
    var adddragdropcolumn = false;
    if (axis == "x" && isstring && validationflag && chartType != "scatter_chart" || chartconfigurationobj.chartXAxis == "" && isstring && validationflag && chartType != "scatter_chart" || axis == "x" && !isstring && validationflag && chartType == "scatter_chart" || chartconfigurationobj.chartXAxis == "" && !isstring && validationflag && chartType == "scatter_chart") {

        if (chartconfigurationobj.chartXAxis == "") {
            chartconfigurationobj.chartXAxis = cat;
        }
        if (chartType == "scatter_chart") {
            setscatteredchartxaxis(chartId);
        }
        else {
            setchartxaxis(chartId);
        }

        if (chartType == 'number_chart' && validationflag) {
            chartconfigurationobj.chartYAxises.push(yaxisobject);
        }
        if (chartconfigurationobj.chartXAxis.length > 0) {
            $.each(chartconfigurationobj.chartYAxises, function (s, catfield) {
                chartconfigurationobj.chartYAxises[s].seriesusage = true;
            });
            chartconfigurationobj.chartSeries = [];
        }
        adddragdropcolumn = true;
    }
    if (validationflag && !isstring && !adddragdropcolumn && chartType == "pie_chart" && chartconfigurationobj.chartYAxises.length < 1 || validationflag && !isstring && !adddragdropcolumn && chartType != "pie_chart" || chartType == "number_chart" && validationflag && isstring && !adddragdropcolumn || chartType == "table_chart" && validationflag && isstring && !adddragdropcolumn) {
        if (chartType == 'pie_chart') {
            if (chartconfigurationobj.chartYAxises.length < 1) {
                chartconfigurationobj.chartYAxises.push(yaxisobject);
            }
        }
        else {
            chartconfigurationobj.chartYAxises.push(yaxisobject);
        }
        adddragdropcolumn = true;
    }
    if (!adddragdropcolumn) {
        if (validationflag) {
            //   alert("false");
            if (isstring) {
                /*  popupShow("String is not allowed", 'error');*/
                popupShow("Not allowed", 'error');
            }
            if (!isstring) {
                //  popupShow("Number is not allowed at this axis", 'error');
                popupShow("Not allowed", 'error');
            }
        }

        //  loading_end();
        // return false;
    }
    /* }*/



    chartconfigurationobj.chartAxis = axis;
    if (chartType == 'bar_chart' && validationflag) {
        /* setbarchart(chartId);*/
        setbarchart(chartId);
    }
    if (chartType == 'line_chart' && validationflag) {
        /* setlinechart(chartId);*/
        setbarchart(chartId);
    }
    if (chartType == 'mixed_chart' && validationflag) {
        /* setMixedcolumnareaandLinechart(chartId);*/
        setbarchart(chartId);
    }
    if (chartType == 'scatter_chart' && validationflag) {
        reflowAllHighcharts();
        setscatteredchart(chartId);
    }
    if (chartType == 'pie_chart' && validationflag) {
        reflowAllHighcharts();
        setPieDonutChart(chartId);
    }

    if (chartType == 'number_chart' && validationflag) {
        reflowAllHighcharts();
        setRadialChart(chartId);

    }
    if (chartType == 'table_chart' && validationflag) {
        reflowAllHighcharts();
        settableChart(chartId);
    }
    hideshowandrenameLockButton(chartconfigurationobj);
    
   // loading_end();

}


function hideshowandrenameLockButton(chartconfigurationobj) {
    var randomchartid = getrandomchartidusingid(chartconfigurationobj.chartId);
    if (chartconfigurationobj.TableLockedRows == undefined) {
        chartconfigurationobj.TableLockedRows = TableLockMinRows;
    }
    if (chartconfigurationobj.chartType == 'table_chart') {
        $("#LockTable_" + randomchartid).removeClass("d-none");
        
        if (chartconfigurationobj.TableLocked) {
            $("#LockTable_" + randomchartid).text("UnLock");
            $("#BlockRowsBlock_" + randomchartid).removeClass("d-none");
        }
        else {
            $("#LockTable_" + randomchartid).text("Lock");
            $("#BlockRowsBlock_" + randomchartid).addClass("d-none");
        }
    }
    else {
        $("#LockTable_" + randomchartid).addClass("d-none");
        $("#BlockRowsBlock_" + randomchartid).addClass("d-none");
    }
}
function rerenderchart(chartId) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartId);
    if (chartconfigobj.chartType == 'comments_chart') {
        displayCommentsChart(chartId);
    }
    if (chartconfigobj.chartType == 'bar_chart') {
        // setbarchartxaxis();
        setbarchart(chartId);
    }
    if (chartconfigobj.chartType == 'line_chart') {
        //  setlinechart(chartId);
        setbarchart(chartId);
    }
    if (chartconfigobj.chartType == 'mixed_chart') {
        //  setMixedcolumnareaandLinechart(chartId);
        setbarchart(chartId);
    }
    //if (selectedchart == 'mixed_chart') {
    //    setMixedcolumnareaandLinechart();
    //}
    if (chartconfigobj.chartType == 'scatter_chart') {
        setscatteredchart(chartId);
    }

    if (chartconfigobj.chartType == "pie_chart") {
        setPieDonutChart(chartId);
    }

    if (chartconfigobj.chartType == 'number_chart') {
        setRadialChart(chartId);
    }
    if (chartconfigobj.chartType == 'table_chart') {
        settableChart(chartId);
    }
    hideshowandrenameLockButton(chartconfigobj);
    reflowAllHighcharts();
}


function RemovexaxisChart(id, charId) {
    var chartid = `chart_${charId}`;// chartIds.filter(e => e !== `chart_${charId}`);
    if (confirm("Are you sure to delete this?")) {
        var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
        if (chartconfigobj != undefined) {
            $("#div" + chartid).hide();
            chartconfigobj.chartXAxis = "";
            chartconfigobj.chartXAxisLabels = [];
            chartconfigobj.chartXAxisShowLabels = [];
            chartconfigobj.chartSeries = [];
            if (chartconfigobj.chartType == "pie_chart") {
                // chartconfigobj.chartYAxises = [];
            }
            $.each(chartconfigobj.chartYAxises, function (s, catfield) {
                chartconfigobj.chartYAxises[s].seriesusage = true;
            });
            rerenderchart(chartid);
        }
    }
}
//this function is used to check duplication of drag column or fields
function ValidationChartDuplicateColumn(cat, chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var returnflag = true;
    if (chartconfigobj != undefined) {

        if (cat == chartconfigobj.chartXAxis) {
            returnflag = false;
        }
        else if (chartconfigobj.chartYAxises.length > 0) {
            for (var i = 0; i < chartconfigobj.chartYAxises.length; i++) {
                if (chartconfigobj.chartYAxises[i].label == cat) {
                    returnflag = false;
                }
            }
        }

    }

    return returnflag;
}

//this function is used to set xaxis label categories

function setchartxaxisNotUsed(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    chartconfigobj.chartXAxisLabels = [];
    chartconfigobj.chartXAxisShowLabels = [];
    if (chartconfigobj != undefined) {
        $.each(filteredData, function (i, item) {
            //$.each(formattedFilteredData, function (i, item) {
            if (item[chartconfigobj.chartXAxis] != null && !CheckNullUndefined(item[chartconfigobj.chartXAxis])) {
                var exist = false;
                $.each(chartconfigobj.chartXAxisLabels, function (m, xaxisitem) {
                    if (xaxisitem == item[chartconfigobj.chartXAxis]) {
                        exist = true;
                    }
                });
                if (!exist) {
                    chartconfigobj.chartXAxisLabels.push(item[chartconfigobj.chartXAxis]);
                    chartconfigobj.chartXAxisShowLabels.push(formattedFilteredData[i][chartconfigobj.chartXAxis]);
                }
            }

        });
    }
}
var calculateddatefieldsformat = false;
var timeformatalsoinDateField = false;
function setchartxaxis(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    chartconfigobj.chartXAxisLabels = [];
    chartconfigobj.chartXAxisShowLabels = [];
    var chartxaxislabels = [];
    var chartxaxisshowlabels = [];
    if (chartconfigobj != undefined) {
        $.each(filteredData, function (i, item) {
            //if (chartconfigobj.TableLocked && chartxaxislabels.length > chartconfigobj.tableLockRows && chartconfigobj.chartType == "table_chart") {

            //}
            //else {
                if (item[chartconfigobj.chartXAxis] != null && !CheckNullUndefined(item[chartconfigobj.chartXAxis])) {
                    var exist = false;
                    /* $.each(chartconfigobj.chartXAxisLabels, function (m, xaxisitem) {*/
                    $.each(chartxaxislabels, function (m, xaxisitem) {
                        if (xaxisitem == item[chartconfigobj.chartXAxis]) {
                            exist = true;
                        }
                    });
                    if (!exist) {
                        // chartconfigobj.chartXAxisLabels.push(item[chartconfigobj.chartXAxis]);
                        // chartconfigobj.chartXAxisShowLabels.push(formattedFilteredData[i][chartconfigobj.chartXAxis]);
                        chartxaxislabels.push(item[chartconfigobj.chartXAxis]);
                        /* chartxaxisshowlabels.push(formattedFilteredData[i][chartconfigobj.chartXAxis]);*/
                        chartxaxisshowlabels.push(formattedFilteredData[i][chartconfigobj.chartXAxis]);
                    }
                }
           // }
            //$.each(formattedFilteredData, function (i, item) {
           

        });
    }
    var type = "text";
    chartconfigobj.chartXAxisLabels = chartxaxislabels;
    chartconfigobj.chartXAxisShowLabels = chartxaxisshowlabels;
    var calculatedDateField = cDateFields.find(x => x.name == chartconfigobj.chartXAxis);
    if (calculatedDateField != undefined && calculatedDateField != null) {
        if (calculatedDateField.format == "Weekday") {
            type = "Weekday";
        }
        if (calculatedDateField.format == "Month") {
            type = "Month";
        }
        if (calculatedDateField.format == "Week") {
            type = "Week";
        }
    }
    calculateddatefieldsformat = false;
    timeformatalsoinDateField = false;
    var cDateField = cFields.find(x => x.name == chartconfigobj.chartXAxis);
    if (cDateField != undefined && cDateField != null) {
        if (cDateField.formattingType == "4") {
            type = "date";
            calculateddatefieldsformat = true;
        }


    }

    if (filteredData.length < 1) {
        return false;
    }

    var filtereddatavalue = filteredData[0][chartconfigobj.chartXAxis];
    var formattedfilterdatavalue = formattedFilteredData[0][chartconfigobj.chartXAxis];
    if ((filtereddatavalue != undefined && filtereddatavalue.toString().indexOf("/") > -1 || filtereddatavalue != undefined && filtereddatavalue.toString().indexOf("-") > -1)
        && filtereddatavalue.toString().indexOf(":") > -1
        && filtereddatavalue.toString().length < 20) {
        type = "date"
    }
    if (type == "text") {
        chartconfigobj.chartXAxisLabels.sort();
        chartconfigobj.chartXAxisShowLabels.sort();
    }
    else if (type == "date") {
        if (formattedfilterdatavalue.toString().indexOf(":") > -1) {
            timeformatalsoinDateField = true;
        }

        // chartconfigobj.chartXAxisLabels = _.orderBy(chartconfigobj.chartXAxisLabels, [(obj) => new Date(obj)], ['asc'])
        // chartconfigobj.chartXAxisShowLabels = _.orderBy(chartconfigobj.chartXAxisShowLabels, [(obj) => new Date(obj)], ['asc'])
        //  chartconfigobj.chartXAxisLabels = _.orderBy(chartconfigobj.chartXAxisLabels, [(obj) => new Date(obj)], ['desc'])
        // chartconfigobj.chartXAxisShowLabels = _.orderBy(chartconfigobj.chartXAxisShowLabels, [(obj) => new Date(obj)], ['desc'])
        chartconfigobj.chartXAxisLabels.sort(SortByDate);
        chartconfigobj.chartXAxisShowLabels.sort(SortByDate)
    }
    else if (type == "Weekday") {
        chartconfigobj.chartXAxisLabels = [];
        chartconfigobj.chartXAxisShowLabels = [];
        SortByDay(chartxaxislabels, chartconfigobj);
    }
    else if (type == "Month") {
        chartconfigobj.chartXAxisLabels = [];
        chartconfigobj.chartXAxisShowLabels = [];
        SortByMonth(chartxaxislabels, chartconfigobj);
    }
    else if (type == "Week") {
        var weeknoarray = [];
        $.each(chartconfigobj.chartXAxisLabels, function (i, item) {
            var splittedno = item.split(' ')[1];
            weeknoarray.push(parseInt(splittedno));
        });
        weeknoarray.sort(function (a, b) { return a - b });
        chartconfigobj.chartXAxisLabels = [];
        chartconfigobj.chartXAxisShowLabels = [];
        $.each(weeknoarray, function (i, item) {
            var weekobj = "Week " + item;
            chartconfigobj.chartXAxisLabels.push(weekobj);
            chartconfigobj.chartXAxisShowLabels.push(weekobj);
        });
    }
}

function SortByDate(a, b) {
    var splitter = "";
    if (a.indexOf("-") > -1) {
        splitter = "-";
    }
    else if (a.indexOf("/") > -1) {
        splitter = "/";
    }
    if (splitter == "-" && calculateddatefieldsformat != true && timeformatalsoinDateField != true) {
        var amyDate = a.split("-");
        // var aNewDate = new Date(amyDate[1] + "," + amyDate[0] + "," + amyDate[2]).getTime();
        var aNewDate = new Date(a).getTime();
        var bmyDate = b.split("-");
        //var bNewDate = new Date(bmyDate[1] + "," + bmyDate[0] + "," + bmyDate[2]).getTime();
        var bNewDate = new Date(b).getTime();
        return ((aNewDate < bNewDate) ? -1 : ((aNewDate > bNewDate) ? 1 : 0));
    }
    else if (splitter == "/" && calculateddatefieldsformat != true && timeformatalsoinDateField != true) {
        //var dateFormat = function (dt) {
        //    var datesplitvalue = dt.split(" ")[0];
        //    [y, d, m] = datesplitvalue.split(splitter);//dt.split('-');
        //   // return [y, m - 1, d];
        //    return [y + "-" + m + "-" + d];
        //}
        //var dateformate = dateFormat(a);
        //var aNewDate = new Date(...dateFormat(a));//.getTime();
        //var bNewDate = new Date(...dateFormat(b));//.getTime();
        //return ((aNewDate < bNewDate) ? -1 : ((aNewDate > bNewDate) ? 1 : 0));
        var aDate = parse_ddmmyyyy(a);
        var bDate = parse_ddmmyyyy(b);

        return (aDate < bDate ? -1 : 1);
    }
    else {
        var aNewDate = new Date(a).getTime();
        var bNewDate = new Date(b).getTime();
        //var aNewDate = new Date(a);
        //var bNewDate = new Date(b);
        return ((aNewDate < bNewDate) ? -1 : ((aNewDate > bNewDate) ? 1 : 0));
    }

}
function parse_ddmmyyyy(str) // example: for str = '07-30-2015'
{
    var numbers = str.match(/\d+/g); // numbers will be [7,30,2015]
    return new Date(numbers[2], numbers[1] - 1, numbers[0]); // new Date(2015, 6, 30)
}
function SortByDay(xaxislabels, chartconfigobj) {
    if (xaxislabels.findIndex(x => x == "Monday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Monday");
        chartconfigobj.chartXAxisShowLabels.push("Monday");
    }
    if (xaxislabels.findIndex(x => x == "Tuesday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Tuesday");
        chartconfigobj.chartXAxisShowLabels.push("Tuesday");
    }
    if (xaxislabels.findIndex(x => x == "Wednesday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Wednesday");
        chartconfigobj.chartXAxisShowLabels.push("Wednesday");
    }
    if (xaxislabels.findIndex(x => x == "Thursday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Thursday");
        chartconfigobj.chartXAxisShowLabels.push("Thursday");
    }
    if (xaxislabels.findIndex(x => x == "Friday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Friday");
        chartconfigobj.chartXAxisShowLabels.push("Friday");
    }
    if (xaxislabels.findIndex(x => x == "Saturday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Saturday");
        chartconfigobj.chartXAxisShowLabels.push("Saturday");
    }
    if (xaxislabels.findIndex(x => x == "Sunday") != "-1") {
        chartconfigobj.chartXAxisLabels.push("Sunday");
        chartconfigobj.chartXAxisShowLabels.push("Sunday");
    }
}
function SortByMonth(xaxislabels, chartconfigobj) {
    if (xaxislabels.findIndex(x => x == "January") != "-1") {
        chartconfigobj.chartXAxisLabels.push("January");
        chartconfigobj.chartXAxisShowLabels.push("January");
    }
    if (xaxislabels.findIndex(x => x == "February") != "-1") {
        chartconfigobj.chartXAxisLabels.push("February");
        chartconfigobj.chartXAxisShowLabels.push("February");
    }
    if (xaxislabels.findIndex(x => x == "March") != "-1") {
        chartconfigobj.chartXAxisLabels.push("March");
        chartconfigobj.chartXAxisShowLabels.push("March");
    }
    if (xaxislabels.findIndex(x => x == "April") != "-1") {
        chartconfigobj.chartXAxisLabels.push("April");
        chartconfigobj.chartXAxisShowLabels.push("April");
    }
    if (xaxislabels.findIndex(x => x == "May") != "-1") {
        chartconfigobj.chartXAxisLabels.push("May");
        chartconfigobj.chartXAxisShowLabels.push("May");
    }
    if (xaxislabels.findIndex(x => x == "June") != "-1") {
        chartconfigobj.chartXAxisLabels.push("June");
        chartconfigobj.chartXAxisShowLabels.push("June");
    }
    if (xaxislabels.findIndex(x => x == "July") != "-1") {
        chartconfigobj.chartXAxisLabels.push("July");
        chartconfigobj.chartXAxisShowLabels.push("July");
    }
    if (xaxislabels.findIndex(x => x == "August") != "-1") {
        chartconfigobj.chartXAxisLabels.push("August");
        chartconfigobj.chartXAxisShowLabels.push("August");
    }
    if (xaxislabels.findIndex(x => x == "September") != "-1") {
        chartconfigobj.chartXAxisLabels.push("September");
        chartconfigobj.chartXAxisShowLabels.push("September");
    }
    if (xaxislabels.findIndex(x => x == "October") != "-1") {
        chartconfigobj.chartXAxisLabels.push("October");
        chartconfigobj.chartXAxisShowLabels.push("October");
    }
    if (xaxislabels.findIndex(x => x == "November") != "-1") {
        chartconfigobj.chartXAxisLabels.push("November");
        chartconfigobj.chartXAxisShowLabels.push("November");
    }
    if (xaxislabels.findIndex(x => x == "December") != "-1") {
        chartconfigobj.chartXAxisLabels.push("December");
        chartconfigobj.chartXAxisShowLabels.push("December");
    }
}


//this function is used to set x axis of scattered charts
function setscatteredchartxaxis(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    chartconfigobj.chartXAxisLabels = [];
    if (chartconfigobj != undefined) {
        $.each(filteredData, function (i, item) {
            if (item[chartconfigobj.chartXAxis] != null && !CheckNullUndefined(item[chartconfigobj.chartXAxis])) {
                chartconfigobj.chartXAxisLabels.push(item[chartconfigobj.chartXAxis]);
            }
        });
    }
}
//this function is used to remove yaxis of a chart by chartid
function removeyaxis(yaxislable, chartid) {
    if (confirm("Are you sure to delete this?")) {
        var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
        if (chartconfigobj != undefined) {
            if (chartconfigobj.chartType != "pie_chart") {
                /*   var index = chartconfigobj.chartYAxises.indexOf(yaxislable);*/
                var index = chartconfigobj.chartYAxises.findIndex(x => x.label === yaxislable);
                chartconfigobj.chartYAxises.splice(index, 1);
                chartconfigobj.chartSeries.splice(index, 1);
                rerenderchart(chartid);
            }
            if (chartconfigobj.chartType == "pie_chart") {
                var index = chartconfigobj.chartXAxisLabels.findIndex(x => x.label === yaxislable);
                chartconfigobj.chartXAxisLabels.splice(index, 1);
                if (chartconfigobj.chartXAxisLabels.length < 1) {
                    chartconfigobj.chartYAxises = [];
                }
                rerenderchart(chartid);
            }
            //  alert("Confirmed! Item deleted");
            var randomchartid = getrandomchartidusingid(chartid);
            Closethisbar("snav_" + randomchartid);
        }
    }
    else {
        // $(".apexcharts-reset-icon").click();
        return false;
        //  $(".apexcharts-reset-icon").click();
    }
}

function removeyaxisnew(index, chartid) {
    if (confirm("Are you sure to delete this?")) {
        var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
        if (chartconfigobj != undefined) {
            if (chartconfigobj.chartType != "pie_chart") {
                /*   var index = chartconfigobj.chartYAxises.indexOf(yaxislable);*/
                // var index = chartconfigobj.chartYAxises.findIndex(x => x.label === yaxislable);
                chartconfigobj.chartYAxises.splice(index, 1);
                rerenderchart(chartid);
            }
            if (chartconfigobj.chartType == "pie_chart") {
                //     var index = chartconfigobj.chartXAxisLabels.findIndex(x => x.label === yaxislable);
                chartconfigobj.chartXAxisLabels.splice(index, 1);
                if (chartconfigobj.chartXAxisLabels.length < 1) {
                    chartconfigobj.chartYAxises = [];
                }
                rerenderchart(chartid);
            }
            //  alert("Confirmed! Item deleted");
            var randomchartid = getrandomchartidusingid(chartid);
            Closethisbar("snav_" + randomchartid);
        }
    }
}
//this function is used to refresh all charts

function RefreshAllChartsNotUsed(fromsavechart) {
    $.each(chartsconfigurations, function (i, chartobj) {
        var intervaltime = 20 + i;
        setTimeout(function () {
            setchartxaxis(chartobj.chartId);
            rerenderchart(chartobj.chartId);
            $(`#${chartobj.chartId}`).droppable({
                accept: ".field",
                drop: function (event, ui) {
                    updatechart('y', ui.draggable.attr('category'), chartobj.chartType, chartobj.chartId)
                }
            });
            //if (fromsavechart == true) {
            //    var randomchartid = getrandomchartidusingid(chartobj.chartId);
            //    // var comments = $("#comments_text_" + randomchartid).summernote("code");
            //    // $("#comments_text_" + randomchartid).summernote('destroy')
            //    var nextdiv = $("#comments_text_" + randomchartid).next("div");
            //    $("#comments_text_" + randomchartid).next("div").remove();
            //    $("#comments_text_" + randomchartid).summernote('code', chartobj.comments);
            //    }
        }, intervaltime);
    });
    $(".apexcharts-legend-series").addClass("testdata");
    reflowAllHighcharts();
    //setTimeout(function () {
    //    hideshowtotalonthetimeofreupload();
    //}, 230);
}
var tasks = [];
function RefreshAllCharts(fromsavechart) {
    tasks = [];
    $.each(chartsconfigurations, function (i, chartobj) {
        tasks.push(i);
        $(`#${chartobj.chartId}`).droppable({
            accept: ".field",
            drop: function (event, ui) {
                updatechart('y', ui.draggable.attr('category'), chartobj.chartType, chartobj.chartId)
            }
        });


    });
    tasks.slice(1)
        .reduce(function (chain) { return chain.then(doTask); }, doTask(tasks[0], fromsavechart))
        .then(function () {
            $(".apexcharts-legend-series").addClass("testdata");
            reflowAllHighcharts();
            if (fromsavechart == true) {
                setTimeout(function () {
                    //  reflowAllHighchartswithtimer();
                    hideshowtotalonthetimeofreupload();
                }, 280);
            }

            loading_end();
        });



    //$.each(chartsconfigurations, function (i, chartobj) {

    //        var intervaltime = 20 + i;
    //        setTimeout(function () {
    //            setchartxaxis(chartobj.chartId);
    //            rerenderchart(chartobj.chartId);
    //            $(`#${chartobj.chartId}`).droppable({
    //                accept: ".field",
    //                drop: function (event, ui) {
    //                    updatechart('y', ui.draggable.attr('category'), chartobj.chartType, chartobj.chartId)
    //                }
    //            });
    //            //if (fromsavechart == true) {
    //            //    var randomchartid = getrandomchartidusingid(chartobj.chartId);
    //            //    // var comments = $("#comments_text_" + randomchartid).summernote("code");
    //            //    // $("#comments_text_" + randomchartid).summernote('destroy')
    //            //    var nextdiv = $("#comments_text_" + randomchartid).next("div");
    //            //    $("#comments_text_" + randomchartid).next("div").remove();
    //            //    $("#comments_text_" + randomchartid).summernote('code', chartobj.comments);
    //            //    }
    //        }, intervaltime);

    //});

    //setTimeout(function () {
    //    hideshowtotalonthetimeofreupload();
    //}, 230);
}
function doTask(taskNum, fromsave) {
    var dfd = $.Deferred(),
        time = Math.floor(Math.random() * 3000);
    var percentagecomplete = parseInt((taskNum / chartsconfigurations.length) * 100);
    //if (percentagecomplete > 80) {
    //    percentagecomplete = 80;
    //}
    console.log("running task " + taskNum);

    setTimeout(function () {
        if (fromsave == true) {
            loading_start(percentagecomplete, percentagecomplete, UpdateChartsMessage);
        }
        chartobj = chartsconfigurations[taskNum];
        //  console.log(taskNum + " completed");
        setchartxaxis(chartobj.chartId);
        rerenderchart(chartobj.chartId);
        //$(`#${chartobj.chartId}`).droppable({
        //    accept: ".field",
        //    drop: function (event, ui) {
        //        updatechart('y', ui.draggable.attr('category'), chartobj.chartType, chartobj.chartId)
        //    }
        //});
        dfd.resolve(taskNum + 1);
    }, 20)

    return dfd.promise();
}

function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}

function getseriestype(chartType) {
    var sertype = "";
    if (chartType == 'bar_chart') {
        sertype = "column";
    }
    if (chartType == 'line_chart') {
        sertype = "line";
    }
    if (chartType == 'mixed_chart') {
        sertype = "column";
    }
    if (chartType == 'scatter_chart') {
        sertype = "scatter";
    }
    if (chartType == 'pie_chart') {
        sertype = "donut";
    }

    if (chartType == 'number_chart') {
        sertype = "Style1";
    }
    if (chartType == 'table_chart') {
        sertype = "tablechart";
    }
    return sertype;
}

function getrandomchartidusingid(id) {
    return id.split("_")[1];
}
function geteditedseriesnameusingid(chartid) {
    var seriesname = $("#txtseriesname_" + chartid).val();
    return seriesname;
}
function getchartidbyrandomid(randomid) {
    return "chart_" + randomid
}

function CreateCustomLegends(legenditems, chartid) {
    var randomchartid = getrandomchartidusingid(chartid);
    $("#divlegends_" + randomchartid).empty();
    var legenddiv = $("#" + chartid + "> div> svg> foreignObject > .apexcharts-canvas> .apexcharts-legend");
    var legendhtml = "";
    for (var i = 0; i < legenditems.length; i++) {
        if (legenditems[i].showlabel) {
            // legendhtml = legendhtml + '  <div style="margin-top:3px"><a class="apexcharts-legend-marker" onclick = removeyaxisnew("' + i + '","' + chartid + '") style = "color:white;height:20px;width:20px;background-color: ' + selectedpallet[i] + ';border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;" > x</a ><text font-family="Helvetica, Arial, sans-serif" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="600" fill="#373d3f" class="apexcharts-legend-text apexcharts-text apexcharts-xaxis-title-text test" style="font-family: Helvetica, Arial, sans-serif;margin-left: 5;"><b>' + legenditems[i].label + '</b></text></div>'
            var m = i + 1;
            legendhtml = legendhtml + '<div class="apexcharts-legend-series" rel="' + m + '" data:collapsed="false" style="margin: 0px 5px;"><span class="apexcharts-legend-marker" rel="' + m + '" data:collapsed="false" style="background: rgb(0, 143, 251); color: rgb(0, 143, 251); height: 19px; width: 19px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 14px;"><span><i style="color:white;margin-left:5px">x</i></span></span><span class="apexcharts-legend-text" rel="' + i + '" i="" data:default-text="Days" data:collapsed="false" style="color: rgb(55, 61, 63); font-size: 12px; font-weight: 400; font-family: Helvetica, Arial, sans-serif;">Days</span></div>';
        }
    }

    //<div id="divlegends_${randomChartId}" class="row justify-content-center align-items-center apexcharts-legend apexcharts-align-center position-top"  >


    //</div>
    // $("#divlegends_" + randomchartid).append(legendhtml);
    // legenddiv[0].innerHTML = legendhtml;//(legendhtml);

    //<div style="margin-top:3px">
    //    <a onclick="RemovexaxisChart('','${randomChartId}')" style="color: white;height: 20px;width: 20px;background-color: #be2020;border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;">x</a>
    //    <text font-family="Helvetica, Arial, sans-serif" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="600" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-title-text test" style="font-family: Helvetica, Arial, sans-serif;margin-left: 5;"><b>legend 1</b></text>
    //</div>

    // <div class="apexcharts-legend apexcharts-align-center position-top" xmlns="http://www.w3.org/1999/xhtml" style="right: 0px; position: absolute; left: 0px; top: 0px;"><div class="apexcharts-legend-series" rel="1" data:collapsed="false" style="margin: 0px 5px;"><span class="apexcharts-legend-marker" rel="1" data:collapsed="false" style="background: rgb(0, 143, 251); color: rgb(0, 143, 251); height: 19px; width: 19px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 14px;"><span><i style="color:white;margin-left:5px">x</i></span></span><span class="apexcharts-legend-text" rel="1" i="0" data:default-text="Days" data:collapsed="false" style="color: rgb(55, 61, 63); font-size: 12px; font-weight: 400; font-family: Helvetica, Arial, sans-serif;">Days</span></div><div class="apexcharts-legend-series" rel="2" data:collapsed="false" style="margin: 0px 5px;"><span class="apexcharts-legend-marker" rel="2" data:collapsed="false" style="background: rgb(0, 227, 150); color: rgb(0, 227, 150); height: 19px; width: 19px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 14px;"><span><i style="color:white;margin-left:5px">x</i></span></span><span class="apexcharts-legend-text" rel="2" i="1" data:default-text="Ad%20Introduction%20Text" data:collapsed="false" style="color: rgb(55, 61, 63); font-size: 12px; font-weight: 400; font-family: Helvetica, Arial, sans-serif;">Ad Introduction Text</span></div></div>
    /*// <div class="apexcharts-legend-series" rel="1" data:collapsed="false" style="margin: 0px 5px;"><span class="apexcharts-legend-marker" rel="1" data:collapsed="false" style="background: rgb(0, 143, 251); color: rgb(0, 143, 251); height: 19px; width: 19px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 14px;"><span><i style="color:white;margin-left:5px">x</i></span></span><span class="apexcharts-legend-text" rel="1" i="0" data:default-text="Days" data:collapsed="false" style="color: rgb(55, 61, 63); font-size: 12px; font-weight: 400; font-family: Helvetica, Arial, sans-serif;">Days</span></div>*/
}

function lookupFields() {
    var seachVal = $('#column_fields_search').val();
    $("ul#FieldsList li").each(function (index, value) {

        currentName = $(value).text()
        if (currentName.toUpperCase().indexOf(seachVal.toUpperCase()) > -1) {
            $(value).show();
        } else {
            $(value).hide();
        }

    });
}
function hideshowfieldsearchdiv() {
    if (columnNames != null && columnNames.length > 0) {
        $("#div_fieldsearch").show();//css("display", "block");
    }
    else {
        $("#div_fieldsearch").hide();//css("display", "none");
    }
}
/////////////this portion is to edit series using style baar///////////
var firstClick = 0;
var secondClick = 0;
var markerchartid = "";
var markersername = "";
/*function checkdoubleclick(event, chartContext, config) {*/
//$(".apexcharts-legend-text").db(function () { alert("Clicked") });
//$(document).on('click', '.apexcharts-legend-text', function (e) {
//    alert("Clicked");
//});
var removeyaxiscall = false;
//$(document).on('click', '.apexcharts-legend-marker', function (e) {
//    //alert('Click detected; modal will be displayed');
//    if (removeyaxiscall == false) {
//        removeyaxisusingmarker(markersername, markerchartid, e);
//    }
//    if (!removeyaxiscall) {
//        removeyaxiscall = true;
//    }
//    else {
//        removeyaxiscall = false;
//    }

//});
function checkdoubleclick(chartid, seriesname) {
    markerchartid = chartid;
    markersername = seriesname;
    var tool_menu_id = $('#' + chartid).parents().closest('.row[id]').children(".tool-menu-to-be-append").attr("id");
    var date = new Date();
    var millis = date.getTime();

    // try to measure if double-clicked
    /*if (millis - firstClick < 250) {*/
    var dif = millis - firstClick;
    // popupShow(dif, 'error');
    if (millis - firstClick < 225) {
        firstClick = 0;
        secondClick = millis;
        //var chartid = config.w.globals.chartID;
        //$("#txtseriesname_" + getrandomchartidusingid(chartid)).val(config.w.globals.seriesNames[config.seriesIndex]);
        //Showstylebar(config.w.globals.chartID);
        //  alert("double click");
        var chartid = chartid//config.w.globals.chartID;

        var randomid = getrandomchartidusingid(chartid);
        appendnavbar(randomid, tool_menu_id);
        $("#txtseriesname_" + getrandomchartidusingid(chartid)).val(seriesname);//(config.w.globals.seriesNames[config.seriesIndex]);
        $("#lbl_" + getrandomchartidusingid(chartid)).empty();
        var seriesnamelength = seriesname.length;
        if (seriesnamelength > 10) {
            seriesnamelength = 12;
        }
        /*   $("#lbl_" + getrandomchartidusingid(chartid)).text(seriesname.substring(0, seriesnamelength)+"");*/
        $("#lbl_" + getrandomchartidusingid(chartid)).text(seriesname);
        Showstylebar(chartid);//(config.w.globals.chartID);

        //  alert("doubleClick");
        //s  return false;
    } else {
        firstClick = millis;
        secondClick = 0;
        // return false;
        //setTimeout(function () {
        //    firstClick = 0;
        //    secondClick = 0;
        //},  300);
    }
}

function ChartSereisCustomizeOpen(chartid, seriesname) {
    markerchartid = chartid;
    markersername = seriesname;
    var tool_menu_id = $('#' + chartid).parents().closest('.row[id]').children(".tool-menu-to-be-append").attr("id");

    var chartid = chartid//config.w.globals.chartID;

    var randomid = getrandomchartidusingid(chartid);
 

    appendnavbar(randomid, tool_menu_id);
    $("#txtseriesname_" + getrandomchartidusingid(chartid)).val(seriesname);//(config.w.globals.seriesNames[config.seriesIndex]);
    $("#lbl_" + getrandomchartidusingid(chartid)).empty();
    var seriesnamelength = seriesname.length;
    if (seriesnamelength > 10) {
        seriesnamelength = 12;
    }
    $("#lbl_" + getrandomchartidusingid(chartid)).text(seriesname);//.substring(0, seriesnamelength) + "");
    Showstylebar(chartid);//(config.w.globals.chartID);


}

function updateseriesstartusinglegend(chartid, seriesname) {
    var chartid = chartid//config.w.globals.chartID;
    $("#txtseriesname_" + getrandomchartidusingid(chartid)).val(seriesname);//(config.w.globals.seriesNames[config.seriesIndex]);
    Showstylebar(chartid);//(config.w.globals.chartID);
}
function changeseriestype(chart_id, seriestype) {
    var chartrandomid = chart_id;//getrandomchartidusingid(labelid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj.chartType == "table_chart") {
        chartconfigobj.TableChartStyle = seriestype;

        if (seriestype == "tblStyle1") {
            tableselectedpallet = tablepallet1;
            chartconfigobj.TableChartRowColour = tableselectedpallet[0];

        }
        if (seriestype == "tblStyle2") {
            tableselectedpallet = tablepallet2;
            chartconfigobj.TableChartRowColour = tableselectedpallet[0];
        }
        if (seriestype == "tblStyle3") {
            tableselectedpallet = selectedpallet;
            chartconfigobj.TableChartRowColour = tableselectedpallet[0];
        }
        setseriestypestyle(seriestype, chartrandomid);
        resetstylebar(chartid);
        settablestyle(chartconfigobj);
    }
    else {
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
        chartconfigobj.chartYAxises[seriesindex].seriestype = seriestype;
        chartconfigobj.chartYAxises[seriesindex].EditSeriesType = true;
        setseriestypestyle(seriestype, chartrandomid);
        rerenderchart(chartid);
    }


}

function setlabelstyleofpie(chart_id, LabelType) {
    var chartrandomid = chart_id;//getrandomchartidusingid(labelid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj.chartType == "table_chart") {
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
        if (seriesindex != -1) {
            chartconfigobj.chartYAxises[seriesindex].TableChartValueType = LabelType;
        }

    }
    else {
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
        chartconfigobj.chartYAxises[seriesindex].LabelType = LabelType;
    }

    resetlabelborder(chart_id, LabelType);
    rerenderchart(chartid);
}
function setlabelSidestyleofpie(chart_id, LabelType) {
    var chartrandomid = chart_id;//getrandomchartidusingid(labelid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    chartconfigobj.chartYAxises[seriesindex].LabelSideOrOverLap = LabelType;
    resetlabelSideborder(chart_id, LabelType);
    rerenderchart(chartid);
}
function resetlabelSideborder(chartrandomid, LabelType) {
    $("#lblOverLap_" + chartrandomid).removeClass("labelbutton");
    $("#lblSide_" + chartrandomid).removeClass("labelbutton");
    if (LabelType == "Side") {
        $("#lblSide_" + chartrandomid).addClass("labelbutton");
    }
    else {
        $("#lblOverLap_" + chartrandomid).addClass("labelbutton");
    }
}
function resetlabelborder(chartrandomid, LabelType) {
    $("#lblPerc_" + chartrandomid).removeClass("labelbutton");
    $("#lblValu_" + chartrandomid).removeClass("labelbutton");
    if (LabelType == "Percentage") {
        $("#lblPerc_" + chartrandomid).addClass("labelbutton");
    }
    else {
        $("#lblValu_" + chartrandomid).addClass("labelbutton");
    }
}

function Showstylebar(chart_id) {
    var chartid = chart_id.split("_")[1];
    $("#snav_" + chartid).css('display', 'block');
    resetstylebar(chart_id);
}
function Closethisbar(stylebarid) {

    $("#" + stylebarid).css('display', 'none');
}
function closestylebar(Closebar) {
    var stylebarid = Closebar;//.id;
    Closethisbar(stylebarid);
}
function movetoleftaxis(leftaxislableid) {
    var id = leftaxislableid;
    var chartrandomid = getrandomchartidusingid(id);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    chartconfigobj.chartYAxises[seriesindex].opposite = false;
    rerenderchart(chartid);
}
function movetooppositeaxis(oppositeaxislableid) {
    var labelid = oppositeaxislableid;
    var chartrandomid = getrandomchartidusingid(labelid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    chartconfigobj.chartYAxises[seriesindex].opposite = true;
    rerenderchart(chartid);
}
function hideshowlabel(lable) {
    var labelid = lable.id;
    var chartrandomid = getrandomchartidusingid(labelid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    if (document.getElementById(labelid).checked) {
        chartconfigobj.chartYAxises[seriesindex].showlabel = true;
    }
    else {
        chartconfigobj.chartYAxises[seriesindex].showlabel = false;
    }
    CallLabelBoxStyles(chartconfigobj);
    rerenderchart(chartid);
}
function hideshowbar(lable) {
    var labelid = lable.id;
    var chartrandomid = getrandomchartidusingid(labelid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    if (seriesindex != -1) {
        if (document.getElementById(labelid).checked) {
            chartconfigobj.chartYAxises[seriesindex].TableChartBar = true;
        }
        else {
            chartconfigobj.chartYAxises[seriesindex].TableChartBar = false;
        }
    }


    rerenderchart(chartid);
}
function setseriestypestyle(type, chartrandomid) {
    $("#sborderbar_" + chartrandomid).removeClass("seriestypeborder");
    $("#sdottedline_" + chartrandomid).removeClass("seriestypeborder");
    $("#sdotteddoubleline_" + chartrandomid).removeClass("seriestypeborder");
    $("#sdottedsmooth_" + chartrandomid).removeClass("seriestypeborder");
    $("#sareacurved_" + chartrandomid).removeClass("seriestypeborder");
    $("#sbar_" + chartrandomid).removeClass("seriestypeborder");
    $("#sline_" + chartrandomid).removeClass("seriestypeborder");
    $("#slinesmooth_" + chartrandomid).removeClass("seriestypeborder");
    $("#sdashline_" + chartrandomid).removeClass("seriestypeborder");
    $("#sarea_" + chartrandomid).removeClass("seriestypeborder");

    $("#Style1_" + chartrandomid).removeClass("seriestypeborder");
    $("#Style2_" + chartrandomid).removeClass("seriestypeborder");
    $("#Style3_" + chartrandomid).removeClass("seriestypeborder");
    $("#Style4_" + chartrandomid).removeClass("seriestypeborder");
    $("#Style5_" + chartrandomid).removeClass("seriestypeborder");
    $("#Style6_" + chartrandomid).removeClass("seriestypeborder");


    $("#SPie_" + chartrandomid).removeClass("seriestypeborder");
    $("#SRing_" + chartrandomid).removeClass("seriestypeborder");
    $("#SDonut_" + chartrandomid).removeClass("seriestypeborder");


    $("#tableStyle1_" + chartrandomid).removeClass("seriestypeborder");
    $("#tableStyle2_" + chartrandomid).removeClass("seriestypeborder");
    $("#tableStyle3_" + chartrandomid).removeClass("seriestypeborder");



    if (type == "borderbar") {
        $("#sborderbar_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "dottedline") {
        $("#sdottedline_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "dotteddoubleline") {
        $("#sdotteddoubleline_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "dottedsmooth") {
        $("#sdottedsmooth_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "areacurved") {
        $("#sareacurved_" + chartrandomid).addClass("seriestypeborder");
    }

    if (type == "column" || type == "bar") {
        $("#sbar_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "line") {
        $("#sline_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "linesmooth") {
        $("#slinesmooth_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "dashline") {
        $("#sdashline_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "area") {
        $("#sarea_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "area") {
        $("#sarea_" + chartrandomid).addClass("seriestypeborder");
    }




    if (type == "Style1") {
        $("#Style1_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Style2") {
        $("#Style2_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Style3") {
        $("#Style3_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Style4") {
        $("#Style4_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Style5") {
        $("#Style5_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Style6") {
        $("#Style6_" + chartrandomid).addClass("seriestypeborder");
    }

    if (type == "pie") {
        $("#SPie_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "donut") {
        $("#SDonut_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Ring") {
        $("#SRing_" + chartrandomid).addClass("seriestypeborder");
    }


    if (type == "tblStyle1") {
        $("#tableStyle1_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "tblStyle2") {
        $("#tableStyle2_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "tblStyle3") {
        $("#tableStyle3_" + chartrandomid).addClass("seriestypeborder");
    }

    // resetlabelborder();
    //  rerenderchart(getchartidbyrandomid(chartrandomid));
}
function resetstylebar(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var randomid = getrandomchartidusingid(chartid);
    var seriesname = geteditedseriesnameusingid(randomid);
    var seriesobj = chartconfigobj.chartYAxises.find(x => x.label === seriesname);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    if (chartconfigobj.chartType == "table_chart") {
        setseriestypestyle(chartconfigobj.TableChartStyle, randomid);
        if (seriesobj != undefined) {
            $("#slabel_" + randomid).prop("checked", seriesobj.TableChartBar);
            resetlabelborder(randomid, seriesobj.TableChartValueType);
        }

        $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
        $(".LockedRowsLabel").addClass("d-none");
        $("#fixrow_" + randomid).addClass("d-none");
        if (chartconfigobj.TableLocked == false || chartconfigobj.TableLocked == undefined) {
            //$(".LockedRowsLabel").addClass("d-none");
            //$("#fixrow_" + randomid).addClass("d-none");
            $("#BlockRowsBlock_" + randomid).addClass("d-none");

        }
        else {
           // $(".LockedRowsLabel").removeClass("d-none");
            //$("#fixrow_" + randomid).removeClass("d-none");
            //$("#fixrow_" + randomid).val(chartconfigobj.TableLockedRows);
            $("#BlockRowsBlock_" + randomid).removeClass("d-none");
        }
    }
    else {
        var seriesname = geteditedseriesnameusingid(randomid);
        var seriesobj = chartconfigobj.chartYAxises.find(x => x.label === seriesname);
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
        if (seriesobj != undefined) {
            setseriestypestyle(seriesobj.seriestype, randomid);
            $("#slabel_" + randomid).prop("checked", seriesobj.showlabel);
            if (seriesobj.opposite) {
                $("#stypeaxis1_" + randomid).removeClass("active");
                $("#stypeaxis2_" + randomid).addClass("active");
            }
            else {
                $("#stypeaxis1_" + randomid).addClass("active");
                $("#stypeaxis2_" + randomid).removeClass("active");
            }

            $('#box' + randomid).css('background-color', chartconfigobj.chartselectedpallet[seriesindex]);
            resetlabelborder(randomid, seriesobj.LabelType);
            resetlabelSideborder(randomid, seriesobj.LabelSideOrOverLap);
            CallLabelBoxStyles(chartconfigobj);
        }
    }

}
function RemoveThisSeries(btn) {
    var randomchartid = getrandomchartidusingid(btn);//(btn.id);
    var chartid = getchartidbyrandomid(randomchartid);
    var seriesname = geteditedseriesnameusingid(randomchartid);
    removeyaxis(seriesname, chartid);

}
var chartStructure = [];
function getChartStructure() {
    chartStructure = [];
    $("div[id^='charts_data_']").each(function (i, el) {
        var RowId = el.id.replace('charts_data_', '');
        var atom = {
            "rowId": RowId,
            "chartIds": []
        }
        var charts = el.children;
        for (var i = 0; i < charts.length; i++) {
            var ChartId = charts[i].id.replace('_div', '');
            atom.chartIds.push(ChartId);
        }
        chartStructure.push(atom);
    });
}
function resetfirstchartofeveryrowifneed() {
    if (chartStructure.length == 1) {
        if (chartStructure[0].chartIds.length == 1) {
            if (!firstrowfirstchartredraw) {
                firstrowfirstchartredraw = true;
                rerenderchart(chartStructure[0].chartIds[0]);
            }
        }
    }
    if (chartStructure.length == 2) {
        if (chartStructure[1].chartIds.length == 1) {
            if (!secondrowfirstchartredraw) {
                secondrowfirstchartredraw = true;
            }
        }
    }
    if (chartStructure.length == 3) {
        if (chartStructure[2].chartIds.length == 1) {
            if (!thirdrowfirstchartredraw) {
                thirdrowfirstchartredraw = true;
            }
        }
    }
    if (chartStructure.length == 4) {
        if (chartStructure[3].chartIds.length == 1) {
            if (!fourrowfirstchartredraw) {
                fourrowfirstchartredraw = true;
            }
        }
    }
    if (chartStructure.length == 5) {
        if (chartStructure[4].chartIds.length == 1) {
            if (fiverowfirstchartredraw) {
                fiverowfirstchartredraw = false;
            }
        }
    }
}
function redrawfirstchartofeveryrowifneed() {
    if (chartStructure.length == 1) {
        if (chartStructure[0].chartIds.length > 1) {
            if (firstrowfirstchartredraw) {
                firstrowfirstchartredraw = false;
                rerenderchart(chartStructure[0].chartIds[0]);
            }
        }
    }
    if (chartStructure.length == 2) {
        if (chartStructure[1].chartIds.length > 1) {
            if (secondrowfirstchartredraw) {
                secondrowfirstchartredraw = false;
                rerenderchart(chartStructure[1].chartIds[0]);
            }
        }
    }
    if (chartStructure.length == 3) {
        if (chartStructure[2].chartIds.length > 1) {
            if (thirdrowfirstchartredraw) {
                thirdrowfirstchartredraw = false;
                rerenderchart(chartStructure[2].chartIds[0]);
            }
        }
    }
    if (chartStructure.length == 4) {
        if (chartStructure[3].chartIds.length > 1) {
            if (fourrowfirstchartredraw) {
                fourrowfirstchartredraw = false;
                rerenderchart(chartStructure[3].chartIds[0]);
            }
        }
    }
    if (chartStructure.length == 5) {
        if (chartStructure[4].chartIds.length > 1) {
            if (fiverowfirstchartredraw) {
                fiverowfirstchartredraw = false;
                rerenderchart(chartStructure[4].chartIds[0]);
            }
        }
    }
}
function appendnavbar(randomChartId, tool_Id) {
    var chartid = getchartidbyrandomid(randomChartId);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
   
    var toolsMenu = "";
    if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
        toolsMenu = `<nav id="snav_${randomChartId}" class="navbar navbar-expand-lg navbar-light bg-light tools-menu  bar first" style="display: block;">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <input type="hidden" id="txtseriesname_${randomChartId}" value="1">
                        <div class="row align-items-center">
                   <div class="col-md-4">
    <label  class="red category-label" style="font-size: 12px; padding-left: 12px; text-transform: none; "><span id="lbl_${randomChartId}"></span></label>
    <div class="row align-items-end">
        <div class="col-md-2">
            <div class="icon mixed " onclick=changeseriestype("${randomChartId}","borderbar")>
                <img class="seriestypeborder" id="sborderbar_${randomChartId}" src="../../assets/new/Asset1.png">
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","dottedline")>
                <img id="sdottedline_${randomChartId}" src="../../assets/new/Asset6.png" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","dotteddoubleline")>
                <img id="sdotteddoubleline_${randomChartId}" src="../../assets/new/Asset2.png" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","dottedsmooth")>
                <img id="sdottedsmooth_${randomChartId}" src="../../assets/new/Asset4.png" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","areacurved")>
                <img id="sareacurved_${randomChartId}" src="../../assets/new/Curved.png" />

            </div>
        </div>

    </div>
    <div class="row align-items-end">
        <div class="col-md-2">
            <div class="icon mixed " onclick=changeseriestype("${randomChartId}","column")>
                <img class="seriestypeborder" id="sbar_${randomChartId}" src="../../assets/new/Asset5.png" />
            </div>


        </div>
        <div class="col-md-2">
            <div class="icon bar" onclick=changeseriestype("${randomChartId}","line")>
                <img id="sline_${randomChartId}" src="../../assets/new/Asset7.png" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","linesmooth")>
                <img id="slinesmooth_${randomChartId}" src="../../assets/new/Asset3.png" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","dashline")>
                <img id="sdashline_${randomChartId}" src="../../assets/new/Asset8.png" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon" onclick=changeseriestype("${randomChartId}","area")>
                <img id="sarea_${randomChartId}" src="../../assets/new/Asset9.png" />
            </div>
        </div>
    </div>
</div>
<div class="col-md-2">
    <div class="color" style="margin-left:-20px;">
        <button class="prev " onclick=movetoprevious('${randomChartId}')><i class="fa fa-caret-left" aria-hidden="true"></i></button>
        <div class="box" id='box${randomChartId}'></div>
        <button class="next" onclick=movetoforword('${randomChartId}')><i class="fa fa-caret-right" aria-hidden="true"></i></button>
    </div>

</div>
<div class="col-md-2">
    <div class="tool" style="margin-left:-20px;">
        <div class="row align-items-center">
            <div class="col-md-3"><label>Axis</label></div>
            <div class="col-md-9">
                <div class="set-axis">
                    <button class="axis active btn-1 active" onclick=movetoleftaxis("stypeaxis1_${randomChartId}") id="stypeaxis1_${randomChartId}">1</button>
                    <button class="axis btn-2" onclick=movetooppositeaxis("stypeaxis2_${randomChartId}") id="stypeaxis2_${randomChartId}">2</button>
                </div>
            </div>
        </div>


    </div>
    <div class="tool layer d-none" style="margin-left:-20px;">
        <label>Layer</label>
        <div class="set-axis">
            <button class="axis btn-3">-</button>
            <button class="axis btn-4">+</button>
        </div>
    </div>
</div>
<div class="col-md-1 pl-0">
    <div class="tool">

        <div class="row align-items-center">
            <div class="col-md-3">
                <label style="position: relative; left: -20px;">Labels</label>
            </div>
            <div class="col-md-8">
                <div class="custom-control custom-switch mb-1" dir="ltr">
                    <input name="radio" type="checkbox" class="custom-control-input  stylebarlabel" id="slabel_${randomChartId}" checked="checked">
                    <label class="custom-control-label " for="slabel_${randomChartId}"></label>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-md-2">
    <div class="LabelStyle">
        <button class="prev " onclick=movetopreviousLabelStyle('${randomChartId}')><i class="fa fa-caret-left" aria-hidden="true"></i></button>
        <div class="LabelStylebox" id='LabelStylebox${randomChartId}'> Style 1</div>
        <button class="next" onclick=movetoforwordLabelStyle('${randomChartId}')><i class="fa fa-caret-right" aria-hidden="true"></i></button>
    </div>

</div>
<div class="col-md-1">
    <div class="delete">
        <a href="#" id="remove_${randomChartId}" onclick="RemoveThisSeries('remove_${randomChartId}')">Delete</a>
        <button type="button" class="close-panel-btn " onclick="closestylebar('snav_${randomChartId}')">&times;</button>
    </div>
</div>
                            
                        </div>
                        <!--<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <div class="tool tool_charts">
                                    <label id="lbl_300e75f70d7b4" style="font-size: 14px; text-transform: none; ">1</label>
                                    <div class="icon mixed " onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;borderbar&quot;)">
                                        <img class="" id="sborderbar_300e75f70d7b4" src="../../assets/new/Border.png">
                                        <label class="icon-label">Border</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;dottedline&quot;)">
                                        <img id="sdottedline_300e75f70d7b4" src="../../assets/new/Dotted 1.png">
                                        <label class="icon-label">Dotted</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;dotteddoubleline&quot;)">
                                        <img id="sdotteddoubleline_300e75f70d7b4" src="../../assets/new/Dotted.png">
                                        <label class="icon-label">Dotted</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;dottedsmooth&quot;)">
                                        <img id="sdottedsmooth_300e75f70d7b4" src="../../assets/new/Smooth.png">
                                        <label class="icon-label">Smooth</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;areacurved&quot;)">
                                        <img id="sareacurved_300e75f70d7b4" src="../../assets/new/Curved.png">
                                        <label class="icon-label">Curved</label>
                                    </div>
                                    <div class="icon mixed " onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;bar&quot;)">
                                        <img class="seriestypeborder" id="sbar_300e75f70d7b4" src="../../assets/new/bar_black.png">
                                        <label class="icon-label">Bar</label>
                                    </div>
                                    <div class="icon bar" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;line&quot;)">
                                        <img id="sline_300e75f70d7b4" src="../../assets/new/linestyle.png">
                                        <label class="icon-label">Line</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;linesmooth&quot;)">
                                        <img id="slinesmooth_300e75f70d7b4" src="../../assets/new/Smooth.png">
                                        <label class="icon-label">Smooth</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;dashline&quot;)">
                                        <img id="sdashline_300e75f70d7b4" src="../../assets/new/Dash.png">
                                        <label class="icon-label">Dash</label>
                                    </div>
                                    <div class="icon" onclick="changeseriestype(&quot;300e75f70d7b4&quot;,&quot;area&quot;)">
                                        <img id="sarea_300e75f70d7b4" src="../../assets/new/area_black.png">
                                        <label class="icon-label">Area</label>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="tool">
                                    <label>Axis</label>
                                    <div class="set-axis">
                                        <button class="axis active btn-1 active" onclick="movetoleftaxis(&quot;stypeaxis1_300e75f70d7b4&quot;)" id="stypeaxis1_300e75f70d7b4">1</button>
                                        <button class="axis btn-2" onclick="movetooppositeaxis(&quot;stypeaxis2_300e75f70d7b4&quot;)" id="stypeaxis2_300e75f70d7b4">2</button>
                                    </div>
                                </div>
                                <div class="tool layer d-none">
                                    <label>Layer</label>
                                    <div class="set-axis">
                                        <button class="axis btn-3">-</button>
                                        <button class="axis btn-4">+</button>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="tool">
                                    <label>Labels</label>
                                    <div class="custom-control custom-switch mb-2" dir="ltr">
                                        <input name="radio" type="checkbox" class="custom-control-input  stylebarlabel" id="slabel_300e75f70d7b4" checked="checked">
                                        <label class="custom-control-label " for="slabel_300e75f70d7b4"></label>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item color pt-2">
                                <button class="prev" onclick="movetoprevious('300e75f70d7b4')"><i class="fa fa-caret-left" aria-hidden="true"></i></button>
                                <div class="box" id="box300e75f70d7b4" style="background-color: rgb(165, 0, 68);"></div>
                                <button class="next" onclick="movetoforword('300e75f70d7b4')"><i class="fa fa-caret-right" aria-hidden="true"></i></button>
                            </li>
                            <li class="nav-item delete">
                                <a href="#" id="remove_300e75f70d7b4" onclick="RemoveThisSeries('remove_300e75f70d7b4')">Delete</a>
                                <button type="button" class="close-panel-btn " onclick="closestylebar('snav_300e75f70d7b4')">×</button>
                            </li>

                        </ul>-->
                    </div>
                </nav>`;
    }
    else if (chartconfigobj.chartType == "scatter_chart") {
        toolsMenu = `<nav id="snav_${randomChartId}" class="navbar navbar-expand-lg navbar-light bg-light tools-menu bar scattered_chart">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <input type=hidden id="txtseriesname_${randomChartId}" />
                        <div class="row align-items-start">
                            <div class="col-md-3">
                                <label  class="red category-label" style="font-size: 12px; text-transform: none; padding-left: 12px;"><span id="lbl_${randomChartId}"></span></label>
                            </div>
                            <div class="col-md-3">
                                <div class="tool mt-4">
                                    <div class="row justify-content-center">
                                        <div class="col-md-3"><label class="pt-1">Labels</label></div>

                                    <div class="col-md-9">
                                        <div class="custom-control custom-switch mb-2" dir="ltr">
                                            <input name="radio" type="checkbox" class="custom-control-input  stylebarlabel" id="slabel_${randomChartId}" checked="checked">
                                            <label class="custom-control-label " for="slabel_${randomChartId}"></label>
                                        </div>
                                    </div>
                                   </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="color mb-2">
                                    <button class="prev" onclick=movetoprevious('${randomChartId}')><i class="fa fa-caret-left" aria-hidden="true"></i></button>
                                    <div class="box" id='box${randomChartId}'></div>
                                    <button class="next" onclick=movetoforword('${randomChartId}')><i class="fa fa-caret-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="nav-item delete">
                                    <a href="#" id="remove_${randomChartId}" onclick="RemoveThisSeries('remove_${randomChartId}')">Delete</a>
                                    <button type="button" class="close-panel-btn " onclick="closestylebar('snav_${randomChartId}')">&times;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>`;
    }
    else if (chartconfigobj.chartType == "number_chart") {
        toolsMenu = `<nav id="snav_${randomChartId}" class="navbar navbar-expand-lg navbar-light bg-light tools-menu bar number">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <input type=hidden id="txtseriesname_${randomChartId}" />
                        <div class="row align-items-center">
                            <div class="col-md-3">
    <div class="tool tool_charts" style="padding-left:12px;">
        <label  class="red category-label" style="font-size:12px;padding-left: 10px; text-transform:none;"><span id="lbl_${randomChartId}"></span></label>
        <div class="row">
            <div class="col-md-2">
                <div class="icon mixed " onclick=changeseriestype("${randomChartId}","Style1")>
                    <img class="seriestypeborder" id="Style1_${randomChartId}" src="../../assets/new/Font Styles 1.png" />
                </div>
            </div>

            <div class="col-md-2">
                <div class="icon bar" onclick=changeseriestype("${randomChartId}","Style2")>
                    <img id="Style2_${randomChartId}" src="../../assets/new/Font Styles 2.png" />
                </div>
            </div>
            <div class="col-md-2">
                <div class="icon" onclick=changeseriestype("${randomChartId}","Style3")>
                    <img id="Style3_${randomChartId}" src="../../assets/new/Font Styles 3.png" />
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="color">
        <button class="prev" onclick=movetoprevious('${randomChartId}')><i class="fa fa-caret-left" aria-hidden="true"></i></button>
        <div class="box" id='box${randomChartId}'></div>
        <button class="next" onclick=movetoforword('${randomChartId}')><i class="fa fa-caret-right" aria-hidden="true"></i></button>
    </div>
</div>
<div class="col-md-5">
    <div class="delete">
        <a href="#" id="remove_${randomChartId}" onclick="RemoveThisSeries('remove_${randomChartId}')">Delete</a>
        <button type="button" class="close-panel-btn " onclick="closestylebar('snav_${randomChartId}')">&times;</button>
    </div>
</div>
                        </div>
                    </div>
                </nav>`;
    }
    else if (chartconfigobj.chartType == "pie_chart") {
        toolsMenu = `<nav id="snav_${randomChartId}" class="navbar navbar-expand-lg navbar-light bg-light tools-menu bar pie" style="display: block;">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <input type=hidden id="txtseriesname_${randomChartId}" />
                        <div class="row align-items-center">

                            <div class="col-md-3">
  <label  class="red category-label" style="font-size:12px; padding-left: 18px; text-transform: none;"><span id="lbl_${randomChartId}"></span></label>
                                <div class="tool tool_charts" style="padding-left:12px;">
                                  
                                    <div class="row" >
                                        <div class="col-md-3">
                                            <div class="icon bar" onclick=changeseriestype("${randomChartId}","pie")>
                                                <img id="SPie_${randomChartId}" src="../../assets/new/Pie_icon.png">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="icon mixed " onclick=changeseriestype("${randomChartId}","donut")>
                                        	<img class="seriestypeborder" id="SDonut_${randomChartId}" src="../../assets/new/Donut_icon.png" />
                                    	    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tool d-none">
                                    <div class="row align-items-center">
                                        <div class="col-md-4">
                                            <label>LABELS</label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="set-axis">
                                         	<button class="axis btn-5 mb-1 " id="lblPerc_${randomChartId}" onclick=setlabelstyleofpie("${randomChartId}","Percentage")>%</button>
                                        	<button class="axis btn-6" id="lblValu_${randomChartId}" onclick=setlabelstyleofpie("${randomChartId}","Value")>Value</button>
                                    	    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="tool d-none">
                                    <div class="row align-items-center">
                                        <div class="col-md-4">
                                            <label>LABELS</label>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="set-axis">
                                        	<button class="axis btn-7 mb-1" id="lblOverLap_${randomChartId}" onclick=setlabelSidestyleofpie("${randomChartId}","OverLap")>Overlap</button>
                                        	<button class="axis btn-8" id="lblSide_${randomChartId}" onclick=setlabelSidestyleofpie("${randomChartId}","Side")>Side</button>
                                    	    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="delete">
                                    <a href="#" id="remove_${randomChartId}" onclick="RemoveThisSeries('remove_${randomChartId}')">Delete</a>
                                    <button type="button" class="close-panel-btn " onclick="closestylebar('snav_${randomChartId}')">&times;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>`;
    }
    else if (chartconfigobj.chartType == "table_chart") {
        UpdateTableMinMaxRows(chartid);
        toolsMenu = `<nav id="snav_${randomChartId}" class="navbar navbar-expand-lg navbar-light bg-light tools-menu bar table_chart">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <input type=hidden id="txtseriesname_${randomChartId}" />
                        <div class="row align-items-center">

<div class="col-md-3">
 <label  class="orange category-label red mb-1" style="font-size:12px; text-transform:none;"><span id="lbl_${randomChartId}"></span></label>
    <div class="tool tool_charts" style="padding-left:12px;">
 
        <div class="row">
            <div class="col-md-3">
                <div class="icon mixed " onclick=changeseriestype("${randomChartId}","tblStyle1")>
                    <img class="seriestypeborder" id="tableStyle1_${randomChartId}" src="../../assets/new/table-1.png" />
                </div>
            </div>
            <div class="col-md-3">
                <div class="icon bar" onclick=changeseriestype("${randomChartId}","tblStyle2")>
                    <img id="tableStyle2_${randomChartId}" src="../../assets/new/table-2.png" />
                </div>
            </div>
            <div class="col-md-3">
                <div class="icon" onclick=changeseriestype("${randomChartId}","tblStyle3")>
                    <img id="tableStyle3_${randomChartId}" src="../../assets/new/table-3.png" />
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-2">
    <div class="color">
        <button class="prev" onclick=movetoprevioustable('${randomChartId}')><i class="fa fa-caret-left" aria-hidden="true"></i></button>
        <div class="box" id='box${randomChartId}'></div>
        <button class="next" onclick=movetoforwordtable('${randomChartId}')><i class="fa fa-caret-right" aria-hidden="true"></i></button>
    </div>
</div>
<div class="col-md-3">
  
    <div class="tool">
        <div class="set-axis">
            <button class="axis btn-9 mb-1 " id="lblPerc_${randomChartId}" onclick=setlabelstyleofpie("${randomChartId}","Percentage")>%</button>
            <button class="axis btn-10" id="lblValu_${randomChartId}" onclick=setlabelstyleofpie("${randomChartId}","Value")>Value</button>
</div>
    </div>
    <div class="tool">
        <div class="row align-items-center">
            <div style="margin-left:10px">
                <label style="white-space: pre;">BAR CHART</label>
            </div>
            <div style="margin-left:10px">
                <div class="custom-control custom-switch" dir="ltr">
                    <input name="radio" type="checkbox" class="custom-control-input  stylebartable" id="slabel_${randomChartId}" checked="checked">
                    <label class="custom-control-label " for="slabel_${randomChartId}"></label>
                </div>
            </div>




    </div>
</div>
</div>
<div class="col-md-4">
    <div class="delete">
        <a href="#" id="remove_${randomChartId}" onclick="RemoveThisSeries('remove_${randomChartId}')">Delete</a>
        <button type="button" class="close-panel-btn " onclick="closestylebar('snav_${randomChartId}')">&times;</button>
    </div>
</div>
                        </div>
                    </div>
                </nav>`;
    }
    $(`#` + tool_Id).empty();
    $(`#` + tool_Id).append(toolsMenu);
}



//<div class="icon" onclick=changeseriestype("${randomChartId}", "Ring") >
//                                        <img id="SRing_${randomChartId}" src="../../assets/new/Ring.png" />
//                                        <label class="icon-label">Ring</label>
//                                    </div >

//<div class="icon" onclick=changeseriestype("${randomChartId}", "Style4") >
//                                        <img id="Style4_${randomChartId}" src="../../assets/new/Font Styles 4.png" />
//                                        <label class="icon-label">Style 4</label>
//                                    </div >
//    <div class="icon" onclick=changeseriestype("${randomChartId}", "Style5") >
//                                        <img id="Style5_${randomChartId}" src="../../assets/new/Font Styles 5.png" />
//                                        <label class="icon-label">Style 5</label>
//                                    </div >



/////////////////end edit style baar/////////

//// <a id="deleteXaxis_btn_${randomId}" onclick="RemovexaxisChart('${randomId}', '${randomChartId}')" class="btn del btn-danger btn-sm float-right d-none" style="color: white">Delete xaxis</a>


//function updatechart(axis, cat, chartType,chartId) {
//    loading_start();
//    if (chartType=='bar_chart'&&ValidationBarChart(cat)) {
//        selectbarchart = chartType;
//        selectbarchartaxis = axis;

//        selectbarcharttype = chartType;
//        if (axis == "x") {
//            selectbarchartxaxisfield = cat;
//        }
//        else {
//            selectbarchartcatfields.push(cat);
//        }

//        rerenderchart();
//    }
//    if (chartType == 'line_chart' && ValidationLineChart(cat)) {
//        selectlinechart = chartType;
//        linechartaxis = axis;

//        linecharttype = chartType;
//        if (axis == "x") {
//            linechartxaxisfield = cat;
//        }
//        else {
//            linechartcatfields.push(cat);
//        }

//        rerenderchart();
//    }

//    loading_end();
//}




function updatexaxisbackground(chartId, cat) {
    var notmojuud = false;
    for (var i = 0; i < PinkFields.length; i++) {
        if (PinkFields[i] == cat) {
            notmojuud = true;
            break;
        }
    }
    setTimeout(function () {
        if (notmojuud) {
            $("#b" + chartId).addClass('misscolbackground');
            $("#b" + chartId).css('color', 'white');
        }
        else {
            $("#b" + chartId).removeClass('misscolbackground');
            $("#b" + chartId).css('color', 'black');
        }
    }, 100);

}


function removeyaxisusingmarker(yaxislable, chartid, e)  {
    if (confirm("Are you sure to delete this?")) {
        removeyaxiscall = false;
        var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
        if (chartconfigobj != undefined) {
            if (chartconfigobj.chartType != "pie_chart") {
                /*   var index = chartconfigobj.chartYAxises.indexOf(yaxislable);*/
                var index = chartconfigobj.chartYAxises.findIndex(x => x.label === yaxislable);
                chartconfigobj.chartYAxises.splice(index, 1);
                rerenderchart(chartid);
            }
            if (chartconfigobj.chartType == "pie_chart") {
                var index = chartconfigobj.chartXAxisLabels.findIndex(x => x.label === yaxislable);
                chartconfigobj.chartXAxisLabels.splice(index, 1);
                if (chartconfigobj.chartXAxisLabels.length < 1) {
                    chartconfigobj.chartYAxises = [];
                }
                rerenderchart(chartid);
            }
            //  alert("Confirmed! Item deleted");
            var randomchartid = getrandomchartidusingid(chartid);
            Closethisbar("snav_" + randomchartid);
        }
    }
    else {
        removeyaxiscall = false;
        e.stopPropagation();
        // $(".apexcharts-reset-icon").click();
        return false;
        //  $(".apexcharts-reset-icon").click();

    }

}


function hideallstyletoolbar() {
    $(".close-panel-btn").each(function (index) {

        if ($(this).parents("nav").is(":visible")) {
            $(this).trigger("click");
        }

    });
}



function HideShowTotalDiv(id, charId) {
    var chartid = "chart_" + charId;
    var ancertagid = "#anc_" + charId;
    var chartobj = chartsconfigurations.find(x => x.chartId == chartid);
    var anctagtext = $(ancertagid).text();
    $(ancertagid).empty();
    if (anctagtext == "Show Total") {
        chartobj.ShowTotals = true;
        $(ancertagid).text("Hide Total");
    }
    else {
        chartobj.ShowTotals = false;
        $(ancertagid).text("Show Total");
    }

    rerenderchart(chartid);
}

function movetoprevious(randomid) {
    var seriesname = $("#txtseriesname_" + randomid).val();
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label == seriesname);
        var previouselectedpalletindex = selectedpallet.findIndex(x => x === chartconfigobj.chartselectedpallet[seriesindex]);
        if (previouselectedpalletindex > 0) {

            chartconfigobj.chartselectedpallet[seriesindex] = selectedpallet[previouselectedpalletindex - 1];
            $('#box' + randomid).css('background-color', chartconfigobj.chartselectedpallet[seriesindex]);

            rerenderchart(chartid);
        }
        else {
            chartconfigobj.chartselectedpallet[seriesindex] = selectedpallet[selectedpallet.length - 1];
            $('#box' + randomid).css('background-color', chartconfigobj.chartselectedpallet[seriesindex]);

            rerenderchart(chartid);
        }
    }
    CallLabelBoxStyles(chartconfigobj);
}
function movetopreviousLabelStyle(randomid) {
    var seriesname = $("#txtseriesname_" + randomid).val();
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        var seriesobj = chartconfigobj.chartYAxises.find(x => x.label == seriesname);
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label == seriesname);
        if (seriesobj != undefined) {
            if (seriesobj.LabelStyle == undefined || seriesobj.LabelStyle == 'Style2') {
                chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style1";
            }
            else {
                if (seriesobj.LabelStyle == "Style1") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style5";
                }
                else if (seriesobj.LabelStyle == "Style5") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style4";

                }
                else if (seriesobj.LabelStyle == "Style4") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style3";
                }
                else if (seriesobj.LabelStyle == "Style3") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style2";
                }
            }

            CallLabelBoxStyles(chartconfigobj);
            rerenderchart(chartid);

        }
    }
}
function movetoforwordLabelStyle(randomid) {
    var seriesname = $("#txtseriesname_" + randomid).val();
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        var seriesobj = chartconfigobj.chartYAxises.find(x => x.label == seriesname);
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label == seriesname);
        if (seriesobj != undefined) {
            if (seriesobj.LabelStyle == undefined || seriesobj.LabelStyle == 'Style5') {
                chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style1";
            }
            else {
                if (seriesobj.LabelStyle == "Style4") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style5";
                }
                else if (seriesobj.LabelStyle == "Style3") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style4";
                }
                else if (seriesobj.LabelStyle == "Style2") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style3";
                }
                else if (seriesobj.LabelStyle == "Style1") {
                    chartconfigobj.chartYAxises[seriesindex].LabelStyle = "Style2";
                }
            }
            CallLabelBoxStyles(chartconfigobj);
            rerenderchart(chartid);
        }
    }
}
function CallLabelBoxStyles(chartconfigobj) {
    var randomid = getrandomchartidusingid(chartconfigobj.chartId);
    var seriesname = $("#txtseriesname_" + randomid).val();
    if (document.getElementById(`slabel_${randomid}`).checked) {
        $(".LabelStyle").show();
    }
    else {
        $(".LabelStyle").hide();
    }
    if (chartconfigobj != undefined) {

        var seriesobj = chartconfigobj.chartYAxises.find(x => x.label == seriesname);
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label == seriesname);
        var seriesSelectedcolor = chartconfigobj.chartselectedpallet[seriesindex];
        var OrigionalPalletColorIndex = selectedpallet.findIndex(x => x == seriesSelectedcolor);
        var colorindex = OrigionalPalletColorIndex;//GetSeriesIndexForDataLabels(OrigionalPalletColorIndex);
        var seriescolor = selectedpallet[colorindex];
        var background;
        var color;
        var border;
        if (seriesobj != undefined) {
            if (seriesobj.LabelStyle == undefined || seriesobj.LabelStyle == 'Style5') {
                background = hexToRgb(seriescolor, 0.3);
                color = 'black';
                border = 'none';
            }
            else {
                if (seriesobj.LabelStyle == "Style4") {
                    background = seriescolor;//hexToRgb(seriescolor, 0.3);
                    color = 'White';
                    border = 'none';//'2px solid black';
                }
                else if (seriesobj.LabelStyle == "Style3") {
                    background = 'white';//hexToRgb(seriescolor, 10);//chartconfigobj.chartselectedpallet[colorindex];
                    color = 'black';
                    border = '2px solid ' + hexToRgb(seriescolor, 10);

                }
                else if (seriesobj.LabelStyle == "Style2") {
                    background = 'White';
                    color = 'black';
                    border = 'none'//'2px solid ' + hexToRgb(seriescolor, 10);
                }
                else if (seriesobj.LabelStyle == "Style1") {
                    background = 'White';
                    color = seriescolor;//'black';
                    border = 'none';
                }
            }
            SetLabelBoxStyles(background, border, color, randomid, chartconfigobj.chartYAxises[seriesindex].LabelStyle);
        }
    }
}

function SetLabelBoxStyles(BackgroundColor, Border, Color, randomid, LabelStyle) {
    $('#LabelStylebox' + randomid).css('background-color', BackgroundColor);
    $('#LabelStylebox' + randomid).css('color', Color);
    $('#LabelStylebox' + randomid).css('border', Border);
    $('#LabelStylebox' + randomid).empty();
    $('#LabelStylebox' + randomid).text(LabelStyle);
}

function GetDataLabelHTMLOld(Chartobj, catfield, seriesindex) {
    var background = "";
    var color;
    var border;
    var seriesSelectedcolor = Chartobj.chartselectedpallet[seriesindex];
    var OrigionalPalletColorIndex = selectedpallet.findIndex(x => x == seriesSelectedcolor);
    var colorindex = OrigionalPalletColorIndex;//GetSeriesIndexForDataLabels(OrigionalPalletColorIndex);
    var seriescolor = selectedpallet[colorindex];



    // seriesindex = GetSeriesIndexForDataLabels(seriesindex);




    var padding = "";
    var DataLabelHtml = "";
    if (catfield.LabelStyle == "Style1") {
        //  background = 'White';
        color = hexToRgb(seriescolor, 10);//seriescolor;//Chartobj.chartselectedpallet[seriesindex];
        border = 'none';
    }
    if (catfield.LabelStyle == "Style2") {
        //background = 'White';
        color = 'black';
        border = 'none';
    }
    if (catfield.LabelStyle == "Style3") {
        background = 'White';
        color = 'black';
        border = '1px solid ' + hexToRgb(seriescolor, 10);//seriescolor;//Chartobj.chartselectedpallet[seriesindex];
        padding = 'padding-left:1px;padding-right:1px';
    }
    if (catfield.LabelStyle == "Style4") {
        background = hexToRgb(seriescolor, 10);//seriescolor;//Chartobj.chartselectedpallet[seriesindex];
        color = 'white';
        border = 'none';//'2px solid black';
        /* padding = 'padding:1px';*/
        padding = 'padding-left:1px;padding-right:1px';
    }
    if (catfield.LabelStyle == "Style5") {
        background = hexToRgb(seriescolor, 0.2);// hexToRgb(Chartobj.chartselectedpallet[seriesindex], 0.3);
        color = 'black';
        border = 'none';//'2px solid black';
        /* padding = 'padding:1px';*/
        padding = 'padding-left:1px;padding-right:1px';
    }
    //var selecter = ".LabelStyle_" + catfield.label + "_" + Chartobj.chartId +" >span";
    //$(selecter).css('background-color', background);
    //$(selecter).css('color', color);
    //$(selecter).css('border', border)
    if (background == "") {
        DataLabelHtml = "<text data-z-index='1' style='color:" + color + ";border:" + border + ";" + padding + "'>VALUE</text>"
    }
    else {
        DataLabelHtml = "<text data-z-index='1' style='color:" + color + ";border:" + border + ";background-color:" + background + ";" + padding + "'>VALUE</text>"
    }

    return DataLabelHtml;
}

function GetDataLabelHTML(Chartobj, catfield, seriesindex) {

    var seriesSelectedcolor = Chartobj.chartselectedpallet[seriesindex];
    var OrigionalPalletColorIndex = selectedpallet.findIndex(x => x == seriesSelectedcolor);
    var colorindex = OrigionalPalletColorIndex;//GetSeriesIndexForDataLabels(OrigionalPalletColorIndex);
    var seriescolor = selectedpallet[colorindex];
    var padding = "";
    var DataLabelHtml = "";
    if (catfield.LabelStyle == "Style1") {
        //  background = 'White';
        labelscolor = hexToRgb(seriescolor, 10);//seriescolor;//Chartobj.chartselectedpallet[seriesindex];
        labelsborderColor = 'none';
    }
    if (catfield.LabelStyle == "Style2") {
        //background = 'White';
        labelscolor = 'black';
        labelsborderColor = 'none';
    }
    if (catfield.LabelStyle == "Style3") {
        labelsbackgroundcolor = 'White';
        labelscolor = 'black';
        labelsborderColor = hexToRgb(seriescolor, 10);
        labelsborderWidth = 1;//seriescolor;//Chartobj.chartselectedpallet[seriesindex];
        labelspadding = 2;
    }
    if (catfield.LabelStyle == "Style4") {
        labelsbackgroundcolor = hexToRgb(seriescolor, 10);//seriescolor;//Chartobj.chartselectedpallet[seriesindex];
        labelscolor = 'white';
        labelsborderColor = 'none';//'2px solid black';
        labelspadding = 2;
    }
    if (catfield.LabelStyle == "Style5") {
        labelsbackgroundcolor = hexToRgb(seriescolor, 0.2);// hexToRgb(Chartobj.chartselectedpallet[seriesindex], 0.3);
        labelscolor = 'black';
        labelsborderColor = 'none';//'2px solid black';
        labelspadding = 2;
    }
    //if (background == "") {
    //    DataLabelHtml = "<text data-z-index='1' style='color:" + color + ";border:" + border + ";" + padding + "'>VALUE</text>"
    //}
    //else {
    //    DataLabelHtml = "<text data-z-index='1' style='color:" + color + ";border:" + border + ";background-color:" + background + ";" + padding + "'>VALUE</text>"
    //}

    return DataLabelHtml;
}

function GetSeriesIndexForDataLabels(index) {
    if (index == 0 || index == 4 || index == 8 || index == 12 || index == 16 || index == 20) {
        return 0;
    }
    if (index == 1 || index == 5 || index == 9 || index == 13 || index == 17) {
        return 1;
    }
    if (index == 2 || index == 6 || index == 10 || index == 14 || index == 18) {
        return 2;
    }
    if (index == 3 || index == 7 || index == 11 || index == 15 || index == 19) {
        return 3;
    }


}

function movetoforword(randomid) {
    var seriesname = $("#txtseriesname_" + randomid).val();
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label == seriesname);
        var previouselectedpalletindex = selectedpallet.findIndex(x => x === chartconfigobj.chartselectedpallet[seriesindex]);
        if (previouselectedpalletindex < selectedpallet.length - 1 && previouselectedpalletindex > -1) {
            var newcolour = selectedpallet[previouselectedpalletindex + 1];
            chartconfigobj.chartselectedpallet[seriesindex] = newcolour;
            $('#box' + randomid).css('background-color', chartconfigobj.chartselectedpallet[seriesindex]);

            rerenderchart(chartid);
        }
        else {
            var newcolour = selectedpallet[0];
            chartconfigobj.chartselectedpallet[seriesindex] = newcolour;
            $('#box' + randomid).css('background-color', chartconfigobj.chartselectedpallet[seriesindex]);

            rerenderchart(chartid);
        }

    }
    CallLabelBoxStyles(chartconfigobj);
}

function movetoprevioustable(randomid) {
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        var previouselectedpalletindex = tablepallet1.findIndex(x => x === chartconfigobj.TableChartRowColour);
        if (chartconfigobj.TableChartStyle == "tblStyle1") {
            if (previouselectedpalletindex > 0) {

                chartconfigobj.TableChartRowColour = tablepallet1[previouselectedpalletindex - 1];
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
                rerenderchart(chartid);
            }
            else {
                chartconfigobj.TableChartRowColour = tablepallet1[tablepallet1.length - 1];
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
                rerenderchart(chartid);
            }
        }
    }
    if (chartconfigobj.TableChartStyle == "tblStyle2") {
        var previouselectedpalletindex = tablepallet2.findIndex(x => x === chartconfigobj.TableChartRowColour);
        if (previouselectedpalletindex > 0) {

            chartconfigobj.TableChartRowColour = tablepallet2[previouselectedpalletindex - 1];
            $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
            rerenderchart(chartid);
        }
        else {
            chartconfigobj.TableChartRowColour = tablepallet2[tablepallet2.length - 1];
            $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
            rerenderchart(chartid);
        }
    }
    if (chartconfigobj.TableChartStyle == "tblStyle3") {
        var previouselectedpalletindex = selectedpallet.findIndex(x => x === chartconfigobj.TableChartRowColour);
        if (previouselectedpalletindex > 0) {

            chartconfigobj.TableChartRowColour = selectedpallet[previouselectedpalletindex - 1];
            $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
            rerenderchart(chartid);
        }
        else {
            chartconfigobj.TableChartRowColour = selectedpallet[selectedpallet.length - 1];
            $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
            rerenderchart(chartid);
        }
    }
}
function movetoforwordtable(randomid) {
    var seriesname = $("#txtseriesname_" + randomid).val();
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        if (chartconfigobj.TableChartStyle == "tblStyle1") {
            var previouselectedpalletindex = tablepallet1.findIndex(x => x === chartconfigobj.TableChartRowColour);
            if (previouselectedpalletindex < tablepallet1.length - 1 && previouselectedpalletindex > -1) {
                var newcolour = tablepallet1[previouselectedpalletindex + 1];
                chartconfigobj.TableChartRowColour = newcolour;
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
                settablestyle(chartconfigobj);
                //  rerenderchart(chartid);
            }
            else {
                var newcolour = tablepallet1[0];
                chartconfigobj.TableChartRowColour = newcolour;
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
                //rerenderchart(chartid);
                settablestyle(chartconfigobj);
            }
        }
        if (chartconfigobj.TableChartStyle == "tblStyle2") {
            var previouselectedpalletindex = tablepallet2.findIndex(x => x === chartconfigobj.TableChartRowColour);
            if (previouselectedpalletindex < tablepallet2.length - 1 && previouselectedpalletindex > -1) {
                var newcolour = tablepallet2[previouselectedpalletindex + 1];
                chartconfigobj.TableChartRowColour = newcolour;
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);

                // rerenderchart(chartid);
                settablestyle(chartconfigobj);
            }
            else {
                var newcolour = tablepallet2[0];
                chartconfigobj.TableChartRowColour = newcolour;
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
                // rerenderchart(chartid);
                settablestyle(chartconfigobj);
            }
        }
        if (chartconfigobj.TableChartStyle == "tblStyle3") {
            var previouselectedpalletindex = selectedpallet.findIndex(x => x === chartconfigobj.TableChartRowColour);
            if (previouselectedpalletindex < selectedpallet.length - 1 && previouselectedpalletindex > -1) {
                var newcolour = selectedpallet[previouselectedpalletindex + 1];
                chartconfigobj.TableChartRowColour = newcolour;
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);

                //  rerenderchart(chartid);
                settablestyle(chartconfigobj);
            }
            else {
                var newcolour = selectedpallet[0];
                chartconfigobj.TableChartRowColour = newcolour;
                $('#box' + randomid).css('background-color', chartconfigobj.TableChartRowColour);
                // rerenderchart(chartid);
                settablestyle(chartconfigobj);
            }
        }
    }
}



function setdatausageflags() {
    $.each(chartsconfigurations, function (i, chartconfigurationobj) {
        $.each(chartconfigurationobj.chartYAxises, function (s, catfield) {
            //  chartconfigurationobj.chartYAxises[s].seriesusage = true;
            chartsconfigurations[i].chartYAxises[s].seriesusage = true;
        });
        // chartconfigurationobj.chartSeries = [];
        chartsconfigurations[i].chartSeries = [];
    });
}

function setdatausageflagsofSingleChart(chartconfigurationobj) {
    var chartconfigIndex = chartsconfigurations.findIndex(x => x.chartId == chartconfigurationobj.chartId);
        $.each(chartconfigurationobj.chartYAxises, function (s, catfield) {
            chartsconfigurations[chartconfigIndex].chartYAxises[s].seriesusage = true;
        });
    chartsconfigurations[chartconfigIndex].chartSeries = [];
 
}
function RemoveChart(rowId, charId) {
    currentscroll = $(document).scrollTop();

    var oldchartid = "chart_" + charId;
    var chartobj = chartsconfigurations.find(x => x.chartId == oldchartid);


    chartIds = chartIds.filter(e => e !== `chart_${charId}`);
    destroychartusingchartobj(chartobj);
    $(`#chart_div_${charId}`).remove();
    var chartindex = chartsconfigurations.findIndex(x => x.chartId == oldchartid);
    chartsconfigurations.splice(chartindex, 1);
    var totalChartsInDiv = $(`#charts_data_${rowId} > div`).length;
    if (totalChartsInDiv == 0) {
        RemoveRow(rowId);

        return;

    }
    var col_md = 12 / totalChartsInDiv;

    $(`#sidebar_${rowId}`).removeClass('d-none');
    //SetDynamicGrid();
    $(`#${rowId} .dynamic-grid`).removeClass("col-md-12");
    if ($("body").hasClass("enlarge-menu")) {
        $(`#${rowId} .dynamic-grid`).addClass("col-md-12");
    }
    else {
        $(`#${rowId} .dynamic-grid`).addClass("col-md-9");
    }

    //RefreshAllCharts();

    if ($('.tools-menu').parent().hasClass("col-md-12")) {
        $('.tools-menu').removeClass('responsive');
        $('.tools-menu .navbar-nav').css('width', '100%');
    }

    if (!$('.tools-menu').parent().hasClass("col-md-4", "col-md-3")) {
        $('.responsive.tools-menu .navbar-nav').css('width', '50%');
    }
    //$(`#charts_data_${rowId} > div`).each((index, elem) => {
    //    $(`#${elem.id}`).removeClass('col-md-12');
    //    $(`#${elem.id}`).removeClass('col-md-6');
    //    $(`#${elem.id}`).removeClass('col-md-4');
    //    $(`#${elem.id}`).removeClass('col-md-3');
    //    $(`#${elem.id}`).addClass('col-md-' + col_md);
    //    //  chartIns.find(x => x.id === `chart_${charId}`).instance.resetSeries();
    //});

    adjustRowChartsWidth(rowId);
    reflowAllHighcharts();
    if (chartobj.chartType != "number_chart" || chartobj.chartType != "table_chart") {
        $.each(chartIns, function (i) {
            if (chartIns[i].id === charId) {
                chartIns.splice(i, 1);
                return false;
            }
        });
    }
    AutoAdjustWholeComment(rowId);
}


function destroychartusingchartobj(chartobj) {
    try {

        if (chartobj.chartType != "number_chart" || chartobj.chartType != "table_chart") {
            // var grapharea = document.getElementById(oldchartid).getContext("2d");
            if (chartobj.chartType == "pie_chart" || chartobj.chartType == "scattered_chart") {
                ApexCharts.exec(chartobj.chartId, 'destroy', chartobj.Options);
            }
            if (chartobj.chartType == "bar_chart" || chartobj.chartType == "line_chart" || chartobj.chartType == "mixed_chart") {
                destoryhighchart(chartobj);
                //   reflowAllHighcharts();
            }




            //var myChart = new Chart(grapharea, options);

        }
        reflowAllHighcharts();
    }
    catch (ex) {
        var data = "";
    }
}



function destroyAllCharts(clearpinkfields) {
    $.each(chartsconfigurations, function (i, chartconfigurationobj) {
        destroychartusingchartobj(chartconfigurationobj);
    });
    if (clearpinkfields != false) {
        PinkFields = [];
        RplaceAbleFields = [];
    }

    //Highcharts.charts = [];
    //$.each(Highcharts.charts, function (index, chart) {

    //    if (chart == undefined) {
    //        Highcharts.charts.splice(index, 1);
    //    }

    //});
}


function reflowAllHighcharts() {
    try {
        $.each(Highcharts.charts, function (index, chart) {
            if (chart != undefined) {
              //  chart.redraw();
                chart.reflow();
            }

        });

    } catch (ex) {
        var da = "";
    }
}

function reflowAllHighchartswithtimer() {
    setTimeout(function () {
        reflowAllHighcharts();
        setTimeout(function () {
            reflowAllHighcharts();
            // hideshowtotalonthetimeofreupload();
        }, 250);
    }, 150);
}


function destoryhighchart(chartobj) {
    try {
        $.each(Highcharts.charts, function (index, chart) {

            if (chart != undefined && chart.renderTo.id == chartobj.chartId) {
                chart.destroy();
                //   Highcharts.charts.splice(index, 1);
            }

        });
        //$.each(Highcharts.charts, function (index, chart) {

        //    //if (chart == undefined) {
        //    //    Highcharts.charts.splice(index, 1);
        //    //}

        //});
    } catch (ex) {
        var da = "";
    }
}
function removelegendiv(chartid) {
    try {
        $("#legenddiv_" + chartid).remove();
    } catch (e) {

    }

}


function hideshowtotalonthetimeofreupload() {

    var resetflag = false;
    $.each(chartsconfigurations, function (i, chartobj) {
        if (chartobj.chartType == "bar_chart" || chartobj.chartType == "line_chart" || chartobj.chartType == "mixed_chart") {
            if (!resetflag) {
                var randomid = getrandomchartidusingid(chartobj.chartId);
                HideShowTotalDiv(randomid, randomid);
                HideShowTotalDiv(randomid, randomid);
                resetflag = true;
            }

        }
    });
}


function CheckNullUndefined(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}


//$(window).bind('beforeunload', function () {
//    return '';
//});

function ShowBlockIcon(id) {
    if ($("#" + id).prop('disabled')) {
        $("#" + id).css("cursor", "not-allowed")
    }
}

function hexToRgb(hex, alpha) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
}

function ComputeAjaxCallProgress(evt,Message,HundredPercent,ShowHideclass) {
            var percentComplete = parseInt((evt.loaded / evt.total) * 100);
            //Do something with upload progress
            if (HundredPercent!=true && percentComplete > 75) {
                percentComplete = 75;
            }
            console.log(percentComplete);
    loading_start(percentComplete, percentComplete, Message,false, ShowHideclass);
}


function ShowCounterAnimationofProgressbar(PreviousCounter, CurrentCounter, TimerChangeforPdf) {
    var durations = 300;
    if (TimerChangeforPdf == true) {
        durations = 300;
    }
    $({ Counter: PreviousCounter }).animate({
        Counter: CurrentCounter
    }, {
        duration: durations,
        easing: 'swing',
        step: function () {
            if (this.Counter > 100) {
                this.Counter = 100;
            }
            if (this.Counter > 97) {
                this.Counter = 100;
            }
        /*    $("#LoaderPercentage").empty();*/
            $('#LoaderPercentage').text(Math.ceil(this.Counter));
        }
    });
}

function LockUnLockChart(RandomChartId) {
    var ChartId = "chart_" + RandomChartId;
    var chartconfigIndex = chartsconfigurations.findIndex(x => x.chartId == ChartId);
    var chartconfigObj = chartsconfigurations.find(x => x.chartId == ChartId);
    if (chartconfigObj.TableLocked) {
        chartsconfigurations[chartconfigIndex].TableLocked = false;
        chartconfigObj.TableLocked = false;
    }
    else {
        chartsconfigurations[chartconfigIndex].TableLocked = true;
        chartconfigObj.TableLocked = true;
    }
    setchartxaxis(ChartId);

    var tableRowLength = $("#tablechart_" + RandomChartId + ">tbody>tr").length;
    if (tableRowLength > 7) {
        TableLockMinRows = 8;
        TableLockMaxRows = tableRowLength;
        if (chartconfigObj.TableLockedRows < 8) {
            chartconfigObj.TableLockedRows = 8;
        }
    }
    else {
        TableLockMinRows = tableRowLength;
        TableLockMaxRows = tableRowLength;
        chartconfigObj.tableLockRows = TableLockMinRows;
    }
    //  bindScroller(chartconfigObj);
   // 
    hideshowandrenameLockButton(chartconfigObj);
    setdatausageflagsofSingleChart(chartconfigObj);

    rerenderchart(ChartId);
}

function bindScroller(chartconfigobj) {
    var chartid = chartconfigobj.chartId;
    var allow = chartconfigobj.TableLocked;
    document.getElementById("tablediv" + chartid).scroll(0, 0);
    if (allow) {
        $('#tablediv' + chartid).bind('scroll', function (e) {
          //  document.getElementById("tablediv" + chartid).scroll(0, 0);
        });
    }
    else {
      //  $('#tablediv' + chartid).unbind('scroll');
    }
}

function GetWeekDayIndex(Weekname) {
    if (Weekname == "Monday") {
        return 1;
    }
    if (Weekname == "Tuesday") {
        return 2;
    }
    if (Weekname == "Wednesday") {
        return 3;
    }
    if (Weekname == "Thursday") {
        return 4;
    }
    if (Weekname == "Friday") {
        return 5;
    }
    if (Weekname == "Saturday") {
        return 6;
    }
    if (Weekname == "Sunday") {
        return 7;
    }
}
function GetMonthIndex(monthname) {
    if (monthname == "January") {
        return 1;
    }
    if (monthname == "February") {
        return 2;
    }
    if (monthname == "March") {
        return 3;
    }
    if (monthname == "April") {
        return 4;
    }
    if (monthname == "May") {
        return 5;
    }
    if (monthname == "June") {
        return 6;
    }
    if (monthname == "July") {
        return 7;
    }
    if (monthname == "August") {
        return 8;
    }
    if (monthname == "September") {
        return 9;
    }
    if (monthname == "October") {
        return 10;
    }
    if (monthname == "November") {
        return 11;
    }
    if (monthname == "December") {
        return 12;
    }
}
function GetWeekNoIndex(item) {
    var splittedno = item.split(' ')[1];
    return parseInt(splittedno);
}

function changetableLockedRows(FieldId) {
   // debugger;
    var randomid = getrandomchartidusingid(FieldId);
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    chartconfigobj.TableLockedRows = $(FieldId).text();
    $("#BlockRows_" + randomid).text('');
    setchartxaxis(chartid);
    var tableRowLength = chartconfigobj.chartXAxisShowLabels.length;//$("#tablechart_" + randomid + ">tbody>tr").length;
    if (tableRowLength < 6 && chartconfigobj.TableLockedRows > tableRowLength || tableRowLength < 6 && chartconfigobj.TableLockedRows < tableRowLength) {
       // $("#" + FieldId).val(tableRowLength);
        chartconfigobj.TableLockedRows = tableRowLength;
       
    }
    if (tableRowLength > 6 && chartconfigobj.TableLockedRows < 6) {
       // $("#" + FieldId).val(6);
        chartconfigobj.TableLockedRows = 6;
       // $("#BlockRows_" + randomid).text(6);
    }
    if (tableRowLength > 6 && chartconfigobj.TableLockedRows > tableRowLength) {
       // $("#" + FieldId).val(tableRowLength);
        chartconfigobj.TableLockedRows = tableRowLength;
      //  $("#BlockRows_" + randomid).text(tableRowLength);
    }
    $("#BlockRows_" + randomid).text(chartconfigobj.TableLockedRows);
    setdatausageflagsofSingleChart(chartconfigobj);
    rerenderchart(chartid);
}
function UpdateTableMinMaxRows(FieldId) {
    var randomid = getrandomchartidusingid(FieldId);
    var chartid = "chart_" + randomid;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var tableRowLength = chartconfigobj.chartXAxisLabels.length;//$("#tablechart_" + randomchartid + ">tbody>tr").length;
    if (tableRowLength > 6) {
        TableLockMinRows = 6;
        TableLockMaxRows = tableRowLength;
        if (chartconfigobj.TableLockedRows < 6) {
            chartconfigobj.TableLockedRows = 6;
        }
    }
    else {

        TableLockMinRows = tableRowLength;
        TableLockMaxRows = tableRowLength;
        chartconfigobj.TableLockedRows = TableLockMinRows;
    }
}

function closeAllPanels() {
    $(".close-panel-btn").each(function (index) {

        if ($(this).parents("nav").is(":visible")) {
            $(this).trigger("click");
        }

    });
}
function MinusBlockRows(randomid) {
    var blockrows = $("#BlockRows_" + randomid).text();
    $("#BlockRows_" + randomid).text('');
    blockrows = parseInt(blockrows) - 1;
    $("#BlockRows_" + randomid).text(blockrows);
    changetableLockedRows("#BlockRows_" + randomid);
}
function PlusBlockRows(randomid) {
    var blockrows = $("#BlockRows_" + randomid).text();
    $("#BlockRows_" + randomid).text('');
    blockrows = parseInt(blockrows) + 1;
    $("#BlockRows_" + randomid).text(blockrows);
    changetableLockedRows("#BlockRows_" + randomid);
}

function RefreshTableRowsCount(chartconfigobj) {
    var randomid = getrandomchartidusingid(chartconfigobj.chartId);
    $("#BlockRows_" + randomid).text('');
    $("#BlockRows_" + randomid).text(chartconfigobj.TableLockedRows);
}
function HideShowRowBlocksSpan(chartconfigobj) {
    var randomid = getrandomchartidusingid(chartconfigobj.chartId);
    if (chartconfigobj.TableLocked) {
        $("#BlockRowsBlock_" + randomid).removeClass("d-none");
    }
    else {
        $("#BlockRowsBlock_" + randomid).addClass("d-none");
    }
}