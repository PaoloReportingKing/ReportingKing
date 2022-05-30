
var pallet1 = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#008FFB', '#00E396', '#FEB019', '#FF4560'];
var pallet2 = ['#3F51B5', '#4CAF50', '#F9CE1D', '#FF9800', '#3F51B5', '#4CAF50', '#F9CE1D', '#FF9800'];
var pallet3 = ['#3F51B5', '#546E7A', '#D4526E', '#13D8AA', '#3F51B5', '#546E7A', '#D4526E', '#13D8AA'];
var pallet4 = ['#3F51B5', '#F86624', '#EA3546', '#662E9B', '#3F51B5', '#F86624', '#EA3546', '#662E9B'];

var pallet5 = ['#2B908F', '#90EE7E', '#FA4443', '#69D2E7', '#2B908F', '#90EE7E', '#FA4443', '#69D2E7'];
var pallet6 = ['#449DD1', '#F86624', '#FA4443', '#69D2E7', '#449DD1', '#F86624', '#FA4443', '#69D2E7'];
var pallet7 = ['#662E9B', '#F86624', '#F9C80E', '#EA3546', '#662E9B', '#F86624', '#F9C80E', '#EA3546'];
var pallet8 = ['#A300D6', '#7D02EB', '#5653FE', '#2983FF', '#A300D6', '#7D02EB', '#5653FE', '#2983FF'];
var pallet9 = ['#DF885D', '#D1BD91', '#AE504F', '#415F8C', '#DF885D', '#D1BD91', '#AE504F', '#415F8C'];
var firstrowfirstchartredraw = true;
var secondrowfirstchartredraw = true;
var thirdrowfirstchartredraw = true;
var fourrowfirstchartredraw = true;
var fiverowfirstchartredraw = true;
var selectedpallet = pallet1;

var palleteArray = [
    ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#008FFB', '#00E396', '#FEB019', '#FF4560'],
    ['#3F51B5', '#4CAF50', '#F9CE1D', '#FF9800', '#3F51B5', '#4CAF50', '#F9CE1D', '#FF9800'],
    ['#3F51B5', '#546E7A', '#D4526E', '#13D8AA', '#3F51B5', '#546E7A', '#D4526E', '#13D8AA'],
    ['#3F51B5', '#F86624', '#EA3546', '#662E9B', '#3F51B5', '#F86624', '#EA3546', '#662E9B'],
    ['#2B908F', '#90EE7E', '#FA4443', '#69D2E7', '#2B908F', '#90EE7E', '#FA4443', '#69D2E7'],
    ['#449DD1', '#F86624', '#FA4443', '#69D2E7', '#449DD1', '#F86624', '#FA4443', '#69D2E7'],
    ['#662E9B', '#F86624', '#F9C80E', '#EA3546', '#662E9B', '#F86624', '#F9C80E', '#EA3546'],
    ['#A300D6', '#7D02EB', '#5653FE', '#2983FF', '#A300D6', '#7D02EB', '#5653FE', '#2983FF'],
    ['#DF885D', '#D1BD91', '#AE504F', '#415F8C', '#DF885D', '#D1BD91', '#AE504F', '#415F8C']];


var selectedcharttype = "";






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
        chartconfigurationobj.chartXAxis = cat;
        chartsconfigurations.push(chartconfigurationobj);
    }
    // 
    if (axis == "x" && validationflag || chartconfigurationobj.chartXAxis == "" && validationflag) {

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

    }
    else if (validationflag) {
        if (chartType == 'pie_chart') {
            if (chartconfigurationobj.chartYAxises.length < 1) {
                chartconfigurationobj.chartYAxises.push(yaxisobject);
            }

        } else {
            chartconfigurationobj.chartYAxises.push(yaxisobject);
        }

    }

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
    loading_end();
}



function rerenderchart(chartId) {
    //
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
                chartconfigobj.chartYAxises = [];
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
    // 
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
        setchartxaxis(chartobj.chartId);
        rerenderchart(chartobj.chartId);
        $(`#${chartobj.chartId}`).droppable({
            accept: ".field",
            drop: function (event, ui) {
                updatechart('y', ui.draggable.attr('category'), chartobj.chartType, chartobj.chartId)
            }
        });
        if (fromsavechart == true) {
            
            var randomchartid = getrandomchartidusingid(chartobj.chartId);
            // var comments = $("#comments_text_" + randomchartid).summernote("code");
            // $("#comments_text_" + randomchartid).summernote('destroy')
            var nextdiv = $("#comments_text_" + randomchartid).next("div");
            $("#comments_text_" + randomchartid).next("div").remove();
            $("#comments_text_" + randomchartid).summernote('code', chartobj.comments);
        }
    });
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
    return sertype;
}

function getrandomchartidusingid(id) {
    return id.split("_")[1];
}
function geteditedseriesnameusingid(chartid) {
    var seriesname = $("#txtseriesname_" + chartid).val();
    // 
    return seriesname;
}
function getchartidbyrandomid(randomid) {
    return "chart_" + randomid
}

function CreateCustomLegends(legenditems, chartid) {
    // //
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
    // 

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
/*function checkdoubleclick(event, chartContext, config) {*/
function checkdoubleclick(chartid, seriesname) {
    var date = new Date();
    var millis = date.getTime();

    // try to measure if double-clicked
    /*if (millis - firstClick < 250) {*/
    var dif = millis - firstClick;
    if (millis - firstClick < 200) {
        ///  
        firstClick = 0;
        secondClick = millis;
        //var chartid = config.w.globals.chartID;
        //$("#txtseriesname_" + getrandomchartidusingid(chartid)).val(config.w.globals.seriesNames[config.seriesIndex]);
        //Showstylebar(config.w.globals.chartID);
        //  alert("double click");
        var chartid = chartid//config.w.globals.chartID;
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
    // 
    var chartid = chart_id.split("_")[1];
    $("#snav_" + chartid).css('display', 'block');
    resetstylebar(chart_id);
}
function Closethisbar(stylebarid) {
    // 

    $("#" + stylebarid).css('display', 'none');
}
function closestylebar(Closebar) {
    var stylebarid = Closebar.id;
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
    //
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
    //
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
    // 
    var randomchartid = getrandomchartidusingid(btn.id);
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
/////////////////end edit style baar/////////

//// <a id="deleteXaxis_btn_${randomId}" onclick="RemovexaxisChart('${randomId}', '${randomChartId}')" class="btn del btn-danger btn-sm float-right d-none" style="color: white">Delete xaxis</a>


//function updatechart(axis, cat, chartType,chartId) {
//    loading_start();
//    
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