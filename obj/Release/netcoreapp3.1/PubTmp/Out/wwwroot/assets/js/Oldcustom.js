

//Colums Setting
var count = 0;
var options = {
    series: [],
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
                download: true,
                selection: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: false,
                customIcons: [
                    {
                        icon: '<img src="delete.png" style=";margin-left:5px;" width="17">',
                        index: 0,
                        title: 'Delete',
                        class: 'custom-icon',
                        click: function (chart, options, e) {
                            //$(".notes").slideToggle();
                        }
                    },

                ]
            },
        },
    },
    stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },

    fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: [],
    markers: {
        size: 0
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        title: {
            text: 'Points',
        },
        min: 0
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;

            }
        }
    }
};
var chart = new ApexCharts(document.querySelector("#barchart"), options);

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
//    helper: 'clone',
//    cursor: "crosshair", revert: "invalid"
//});
function makedropable() {
    $("#barchart").droppable();
}
$(".chart-box.active").droppable({
    accept: ".field",
    drop: function (event, ui) {
        
        $(this).removeClass("border").removeClass("over");
        $(".note-btn").show();
        $('.nochart').hide();
        $(".del").show();
        $('#barchart').attr('data-charttype', $(this).attr('id'))
        $('#barchart').show();
        $(".add-new-chart").show();
        $(this).children().find(".card-title").show();
        var dropped = $("#barchart");
        chart.render();
        var b = $("#barchart");
        var cat = ui.draggable.attr('category');
        updatechart('x', cat, $('#barchart').attr('data-charttype'))
        b.droppable();
        b.droppable({
            accept: ".field",
            drop: function (event, ui) {

                var dropped = "";
                axis = 'y';
                dropped = ui.draggable;
                count++;


                updatechart(axis, dropped.attr('category'), $('#barchart').attr('data-charttype'))
            }

        });


    },
    over: function (event, elem) {
        $(this).addClass("over");
        console.log("over");
    }
    ,
    out: function (event, elem) {
        $(this).removeClass("over");
    }
});
$(".filters").droppable({

    accept: ".field",
    drop: function (event, ui) {
        

        $(".append-filter h6").hide();
        var droppeditem = ui.draggable.attr("category");
        if (droppeditem == "Team A" || droppeditem == "Team B" || droppeditem == "Team C" || droppeditem == "Team D") {
            var html =
                '<div class="col">' +
                '<div class="form-group">' +
                '<label>' + droppeditem + '</label>' +
                '<select class="form-control select2 " multiple="multiple">' +
                '<option>Option 1</option>' +
                '<option>Option 2</option>' +
                '<option>Option 3</option>' +
                '<option>Option 4</option>' +
                '</select>' +
                '</div>' +
                '</div>';

            $(".main-content").addClass('mt-40');
            $(".filters").addClass('height-100');
            $(".append-filter").append(html);
            updateselect(droppeditem);
        }
    },
    over: function (event, elem) {


    }
    ,
    out: function (event, elem) {
        $(this).removeClass("over");
    }
});

//function updatechart(axis, cat) {
//    
//if (axis == 'x') {
//    chart.updateOptions({
//        xaxis: {
//            type: 'datetime',
//            categories: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
//            ],
//        },
//    })
//}
//else {
//    if (cat == "Team A") {
//        chart.appendSeries({
//            name: 'TEAM A',
//            type: 'column',
//            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//        })
//    }
//    else if (cat == "Team B") {
//        chart.appendSeries({
//            name: 'TEAM B',
//            type: 'area',
//            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//        })
//    }
//    else if(cat == "Team C") {
//        chart.appendSeries({
//                name: 'TEAM C',
//                type: 'line',
//                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//        })
//    }
//}
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
$(".iqonic-button , .fields-btn").click(function () {
    
    setTimeout(
        function () {
            if ($(".field-container").hasClass("show") || $(".color-pallet").hasClass('show')) {
                $("#filter").show();
                $(".dynamic-grid").each(function (index) {
                    $(this).removeClass('col-md-6');
                    $(this).addClass('col');


                });
            }
            else {
                $("#filter").hide();
                $(".dynamic-grid").each(function (index) {
                    $(this).removeClass('col');
                    $(this).addClass('col-md-6');
                });
            }
        }, 200);

})
$(".note-btn").click(function () {
    $(".notes").slideToggle();
    if ($(this).text() == "Add Notes") {
        $(this).text("Hide Notes");

    }
    else {
        $(this).text("Add Notes");
    }
})
