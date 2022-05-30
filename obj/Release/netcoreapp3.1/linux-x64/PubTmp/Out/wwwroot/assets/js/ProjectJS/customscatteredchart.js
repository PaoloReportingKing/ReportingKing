function setscatteredchart(chartid) {
    removelegendiv(chartid);

    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var markeryoffset = 0;
    var MaximumValueofXaxis = 0;
    var ShowLegends = false;
    if (chartconfigobj != undefined) {
        //chartconfigobj.chartSeries = [];
        var thischartpallet = chartconfigobj.chartselectedpallet;
        if (chartconfigobj.ShowTotals) {
            markeryoffset = 4;
        }
        var yaxiscat = "";
        var maximumvalu = 0;
        var showlabellist = [];
        for (var i = 0; i < chartconfigobj.chartYAxises.length; i++) {
            ShowLegends = true;
            if (chartconfigobj.chartYAxises[i].showlabel) {
                showlabellist.push(i);
            }
            if (chartconfigobj.chartYAxises[i].seriesusage) {

            
            var cat = chartconfigobj.chartYAxises[i].label;
            var objectarray = [];
            objectarray.name = chartconfigobj.chartXAxis[i]
            var innerarray = [];
            objectarray.total = calculateValuesForCustomFields(filteredData, cat);
            var calculatetotal = false;
            if (objectarray.total == 0) {
                calculatetotal = true;
            }
            $.each(filteredData, function (m, item) {

                if (!CheckNullUndefined(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN ) {
                    var objlinechart = [];
                    var xaxisdata = chartconfigobj.chartXAxisLabels[m];
                    if (xaxisdata != undefined) {
                        xaxisdata = xaxisdata;
                    }
                    else {
                        xaxisdata = 0.00;
                    }
                    if (xaxisdata > MaximumValueofXaxis) {
                        MaximumValueofXaxis = xaxisdata;
                    }
                    objlinechart.push(xaxisdata);
                    var yaxisdata = item[cat];
                    objlinechart.push(yaxisdata);
                    if (calculatetotal) {
                        objectarray.total = objectarray.total + yaxisdata;
                    }
                    innerarray.push(objlinechart);
                    if (yaxisdata > maximumvalu) {
                        //maximumvalu = yaxisdata;
                        //yaxiscat = cat;
                        objectarray.maximumvalu = yaxisdata;
                        objectarray.yaxiscat = cat;
                    }
                }
            });
            objectarray.data = innerarray;
            objectarray.name = cat;
                chartconfigobj.chartSeries.push(objectarray);
                chartconfigobj.chartYAxises[i].seriesusage = false;
            }
        }
        for (var m = 0; m < chartconfigobj.chartSeries.length; m++) {
            if (chartconfigobj.chartSeries[m].maximumvalu > maximumvalu) {
                maximumvalu = chartconfigobj.chartSeries[m].maximumvalu;
                yaxiscat = chartconfigobj.chartSeries[m].yaxiscat;
            }
        }
        var yaxisobj = {
            tickAmount: 6,
            labels: {
                formatter: function (val, opts) {
                    if (yaxiscat != "") {
                        var sampleValue = filteredData[0][yaxiscat];
                        if (isNaN(sampleValue)) {
                            return val;
                        }
                        else {
                            return ApplyFormatting(val, yaxiscat);//parseFloat(val).toFixed(fixfloat)
                        }
                    }
                    else {
                        return val;
                    }
                
                }
            }
        };
        
        var rotatealwaysflag = false;
        if (chartconfigobj.chartxaxismaximum == 0 || chartconfigobj.chartxaxismaximum == undefined) {
            chartconfigobj.chartxaxismaximum = MaximumValueofXaxis;
        }
        if (ApplyFormatting(chartconfigobj.chartxaxismaximum, chartconfigobj.chartXAxis).length > 3) {
            rotatealwaysflag = true;
        }
        var xaxisobj = {
            tickAmount: 6,
            tickPlacement: 'between',
            labels: {
                show: true,
                rotate: -70,
                hideOverlappingLabels: true,
               // rotateAlways: false,
                rotateAlways: rotatealwaysflag,//false,
                minHeight: 100,
                maxHeight: 250,
                trim:true,
                style: {
                    colors: "black",
                    fontWeight: 600,
                },
                formatter: function (val, opts) {
                    var sampleValue = filteredData[0][chartconfigobj.chartXAxis];
                    if (isNaN(sampleValue)) {
                        return val;
                    }
                    else {
                        var formatvalue = ApplyFormatting(val, chartconfigobj.chartXAxis);
                       
                        return formatvalue;//parseFloat(val).toFixed(fixfloat)
                    }
                }
            }
        };
        var b = $("#" + chartid);
        b.empty();
        var options = {
            series: chartconfigobj.chartSeries,
            //series: [{
            //    name: "SAMPLE A",
            //    data: [
            //        [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
            //}
           
            //],
            chart: {
                fontFamily: 'Poppins, sans-serif',
                height: chartheight,// 300,
                width: '100%',
                type: 'scatter',
                
                id: chartconfigobj.chartId,
                zoom: {
                    enabled: true,
                    type: 'x'
                },
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                         checkdoubleclick(config.w.globals.chartID, config.w.globals.seriesNames[config.seriesIndex]);
                    },
                    zoomed: function (chartContext, { xaxis }) {
                        var zoomid = "#a_" + chartContext.opts.chart.id;
                        $(zoomid).removeClass("d-none");
                    },
                    beforeResetZoom: function (chartContext, { xaxis }) {
                        var zoomid = "#a_" + chartContext.opts.chart.id;
                        $(zoomid).addClass("d-none");
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
                },
                toolbar: {
                    show: true,
                    offsetX: -35,
                    offsetY: -46,
                    tools: {
                        download: false,
                        selection: false,
                        zoom: true,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: '<a href="#!" id=a_' + chartconfigobj.chartId +'  width="50" style="color:#be2020;color:blue" class="d-none"  >Reset Zoom</a>' //'<img src="/static/icons/reset.png" width="20">',
                    }
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    speed: 1,
                    animateGradually: {
                        enabled: false,
                        delay: 50
                    },
                    dynamicAnimation: {
                        enabled: false,
                        speed: 50
                    }
                },
                //animations: {
                //    enabled: true,
                //    easing: 'linear',
                //    speed: 1,
                //    animateGradually: {
                //        enabled: false,
                //        delay: 150
                //    },
                //    dynamicAnimation: {
                //        enabled: false,
                //        speed: 350
                //    }
                //}
            },
            colors: thischartpallet,//selectedpallet,
            fill: {
                thischartpallet,//  selectedpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
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
                    fontSize: "10px",
                    colors:  thischartpallet//selectedpallet
                },
                background: {
                    enabled: false,
                    foreColor: '#fff',
                    borderRadius: 2,
                    padding: 4,
                    opacity: 0.9,
                    borderWidth: 1,
                    borderColor: '#fff'
                },
            },
            legend: {
                show: true,//ShowLegends,//true,
                position: 'top',
                /* offsetY: 40*/
                height:50,
                showForNullSeries: true,
                showForZeroSeries: true,
                showForSingleSeries: true,
                markers: {
                    width: 19,
                    height: 19,
                    strokeWidth: 0,
                    fontSize: '25px',
                    //  strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 14,
                    onClick: function (chart, seriesIndex, opts) {
                        //   alert("series- " + opts.globals.seriesNames[seriesIndex] + " marker was clicked")
                       // removeyaxis(opts.globals.seriesNames[seriesIndex], opts.globals.chartID);
                    },

                    customHTML: function () {
                        return '<span class="' + chartconfigobj.chartId +'"><i  style="color:white;margin-left:5px">x</i></span>'
                    }
                    // onClick: showalert(),
                    //offsetX: 0,
                    //offsetY: 0
                },
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                },
                
            formatter: function (seriesName, opts) {
                var notmojuud = false;
                for (var i = 0; i < PinkFields.length; i++) {
                    if (PinkFields[i] == seriesName) {
                        notmojuud = true;
                        break;
                    }
                }
                var showtotal = "display:none";
                if (chartconfigobj.ShowTotals) {
                    showtotal = "";
                }
                var seriesobj = chartconfigobj.chartSeries.find(x => x.name == seriesName);
                var total = 0;
                if (seriesobj != null && seriesobj != undefined) {
                    total = seriesobj.total;
                }
                if (notmojuud) {
                    return ["<span class='spantotal' style='text-align:center; " + showtotal + "'> " + ApplyFormatting(total, seriesName) +"</span>  <strong style=background-color:red>" + seriesName + "</strong>"];
                }
                else {
                    return ["<span class='spantotal' style='text-align:center; " + showtotal + "'> " + ApplyFormatting(total, seriesName) +"</span>  <strong >" + seriesName + "</strong>"];
                }
                //if (notmojuud) {
                //    return ["", "  <strong style=background-color:red>" + seriesName + "</strong>", ""];
                //}
                //else {
                //    return ["", "  <strong >" + seriesName + "</strong>", ""];
                //}

            }
            },
            xaxis: xaxisobj,
            
            yaxis: yaxisobj,
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        return ApplyFormatting(parseFloat(value), w.globals.seriesNames[seriesIndex]);
                    }
                }
            },
           
        };
        chartconfigobj.Options = options;

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
            chart.render();
        }
        if (chartconfigobj.chartAxis == "x") {
            
        }

        
        if (chartconfigobj.chartAxis != "x") {
            var dropdownval = $("#savedCharts").val();
            try {

                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);

            } catch (err) {

                // error handling

            }

            chart = new ApexCharts(document.querySelector("#" + chartid), options);
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }
            chartIns.push(RegisterEntry);
            chart.render();
         /*   chart.updateSeries(chartconfigobj.chartSeries);*/
        /*    chart.updateOptions(options);*/
            
           
        }
       
        if (chartconfigobj.chartXAxis != "") {
            $("#div" + chartid).show();
            $("#b" + chartconfigobj.chartId).empty();
            $("#b" + chartconfigobj.chartId).text(chartconfigobj.chartXAxis);
            updatexaxisbackground(chartid, chartconfigobj.chartXAxis);
        }
        else {
            $("#div" + chartid).hide();
        }
        //setTimeout(function () {
        //    debugger;
        //    var legendhideid = "#" + chartconfigobj.chartId + " .apexcharts-legend";
        //    $(legendhideid).addClass("d-none");//css("display", "none !important")
        //    $(legendhideid).css("height", "10px !important")
        //    $(".apexcharts-legend").addClass("d-none");//css("display", "none !important")
        //    $(".apexcharts-legend").addClass("test");
        //    $(".apexcharts-legend").css("height", "10px !important")
        //}, 6000);
        //if (!ShowLegends) {
        //    //   $(".apexcharts-legend").css("height:10px !important")
        //    debugger;
        //    var legendhideid = "#" + chartconfigobj.chartId + " .apexcharts-legend";
        //    $(legendhideid).addClass("d-none");//css("display", "none !important")
        //}
        //else {
        //    $(".apexcharts-legend").css("height:50px !important")
        //}
       }

}


let roundOff = (num, places) => {
    const x = Math.pow(10, places);
    return Math.round(num * x) / x;
}




