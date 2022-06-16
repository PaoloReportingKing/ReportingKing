var chartIns = [];
var chartStructure = [];
var sidebarOpened = true;
var dpr = 1;
var bodyColor = 'rgb(80, 100, 156)';
var chartBases = [];
var chartClasses = [];
var totalChartsCount = 0;
var loopChartsCount = 0;

var comments_for_row = [];

async function downloadChartPngs() {
    if (chartIds.length === 0) {
        return;
    }
    chartClasses = [];
    dpr = window.devicePixelRatio;
    window.devicePixelRatio = 3;
    $(".preloader").css('background', '#333333');
    loading_start(0, 0, DownLoadPngMessage, true);
    $('#loading_label').empty();
    $('#loading_label').append(DownLoadPngMessage);
    $('#loading_label').removeClass('d-none');

    //Commented for png in same size as displayed
    //var rows = $("div[id^='charts_data_']");
    //for (var j = 0; j < rows.length; j++) {
    //    var charts = rows[j].children;
    //    if (charts.length === 0) {
    //        continue;
    //    }

    //    for (var i = 0; i < charts.length; i++) {
    //        var ChartId = charts[i].id;
    //        var classList = $(`#${ChartId}`)[0].className;
    //        chartClasses.push(classList);
    //        $(`#${ChartId}`).removeClass();
    //        $(`#${ChartId}`).addClass('col-md-12');
    //    }
    //}
    //Commented for png in same size as displayed


    sidebarOpened = !$("body").hasClass("enlarge-menu");

    bodyColor = $('body').css('color');
    $('body').css('color', 'black');

    if (sidebarOpened) {
        $(".button-menu-mobile").trigger("click");
    }
    else {
        $(".button-menu-mobile").trigger("click");
        $(".button-menu-mobile").trigger("click");
    }
    setTimeout(GetPngData, 1500);
}


var ab_rows_png = [];


var CancelPng = false;
async function GetPngData() {
    CancelPng = false;
    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:700 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");
    var main_html = `<div class="container-fluid kaala pt-0" id="png_charts"></div>`;
    $('body').append(main_html);

    var rows = $("div[id^='charts_data_']");
    var chartCountIndex = 0;
    for (var j = 0; j < rows.length; j++) {
        if (CancelPng) {
            $('#png_charts').remove();
            var cinda = 0;
            if (sidebarOpened) {
                $(".button-menu-mobile").trigger("click");
            }
            $('body').css('color', bodyColor);
            window.devicePixelRatio = dpr;
            $(".preloader").css('background', '#333333d1');
            totalChartsCount = 0;
            loopChartsCount = 0;
            loading_end(false);
            return false;
        }
        var charts = rows[j].children;
        if (charts.length === 0) {
            continue;
        }

        let col_md_whole = 12 / charts.length;

        for (var i = 0; i < charts.length; i++) {

            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);
            if (chartconfigobj.chartType == "number_chart") {
                col_md_whole = 3;
            }
            else {
                col_md_whole = 6 / charts.length;
            }

            chartCountIndex++;
            var percentageCount = parseInt((chartCountIndex / chartsconfigurations.length) * 100);
            if (percentageCount > 10) {
                percentageCount = 10;
            }
            loading_start(percentageCount, percentageCount, DownLoadPngMessage, true, false)
            /* var html = `<div class="col-md-${col_md_whole}" id="png_chart_${chartCountIndex}">`;*/
            var html = `<div class="col-md-6" id="png_chart_${chartCountIndex}">`;
            var legendsHtml = ``;
            var imgsHtml = ``;
            var lblsHtml = ``;

            var col_md = 12;

            if (chartconfigobj.chartType == "comments_chart") {
                SetCommentsForPdf(ChartId);

                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;" class="col-md-${col_md}">${commentsChartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"></div>`;

                RevertBackComments(ChartId);
            }
            else if (chartconfigobj.chartType == "table_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj)}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"></div>`;
            }
            else if (chartconfigobj.chartType == "number_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true);
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${chartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"></div>`;
            }
            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;

                if (chartconfigobj.ShowTotals) {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                    }
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: ${(8 + chartsLabelsFontFactor)}px; font-weight: ${(400 + chartsLabelsFontWeightFactor)};">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                //Make label dabbay bigger
                let dabbay = svgObj.getElementsByClassName('highcharts-data-label-box');
                for (let xcxc = 0; xcxc < dabbay.length; xcxc++) {
                    dabbay[xcxc].width['baseVal'].value = dabbay[xcxc].width['baseVal'].value + 2;
                }
                //Make label dabbay bigger

                //  var svgString = svgObj.outerHTML;
                let myChartEl = document.getElementById(ChartId);
                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
                debugger;
                try {


                    $.each(myChart.options.xAxis, function (s, catfield) {
                        myChart.options.xAxis[s].labels.style.fontWeight = 900;
                        myChart.options.xAxis[s].labels.style.fontSize = '11px';
                    });
                    $.each(myChart.options.yAxis, function (s, catfield) {
                        myChart.options.yAxis[s].labels.style.fontWeight = 900;
                        myChart.options.yAxis[s].labels.style.fontSize = '11px';
                    });

                } catch (e) {

                }

                //try {
                //    myChart.series.forEach(function (s) {
                //        pointindex = 0;
                //        s.points.forEach(function (point) {
                //                var elem = $(point.dataLabel.element).children();
                //                $(elem).eq(0).attr("width", point.dataLabel.width);
                //                var labeltext = point.dataLabel.textStr;// $(elem).eq(1).val();
                //                $(elem).eq(0).attr("x", -0.5);
                //                if (labeltext.length == 3 || labeltext.length == 1) {
                //                    $(elem).eq(1).attr("x", 2.5);
                //                }
                //                else if (labeltext.length == 2 || labeltext.length == 5) {
                //                    $(elem).eq(1).attr("x", 2.2);
                //                }
                //                else if (labeltext.length == 6) {
                //                    $(elem).eq(1).attr("x", 2);
                //                }
                //                else if (labeltext.length == 7) {
                //                    $(elem).eq(1).attr("x", 2.4);
                //                }
                //                else if (labeltext.length == 9) {
                //                    $(elem).eq(1).attr("x", 2.5);
                //                }
                //                else {
                //                    $(elem).eq(1).attr("x", 1.47);
                //                }
                //        })
                //    })
                //} catch (e)
                //{
                //}
                var svgString = myChart.getSVG({
                    exporting: {
                        sourceWidth: myChart.chartWidth,
                        sourceHeight: myChart.chartHeight
                    }
                });
                svgString = svgString.replaceAll(`Highcharts.com`, ``)
                //FOR LABELS SETTING
                if (svgString.indexOf(`font-size:10px;`) > -1) {
                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:11px;`)
                }

                //if (svgString.indexOf(`font-weight:bold;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:bold;`, `font-weight:800;`)
                //}
                //FOR LABELS SETTING

                //REMOVE LINE CHART LABELS
                var yaxis_labels = [];
                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
                }
                yaxis_labels.sort(function (a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                    }
                }
                //REMOVE LINE CHART LABELS

                //var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                ////Extending SVG Image View
                //var svgWidth = parseInt(svgObj.getAttribute("width")) + 40;
                //var svgHeight = parseInt(svgObj.getAttribute("height")) + 80;
                ////svgObj.setAttribute("width", svgWidth + 200);
                ////svgObj.setAttribute("height", svgHeight + 80);

                //svgObj.setAttribute('viewBox', '0 0 ' + svgWidth.toString() + ' ' + svgHeight.toString());

                //var svgString = svgObj.outerHTML;


                ////var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels')[0].outerHTML;
                ////var oldYaxis = svgYaxis;
                ////if (svgYaxis.indexOf(`font-size:11px`) > -1) {
                ////    svgYaxis = svgYaxis.replaceAll(`font-size:11px`, `font-size:11px;font-weight:600`)
                ////}
                ////if (svgString.indexOf(oldYaxis) > -1) {
                ////    svgString = svgString.replaceAll(oldYaxis, svgYaxis);
                ////}
                //var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels');
                //for (var indexxx = 0; indexxx < svgYaxis.length; indexxx++) {
                //    var oldYaxis = svgYaxis[indexxx].outerHTML;
                //    if (svgYaxis[indexxx].outerHTML.indexOf(`font-size:11px`) > -1) {
                //        var fontchange = svgYaxis[indexxx].outerHTML.replaceAll(`font-size:11px`, `font-size:12px;font-weight:600`);
                //        if (svgString.indexOf(oldYaxis) > -1) {
                //            svgString = svgString.replaceAll(oldYaxis, fontchange);
                //        }
                //    }
                //}

                ////if (svgString.indexOf(`font-size="12px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                ////}

                ////if (svgString.indexOf(`font-size="10px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                ////}

                //var yaxis_labels = [];
                //for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                //    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                //}
                //yaxis_labels.sort(function (a, b) {
                //    // ASC  -> a.length - b.length
                //    // DESC -> b.length - a.length
                //    return b.length - a.length;
                //});
                //for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                //    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                //        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                //    }
                //}
                ////for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                ////    var nnn = chartconfigobj.chartYAxises[vfg].label.split(' ');
                ////    if (svgString.indexOf(chartconfigobj.chartYAxises[vfg].label) > -1) {
                ////        svgString = svgString.replaceAll(chartconfigobj.chartYAxises[vfg].label, ``)
                ////    }

                ////    for (var oioi = 0; oioi < nnn.length; oioi++) {
                ////        if (svgString.indexOf(nnn[oioi]) > -1) {
                ////            svgString = svgString.replaceAll(chartconfigobj.chartYAxises[vfg].label, ``)
                ////        }
                ////    }
                ////}

                //if (svgString.indexOf(`font-size:10px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:10px`, `font-size:12px`)
                //}

                //if (svgString.indexOf(`font-size:11px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:11px`, `font-size:13px;font-weight:800`)
                //}

                //if (svgString.indexOf(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`) > -1) {
                //    svgString = svgString.replaceAll(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`, `font-family: Poppins, sans-serif;`)
                //}

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));

                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid mx-auto d-block" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: ${(8 + chartsLabelsFontFactor)}px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;
            }
            else if (chartconfigobj.chartType == "pie_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                var LegendsFontSize = 8;
                if (charts.length == 1) {
                    LegendsFontSize = 8;
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                }
                else {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                }
                legends = chartconfigobj.chartXAxisShowLabels;

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: ${LegendsFontSize}px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                //var svgElement = $('#' + ChartId + ' .apexcharts-svg')[0];
                //$('#' + ChartId + ' foreignObject').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs-hidden').remove();
                //var svgString = svgElement.outerHTML;
                //var chartorigionlawidth = ChartObj.instance.w.globals.dom.Paper.width();
                ////ChartObj.instance.w.globals.dom.Paper.width(597);
                //var chartorigionlHeight = ChartObj.instance.w.globals.dom.Paper.height();
                //if (charts.length == 1) {
                //  //  ChartObj.instance.w.globals.dom.Paper.height(285);
                //   /* ChartObj.instance.w.globals.dom.Paper.width(597);*/
                //}

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="12px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                }

                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                }

                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid mx-auto d-block" src="${imgURI}" alt=""></div>`;
                /*              */

                //if (charts.length == 1) {
                //    ChartObj.instance.w.globals.dom.Paper.height(chartorigionlHeight);
                //    ChartObj.instance.w.globals.dom.Paper.width(chartorigionlawidth);
                //}
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            else {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    if (chartconfigobj.ShowTotals) {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                        }
                    }
                    else {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            legends.push(chartconfigobj.chartYAxises[q].label);
                        }
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
                }
                if (svgString.indexOf(`font-weight="400"`) > -1) {
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
                }
                if (svgString.indexOf(`#373d3f`) > -1) {
                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
                }
                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }
                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                //var svgObj = ChartObj.instance.w.globals.dom.Paper.node;
                //svgObj.setAttribute('transform', 'translate(20, 0)');

                //ChartObj.instance.w.globals.dom.Paper.height(ChartObj.instance.w.globals.dom.Paper.height() + 40);
                //ChartObj.instance.w.globals.dom.Paper.width(ChartObj.instance.w.globals.dom.Paper.width() + 40);

                //var svgString = ChartObj.instance.w.globals.dom.Paper.svg();

                //ChartObj.instance.w.globals.dom.Paper.height(ChartObj.instance.w.globals.dom.Paper.height() - 40);
                //ChartObj.instance.w.globals.dom.Paper.width(ChartObj.instance.w.globals.dom.Paper.width() - 40);
                //svgObj.setAttribute('transform', 'translate(0, 0)');

                //if (svgString.indexOf(`font-size="12px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                //}

                //if (svgString.indexOf(`font-size="10px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                //}

                //if (svgString.indexOf(`font-size="11px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                //    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                //}

                //if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                //    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                //}
                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid mx-auto d-block" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }

            html = html + `<div style="padding-top:20px" class="col-md-12">
<div class="row align-items-center">

${legendsHtml}
</div></div>`;

            html = html + `<div class="col-md-12">
<div class="row align-items-center">
${imgsHtml}
</div></div>`;

            html = html + `<div class="col-md-12">
<div class="row align-items-center">
${lblsHtml}
</div></div>`;

            html = html + `</div>`;

            $('#png_charts').append(html);
        }
    }

    if (CancelPng) {
        $('#png_charts').remove();
        var cinda = 0;
        $(".preloader").css('background', '#333333d1');
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }
        $('body').css('color', bodyColor);
        window.devicePixelRatio = dpr;
        totalChartsCount = 0;
        loopChartsCount = 0;
        loading_end(false);
        return false;
    }
    ab_rows_png = $("div[id^='png_chart_']");
    totalChartsCount = ab_rows_png.length;
    getBase64ById(ab_rows_png[0].id, 0)
    //GetPngImages();   umar wala function
}

