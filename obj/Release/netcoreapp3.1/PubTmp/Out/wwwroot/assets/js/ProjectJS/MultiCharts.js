var maxHorizontalCharts = 4; //should not be more than 4 in any case
var chartIds = [];
var switchcount = 11;
var firstrow = false;
function AddNewRow() {

    if (firstrow == true && !getpermissionstatus("NewRow")) {
        if ($("#main_div > div").length > 0) {
            popupShow("Update Your Package Plan", "fail");
            return false;
        }

    }

    firstrow = true;
    var randomId = random(14);

    var html = `<div id="${randomId}" class="row">
<div  class="tool-menu-to-be-append" id="div_Nav${randomId}">
</div>
            <div class="col-md-12 dynamic-grid" >
                <div class="card" style="min-height:510px;margin-left:8px">
                    <div>
                        <div class="card-body ">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 id="row_heading_${randomId}" class="card-title">Drop a field on chart</h4>
                                </div>
                                <div id="row_cross_${randomId}" class="col-md-6 d-none">
                                    <a onclick="RemoveRow('${randomId}')" style="color:red; cursor:pointer; float:right;font-size:12px;">Delete</a>
                                </div>
                            </div>
                            <hr />
                            <div id="big_charts_${randomId}">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div id="bar_chart_${randomId}" class="chart-box active">
                                            <img src="../../assets/new/bar.png" />
                                            <h4 class="card-title">Bar Chart</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div id="line_chart_${randomId}" class="chart-box active">
                                            <img src="../../assets/new/line.png" />
                                            <h4 class="card-title">Line Chart</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div id="mixed_chart_${randomId}" class="chart-box active">
                                            <img src="../../assets/new/mixed.png" />
                                            <h4 class="card-title">Mixed Chart</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div id="scatter_chart_${randomId}" class="chart-box active">
                                            <img src="../../assets/new/scatter.png" />
                                            <h4 class="card-title">Scatter Chart</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div id="number_chart_${randomId}" class="chart-box active">
                                            <img src="../../assets/new/number.png" />
                                            <h4 class="card-title">Number Chart</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div id="pie_chart_${randomId}" class="chart-box active">
                                            <img src="../../assets/new/pie.png" />
                                            <h4 class="card-title">Pie Chart</h4>
                                        </div>
                                    </div>
                                   <div class="col-md-4">
                                                <div id="table_chart_${randomId}" class="chart-box active">
                                                    <img src="../../assets/new/tablegrid.jpg" style="height:80px" />
                                                    <h4 class="card-title">TableChart</h4>
                                                </div>
                                            </div>
                                </div>
                            </div>

                            <div id="charts_data_${randomId}" class="row d-none"></div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="sidebar_${randomId}"  class="col-md-3 add-new-chart d-none">
                <div class="card ">
                    <div>
                        <div class="card-body ">
                            <div id="bar_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/new/bar.png" />
                                <h4 class="card-title">Bar Chart</h4>
                            </div>
                            <div id="line_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/new/line.png" />
                                <h4 class="card-title">Line Chart</h4>
                            </div>
                            <div id="mixed_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/new/mixed.png" />
                                <h4 class="card-title">Mixed Chart</h4>
                            </div>
                            <div id="scatter_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/new/scatter.png" />
                                <h4 class="card-title">Scatter Chart</h4>
                            </div>
                            <div id="number_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/new/number.png" />
                                <h4 class="card-title">Number Chart</h4>
                            </div>
                            <div id="pie_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/new/pie.png" />
                                <h4 class="card-title">Pie Chart</h4>
                            </div>
                           <div id="table_chart_${randomId}_side" class="chart-box active">
                           <img src="../../assets/new/tablegrid.jpg" style="height:40px" />
                           <h4 class="card-title">Table Chart</h4>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    //<div class="col-md-4">
    //    <div id="table_chart_${randomId}" class="chart-box active">
    //        <img src="../../assets/new/tablegrid.jpg" style="height:80px" />
    //        <h4 class="card-title">TableChart</h4>
    //    </div>
    //</div>

    //<div id="table_chart_${randomId}_side" class="chart-box active">
    //    <img src="../../assets/new/tablegrid.jpg" style="height:40px" />
    //    <h4 class="card-title">Table Chart</h4>
    //</div>


    $('#main_div').append(html);

    $(`#${randomId} .chart-box.active`).droppable({
        accept: ".field",
        drop: function (event, ui) {
            alabad(event, ui, randomId, this);
        },
        over: function (event, elem) {
            $(this).addClass("over");
        }
        ,
        out: function (event, elem) {
            $(this).removeClass("over");
        }
    });

    var RowsCount = $("div[id^='charts_data_']").length;
    if (RowsCount > 1) {
        $(`#row_cross_${randomId}`).removeClass('d-none');
    }
    else {
        $(`#row_cross_${randomId}`).addClass('d-none');
    }
}

