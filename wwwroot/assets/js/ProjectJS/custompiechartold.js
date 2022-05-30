function setPieDonutChart(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {

        var randomchartid = getrandomchartidusingid(chartid);
        $("#anc_" + randomchartid).addClass("d-none");


        var thischartpallet = chartconfigobj.chartselectedpallet;
        var customScalesize = 1.1;
        var customdatalabel = {
            offset: 0,
            minAngleToShowLabel: 15,
            style: {
                fontSize: '11px',
                colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"]
            },
        }
        if (chartconfigobj.chartYAxises.length > 0 && chartconfigobj.chartYAxises[0].LabelSideOrOverLap == "Side") {
            customdatalabel = {
                offset: 35,
                minAngleToShowLabel: 15,
                style: {
                    fontSize: '11px',
                    colors: ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"]
                },
            }
            customScalesize = 1.1;
        }
        chartconfigobj.chartSeries = [];
        var seriesarray = [];
        //  chartconfigobj.chartSeries.push(0);
        var cat = "";
        var charttype = "donut";
        var chartWidth = "60%"
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            cat = catfield.label;
            if (catfield.seriestype == "Ring") {
                charttype = "donut";
                chartWidth = "80%"
            }
            else {
                charttype = catfield.seriestype;
            }



            seriesarray.push(cat);
            if (chartconfigobj.chartXAxisLabels.length > 0) {
                $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                    var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                    var sumvalue = 0;
                    sumvalue = calculateValuesForCustomFields(data_filter, cat)
                    if (sumvalue == 0) {
                        $.each(data_filter, function (i, item) {
                            if (parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                                sumvalue = sumvalue + parseFloat(item[cat]);//.toFixed(2));
                            }
                        });
                    }
                    /*chartconfigobj.chartSeries.push(parseInt(sumvalue.toFixed(2)));*/
                    chartconfigobj.chartSeries.push(sumvalue);

                });
            }
            else {
                var data_filter = filteredData;//.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                var sumvalue = 0;
                sumvalue = calculateValuesForCustomFields(data_filter, cat);
                if (sumvalue == 0) {
                    $.each(data_filter, function (i, item) {
                        if (parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                            sumvalue = sumvalue + parseFloat(item[cat]);//.toFixed(2));
                        }
                    });
                }
                chartconfigobj.chartSeries.push(sumvalue);
            }
        });
        var b = $("#" + chartid);
        b.empty();
        if (chartconfigobj.chartXAxisLabels.length > 1) {
            seriesarray = [];
            //$.each(chartconfigobj.chartXAxisLabels, function (i, item) {
            //    seriesarray.push(item);
            //});
            $.each(chartconfigobj.chartXAxisShowLabels, function (i, item) {
                seriesarray.push(item);
            });
        }
        var titlestyle = {
            fontSize: '12px',
            // fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
        }
        //var notmojuud = false;
        //            for (var i = 0; i < RplaceAbleFields.length; i++) {
        //                if (RplaceAbleFields[i] == cat) {
        //                    notmojuud = true;
        //                    break;
        //                }
        //            }
        //if (notmojuud) {
        //    titlestyle = {
        //        fontSize: '12px',
        //       // background-color:red,
        //        fontFamily: undefined,
        //        color: '#263238'
        //    }
        //}

        var options = {
            series: chartconfigobj.chartSeries,//.data,//[44, 55, 41, 17, 15],
            labels: seriesarray,//chartconfigobj.chartXAxisLabels,// ["Outgoing", "Incoming", "Mobile"],
            dataLabels: {
                enabled: true,
                //offset: 40,
                //minAngleToShowLabel: 1,s
                //style: {
                //    fontSize: '17px',
                //    colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"]
                //},
                style: customdatalabel.style,
                formatter: function (val, opts) {
                    //   debugger;
                    // var chartconfigobj = chartsconfigurations.find(x => x.chartId == option.globals.chartID);
                    if (chartconfigobj.chartYAxises.length > 0) {
                        if (chartconfigobj.chartYAxises[0].LabelType == "Percentage") {
                            // var value = //ApplyFormatting(val, cat);
                            return val.toFixed(1) + "%";
                        }
                        else {
                            var value = ApplyFormatting(opts.w.config.series[opts.seriesIndex], cat);
                            return value;
                        }

                    }
                },

            },
            chart: {
                fontFamily: 'Poppins, sans-serif',
                type: charttype,
                height: 300,
                width: '100%',
                id: chartconfigobj.chartId,
                offsetY: -25,
                animations: {
                    enabled: false
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: false,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                    }
                },

                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        debugger;
                        var chartconfigobj = chartsconfigurations.find(x => x.chartId == config.w.globals.chartID);
                        checkdoubleclick(config.w.globals.chartID, chartconfigobj.chartYAxises[0].label);
                    },
                },
            },
            //dsataLabels: {
            //    enabled: true,
            //    formatter: function (val, opts) {
            //        debugger;
            //        return ApplyFormatting(val, chartconfigobj.chartXAxis)+"%";
            //    }
            //},
            legend: {
                position: 'top',
                /* offsetY: 40*/
                showForSingleSeries: true,
                markers: {
                    width: 19,
                    height: 19,
                    // strokeWidth: 10,
                    //  strokeColor: '#000',
                    fontSize: '25px',
                    radius: 14,
                    customHTML: function () {
                        // return '<span ><i  style="color:white;margin-left:5px">x</i></span>'
                        return '<span class="' + chartconfigobj.chartId + '" ><i  style="color:white;margin-left:5px;display:none">x</i></span>'
                    },
                    offsetX: 0,
                    offsetY: 0
                },
                formatter: function (seriesName, opts) {
                    //debugger;
                    var notmojuud = false;
                    for (var i = 0; i < PinkFields.length; i++) {
                        if (PinkFields[i] == seriesName) {
                            notmojuud = true;
                            break;
                        }
                    }

                    if (notmojuud) {
                        return [" <div class='spantotal' style='display:none'>0</div> <strong style='background-color:red;color:white'>" + seriesName + "</strong>"];
                    }
                    else {
                        return [" <div class='spantotal' style='display:none'>0</div> <strong>" + seriesName + "</strong>"];
                    }
                },

                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                },
            },
            colors: thischartpallet,
            fill: {

                thischartpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
            },
            grid: {
                show: true,
                padding: {
                    top: 0,
                    bottom: 0
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
                y: {
                    formatter: function (value, option) {
                        //  debugger;
                        var value1 = ApplyFormatting(value, cat);
                        return value1;
                        //var chartconfigobj = chartsconfigurations.find(x => x.chartId == option.globals.chartID);

                        //if (chartconfigobj.chartYAxises.length > 0) {
                        //    if (chartconfigobj.chartYAxises[0].LabelType == "Percentage") {
                        //        var total = 0;
                        //        for (var i = 0; i < option.config.series.length; i++) {
                        //            total += option.config.series[i];
                        //        }
                        //        var Percentvalu = value / total * 100;
                        //        var FinalVal = Percentvalu.toFixed(1);
                        //        return FinalVal+"%";
                        //    }
                        //    else {
                        //        var va = Math.round((value / 100) * 6.283);
                        //        var value1 = ApplyFormatting(value, cat);
                        //        return value1;
                        //    }

                        //}

                    },

                },

            },
            title: {
                text: cat,
                align: 'center',
            },
            //plotOptions: {
            //    pie: {

            //        donut: {
            //        size: chartWidth,
            //        }
            //    }
            //}s
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    //dataLabels: {
                    //    offset: 35,
                    //    minAngleToShowLabel: 1,
                    //     style: {
                    //        fontSize: '18px',
                    //        colors: [ "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"]
                    //    },
                    //},
                    offsetY: 15,
                    dataLabels: customdatalabel,
                    customScale: customScalesize,// 0.9,

                    donut: {
                        //   size: chartWidth,
                    }
                }
            }
        };

        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartconfigobj.chartId) {
                chartIns.splice(i, 1);
                return false; s
            }
        });

        var chart = new ApexCharts(document.querySelector("#" + chartconfigobj.chartId), options);



        if (chartconfigobj.chartAxis == "x") {
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }
            chartIns.push(RegisterEntry);
            try {
                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);
            } catch (e) {

            }
            chart.render();
        }
        if (chartconfigobj.chartAxis != "x") {
            try {
                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);
            } catch (e) {

            }

            /*  ApexCharts.exec(chartconfigobj.chartId, 'render', options);*/

            chart = new ApexCharts(document.querySelector("#" + chartid), options);
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }
            chartIns.push(RegisterEntry);
            chart.render();
        }
        if (chartconfigobj.chartXAxis != "") {
            $("#div" + chartid).show();
            $("#b" + chartconfigobj.chartId).empty();
            $("#b" + chartconfigobj.chartId).text(chartconfigobj.chartXAxis);
            $("#div" + chartid).css('margin-top', -25);

            updatexaxisbackground(chartid, cat);

        }
        else {
            $("#div" + chartid).hide();
        }
        if (chartconfigobj.chartXAxis == "") {
            // ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);
        }

        // $(".apexcharts-title-text").css("background-color", "red");

    }
}
