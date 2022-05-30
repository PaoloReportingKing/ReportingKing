/*const { isNumeric } = require("jquery");*/

var dynamic_opacity = [];
let hideShowDataLabes = true;
let labelfontsize = '12px';
let overlappingy = -50;
var borderColor = 'none';
var labelcolor = '';
var borderWidth = 0;
var labelspadding = 0;
var backgroundcolor = '';

function setbarchart(chartid) {
   // var noofticks = getTicks.setMaxTicks(5);
    
   
    $("#reset_" + chartid).hide();
    getChartStructure();
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var typecount = 0;
    var chartleftrightpadding = 0;
    var columnwidth = "65%";
    var markeryoffset = 0;
    var thischartpallet = [];//chartconfigobj.chartselectedpallet;
    for (var m = 0; m < chartconfigobj.chartselectedpallet.length; m++) {
        thischartpallet.push(chartconfigobj.chartselectedpallet[m]);
    }
    var pointpadding = 0.04;
    // 
    if (chartconfigobj != undefined) {
        if (chartsconfigurations.length === 1) {

            chartleftrightpadding = 20
        }
        else {
            labelfontsize = '10px';
            columnwidth = "85%";
            chartleftrightpadding = 10
        }
        if (chartconfigobj.ShowTotals) {
            markeryoffset = 4;
        }
        // chartconfigobj.chartSeries = [];
        var seriesyaxis = [];
        var maximumvalueseriesvalue = 0;
        var minimumvalueleftyseriesvalue = 0;
        var maximumvalueleftyseriesvalue = 0;
        var maximumvaluerightsideseriesname = "";
        var maximumvalueleftsideseriesname = "";
        var minimumvaluerightyseriesvalue = 0;
        var dashstroke = {
            width: [],
            curve: [],
            dashArray: []
        };
        var markerli = "";
        var notoppositecount = 0;
        if (chartconfigobj.chartYAxises.length > 1)
        {  overlappingy = -100;}
        $.each(chartconfigobj.chartYAxises, function (s, catfield) {
            var maximumvalue = 0;
            var minimumvalue = 0;
            var objectarray = {};
            var innerarray = [];
            var cat = catfield.label;
            objectarray.name = cat;
            objectarray.seriesname = cat;
            //this is used for datalabels
            labelsborderColor = 'none';
            labelscolor = '';
            labelsborderWidth = 0;
            labelspadding = 0;
            labelsbackgroundcolor = '';
            var NegativeNumber = false;
            ///////////////
               if (catfield.seriestype == "borderbar") {
                   objectarray.type = "column";
               // objectarray.color =  //'white';
                   objectarray.borderWidth = 1;
                   objectarray.borderColor = thischartpallet[s];
                   thischartpallet[s] = hexToRgb(thischartpallet[s], 0.3);//'white';
                   pointpadding = 0.04;
                    }  
            if (catfield.showlabel) {
                var DataLabelHTML = GetDataLabelHTML(chartconfigobj, catfield,s);


                if (catfield.seriestype == "dottedline" || catfield.seriestype == "dotteddoubleline" || catfield.seriestype == "dottedsmooth" || catfield.seriestype == "dashline" || catfield.seriestype == "line" || catfield.seriestype == "linesmooth" || catfield.seriestype == "area" || catfield.seriestype == "areacurved") {

                    objectarray.dataLabels = {
                        enabled: true,
                        crop: false,
                        overflow: 'none',
                      //  borderColor: chartconfigobj.chartselectedpallet[s],

                        allowOverlap:false,

                        color: labelscolor,//chartconfigobj.chartselectedpallet[s],
                       
                        opacity: 1,
                      //  className: 'higchartlabels LabelStyle_' + cat + '_' + chartconfigobj.chartId,

                        backgroundColor: labelsbackgroundcolor,
                        borderWidth: labelsborderWidth,
                        borderColor: labelsborderColor,
                        padding: labelspadding,
                        //borderRadius: 5,
                        
                        // y:-8,
                       // align: 'middle',
                        style: {
                            fontSize: '11px',
                            allowOverlap: false,
                            textShadow: false,
                            textOutline: false,
                            opacity: 1,
                            /* textAlign: 'right',*/
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        },
                      //  useHTML: true,
                        formatter: function (value, index) {
                             return ApplyFormatting(parseFloat(this.y), cat)
//                            return (DataLabelHTML.replace("VALUE", ApplyFormatting(parseFloat(this.y), cat)));
                        }
                    }
                }
                else {
                    objectarray.dataLabels = {
                        enabled: true,
                        crop: false,
                        overflow: 'none',
                        color: labelscolor, //chartconfigobj.chartselectedpallet[s],
                        allowOverlap: true,
                        opacity: 1,
                     //   y:-4,
                    //    className: 'higchartlabels', //LabelStyle_' + cat + '_' + chartconfigobj.chartId,

                        /*shape: 'callout',*/
                        backgroundColor: labelsbackgroundcolor,
                       
                        borderColor: labelsborderColor,
                        borderWidth: labelsborderWidth,
                        padding:labelspadding,
                       // borderRadius: 5,
                        align:'center',
                      //  Align: 'middle',
                       // useHTML: true,
                        /*   verticalAlign:'top',*/
                        alignValue:'center',
                        style: {
                            fontSize: '11px',
                            allowOverlap: false,
                            textShadow: false,
                            textOutline: false,
                            opacity: 2,
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            
                        },
                       
                      
                        formatter: function (value, index) {
                            return ApplyFormatting(parseFloat(this.y), cat)
                      //        return ("<span style='text-align:center;color:red'>" + ApplyFormatting(parseFloat(this.y), cat)+ "</span>");
                       //     return (DataLabelHTML.replace("VALUE", ApplyFormatting(parseFloat(this.y), cat)))
                        }
                    }
                }
              
            }
            var seriesyaxisobj = {
                seriesName: cat,
                opposite: catfield.opposite,
               // min: 0,
               // max:1000,
             //   gridLineWidth: 2,
                //startOnTick: false,
                //endOnTick: false,
               // tickAmount: 6,
                title: {
                    text: null
                },
                xAxis: {
                    minPadding: 0.05,
                    maxPadding: 0.05
                },
                plotLines: [{
                    value: 0,
                    color:'black',// '#e6e6e6',
                    width: 1,
                    zIndex: 1
                }],
                //tickPositioner: function () {
                //    var positions = [],
                //        tick = Math.floor(this.min),
                //        increment = Math.ceil((this.max - this.min) / 6);
                //    var zerotickflag = false;
                //    if (this.dataMax !== null && this.dataMin !== null) {
                //        for (tick; tick - increment <= this.max; tick += increment) {
                //            if (tick >= 0) {
                //                positions.push(tick);
                //            }
                //            else if (tick < 0 && zerotickflag == false) {
                //              //  positions.push(tick);
                //                positions.push(0);
                //                positions.push(tick);
                //                zerotickflag = true;
                //            }
                //            else {
                //                positions.push(tick);
                //            }
                           
                //        }
                //    }
                //    return positions;
                //}
            };
            seriesyaxisobj.labels = {

                style: {
                    color: 'black',
                    //fontWeight: 700,
                    //fontSize: '12px',
                    fontFamily: 'Poppins, sans-serif',
                },
                formatter: function (value, index) {
                    return ApplyFormatting(parseFloat(this.value), cat)
                }
            };
            if (!catfield.opposite) {
                notoppositecount = notoppositecount + 1;
            }
            if (catfield.seriestype == "dottedline") {
                objectarray.type = "line";
                objectarray.dashStyle = "ShortDot";
                objectarray.lineWidth = 2;
                objectarray.opacity = 1;
            }

            else if (catfield.seriestype == "dotteddoubleline") {
                objectarray.type = "line";
                objectarray.dashStyle = "ShortDot";
                objectarray.lineWidth = 4;
                objectarray.opacity = 1;

            }


            else if (catfield.seriestype == "dottedsmooth") {
                objectarray.type = "spline";
                objectarray.dashStyle = "ShortDot";

                objectarray.lineWidth = 3;
                objectarray.opacity = 1;
            }

            else if (catfield.seriestype == "areacurved") {
                objectarray.type = "areaspline";
              //  objectarray.opacity = 0.4; //0.5;
            }
            else if (catfield.seriestype == "area") {
                objectarray.type = "area";
            //    objectarray.opacity = 0.4;//0.5;
            }
            else if (catfield.seriestype == "dashline") {
                objectarray.type = "line";
                objectarray.dashStyle = "ShortDash";
                objectarray.opacity = 1;
            }
            else if (catfield.seriestype == "linesmooth") {
                objectarray.type = "spline";
                objectarray.opacity = 1;
            }
            else if (catfield.seriestype == "line") {
                objectarray.type = "line";
            }
         
            else {
                objectarray.type = "column";
                objectarray.borderWidth = 1;
                objectarray.borderColor = chartconfigobj.chartselectedpallet[s];
                objectarray.opacity = 1;
            }
            // this is for mixed chart
            if (chartconfigobj.chartType == "mixed_chart" && catfield.EditSeriesType == false) {
                typecount = typecount + 1;
                if (typecount == 1) {

                    objectarray.type = "column";
                    chartconfigobj.chartYAxises[s].seriestype = "column";
                }
                if (typecount == 2) {
                    /* objectarray.type = "column";*/
                    objectarray.type = "area";
                  //  objectarray.opacity = 0.4;
                    chartconfigobj.chartYAxises[s].seriestype = "area";
                }
                if (typecount == 3) {
                    objectarray.type = "line";
                  //  objectarray.opacity = 1;
                    typecount = 0;
                    chartconfigobj.chartYAxises[s].seriestype = "line";
                }
            }
            //end of mixed chartconfiguration
           
            if (chartconfigobj.chartXAxisLabels.length > 0) {
                $.each(chartconfigobj.chartXAxisLabels, function (xa, xaxis) {
                    var sumvalue = 0;
                    var calculatedField = cFields.find(x => x.name == cat);
                    var CalculateTotal = true;
                    if (calculatedField != undefined) {
                        CalculateTotal = false;
                    }
                    if (catfield.seriesusage) {
                        var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
                        sumvalue = calculateValuesForCustomFields(data_filter, cat)
                        if (sumvalue == 0) {
                            $.each(data_filter, function (i, item) {
                                /*if (isFinite(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {*/
                                if (!CheckNullUndefined(item[cat])  &&isFinite(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN ) {
                                    sumvalue = sumvalue + parseFloat(item[cat]);
                                }
                            });
                        }
                    }
                    else {
                        if (chartconfigobj.chartSeries[s] != undefined) {
                            sumvalue = chartconfigobj.chartSeries[s].data[xa];
                        }
                        else {
                            sumvalue = 0;
                        }
                    }
                    if (catfield.opposite) {
                        if (maximumvaluerightsideseriesname == "") {
                            maximumvaluerightsideseriesname = cat;
                        }
                        if (sumvalue > maximumvalueseriesvalue) {
                            maximumvalueseriesvalue = sumvalue;
                            maximumvaluerightsideseriesname = cat;
                        }
                        if (minimumvaluerightyseriesvalue > sumvalue) {
                           // maximumvaluerightsideseriesname = cat;
                            minimumvaluerightyseriesvalue = sumvalue;
                        }
                    }
                    else {
                        if (maximumvalueleftsideseriesname == "") {
                            maximumvalueleftsideseriesname = cat;
                        }
                        if (sumvalue > maximumvalueleftyseriesvalue) {
                            maximumvalueleftyseriesvalue = sumvalue;
                            maximumvalueleftsideseriesname = cat;
                        }
                        if (minimumvalueleftyseriesvalue > sumvalue) {
                            minimumvalueleftyseriesvalue = sumvalue;
                        }
                    }
                    if (sumvalue > 0) {
                        if (maximumvalue < sumvalue) {
                            maximumvalue = sumvalue;
                        }
                    }
                    
                    if (minimumvalue > sumvalue) {
                        minimumvalue = sumvalue;
                    }
                   
                    innerarray.push(sumvalue);
                    if (sumvalue < 0 && NegativeNumber==false) {
                        NegativeNumber = true;
                    }
                    objectarray.data = innerarray;
                    if (CalculateTotal) {
                        objectarray.total = innerarray.reduce((a, b) => {
                            return a + b;
                        });
                    }
                    else {
                        objectarray.total = calculateValuesForCustomFields(filteredData, cat);
                    }
                });
            }
            else {
                var sumvalue = 0;
                var calculatedField = cFields.find(x => x.name == cat);
                var CalculateTotal = true;
                if (calculatedField != undefined) {
                    CalculateTotal = false;
                }
                if (catfield.seriesusage) {
                    var data_filter = filteredData;
                    sumvalue = calculateValuesForCustomFields(data_filter, cat)
                    if (sumvalue == 0) {
                        $.each(data_filter, function (i, item) {
                            if (!CheckNullUndefined(item[cat]) && isFinite(item[cat]) && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN) {
                                sumvalue = sumvalue + parseFloat(item[cat]);
                            }
                        });
                    }
                }
                else {
                    
                    if (chartconfigobj.chartSeries[s] != undefined) {
                        sumvalue = chartconfigobj.chartSeries[s].data[0];
                    }
                    else {
                        sumvalue = 0;
                    }
                }
                objectarray.total = sumvalue;
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
                if (sumvalue < 0 && NegativeNumber == false) {
                    NegativeNumber = true;
                }

            }

            if (chartconfigobj.chartSeries[s] == undefined) {
                chartconfigobj.chartSeries.push(objectarray);
            }
            else {
                chartconfigobj.chartSeries[s] = objectarray;
            }
            var total = 0;
            var totalclass = 'displaynone';
            if (chartconfigobj.ShowTotals) {
                totalclass = '';
                total = ApplyFormatting(objectarray.total, objectarray.name);
            }
            var backgroundcolourclass = "";
            for (var i = 0; i < PinkFields.length; i++) {
                if (PinkFields[i] == cat) {
                    notmojuudinfields = true;
                    backgroundcolourclass = "misscolbackground";
                    break;
                }
            }
            markerli = markerli + `<li class='legendli displayinline'><div class='displayinline'><a onclick="removeyaxis('${cat}','${chartid}')" style="color: white;height: 20px;width: 20px;background-color: ${chartconfigobj.chartselectedpallet[s]};border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;">x</a></div>
                                       <div class='displayinline legendtextpart ${backgroundcolourclass}'><span font-family="Helvetica, Arial, sans-serif" text-anchor="middle" dominant-baseline="auto" font-size="12px"   style="cursor: default;"  ondblclick="ChartSereisCustomizeOpen('${chartid}', '${objectarray.seriesname}')" ><div font-weight="600" class='legendtotal  ${totalclass}'>${total}</div><span>${objectarray.seriesname}</span></span></div></li>`;
            var maximummargin = maximumvalue;//+ (maximumvalue-(maximumvalue*20 / 100));
            //seriesyaxisobj.max = maximumvalue;
            //seriesyaxisobj.min = minimumvalue;
          /*  var maximummargin = maximumvalue + (maximumvalue / 3);*/
            if (maximummargin > 0) {
               // seriesyaxisobj.tickAmount = 6;
            }
            if (maximummargin > 1) {
                //seriesyaxisobj.tickAmount = 6;
            }
            if (maximummargin > 2) {
               // seriesyaxisobj.tickAmount = 6;
            }
            if (maximummargin > 3) {
               // seriesyaxisobj.tickAmount = 6;
            }
            if (maximummargin > 4) {
               // seriesyaxisobj.tickAmount = 6;
            }
            if (maximummargin > 5) {
               // seriesyaxisobj.tickAmount = 6;
            }
            if (maximummargin > 6) {
               // seriesyaxisobj.tickAmount = 6;
            }
            //  seriesyaxisobj.tickAmount = 8;
            if (catfield.showlabel && NegativeNumber == true) {
                if (objectarray.dataLabels.y == -8) {
                 //   objectarray.dataLabels.y = 24;
                }
                else {
                   // objectarray.dataLabels.y = 4;
                }
            }
            seriesyaxis.push(seriesyaxisobj);
            chartconfigobj.chartYAxises[s].seriesusage = false;
        });
        var showoppositeaxislabelindex = seriesyaxis.findIndex(x => x.seriesName == maximumvaluerightsideseriesname);
        var showyaxislabelindex = seriesyaxis.findIndex(x => x.seriesName == maximumvalueleftsideseriesname);
        var lefttwentypercent = (maximumvalueleftyseriesvalue * 6 / 100);
        var righttwentypercent = (maximumvalueseriesvalue * 6 / 100);
        
        var intervalsize = lefttwentypercent;
        if (lefttwentypercent < righttwentypercent) {
            intervalsize = righttwentypercent;
        }
        if (showoppositeaxislabelindex != -1) {
            if (chartconfigobj.chartSeries.length > 1) {
                for (var n = 0; n < seriesyaxis.length; n++) {
                    if (seriesyaxis[n].opposite) {
                        chartconfigobj.chartSeries[n].yAxis = showoppositeaxislabelindex;
                        //chartconfigobj.chartSeries[n].yAxis.max = maximumvalueleftyseriesvalue;
                        //chartconfigobj.chartSeries[n].yAxis.min = minimumvalueseriesvalue;
                    }
                }
            }
            
            seriesyaxis[showoppositeaxislabelindex].max =maximumvalueseriesvalue + (righttwentypercent );; //+ twentypercent;
            if (maximumvalueseriesvalue < 0.08 && maximumvalueseriesvalue == 0) {
             //   seriesyaxis[showoppositeaxislabelindex].tickAmount = 5;
            }
            //else {
            //    seriesyaxis[showoppositeaxislabelindex].tickInterval = righttwentypercent;
            //}
            if (minimumvaluerightyseriesvalue == 0) {
                seriesyaxis[showoppositeaxislabelindex].min = minimumvaluerightyseriesvalue;
            }
            else {
                var twentypercentminus = (minimumvaluerightyseriesvalue * 20 / 100);
                seriesyaxis[showoppositeaxislabelindex].min = minimumvaluerightyseriesvalue; //+ twentypercentminus;
            }
          

        }
        if (showyaxislabelindex != -1) {
            if (notoppositecount > 0) {
                for (var n = 0; n < seriesyaxis.length; n++) {
                    if (!seriesyaxis[n].opposite) {
                        chartconfigobj.chartSeries[n].yAxis = showyaxislabelindex;// 0;
                    }
                }
            }
            /*debugger;*/
             // maximumvalueleftyseriesvalue;
            seriesyaxis[showyaxislabelindex].max =maximumvalueleftyseriesvalue + (lefttwentypercent);// + twentypercent;//+ twentypercent;//
            if (maximumvalueleftyseriesvalue < 0.08 && minimumvalueleftyseriesvalue == 0) {
               // seriesyaxis[showyaxislabelindex].tickAmount = 5;
            }
            //else {
            //    seriesyaxis[showyaxislabelindex].tickInterval = lefttwentypercent;
            //}
            


            if (minimumvalueleftyseriesvalue == 0) {
                seriesyaxis[showyaxislabelindex].min = minimumvalueleftyseriesvalue;
            }
            else {
                var twentypercentminus = (minimumvalueleftyseriesvalue * 20 / 100);
                seriesyaxis[showyaxislabelindex].min = minimumvalueleftyseriesvalue;// + twentypercentminus;
            }
           
        }
    
        


        if (minimumvalueleftyseriesvalue < -100 || minimumvaluerightyseriesvalue < -100) {
            $.each(seriesyaxis, function (y, yaxis) {
              //  seriesyaxis[y].tickAmount = 9;
            });
            
        }
        if (minimumvalueleftyseriesvalue < -200 || minimumvaluerightyseriesvalue < -200) {
            $.each(seriesyaxis, function (y, yaxis) {
             //   seriesyaxis[y].tickAmount = 12;
            });

        }



        var b = $("#" + chartconfigobj.chartId);
        b.empty();
        var chartxaxislabels = [];
        if (chartxaxislabels.length > 3) {
            columnwidth = "85%";
        }
        if (chartconfigobj.chartXAxisShowLabels.length > 3 && chartconfigobj.chartXAxisShowLabels.length < 6  ) {
            pointpadding = 0.02 ;
        }
        else if (chartconfigobj.chartXAxisShowLabels.length < 3) {
            pointpadding = 0.01;
        }
        else {
            pointpadding = 0.035;
        }
        if (chartconfigobj.chartXAxisShowLabels.length == 0) {
            chartxaxislabels.push(1);
            chartconfigobj.chartXAxisShowLabels = [];
            chartconfigobj.chartXAxisShowLabels.push(1);
        }
        destoryhighchart(chartconfigobj);
        reflowAllHighcharts();
        $("#legenddiv_" + chartconfigobj.chartId).empty();
        var legenddiv = `<ul class="legendsClass text-center" style="list-style: none; padding:0;">${markerli}</ul>`;
        $("#legenddiv_" + chartconfigobj.chartId).append(legenddiv);
        $("#legenddiv_" + chartconfigobj.chartId).css("padding-top", "30");
        var ChartSeriesData = [];
        //var chartheight = 150;
        var xaxismargin = -7;
        if (chartconfigobj.chartSeries.length > 0) {
            ChartSeriesData = chartconfigobj.chartSeries;
            //chartheight = 275;
        }
        else {
            seriesyaxisobj = {
                seriesName: '',
                min: 5,
                tickAmount: 7,
                title: {
                    text: null
                },
                softMin: 5,
                max: 5
            };
            var innerarray = [
            ]
            var objseries = {
                name: '',
                type: 'column',
                data: [],
                softMin: 5,
            };
            var m = 0;
            for (var i = 0; i < chartconfigobj.chartXAxisShowLabels.length; i++) {
                objseries.data.push(m + i);
            }
            innerarray.push(objseries);
            ChartSeriesData.push(innerarray);//.data.push(5);
            seriesyaxis.push(seriesyaxisobj);
        }
        var categoriesshow = [];
        $.each(chartconfigobj.chartXAxisShowLabels, function (i, labeldata) {
            if (labeldata.length > 50) {
                categoriesshow.push(labeldata.substring(0, 50)+"....");
            }
            else {
                categoriesshow.push(labeldata);
            }
        });
        var chart = Highcharts.chart(chartconfigobj.chartId, {
            // var chart = {
            chart: {
                id: chartconfigobj.chartId,
                zoomType: 'x',
                height: mixchartheight,
                styledMode: false,
               
                resetZoomButton: {
                    position: {
                        // align: 'right', // by default
                        // verticalAlign: 'top', // by default
                        x: -40,
                        y: -10
                    },
                    theme: {
                        fill: 'transparent',
                        color: 'blue',
                        stroke: '',
                        //  r: 0,
                        states: {
                            color: 'blue',
                            hover: {
                                fill: 'transparent',//'#41739D',
                                style: {
                                    color: 'blue',

                                }
                            }
                        }
                    },
                    relativeTo: 'chart'
                },
               // alignTicks: false,
                events: {
                   
                    
                    render: function () {

                        var ch = this;
                        var series = this.series;
                    //    debugger;
                        var seriesindex = 0;
                        var pointindex = 0;
                        try {
                            var seriestype = "";
                           
                        ch.series.forEach(function (s) {
                            pointindex = 0;
                             seriestype = s.userOptions.type;
                            s.points.forEach(function (point) {
                                try {
                                        var pointy = point.dataLabel.y;
                                        var pointyvalueassigned = pointy;

                                        if (point.y < 0) {

                                            if (seriestype == "column") {
                                                pointyvalueassigned = pointyvalueassigned + 2;
                                            }
                                            else {
                                                pointyvalueassigned = pointyvalueassigned + 20;
                                            }
                                            point.dataLabel.attr({

                                                y: pointyvalueassigned
                                            });
                                        } else {
                                            if (seriestype == "column") {
                                                pointyvalueassigned = pointyvalueassigned - 4;
                                            }
                                            else {
                                                pointyvalueassigned = pointyvalueassigned - 8;
                                            }
                                            point.dataLabel.attr({
                                                y: pointyvalueassigned
                                            });
                                        }
                                    
                                    var elem = $(point.dataLabel.element).children();
                                  //  $(elem).eq(0).attr("height", point.dataLabel.height-2);
                                    $(elem).eq(0).attr("width", point.dataLabel.width);
                                    var labeltext = point.dataLabel.textStr;// $(elem).eq(1).val();
                                    $(elem).eq(0).attr("x", -0.5);
                                    if (labeltext.length == 3 ) {
                                        $(elem).eq(1).attr("x", 1.8);
                                    }
                                    else if (labeltext.length == 2   || labeltext.length == 1) {
                                        $(elem).eq(1).attr("x", 1.5);
                                    }
                                    else if (labeltext.length == 5) {
                                        $(elem).eq(1).attr("x", 1.7);
                                    }
                                    else if (labeltext.length == 6) {
                                        $(elem).eq(1).attr("x", 1.7);
                                    }
                                    else if (labeltext.length == 7) {
                                        $(elem).eq(1).attr("x", 1.8);
                                    }
                                    else if (labeltext.length == 9) {
                                        $(elem).eq(1).attr("x", 1.8);
                                    }
                                    else {
                                        $(elem).eq(1).attr("x", 1.8);
                                    }
                                    //$(elem).eq(1).attr("width", point.dataLabel.width + 1);
                                   
                                    pointindex++;

                                } catch (e) {
                                }
                                seriesindex++;
                            })
                        })

                            DataLabelsRender = true;
                        } catch (e) {

                        }
                    //    this = ch;

                    }
                }
            
            },
            
            plotOptions: {
                
                series: {
                    animation: false,
                 // pointPadding: 0.04,
                    pointPadding: pointpadding,//0.03,
                    groupPadding: 0.05,
                  //pointWidth: 20,
               //   allowPointSelect: true,
                    column: {
                        /* Here is the setting to limit the maximum column width. */
                        minPointWidth: 40,
            //          alignTicks: false
                        //dataLabels: {
                        //    backgroundColor: 'rgba(252, 255, 197, 0.7)',
                        //    borderWidth: 1,
                        //    borderColor: '#AAA',
                        //   // connectorWidth: 0
                        //},
                    },
                    
                    //states: {
                    //    hover: {
                    //        //enabled: false
                    //        color: '#FF0000',
                    //        borderColor: '#FF0000'
                    //    }
                    //},
                   
                    point: {
                        events: {
                            click: function () {
                                checkdoubleclick(this.series.chart.renderTo.id, this.series.name);
                            },
                            redraw: function (e) {
                                chart.reflow();
                            },
                            mouseOver: function (e) {
                                //this.series.chart.reflow();
                                //this.dataLabel.css({
                                //    fontSize: "30px",
                                //});
                            },
                            mouseOut: function (e) {
                                //this.series.chart.reflow();
                                //debugger;
                                //var ccolor = this.color
                                //try {
                                //    this.dataLabels[0].css({
                                //        color: ccolor,
                                //    });
                                //} catch (e) {
                                //    debugger;
                                //    var m = 0;
                                //}
                               
                            }
                        }
                    }
                },
                area: {
                    fillOpacity: 0.4,
                    series: {
                      //  fillOpacity: 0.1,
                        //states: {
                        //    hover: {
                        //        enabled: false
                        //    }
                        //},
                    }

                },
                areaspline: {
                    fillOpacity: 0.4,
                    series: {
                       // fillOpacity: 0.1,
                        //states: {
                        //    hover: {
                        //        enabled: false
                        //    }
                        //},
                    }
                },
            },
            title: {
                text: "",
            },

            tooltip: {
                shared: true,
                useHTML: true,
                borderWidth: 0,
                //backgroundColor: "transparent",
                opacity: 0,
                followPointer: true,
                hideDelay: 0,
                stickOnContact: true,
                formatter: function () {
                  //  
                    var s = "";
                    var m = "";
                   
                    $.each(this.points, function (i, point) {
                        try {
                            var chartid = point.series.chart.renderTo.id;

                            var chartconfig = chartsconfigurations.find(x => x.chartId == chartid);
                            point.color = chartconfig.chartselectedpallet[i];
                        } catch (e) {

                        }
                        
                        var sampleValue = filteredData[0][point.series.name];
                        var showval;
                        if (isNaN(sampleValue)) {
                            showval = point.y;
                        }
                        else {
                            showval = ApplyFormatting(parseFloat(point.y), point.series.name);
                        }
                        m += `<div class="apexcharts-tooltip-series-group apexcharts-active" style="display: flex;"><span class="apexcharts-tooltip-marker" style="background-color: ${point.color};"></span><div class="apexcharts-tooltip-text" style="font-family: Poppins, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-label">${point.series.name}: </span><span class="apexcharts-tooltip-text-value">${showval}</span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div>`
                    });
                    //  s = `<div class="apexcharts-tooltip apexcharts-theme-light apexcharts-active" style="top: 34.5px;"><div class="apexcharts-tooltip-title" style="font-family: Poppins, sans-serif; font-size: 12px;">${this.x}</div><div class="apexcharts-tooltip-series-group apexcharts-active" style="display: flex;"><span class="apexcharts-tooltip-marker" style="background-color: rgb(165, 0, 68);"></span><div class="apexcharts-tooltip-text" style="font-family: Poppins, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-label">${point.series.name}: </span><span class="apexcharts-tooltip-text-value">22,765</span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div>`;
                    s = `<div class="apexcharts-tooltip apexcharts-theme-light apexcharts-active" style="top: 34.5px;"><div class="apexcharts-tooltip-title" style="font-family: Poppins, sans-serif; font-size: 12px;">${this.x}</div>${m}</div>`;


                    return s;

                },

                positioner: function (boxWidth, boxHeight, point) {
                  
                    return {
                        x: point.plotX,
                        
                    }


                }
            },

            xAxis: {
              //  tickAmount: 5,
                categories: categoriesshow,//chartconfigobj.chartXAxisShowLabels,
                title: {
                    text: null
                },
                //ordinal: false,
                //tickAmount:8,
                min: 0,
               
                labels: {
                    style: {
                        color: 'black',
                        //fontWeight: 800,
                        //fontSize: '12px',
                        fontFamily:'Poppins, sans-serif',
                    },
                   /* rotation: 90*/
                   // autoRotationLimit: 100
                      autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90]
                  //  autoRotation: [-80, -80, -80, -80, -80, -80, -80, -80, -80],
                    
                }
                 
            },

            yAxis: seriesyaxis,
            colors: thischartpallet,
            series: ChartSeriesData, //chartconfigobj.chartSeries,
            exporting: {
                enabled: false,
                allowHTML: true,
            },
            legend: {
                enabled: false,
            }
        });
        //};
        $("#div" + chartid).css('margin-top', -7);
        $(".highcharts-credits").hide();
        //setTimeout(function () {
        //  var image=  chart.exportChart();
        //}, 2000);
        // $('#' + chartconfigobj.chartId).highcharts(chart);
        //$('.deletebuttonstyle').on("resize", function () {
        //    //chart.destroy();
        //    chart.reflow()
        //});
        //  window.resizeTo(width, height);
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
    }


    // redrawfirstchartofeveryrowifneed();

}