async function GetPngImages() {
    var rows = $("div[id^='png_chart_']");
    for (var j = 0; j < rows.length; j++) {
        var ChartId = rows[j].id;
        totalChartsCount++;
        getBase64ById(ChartId);
    }
}

//async function GetPngImages() {
//    var rows = $("div[id^='png_chart_']");
//    for (var j = 0; j < rows.length; j++) {
//        var ChartId = rows[j].id;
//        totalChartsCount++;
//        getBase64ById(ChartId);
//    }
//}
//}

async function downloadCharts() {
    if (chartIds.length === 0) {
        return;
    }
    dpr = window.devicePixelRatio;
    window.devicePixelRatio = 3;
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js"></script>
    //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css" />
    $(".preloader").css('background', '#333333');
    loading_start(0, 0, DownLoadPdfMessage, false, true);
    $('#loading_label').empty();
    $('#loading_label').append('Generating Pdf...');
    $('#loading_label').removeClass('d-none');

    sidebarOpened = !$("body").hasClass("enlarge-menu");

    bodyColor = $('body').css('color');
    $('body').css('color', 'black');

    if (sidebarOpened) {
        $(".button-menu-mobile").trigger("click");
    }
    setTimeout(GetPdfData, 500);
}
async function GetPdfDataswitholabels() {

    //let ptags = $('.note-editor .note-editing-area p');
    //let spans = $('.note-editor .note-editing-area span');
    //let ols = $('.note-editor .note-editing-area ol');
    //for (let b = 0; b < ptags.length; b++) {
    //    let psize = parseFloat($(ptags[b]).css('font-size'));
    //    $(ptags[b]).attr('font-size', psize.toString() + "px");
    //    let pfactor = psize / fontReduction;
    //    let newPSize = psize - pfactor;
    //    $(ptags[b]).css({ 'font-size': newPSize.toString() + "px" });
    //}
    //for (let b = 0; b < spans.length; b++) {
    //    let psize = parseFloat($(spans[b]).css('font-size'));
    //    $(spans[b]).attr('font-size', psize.toString() + "px");
    //    let pfactor = psize / fontReduction;
    //    let newPSize = psize - pfactor;
    //    $(spans[b]).css({ 'font-size': newPSize.toString() + "px" });
    //}
    //for (let b = 0; b < ols.length; b++) {
    //    let olsize = parseFloat($(ols[b]).css('font-size'));
    //    $(ols[b]).attr('font-size', olsize.toString() + "px");
    //    let olfactor = olsize / fontReduction;
    //    let newOlSize = olsize - olfactor;
    //    $(ols[b]).css({ 'font-size': newOlSize.toString() + "px" });
    //}

    //let psize = parseFloat($('.note-editor .note-editing-area p').css('font-size'));
    //let pfactor = psize / fontReduction;
    //let newPSize = psize - pfactor;
    //$('.note-editor .note-editing-area p').css({ 'font-size': newPSize.toString() + "px" });
    //$('.note-editor .note-editing-area span').css({ 'font-size': newPSize.toString() + "px" });

    //let olsize = parseFloat($('.note-editor .note-editing-area ol').css('font-size'));
    //let olfactor = olsize / fontReduction;
    //let newOlSize = olsize - olfactor;
    //$('.note-editor .note-editing-area ol').css({ 'font-size': newOlSize.toString() + "px" });

    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:800 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");

    //$('.apexcharts-text').removeAttr("style");
    //$('.apexcharts-text').attr("font-size", "12px !important");
    //$('.apexcharts-text').attr("font-weight", "700 !important");

    var html = `<html lang="en" data-textdirection="ltr">
                <body>
                    <div id="pdfdiv" class="container-fluid">`;

    var rows = $("div[id^='charts_data_']");
    var totalchartsynclength = 0;
    for (var j = 0; j < rows.length; j++) {
        debugger;
        var charts = rows[j].children;
        var randomrowid = rows[j].id.split('_')[2];
        adjustRowChartsWidth(randomrowid);
        if (charts.length === 0) {
            continue;
        }
        var legendsHtml = ``;
        var imgsHtml = ``;
        var lblsHtml = ``;
        var commentsHtml = ``;
        html = html + `<div class="row kaala pt-0" style="margin-top:5px">`;
        /*   html = html + `<div class="row kaala pt-0" style="page-break-inside: avoid;margin-top:5px">`;*/
        for (var i = 0; i < charts.length; i++) {
            totalchartsynclength++;
            var percentageCount = parseInt((totalchartsynclength / chartsconfigurations.length) * 100);
            if (percentageCount > 85) {
                percentageCount = 85;
            }
            loading_start(percentageCount, percentageCount, DownLoadPdfMessage, false, true)
            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);

            SetCommentsForPdf("comments_" + ChartId.replace('chart_', ''));

            var comments = $("#comments_text_" + ChartId.replace('chart_', '')).summernote('code');//for formatted html
            var col_md = RowOtherChartCol;//12 / charts.length;

            RevertBackComments("comments_" + ChartId.replace('chart_', ''));

            if (chartconfigobj.chartType == "comments_chart") {
                SetCommentsForPdf(ChartId);

                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
                legendsHtml = legendsHtml + `<div class="col-md-${RowNumberChartCol}"></div>`;
                var rowpadding = 20;
                if (RowNumberChartCol == 4) {
                    rowpadding = 25;
                }
                if (RowNumberChartCol == 12) {
                    rowpadding = 46;
                }
                if (RowNumberChartCol == 6) {
                    rowpadding = 36;
                }

                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;padding-top:8px;padding-left:${rowpadding}px;padding-right:${rowpadding}px;padding-bottom:${rowpadding}px;" class="col-md-${RowNumberChartCol}"><div>${commentsChartHtml}</div></div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;

                RevertBackComments(ChartId);
            }
            else if (chartconfigobj.chartType == "table_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj)}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "number_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${RowNumberChartCol}"></div>`;
                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true);
                imgsHtml = imgsHtml + `<div class="col-md-${RowNumberChartCol}">${chartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;

                if (chartconfigobj.ShowTotals) {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                    }
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                //Make label dabbay bigger
                //let dabbay = svgObj.getElementsByClassName('highcharts-data-label-box');
                //for (let xcxc = 0; xcxc < dabbay.length; xcxc++) {
                //    dabbay[xcxc].width['baseVal'].value = dabbay[xcxc].width['baseVal'].value + 2;
                //}
                //Make label dabbay bigger

                //   var svgString = svgObj.outerHTML;
                let myChartEl = document.getElementById(ChartId);
                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
                debugger;
                try {



                    $.each(myChart.options.xAxis, function (s, catfield) {
                        myChart.options.xAxis[s].labels.style.fontWeight = 900;
                        myChart.options.xAxis[s].labels.style.fontSize = '11px';
                    });
                    $.each(myChart.options.yAxis, function (s, catfield) {
                        myChart.options.yAxis[s].labels.style.fontWeight = 900;
                        myChart.options.yAxis[s].labels.style.fontSize = '11px';
                    });
                } catch (e) {

                }
                //try {
                //    myChart.series.forEach(function (s) {
                //        pointindex = 0;
                //        s.points.forEach(function (point) {
                //            var elem = $(point.dataLabel.element).children();
                //            $(elem).eq(0).attr("width", point.dataLabel.width);
                //            var labeltext = point.dataLabel.textStr;// $(elem).eq(1).val();
                //            $(elem).eq(0).attr("x", -0.5);
                //            if (labeltext.length == 3 || labeltext.length == 1) {
                //                $(elem).eq(1).attr("x", 2.5);
                //            }
                //            else if (labeltext.length == 2 || labeltext.length == 5) {
                //                $(elem).eq(1).attr("x", 2.2);
                //            }
                //            else if (labeltext.length == 6) {
                //                $(elem).eq(1).attr("x", 2);
                //            }
                //            else if (labeltext.length == 7) {
                //                $(elem).eq(1).attr("x", 2.4);
                //            }
                //            else if (labeltext.length == 9) {
                //                $(elem).eq(1).attr("x", 2.5);
                //            }
                //            else {
                //                $(elem).eq(1).attr("x", 1.47);
                //            }
                //        })
                //    })
                //} catch (e) {
                //}













                var svgString = myChart.getSVG({
                    exporting: {
                        sourceWidth: myChart.chartWidth,
                        sourceHeight: myChart.chartHeight
                    }
                });
                svgString = svgString.replaceAll(`Highcharts.com`, ``)
                //FOR LABELS SETTING
                if (svgString.indexOf(`font-size:10px;`) > -1) {
                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:11px;`)
                }
                //if (svgString.indexOf(`font-size:10px;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:700;`)
                //}
                //if (svgString.indexOf(`font-weight:bold;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:bold;`, `font-weight:800;`)
                //}
                //FOR LABELS SETTING

                //REMOVE LINE CHART LABELS
                var yaxis_labels = [];
                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
                }
                yaxis_labels.sort(function (a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                    }
                }
                //REMOVE LINE CHART LABELS

                //var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                ////Extending SVG Image View
                //var svgWidth = parseInt(svgObj.getAttribute("width")) + 40;
                //var svgHeight = parseInt(svgObj.getAttribute("height")) + 80;
                ////svgObj.setAttribute("width", svgWidth + 200);
                ////svgObj.setAttribute("height", svgHeight + 80);

                //svgObj.setAttribute('viewBox', '0 0 ' + svgWidth.toString() + ' ' + svgHeight.toString());

                //var svgString = svgObj.outerHTML;


                ////var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels')[0].outerHTML;
                ////var oldYaxis = svgYaxis;
                ////if (svgYaxis.indexOf(`font-size:11px`) > -1) {
                ////    svgYaxis = svgYaxis.replaceAll(`font-size:11px`, `font-size:11px;font-weight:600`)
                ////}
                //var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels');
                //for (var indexxx = 0; indexxx < svgYaxis.length; indexxx++) {
                //    var oldYaxis = svgYaxis[indexxx].outerHTML;
                //    if (svgYaxis[indexxx].outerHTML.indexOf(`font-size:11px`) > -1) {
                //        var fontchange = svgYaxis[indexxx].outerHTML.replaceAll(`font-size:11px`, `font-size:12px;font-weight:600`);
                //        if (svgString.indexOf(oldYaxis) > -1) {
                //            svgString = svgString.replaceAll(oldYaxis, fontchange);
                //        }
                //    }
                //}

                ////if (svgString.indexOf(`font-size="12px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                ////}

                ////if (svgString.indexOf(`font-size="10px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                ////}

                //var yaxis_labels = [];
                //for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                //    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                //}
                //yaxis_labels.sort(function (a, b) {
                //    // ASC  -> a.length - b.length
                //    // DESC -> b.length - a.length
                //    return b.length - a.length;
                //});
                //for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                //    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                //        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                //    }
                //}
                ////for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {

                ////    if (svgString.indexOf(chartconfigobj.chartYAxises[vfg].label) > -1) {
                ////        svgString = svgString.replaceAll(chartconfigobj.chartYAxises[vfg].label, ``)
                ////    }
                ////}

                //if (svgString.indexOf(`font-size:10px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:10px`, `font-size:12px`)
                //}

                //if (svgString.indexOf(`font-size:11px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:11px`, `font-size:13px;font-weight:800`)
                //}

                //if (svgString.indexOf(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`) > -1) {
                //    svgString = svgString.replaceAll(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`, `font-family: Poppins, sans-serif;`)
                //}

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));

                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid"  src="${imgURI}" alt=""></div>`;
                // imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid" style='width:100%' src="${imgURI}" alt=""></div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                /*lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;*/
            }
            else if (chartconfigobj.chartType == "pie_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                legends = chartconfigobj.chartXAxisShowLabels;


                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                //var svgElement = $('#' + ChartId + ' .apexcharts-svg')[0];
                //$('#' + ChartId + ' foreignObject').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs-hidden').remove();
                //var svgString = svgElement.outerHTML;

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="12px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                }

                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                }

                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="text-center col-md-${col_md}"><img style="width:80%;" class="img-fluid" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            else {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    if (chartconfigobj.ShowTotals) {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                        }
                    }
                    else {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            legends.push(chartconfigobj.chartYAxises[q].label);
                        }
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });


                //var svgObj = ChartObj.instance.w.globals.dom.Paper.node;
                //svgObj.setAttribute('transform', 'translate(10, 0)');

                //ChartObj.instance.w.globals.dom.Paper.height(ChartObj.instance.w.globals.dom.Paper.height() + 40);
                //ChartObj.instance.w.globals.dom.Paper.width(ChartObj.instance.w.globals.dom.Paper.width() + 40);

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
                }
                if (svgString.indexOf(`font-weight="400"`) > -1) {
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
                }
                if (svgString.indexOf(`#373d3f`) > -1) {
                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
                }
                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }
                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:800;`)

                //ChartObj.instance.w.globals.dom.Paper.height(ChartObj.instance.w.globals.dom.Paper.height() - 40);
                //ChartObj.instance.w.globals.dom.Paper.width(ChartObj.instance.w.globals.dom.Paper.width() - 40);
                //svgObj.setAttribute('transform', 'translate(0, 0)');


                //if (svgString.indexOf(`font-size="12px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                //}

                //if (svgString.indexOf(`font-size="10px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                //}

                //if (svgString.indexOf(`font-size="11px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                //    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                //}

                //if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                //    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                //}
                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }


            if (comments.length > 0 && comments != '<p><br></p>') {
                /*  commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p><strong>Comments: </strong>${comments}</p></div>`;*/
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments}</div></div>`;
            }
            else {
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p></p></div>`;
            }
        }
        html = html + `<div class="col-md-12">
        <div class="row align-items-center">

        ${legendsHtml}
        </div></div>`;

        html = html + `
<div class="col-md-12">
<div class="row">
${imgsHtml}
</div></div>`;

        html = html + `<div class="col-md-12">
        <div class="row align-items-center">
        ${lblsHtml}
        </div></div>`;

        var row_id = rows[j].id.replace('charts_data_', '');
        if (comments_for_row.indexOf(row_id) > -1) {
            SetCommentsForPdf("comments_" + row_id);

            var comments_row = $("#comments_text_" + row_id).summernote('code');//for formatted html

            if (comments_row.length > 0 && comments_row != '<p><br></p>') {
                commentsHtml = `<div class="col-md-12"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments_row}</div></div>`;
            }
            else {
                commentsHtml = `<div class="col-md-12"><p></p></div>`;
            }

            RevertBackComments("comments_" + row_id);
        }

        html = html + `<div class="col-md-12">
<div class="row">
${commentsHtml}
</div></div>`;

        html = html + `</div>`;

        html = html + `<hr>`;
    }
    html = html + `</div></body></html>`;


    //for (let b = 0; b < ptags.length; b++) {

    //    $(ptags[b]).css({ 'font-size': $(ptags[b]).attr('font-size') });
    //}
    //for (let b = 0; b < spans.length; b++) {
    //    $(spans[b]).css({ 'font-size': $(spans[b]).attr('font-size') });
    //}
    //for (let b = 0; b < ols.length; b++) {
    //    $(ols[b]).css({ 'font-size': $(ols[b]).attr('font-size') });
    //}

    //psize = parseFloat($('.note-editor .note-editing-area p').css('font-size'));
    //newPSize = psize + pfactor;
    //$('.note-editor .note-editing-area p').css({ 'font-size': newPSize.toString() + "px" });
    //$('.note-editor .note-editing-area span').css({ 'font-size': newPSize.toString() + "px" });

    //olsize = parseFloat($('.note-editor .note-editing-area ol').css('font-size'));
    //newOlSize = olsize + olfactor;
    //$('.note-editor .note-editing-area ol').css({ 'font-size': newOlSize.toString() + "px" });
    //  $('body').append(html);

    GeneratePdf(html);
}
//async function GetPdfData() {



