
var pallet1 = ['#A50044', '#004D98', '#EDBB00', '#FFED02', '#ff80b5', '#80bfff', '#ffe380', '#fff780'];
var pallet2 = ['#A800FF', '#0079FF', '#00F11D', '#FFEF00', '#d580ff', '#80bbff', '#80ff8e', '#fff780'];
var pallet3 = ['#010101', '#4BE1EC', '#F53C3C', '#377280', '#bfbfbf', '#8cecf3', '#f98686', '#a6cfd9'];
var pallet4 = ['#510C6C', '#E74164', '#F7CC3D', '#38C8A7', '#d58cf2', '#f18ea3', '#fadf85', '#9be4d3'];

var pallet5 = ['#F79400', '#136BAE', '#000000', '#222E3C', '#ffcc80', '#8cc6f2', '#bfbfbf', '#adbed1'];
var pallet6 = ['#097275', '#03444A', '#F4E9CD', '#C96C1C', '#88f2f6', '#85f0fa', '#a78225', '#f0bc8f'];
var pallet7 = ['#DE3036', '#0061CB', '#EDAA02', '#82B216', '#ed9194', '#80bdff', '#feda81', '#caee77'];
var pallet8 = ['#EB4E21', '#01A4EF', '#80BB01', '#FFB901', '#f4a18a', '#80d6fe', '#d6fe80', '#ffdb80'];
var pallet9 = ['#101162', '#0F1585', '#13A0F0', '#08F5E6', '#9193ed', '#757bf0', '#87cef7', '#83fbf3'];
var firstrowfirstchartredraw = true;
var secondrowfirstchartredraw = true;
var thirdrowfirstchartredraw = true;
var fourrowfirstchartredraw = true;
var fiverowfirstchartredraw = true;
var selectedpallet = pallet1;



var palleteArray = [
    ['#A50044', '#004D98', '#EDBB00', '#FFED02', '#ff80b5', '#80bfff', '#ffe380', '#fff780'],
    ['#A800FF', '#0079FF', '#00F11D', '#FFEF00', '#d580ff', '#80bbff', '#80ff8e', '#fff780'],
    ['#010101', '#4BE1EC', '#F53C3C', '#377280', '#bfbfbf', '#8cecf3', '#f98686', '#a6cfd9'],
    ['#510C6C', '#E74164', '#F7CC3D', '#38C8A7', '#d58cf2', '#f18ea3', '#fadf85', '#9be4d3'],
    ['#F79400', '#136BAE', '#000000', '#222E3C', '#ffcc80', '#8cc6f2', '#bfbfbf', '#adbed1'],
    ['#097275', '#03444A', '#F4E9CD', '#C96C1C', '#88f2f6', '#85f0fa', '#a78225', '#f0bc8f'],
    ['#DE3036', '#0061CB', '#EDAA02', '#82B216', '#ed9194', '#80bdff', '#feda81', '#caee77'],
    ['#EB4E21', '#01A4EF', '#80BB01', '#FFB901', '#f4a18a', '#80d6fe', '#d6fe80', '#ffdb80'],
    ['#101162', '#0F1585', '#13A0F0', '#08F5E6', '#9193ed', '#757bf0', '#87cef7', '#83fbf3']];



var selectedcharttype = "";


//this is for save report pannel
var RplaceAbleFields = [];
var selectedreportid;
var selectedreportcolumns = [];
var selectedreportmissingfields = [];
var selectedreportchartconfiguration = [];

var selectedreportcFields = [];
var formulaName = [];
var PinkFields = [];
var selectedreportchartIds = [];
var selectedreportpallet = [];
var selectedreportmainhtml = "";
var selectedchartsfilter = "";

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
}

function getFormulaFields(chartobj) {
    //debugger
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
    chartSeries: [],
}






//common function for all charts
function SetSelectedColourPallets(id) {
    if (document.getElementById(id).checked) {
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

        RefreshAllCharts();
    }
}

