var maxHorizontalCharts = 4; //should not be more than 4 in any case
var chartIds = [];
var switchcount = 11;
var firstrow = false;
var RowNumberChartCol = 3;
var RowOtherChartCol = 12;
var fontSizesArray = ['8', '9', '10', '11', '12', '13', '14', '15', '18', '22',  '36',];
function AddNewRow() {

    if (firstrow == true && !getpermissionstatus("NewRow")) {
        if ($("#main_div > div").length > 0 ) {
            popupShow("Update Your Package Plan", "fail");
            return false;
        }

    }
    firstrow = true;
    var randomId = random(14);
    var html = `<div id="${randomId}" class="row height87">
                    <div  class="tool-menu-to-be-append" id="div_Nav${randomId}">
                    </div>
                    <div class="col-md-12 dynamic-grid" >
                    <div class="card hieght100" style="min-height:510px;margin-left:8px">
                        <div>
                            <div class="card-body ">
                                <div class="container title">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 id="row_heading_${randomId}" class="card-title pt-50"> Drag & Drop a Field on a Chart </h4>
                                        </div>
                                <div id="row_cross_${randomId}" class="col-md-6 d-none">
                                    <a onclick="RemoveRow('${randomId}')" style="color:red; cursor:pointer; float:right;font-size:12px;margin-top:14px;" class="delrowbtn">Delete</a>
                                </div>
                            </div>
                            </div>
                            <hr />
                            <div id="big_charts_${randomId}">
                                <div class="container charts">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div id="bar_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Bar.svg" />
                                                <h4 class="card-title">Bar</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div id="line_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Line.svg" />
                                                <h4 class="card-title">Line</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div id="mixed_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Mixed.svg" />
                                                <h4 class="card-title">Mixed</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div id="scatter_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Scatter.svg" />
                                                <h4 class="card-title">Scatter</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div id="number_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Number.png" />
                                                <h4 class="card-title">Number</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div id="pie_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Pie.svg" />
                                                <h4 class="card-title">Pie</h4>
                                            </div>
                                        </div>
                                       <div class="col-md-4 offset-2">
                                            <div id="table_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Table.svg" />
                                                <h4 class="card-title">Table</h4>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div id="comments_chart_${randomId}" class="chart-box active">
                                                <img src="../../assets/images/icons/Comment.svg" />
                                                <h4 class="card-title fixpositionatrow">Comment</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="charts_data_${randomId}" class="row d-none"></div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="sidebar_${randomId}" class="col-md-3 add-new-chart d-none">
                <div class="card ">
                    <div>
                        <div class="card-body ">
                            <div id="bar_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Bar.svg" />
                                <h4 class="card-title">Bar</h4>
                            </div>
                            <div id="line_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Line.svg" />
                                <h4 class="card-title">Line</h4>
                            </div>
                            <div id="mixed_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Mixed.svg" />
                                <h4 class="card-title">Mixed</h4>
                            </div>
                            <div id="scatter_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Scatter.svg" />
                                <h4 class="card-title">Scatter</h4>
                            </div>
                            <div id="number_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Number.png" />
                                <h4 class="card-title">Number</h4>
                            </div>
                            <div id="pie_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Pie.svg" />
                                <h4 class="card-title">Pie</h4>
                            </div>
                           <div id="table_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Table.svg" />
                                <h4 class="card-title">Table</h4>
                           </div>
                            <div id="comments_chart_${randomId}_side" class="chart-box active">
                                <img src="../../assets/images/icons/Comment.svg" />
                                <h4 class="card-title fixpositionatrow">Comment</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

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
    if (droppedd) {
        return;
    }

    if (!getpermissionstatus("NoOfCharts") && chartsconfigurations.length > 2) {
        popupShow("Update Your Package Plan", "fail");
        return false;
    }
    $("#" + randomId).removeClass("height87");
    $("#" + randomId).children().find(".container.title").removeClass("container");
    var card = $("#" + randomId).children().find(".hieght100").removeClass("hieght100");
    var card = $("#" + randomId).children().find(".card-title").removeClass("pt-50");
    $(card).removeClass("height100");
    $("#new_row_btn").css("display", "block");
    $(`#${randomId} .dynamic-grid`).removeClass("col-md-12");
    $(`#${randomId} .dynamic-grid`).addClass("col-md-9");
    switchcount++;
    $(`#new_row_btn`).removeClass('d-none');
    //abledisableNewRowButton();
    $(`#big_charts_${randomId}`).addClass('d-none');
   // $(`#charts_data_${randomId}`).addClass('chartheights');
    $(`#sidebar_${randomId}`).removeClass('d-none');
    $(`#charts_data_${randomId}`).removeClass('d-none');
    $(`#row_cross_${randomId}`).addClass('d-none');

    var randomChartId = random(14);
    var id = $(this2).attr('id');
    var chartType = id.replace('_' + randomId, '');
    chartType = chartType.replace('_side', '');
    chartIds.push(`chart_${randomChartId}`);

    var html_chartarea = `<div id="chart_div_${randomChartId}">
                                    <div class="row">

<div class="col-md-12 deletebuttonstyle">

                                    <a onclick="RemoveChart('${randomId}','${randomChartId}')" style="color:red; float:right; cursor:pointer;font-size:12px">Delete</a>
 <a id="LockTable_${randomChartId}" class='LockTableButtonStyle d-none' onclick="LockUnLockChart('${randomChartId}')" style="">Lock</a><span id="BlockRowsBlock_${randomChartId}" class=BlockRowsBlock><span class=BlockRowsTitle>Rows:</span><b class=BlocRowsTotal id="BlockRows_${randomChartId}">8</b><b class=BlockRowsMinus onclick=MinusBlockRows("${randomChartId}")> -</b><b class=BlockRowsPlusSpan onclick=PlusBlockRows("${randomChartId}")> +</b></span>
<a id="reset_chart_${randomChartId}" onclick="ResetZoom('${randomId}','${randomChartId}')" style="color:blue;display:none; float:right; cursor:pointer;font-size:12px;margin-right:10px">Reset Zoom</a>

<a id='anc_${randomChartId}' onclick="HideShowTotalDiv('${randomId}','${randomChartId}')" style="color:#4d79f6;  cursor:pointer;font-size:12px;margin-left:22px">Show Total</a>
</div></div>

                              <div id="legenddiv_chart_${randomChartId}" class="col-md-12" style='display:inline'></div>

                                    <div data-charttype="" id="chart_${randomChartId}" style="width:100%;margin: 0 auto"></div>
                                    <div id="divchart_${randomChartId}" class="row" style="margin-top: -18px;"><div class="col-md-12 justify-content-center align-items-center d-flex">
                                        <a onclick="RemovexaxisChart('','${randomChartId}')" style="color: white;height: 20px;width: 20px;background-color: #be2020;border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;">x</a>
                                        <text font-family="Helvetica, Arial, sans-serif" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="600" fill="#373d3f" class="apexcharts-text apexcharts-xaxis-title-text test" style="font-family: Helvetica, Arial, sans-serif;margin-left: 5;"><b style='color:black;font-size:12px;font-weight:800'  id="bchart_${randomChartId}"></b></text>
                                    </div></div>
                                    <div id="comments_parent_div_${randomChartId}" class="row">
                                        <a class="comment-btn" onclick="ShowHideComments('${randomChartId}')" style="margin-left:15px;color:#4d79f6;font-size: 12px;cursor: pointer;margin-top: 20px; margin-bottom: 10px;">Comment</a>
                                        <div class="row d-none" id="cwr_div_${randomChartId}" style="margin-left:15px; margin-top: 20px;">
                                            <input class="mt-1 mr-1" type="checkbox" id="cwr_${randomChartId}" onchange="hide_row_comments('${randomId}','${randomChartId}')">
                                            <label>Expand</label>
                                        </div>
                                    </div>
                                    <div id="comments_${randomChartId}" class="form-group notes d-none" style="display:none;">

                                        <div id="comments_text_${randomChartId}" class="summernote"></div>
                                    </div>
                                    
                                </div>`;

    $(`#charts_data_${randomId}`).append(html_chartarea);

    $(`#chart_${randomChartId}`).attr('data-charttype', chartType);



    $(`#comments_text_${randomChartId}`).summernote({
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
           /* ['fontsize', 20],*/
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ],
        fontSizes: fontSizesArray,//['8', '9', '10', '11', '12', '13','14','15','16','17', '18','19','20','21','22','23', '24', '36', '48', '64', '82', '150'],
        tooltip: false,
        lineWrapping: true
    });
   // $('.note-editable > p').css('font-size', '14px');
    $(`#comments_text_${randomChartId} .note-btn-bold`).removeClass("active");
    var totalChartsInDiv = $(`#charts_data_${randomId} > div`).length;
  //  var col_md = 12 / totalChartsInDiv;

    if (totalChartsInDiv >= maxHorizontalCharts) {
        $(`#sidebar_${randomId}`).addClass('d-none');
        $(`#${randomId} .dynamic-grid`).addClass("col-md-12");
        $(`#${randomId} .dynamic-grid`).removeClass("col-md-9");
    }
    var numberchart = false;
    if (chartType == "number_chart") {
        numberchart = true;
    }
     adjustRowChartsWidth(randomId);
   




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

        updatechart('x', cat, chartType, `chart_${randomChartId}`);

        $(`#chart_${randomChartId}`).droppable({
            accept: ".field",
            drop: function (event, ui) {
                updatechart('y', ui.draggable.attr('category'), chartType, `chart_${randomChartId}`);
            }
        });

        if (comments_for_row.indexOf(randomId) > -1) {
            $(`#comments_parent_div_${randomChartId}`).addClass('d-none');
            $(`#comments_${randomChartId}`).addClass('d-none');
        }
    setTimeout(function () {
        AutoAdjustWholeComment(randomId);
    }, 550);
       
    
   
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
    if (chartsconfigurations.length < 1 && $(".dynamic-grid").length == 1) {
        $("#new_row_btn").css("display", "none");
        $(".delrowbtn").css("display", "none");

    }
}

