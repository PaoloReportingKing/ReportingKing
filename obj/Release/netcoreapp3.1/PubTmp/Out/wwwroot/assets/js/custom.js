$(".clr-pallet").click(function () {
    debugger;
    $(".filters").removeClass("d-none");
    $(".menu-fixed-top").hide();
    $("#iqonic-theme-list").show();
    $("#Fields").hide();

    $('.left-sidenav').css('min-width', '365px')
    $('#LeftSideFileUpload').removeClass('d-none')
    $('#InternalDashBoardSection').addClass('d-none')
});
$(".saved-temp").click(function () {
    $(".filters").addClass("d-none");
    $("#iqonic-theme-list").hide();
    $(".menu-fixed-top").show();
    $("#Fields").show();
})
$(".calculated-fields-link").click(function () {

    $("#iqonic-theme-list").hide();
    $(".menu-fixed-top").show();
    $("#Fields").show();

 
})
$(".fields-link").click(function () {
   // debugger;
    $(".menu-fixed-top").show();
    $("#iqonic-theme-list").hide();
    $("#Fields").show();
})
//Colums Setting
var count = 0;
//var options = {
//    series: [],
//    chart: {
//        height: 350,
//        type: 'line',
//        stacked: false,
//        toolbar: {
//            show: false,
//            offsetX: 0,
//            offsetY: 0,
//            tools: {
//                download: true,
//                selection: false,
//                zoom: true,
//                zoomin: true,
//                zoomout: true,
//                pan: false,
//                customIcons: [
//                    {
//                        icon: '<img src="delete.png" style=";margin-left:5px;" width="17">',
//                        index: 0,
//                        title: 'Delete',
//                        class: 'custom-icon',
//                        click: function (chart, options, e) {
//                            //$(".notes").slideToggle();
//                        }
//                    },

//                ]
//            },
//        },
//    },
//    stroke: {
//       // width: [0, 2, 5],
//        curve: 'smooth'
//    },
//    plotOptions: {
//        bar: {
//            columnWidth: '50%'
//        }
//    },

//    fill: {
//       // opacity: [0.85, 0.25, 1],
//        gradient: {
//            inverseColors: false,
//            shade: 'light',
//            type: "vertical",
//            opacityFrom: 0.85,
//            opacityTo: 0.55,
//            stops: [0, 100, 100, 100]
//        }
//    },
//    labels: [],
//    markers: {
//        size: 0
//    },
//    xaxis: {
//        type: 'datetime'
//    },
//    yaxis: {
//        //title: {
//        //    text: 'Points',
//        //},
//     //   min: 0
//    },
//    tooltip: {
//        shared: true,
//        intersect: false,
//        y: {
//            formatter: function (y) {
//                if (typeof y !== "undefined") {
//                    return y.toFixed(0) + " points";
//                }
//                return y;

//            }
//        }
//    }
//};
/*var chart = new ApexCharts(document.querySelector("#barchart"), options);*/

$(".dripicons-checklist").click(function () {
    $('body').toggleClass('right-bar-enabled');
})
$("#uploadfiles").click(function () {
    $(".fileupload").slideToggle();
    $(".canvas").slideToggle();
});
//$(".chartdraggable , .field").draggable({
//    revert: "invalid",
//    stack: ".draggable",
//    zIndex: 9999,
//    containment: "window",
//    helper: 'clone',
//    cursor: "crosshair", revert: "invalid"
//});
function makedropable() {
    $("#barchart").droppable();
}
//$(".chart-box.active").droppable({
//    accept: ".field",
//    drop: function (event, ui) {
//        $(this).removeClass("border").removeClass("over");
//        $(".note-btn").show();
//        $(".new-row").show();
//        $('.nochart').hide();
//        $(".dynamic-grid").removeClass("col-md-12");
//        $(".dynamic-grid").addClass("col-md-9");
//        $(".del").show();
//        var id = $(this).attr('id');
//        $('#barchart').attr('data-charttype', $(this).attr('id'))
//        $('#barchart').show();
//        $(".add-new-chart").show();
//        $(this).children().find(".card-title").show();
//        var dropped = $("#barchart");
//     //   chart.render();
//        var b = $("#barchart");
//        debugger;
//        var cat = ui.draggable.attr('category');
//        updatechart('x', cat, $('#barchart').attr('data-charttype'))
//        b.droppable();
//        b.droppable({
//            accept: ".field",
//            drop: function (event, ui) {

//                var dropped = "";
//                axis = 'y';
//                dropped = ui.draggable;
//                count++;

//                updatechart(axis, dropped.attr('category'), $('#barchart').attr('data-charttype'))
//                //  updatechart(axis, dropped.attr('category'))
//            }

//        });


