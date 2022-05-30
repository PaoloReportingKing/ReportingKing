function setPieDonutChart(chartid) {

    removelegendiv(chartid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {

        var randomchartid = getrandomchartidusingid(chartid);
        $("#anc_" + randomchartid).addClass("d-none");

        var labelarray = [];
        var thischartpallet = chartconfigobj.chartselectedpallet;
        thischartpallet.forEach(function (item) {
            var hex = item;
            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }
            // convert 3-digit hex to 6-digits.
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            if (hex.length !== 6) {
                throw new Error('Invalid HEX color.');
            }
            var r = parseInt(hex.slice(0, 2), 16),
                g = parseInt(hex.slice(2, 4), 16),
                b = parseInt(hex.slice(4, 6), 16);

            var currentclr = (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';

            // invert color components

            labelarray.push(currentclr);
        });
        function padZero(str, len) {
            len = len || 2;
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
        }
        console.log(labelarray)
        var customScalesize = 1.1;
        var customdatalabel = {
            offset: 0,
            minAngleToShowLabel: 15,
            style: {
                fontSize: '11px',
                colors: labelarray
            },
        }
        if (chartconfigobj.chartYAxises.length > 0 && chartconfigobj.chartYAxises[0].LabelSideOrOverLap == "Side") {
            customdatalabel = {
                offset: pieoffset,
                minAngleToShowLabel: 15,
                style: {
                    fontSize: '11px',
                    colors: labelarray
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
                            if (!CheckNullUndefined(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {// && parseFloat(item[cat]) > 0) {
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
                        if (!CheckNullUndefined(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {//&& parseFloat(item[cat]) > 0) {
                            sumvalue = sumvalue + parseFloat(item[cat]);//.toFixed(2));
                        }
                    });
                }
                chartconfigobj.chartSeries.push(sumvalue);
            }
        });
        var b = $("#" + chartid);
        b.empty();
        if (chartconfigobj.chartXAxisLabels.length > 0) {
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
                dropShadow: {
                    enabled: false
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'lighten',
                        value:0.01,
                    }
                },
            },
            chart: {
                fontFamily: 'Poppins, sans-serif',
                type: charttype,
                height: piechartheight,
                width: '100%',
                id: chartconfigobj.chartId,
                offsetY: -25,
                animations: {
                    enabled: false
                },
                selection: {
                    enabled: true,
                    type: 'xy',
                    fill: {
                        color: '#000',
                        opacity: 1
                    },
                    stroke: {
                        width: 1,
                        dashArray: 3,
                        color: '#000',
                        opacity: 1
                    },
                    xaxis: {
                        min: undefined,
                        max: undefined
                    },
                    yaxis: {
                        min: undefined,
                        max: undefined
                    }
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
                        var chartconfigobj = chartsconfigurations.find(x => x.chartId == config.w.globals.chartID);
                        checkdoubleclick(config.w.globals.chartID, chartconfigobj.chartYAxises[0].label);
                    },
                },
            },
            //dsataLabels: {
            //    enabled: true,
            //    formatter: function (val, opts) {
            //        return ApplyFormatting(val, chartconfigobj.chartXAxis)+"%";
            //    }
            //},
            legend: {
                position: 'top',
                /* offsetY: 40*/
                height: 50,

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
                    // var chartid = opts.w.globals.chartID;
                    var notmojuud = false;
                    for (var i = 0; i < PinkFields.length; i++) {
                        if (PinkFields[i] == seriesName) { //chartconfigobj.chartXAxis) {
                            notmojuud = true;
                            break;
                        }
                    }

                    if (notmojuud) {
                        return [" <div class='spantotal' style='display:none'>0</div> <strong style='padding-bottom:2px;border-radius:3px;padding-left:3px;padding-right:3px;background-color:red;color:white'>" + seriesName + "</strong>"];
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

                        var value1 = ApplyFormatting(value, cat);
                        // return value1;
                        var chartconfigobj = chartsconfigurations.find(x => x.chartId == option.globals.chartID);

                        if (chartconfigobj.chartYAxises.length > 0) {
                            //  if (chartconfigobj.chartYAxises[0].LabelType == "Percentage") {
                            var total = 0;
                            for (var i = 0; i < option.config.series.length; i++) {
                                total += option.config.series[i];
                            }
                            var Percentvalu = value / total * 100;
                            var FinalVal = Percentvalu.toFixed(1);
                            return value1 + " (" + FinalVal + "%)";
                            //}
                            //else {
                            //    var va = Math.round((value / 100) * 6.283);
                            //    var value1 = ApplyFormatting(value, cat);
                            //    return value1;
                            //}

                        }
                        else {
                            return value1;
                        }

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
                    offsetY: 12,
                    dataLabels: customdatalabel,
                    customScale: customScalesize,// 0.9,

                    donut: {
                        //   size: chartWidth,
                    }
                }
            }
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
            try {
                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);
                //var grapharea = document.getElementById(chartid).getContext("2d");

                //var myChart = new Chart(grapharea, options);

                //myChart.destroy();

            } catch (e) {
                var data = '';
            }
            chart.render();
        }
        if (chartconfigobj.chartAxis != "x") {
            try {
                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);

                //var grapharea = document.getElementById(chartid).getContext("2d");

                //var myChart = new Chart(grapharea,options);

                //myChart.destroy();

            } catch (e) {
                var data = '';
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
            $("#div" + chartid).css('margin-top', piemargintop);

            //  updatexaxisbackground(chartid, cat);

        }
        else {
            $("#div" + chartid).hide();
        }
        if (chartconfigobj.chartXAxis == "") {
            // ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);
        }

        // $(".apexcharts-title-text").css("background-color", "red");
        updatexaxisbackground(chartid, chartconfigobj.chartXAxis);
    }
}