function ShowHideComments(charId) {
    //  $(`#comments_${charId}`).slideToggle();
    $(".comment-btn").css("bottom", "155px")
    if ($(`#comments_${charId}`).hasClass('d-none')) {
        //show comment box
        $(`#comments_${charId}`).removeClass('d-none');
        $(`#comments_${charId}`).css('display', 'block');

        var comments = $("#comments_text_" + charId).summernote('code');
       
        if (comments.length === 0 || comments === '<p><br></p>') {
            $("#comments_text_" + charId).summernote('reset');
        }
        
        $(`#cwr_div_${charId}`).removeClass('d-none');
    }
    else {
        //hide comment box
        $(".comment-btn").css("bottom", "-20px")
        $(`#comments_${charId}`).addClass('d-none');
        $(`#comments_${charId}`).css('display', 'none');

        $(`#cwr_div_${charId}`).addClass('d-none');
    }
}


$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('videoTutorial')) {
        if (searchParams.get('videoTutorial') == 'true') {
            setTimeout(function () {
                ShowVedioTutorials();
                $("#VedioTutorial").trigger('click');
            },200)
         
        }
    }
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

function hide_row_comments(row_id, chart_id) {
    document.getElementById(`cwr_${chart_id}`).checked = false;

    var rows = $("div[id^='charts_data_" + row_id + "']");
    comments_for_row.push(row_id);

    for (var j = 0; j < rows.length; j++) {
        var charts = rows[j].children;
        for (var i = 0; i < charts.length; i++) {
            var ChartId = charts[i].id.replace('chart_div_', '');
            $(`#comments_parent_div_${ChartId}`).addClass('d-none');
            $(`#comments_${ChartId}`).addClass('d-none');

            document.getElementById(`cwr_${ChartId}`).checked = false;
        }
    }

    var myElem = $(`#comments_parent_div_${row_id}`).length;
    if (myElem === 0) {
        var new_comments_html = `<div id="comments_parent_div_${row_id}" class="row">
                                <a class="comment-btn" onclick="ShowHideComments('${row_id}')" style="margin-left:15px;color:#4d79f6;font-size: 12px;cursor: pointer;margin-top: 20px; margin-bottom: 10px;">Comment</a>
                                <div class="row d-none" id="cwr_div_${row_id}" style="margin-left:15px; margin-top: 20px;">
                                    <input class="mt-1 mr-1" type="checkbox" id="cwr_${row_id}" checked onchange="show_row_comments('${row_id}')">
                                    <label>Resize</label>
                                </div>
                            </div>
                            <div id="comments_${row_id}" class="form-group notes d-none" style="display:none;">
                                <div id="comments_text_${row_id}" class="summernote"></div>
                            </div>`;
        $(`#${row_id} .dynamic-grid .card-body`).append(new_comments_html);

        $(`#comments_text_${row_id}`).summernote({
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ],
            tooltip: false
        });

        ShowHideComments(row_id);
    }
    else {
        $(`#comments_parent_div_${row_id}`).removeClass('d-none');
        $(`#comments_${row_id}`).removeClass('d-none');
    }

    //$(`#comments_text_${row_id}`).summernote('reset');
    //Assign previous comments
    $(`#comments_text_${row_id}`).summernote('code', $("#comments_text_" + chart_id).summernote('code'));
    AutoAdjustWholeComment(row_id);
}