//    },
//    over: function (event, elem) {
//        $(this).addClass("over");
//        console.log("over");
//    }
//    ,
//    out: function (event, elem) {
//        $(this).removeClass("over");
//    }
//});
$(".filters").droppable({
   
    accept: ".field",
    drop: function (event, ui) {

        $(".append-filter h4").hide();

        var droppeditem = ui.draggable.attr("category");

        var totalOptions = [];
        var totalFormattedOptions = [];
        $.each(fileData, function (i, item) {
            if (item[droppeditem] != null && item[droppeditem] != undefined) {
                if (item[droppeditem].toString().trim().length > 0) {
                    totalOptions.push(item[droppeditem]);
                }
            }
        });
        var uniqueOptions = totalOptions;
        //var uniqueOptions = [... new Set(totalOptions)];
        //uniqueOptions.sort();

        $.each(formattedFileData, function (i, item) {
            if (item[droppeditem] != null && item[droppeditem] != undefined) {
                if (item[droppeditem].toString().trim().length > 0) {
                    totalFormattedOptions.push(item[droppeditem]);
                }
            }
        });
        var uniqueFormattedOptions = totalFormattedOptions;
        //var uniqueFormattedOptions = [... new Set(totalFormattedOptions)];
        //uniqueFormattedOptions.sort();

        var options = '';
        $.each(uniqueOptions, function (i, item) {
            options = options + `<option value="${item}">${uniqueFormattedOptions[i]}</option>`;
        });

        var randomId = random(14);
        $("#main_div").css("padding-top", "185px");
        var html =
            '<div class="col-3">' +
            '<div id="' + randomId + '" class="form-group">' +
            `<label><a onclick="removeFilter('` + randomId + `')" style="color:red">X</a>&nbsp;&nbsp;&nbsp;<span>` + droppeditem + `</span></label>` +
            '<select onchange="updateFilterData()" class="form-control select2 " multiple="multiple">' +
            options +
            '</select>' +
            '</div>' +
            '</div>';
        $(".append-filter").append(html);

        //Get Unique Options
        var usedNames = {};
        $(`#${randomId} .form-control > option`).each(function () {
            if (usedNames[this.text]) {
                $(this).remove();
            } else {
                usedNames[this.text] = this.value;
            }
        });
        //Get Unique Options

        //Sort Options
        var selectOptions = $(`#${randomId} .form-control > option`);
        selectOptions.sort(function (a, b) {
            if (a.text > b.text) {
                return 1;
            }
            else if (a.text < b.text) {
                return -1;
            }
            else {
                return 0
            }
        });
        $(`#${randomId} .form-control`).empty().append(selectOptions);
        //Sort Options

        //test

        //var colLength = $('.filters .col-3').length;
        //if (colLength == 1) {
           // $(".filters").css('height', 100)
        //}
        //else if ((colLength % 4) == 1) {
           // $(".filters").css('height', $('.filters')[0].clientHeight + 80)
        //}


        $(".main-content").addClass('mt-40');


        $('.select2').select2({
            placeholder: "Filter Items",
        });

        //$('#' + randomId +' .select2').select2({
        //    placeholder: "Filter From " + droppeditem,
        //});
    },
    over: function (event, elem) {


    }
    ,
    out: function (event, elem) {
        $(this).removeClass("over");
    }
});

function removeFilter(id) {
    $(`#${id}`).parent().remove();
    updateFilterData();
    //var colLength = $('.filters .col-3').length;

    var filters = $('#filters .form-control');
    if (filters.length == 0) {
        $("#main_div").css("padding-top", "135px");
        //$(".filters").css('height', 60);
        $(".append-filter h4").show();
        //$(".main-content").removeClass('mt-40');
        //$(".filters").removeClass('height-100');
    }
    //else if ((colLength % 4) == 0) {
      //  $(".filters").css('height', $('.filters')[0].clientHeight - 80)
    //}
}

function updateFilterData() {
    filteredData = [];
    formattedFilteredData = [];

    var filters = $('#filters .form-control');
    var avail = false;
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].selectedOptions.length > 0) {
            avail = true;
            break;
        }
    }

    if (avail) {
        waqaiUpdateChart();
    }
    else {
      //  debugger;
        filteredData = fileData;
        formattedFilteredData = formattedFileData;
        RefreshAllCharts();
        //setxaxis();
        //rerenderchart();
    }
}

//function waqaiUpdateChart() {//With OR condition
//    var tempData = [];
//    var filters = $('#filters .form-control');
//    for (var i = 0; i < filters.length; i++) {
//        var parentId = $(filters[i]).parent().attr('id');
//        var colName = $(`#${parentId} label span`).text();
        