//    $('.highcharts-root').removeAttr("style");
//    $('.highcharts-root').attr("style", "font-weight:800 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");



//    var html = `<html lang="en" data-textdirection="ltr">
//                <body>
//                    <div class="container-fluid" id="pdfcharts">`;
//    //var html = `<html lang="en" data-textdirection="ltr">
//    //            <body>
//    //                <div class="page-wrapper" id="pdfcharts"><div class="left-sidenav"></div><div class="page-content">`;

//    var rows = $("div[id^='charts_data_']");
//    var totalchartsynclength = 0;
//    for (var j = 0; j < rows.length; j++) {
//       // debugger;
//        var charts = rows[j].children;
//        var randomrowid = rows[j].id.split('_')[2];
//        adjustRowChartsWidth(randomrowid);
//        if (charts.length === 0) {
//            continue;
//        }

//        var imgsHtml = ``;

//        var commentsHtml = ``;
//        html = html + `<div class="row kaala pt-0" style="margin-top:5px">`;
//       /* html = html + `<div class="row kaala pt-0" style="page-break-inside: avoid;margin-top:5px">`;*/
//        for (var i = 0; i < charts.length; i++) {
//            var legendsHtml = ``;
//            var lblsHtml = ``;
//            totalchartsynclength++;
//            var percentageCount = parseInt((totalchartsynclength / chartsconfigurations.length) * 100);
//            if (percentageCount > 85) {
//                percentageCount = 85;
//            }
//            loading_start(percentageCount, percentageCount, DownLoadPdfMessage, false,true)
//            var ChartId = charts[i].id.replace('_div', '');
//            var ChartObj = chartIns.find(x => x.id === ChartId);
//            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);

//            SetCommentsForPdf("comments_" + ChartId.replace('chart_', ''));

//            var comments = $("#comments_text_" + ChartId.replace('chart_', '')).summernote('code');//for formatted html
//            var col_md = RowOtherChartCol;//12 / charts.length;

//            RevertBackComments("comments_" + ChartId.replace('chart_', ''));

//            if (chartconfigobj.chartType == "comments_chart") {
//                SetCommentsForPdf(ChartId);

//                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
//                legendsHtml = legendsHtml + `<div class="col-md-${RowNumberChartCol}"></div>`;
//                var rowpadding = 20;
//                if (RowNumberChartCol == 4) {
//                    rowpadding = 25;
//                }
//                if (RowNumberChartCol == 12) {
//                    rowpadding = 46;
//                }
//                if (RowNumberChartCol == 6) {
//                    rowpadding = 36;
//                }

//                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;margin-top:55px;padding-left:${rowpadding}px;padding-right:${rowpadding}px;padding-bottom:${rowpadding}px;" class="col-md-${RowNumberChartCol}"><div>${commentsChartHtml}</div></div>`;
//                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;

//                RevertBackComments(ChartId);
//            }
//            else if (chartconfigobj.chartType == "table_chart") {
//                legendsHtml = legendsHtml + `<div></div>`;
//                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj)}</div>`;
//                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;
//            }
//            else if (chartconfigobj.chartType == "number_chart") {
//                legendsHtml = legendsHtml + `<div style="margin-top:15px"></div>`;
//                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true);
//                imgsHtml = imgsHtml + `<div class="col-md-${RowNumberChartCol}">${chartHtml}</div>`;
//                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;
//            }
//            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
//                var legendTitle = ``;
//                var legends = [];
//                var rungs = chartconfigobj.chartselectedpallet;

//                if (chartconfigobj.ShowTotals) {
//                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
//                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
//                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
//                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
//                    }
//                }
//                else {
//                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
//                        legends.push(chartconfigobj.chartYAxises[q].label);
//                    }
//                }
//                for (var w = 0; w < legends.length; w++) {
//                    if (w == 0) {
//                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
//                    }
//                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
//                    if (w == legends.length - 1) {
//                        legendsHtml = legendsHtml + `</ul></div>`;
//                    }
//                }

//                var svgObj = $('#' + ChartId).children('div').children('svg')[0];

//                //Make label dabbay bigger
//                //let dabbay = svgObj.getElementsByClassName('highcharts-data-label-box');
//                //for (let xcxc = 0; xcxc < dabbay.length; xcxc++) {
//                //    dabbay[xcxc].width['baseVal'].value = dabbay[xcxc].width['baseVal'].value + 2;
//                //}
//                //Make label dabbay bigger

//               //   var svgString = svgObj.outerHTML;
//                let myChartEl = document.getElementById(ChartId);
//                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
//             //   debugger;
//                try {



//                $.each(myChart.options.xAxis, function (s, catfield) {
//                    myChart.options.xAxis[s].labels.style.fontWeight = 900;
//                    myChart.options.xAxis[s].labels.style.fontSize = '11px';
//                });
//                $.each(myChart.options.yAxis, function (s, catfield) {
//                    myChart.options.yAxis[s].labels.style.fontWeight = 900;
//                    myChart.options.yAxis[s].labels.style.fontSize = '11px';
//                });
//                } catch (e) {

//                }
//                //try {
//                //    myChart.series.forEach(function (s) {
//                //        pointindex = 0;
//                //        s.points.forEach(function (point) {
//                //            var elem = $(point.dataLabel.element).children();
//                //            $(elem).eq(0).attr("width", point.dataLabel.width);
//                //            var labeltext = point.dataLabel.textStr;// $(elem).eq(1).val();
//                //            $(elem).eq(0).attr("x", -0.5);
//                //            if (labeltext.length == 3 || labeltext.length == 1) {
//                //                $(elem).eq(1).attr("x", 2.5);
//                //            }
//                //            else if (labeltext.length == 2 || labeltext.length == 5) {
//                //                $(elem).eq(1).attr("x", 2.2);
//                //            }
//                //            else if (labeltext.length == 6) {
//                //                $(elem).eq(1).attr("x", 2);
//                //            }
//                //            else if (labeltext.length == 7) {
//                //                $(elem).eq(1).attr("x", 2.4);
//                //            }
//                //            else if (labeltext.length == 9) {
//                //                $(elem).eq(1).attr("x", 2.5);
//                //            }
//                //            else {
//                //                $(elem).eq(1).attr("x", 1.47);
//                //            }
//                //        })
//                //    })
//                //} catch (e) {
//                //}













//                var svgString = myChart.getSVG({
//                    exporting: {
//                        sourceWidth: myChart.chartWidth,
//                        sourceHeight: myChart.chartHeight
//                    }
//                });
//              //  debugger;
//                svgString = svgString.replaceAll(`Highcharts.com`, ``)
//                svgString = svgString.replaceAll(`height="210"`, `height="260"`)
//                //FOR LABELS SETTING
//                if (svgString.indexOf(`font-size:10px;`) > -1) {
//                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:11px;`)
//                }
//                //if (svgString.indexOf(`font-size:10px;`) > -1) {
//                //    svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:700;`)
//                //}
//                //if (svgString.indexOf(`font-weight:bold;`) > -1) {
//                //    svgString = svgString.replaceAll(`font-weight:bold;`, `font-weight:800;`)
//                //}
//                //FOR LABELS SETTING

//                //REMOVE LINE CHART LABELS
//                var yaxis_labels = [];
//                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
//                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
//                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
//                }
//                yaxis_labels.sort(function (a, b) {
//                    // ASC  -> a.length - b.length
//                    // DESC -> b.length - a.length
//                    return b.length - a.length;
//                });
//                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
//                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
//                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
//                    }
//                }
//                //REMOVE LINE CHART LABELS

//                //var svgObj = $('#' + ChartId).children('div').children('svg')[0];

//                ////Extending SVG Image View
//                //var svgWidth = parseInt(svgObj.getAttribute("width")) + 40;
//                //var svgHeight = parseInt(svgObj.getAttribute("height")) + 80;
//                ////svgObj.setAttribute("width", svgWidth + 200);
//                ////svgObj.setAttribute("height", svgHeight + 80);

//                //svgObj.setAttribute('viewBox', '0 0 ' + svgWidth.toString() + ' ' + svgHeight.toString());

//                //var svgString = svgObj.outerHTML;


//                ////var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels')[0].outerHTML;
//                ////var oldYaxis = svgYaxis;
//                ////if (svgYaxis.indexOf(`font-size:11px`) > -1) {
//                ////    svgYaxis = svgYaxis.replaceAll(`font-size:11px`, `font-size:11px;font-weight:600`)
//                ////}
//                //var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels');
//                //for (var indexxx = 0; indexxx < svgYaxis.length; indexxx++) {
//                //    var oldYaxis = svgYaxis[indexxx].outerHTML;
//                //    if (svgYaxis[indexxx].outerHTML.indexOf(`font-size:11px`) > -1) {
//                //        var fontchange = svgYaxis[indexxx].outerHTML.replaceAll(`font-size:11px`, `font-size:12px;font-weight:600`);
//                //        if (svgString.indexOf(oldYaxis) > -1) {
//                //            svgString = svgString.replaceAll(oldYaxis, fontchange);
//                //        }
//                //    }
//                //}

//                ////if (svgString.indexOf(`font-size="12px"`) > -1) {
//                ////    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
//                ////}

//                ////if (svgString.indexOf(`font-size="10px"`) > -1) {
//                ////    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
//                ////}

//                //var yaxis_labels = [];
//                //for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
//                //    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
//                //}
//                //yaxis_labels.sort(function (a, b) {
//                //    // ASC  -> a.length - b.length
//                //    // DESC -> b.length - a.length
//                //    return b.length - a.length;
//                //});
//                //for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
//                //    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
//                //        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
//                //    }
//                //}
//                ////for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {

//                ////    if (svgString.indexOf(chartconfigobj.chartYAxises[vfg].label) > -1) {
//                ////        svgString = svgString.replaceAll(chartconfigobj.chartYAxises[vfg].label, ``)
//                ////    }
//                ////}

//                //if (svgString.indexOf(`font-size:10px`) > -1) {
//                //    svgString = svgString.replaceAll(`font-size:10px`, `font-size:12px`)
//                //}

//                //if (svgString.indexOf(`font-size:11px`) > -1) {
//                //    svgString = svgString.replaceAll(`font-size:11px`, `font-size:13px;font-weight:800`)
//                //}

//                //if (svgString.indexOf(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`) > -1) {
//                //    svgString = svgString.replaceAll(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`, `font-family: Poppins, sans-serif;`)
//                //}

//                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
//                lblsHtml= lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
//                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid"  src="${imgURI}" alt="">${lblsHtml}</div>`;
//                // imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid" style='width:100%' src="${imgURI}" alt=""></div>`;

//                /*lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;*/
//            }
//            else if (chartconfigobj.chartType == "pie_chart") {
//                var legendTitle = ``;
//                var legends = [];
//                var rungs = chartconfigobj.chartselectedpallet;
//                legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
//                legends = chartconfigobj.chartXAxisShowLabels;


