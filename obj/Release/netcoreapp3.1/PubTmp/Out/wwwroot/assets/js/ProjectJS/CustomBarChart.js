var dynamic_opacity = [];
let hideShowDataLabes = true;
let labelfontsize = '12px';
function setbarchart(chartid) {
    getChartStructure();
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var typecount = 0;
    var chartleftrightpadding = 0;
    var columnwidth = "65%";
    var markeryoffset = 0;
    var thischartpallet = chartconfigobj.chartselectedpallet;
    // 
    if (chartconfigobj != undefined) {
        if (chartsconfigurations.length === 1) {

            chartleftrightpadding = 20
        }
        else {
         //   debugger;
            labelfontsize = '10px';
            columnwidth = "85%";
            chartleftrightpadding = 10
        }
        if (chartconfigobj.ShowTotals) {
            markeryoffset = 4;
        }
        chartconfigobj.chartSeries = [];
        var seriesyaxis = [];
        var showlabellist = [];
        var maximumvalueseriesvalue = 0;
        var maximumvalueleftyseriesvalue = 0;
        var maximumvaluerightsideseriesname = "";
        var maximumvalueleftsideseriesname = "";
        var dashstroke = {
            //   width:5,// [5, 7, 5],
            //  width:5,// [5, 7, 5],
         //   width:3,
         //   curve: 'smooth',
            
         //   curve: 'straight',
            width:[],
            curve:[],
            dashArray: []
        };
      //  var dashstroketemp = {
        //     width:[1, 7, 5],
          

        //    curve: ['smooth', 'straight','smooth'],
        //    dashArray: [0,2,7]
        //};
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var maximumvalue = 0;
            var objectarray = [];
            var innerarray = [];    
            var cat = catfield.label;
            objectarray.name = cat;
         //   debugger;
            if (catfield.showlabel) {
                showlabellist.push(i);
            }
            var seriesyaxisobj = {
                seriesName: cat,
                opposite: catfield.opposite,
                show: false,
                min: 0,
                forceNiceScale: true,
                tickAmount: 8,
            };
            seriesyaxisobj.labels = {
                formatter: function (value, index) {
                   // debugger;
                    return ApplyFormatting(value, cat)
                }
            };

            //  0
           
            if (catfield.seriestype == "dottedline") {
                objectarray.type = "line";
                //dashstroke.width = 4;
                //dashstroke.curve = 'straight';
                dashstroke.width.push(4);
                dashstroke.curve.push('straight');
                dashstroke.dashArray.push(1);
            }
            
            else if (catfield.seriestype == "dotteddoubleline") {
                objectarray.type = "line";
                //dashstroke.width = 5;
                //dashstroke.curve = 'smooth';
                dashstroke.width.push(5);
                dashstroke.curve.push('smooth');
                dashstroke.dashArray.push(2);
            }
            
             
            else if (catfield.seriestype == "dottedsmooth") {
                objectarray.type = "line";
               // dashstroke.width = 3;
               // dashstroke.curve = 'smooth';
                dashstroke.width.push(3);
                dashstroke.curve.push('smooth');
                dashstroke.dashArray.push(2);
            }
            
            else if (catfield.seriestype == "areacurved") {
                objectarray.type = "area";
               // dashstroke.curve = 'smooth';
                dashstroke.curve.push('smooth');
                dashstroke.width.push(2);
                dashstroke.dashArray.push(0);
            }
            else if (catfield.seriestype == "area") {
                objectarray.type = "area";
              //  dashstroke.curve = 'straight';
                dashstroke.curve.push('straight');
                dashstroke.width.push(2);
                dashstroke.dashArray.push(0);
            }
           else if (catfield.seriestype == "dashline") {
                objectarray.type = "line";
             //   dashstroke.width = 3;
                dashstroke.width.push(3);
                dashstroke.curve.push('straight');
                dashstroke.dashArray.push(3);
            }
            
            else if (catfield.seriestype == "linesmooth") {
                objectarray.type = "line";
                //dashstroke.width = 2;
                //dashstroke.curve = 'smooth';
                dashstroke.width.push(2);
                dashstroke.curve.push('smooth');
                dashstroke.dashArray.push(0);
            }
            else if (catfield.seriestype == "line") {
                objectarray.type = "line";
                //dashstroke.width = 5;
                //dashstroke.curve = 'straight';
                dashstroke.width.push(5);
                dashstroke.curve.push('straight');
                dashstroke.dashArray.push(0);
            }
            else if (catfield.seriestype =="borderbar") {
                dashstroke.dashArray.push(0);
                objectarray.type = "bar";
                dashstroke.width.push(3);
                dashstroke.curve.push('straight');
            }
            else {
                dashstroke.dashArray.push(0);
                dashstroke.width.push(0);
                dashstroke.curve.push('straight');
                objectarray.type = catfield.seriestype;
            }
            // this is for mixed chart
            if (chartconfigobj.chartType == "mixed_chart" && catfield.EditSeriesType == false) {
                typecount = typecount + 1;
                if (typecount == 1) {

                    objectarray.type = "column";
                }
                if (typecount == 2) {
                    /* objectarray.type = "column";*/
                    objectarray.type = "area";
                }
                if (typecount == 3) {
                    objectarray.type = "line";
                    typecount = 0;
                }
            }
            //end of mixed chartconfiguration
            if (chartconfigobj.chartXAxisLabels.length > 0) {
                $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                    var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                    var sumvalue = 0;

                    sumvalue = calculateValuesForCustomFields(data_filter, cat)
                    var CalculateTotal = false;
                   
                    if (sumvalue == 0) {
                         CalculateTotal = true;
                        
                        $.each(data_filter, function (i, item) {

                            if (isFinite(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {

                                sumvalue = sumvalue + parseFloat(item[cat]);
                            }
                        });
                    }
                    if (catfield.opposite) {
                        if (sumvalue > maximumvalueseriesvalue) {
                            maximumvalueseriesvalue = sumvalue;
                            maximumvaluerightsideseriesname = cat;
                        }
                    }
                    else {
                        if (sumvalue > maximumvalueleftyseriesvalue) {
                            maximumvalueleftyseriesvalue = sumvalue;
                            maximumvalueleftsideseriesname = cat;
                        }
                    }
                    if (sumvalue > 0) {
                        if (maximumvalue < sumvalue) {
                            maximumvalue = sumvalue;
                        }
                    }

                    //  
                    //  var sumdata = ApplyFormatting(sumvalue.toFixed(2), cat);
                    /*  innerarray.push(sumvalue.toFixed(2));*/
                    innerarray.push(sumvalue);
                    //  innerarray.push(sumdata);
                    objectarray.data = innerarray;
                    if (CalculateTotal) {
                        objectarray.total = innerarray.reduce((a, b) => {
                            return a + b;
                        });
                    }
                    else {
                        objectarray.total = calculateValuesForCustomFields(filteredData, cat);
                    }
                    
                    /* objectarray.stacked = true;*/
                });
            }
            else {
                var data_filter = filteredData;//.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                var sumvalue = 0;

                sumvalue = calculateValuesForCustomFields(data_filter, cat)
                var CalculateTotal = false;
                objectarray.total = sumvalue;
                if (sumvalue == 0) {
                    CalculateTotal = true;
                    $.each(data_filter, function (i, item) {

                        if (isFinite(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {

                            sumvalue = sumvalue + parseFloat(item[cat]);
                        }
                    });
                }
                if (catfield.opposite) {
                    if (sumvalue > maximumvalueseriesvalue) {
                        maximumvalueseriesvalue = sumvalue;
                        maximumvaluerightsideseriesname = cat;
                    }
                }
                else {
                    if (sumvalue > maximumvalueleftyseriesvalue) {
                        maximumvalueleftyseriesvalue = sumvalue;
                        maximumvalueleftsideseriesname = cat;
                    }
                }
                if (sumvalue > 0) {
                    if (maximumvalue < sumvalue) {
                        maximumvalue = sumvalue;
                    }
                }               
                innerarray.push(sumvalue);
                objectarray.data = innerarray;
                if (CalculateTotal) {
                    objectarray.total = innerarray.reduce((a, b) => {
                        return a + b;
                    });
                }
               
            }
            if (chartconfigobj.chartAxis != "x" || chartconfigobj.chartXAxisLabels.length == 0) {
                //if (chartconfigobj.chartXAxisLabels.length == 0) {
                //    objectarray.data = [0];
                //}
                chartconfigobj.chartSeries.push(objectarray);
            }
            debugger;
            //
            var maximummargin = maximumvalue + (maximumvalue / 7);
            seriesyaxisobj.maximumyaxis = maximummargin;//parseInt(maximummargin);
            //if (seriesyaxisobj.maximumyaxis < 4) {
            //    seriesyaxisobj.maximumyaxis = 4
            //}
            //
          //  debugger;
            if (maximummargin > 0) {
                seriesyaxisobj.tickAmount = 0;
            }
            if (maximummargin > 1) {
                seriesyaxisobj.tickAmount = 1;
            }
            if (maximummargin > 2) {
                seriesyaxisobj.tickAmount = 2;
            }
            if (maximummargin > 3) {
                seriesyaxisobj.tickAmount = 3;
            }
            if (maximummargin > 4) {
                seriesyaxisobj.tickAmount = 4;
            }
            if (maximummargin > 5) {
                seriesyaxisobj.tickAmount = 5;
            }
            if (maximummargin > 6) {
                seriesyaxisobj.tickAmount = 6;
            }
            //if (maximummargin > 7) {
            //    seriesyaxisobj.tickAmount = 7;
            //}
            seriesyaxis.push(seriesyaxisobj);

        });
        var showoppositeaxislabelindex = seriesyaxis.findIndex(x => x.seriesName == maximumvaluerightsideseriesname);
        var showyaxislabelindex = seriesyaxis.findIndex(x => x.seriesName == maximumvalueleftsideseriesname);
        if (showoppositeaxislabelindex != -1) {
            seriesyaxis[showoppositeaxislabelindex].show = true;
            seriesyaxis[showoppositeaxislabelindex].max = seriesyaxis[showoppositeaxislabelindex].maximumyaxis;
            for (var n = 0; n < seriesyaxis.length; n++) {
                if (showyaxislabelindex != n) {
                    seriesyaxis[n].seriesName = seriesyaxis[showoppositeaxislabelindex].seriesName;
                }
            }
        }
        if (showyaxislabelindex != -1) {
            seriesyaxis[showyaxislabelindex].show = true;
            seriesyaxis[showyaxislabelindex].max = seriesyaxis[showyaxislabelindex].maximumyaxis;
            for (var n = 0; n < seriesyaxis.length; n++) {
                if (showoppositeaxislabelindex != n && seriesyaxis[n].opposite == false) {
                    seriesyaxis[n].seriesName = seriesyaxis[showyaxislabelindex].seriesName;
                }
            }
        }
        chartconfigobj.chartSeries.labels = [];//showlabellist;
        var b = $("#" + chartconfigobj.chartId);
        b.empty();
        //  chartxaxislabels
      //  debugger;
        var chartxaxislabels = [];
        //if (chartconfigobj.chartXAxis != "") {
        //    for (var cl = 0; cl < chartconfigobj.chartXAxisLabels.length; cl++) {
        //        var sampleValue = filteredData[0][chartconfigobj.chartXAxis];
        //        if (isNaN(sampleValue)) {
        //            chartxaxislabels.push(chartconfigobj.chartXAxisLabels[cl]);
        //        }
        //        else {
        //            chartxaxislabels.push(ApplyFormatting(parseFloat(chartconfigobj.chartXAxisLabels[cl]), chartconfigobj.chartXAxis));
        //        }
        //    }
        //}
        if (chartxaxislabels.length > 3) {
            columnwidth = "85%";
        }
        var dynamic_opacity = [];
        $.each(chartconfigobj.chartYAxises, function (index, value) {
            if (value.seriestype == 'area' || value.seriestype == 'areacurved') {
                dynamic_opacity.push(0.5)
            }
            if (value.seriestype == "borderbar")
            {
                dynamic_opacity.push(0.2)
            }
            else {
                /*  dynamic_opacity.push(1)*/
                dynamic_opacity.push(1)
            }
        });

        if (chartconfigobj.chartXAxisShowLabels.length == 0) {
            chartxaxislabels.push(1);
            chartconfigobj.chartXAxisShowLabels = [];
            chartconfigobj.chartXAxisShowLabels.push(1);
        }
        //if (chartxaxislabels.length == 0) {
        //    chartxaxislabels.push(1);
        //    chartconfigobj.chartXAxisShowLabels.push(1);
        //}
        if (seriesyaxis.length == 0) {
            var seriesyaxisobj = {
                // seriesName: cat,
                //   opposite: catfield.opposite,
                // show: false,
                min: 5,
                forceNiceScale: true,
                tickAmount: 5,
            };
            seriesyaxis.push(seriesyaxisobj);
        }

     //   debugger;
        var options = {
            legend: {
                offsetY: 5,

            },
            states: {
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            series: chartconfigobj.chartSeries,
            //    labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],
            chart: {
                //       type: 'bar',
                height: 300,
                width: '100%',
                fontFamily: 'Poppins, sans-serif',
                //  stacked:true,
                id: chartconfigobj.chartId,
                redrawOnParentResize: true,
                //redrawOnParentResize: false,
                //redrawOnWindowResize: false,


                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        checkdoubleclick(config.w.globals.chartID, config.w.globals.seriesNames[config.seriesIndex]);
                    },
                    mouseMove: function (e, t, l) {
                        var r = t.el.querySelector('.apexcharts-tooltip'),
                            a = t.el.querySelector('.apexcharts-xaxistooltip');
                        -1 !== l.seriesIndex && (r.style.left = a.style.left)
                    },
                    click: function (e, t, l) {
                        var r = t.el.querySelector('.apexcharts-tooltip'),
                            a = t.el.querySelector('.apexcharts-xaxistooltip');
                        -1 !== l.seriesIndex && (r.style.left = a.style.left)
                    },
                    //legendClick: function (chartContext, seriesIndex, config) {
                    //legendClick: function (chartContext, seriesIndex, config) {
                    //    debugger;
                    //   // toggleDataSeries: true
                    //    // updateseriesstartusinglegend(config.globals.chartID, config.globals.seriesNames[seriesIndex]);
                    //  //  checkdoubleclick(config.globals.chartID, config.globals.seriesNames[seriesIndex]);
                    //},
                    //click: function (event, chartContext, config) {
                    //    
                    //    checkdoubleclick(event, chartContext, config);
                    //    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                    //}
                    //beforeZoom: function (chartContext, { xaxis }) {
                    //    //return {
                    //    //    //xaxis: {
                    //    //    //    min: timestamp,
                    //    //    //    max: timestamp
                    //    //    //} 
                    //    //}
                    //    alert("before zoom");
                    //},

                    zoomed: function (chartContext, { xaxis }) {
                        //  debugger;
                        // alert("zoomed");
                        var zoomid = "#a_" + chartContext.opts.chart.id;
                        $(zoomid).removeClass("d-none");
                    },
                    beforeResetZoom: function (chartContext, { xaxis }) {
                        //alert("before reset; zoom");
                        // debugger;
                        var zoomid = "#a_" + chartContext.opts.chart.id;
                        $(zoomid).addClass("d-none");
                    }
                },
                zoom: {
                    enabled: true,
                    type: 'x',
                    //   autoScaleYaxis: true,
                },
                animations: {
                    enabled: false
                },
                toolbar: {
                    show: true,
                    offsetX: -45,
                    offsetY: -20,
                    tools: {
                        download: false,
                        selection: false,
                        zoom: true,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        /*    reset: '<a  href="#!" id=a_' + chartconfigobj.chartId + ' width="50" style="color:#be2020" class="d-none" >Reset Zoom</a>' //'<img src="/static/icons/reset.png" width="20">',*/
                        reset: '<a  href="#!" id=a_' + chartconfigobj.chartId + ' width="50" style="color:#be2020" >Reset Zoom</a>' //'<img src="/static/icons/reset.png" width="20">',
                    }
                }
            },

            dataLabels: {
                enabled: hideShowDataLabes,
                enabledOnSeries: showlabellist,
                formatter: function (val, opts) {
                    // 
                    var sampleValue = filteredData[0][opts.w.globals.seriesNames[opts.seriesIndex]];
                    if (isNaN(sampleValue)) {
                        return val;
                    }
                    else {
                        return ApplyFormatting(parseFloat(val), opts.w.globals.seriesNames[opts.seriesIndex]);
                    }
                },
                offsetY: -15,

                style: {
                    fontSize: labelfontsize,
                    colors: thischartpallet//selectedpallet
                },
                background: {
                    enabled: true,
                    foreColor: '#fff',
                    borderRadius: 2,
                    padding: 4,
                    opacity: 0.9,
                    borderWidth: 1,
                    borderColor: '#fff'
                },
            },
            plotOptions: {
                bar: {
                    //  borderRadius: 10,
                    horizontal: false,

                    borderRadius: 0,
                    columnWidth: columnwidth,//'9%',
                    barHeight: '20',
                    distributed: false,
                    rangeBarOverlap: true,
                    rangeBarGroupRows: false,
                    //     opacity: 1,
                    backgroundBarOpacity: 0
                },
            },
            stroke: {
                show: true,
                width: 2,
                colors: thischartpallet //selectedpallet //['transparent']
            },

            legend: {
                show: true,
                position: 'top',
                /* offsetY: 40*/
                showForNullSeries: true,
                showForZeroSeries: true,
                showForSingleSeries: true,
                // showForSingleSeries: true,
                markers: {
                    width: 19,
                    height: 19,
                    strokeWidth: 0,
                    fontSize: '25px',
                    fillColors: undefined,
                    radius: 14,
                    onClick: function (chart, seriesIndex, opts) {
                        removeyaxis(opts.globals.seriesNames[seriesIndex], opts.globals.chartID);
                    },
                    customHTML: function () {
                        // return '<span ><i  style="color:white;margin-left:5px">x</i></span>'
                        return '<span class="' + chartconfigobj.chartId + '" ><i  style="color:white;margin-left:5px">x</i></span>'
                    },
                    offsetX: 0,

                    offsetY: markeryoffset,
                },
                formatter: function (seriesName, opts) {
                    var notmojuud = false;
                    var showtotal = "display:none";
                    if (chartconfigobj.ShowTotals) {
                        showtotal = "";
                    }
                    for (var i = 0; i < PinkFields.length; i++) {
                        if (PinkFields[i] == seriesName) {
                            notmojuud = true;
                            break;
                        }
                    }
                    //if (notmojuud) {
                    //    return ["", "  <strong style=background-color:red>" + seriesName + "</strong>", ""];
                    //}
                    //else {
                    //    return ["", "  <strong >" + seriesName + "</strong>", ""];
                    //}
                    var seriesobj = chartconfigobj.chartSeries.find(x => x.name == seriesName);
                    var total = 0;
                    if (seriesobj != null && seriesobj != undefined) {
                        total = seriesobj.total;
                    }
                    if (notmojuud) {
                        return [" <div class='spantotal' style='text-align:center ;" + showtotal + "'> " + ApplyFormatting(total, seriesName) + "</div><strong style='color:white;background-color:red'>" + seriesName + "</strong>"];
                    }
                    else {

                        return ["<div class='spantotal' style='text-align:center; " + showtotal + "'> " + ApplyFormatting(total, seriesName) + "</div>  <strong >" + seriesName + "</strong>"];
                        //   return ["  <strong >" + seriesName + "</strong>"];
                    }
                },
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                },
            },
            grid: {
                padding: {
                    left: chartleftrightpadding, // or whatever value that works
                    right: chartleftrightpadding // or whatever value that works
                }
            },
            xaxis: {
                // type: 'numeric',
                tickAmount: 'dataPoints',
                //   type: 'string',
                //  tickAmount: 'dataPoints',

                labels: {
                    show: true,
                    rotate: -45,
                    hideOverlappingLabels: false,
                    rotateAlways: true,
                    rotateAlways: true,
                    minHeight: 100,
                    maxHeight: 180,
                    style: {
                        colors: "black",
                        fontWeight: 600,
                    },
                },
                categories: chartconfigobj.chartXAxisShowLabels, //chartxaxislabels,
              //  tickPlacement: 'on'
                    tickPlacement: 'between'
            },

            yaxis: seriesyaxis,


            colors: thischartpallet,//selectedpallet,
            fill: {
               // chartconfigobj.selectedpallet,//selectedpallet,
                thischartpallet,
                opacity: dynamic_opacity,
              
            },


            stroke: dashstroke,// dashstroketemp,// dashstroke,
            tooltip: {
                //intersect: true,
                //shared: false,
               // shared: true,
              //  show:false,
                y: {
                    formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                        //   
                        // return ApplyFormatting(parseFloat(value), w.globals.seriesNames[seriesIndex]);
                        var sampleValue = filteredData[0][w.globals.seriesNames[seriesIndex]];
                        if (isNaN(sampleValue)) {
                            return val;
                        }
                        else {
                            return ApplyFormatting(parseFloat(val), w.globals.seriesNames[seriesIndex]);
                        }
                    }
                }
            },
            markers: {
                size: 5,
                hover: {
                    sizeOffset: 6
                },
                enabled: true,
                offsetX: 0,
                offsetY: 0,
                intersect: true,
                shared: false,

            },

        };

        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartconfigobj.chartId) {
                chartIns.splice(i, 1);
                return false;
            }
        });

        var chart = new ApexCharts(document.querySelector("#" + chartconfigobj.chartId), options);
        if (chartconfigobj.chartAxis == "x") {


            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }
            chartIns.push(RegisterEntry);
        }
        if (chartconfigobj.chartAxis == "x") {
            chart.render();
        }


        if (chartconfigobj.chartAxis != "x") {
            var dropdownval = $("#savedCharts").val();
            try {

                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);

            } catch (err) {
            }

            chart = new ApexCharts(document.querySelector("#" + chartid), options);
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }
            chartIns.push(RegisterEntry);
            chart.render();
            // CreateCustomLegends(chartconfigobj.chartYAxises, chartconfigobj.chartId);
        }

        if (chartconfigobj.chartXAxis != "") {
            $("#div" + chartid).show();
            $("#b" + chartconfigobj.chartId).empty();
            $("#b" + chartconfigobj.chartId).text(chartconfigobj.chartXAxis);
            $(".apexcharts-reset-icon").css("width", "100");
            updatexaxisbackground(chartid, chartconfigobj.chartXAxis);
        }
        else {
            $("#div" + chartid).hide();
        }
        //
        //var dashboard = $("#savedCharts").val();
        ////alert(dashboard);
        //if (dashboard != "0") {

        //}
    }


    // redrawfirstchartofeveryrowifneed();

}