//        //var colName = filters[i].previousSibling.textContent;
//        for (var j = 0; j < filters[i].selectedOptions.length; j++) {
//            var value = filters[i].selectedOptions[j].textContent;
//            var data_filter = fileData.filter(element => element[colName] == value);
//            for (var k = 0; k < data_filter.length; k++) {
//                tempData.push(data_filter[k]);
//            }
//            //console.log(colName + " - " + filters[i].selectedOptions[j].text);
//        }
//    }

//    tempData.filter(function (item) {
//        var count = 0;
//        for (var i = 0; i < columnNames.length; i++) {
//            var xxx = filteredData.findIndex(x => x[columnNames[i]] == item[columnNames[i]]);
//            if (xxx > -1) {
//                count = count + 1;
//            }
//        }

//        if (count != columnNames.length) {
//            filteredData.push(item);
//        }
//    });

//   // setxaxis();
//    RefreshAllCharts();
//}

var asliFilters = [];
var asliFormattedFilters = [];
function waqaiUpdateChart() {
    asliFilters = [];
    asliFormattedFilters = [];
    var filters = $('#filters .form-control');
    for (var i = 0; i < filters.length; i++) {
        var parentId = $(filters[i]).parent().attr('id');
        var colName = $(`#${parentId} label span`).text();

        var RegisterEntry = {
            "Field": colName,
            "Values": []
        }
        var formattedRegisterEntry = {
            "Field": colName,
            "Values": []
        }

        for (var j = 0; j < filters[i].selectedOptions.length; j++) {
            var textValue = filters[i].selectedOptions[j].value;
            RegisterEntry.Values.push(textValue);
            var asliValue = filters[i].selectedOptions[j].textContent;
            formattedRegisterEntry.Values.push(asliValue);
        }

        if (RegisterEntry.Values.length > 0) {
            asliFilters.push(RegisterEntry);
        }

        if (formattedRegisterEntry.Values.length > 0) {
            asliFormattedFilters.push(formattedRegisterEntry);
        }
    }

    ProcessFilters();

    //filteredData = fileData.flexFilter(asliFilters);
    //formattedFilteredData = formattedFileData.flexFilter(asliFormattedFilters);
    
    RefreshAllCharts();
}

function ProcessFilters() {
    var indexes = [];
    
    asliFilters.forEach(function (el, i) {
        el.Values.forEach(function (item, j) {
            var colName = el.Field;
            var value = item;

            for (var x = 0; x < fileData.length; x++) {
                if (fileData[x][colName] == value) {
                    indexes.push(x);
                }
            }
        });
    });

    WaqaiProcessFilter(indexes, asliFilters.length);
}

function WaqaiProcessFilter(indexArray, taddad) {
    //debugger;
    for (var x = 0; x < fileData.length; x++) {
        var c = indexArray.filter(y => y == x).length;
        if (c === taddad) {
            filteredData.push(fileData[x]);
            formattedFilteredData.push(formattedFileData[x]);
        }
    }
}

Array.prototype.flexFilter = function (info) {
    return this.filter(item => {
        return info.every(i => {
            var mango = item[i.Field];
            if (mango === null || mango === undefined) {

            }
            else {
                return i.Values.indexOf(mango.toString()) > -1;
            }
        });
    });
}

const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};

//function updatechart(axis, cat) {
//    debugger;
//    if (axis == 'x') {
//        chart.updateOptions({
//            xaxis: {
//                type: 'datetime',
//                categories: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
//                ],
//            },

//        })
//    }
//    else {
//        if (cat == "Team A") {
//            chart.appendSeries({
//                name: 'TEAM A',
//                type: 'column',
//                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//            })
//        }
//        else if (cat == "Team B") {
//            chart.appendSeries({
//                name: 'TEAM B',
//                type: 'area',
//                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//            })
//        }

//        else if(cat == "Team C") {
//            chart.appendSeries({
//                    name: 'TEAM C',
//                    type: 'line',
//                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//            })
//        }

//    }

//}
$(function () {
    $("#Fields").trigger('click')
    $(".iqonic-button").click(function () {
        $(".color-pallet").toggleClass("show");

    })
    $(".fields-btn").click(function () {
        $(".field-container").toggleClass("show");
    })
    $(".themeswitch").change(function () {
        var tid = this.id;

        if ($(this).is(":checked")) {
            $('.themeswitch').each(function () {
                if ($(this).is(":checked")) {
                    $(this).trigger('click');
                }
            });
            /* $(".toggle").bootstrapToggle('off');
            */

        }
    });
})
function updateselect(item) {
    $('.select2').select2({
        placeholder: "Filter From " + item,
    });
}
$(".note-btn").click(function () {
    $(".notes").slideToggle();
    if ($(this).text() == "Comment") {
        $(this).text("Hide Comments");
    }
    else {
        $(this).text("Comment");
    }
})