//                for (var w = 0; w < legends.length; w++) {
//                    if (w == 0) {
//                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
//                    }
//                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
//                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
//                    if (w == legends.length - 1) {
//                        legendsHtml = legendsHtml + `</ul></div>`;
//                    }
//                }

//                ChartObj.instance.updateOptions({
//                    legend: {
//                        show: false
//                    }
//                });

//                //var svgElement = $('#' + ChartId + ' .apexcharts-svg')[0];
//                //$('#' + ChartId + ' foreignObject').remove();
//                //$('#' + ChartId + ' .apexcharts-ycrosshairs').remove();
//                //$('#' + ChartId + ' .apexcharts-ycrosshairs-hidden').remove();
//                //var svgString = svgElement.outerHTML;

//                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
//                if (svgString.indexOf(`font-size="12px"`) > -1) {
//                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
//                }

//                if (svgString.indexOf(`font-size="10px"`) > -1) {
//                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
//                }

//                if (svgString.indexOf(`font-size="11px"`) > -1) {
//                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
//                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
//                }

//                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
//                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
//                }

//                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
//                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
//                imgsHtml = imgsHtml + `<div class="text-center col-md-${col_md}">${legendsHtml}<img style="width:80%;" class="img-fluid" src="${imgURI}" alt="">${lblsHtml}</div>`;


//                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

//                ChartObj.instance.updateOptions({
//                    legend: {
//                        show: true
//                    }
//                });
//            }
//            else {
//                var legendTitle = ``;
//                var legends = [];
//                var rungs = chartconfigobj.chartselectedpallet;
//                if (chartconfigobj.chartType == "pie_chart") {
//                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
//                    legends = chartconfigobj.chartXAxisShowLabels;
//                }
//                else {
//                    if (chartconfigobj.ShowTotals) {
//                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
//                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
//                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
//                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
//                        }
//                    }
//                    else {
//                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
//                            legends.push(chartconfigobj.chartYAxises[q].label);
//                        }
//                    }
//                }

//                for (var w = 0; w < legends.length; w++) {
//                    if (w == 0) {
//                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
//                    }
//                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
//                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
//                    if (w == legends.length - 1) {
//                        legendsHtml = legendsHtml + `</ul></div>`;
//                    }
//                }
//                ChartObj.instance.updateOptions({
//                    legend: {
//                        show: false
//                    }
//                });


//                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
//                if (svgString.indexOf(`height="300"`) > -1) {
//                    svgString = svgString.replaceAll(`height="300"`, `height="260"`)
//                }
//                if (svgString.indexOf(`font-size="11px"`) > -1) {
//                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
//                }
//                if (svgString.indexOf(`font-weight="400"`) > -1) {
//                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
//                }
//                if (svgString.indexOf(`#373d3f`) > -1) {
//                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
//                }
//                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
//                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
//                }
//                if (svgString.indexOf(`font-size="10px"`) > -1) {
//                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
//                }

//                svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:800;`)

//                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
//                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
//                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid"  src="${imgURI}" alt="">${lblsHtml}</div>`;


//                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

//                ChartObj.instance.updateOptions({
//                    legend: {
//                        show: true
//                    }
//                });
//            }


//            if (comments.length > 0 && comments != '<p><br></p>') {
//                /*  commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p><strong>Comments: </strong>${comments}</p></div>`;*/
//                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments}</div></div>`;
//            }
//            else {
//                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p></p></div>`;
//            }
//        }
////        html = html + `<div class="col-md-12">
////<div class="row align-items-center">

////${legendsHtml}
////</div></div>`;

//        html = html + `
//<div class="col-md-12"><div class="row">

//${imgsHtml}

//</div></div>
//`;

////        html = html + `<div class="col-md-12">
////<div class="row align-items-center">
////${lblsHtml}
////</div></div>`;

//        var row_id = rows[j].id.replace('charts_data_', '');
//        if (comments_for_row.indexOf(row_id) > -1) {
//            SetCommentsForPdf("comments_" + row_id);

//            var comments_row = $("#comments_text_" + row_id).summernote('code');//for formatted html

//            if (comments_row.length > 0 && comments_row != '<p><br></p>') {
//                commentsHtml = `<div class="col-md-12"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments_row}</div></div>`;
//            }
//            else {
//                commentsHtml = `<div class="col-md-12"><p></p></div>`;
//            }

//            RevertBackComments("comments_" + row_id);
//        }

//        html = html + `<div class="col-md-12">
//<div class="row" style="margin-top:20px">
//${commentsHtml}
//</div></div>`;

//        html = html + `</div>`;

//        html = html + `<hr>`;
//    }
//   /* html = html + `</div></div></body></html>`;*/
//    html = html + `</div></body></html>`;



// //   Downloadhtmlfile();
//    GeneratePdf(html);
//    //$('body').append(html);
//    //getBase64ByIdfordownloadpdfcharts("pdfcharts");
//   // getBase64ByIdfordownloadpdfcharts("pdfcharts");//("main_div");//("pdfcharts");
//}

async function GetPdfData() {



    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:800 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");



    var html = `<html lang="en" data-textdirection="ltr">
                <body>
                    <div class="container-fluid">`;

    var rows = $("div[id^='charts_data_']");
    var totalchartsynclength = 0;
    for (var j = 0; j < rows.length; j++) {
        debugger;
        var charts = rows[j].children;
        var randomrowid = rows[j].id.split('_')[2];
        adjustRowChartsWidth(randomrowid);
        if (charts.length === 0) {
            continue;
        }

        var imgsHtml = ``;

        var commentsHtml = ``;
        html = html + `<div class="row kaala pt-0" style="margin-top:5px">`;
        /* html = html + `<div class="row kaala pt-0" style="page-break-inside: avoid;margin-top:5px">`;*/
        for (var i = 0; i < charts.length; i++) {
            var legendsHtml = ``;
            var lblsHtml = ``;
            totalchartsynclength++;
            var percentageCount = parseInt((totalchartsynclength / chartsconfigurations.length) * 100);
            if (percentageCount > 85) {
                percentageCount = 85;
            }
            loading_start(percentageCount, percentageCount, DownLoadPdfMessage, false, true)
            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);

            SetCommentsForPdf("comments_" + ChartId.replace('chart_', ''));

            var comments = $("#comments_text_" + ChartId.replace('chart_', '')).summernote('code');//for formatted html
            var col_md = RowOtherChartCol;//12 / charts.length;

            RevertBackComments("comments_" + ChartId.replace('chart_', ''));

            if (chartconfigobj.chartType == "comments_chart") {
                SetCommentsForPdf(ChartId);

                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
                legendsHtml = legendsHtml + `<div class="col-md-${RowNumberChartCol}"></div>`;
                var rowpadding = 20;
                if (RowNumberChartCol == 4) {
                    rowpadding = 25;
                }
                if (RowNumberChartCol == 12) {
                    rowpadding = 46;
                }
                if (RowNumberChartCol == 6) {
                    rowpadding = 36;
                }

                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;margin-top:55px;padding-left:${rowpadding}px;padding-right:${rowpadding}px;padding-bottom:${rowpadding}px;" class="col-md-${RowNumberChartCol}"><div>${commentsChartHtml}</div></div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;

                RevertBackComments(ChartId);
            }
            else if (chartconfigobj.chartType == "table_chart") {
                legendsHtml = legendsHtml + `<div></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj)}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "number_chart") {
                legendsHtml = legendsHtml + `<div style="margin-top:15px"></div>`;
                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true);
                imgsHtml = imgsHtml + `<div class="col-md-${RowNumberChartCol}">${chartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;

                if (chartconfigobj.ShowTotals) {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                    }
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }
                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                //Make label dabbay bigger
                //let dabbay = svgObj.getElementsByClassName('highcharts-data-label-box');
                //for (let xcxc = 0; xcxc < dabbay.length; xcxc++) {
                //    dabbay[xcxc].width['baseVal'].value = dabbay[xcxc].width['baseVal'].value + 2;
                //}
                //Make label dabbay bigger

                //   var svgString = svgObj.outerHTML;
                let myChartEl = document.getElementById(ChartId);
                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
                debugger;
                try {



                    $.each(myChart.options.xAxis, function (s, catfield) {
                        myChart.options.xAxis[s].labels.style.fontWeight = 900;
                        myChart.options.xAxis[s].labels.style.fontSize = '11px';
                    });
                    $.each(myChart.options.yAxis, function (s, catfield) {
                        myChart.options.yAxis[s].labels.style.fontWeight = 900;
                        myChart.options.yAxis[s].labels.style.fontSize = '11px';
                    });
                } catch (e) {

                }
                //try {
                //    myChart.series.forEach(function (s) {
                //        pointindex = 0;
                //        s.points.forEach(function (point) {
                //            var elem = $(point.dataLabel.element).children();
                //            $(elem).eq(0).attr("width", point.dataLabel.width);
                //            var labeltext = point.dataLabel.textStr;// $(elem).eq(1).val();
                //            $(elem).eq(0).attr("x", -0.5);
                //            if (labeltext.length == 3 || labeltext.length == 1) {
                //                $(elem).eq(1).attr("x", 2.5);
                //            }
                //            else if (labeltext.length == 2 || labeltext.length == 5) {
                //                $(elem).eq(1).attr("x", 2.2);
                //            }
                //            else if (labeltext.length == 6) {
                //                $(elem).eq(1).attr("x", 2);
                //            }
                //            else if (labeltext.length == 7) {
                //                $(elem).eq(1).attr("x", 2.4);
                //            }
                //            else if (labeltext.length == 9) {
                //                $(elem).eq(1).attr("x", 2.5);
                //            }
                //            else {
                //                $(elem).eq(1).attr("x", 1.47);
                //            }
                //        })
                //    })
                //} catch (e) {
                //}













                var svgString = myChart.getSVG({
                    exporting: {
                        sourceWidth: myChart.chartWidth,
                        sourceHeight: myChart.chartHeight
                    }
                });
                debugger;
                svgString = svgString.replaceAll(`Highcharts.com`, ``)
                svgString = svgString.replaceAll(`height="210"`, `height="260"`)
                //FOR LABELS SETTING
                if (svgString.indexOf(`font-size:10px;`) > -1) {
                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:11px;`)
                }
                //if (svgString.indexOf(`font-size:10px;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:700;`)
                //}
                //if (svgString.indexOf(`font-weight:bold;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:bold;`, `font-weight:800;`)
                //}
                //FOR LABELS SETTING

                //REMOVE LINE CHART LABELS
                var yaxis_labels = [];
                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
                }
                yaxis_labels.sort(function (a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                    }
                }
                //REMOVE LINE CHART LABELS

                //var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                ////Extending SVG Image View
                //var svgWidth = parseInt(svgObj.getAttribute("width")) + 40;
                //var svgHeight = parseInt(svgObj.getAttribute("height")) + 80;
                ////svgObj.setAttribute("width", svgWidth + 200);
                ////svgObj.setAttribute("height", svgHeight + 80);

                //svgObj.setAttribute('viewBox', '0 0 ' + svgWidth.toString() + ' ' + svgHeight.toString());

                //var svgString = svgObj.outerHTML;


                ////var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels')[0].outerHTML;
                ////var oldYaxis = svgYaxis;
                ////if (svgYaxis.indexOf(`font-size:11px`) > -1) {
                ////    svgYaxis = svgYaxis.replaceAll(`font-size:11px`, `font-size:11px;font-weight:600`)
                ////}
                //var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels');
                //for (var indexxx = 0; indexxx < svgYaxis.length; indexxx++) {
                //    var oldYaxis = svgYaxis[indexxx].outerHTML;
                //    if (svgYaxis[indexxx].outerHTML.indexOf(`font-size:11px`) > -1) {
                //        var fontchange = svgYaxis[indexxx].outerHTML.replaceAll(`font-size:11px`, `font-size:12px;font-weight:600`);
                //        if (svgString.indexOf(oldYaxis) > -1) {
                //            svgString = svgString.replaceAll(oldYaxis, fontchange);
                //        }
                //    }
                //}

                ////if (svgString.indexOf(`font-size="12px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                ////}

                ////if (svgString.indexOf(`font-size="10px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                ////}

                //var yaxis_labels = [];
                //for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                //    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                //}
                //yaxis_labels.sort(function (a, b) {
                //    // ASC  -> a.length - b.length
                //    // DESC -> b.length - a.length
                //    return b.length - a.length;
                //});
                //for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                //    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                //        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                //    }
                //}
                ////for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {

                ////    if (svgString.indexOf(chartconfigobj.chartYAxises[vfg].label) > -1) {
                ////        svgString = svgString.replaceAll(chartconfigobj.chartYAxises[vfg].label, ``)
                ////    }
                ////}

                //if (svgString.indexOf(`font-size:10px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:10px`, `font-size:12px`)
                //}

                //if (svgString.indexOf(`font-size:11px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:11px`, `font-size:13px;font-weight:800`)
                //}

                //if (svgString.indexOf(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`) > -1) {
                //    svgString = svgString.replaceAll(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`, `font-family: Poppins, sans-serif;`)
                //}

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid"  src="${imgURI}" alt="">${lblsHtml}</div>`;
                // imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid" style='width:100%' src="${imgURI}" alt=""></div>`;

                /*lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;*/
            }
            else if (chartconfigobj.chartType == "pie_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                legends = chartconfigobj.chartXAxisShowLabels;


                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                //var svgElement = $('#' + ChartId + ' .apexcharts-svg')[0];
                //$('#' + ChartId + ' foreignObject').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs-hidden').remove();
                //var svgString = svgElement.outerHTML;

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="12px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                }

                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                }

                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                imgsHtml = imgsHtml + `<div class="text-center col-md-${col_md}">${legendsHtml}<img style="width:80%;" class="img-fluid" src="${imgURI}" alt="">${lblsHtml}</div>`;


                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            else {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    if (chartconfigobj.ShowTotals) {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                        }
                    }
                    else {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            legends.push(chartconfigobj.chartYAxises[q].label);
                        }
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });


                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`height="300"`) > -1) {
                    svgString = svgString.replaceAll(`height="300"`, `height="260"`)
                }
                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
                }
                if (svgString.indexOf(`font-weight="400"`) > -1) {
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
                }
                if (svgString.indexOf(`#373d3f`) > -1) {
                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
                }
                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }
                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:800;`)

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid"  src="${imgURI}" alt="">${lblsHtml}</div>`;


                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }


            if (comments.length > 0 && comments != '<p><br></p>') {
                /*  commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p><strong>Comments: </strong>${comments}</p></div>`;*/
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments}</div></div>`;
            }
            else {
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p></p></div>`;
            }
        }
        //        html = html + `<div class="col-md-12">
        //<div class="row align-items-center">

        //${legendsHtml}
        //</div></div>`;

        html = html + `
<div class="col-md-12"><div class="row">

${imgsHtml}

</div></div>
`;

        //        html = html + `<div class="col-md-12">
        //<div class="row align-items-center">
        //${lblsHtml}
        //</div></div>`;

        var row_id = rows[j].id.replace('charts_data_', '');
        if (comments_for_row.indexOf(row_id) > -1) {
            SetCommentsForPdf("comments_" + row_id);

            var comments_row = $("#comments_text_" + row_id).summernote('code');//for formatted html

            if (comments_row.length > 0 && comments_row != '<p><br></p>') {
                commentsHtml = `<div class="col-md-12"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments_row}</div></div>`;
            }
            else {
                commentsHtml = `<div class="col-md-12"><p></p></div>`;
            }

            RevertBackComments("comments_" + row_id);
        }

        html = html + `<div class="col-md-12">
<div class="row" style="margin-top:20px">
${commentsHtml}
</div></div>`;

        html = html + `</div>`;

        html = html + `<hr>`;
    }
    html = html + `</div></body></html>`;


    //for (let b = 0; b < ptags.length; b++) {

    //    $(ptags[b]).css({ 'font-size': $(ptags[b]).attr('font-size') });
    //}
    //for (let b = 0; b < spans.length; b++) {
    //    $(spans[b]).css({ 'font-size': $(spans[b]).attr('font-size') });
    //}
    //for (let b = 0; b < ols.length; b++) {
    //    $(ols[b]).css({ 'font-size': $(ols[b]).attr('font-size') });
    //}

    //psize = parseFloat($('.note-editor .note-editing-area p').css('font-size'));
    //newPSize = psize + pfactor;
    //$('.note-editor .note-editing-area p').css({ 'font-size': newPSize.toString() + "px" });
    //$('.note-editor .note-editing-area span').css({ 'font-size': newPSize.toString() + "px" });

    //olsize = parseFloat($('.note-editor .note-editing-area ol').css('font-size'));
    //newOlSize = olsize + olfactor;
    //$('.note-editor .note-editing-area ol').css({ 'font-size': newOlSize.toString() + "px" });
    //  $('body').append(html);

    GeneratePdf(html);
}