let abcclicks = false;
var panelSecondClick = 0;
jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
    return this.each(function () {
        var clicks = 0, self = this;
        jQuery(this).click(function (event) {
            clicks++;
           // debugger;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        if (event.target.className == "btn btn-warning") {
                            let btnele = event.target.className;
                            $('html, body').animate({
                                scrollTop: ($(".btn.btn-warning").offset().top )
                            }, 1500);


                        }
                        single_click_callback.call(self, event);
                        if (event.target.className == "apexcharts-legend-marker") {
                     //       debugger;
                            var Chartid = event.target.lastChild.className;
                            var chartconfigobj = chartsconfigurations.find(x => x.chartId == Chartid);
                            if (Chartid != "" && chartconfigobj.chartType !="pie_chart") {
                                var seriesname = event.target.nextSibling.innerText;
                                removeyaxis(seriesname, Chartid);
                            }
                              //  var chartconfigobj = chartsconfigurations.find(x => x.chartId == Chartid);
                           // if (chartconfigobj.)
                          
                        }
                       // debugger;
                        var clicked = event.target;
                        if ($(event.target).parents('.tool-menu-to-be-append').length < 1 && (clicked.className != "apexcharts-legend-text" && clicked.className != "apexcharts-legend-marker"))   {

                            $(".close-panel-btn").each(function (index) {

                                if ($(this).parents("nav").is(":visible")) {
                                    $(this).trigger("click");
                                }

                            });

                        }
                       
                    } else {

                       // debugger;
                        double_click_callback.call(self, event);

                        //this is just my code
                        // if (abcclicks&&$(event.target))  
                     //   debugger;
                     //   popupShow(event.target.className, 'error');
                       
                        if (event.target.className == "apexcharts-legend-text") {
                            var Chartid = event.target.previousSibling.lastChild.className;
                            var seriesname = event.target.children[1].innerHTML;//.outerText;
                            var chartconfigobj = chartsconfigurations.find(x => x.chartId == Chartid);
                            if (chartconfigobj.chartType == "pie_chart") {
                                if (chartconfigobj.chartYAxises.length > 0) {
                                    ChartSereisCustomizeOpen(Chartid, chartconfigobj.chartYAxises[0].label);
                                }
                                else {
                                    popupShow ("Please update chart series","error")
                                }
                                
                            }
                            else
                                if (Chartid != "" && chartconfigobj.chartType != "pie_chart") {
                                ChartSereisCustomizeOpen(Chartid, seriesname);
                            }
                           
                        }
                        
                        if (abcclicks && $(event.target).parents(".dynamic-grid").prev().length > 0) {
                            let ele = $(event.target).parents(".dynamic-grid").prev();
                            $('html, body').animate({
                                scrollTop: (ele.offset().top - 250)
                            }, 1500);

                        } 
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}
$(document).single_double_click(function () {
    abcclicks = true;

}, function () {


})
//ondblclick = appendnavbar(" + randomchartid + ", " + chartid + ")