function alabad(event, ui, randomId, this2) {
    if (!getpermissionstatus("NoOfCharts") && chartsconfigurations.length > 0) {
        popupShow("Update Your Package Plan", "fail");
        return false;
    }


    $(`#${randomId} .dynamic-grid`).removeClass("col-md-12");
    $(`#${randomId} .dynamic-grid`).addClass("col-md-9");
    switchcount++;
    $(`#new_row_btn`).removeClass('d-none');
    //abledisableNewRowButton();
    $(`#big_charts_${randomId}`).addClass('d-none');
    $(`#sidebar_${randomId}`).removeClass('d-none');
    $(`#charts_data_${randomId}`).removeClass('d-none');
    $(`#row_cross_${randomId}`).addClass('d-none');

    var randomChartId = random(14);
    var id = $(this2).attr('id');
    var chartType = id.replace('_' + randomId, '');
    chartType = chartType.replace('_side', '');
    chartIds.push(`chart_${randomChartId}`);

    //<h4 class="card-title">Comments</h4>

    var html_chartarea = `<div id="chart_div_${randomChartId}">
                                    <div class="row">
<div class="col-md-12 deletebuttonstyle">

                                    <a onclick="RemoveChart('${randomId}','${randomChartId}')" style="color:red; float:right; cursor:pointer;font-size:12px">Delete</a>
  <a id='anc_${randomChartId}' onclick="HideShowTotalDiv('${randomId}','${randomChartId}')" style="color:#4d79f6;  cursor:pointer;font-size:12px;margin-left:22px">Show Total</a>
</div></div>

                             

                                    <div data-charttype="" id="chart_${randomChartId}"></div>
                                    <div id="divchart_${randomChartId}" class="row" style="margin-top: -18px;"><div class="col-md-12 justify-content-center align-items-center d-flex">
                                        <a onclick="RemovexaxisChart('','${randomChartId}')" style="color: white;height: 20px;width: 20px;background-color: #be2020;border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;">x</a>
                                        <text font-family="Helvetica, Arial, sans-serif" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="600" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-title-text test" style="font-family: Helvetica, Arial, sans-serif;margin-left: 5;"><b style='color:black;font-size:12px;font-weight:800'  id="bchart_${randomChartId}"></b></text>
                                    </div></div>
                                    <a class="comment-btn" onclick="ShowHideComments('${randomChartId}')" style="color:#50649c;font-size: 12px;cursor: pointer;margin-top: 10px; margin-bottom: 10px;">Comment</a>
                                    <div id="comments_${randomChartId}" class="form-group notes d-none" style="display:none;">

                                        <div id="comments_text_${randomChartId}" class="summernote"></div>
                                    </div>
                                    
                                </div>`;







    //var toolsMenu = `<nav id="snav_${randomChartId}" style="display:none" class="navbar navbar-expand-lg navbar-light bg-light tools-menu">
    //                                      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    //                                        <span class="navbar-toggler-icon"></span>
    //                                      </button>
    //                                      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    //                                        <input type=hidden id="txtseriesname_${randomChartId}" />
    //                                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    //                                          <li class="nav-item">
    //                                            <div class="tool">
    //                                                <label id="lbl_${randomChartId}" style="font-size:12px">Style</label>
    //                                                <div class="icon mixed " onclick=changeseriestype("${randomChartId}","bar") >
    //                                                    <img class="seriestypeborder" id="stypebar_${randomChartId}" src="../../assets/new/mixed.png" />
    //                                                    <label class="icon-label">Bar</label>
    //                                                </div>
    //                                                <div class="icon bar d-none" onclick=changeseriestype("${randomChartId}","stacked")>
    //                                                    <img  id="stypestacked_${randomChartId}" src="../../assets/new/bar.png" />
    //                                                    <label class="icon-label">Stacked</label>
    //                                                </div>
    //                                                <div class="icon" onclick=changeseriestype("${randomChartId}","line") >
    //                                                    <img id="stypeline_${randomChartId}" src="../../assets/new/line.png" />
    //                                                    <label  class="icon-label">Line</label>
    //                                                </div>
    //                                                <div class="icon" onclick=changeseriestype("${randomChartId}","dotline") >
    //                                                    <img id="stypedotted_${randomChartId}" src="../../assets/new/dotted-line.png" />
    //                                                    <label class="icon-label">Dot Line</label>
    //                                                </div>
    //                                                <div class="icon" onclick=changeseriestype("${randomChartId}","area") >
    //                                                    <img id="stypearea_${randomChartId}" src="../../assets/new/area.png" />
    //                                                    <label class="icon-label">Area</label>
    //                                                </div>
    //                                            </div>
    //                                          </li>
    //                                          <li class="nav-item">
    //                                            <div class="tool">
    //                                                <label>Axis</label>
    //                                                <div class="set-axis">
    //                                                   <button class="axis active btn-1" onclick=movetoleftaxis("stypeaxis1_${randomChartId}") id="stypeaxis1_${randomChartId}">1</button>
    //                                                   <button class="axis btn-2" onclick=movetooppositeaxis("stypeaxis2_${randomChartId}") id="stypeaxis2_${randomChartId}">2</button>
    //                                                </div>
    //                                            </div>
    //                                          </li>
    //                                          <li class="nav-item">
    //                                            <div class="tool">
    //                                                <label>Labels</label>
    //                                                <div class="custom-control custom-switch mb-2" dir="ltr">
    //                                                    <input name="radio" type="checkbox" class="custom-control-input  stylebarlabel" id="slabel_${randomChartId}"   checked="checked">
    //                                                    <label class="custom-control-label " for="slabel_${randomChartId}"></label>
    //                                                </div>
    //                                            </div>
    //                                          </li>
    //                                          <li class="nav-item">
    //                                            <div class="remove">
    //                                             <button type="button" class="btn btn-dark" id="remove_${randomChartId}" onclick="RemoveThisSeries(remove_${randomChartId})">Remove</button>
    //                                            </div>
    //                                          </li>
    //                                          <li>
    //                                             <button type="button"  style="height:30;margin-top:12"  onclick="closestylebar(snav_${randomChartId})">&times;</button>
    //                                           </li>
    //                                        </ul>
    //                                      </div>
    //                                    </nav>`;



    $(`#charts_data_${randomId}`).append(html_chartarea);
    //$(`#chart_div_${randomChartId}`).prepend(toolsMenu);

    $(`#chart_${randomChartId}`).attr('data-charttype', chartType);



    $(`#comments_text_${randomChartId}`).summernote({
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });

    var totalChartsInDiv = $(`#charts_data_${randomId} > div`).length;
    var col_md = 12 / totalChartsInDiv;
    if (totalChartsInDiv >= maxHorizontalCharts) {
        $(`#sidebar_${randomId}`).addClass('d-none');
        $(`#${randomId} .dynamic-grid`).addClass("col-md-12");
        $(`#${randomId} .dynamic-grid`).removeClass("col-md-9");
    }
    $(`#charts_data_${randomId} > div`).each((index, elem) => {
        $(`#${elem.id}`).removeClass('col-md-12');
        $(`#${elem.id}`).removeClass('col-md-6');
        $(`#${elem.id}`).removeClass('col-md-4');
        $(`#${elem.id}`).removeClass('col-md-3');
        $(`#${elem.id}`).addClass('col-md-' + col_md);
    });

    if (!$('.tools-menu').parent().hasClass("col-md-12")) {
        if ($(window).width() > 767) {
            $('.tools-menu').addClass('responsive');

        }
        else {
            $('.tools-menu').removeClass('responsive');
        }

        $('.tools-menu ul li .tool').css({ 'padding': '20px 0 20px 0' });
    }

    var cat = ui.draggable.attr('category');
    //   

    debugger
    updatechart('x', cat, chartType, `chart_${randomChartId}`);

    $(`#chart_${randomChartId}`).droppable({
        accept: ".field",
        drop: function (event, ui) {
            //
            updatechart('y', ui.draggable.attr('category'), chartType, `chart_${randomChartId}`);
            // debugger;
            //var id = `chart_${randomChartId}`;
            //var chcksroll = $("#" + id).children().find(".apexcharts-legend");
            //if (chcksroll.get(0).scrollWidth > chcksroll.width()) {

            //    chcksroll.addClass("js-left");
            //}
            //else {

            //    chcksroll.removeClass("js-left");
            //}

        }



    });



}