async function GetPdfDataNotUsed() {

    //let ptags = $('.note-editor .note-editing-area p');
    //let spans = $('.note-editor .note-editing-area span');
    //let ols = $('.note-editor .note-editing-area ol');
    //for (let b = 0; b < ptags.length; b++) {
    //    let psize = parseFloat($(ptags[b]).css('font-size'));
    //    $(ptags[b]).attr('font-size', psize.toString() + "px");
    //    let pfactor = psize / fontReduction;
    //    let newPSize = psize - pfactor;
    //    $(ptags[b]).css({ 'font-size': newPSize.toString() + "px" });
    //}
    //for (let b = 0; b < spans.length; b++) {
    //    let psize = parseFloat($(spans[b]).css('font-size'));
    //    $(spans[b]).attr('font-size', psize.toString() + "px");
    //    let pfactor = psize / fontReduction;
    //    let newPSize = psize - pfactor;
    //    $(spans[b]).css({ 'font-size': newPSize.toString() + "px" });
    //}
    //for (let b = 0; b < ols.length; b++) {
    //    let olsize = parseFloat($(ols[b]).css('font-size'));
    //    $(ols[b]).attr('font-size', olsize.toString() + "px");
    //    let olfactor = olsize / fontReduction;
    //    let newOlSize = olsize - olfactor;
    //    $(ols[b]).css({ 'font-size': newOlSize.toString() + "px" });
    //}

    //let psize = parseFloat($('.note-editor .note-editing-area p').css('font-size'));
    //let pfactor = psize / fontReduction;
    //let newPSize = psize - pfactor;
    //$('.note-editor .note-editing-area p').css({ 'font-size': newPSize.toString() + "px" });
    //$('.note-editor .note-editing-area span').css({ 'font-size': newPSize.toString() + "px" });

    //let olsize = parseFloat($('.note-editor .note-editing-area ol').css('font-size'));
    //let olfactor = olsize / fontReduction;
    //let newOlSize = olsize - olfactor;
    //$('.note-editor .note-editing-area ol').css({ 'font-size': newOlSize.toString() + "px" });

    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:800 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");

    //$('.apexcharts-text').removeAttr("style");
    //$('.apexcharts-text').attr("font-size", "12px !important");
    //$('.apexcharts-text').attr("font-weight", "700 !important");

    var html = `<html lang="en" data-textdirection="ltr">
                <body>
                    <div class="container-fluid">`;

    var rows = $("div[id^='charts_data_']");

    for (var j = 0; j < rows.length; j++) {
        var charts = rows[j].children;
        if (charts.length === 0) {
            continue;
        }
        var legendsHtml = ``;
        var imgsHtml = ``;
        var lblsHtml = ``;
        var commentsHtml = ``;
        html = html + `<div class="row kaala pt-0" style="page-break-inside: avoid;margin-top:5px">`;
        for (var i = 0; i < charts.length; i++) {

            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);

            SetCommentsForPdf("comments_" + ChartId.replace('chart_', ''));

            var comments = $("#comments_text_" + ChartId.replace('chart_', '')).summernote('code');//for formatted html
            var col_md = 12 / charts.length;

            RevertBackComments("comments_" + ChartId.replace('chart_', ''));

            if (chartconfigobj.chartType == "comments_chart") {
                SetCommentsForPdf(ChartId);

                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;" class="col-md-${col_md}">${commentsChartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;

                RevertBackComments(ChartId);
            }
            else if (chartconfigobj.chartType == "table_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj)}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "number_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true);
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${chartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;

                if (chartconfigobj.ShowTotals) {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                    }
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 12px; font-weight: 800;">${legends[w]}</span></li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                //Make label dabbay bigger
                //let dabbay = svgObj.getElementsByClassName('highcharts-data-label-box');
                //for (let xcxc = 0; xcxc < dabbay.length; xcxc++) {
                //    dabbay[xcxc].width['baseVal'].value = dabbay[xcxc].width['baseVal'].value + 2;
                //}
                //Make label dabbay bigger

                //   var svgString = svgObj.outerHTML;
                let myChartEl = document.getElementById(ChartId);
                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
                debugger;
                try {
                    $.each(myChart.options.xAxis, function (s, catfield) {
                        myChart.options.xAxis[s].labels.style.fontWeight = 900;
                        myChart.options.xAxis[s].labels.style.fontSize = '11px';
                    });
                    $.each(myChart.options.yAxis, function (s, catfield) {
                        myChart.options.yAxis[s].labels.style.fontWeight = 900;
                        myChart.options.yAxis[s].labels.style.fontSize = '11px';
                    });
                } catch (e) {

                }
                //try {
                //    myChart.series.forEach(function (s) {
                //        pointindex = 0;
                //        s.points.forEach(function (point) {
                //            var elem = $(point.dataLabel.element).children();
                //            $(elem).eq(0).attr("width", point.dataLabel.width);
                //            var labeltext = point.dataLabel.textStr;// $(elem).eq(1).val();
                //            $(elem).eq(0).attr("x", -0.5);
                //            if (labeltext.length == 3 || labeltext.length == 1) {
                //                $(elem).eq(1).attr("x", 2.5);
                //            }
                //            else if (labeltext.length == 2 || labeltext.length == 5) {
                //                $(elem).eq(1).attr("x", 2.2);
                //            }
                //            else if (labeltext.length == 6) {
                //                $(elem).eq(1).attr("x", 2);
                //            }
                //            else if (labeltext.length == 7) {
                //                $(elem).eq(1).attr("x", 2.4);
                //            }
                //            else if (labeltext.length == 9) {
                //                $(elem).eq(1).attr("x", 2.5);
                //            }
                //            else {
                //                $(elem).eq(1).attr("x", 1.47);
                //            }
                //        })
                //    })
                //} catch (e) {
                //}













                var svgString = myChart.getSVG({
                    exporting: {
                        sourceWidth: myChart.chartWidth,
                        sourceHeight: myChart.chartHeight
                    }
                });
                svgString = svgString.replaceAll(`Highcharts.com`, ``)
                //FOR LABELS SETTING
                if (svgString.indexOf(`font-size:10px;`) > -1) {
                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:11px;`)
                }
                //if (svgString.indexOf(`font-size:10px;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:700;`)
                //}
                //if (svgString.indexOf(`font-weight:bold;`) > -1) {
                //    svgString = svgString.replaceAll(`font-weight:bold;`, `font-weight:800;`)
                //}
                //FOR LABELS SETTING

                //REMOVE LINE CHART LABELS
                var yaxis_labels = [];
                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
                }
                yaxis_labels.sort(function (a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                    }
                }
                //REMOVE LINE CHART LABELS

                //var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                ////Extending SVG Image View
                //var svgWidth = parseInt(svgObj.getAttribute("width")) + 40;
                //var svgHeight = parseInt(svgObj.getAttribute("height")) + 80;
                ////svgObj.setAttribute("width", svgWidth + 200);
                ////svgObj.setAttribute("height", svgHeight + 80);

                //svgObj.setAttribute('viewBox', '0 0 ' + svgWidth.toString() + ' ' + svgHeight.toString());

                //var svgString = svgObj.outerHTML;


                ////var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels')[0].outerHTML;
                ////var oldYaxis = svgYaxis;
                ////if (svgYaxis.indexOf(`font-size:11px`) > -1) {
                ////    svgYaxis = svgYaxis.replaceAll(`font-size:11px`, `font-size:11px;font-weight:600`)
                ////}
                //var svgYaxis = svgObj.getElementsByClassName('highcharts-yaxis-labels');
                //for (var indexxx = 0; indexxx < svgYaxis.length; indexxx++) {
                //    var oldYaxis = svgYaxis[indexxx].outerHTML;
                //    if (svgYaxis[indexxx].outerHTML.indexOf(`font-size:11px`) > -1) {
                //        var fontchange = svgYaxis[indexxx].outerHTML.replaceAll(`font-size:11px`, `font-size:12px;font-weight:600`);
                //        if (svgString.indexOf(oldYaxis) > -1) {
                //            svgString = svgString.replaceAll(oldYaxis, fontchange);
                //        }
                //    }
                //}

                ////if (svgString.indexOf(`font-size="12px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                ////}

                ////if (svgString.indexOf(`font-size="10px"`) > -1) {
                ////    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                ////}

                //var yaxis_labels = [];
                //for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                //    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                //}
                //yaxis_labels.sort(function (a, b) {
                //    // ASC  -> a.length - b.length
                //    // DESC -> b.length - a.length
                //    return b.length - a.length;
                //});
                //for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                //    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                //        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                //    }
                //}
                ////for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {

                ////    if (svgString.indexOf(chartconfigobj.chartYAxises[vfg].label) > -1) {
                ////        svgString = svgString.replaceAll(chartconfigobj.chartYAxises[vfg].label, ``)
                ////    }
                ////}

                //if (svgString.indexOf(`font-size:10px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:10px`, `font-size:12px`)
                //}

                //if (svgString.indexOf(`font-size:11px`) > -1) {
                //    svgString = svgString.replaceAll(`font-size:11px`, `font-size:13px;font-weight:800`)
                //}

                //if (svgString.indexOf(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`) > -1) {
                //    svgString = svgString.replaceAll(`font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;`, `font-family: Poppins, sans-serif;`)
                //}

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));

                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid"  src="${imgURI}" alt=""></div>`;
                // imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid" style='width:100%' src="${imgURI}" alt=""></div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                /*lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;*/
            }
            else if (chartconfigobj.chartType == "pie_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                legends = chartconfigobj.chartXAxisShowLabels;


                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                //var svgElement = $('#' + ChartId + ' .apexcharts-svg')[0];
                //$('#' + ChartId + ' foreignObject').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs').remove();
                //$('#' + ChartId + ' .apexcharts-ycrosshairs-hidden').remove();
                //var svgString = svgElement.outerHTML;
                var chartorigionlawidth = ChartObj.instance.w.globals.dom.Paper.width();
                ChartObj.instance.w.globals.dom.Paper.width(273);
                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="12px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                }

                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                }

                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="text-center col-md-${col_md}"><img style="width:80%;" class="img-fluid" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;
                ChartObj.instance.w.globals.dom.Paper.width(chartorigionlawidth);
                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            else {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    if (chartconfigobj.ShowTotals) {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                        }
                    }
                    else {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            legends.push(chartconfigobj.chartYAxises[q].label);
                        }
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });


                //var svgObj = ChartObj.instance.w.globals.dom.Paper.node;
                //svgObj.setAttribute('transform', 'translate(10, 0)');
                //var chartorigionlawidth=ChartObj.instance.w.globals.dom.Paper.width();
                ////ChartObj.instance.w.globals.dom.Paper.height(ChartObj.instance.w.globals.dom.Paper.height() + 40);
                ///*   ChartObj.instance.w.globals.dom.Paper.width(ChartObj.instance.w.globals.dom.Paper.width() + 40);*/
                //ChartObj.instance.w.globals.dom.Paper.width(273);

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
                }
                if (svgString.indexOf(`font-weight="400"`) > -1) {
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
                }
                if (svgString.indexOf(`#373d3f`) > -1) {
                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
                }
                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }
                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }
                debugger;
                svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:800;`)
                //ChartObj.instance.w.globals.dom.Paper.height(ChartObj.instance.w.globals.dom.Paper.height() - 40);
                //ChartObj.instance.w.globals.dom.Paper.width(ChartObj.instance.w.globals.dom.Paper.width() - 40);
                /*   ChartObj.instance.w.globals.dom.Paper.width(chartorigionlawidth);*/
                //svgObj.setAttribute('transform', 'translate(0, 0)');


                //if (svgString.indexOf(`font-size="12px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                //}

                //if (svgString.indexOf(`font-size="10px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                //}

                //if (svgString.indexOf(`font-size="11px"`) > -1) {
                //    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                //    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                //}

                //if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                //    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                //}
                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }


            if (comments.length > 0 && comments != '<p><br></p>') {
                /*  commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p><strong>Comments: </strong>${comments}</p></div>`;*/
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments}</div></div>`;
            }
            else {
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p></p></div>`;
            }
        }
        html = html + `<div class="col-md-12">
<div class="row align-items-center">

${legendsHtml}
</div></div>`;

        html = html + `<div class="col-md-12">
<div class="row align-items-center">
${imgsHtml}
</div></div>`;

        html = html + `<div class="col-md-12">
<div class="row align-items-center">
${lblsHtml}
</div></div>`;

        var row_id = rows[j].id.replace('charts_data_', '');
        if (comments_for_row.indexOf(row_id) > -1) {
            SetCommentsForPdf("comments_" + row_id);

            var comments_row = $("#comments_text_" + row_id).summernote('code');//for formatted html

            if (comments_row.length > 0 && comments_row != '<p><br></p>') {
                commentsHtml = `<div class="col-md-12"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments_row}</div></div>`;
            }
            else {
                commentsHtml = `<div class="col-md-12"><p></p></div>`;
            }

            RevertBackComments("comments_" + row_id);
        }

        html = html + `<div class="col-md-12">
<div class="row">
${commentsHtml}
</div></div>`;

        html = html + `</div>`;

        html = html + `<hr>`;
    }
    html = html + `</div></body></html>`;


    //for (let b = 0; b < ptags.length; b++) {

    //    $(ptags[b]).css({ 'font-size': $(ptags[b]).attr('font-size') });
    //}
    //for (let b = 0; b < spans.length; b++) {
    //    $(spans[b]).css({ 'font-size': $(spans[b]).attr('font-size') });
    //}
    //for (let b = 0; b < ols.length; b++) {
    //    $(ols[b]).css({ 'font-size': $(ols[b]).attr('font-size') });
    //}

    //psize = parseFloat($('.note-editor .note-editing-area p').css('font-size'));
    //newPSize = psize + pfactor;
    //$('.note-editor .note-editing-area p').css({ 'font-size': newPSize.toString() + "px" });
    //$('.note-editor .note-editing-area span').css({ 'font-size': newPSize.toString() + "px" });

    //olsize = parseFloat($('.note-editor .note-editing-area ol').css('font-size'));
    //newOlSize = olsize + olfactor;
    //$('.note-editor .note-editing-area ol').css({ 'font-size': newOlSize.toString() + "px" });


    GeneratePdf(html);
}
async function downloadWholeChartsPng() {
    if (chartIds.length === 0) {
        return;
    }
    dpr = window.devicePixelRatio;
    window.devicePixelRatio = 3;
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js"></script>
    //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css" />
    $(".preloader").css('background', '#333333');
    loading_start(0, 0, DownLoadPdfMessage, false, true);
    $('#loading_label').empty();
    $('#loading_label').append('Generating Pdf...');
    $('#loading_label').removeClass('d-none');

    sidebarOpened = !$("body").hasClass("enlarge-menu");

    bodyColor = $('body').css('color');
    $('body').css('color', 'black');

    if (sidebarOpened) {
        $(".button-menu-mobile").trigger("click");
    }
    setTimeout(DownloadWholePngImage, 500);
}
async function DownloadWholePngImage() {
    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:800 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");
    var html = GetHtmlForWholePng(false);
    $('body').append(html);
    /*   setTimeout(() => { getBase64ByIdfordownloadpdfcharts("pdfcharts");},5000)*/
    getBase64ByIdfordownloadpdfcharts("pdfcharts");
    setTimeout(() => {
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }

        $('#loading_label').empty();
        $('#loading_label').append(DownLoadPdfMessage);

    }, 1000);

    setTimeout(() => {
        $("#pngchartcard").remove();
        $('body').css('color', bodyColor);
        $(".preloader").css('background', '#333333d1');
        window.devicePixelRatio = dpr;
        $('#loading_label').addClass('d-none');
        loading_end(true, true);
        reflowAllHighchartswithtimer();
    }, 3000);
}
async function Downloadhtmlfile() {
    if (chartIds.length === 0) {
        return;
    }
    dpr = window.devicePixelRatio;
    window.devicePixelRatio = 3;
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js"></script>
    //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css" />
    $(".preloader").css('background', '#333333');
    loading_start(0, 0, DownLoadPdfMessage, false, true);
    $('#loading_label').empty();
    $('#loading_label').append('Generating Pdf...');
    $('#loading_label').removeClass('d-none');

    sidebarOpened = !$("body").hasClass("enlarge-menu");

    bodyColor = $('body').css('color');
    $('body').css('color', 'black');

    if (sidebarOpened) {
        $(".button-menu-mobile").trigger("click");
    }
    setTimeout(Downloadhtmlfilefunction, 500);
}
function GetHtmlForWholePng(downloadhtml) {
    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:800 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");
    var html = `<html lang="en" data-textdirection="ltr"><head>`;
    if (downloadhtml) {
        html = html + `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
   
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<style>
.progress{

height: 20px !important;
     margin-bottom: 5px;
    overflow: hidden;
    background-color: #f5f5f5;
   
border-radius: 0;
    display: flex;
   webkit-box-shadow:none !important;
    box-shadow:none !important;
}
.tableFixHead table tr {
    width: auto !important;
}
.tableFixHead table tr {
    width: auto !important;
}
.tableFixHead tfoot th {
    padding: .60rem;
}
|
.tableFixHead table  thead tr th {
    padding-right: 18px;
    color: black;
    position: sticky;
    top: -1px;
    border-collapse: separate;
    z-index: 1;
}
.tableFixHead table  tbody tr td     {
  vertical-align: revert;
}

.fixedtablehead {   
    padding-right: 18px;
    color: black;
    position: sticky;
    top: -1px;
    border-collapse: separate;
    z-index: 1;
    cursor:default;
}
.progress.loaderprogress {
    transition-delay: 2s;
    width: 273px;
    height: 30px;
    padding: 3px 3px 3px 0px;
}
.loaderprogress {
    display: block;
    margin: auto;
    font-family: 'Revalia', cursive;
}
#progressbardiv {
    height: 25px;
}
table{
table-layout: fixed;
width: 100%;
}
.progress.loaderprogress {
    transition-delay: 2s;
    width: 273px;
    height: 30px;
    padding: 3px 3px 3px 0px;
}
.loaderprogress {
    display: block;
    margin: auto;
    font-family: 'Revalia', cursive;
}
    `;
    }
    else {
        html = html + "<style>"
    }

    html = html + `
    
.numberchartdivDownload {
    text-align: center;
    margin-top: 50px;
    font-size: 25px;
}
        .legendsClass_L li {
            display: inline-block;
            padding-bottom: 5px;
            font-size: 10px;
            color: black;
        }

        .legendsClass_LFW li {
            display: inline-block;
            padding-bottom: 5px;
            font-size: 20px;
            color: black;
        }

        .markerClass_M {
            margin-right: 3px;
            margin-left: 3px;
            color: white;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
        }
        #pdfcharts{
      padding:40px;

        }
.OneTwoColumns {
    width: 30% !important;
}

.ThreeFourColumns {
    width: 65% !important;
}   

.Noofcolumns {
    width: 75% !important;
}
    </style></head>
                <body>
               <div class="card" id="pngchartcard"><div class="card-body"> <div class="container-fluid" id="pdfcharts">`;
    var rows = $("div[id^='charts_data_']");
    var totalchartsynclength = 0;
    for (var j = 0; j < rows.length; j++) {
        var charts = rows[j].children;
        var randomrowid = rows[j].id.split('_')[2];
        adjustRowChartsWidth(randomrowid);
        if (charts.length === 0) {
            continue;
        }
        var imgsHtml = ``;
        var commentsHtml = ``;
        html = html + `<div class="row kaala pt-0" style="margin-top:5px">`;
        for (var i = 0; i < charts.length; i++) {
            var legendsHtml = ``;
            var lblsHtml = ``;
            totalchartsynclength++;
            var percentageCount = parseInt((totalchartsynclength / chartsconfigurations.length) * 100);
            if (percentageCount > 85) {
                percentageCount = 85;
            }
            loading_start(percentageCount, percentageCount, DownLoadPdfMessage, false, true)
            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);

            //  SetCommentsForPdf("comments_" + ChartId.replace('chart_', ''));

            var comments = $("#comments_text_" + ChartId.replace('chart_', '')).summernote('code');//for formatted html
            var col_md = RowOtherChartCol;//12 / charts.length;

            //  RevertBackComments("comments_" + ChartId.replace('chart_', ''));

            if (chartconfigobj.chartType == "comments_chart") {
                //  SetCommentsForPdf(ChartId);

                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
                legendsHtml = legendsHtml + `<div class="col-md-${RowNumberChartCol}"></div>`;
                var rowpadding = 20;
                if (RowNumberChartCol == 4) {
                    rowpadding = 25;
                }
                if (RowNumberChartCol == 12) {
                    rowpadding = 46;
                }
                if (RowNumberChartCol == 6) {
                    rowpadding = 36;
                }

                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;margin-top:55px;padding-left:${rowpadding}px;padding-right:${rowpadding}px;padding-bottom:${rowpadding}px;" class="col-md-${RowNumberChartCol}"><div>${commentsChartHtml}</div></div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;

                //    RevertBackComments(ChartId);
            }
            else if (chartconfigobj.chartType == "table_chart") {
                legendsHtml = legendsHtml + `<div></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj, true)}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "number_chart") {
                legendsHtml = legendsHtml + `<div style="margin-top:15px"></div>`;
                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true, true);
                imgsHtml = imgsHtml + `<div class="col-md-${RowNumberChartCol}">${chartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${RowNumberChartCol}" style="margin-bottom:20px"></div>`;
            }
            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;

                if (chartconfigobj.ShowTotals) {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                    }
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }
                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 12px; font-weight: 600;">${legends[w]}</span></li>`;
                    /*       legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 12px; font-weight: 600;">${legends[w]}</span></li>`;*/
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                var svgObj = $('#' + ChartId).children('div').children('svg')[0];


                let myChartEl = document.getElementById(ChartId);
                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
                //   debugger;
                try {



                    $.each(myChart.options.xAxis, function (s, catfield) {
                        myChart.options.xAxis[s].labels.style.fontWeight = 900;
                        myChart.options.xAxis[s].labels.style.fontSize = '11px';
                    });
                    $.each(myChart.options.yAxis, function (s, catfield) {
                        myChart.options.yAxis[s].labels.style.fontWeight = 900;
                        myChart.options.yAxis[s].labels.style.fontSize = '11px';
                    });
                } catch (e) {

                }
                var svgString = myChart.getSVG({
                    exporting: {
                        sourceWidth: myChart.chartWidth,
                        sourceHeight: myChart.chartHeight
                    }
                });
                //  debugger;
                svgString = svgString.replaceAll(`Highcharts.com`, ``)
                svgString = svgString.replaceAll(`height="210"`, `height="260"`)
                //FOR LABELS SETTING
                if (svgString.indexOf(`font-size:10px;`) > -1) {
                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:11px;`)
                }

                //REMOVE LINE CHART LABELS
                var yaxis_labels = [];
                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
                }
                yaxis_labels.sort(function (a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                    }
                }
                //REMOVE LINE CHART LABELS


                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid"  src="${imgURI}" alt="">${lblsHtml}</div>`;
            }
            else if (chartconfigobj.chartType == "pie_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                legendTitle = `<li style="font-size: 12px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                legends = chartconfigobj.chartXAxisShowLabels;


                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span  style=" margin-right: 3px;
            margin-left: 3px;
            color: white;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            vertical-align: middle;background-color: ${rungs[w]};"></span><span style="font-size: 12px; font-weight: 600;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="12px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                }

                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                }

                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                imgsHtml = imgsHtml + `<div class="text-center col-md-${col_md}">${legendsHtml}<img style="width:80%;" class="img-fluid" src="${imgURI}" alt="">${lblsHtml}</div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            else {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendTitle = `<li style="font-size: 12px; font-weight: 600; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    if (chartconfigobj.ShowTotals) {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                        }
                    }
                    else {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            legends.push(chartconfigobj.chartYAxises[q].label);
                        }
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 12px; font-weight: 800;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });


                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`height="300"`) > -1) {
                    svgString = svgString.replaceAll(`height="300"`, `height="260"`)
                }
                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
                }
                if (svgString.indexOf(`font-weight="400"`) > -1) {
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
                }
                if (svgString.indexOf(`#373d3f`) > -1) {
                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
                }
                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }
                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                svgString = svgString.replaceAll(`font-weight:700;`, `font-weight:800;`)

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                lblsHtml = lblsHtml + `<div class="align-items-center"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid"  src="${imgURI}" alt="">${lblsHtml}</div>`;


                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }


            if (comments.length > 0 && comments != '<p><br></p>') {
                /*  commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p><strong>Comments: </strong>${comments}</p></div>`;*/
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments}</div></div>`;
            }
            else {
                commentsHtml = commentsHtml + `<div class="col-md-${col_md}"><p></p></div>`;
            }
        }
        html = html + `