function updatechart(axis, cat, chartType, chartId) {
    debugger
    loading_start();
    var validationflag = ValidationChartDuplicateColumn(cat, chartId);
    var chartconfigurationobj = chartsconfigurations.find(x => x.chartId == chartId);
    var yaxisobject = {
        label: cat,
        seriestype: getseriestype(chartType),
        showlabel: false,
        opposite: false,
        EditSeriesType: false
    }
    if (axis == "x") {
        chartconfigurationobj = {
            chartId: "",
            chartType: "",
            chartAxis: "",
            chartXAxis: "",
            chartYAxises: [],
            chartXAxisLabels: [],
            chartSeries: [],
            comments: ""
        }
        chartconfigurationobj.chartType = chartType;
        chartconfigurationobj.chartId = chartId;
        //  chartconfigurationobj.chartXAxis = cat;
        chartconfigurationobj.chartXAxis = "";
        chartsconfigurations.push(chartconfigurationobj);
    }
    // debugger;
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
    debugger;
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
        setscatteredchart(chartId);
    }
    if (chartType == 'pie_chart' && validationflag) {
        setPieDonutChart(chartId);
    }

    if (chartType == 'number_chart' && validationflag) {
        setRadialChart(chartId);
    }
    if (chartType == 'table_chart' && validationflag) {
        settableChart(chartId);
    }
    loading_end();

}



function rerenderchart(chartId) {
    //debugger;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartId);
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

}