function AutoAdjustWholeComment(row_id) {
    //var rows = $("div[id^='charts_data_" + row_id + "']");
    var rows = $("#charts_data_" + row_id);
    var rcount = rows[0].children.length;

    if (rcount === 1) {
        $(`#comments_${row_id}`).css({ "margin-left": "-8px", "margin-right": "4px" });
        $(`#comments_parent_div_${row_id}`).css({ "margin-left": "-16px", "margin-top": "0px" });
    }
    else if (rcount === 2 || rcount === 3) {
        $(`#comments_${row_id}`).css({ "margin-left": "4px", "margin-right": "4px" });
        $(`#comments_parent_div_${row_id}`).css({ "margin-left": "-4px", "margin-top": "0px" });
    }
    else if (rcount === 4) {
        $(`#comments_${row_id}`).css({ "margin-left": "-8px", "margin-right": "4px" });
        $(`#comments_parent_div_${row_id}`).css({ "margin-left": "-16px", "margin-top": "-1px" });
    }
}

function show_row_comments(row_id) {
    document.getElementById(`cwr_${row_id}`).checked = true;
    var rows = $("div[id^='charts_data_" + row_id + "']");
    comments_for_row = comments_for_row.filter(item => item !== row_id);

    for (var j = 0; j < rows.length; j++) {
        var charts = rows[j].children;
        for (var i = 0; i < charts.length; i++) {
            var ChartId = charts[i].id.replace('chart_div_', '');
            $(`#comments_parent_div_${ChartId}`).removeClass('d-none');
            $(`#comments_${ChartId}`).removeClass('d-none');
        }
    }

    $(`#comments_parent_div_${row_id}`).addClass('d-none');
    $(`#comments_${row_id}`).addClass('d-none');
}

