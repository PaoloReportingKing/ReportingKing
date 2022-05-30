var chartIns = [];
var chartStructure = [];
var sidebarOpened = true;

async function downloadCharts() {
    if (chartIds.length === 0) {
        return;
    }
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js"></script>
    //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css" />
    $(".preloader").css('background', '#333333');
    loading_start();

    sidebarOpened = !$("body").hasClass("enlarge-menu");

    if (sidebarOpened) {
        $(".button-menu-mobile").trigger("click");
    }

    setTimeout(GetPdfData, 2000);
}

async function GetPdfData() {
    var html = `<html lang="en" data-textdirection="ltr">
                    <head>
                        <style>
                            .legendsClass li {display:inline-block; padding-bottom: 5px; font-size:10px;}
                            .legendsClass .markerClass {margin-right:3px; margin-left:3px; color: white;height: 10px;width: 10px;border-radius: 50%;display: inline-block;cursor: pointer;align-items: center;justify-content: center;vertical-align: middle;}
                        </style>
                    </head>
                <body>
                    <div class="container-fluid">`;

    var rows = $("div[id^='charts_data_']");
    for (var j = 0; j < rows.length; j++) {
        html = html + `<div class="row" style="padding-top:20px; page-break-inside: avoid;">`;
        var charts = rows[j].children;
        for (var i = 0; i < charts.length; i++) {
            var ChartId = charts[i].id.replace('_div', '');
            var ChartObj = chartIns.find(x => x.id === ChartId);
            var chartconfigobj = chartsconfigurations.find(x => x.chartId == ChartId);

            //var comments = chartconfigobj.comments; //$('.summernote').eq(i).summernote("code");// $("#comments_text_" + ChartId.replace('chart_', '')).code(); //$($("#comments_text_" + ChartId.replace('chart_', '')).code()).text();//$($("#comments_text_" + ChartId.replace('chart_', '')).summernote("code")).text();
            var comments = $($("#comments_text_" + ChartId.replace('chart_', '')).summernote("code")).text();
            var col_md = 12 / charts.length;

            if (chartconfigobj.chartType == "table_chart") {
                // html = html + `<div class="col-md-${col_md}">` + GetTableChartDiv(chartconfigobj.chartId, false, chartconfigobj);
                html = html + `<div class="col-md-${col_md}">` + gettablefordownload(chartconfigobj);
            }
            else if (chartconfigobj.chartType == "number_chart") {
                html = html + `<div class="col-md-${col_md}">` + getnumberchartdivs(chartconfigobj, true);
            }
            else {
                var legendsHtml = ``;
                var legends = [];
                var rungs = chartconfigobj.chartselectedpallet;
                if (chartconfigobj.chartType == "pie_chart") {
                    legendsHtml = `<p style="text-align:center;">${chartconfigobj.chartYAxises[0].label}</p>`;
                    legends = chartconfigobj.chartXAxisShowLabels;
                }
                else {
                    for (var q = 0; q < chartconfigobj.chartYAxises.length; q++) {
                        legends.push(chartconfigobj.chartYAxises[q].label);
                    }
                }

                for (var w = 0; w < legends.length; w++) {
                    if (w == 0) {
                        legendsHtml = legendsHtml + `<ul class="legendsClass" style="list-style: none;">`;
                    }
                    legendsHtml = legendsHtml + `<li><span class="markerClass" style="background-color: ${rungs[w]};"></span>${legends[w]}</li>`;
                    if (w == legends.length - 1) {
                        legendsHtml = legendsHtml + `</ul>`;
                    }
                }
                ChartObj.instance.updateOptions({
                    legend: {
                        show: false
                    }
                });

                var imgResponse = await ChartObj.instance.dataURI();
                var imgURI = imgResponse.imgURI;

                html = html + `<div class="col-md-${col_md}">${legendsHtml}<img class="img-fluid" src="${imgURI}" alt="">`;
                if (chartconfigobj.chartType != "number_chart") {
                    html = html + `<div style="text-align:center"><p><a style="color: white;height: 15px;width: 15px;background-color: #be2020;border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;"></a><strong style="margin-left:5px">${chartconfigobj.chartXAxis}</strong></p></div>`;
                }

                ChartObj.instance.updateOptions({
                    legend: {
                        show: true
                    }
                });
            }


            if (comments.length > 0) {
                html = html + `<p><strong>Comments: </strong>${comments}</p></div>`;
            }
            else {
                html = html + `<p></p></div>`;
            }
        }
        html = html + `</div>`;
    }
    html = html + `</div></body></html>`;
    GeneratePdf(html);
}

function GeneratePdf(html) {
    var opt = {
        margin: [10, 0, 0, 0],
        //  margin: [10, 0, 10, 0],
        filename: new Date() + '_charts.pdf',
        image: { type: 'png', quality: 1 },
        //  pagebreak: { mode: ['avoid-all'] }
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    var myPdf = html2pdf().set(opt).from(html);

    setTimeout(() => {
        if (sidebarOpened) {
            $(".button-menu-mobile").trigger("click");
        }
        myPdf.save();
    }, 2000);

    setTimeout(() => {
        loading_end();
        $(".preloader").css('background', '#333333d1');
    }, 3000);
}