Highcharts.Chart.prototype.showResetZoom = function () {
    var resetbutton = "#reset_" + this.renderTo.id;
    $(resetbutton).show();
};

function ResetZoom(randomid, randomchartid) {
    var chartid = "chart_" + randomchartid;
    $.each(Highcharts.charts, function (index, chart) {
        if (chart != undefined) {
            if (chart.renderTo.id == chartid) {
                chart.zoomOut();
                $("#reset_" + chartid).hide();
                //   chart.resetZoomButton.destroy();
            }
        }
       

    });
 
  
}
let abcclicks = false;
var panelSecondClick = 0;
jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
    return this.each(function () {
        var clicks = 0, self = this;
        jQuery(this).click(function (event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        if (event.target.className == "btn btn-warning") {
                            let btnele = event.target.className;
                                     
                            $('html, body').animate({
                                scrollTop: ($(".btn.btn-warning").offset().top)                               
                            }, 1500);
                          
                            setTimeout(function () {
                                currentscroll = $(window).scrollTop();
                            }, 1500);
                        }  
                        single_click_callback.call(self, event);
                        if (event.target.className == "apexcharts-legend-marker") {
                            var Chartid = event.target.lastChild.className;
                            var chartconfigobj = chartsconfigurations.find(x => x.chartId == Chartid);
                            if (Chartid != "" && chartconfigobj.chartType !="pie_chart") {
                                var seriesname = event.target.nextSibling.innerText;
                                removeyaxis(seriesname, Chartid);
                            }
                              //  var chartconfigobj = chartsconfigurations.find(x => x.chartId == Chartid);
                           // if (chartconfigobj.)
                          
                        }
                      //  debugger;
                        var clicked = event.target;
                        if ($(event.target).parents('.tool-menu-to-be-append').length < 1 && (clicked.className != "apexcharts-legend-text" && clicked.className != "apexcharts-legend-marker"))   {

                            $(".close-panel-btn").each(function (index) {

                                if ($(this).parents("nav").is(":visible")) {
                                    $(this).trigger("click");
                                }

                            });

                        }
          
                    } else {
                      //  debugger;
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

                        if (abcclicks && $(event.target).parents(".dynamic-grid").prev().length > 0 && event.target.className != 'comment-btn' && ($(event.target).text() != "Expand" && $(event.target).text() != "Resize") && $(event.target).parents(".notes").length <1) {
                            let ele = $(event.target).parents(".dynamic-grid").prev();
                            $('html, body').animate({
                                scrollTop: (ele.offset().top - 150)
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








const getTicks = {
    minPoint: 0,
    maxPoint: 10,
    maxTicks: 10,
    tickSpacing: 100,
    range: 1,
    niceMin: 1,
    niceMax: 851.58,
    niceScale(min, max) {
        this.minPoint = min;
        this.maxPoint = max;
        this.calculate();
        return {
            tickSpacing: this.tickSpacing,
            niceMinimum: this.niceMin,
            niceMaximum: this.niceMax
        };
    },
    calculate() {
        this.range = this.niceNum(this.maxPoint - this.minPoint, false);
        this.tickSpacing = this.niceNum(this.range / (this.maxTicks - 1), true);
        this.niceMin = Math.floor(this.minPoint / this.tickSpacing) * this.tickSpacing;
        this.niceMax = Math.ceil(this.maxPoint / this.tickSpacing) * this.tickSpacing;
    },
    niceNum(localRange, round) {
        var exponent; /** exponent of localRange */
        var fraction; /** fractional part of localRange */
        var niceFraction; /** nice, rounded fraction */
        exponent = Math.floor(Math.log10(localRange));
        fraction = localRange / Math.pow(10, exponent);
        if (round) {
            if (fraction < 1.5) niceFraction = 1;
            else if (fraction < 3) niceFraction = 2;
            else if (fraction < 7) niceFraction = 5;
            else niceFraction = 10;
        } else {
            if (fraction <= 1) niceFraction = 1;
            else if (fraction <= 2) niceFraction = 2;
            else if (fraction <= 5) niceFraction = 5;
            else niceFraction = 10;
        }
        return niceFraction * Math.pow(10, exponent);
    },
    setMinMaxPoints(localMinPoint, localMaxPoint) {
        this.minPoint = localMinPoint;
        this.maxPoint = localMaxPoint;
        this.calculate();
    },
    setMaxTicks(localMaxTicks) {
        this.maxTicks = localMaxTicks;
        this.calculate();
    }
}