<div class="col-md-12"><div class="row">
${imgsHtml}
</div></div>`;
        var row_id = rows[j].id.replace('charts_data_', '');
        if (comments_for_row.indexOf(row_id) > -1) {
            // SetCommentsForPdf("comments_" + row_id);
            var comments_row = $("#comments_text_" + row_id).summernote('code');//for formatted html
            if (comments_row.length > 0 && comments_row != '<p><br></p>') {
                commentsHtml = `<div class="col-md-12"><div style="padding-left:30px;padding-right:30px;word-wrap: break-word;">${comments_row}</div></div>`;
            }
            else {
                commentsHtml = `<div class="col-md-12"><p></p></div>`;
            }

            //   RevertBackComments("comments_" + row_id);
        }

        html = html + `<div class="col-md-12">
<div class="row" style="margin-top:5px">
${commentsHtml}
</div></div>`;

        html = html + `</div>`;

        html = html + `<hr>`;
    }
    html = html + `</div></div></div></body></html>`;
    return html;
    debugger;
}
function SetCommentsForPdf(cmntsId) {
    $('#' + cmntsId + ' .note-editor .note-editing-area span').each(function (index, element) {
        let fsize = parseFloat($(element).css("font-size"));
        let factorrr = fsize / fontReduction;
        let newFontSize = fsize - factorrr;
        $(element).css({ 'font-size': newFontSize.toString() + "px" });
        $(element).attr('asli-font-size', fsize.toString() + "px");
    });

    $('#' + cmntsId + ' .note-editor .note-editing-area p').each(function (index, element) {
        let fsize = parseFloat($(element).css("font-size"));
        let factorrr = fsize / fontReduction;
        let newFontSize = fsize - factorrr;
        $(element).css({ 'font-size': newFontSize.toString() + "px" });
        $(element).attr('asli-font-size', fsize.toString() + "px");
    });

    $('#' + cmntsId + ' .note-editor .note-editing-area ol li').each(function (index, element) {
        let fsize = parseFloat($(element).css("font-size"));
        let factorrr = fsize / fontReduction;
        let newFontSize = fsize - factorrr;
        $(element).css({ 'font-size': newFontSize.toString() + "px" });
        $(element).attr('asli-font-size', fsize.toString() + "px");
    });
    $('#' + cmntsId + ' .note-editor .note-editing-area ul li').each(function (index, element) {
        let fsize = parseFloat($(element).css("font-size"));
        let factorrr = fsize / fontReduction;
        let newFontSize = fsize - factorrr;
        $(element).css({ 'font-size': newFontSize.toString() + "px" });
        $(element).attr('asli-font-size', fsize.toString() + "px");
    });
}

function RevertBackComments(cmntsId) {
    $('#' + cmntsId + ' .note-editor .note-editing-area span').each(function (index, element) {
        let asliFontSize = $(element).attr('asli-font-size');
        $(element).css({ 'font-size': asliFontSize });
    });

    $('#' + cmntsId + ' .note-editor .note-editing-area p').each(function (index, element) {
        let asliFontSize = $(element).attr('asli-font-size');
        $(element).css({ 'font-size': asliFontSize });
    });

    $('#' + cmntsId + ' .note-editor .note-editing-area ol li').each(function (index, element) {
        let asliFontSize = $(element).attr('asli-font-size');
        $(element).css({ 'font-size': asliFontSize });
    });
    $('#' + cmntsId + ' .note-editor .note-editing-area ul li').each(function (index, element) {
        let asliFontSize = $(element).attr('asli-font-size');
        $(element).css({ 'font-size': asliFontSize });
    });
}

function GeneratePdf(html) {
    // var chartheight = $("#pdfdiv").height()*2;
    /* var elementheight = document.getElementById("main_div").scrollHeight;*/
    debugger;
    var opt = {
        margin: [20, 0, 20, 0],
        filename: new Date() + '_charts.pdf',
        image: { type: 'jpeg', quality: 1 },
        //  pagebreak: { mode: ['avoid-all'] }
        //  html2canvas: {scale:1},
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        //jsPDF: {
        //    unit: 'px',
        //    format: [1314, 480],
        //    pagesplit: false,
        //}
    };

    var myPdf = html2pdf().set(opt).from(html);

    setTimeout(() => {
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }
        myPdf.save();

        $('#loading_label').empty();
        $('#loading_label').append(DownLoadPdfMessage);

    }, 1000);

    setTimeout(() => {
        $('body').css('color', bodyColor);
        $(".preloader").css('background', '#333333d1');
        window.devicePixelRatio = dpr;
        $('#loading_label').addClass('d-none');
        loading_end(true, true);
        reflowAllHighchartswithtimer();
    }, 3000);


}

//function getBase64ById(id, index) {
//    var element = document.getElementById(id);
//    debugger;
//    //original code
//    //element.scrollHeight 
//    // $(".preloader").css('background', '#333333d1');
//    html2canvas(element, { windowWidth: element.scrollWidth, windowHeight: element.scrollHeight }).then(function (canvas) {
//        //  html2canvas(element, { windowWidth: 597, windowHeight: 273 }).then(function (canvas) {
//        var base64image = canvas.toDataURL("image/png");
//        //downloadBase64File(base64image, "aiwen.png");

//       /* var solution = base64image.split("base64,")[1];*/
//        /* chartBases.push(solution);*/
//        chartBases.push(base64image);
//        loopChartsCount++;
//        var percentageCount = parseInt((loopChartsCount / chartsconfigurations.length) * 100);
//        if (percentageCount < 40) {
//            percentageCount = 40;
//        }
//        if (percentageCount > 90) {
//            percentageCount = 90;
//        }
//        loading_start(percentageCount, percentageCount, DownLoadPngMessage, true)
//        if (CancelPng) {
//            $('#png_charts').remove();
//            $(".preloader").css('background', '#333333d1');
//            var cinda = 0;
//            if (sidebarOpened) {
//                $(".button-menu-mobile").trigger("click");
//            }
//            $('body').css('color', bodyColor);
//            window.devicePixelRatio = dpr;
//            totalChartsCount = 0;
//            loopChartsCount = 0;
//            loading_end(false);
//            return false;
//        }
//        if (totalChartsCount === loopChartsCount) {
//            //all done
//            finalZipFunc();
//        }
//        else {
//            getBase64ById(ab_rows_png[index + 1].id, index + 1)
//        }
//    });
//}
function getBase64ById(id, index) {
    var element = document.getElementById(id);
    debugger;
    //original code
    //element.scrollHeight 
    // $(".preloader").css('background', '#333333d1');
    html2canvas(element, { windowWidth: element.scrollWidth, windowHeight: element.scrollHeight }).then(function (canvas) {
        //  html2canvas(element, { windowWidth: 597, windowHeight: 273 }).then(function (canvas) {
        var base64image = canvas.toDataURL("image/png");
        //downloadBase64File(base64image, "aiwen.png");

         var solution = base64image.split("base64,")[1];
         chartBases.push(solution);
       // chartBases.push(base64image);
        loopChartsCount++;
        var percentageCount = parseInt((loopChartsCount / chartsconfigurations.length) * 100);
        if (percentageCount < 40) {
            percentageCount = 40;
        }
        if (percentageCount > 90) {
            percentageCount = 90;
        }
        loading_start(percentageCount, percentageCount, DownLoadPngMessage, true)
        if (CancelPng) {
            $('#png_charts').remove();
            $(".preloader").css('background', '#333333d1');
            var cinda = 0;
            if (sidebarOpened) {
                $(".button-menu-mobile").trigger("click");
            }
            $('body').css('color', bodyColor);
            window.devicePixelRatio = dpr;
            totalChartsCount = 0;
            loopChartsCount = 0;
            loading_end(false);
            return false;
        }
        if (totalChartsCount === loopChartsCount) {
            //all done
            /*  DownLoadPowerPointDataAfterCreatingImages(chartBases);*/
            finalZipFunc();
        }
        else {
            getBase64ById(ab_rows_png[index + 1].id, index + 1)
        }
    });
}
//function getBase64ById(id) {
//    var element = document.getElementById(id);

//    //original code
//    html2canvas(element).then(function (canvas) {

//        var base64image = canvas.toDataURL("image/png");
//        //downloadBase64File(base64image, "aiwen.png");

//        var solution = base64image.split("base64,")[1];
//        chartBases.push(solution);
//        loopChartsCount++;

//        if (totalChartsCount === loopChartsCount) {
//            //all done
//            finalZipFunc();
//        }
//    });
//}
function getBase64ByIdfordownloadpdfcharts(id) {
    var element = document.getElementById(id);
    debugger;
    //original code
    html2canvas(element, { scale: 2 }).then(function (canvas) {
        // html2canvas(element, { scale: 4, windowWidth: element.scrollWidth, windowHeight: element.scrollHeight }).then(function (canvas) {
        var base64image = canvas.toDataURL("image/png", 1.0);
        downloadBase64File(base64image, getReportNameForDownload() + '.png');
    });
}

function downloadBase64File(base64Data, fileName) {
    const downloadLink = document.createElement("a");
    downloadLink.href = base64Data;
    downloadLink.download = fileName;
    downloadLink.click();
}
function Downloadhtmlfilefunction() {
    //const downloadLink = document.createElement("a");
    //downloadLink.href = "https://localhost:44392/Home/pdfhtml";
    //downloadLink.download = "test";
    //downloadLink.click();
    var html = GetHtmlForWholePng(true);
    let zip = new JSZip();
    zip.file(getReportNameForDownload() + ".html", html);
    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "download.zip");
    });
    setTimeout(() => {
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }

        $('#loading_label').empty();
        $('#loading_label').append(DownLoadPdfMessage);

    }, 1000);

    setTimeout(() => {
        $('body').css('color', bodyColor);
        $(".preloader").css('background', '#333333d1');
        window.devicePixelRatio = dpr;
        $('#loading_label').addClass('d-none');
        loading_end(true, true);
        reflowAllHighchartswithtimer();
    }, 3000);
}

function finalZipFunc() {
    $('#png_charts').remove();
    var cinda = 0;

    //Commented for png in same size as displayed
    //var rows = $("div[id^='charts_data_']");
    //for (var j = 0; j < rows.length; j++) {
    //    var charts = rows[j].children;
    //    if (charts.length === 0) {
    //        continue;
    //    }

    //    for (var i = 0; i < charts.length; i++) {
    //        var ChartId = charts[i].id;
    //        $(`#${ChartId}`).removeClass();
    //        $(`#${ChartId}`).addClass(chartClasses[cinda]);
    //        cinda++;
    //    }
    //}
    //Commented for png in same size as displayed

    downloadZip(chartBases);
   
    setTimeout(() => {
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }

        $('#loading_label').empty();
        $('#loading_label').append(DownLoadPdfMessage);

    }, 1000);

    setTimeout(() => {
        $('body').css('color', bodyColor);
        $(".preloader").css('background', '#333333d1');
        window.devicePixelRatio = dpr;
        $('#loading_label').addClass('d-none');
        loading_end(true);

        totalChartsCount = 0;
        loopChartsCount = 0;
    }, 2000);
}

