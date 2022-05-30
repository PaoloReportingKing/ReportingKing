function setRadialChartOld(chartid) {
    series = [];
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        chartconfigobj.chartSeries = [];
        var Labelsarray = [];
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var cat = catfield;
            Labelsarray.push(cat);
            var sumvalue = 0;
            var uniquearray = [];
            $.each(filteredData, function (i, item) {
                var value = parseFloat(item[cat]);
                /*    if (isString(item[cat])) {*/
                if (item[cat] != "" && item[cat] != null && item[cat] != undefined && isNaN(value)) {
                    var exist = false;
                    $.each(uniquearray, function (i, xaxisitem) {
                        if (xaxisitem == item[cat]) {
                            exist = true;
                        }
                    });
                    if (!exist)
                    {
                        uniquearray.push(item[cat]);
                        sumvalue = sumvalue + 1;
                    }
                    }
              
                else if (item[cat] != ""&&parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                    sumvalue = sumvalue + parseFloat(item[cat]);
                }
            });
           
            chartconfigobj.chartSeries.push(sumvalue.toFixed(2));
        });
        var b = $("#" + chartid);
        b.empty();


        var options = {
            chart: {
                height: 350,
                type: "radialBar",
                 id: chartconfigobj.chartId,
                zoom: {
                    enabled: true,
                    type: 'xy'
                },
                animations: {
                    enabled: true
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: false,
                        selection: false,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                    }
                },
            },
            series: chartconfigobj.chartSeries,//[2100, 30000, 97, 61],
            plotOptions: {
                radialBar: {

                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            color: undefined,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '14px',
                            fontFamily: undefined,
                            fontWeight: 400,
                            color: undefined,
                            offsetY: 16,
                            formatter: function (val) {
                                return val //+ '%%'
                            }
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            color: '#373d3f',
                            fontSize: '16px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length + '%'
                            }
                        }
                    },

                    
                }
            },
            colors: selectedpallet,
            fill: {
                selectedpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                opacity: 1
            },
            labels: Labelsarray,
        
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


            legend: {
                show: true,
               // floating: true,
             //   fontSize: '12px',
                position: 'top',
             //   offsetX: 0,
               // offsetY: 10,
                labels: {
                    useSeriesColors: true,
                },
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
              
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.percentage + '%%';
                }
            },
        };
        $("#div" + chartid).hide();
        $("#div" + chartid).css("margin-top",5);
        var chart = new ApexCharts(document.querySelector("#" + chartconfigobj.chartId), options);
        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartconfigobj.chartId) {
                chartIns.splice(i, 1);
                return false;
            }
        });
      
        if (chartconfigobj.chartAxis == "x") {
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }

            chartIns.push(RegisterEntry);
            chart.render();
        }
        if (chartconfigobj.chartAxis != "x" ) {
            ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);
            chart = new ApexCharts(document.querySelector("#" + chartid), options);
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }

            chartIns.push(RegisterEntry);
            chart.render();
        }
      
    }
}