function RemovexaxisChart(id, charId) {
    var chartid = `chart_${charId}`;// chartIds.filter(e => e !== `chart_${charId}`);
    if (confirm("Are you sure to delete this?")) {
        var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
        if (chartconfigobj != undefined) {
            $("#div" + chartid).hide();
            chartconfigobj.chartXAxis = "";
            chartconfigobj.chartXAxisLabels = [];
            if (chartconfigobj.chartType == "pie_chart") {
                // chartconfigobj.chartYAxises = [];
            }
            rerenderchart(chartid);
            //chartconfigobj.chartYAxises.splice(index, 1);
            //setbarchart(chartid);
            //  alert("Confirmed! Item deleted");
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
function setchartxaxis(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    chartconfigobj.chartXAxisLabels = [];
    if (chartconfigobj != undefined) {
        $.each(filteredData, function (i, item) {
            if (item[chartconfigobj.chartXAxis] != null) {
                var exist = false;
                $.each(chartconfigobj.chartXAxisLabels, function (i, xaxisitem) {
                    if (xaxisitem == item[chartconfigobj.chartXAxis]) {
                        exist = true;
                    }
                });
                if (!exist) {
                    chartconfigobj.chartXAxisLabels.push(item[chartconfigobj.chartXAxis]);
                }
            }

        });
    }
}
//this function is used to set x axis of scattered charts
function setscatteredchartxaxis(chartid) {
    // debugger;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    chartconfigobj.chartXAxisLabels = [];
    if (chartconfigobj != undefined) {
        $.each(filteredData, function (i, item) {
            if (item[chartconfigobj.chartXAxis] != null) {
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

function RefreshAllCharts(fromsavechart) {



    $.each(chartsconfigurations, function (i, chartobj) {
        //   debugger;
        setchartxaxis(chartobj.chartId);
        rerenderchart(chartobj.chartId);
        $(`#${chartobj.chartId}`).droppable({
            accept: ".field",
            drop: function (event, ui) {
                updatechart('y', ui.draggable.attr('category'), chartobj.chartType, chartobj.chartId)
            }
        });
        if (fromsavechart == true) {
            //debugger;
            var randomchartid = getrandomchartidusingid(chartobj.chartId);
            // var comments = $("#comments_text_" + randomchartid).summernote("code");
            // $("#comments_text_" + randomchartid).summernote('destroy')
            var nextdiv = $("#comments_text_" + randomchartid).next("div");
            $("#comments_text_" + randomchartid).next("div").remove();
            $("#comments_text_" + randomchartid).summernote('code', chartobj.comments);
        }
    });

    $(".apexcharts-legend-series").addClass("testdata");

}



function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}

function getseriestype(chartType) {
    var sertype = "";
    if (chartType == 'bar_chart') {
        sertype = "bar";
    }
    if (chartType == 'line_chart') {
        sertype = "line";
    }
    if (chartType == 'mixed_chart') {
        sertype = "bar";
    }
    if (chartType == 'scatter_chart') {
        sertype = "scatter";
    }
    if (chartType == 'pie_chart') {
        sertype = "donut";
    }

    if (chartType == 'number_chart') {
        sertype = "radialBar";
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
    // debugger;
    return seriesname;
}
function getchartidbyrandomid(randomid) {
    return "chart_" + randomid
}

function CreateCustomLegends(legenditems, chartid) {
    // debugger;//
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
    // debugger;

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
var removeyaxiscall = false;
//$(document).on('click', '.apexcharts-legend-marker', function (e) {
//    //alert('Click detected; modal will be displayed');
//    debugger;
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
    // debugger;
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
        ///  debugger;
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
        $("#lbl_" + getrandomchartidusingid(chartid)).text(seriesname.substring(0, seriesnamelength) + ":");
        Showstylebar(chartid);//(config.w.globals.chartID);

        //  alert("doubleClick");
        //s  return false;
    } else {
        firstClick = millis;
        secondClick = 0;
        return false;
    }
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
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);

    chartconfigobj.chartYAxises[seriesindex].seriestype = seriestype;
    chartconfigobj.chartYAxises[seriesindex].EditSeriesType = true;
    setseriestypestyle(seriestype, chartrandomid);
    rerenderchart(chartid);
}
function Showstylebar(chart_id) {
    // debugger;
    var chartid = chart_id.split("_")[1];
    $("#snav_" + chartid).css('display', 'block');
    resetstylebar(chart_id);
}
function Closethisbar(stylebarid) {
    // debugger;

    $("#" + stylebarid).css('display', 'none');
}
function closestylebar(Closebar) {
    var stylebarid = Closebar;//.id;
    Closethisbar(stylebarid);
}
function movetoleftaxis(leftaxislableid) {
    // debugger;
    var id = leftaxislableid;
    var chartrandomid = getrandomchartidusingid(id);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    chartconfigobj.chartYAxises[seriesindex].opposite = false;
    //debugger;
    rerenderchart(chartid);
}
function movetooppositeaxis(oppositeaxislableid) {
    //debugger;
    var labelid = oppositeaxislableid;
    var chartrandomid = getrandomchartidusingid(labelid);
    var seriesname = geteditedseriesnameusingid(chartrandomid);
    var chartid = getchartidbyrandomid(chartrandomid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var seriesindex = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
    chartconfigobj.chartYAxises[seriesindex].opposite = true;
    //debugger;
    rerenderchart(chartid);
}
function hideshowlabel(lable) {
    //debugger;
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
    rerenderchart(chartid);
}
function setseriestypestyle(type, chartrandomid) {
    $("#stypebar_" + chartrandomid).removeClass("seriestypeborder");
    $("#stypestacked_" + chartrandomid).removeClass("seriestypeborder");
    $("#stypeline_" + chartrandomid).removeClass("seriestypeborder");
    $("#stypedotted_" + chartrandomid).removeClass("seriestypeborder");
    $("#stypearea_" + chartrandomid).removeClass("seriestypeborder");
    if (type == "bar") {
        $("#stypebar_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "stacked") {
        $("#stypestacked_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "line") {
        $("#stypeline_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "dotline") {
        $("#stypedotted_" + chartrandomid).addClass("seriestypeborder");
    }
    if (type == "Area") {
        $("#stypearea_" + chartrandomid).addClass("seriestypeborder");
    }
    //  rerenderchart(getchartidbyrandomid(chartrandomid));
}
function resetstylebar(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var randomid = getrandomchartidusingid(chartid);
    var seriesname = geteditedseriesnameusingid(randomid);
    var seriesobj = chartconfigobj.chartYAxises.find(x => x.label === seriesname);
    if (seriesobj != undefined) {
        //debugger;
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
    }

}
function RemoveThisSeries(btn) {
    // debugger;
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
    var toolsMenu = `<nav id="snav_${randomChartId}" style="display:none" class="navbar navbar-expand-lg navbar-light bg-light tools-menu">
                                          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                          </button>
                                          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                                            <input type=hidden id="txtseriesname_${randomChartId}" />
                                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                              <li class="nav-item">
                                                <div class="tool">
                                                    <label id="lbl_${randomChartId}" style="font-size:12px">Style</label>
                                                    <div class="icon mixed " onclick=changeseriestype("${randomChartId}","bar") >
                                                        <img class="seriestypeborder" id="stypebar_${randomChartId}" src="../../assets/new/mixed.png" />
                                                        <label class="icon-label">Bar</label>
                                                    </div>
                                                    <div class="icon bar d-none" onclick=changeseriestype("${randomChartId}","stacked")>
                                                        <img  id="stypestacked_${randomChartId}" src="../../assets/new/bar.png" />
                                                        <label class="icon-label">Stacked</label>
                                                    </div>
                                                    <div class="icon" onclick=changeseriestype("${randomChartId}","line") >
                                                        <img id="stypeline_${randomChartId}" src="../../assets/new/line.png" />
                                                        <label  class="icon-label">Line</label>
                                                    </div>
                                                    <div class="icon" onclick=changeseriestype("${randomChartId}","dotline") >
                                                        <img id="stypedotted_${randomChartId}" src="../../assets/new/dotted-line.png" />
                                                        <label class="icon-label">Dot Line</label>
                                                    </div>
                                                    <div class="icon" onclick=changeseriestype("${randomChartId}","area") >
                                                        <img id="stypearea_${randomChartId}" src="../../assets/new/area.png" />
                                                        <label class="icon-label">Area</label>
                                                    </div>
                                                </div>
                                              </li>
                                              <li class="nav-item">
                                                <div class="tool">
                                                    <label>Axis</label>
                                                    <div class="set-axis">
                                                       <button class="axis active btn-1" onclick=movetoleftaxis("stypeaxis1_${randomChartId}") id="stypeaxis1_${randomChartId}">1</button>
                                                       <button class="axis btn-2" onclick=movetooppositeaxis("stypeaxis2_${randomChartId}") id="stypeaxis2_${randomChartId}">2</button>
                                                    </div>
                                                </div>
                                              </li>
                                              <li class="nav-item">
                                                <div class="tool">
                                                    <label>Labels</label>
                                                    <div class="custom-control custom-switch mb-2" dir="ltr">
                                                        <input name="radio" type="checkbox" class="custom-control-input  stylebarlabel" id="slabel_${randomChartId}"   checked="checked">
                                                        <label class="custom-control-label " for="slabel_${randomChartId}"></label>
                                                    </div>
                                                </div>
                                              </li>
                                              <li class="nav-item">
                                                <div class="remove">
                                                 <button type="button" class="btn btn-dark" id="remove_${randomChartId}" onclick="RemoveThisSeries('remove_${randomChartId}')">Remove</button>
                                                </div>
                                              </li>
                                              <li>
                                                 <button type="button" class="close-panel-btn"  style="height:30;margin-top:12"  onclick="closestylebar('snav_${randomChartId}')">&times;</button>
                                               </li>
                                            </ul>
                                          </div>
                                        </nav>`;
    $(`#` + tool_Id).empty();
    $(`#` + tool_Id).append(toolsMenu);
}





/////////////////end edit style baar/////////

//// <a id="deleteXaxis_btn_${randomId}" onclick="RemovexaxisChart('${randomId}', '${randomChartId}')" class="btn del btn-danger btn-sm float-right d-none" style="color: white">Delete xaxis</a>


//function updatechart(axis, cat, chartType,chartId) {
//    loading_start();
//    debugger;
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
    if (notmojuud) {
        $("#b" + chartId).addClass('misscolbackground');
    }
    else {
        $("#b" + chartId).removeClass('misscolbackground');
    }
}


function removeyaxisusingmarker(yaxislable, chartid, e) {
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
    debugger;
    $(".close-panel-btn").each(function (index) {

        if ($(this).parents("nav").is(":visible")) {
            $(this).trigger("click");
        }

    });
}