function downloadZip(base64strings) {
    var zip = new JSZip();
    var img = zip.folder("Charts_Images_" + new Date());

    for (var x = 0; x < base64strings.length; x++) {
        img.file((x + 1) + ".png", base64strings[x], { base64: true });
    }
   // DownLoadPowerPointDataAfterCreatingImages(base64strings);
    chartBases = [];

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "Charts_Images_" + new Date() + ".zip");
        });
}

function displayCommentsChart(chartId) {
    let asliChartId = chartId.replace('chart_', '');
    $(`#anc_${asliChartId}`).remove();
    $(`#divchart_${asliChartId}`).remove();

    $(`#comments_parent_div_${asliChartId}`).addClass('d-none');
    $(`#comments_${asliChartId}`).addClass('d-none');
    $(`#comments_parent_div_${asliChartId}`).css('display', 'none');
    $(`#comments_${asliChartId}`).css('display', 'none');
    //$(`#comments_parent_div_${asliChartId}`).remove();
    //$(`#comments_${asliChartId}`).remove();

    $(`#${chartId}`).append(`<div id="comments_chart_text_${asliChartId}" class="summernote"></div>`);
    $(`#${chartId}`).addClass('comment_chart_class');
    $(`#comments_chart_text_${asliChartId}`).summernote({
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ],
        fontSizes: fontSizesArray,
        tooltip: false,
        lineWrapping: true,
        height: 190
    });
}