function RemoveRow(rowId) {
    $(`#charts_data_${rowId} > div`).each((index, elem) => {
        var chartid = elem.id.replace('_div', '');
        chartIds = chartIds.filter(e => e !== chartid);
        $.each(chartIns, function (i) {
            if (chartIns[i].id === chartid) {
                chartIns.splice(i, 1);
                return false;
            }
        });
    });

    $(`#${rowId}`).remove();
    if ($("#main_div > div").length < 1) {
        AddNewRow();
        $(`#new_row_btn`).addClass('d-none');
    }
}

function RemoveChart(rowId, charId) {
    //
    debugger;
    chartIds = chartIds.filter(e => e !== `chart_${charId}`);
    $(`#chart_div_${charId}`).remove();
    var oldchartid = "chart_" + charId;
    var chartindex = chartsconfigurations.findIndex(x => x.chartId == oldchartid);
    chartsconfigurations.splice(chartindex, 1);
    var totalChartsInDiv = $(`#charts_data_${rowId} > div`).length;
    if (totalChartsInDiv == 0) {
        RemoveRow(rowId);
        return;
    }
    var col_md = 12 / totalChartsInDiv;

    $(`#sidebar_${rowId}`).removeClass('d-none');
    $(`#${rowId} .dynamic-grid`).removeClass("col-md-12");
    $(`#${rowId} .dynamic-grid`).addClass("col-md-9");
    //RefreshAllCharts();

    if ($('.tools-menu').parent().hasClass("col-md-12")) {
        $('.tools-menu').removeClass('responsive');
        $('.tools-menu .navbar-nav').css('width', '100%');
    }

    if (!$('.tools-menu').parent().hasClass("col-md-4", "col-md-3")) {
        $('.responsive.tools-menu .navbar-nav').css('width', '50%');
    }
    $(`#charts_data_${rowId} > div`).each((index, elem) => {
        $(`#${elem.id}`).removeClass('col-md-12');
        $(`#${elem.id}`).removeClass('col-md-6');
        $(`#${elem.id}`).removeClass('col-md-4');
        $(`#${elem.id}`).removeClass('col-md-3');
        $(`#${elem.id}`).addClass('col-md-' + col_md);
        chartIns.find(x => x.id === `chart_${charId}`).instance.resetSeries();
    });

    $.each(chartIns, function (i) {
        if (chartIns[i].id === charId) {
            chartIns.splice(i, 1);
            return false;
        }
    });
}

function ShowHideComments(charId) {
    //  $(`#comments_${charId}`).slideToggle();
    $(".comment-btn").css("bottom", "155px")
    if ($(`#comments_${charId}`).hasClass('d-none')) {
        $(`#comments_${charId}`).removeClass('d-none');
        $(`#comments_${charId}`).css('display', 'block');
    }
    else {
        $(".comment-btn").css("bottom", "-20px")
        $(`#comments_${charId}`).addClass('d-none');
        $(`#comments_${charId}`).css('display', 'none');
    }
}


$(document).ready(function () {
    $(document).on("click", ".btn-1", function () {
        $(this).addClass('active');
        $(this).next().removeClass('active');
    })

    $(document).on("click", ".btn-2", function () {
        $(this).addClass('active');
        $(this).prev().removeClass('active');
    })


    $(document).on("click", ".tools-menu .navbar-toggler", function () {
        $(this).next().collapse('toggle');
    })

    $(document).on("click", ".tools-menu ul li .close", function () {
        $('.tools-menu').hide();
    })

    $(document).on("click", ".stylebarlabel", function () {
        hideshowlabel(this);
    })

    $(document).on("click", ".stylebartable", function () {
        hideshowbar(this);
    })

})