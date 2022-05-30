


function setlinechartoldworking(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        chartconfigobj.chartSeries = [];
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var objectarray = [];
            var innerarray = [];
            var cat = catfield;

            $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                var sumvalue = 0;
                $.each(data_filter, function (i, item) {
                    if (parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                        sumvalue = sumvalue + parseFloat(item[cat]);
                    }
                });
                var objlinechart = { x: xaxis, y: sumvalue.toFixed(2) };
                innerarray.push(objlinechart);
                // innerarray.push(sumvalue.toFixed(2));
            });
            objectarray.data = innerarray;
            objectarray.name = cat;
            if (chartconfigobj.chartAxis != "x") {
                chartconfigobj.chartSeries.push(objectarray);
            }
        });

        var b = $("#" + chartconfigobj.chartId);
        b.empty();
        var options = {
            //series: [{
            //    name: 'Net Profit',
            //    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            //}],
            series: chartconfigobj.chartSeries,
            chart: {
                fontFamily: 'Poppins, sans-serif',
                type: 'line',
                height: 300,
                id: chartconfigobj.chartId,
                zoom: {
                    enabled: true,
                    type: 'xy'
                },
                animations: {
                    enabled: false
                },
                //   stacked: true,
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
                        reset: '<a  href=# width="50" style="color:#be2020" >Reset Zoom</a>' //'<img src="/static/icons/reset.png" width="20">',
                    }
                }

            },

            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 4,
                colors: selectedpallet //['transparent']
            },
            legend: {
                position: 'top',
                /* offsetY: 40*/
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
                        //debugger;
                        //   alert("series- " + opts.globals.seriesNames[seriesIndex] + " marker was clicked")
                        removeyaxis(opts.globals.seriesNames[seriesIndex], opts.globals.chartID);
                    },

                    customHTML: function () {
                        return '<span ><i  style="color:white;margin-left:5px">x</i></span>'
                    },
                    // onClick: showalert(),
                    offsetX: 0,
                    offsetY: 0
                },
                onItemClick: {
                    //onclick:  showalert()
                    //  toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            },
            //xaxis: {
            //    //  tickPlacement: 'on',
            //    categories: selectbarchartxaxisarray,//['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            //    title: { text: selectbarchartxaxisfield },



            //},
            xaxis: {
                categories: chartconfigobj.chartXAxisLabels,
                position: 'bottom',
                title: {
                   // text: chartconfigobj.chartXAxis,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'test',
                    },
                },

            },
            yaxis: {
                //title: {
                //    text: xaxisarray//'$ (thousands)'
                //}
            },
            colors: selectedpallet,
            fill: {
                selectedpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
            },

            //tooltip: {
            //    y: {
            //        formatter: function (val) {
           
            //            //var indcat = cat + ": " + val;
            //           // cat = cat + indcat;
            //            return ": " + val
            //        }
            //    }
            //}
        };

        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartconfigobj.chartId) {
                chartIns.splice(i, 1);
                return false;
            }
        });

        var chart = new ApexCharts(document.querySelector("#" + chartconfigobj.chartId), options);
        var RegisterEntry = {
            "instance": chart,
            "id": chartconfigobj.chartId
        }
        chartIns.push(RegisterEntry);
        chart.render();
        if (chartconfigobj.chartXAxis != "") {
            //debugger;
            $("#div" + chartid).show();
            $("#b" + chartconfigobj.chartId).empty();
            $("#b" + chartconfigobj.chartId).text(chartconfigobj.chartXAxis);
        }
    }
}
function setlinechart(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        chartconfigobj.chartSeries = [];
        var seriesyaxis = [];
        var showlabellist = [];
        var maximumvalueseriesvalue = 0;
        var maximumvalueleftyseriesvalue = 0;
        var maximumvaluerightsideseriesname = "";
        var maximumvalueleftsideseriesname = "";
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var objectarray = [];
            var innerarray = [];
            var cat = catfield.label;
            objectarray.name = cat;
            if (catfield.showlabel) {
                showlabellist.push(catfield.label);
            }
            var seriesyaxisobj = { seriesName: cat, opposite: catfield.opposite, show: false };
            seriesyaxis.push(seriesyaxisobj);
            objectarray.type = catfield.seriestype;
            $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                var sumvalue = 0;
                $.each(data_filter, function (i, item) {
                    if (parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                        sumvalue = sumvalue + parseFloat(item[cat]);
                    }
                });
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
                innerarray.push(sumvalue.toFixed(2));
                objectarray.data = innerarray;
            });
            if (chartconfigobj.chartAxis != "x") {
                chartconfigobj.chartSeries.push(objectarray);
            }
        });
        var showoppositeaxislabelindex = seriesyaxis.findIndex(x => x.seriesName == maximumvaluerightsideseriesname);
        if (showoppositeaxislabelindex != -1) {
            seriesyaxis[showoppositeaxislabelindex].show = true;
        }
        var showyaxislabelindex = seriesyaxis.findIndex(x => x.seriesName == maximumvalueleftsideseriesname);
        if (showyaxislabelindex != -1) {
            seriesyaxis[showyaxislabelindex].show = true;
        }
        chartconfigobj.chartSeries.labels = [];//showlabellist;
        var b = $("#" + chartconfigobj.chartId);
        b.empty();
        var options = {
            series: chartconfigobj.chartSeries,
            chart: {
                type: 'line',
                height: 350,
                id: chartconfigobj.chartId,
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        //debugger;
                        console.log(event, config)
                        checkdoubleclick(config.w.globals.chartID, config.w.globals.seriesNames[config.seriesIndex]);
                    },
                    legendClick: function (chartContext, seriesIndex, config) {
                        debugger;
                        updateseriesstartusinglegend(config.globals.chartID, config.globals.seriesNames[seriesIndex]);
                    },
                   
                    click: function (event, chartContext, config) {
                      //  debugger;
                      //  checkdoubleclick("Category Name", "");
                        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                    }
                },
                zoom: {
                    enabled: true,
                    type: 'xy'
                },
                animations: {
                    enabled: false
                },
                tooltip: {
                    intersect: true,
                    shared: false
                },
                markers: {
                    size: 6,
                }
            },

            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 4,
                colors: selectedpallet //['transparent']
            },

            legend: {

                position: 'top',
                /* offsetY: 40*/
                showForSingleSeries: true,
                //   customLegendItems: [],//showlabellist,
                markers: {
                    width: 19,
                    height: 19,
                    strokeWidth: 0,
                    fontSize: '25px',
                    //  strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 14,
                    onClick: function (chart, seriesIndex, opts) {
                        //debugger;
                        //   alert("series- " + opts.globals.seriesNames[seriesIndex] + " marker was clicked")
                        removeyaxis(opts.globals.seriesNames[seriesIndex], opts.globals.chartID);
                    },

                    customHTML: function () {
                        return '<span ><i  style="color:white;margin-left:5px">x</i></span>'
                    },
                    // onClick: showalert(),
                    offsetX: 0,
                    offsetY: 0
                },
                //onItemClick: {
                //    //onclick:  showalert()
                //      toggleDataSeries: false
                //},
                //onItemHover: {
                //    highlightDataSeries: false
                //},
            },

            xaxis: {
                categories: chartconfigobj.chartXAxisLabels,
                position: 'bottom',
                tickPlacement: 'on',
                title: {
                    //  text: chartconfigobj.chartXAxis,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'test',
                    },
                },

            },

            yaxis: seriesyaxis,


            colors: selectedpallet,
            fill: {
                selectedpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
            },
            //tooltip: {
            //    shared: true,
            //    intersect: true,
            //}

        };

        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartconfigobj.chartId) {
                chartIns.splice(i, 1);
                return false;
            }
        });

        var chart = new ApexCharts(document.querySelector("#" + chartconfigobj.chartId), options);
        var RegisterEntry = {
            "instance": chart,
            "id": chartconfigobj.chartId
        }
        chartIns.push(RegisterEntry);
        // chart.destroy();
        chart.render();

        if (chartconfigobj.chartXAxis != "") {
            $("#div" + chartid).show();
            $("#b" + chartconfigobj.chartId).empty();
            $("#b" + chartconfigobj.chartId).text(chartconfigobj.chartXAxis);
            $(".apexcharts-reset-icon").css("width", "100");
        }

    }



}
function setlinechart1(chartId) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartId);
    if (chartconfigobj != undefined) {
        chartconfigobj.chartSeries = [];
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var objectarray = [];
            var innerarray = [];
            var cat = catfield;
         
            $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                var sumvalue = 0;
                $.each(data_filter, function (i, item) {
                    if (parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                        sumvalue = sumvalue + parseFloat(item[cat]);
                    }
                });
                var objlinechart = { x: xaxis, y: parseInt(sumvalue.toFixed(2)) };
                innerarray.push(objlinechart);
               // innerarray.push(sumvalue.toFixed(2));
            });
            objectarray.data = innerarray;
            objectarray.name = cat;
            if (chartconfigobj.chartAxis != "x") {
                chartconfigobj.chartSeries.push(objectarray);
            }
        });
        var b = $("#" + chartId);
        b.empty();

        var options = {
            series: chartconfigobj.chartSeries,
            chart: {
                height: 350,
                type: 'line',
                id: chartconfigobj.chartId,
                zoom: {
                    enabled: false,
                    type: 'xy'
                },
                animations: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                    tools: {
                        download: false,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                    }
                },
            },

            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 4,
                colors: selectedpallet //['transparent']
            },
            //tooltip: {
            //    shared: true,
            //    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            //        debugger;
            //        return '<div class="arrow_box">' +
            //            '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
            //            '</div>'
            //    }
            //},
            tooltip: {
                enabled: true,
                enabledOnSeries: true,
                shared: true,
                followCursor: true,
                intersect: false,
                inverseOrder: false,
                custom: undefined,
                fillSeriesColor: true,
                theme: false,
                style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                },
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                x: {
                    show: true,
                    format: "dd MMM",
                    formatter: undefined,
                },
                y: {
                    show: false,
                    formatter: undefined,
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                },
                z: {
                    formatter: undefined,
                    title: "Size: ",
                },
                marker: {
                    show: false,
                },
                items: {
                    display: "flex",
                },
                fixed: {
                    enabled: false,
                    position: "topRight",
                    offsetX: 0,
                    offsetY: 0,
                },
            },


            legend: {
                position: 'top',
                /* offsetY: 40*/
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
                        //debugger;
                        //   alert("series- " + opts.globals.seriesNames[seriesIndex] + " marker was clicked")
                        removeyaxis(opts.globals.seriesNames[seriesIndex], opts.globals.chartID);
                    },

                    customHTML: function () {
                        return '<span ><i  style="color:white;margin-left:5px">x</i></span>'
                    },
                    // onClick: showalert(),
                    offsetX: 0,
                    offsetY: 0
                },
                onItemClick: {
                    //onclick:  showalert()
                    //  toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            },
            //xaxis: {
            //    //  tickPlacement: 'on',
            //    categories: selectbarchartxaxisarray,//['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            //    title: { text: selectbarchartxaxisfield },



            //},
            xaxis: {
                categories: chartconfigobj.chartXAxisLabels,
                position: 'bottom',
                tickAmount: 1,
                title: {
                    text:chartconfigobj.chartXAxis,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: undefined,
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'test',
                    },
                },
                axisTicks: {
                    show: true,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
                labels: {
                    show: true,
                  //  offsetX
                },      
              //  offsetX:"hello",
            },
            yaxis: {
                //title: {
                //    text: xaxisarray//'$ (thousands)'
                //}
            },
            colors: selectedpallet,
            fill: {
                selectedpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
            }

        };

        var chart = new ApexCharts(document.querySelector("#" + chartId), options);
        chart.render();
    }
}