function CancelDownLoadPng() {
    CancelPng = true;
    //   loading_end(false);
}
function getReportNameForDownload() {
    var today = new Date();

    /*var usDate = 'Y-m-d'*/
    var usDate = 'm-d-Y'
        .replace('Y', today.getFullYear())
        .replace('m', today.getMonth() + 1)
        .replace('d', today.getDate());
    var reportname = $("#nameLabel").val();

    if (reportname == '' || reportname == undefined || reportname == null) {
        reportname = usDate;
    }
    else {
        reportname = reportname + "_" + usDate;
    }
    return reportname;
}



async function downloadChartsPPTFile() {
    if (chartIds.length === 0) {
        return;
    }
    dpr = window.devicePixelRatio;
    window.devicePixelRatio = 3;
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js"></script>
    //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css" />
   
  

    sidebarOpened = !$("body").hasClass("enlarge-menu");

    bodyColor = $('body').css('color');
    $('body').css('color', 'black');

    if (sidebarOpened) {
        $(".button-menu-mobile").trigger("click");
    }
    setTimeout(DownloadPowerpointfile, 500);
}
async function DownloadPowerpointfile() {
    CancelPng = false;
    $('.highcharts-root').removeAttr("style");
    $('.highcharts-root').attr("style", "font-weight:700 !important; color:black !important; font-family:Poppins, sans-serif; font-size:12px !important;");
    var main_html = `<div class="container-fluid kaala pt-0" id="png_charts"></div>`;
    $('body').append(main_html);

    var rows = $("div[id^='charts_data_']");
    var chartCountIndex = 0;
    var html = "<div class=row>";
    for (var j = 0; j < rows.length; j++) {
        debugger;

        if (CancelPng) {
            $('#png_charts').remove();
            var cinda = 0;
            if (sidebarOpened) {
                $(".button-menu-mobile").trigger("click");
            }
            $('body').css('color', bodyColor);
            window.devicePixelRatio = dpr;
            $(".preloader").css('background', '#333333d1');
            totalChartsCount = 0;
            loopChartsCount = 0;
            loading_end(false);
            return false;
        }
        var charts = rows[j].children;
        if (charts.length === 0) {
            continue;
        }

        let col_md_whole = 12 / charts.length;

        for (var i = 0; i < charts.length; i++) {

            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);
            if (chartconfigobj.chartType == "number_chart") {
                col_md_whole = 12 / 3;
            }
            else {
                col_md_whole = 12 / charts.length;
            }

            chartCountIndex++;
            var percentageCount = parseInt((chartCountIndex / chartsconfigurations.length) * 100);
            if (percentageCount > 10) {
                percentageCount = 10;
            }
            loading_start(percentageCount, percentageCount, DownLoadPngMessage, true, false)
            /* var html = `<div class="col-md-${col_md_whole}" id="png_chart_${chartCountIndex}">`;*/
            html = html + `<div class="col-md-${col_md_whole}" id="png_chart_${chartCountIndex}">`;
            var legendsHtml = ``;
            var imgsHtml = ``;
            var lblsHtml = ``;

            var col_md = 12;

            if (chartconfigobj.chartType == "comments_chart") {
                SetCommentsForPdf(ChartId);

                let commentsChartHtml = $("#comments_chart_text_" + ChartId.replace('chart_', '')).summernote('code');
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div style="word-wrap: break-word;" class="col-md-${col_md}">${commentsChartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"></div>`;

                RevertBackComments(ChartId);
            }
            else if (chartconfigobj.chartType == "table_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${gettablefordownload(chartconfigobj)}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"></div>`;
            }
            else if (chartconfigobj.chartType == "number_chart") {
                legendsHtml = legendsHtml + `<div class="col-md-${col_md}"></div>`;
                var chartHtml = get_numberchart_for_pdf_data(chartconfigobj, true);
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}">${chartHtml}</div>`;
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"></div>`;
            }
            else if (chartconfigobj.chartType == "bar_chart" || chartconfigobj.chartType == "line_chart" || chartconfigobj.chartType == "mixed_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;

                if (chartconfigobj.ShowTotals) {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                        legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                        //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                    }
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_LFW text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};height:18px;width:18px"></span><span style="font-size: ${(18)}px; font-weight: ${(400 + chartsLabelsFontWeightFactor)};">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                var svgObj = $('#' + ChartId).children('div').children('svg')[0];

                //Make label dabbay bigger
                let dabbay = svgObj.getElementsByClassName('highcharts-data-label-box');
                for (let xcxc = 0; xcxc < dabbay.length; xcxc++) {
                    dabbay[xcxc].width['baseVal'].value = dabbay[xcxc].width['baseVal'].value + 2;
                }
                //Make label dabbay bigger

                //  var svgString = svgObj.outerHTML;
                let myChartEl = document.getElementById(ChartId);
                let myChart = Highcharts.charts[myChartEl.getAttribute('data-highcharts-chart')];
                debugger;
                try {


                    $.each(myChart.options.xAxis, function (s, catfield) {
                        myChart.options.xAxis[s].labels.style.fontWeight = 900;
                        myChart.options.xAxis[s].labels.style.fontSize = '18px';
                    });
                    $.each(myChart.options.yAxis, function (s, catfield) {
                        myChart.options.yAxis[s].labels.style.fontWeight = 900;
                        myChart.options.yAxis[s].labels.style.fontSize = '18px';
                    });

                } catch (e) {

                }


                var svgString = myChart.getSVG({
                    exporting: {
                        sourceWidth: 400,//myChart.chartWidth,
                        sourceHeight: 300 //myChart.chartHeight
                    }
                });
                svgString = svgString.replaceAll(`Highcharts.com`, ``)
                //FOR LABELS SETTING
                if (svgString.indexOf(`font-size:10px;`) > -1) {
                    svgString = svgString.replaceAll(`font-size:10px;`, `font-size:18px;`)
                }


                //REMOVE LINE CHART LABELS
                var yaxis_labels = [];
                for (var vfg = 0; vfg < chartconfigobj.chartYAxises.length; vfg++) {
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label);
                    yaxis_labels.push(chartconfigobj.chartYAxises[vfg].label.trim());
                }
                yaxis_labels.sort(function (a, b) {
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });
                for (var vfg = 0; vfg < yaxis_labels.length; vfg++) {
                    if (svgString.indexOf(yaxis_labels[vfg]) > -1) {
                        svgString = svgString.replaceAll(yaxis_labels[vfg], ``);
                    }
                }


                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));

                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid mx-auto d-block" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_LFW text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: ${(8 + chartsLabelsFontFactor)}px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;
            }
            else if (chartconfigobj.chartType == "pie_chart") {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                var LegendsFontSize = 8;
                if (charts.length == 1) {
                    LegendsFontSize = 8;
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                }
                else {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                }
                legends = chartconfigobj.chartXAxisShowLabels;

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: ${LegendsFontSize}px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });



                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="12px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="12px"`, `font-size="14px"`)
                }

                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="13px"`)
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="600"`)
                }

                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid mx-auto d-block" src="${imgURI}" alt=""></div>`;
                /*              */

                //if (charts.length == 1) {
                //    ChartObj.instance.w.globals.dom.Paper.height(chartorigionlHeight);
                //    ChartObj.instance.w.globals.dom.Paper.width(chartorigionlawidth);
                //}
                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            else {
                var legendTitle = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendTitle = `<li style="font-size: 10px; font-weight: 800; color: rgb(55, 61, 63);">${chartconfigobj.chartYAxises[0].label}</li></br>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    if (chartconfigobj.ShowTotals) {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            var formattedValue = ApplyFormatting(chartconfigobj.chartSeries[q].total, chartconfigobj.chartSeries[q].name);
                            legends.push(chartconfigobj.chartYAxises[q].label + ` <strong>(` + formattedValue + `)</strong>`);
                            //legends.push(formattedValue + `<br>` + chartconfigobj.chartYAxises[q].label);
                        }
                    }
                    else {
                        for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                            legends.push(chartconfigobj.chartYAxises[q].label);
                        }
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;">${legendTitle}`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span><span style="font-size: 8px; font-weight: 400;">${legends[w]}</span></li>`;
                    //legendsHtml = legendsHtml + `<li><span class="markerClass_M" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul></div>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                var svgString = ChartObj.instance.w.globals.dom.Paper.svg();
                if (svgString.indexOf(`font-size="11px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="11px"`, `font-size="12px"`)
                }
                if (svgString.indexOf(`font-weight="400"`) > -1) {
                    svgString = svgString.replaceAll(`font-weight="400"`, `font-weight="700"`)
                }
                if (svgString.indexOf(`#373d3f`) > -1) {
                    svgString = svgString.replaceAll(`#373d3f`, `#000`)
                }
                if (svgString.indexOf(`stroke="#b6b6b6"`) > -1) {
                    svgString = svgString.replaceAll(`stroke="#b6b6b6"`, ``)
                }
                if (svgString.indexOf(`font-size="10px"`) > -1) {
                    svgString = svgString.replaceAll(`font-size="10px"`, `font-size="11px"`)
                }

                var imgURI = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
                imgsHtml = imgsHtml + `<div class="col-md-${col_md}"><img class="img-fluid mx-auto d-block" src="${imgURI}" alt=""></div>`;

                lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li style="color: rgb(0, 0, 0); font-size: 8px; font-weight: 800;">${chartconfigobj.chartXAxis}</li></ul></div>`;
                //lblsHtml = lblsHtml + `<div class="col-md-${col_md}"><ul class="legendsClass_L text-center" style="list-style: none; padding:0;"><li><span class="markerClass_M" style="background-color: #be2020;"></span><strong>${chartconfigobj.chartXAxis}</strong></li></ul></div>`;

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }
            debugger;
            html = html + `<div style="padding-top:20px" class="col-md-12">
<div class="row align-items-center">

${legendsHtml}
</div></div>`;

            html = html + `<div class="col-md-12">
<div class="row align-items-center">
${imgsHtml}
</div></div>`;

            html = html + `<div class="col-md-12">
<div class="row align-items-center">
${lblsHtml}
</div></div>`;

            html = html + `</div>`;


        }

    }
    html = html + "</div>"
    $('#png_charts').append(html);
    if (CancelPng) {
        $('#png_charts').remove();
        var cinda = 0;
        $(".preloader").css('background', '#333333d1');
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }
        $('body').css('color', bodyColor);
        window.devicePixelRatio = dpr;
        totalChartsCount = 0;
        loopChartsCount = 0;
        loading_end(false);
        return false;
    }
    ab_rows_png = $("div[id^='png_chart_']");
    totalChartsCount = ab_rows_png.length;
    //getBase64ById(ab_rows_png[0].id, 0)
    getBase64ByIdForPowerPoint(ab_rows_png[0].id, 0);
    //GetPngImages();   umar wala function
}
function getBase64ByIdForPowerPoint(id, index) {
    var element = document.getElementById("png_charts");
    debugger;
    //original code
    //element.scrollHeight 
    // $(".preloader").css('background', '#333333d1');
    
    html2canvas(element, { windowWidth: element.scrollWidth, windowHeight: element.scrollHeight }).then(function (canvas) {
        //html2canvas(element, { windowWidth: 250, windowHeight: 303 }).then(function (canvas) {
        var base64image = canvas.toDataURL("image/png");
        //downloadBase64File(base64image, "aiwen.png");

        // var solution = base64image.split("base64,")[1];
        chartBases.push(base64image);
        loopChartsCount++;



        //  $('#png_charts').remove();

        DownLoadPowerPointDataAfterCreatingImages(chartBases);

    });
    // Simple Slide
   
 

}
async function DownLoadPowerPointDataAfterCreatingImages(base64strings) {
    debugger;
    CancelPng = false;
    
    var html = '';
    var imagehtml = '';
    do7cells(base64strings);

   
 
    chartBases = [];
}

function do7cells(base64strings) {
    let pptx = new PptxGenJS();
    $('small').before('<code class="d-block text-black-50 mb-3">(pptxgenjs version: ' + pptx.version + ')</code>');


    let opts = {
        x: 0.0,
        y: 0.25,
        w: 6.0,
        h: 3.0,
        align: 'center',
        fontSize: 24,
        color: '0088CC',
        fill: 'F1F1F1'
    };
    //slide.addText(
    //    'BONJOUR - CIAO - GUTEN TAG - HELLO - HOLA - NAMASTE - OLÀ - ZDRAS-TVUY-TE - こんにちは - 你好',
    //    opts
    //);
    var slidename = "slide";
    for (var x = 0; x < base64strings.length; x++) {
        slidename = slidename + x;
         slidename= pptx.addSlide();
        slidename.addImage({ data: base64strings[x], x: 0.0, y: 0.25, w: 10.0, h: 5.0 });
    /*    slidename.addImage({ data: base64strings[x], opts});*/
    }

    pptx.writeFile();
    loading_end(false);
}