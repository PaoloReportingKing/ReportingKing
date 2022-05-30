
function setMixedcolumnareaandLinechart(chartId) {
    var typecount = 0;
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartId);
    if (chartconfigobj != undefined) {
        chartconfigobj.chartSeries = [];
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            typecount = typecount + 1;
            var objectarray = [];
            var innerarray = [];
            var cat = catfield;
            objectarray.name = cat;
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
            $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                var sumvalue = 0;
                $.each(data_filter, function (i, item) {
                    if (parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                        sumvalue = sumvalue + parseFloat(item[cat]);
                    }
                });
                var objlinechart = { x: xaxis, y: sumvalue.toFixed(2)};
              /*  var objlinechart = { x: xaxis, y: parseInt(sumvalue.toFixed(2)) };*/
                innerarray.push(objlinechart);
                // innerarray.push(sumvalue.toFixed(2));
            });
            objectarray.data = innerarray;
            if (chartconfigobj.chartAxis != "x") {
                chartconfigobj.chartSeries.push(objectarray);
            }
        });
        //$.each(selectcatfields, function (i, catfield) {
        //    typecount = typecount + 1;
        //    var objectarray = [];
        //    var innerarray = [];
        //    var cat = catfield;
        //    objectarray.name = cat;
        //    if (typecount == 1) {

        //        objectarray.type = "column";
        //    }
        //    if (typecount == 2) {
        //        /* objectarray.type = "column";*/
        //        objectarray.type = "area";
        //    }
        //    if (typecount == 3) {
        //        objectarray.type = "line";
        //        typecount = 1;
        //    }
        //    $.each(filteredData, function (i, item) {
        //        if (item[cat] != undefined) {
        //            innerarray.push(item[cat]);
        //        }
        //    });
        //    objectarray.data = innerarray;
        //    if (axis != "x") {
        //        series.push(objectarray);
        //    }
        //});
        var b = $("#" + chartId);
        b.empty();
        var options = {
            series: chartconfigobj.chartSeries,
            //series: [{
            //    name: 'TEAM A',
            //    type: 'column',
            //    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
            //}],
            chart: {
                fontFamily: 'Poppins, sans-serif',
                height: chartheight,
                type: 'line',
                stacked: false,
                id: chartconfigobj.chartId,
                zoom: {
                    enabled: true,
                    type: 'xy'
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
                        reset: '<a  href=# width="50" style="color:#be2020" >Reset Zoom</a>' //'<img src="/static/icons/reset.png" width="20">',
                    }
                }
            },
            colors: selectedpallet,
            fill: {
                selectedpallet  // colors: ['#F44336', '#E91E63', '#9C27B0']
            },
            stroke: {
                width: [0, 2, 5],
                curve: 'smooth',
                colors: selectedpallet
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },

            //fill: {
            //    opacity: [0.85, 0.25, 1],
            //    gradient: {
            //        inverseColors: false,
            //        shade: 'light',
            //        type: "vertical",
            //        opacityFrom: 0.85,
            //        opacityTo: 0.55,
            //        stops: [0, 100, 100, 100]
            //    }
            //},
            //labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
            //    '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
            //],
            labels: chartconfigobj.chartXAxisLabels,
            markers: {
                size: 0
            },
            //xaxis: {
            //    type: 'datetime'
            //},
            xaxis: {
                categories: chartconfigobj.chartXAxisLabels,
                position: 'bottom',
                title: {
                //    text: chartconfigobj.chartXAxis,
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
                title: {
                   // text: 'Points',
                },
                min: 0
            },
            colors: selectedpallet,
            fill: {
                selectedpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
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
                        //
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
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val
                            }
                        }
                    }
                ]
            }
            
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
            //
            $("#div" + chartId).show();
            $("#b" + chartconfigobj.chartId).empty();
            $("#b" + chartconfigobj.chartId).text(chartconfigobj.chartXAxis);
        }
    }
}
