function adjustRowChartsWidth(randomId) {
    var rowchartwithoutnumber = 0;
    var rownumbercharts = 0;
    var rowchartlength = $(`#charts_data_${randomId} > div`).length;
    $(`#charts_data_${randomId} > div`).each((index, elem) => {
      
        var chartid = "chart_" + elem.id.split('_')[2];
        var oldtype = $("#" + chartid).attr("data-charttype");
        if (oldtype == "number_chart" || oldtype =="comments_chart") {
            rownumbercharts++;
            //  $(`#${elem.id}`).addClass('col-md-3');
        }
        else {
            rowchartwithoutnumber++;
        }
    });

     RowOtherChartCol = 12 / rowchartwithoutnumber;
    RowNumberChartCol = 3;
    if (rowchartwithoutnumber == 0) {
        RowNumberChartCol = 12 / rowchartlength;
    }
    if (rownumbercharts == 1 && rowchartwithoutnumber == 1) {
        RowOtherChartCol = 9 / rowchartwithoutnumber;
    }
    if (rownumbercharts == 1 && rowchartwithoutnumber == 2) {
        RowNumberChartCol = 4;
        RowOtherChartCol = 8 / rowchartwithoutnumber;
    }
    if (rownumbercharts == 1 && rowchartwithoutnumber == 3) {
        RowOtherChartCol = 9 / rowchartwithoutnumber;
    }
    if (rownumbercharts == 2 && rowchartwithoutnumber == 2) {
        RowOtherChartCol = 6 / rowchartwithoutnumber;
    }
    if (rownumbercharts == 3 && rowchartwithoutnumber == 1) {
        RowOtherChartCol = 3 / rowchartwithoutnumber;
    }
    if (rownumbercharts == 2 && rowchartwithoutnumber == 1) {
        RowOtherChartCol = 6 / rowchartwithoutnumber;
    }
   $(`#charts_data_${randomId} > div`).each((index, elem) => {
        $(`#${elem.id}`).removeClass('col-md-12');
        $(`#${elem.id}`).removeClass('col-md-6');
        $(`#${elem.id}`).removeClass('col-md-4');
        $(`#${elem.id}`).removeClass('col-md-3');
        $(`#${elem.id}`).removeClass('col-md-8');
        $(`#${elem.id}`).removeClass('col-md-9');
      //  $(`#${elem.id}`).addClass('col-md-' + col_md);
        var chartid = "chart_" + elem.id.split('_')[2];
        var oldtype = $("#" + chartid).attr("data-charttype");
       if (oldtype == "number_chart" || oldtype == "comments_chart" ) {
            $(`#${elem.id}`).addClass('col-md-' + RowNumberChartCol);
        }
        else if (oldtype != "number_chart") {
            $(`#${elem.id}`).addClass('col-md-' + RowOtherChartCol);
        }

    //   //else if (oldtype != "number_chart" && !numberchart) {
    //   //     $(`#${elem.id}`).addClass('col-md-' + RowOtherChartCol);
    //   // }
    //   // else if (oldtype != "number_chart") {
    //   //     $(`#${elem.id}`).addClass('col');
    //   // }
    });
}