function setRadialChart(chartid) {
    series = [];
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    if (chartconfigobj != undefined) {
        chartconfigobj.chartSeries = [];
        var Labelsarray = [];
        var markeryoffset = 0;
        var thischartpallet = chartconfigobj.chartselectedpallet;
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var cat = catfield.label;
            Labelsarray.push(cat);
            var sumvalue = 0;
            var uniquearray = [];
            if (chartconfigobj.ShowTotals) {
                markeryoffset = 4;
            }
            var calculatedField = cFields.find(x => x.name == cat);
            if (calculatedField != undefined) {
                sumvalue = calculateValuesForCustomFieldsNumberChart(filteredData, cat)
                chartconfigobj.chartSeries.push(sumvalue);
            }
            else {
                $.each(filteredData, function (i, item) {
                    // var value = parseFloat(item[cat]);
                    //var isnum = isNaN(item[cat]);
                    /*    if (isString(item[cat])) {*/
                    if (item[cat] != "" && item[cat] != null && item[cat] != undefined && isNaN(item[cat])) {
                        var exist = false;
                        $.each(uniquearray, function (i, xaxisitem) {
                            if (xaxisitem == item[cat]) {
                                exist = true;
                            }
                        });
                        if (!exist) {
                            uniquearray.push(item[cat]);
                            sumvalue = sumvalue + 1;
                        }
                    }

                    else if (item[cat] != "" && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                        sumvalue = sumvalue + parseFloat(item[cat]);//.toFixed(2));
                    }
                });
                /*  }*/
                //if (calculatedField != undefined) {
                //    var params = {
                //        "decimalPlaces": parseInt(calculatedField.decimalPlaces),
                //        "formattingType": calculatedField.formattingType,
                //        "formatOption": calculatedField.formattingType,
                //        "formatType": calculatedField.formatType,
                //        "currencySymbol": calculatedField.currencySymbol
                //    }
                //    if (calculatedField.formattingType == '2' || calculatedField.formattingType == "1") {
                //        params.formattingType = '1';
                //        params.formatOption = '1'

                //    }
                //    var value = getFormattedValue(sumvalue, params)
                //    chartconfigobj.chartSeries.push(value);
                //}
                //else {
                var totalsumval = sumvalue.toString();
                /* chartconfigobj.chartSeries.push(sumvalue.toFixed(2));*/
                chartconfigobj.chartSeries.push(totalsumval);
            }

            //}

            //(ApplyFormatting(sumvalue, cat));//(sumvalue.toFixed(2));
        });
        var b = $("#" + chartid);
        b.empty();
        var options = {
            chart: {

                fontFamily: 'Poppins, sans-serif',
                height: 300,
                type: "radialBar",
                id: chartconfigobj.chartId,
                zoom: {
                    enabled: true,
                    type: 'xy'
                },
                animations: {
                    enabled: true
                },
                grid: {
                    show: true,
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                },
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        //debugger;
                        checkdoubleclick(config.w.globals.chartID, config.w.globals.seriesNames[config.dataPointIndex]);
                    },
                    dataPointMouseEnter: function (event, chartContext, config) {
                        debugger;
                        // var div = $("#" + config.w.globals.chartID);
                        // var div1 = div[0].children[0].lastElementChild.previousSibling;
                        // var Serieschildrens = div1.lastChild.previousElementSibling.children[1].children[0].children[1].children;
                        // var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
                        // //$.each(chartconfigobj.chartYAxises, function (i, catfield) {
                        // //    $("#" + Serieschildrens[i].id).addClass(catfield.seriestype);
                        // //});
                        //   var hallowdivs = $(Serieschildrens[chartconfigobj.chartYAxises.length + 1])
                        //// var hallowdivs = $(Serieschildrens[chartconfigobj.chartYAxises.length])
                        // var hallowdivschildren = hallowdivs[0].children;
                        // var firstchildrenname = hallowdivschildren[0];
                        // var secondchildlabel = hallowdivschildren[1];
                        // $("#" + hallowdivs[0].id).empty();
                        // var firstchildouthtml = `<text id="SvgjsText1050" font-family="Poppins, sans-serif" x="109.5" y="120.5" text-anchor="middle" dominant-baseline="auto" font-size="16px" font-weight="400" fill="#a50044" class="apexcharts-text apexcharts-datalabel-label" style="font-family: Poppins, sans-serif; ">Val</text>`;
                        //// firstchildrenname.outerHTML = firstchildouthtml;
                        // $("#" + hallowdivs[0].id).append(firstchildouthtml);
                        // $("#" + hallowdivs[0].id).append(firstchildrenname);

                        // return false;
                    }
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: false,
                        selection: false,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                    }
                },
            },
            series: chartconfigobj.chartSeries,//[2100, 30000, 97, 61],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '100%',

                    },

                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '20px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            color: undefined,
                            /*    offsetY: -10*/
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            fontFamily: undefined,
                            fontWeight: 400,
                            color: undefined,
                            /*    offsetY: 16,*/
                            formatter: function (val, opt) {
                                // debugger;
                                var seriesindex = 0;
                                var seriesName = opt.globals.seriesNames[seriesindex];
                                for (var i = 0; i < opt.globals.series.length; i++) {
                                    if (opt.globals.series[i] == val) {
                                        seriesindex = i;
                                    }
                                }
                                var sampleValue = filteredData[0][opt.globals.seriesNames[seriesindex]];
                                if (isNaN(sampleValue)) {
                                    return val;
                                    // return ["<div class='spantotal' style='text-align:center;'>  "+val + "</div>  <strong >" + seriesName + "</strong>"];
                                }
                                else {
                                    return ApplyFormatting(parseFloat(val), opt.globals.seriesNames[seriesindex]) //+ '%%'
                                    //   return ["<div class='spantotal' style='text-align:center;'> " + ApplyFormatting(parseFloat(val), seriesName) + " <strong >" + seriesName + "</strong></div> "];
                                }
                            }
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            color: '#373d3f',
                            fontSize: '16px',
                            fontFamily: undefined,
                            fontWeight: 600,
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) / w.globals.series.length + '%'
                            }
                        }
                    },
                }
            },
            colors: thischartpallet,//selectedpallet,
            fill: {
                thischartpallet, // colors: ['#F44336', '#E91E63', '#9C27B0']
                // opacity: 1
            },
            labels: Labelsarray,
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
            legend: {
                show: true,
                // floating: true,
                //   fontSize: '12px',
                position: 'top',
                offsetX: 0,
                offsetY: 0,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    width: 19,
                    height: 19,
                    strokeWidth: 0,
                    fontSize: '25px',
                    //  strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 14,
                    onClick: function (chart, seriesIndex, opts) {
                        //  debugger;
                        //   alert("series- " + opts.globals.seriesNames[seriesIndex] + " marker was clicked")
                        //removeyaxis(opts.globals.seriesNames[seriesIndex], opts.globals.chartID);
                    },

                    customHTML: function () {
                        return '<span class="' + chartconfigobj.chartId + '" ><i  style="color:white;margin-left:5px">x</i></span>'
                    },
                    // onClick: showalert(),
                    offsetX: 0,
                    offsetY: markeryoffset
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
                    var total = 0;
                    var seriesobjindex = chartconfigobj.chartYAxises.findIndex(x => x.label == seriesName);
                    if (chartconfigobj.ShowTotals) {
                        var sampleValue = filteredData[0][seriesName];
                        if (isNaN(sampleValue)) {
                            total = chartconfigobj.chartSeries[seriesobjindex];
                        }
                        else {
                            total = ApplyFormatting(parseFloat(chartconfigobj.chartSeries[seriesobjindex]), seriesName) //+ '%%'
                        }


                        showtotal = "";
                    }

                    //if (notmojuud) {
                    //    return ["", "  <strong style=background-color:red>" + seriesName + "</strong>", ""];
                    //}
                    //else {
                    //    return ["", "  <strong >" + seriesName + "</strong>", ""];
                    //}
                    if (notmojuud) {
                        return [" <div class='spantotal' style='text-align:center ;" + showtotal + "'> " + ApplyFormatting(total, seriesName) + "</div><strong style=background-color:red>" + seriesName + "</strong>"];
                    }
                    else {
                        return [" <div class='spantotal' style='text-align:center ;" + showtotal + "'> " + ApplyFormatting(total, seriesName) + "</div> <strong >" + seriesName + "</strong>"];
                    }
                },

                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                },
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.percentage + '%%';
                }
            },

        };
        $("#div" + chartid).hide();
        $("#div" + chartid).css("margin-top", 5);
        var chart = new ApexCharts(document.querySelector("#" + chartconfigobj.chartId), options);
        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartconfigobj.chartId) {
                chartIns.splice(i, 1);
                return false;
            }
        });
        if (chartconfigobj.chartAxis == "x") {
            var RegisterEntry = {
                "instance": chart,
                "id": chartconfigobj.chartId
            }
            chartIns.push(RegisterEntry);
            try {

                ApexCharts.exec(chartconfigobj.chartId, 'destroy', options);

            } catch (err) {
                // error handling
            }
            chart.render();
        }
        if (chartconfigobj.chartAxis != "x") {
            var dropdownval = $("#savedCharts").val();
            //  debugger;
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
        }
        window.setTimeout(function () {
            debugger;
            var div = $("#" + chartconfigobj.chartId);
            var div1 = div[0].children[0].lastElementChild.previousSibling;
            var Serieschildrens = div1.lastChild.previousElementSibling.children[1].children[0].children[1].children;

            //$.each(chartconfigobj.chartYAxises, function (i, catfield) {
            //    debugger;
            //    $("#" + Serieschildrens[i].id).addClass(catfield.seriestype);
            //});
            //var hallowdivs = $(Serieschildrens[chartconfigobj.chartYAxises.length + 1])
            //$("#" + hallowdivs[0].id).empty();
            //var firstchildouthtml = `<text id="SvgjsText1050" font-family="Poppins, sans-serif" x="109.5" y="120.5" text-anchor="middle" dominant-baseline="auto" font-size="16px" font-weight="400" fill="#a50044" class="apexcharts-text apexcharts-datalabel-label" style="font-family: Poppins, sans-serif; ">Val</text>`;
            //$("#" + hallowdivs[0].id).append(firstchildouthtml);
            // var firstchildrenname = hallowdivschildren[0];

            //var div = $("#" + chartconfigobj.chartId);
            //            var div1 = div[0].children[0].lastElementChild.previousSibling;
            //            var Serieschildrens = div1.lastChild.previousElementSibling.children[1].children[0].children[1].children;
            //            var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
            //            //$.each(chartconfigobj.chartYAxises, function (i, catfield) {
            //            //    $("#" + Serieschildrens[i].id).addClass(catfield.seriestype);
            //            //});
            //              var hallowdivs = $(Serieschildrens[chartconfigobj.chartYAxises.length + 1])
            //           // var hallowdivs = $(Serieschildrens[chartconfigobj.chartYAxises.length])
            //            var hallowdivschildren = hallowdivs[0].children;
            //            var firstchildrenname = hallowdivschildren[0];
            //            var secondchildlabel = hallowdivschildren[1];
            //            $("#" + hallowdivs[0].id).empty();
            //            var firstchildouthtml = `<text id="SvgjsText1050" font-family="Poppins, sans-serif" x="109.5" y="120.5" text-anchor="middle" dominant-baseline="auto" font-size="16px" font-weight="400" fill="#a50044" class="apexcharts-text apexcharts-datalabel-label" style="font-family: Poppins, sans-serif; ">Val</text>`;
            //           // firstchildrenname.outerHTML = firstchildouthtml;
            //            $("#" + hallowdivs[0].id).append(firstchildouthtml);
            //            $("#" + hallowdivs[0].id).append(firstchildrenname);
        },
            2000);
    }
}
