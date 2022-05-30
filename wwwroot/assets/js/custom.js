////$(".clr-pallet").click(function () {
////    debugger;
////    if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {

////    }
////    else if (currentscroll == 0) {
////        currentscroll = $(document).scrollTop();
////    }
////    else {
////        ScrollNow();   
////    }  
////       $('#new_row_btn').removeClass('d-none');
////    $("#VedioTutorialSection").addClass('d-none');
////    $('#main_div').removeClass('d-none');
////    $('#custom_fields_main_div').addClass('d-none');
////    $(".filters").removeClass("d-none");
////    $('.select2-search__field').css('width', '100%');
////    $(".menu-fixed-top").hide();
////    $("#iqonic-theme-list").show();
////    $("#Fields").hide();
////    $(".filters h4").removeClass("visibility");
////    $("#AccountDetailsSection").addClass("d-none");
////    $("#SavedReportsSection").addClass("d-none");
////    $('.left-sidenav').css('min-width', '365px')
////    $('#LeftSideFileUpload').removeClass('d-none')
////    $('#InternalDashBoardSection').addClass('d-none')
////    $('#useful_stuff').addClass('d-none');
////    $('#stuff_content').addClass('d-none');
////    ScrollNow()
////    reflowAllHighchartswithtimer();  
////});
$(".saved-temp").click(function () {
    $('#useful_stuff').addClass('d-none');
    $(".filters").addClass("d-none");
    $("#iqonic-theme-list").hide();
    $(".menu-fixed-top").show();
    $("#Fields").show();
    //  reflowAllHighcharts()
})
$(".calculated-fields-link").click(function () {
    $('#useful_stuff').addClass('d-none');
    $("#iqonic-theme-list").hide();
    $(".menu-fixed-top").show();
    $("#Fields").show();

    //  reflowAllHighcharts()
})
$(".fields-link").click(function () {
    $('#useful_stuff').addClass('d-none');
    $(".menu-fixed-top").show();
    $("#iqonic-theme-list").hide();
    $("#Fields").show();
    reflowAllHighchartswithtimer();
})
$(".nav-link").click(function () {

    if ($(this).hasClass("first-link")) {
        firstlink = true;
        if (chartsconfigurations.length > 0) {
            $("#new_row_btn").removeClass('d-none');
        }
    }
    else {
        firstlink = false;
    }
})

//Useful Stuff
$('.stuff_link').click(function () {
    $(".filters h4").addClass("visibility");
    $("#iqonic-theme-list").hide();
    $(".menu-fixed-top").hide();
    $("#Fields").hide();
    $(".filters").addClass("d-none");
    $('#custom_fields_main_div').addClass('d-none');
    $("#SavedReportsSection").addClass("d-none");
    $('#InternalDashBoardSection').addClass('d-none');
    $("#AccountDetailsSection").addClass("d-none");
    $('#useful_stuff').removeClass('d-none');
    $('.left-sidenav').css('min-width', '365px');
})

var count = 0;

$(".dripicons-checklist").click(function () {
    $('body').toggleClass('right-bar-enabled');
})
$("#uploadfiles").click(function () {
    $(".fileupload").slideToggle();
    $(".canvas").slideToggle();
});

function makedropable() {
    $("#barchart").droppable();
}

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

        $.each(formattedFileData, function (i, item) {
            if (item[droppeditem] != null && item[droppeditem] != undefined) {
                if (item[droppeditem].toString().trim().length > 0) {
                    totalFormattedOptions.push(item[droppeditem]);
                }
            }
        });
        var uniqueFormattedOptions = totalFormattedOptions;

        var options = '';
        $.each(uniqueOptions, function (i, item) {
            options = options + `<option value="${item}">${uniqueFormattedOptions[i]}</option>`;
        });

        var randomId = random(14);
        $("#main_div").css("padding-top", "155px");
        var html =
            '<div class="col-3">' +
            '<div id="' + randomId + '" class="form-group">' +
            `<label><a onclick="removeFilter('` + randomId + `')" style="color:red">X</a>&nbsp;&nbsp;&nbsp;<span>` + droppeditem + `</span></label>` +
            `<select onchange="updateFilterData('${droppeditem}', true)" class="form-control select2 " multiple="multiple">` +
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

        $(".main-content").addClass('mt-40');


        $('.select2').select2({
            placeholder: "Filter Items",
            allowClear: true
        });

        preventDoubleDrop();

        UpdateFiltersFilter();
    },
    over: function (event, elem) {


    }
    ,
    out: function (event, elem) {
        $(this).removeClass("over");
    }
});

var droppedd = false;
function preventDoubleDrop() {
    droppedd = true;
    setTimeout(function () {
        droppedd = false;
    }, 1000);
}

function removeFilter(id) {
    $(`#${id}`).parent().remove();
    updateFilterData(undefined, true);

    var filters = $('#filters .form-control');
    if (filters.length == 0) {
        $("#main_div").css("padding-top", "120px");
        $(".append-filter h4").show();
    }
}

function removeFilter_OnlyHtml(id) {
    $(`#${id}`).parent().remove();

    var filters = $('#filters .form-control');
    if (filters.length == 0) {
        $("#main_div").css("padding-top", "135px");
        $(".append-filter h4").show();
    }
}

function updateFilterData(val, status) {
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
        filteredData = fileData;
        formattedFilteredData = formattedFileData;
        if (chartsconfigurations.length > 0) {
            setdatausageflags();
            RefreshAllCharts();
        }
    }

    if (status) {
        UpdateFiltersFilter(val);
    }
}

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
    if (chartsconfigurations.length > 0) {
        setdatausageflags();
        RefreshAllCharts();
    }
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
        }
    });
})
function updateselect(item) {
    $('.select2').select2({
        placeholder: "Filter From " + item,
        allowClear: true
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

var lastFilterVal = '';
//function UpdateFiltersFilter(val) {
//    if (val != undefined) {
//        lastFilterVal = val;
//    }

//    var filters = $('#filters .form-control');
//    for (let i = 0; i < filters.length; i++) {
//        let parentId = $(filters[i]).parent().attr('id');
//        let colName = $(`#${parentId} label span`).text();

//        if (val != colName) {
//            let options = $(`#${parentId} .form-control > option`);

//            for (let o = 0; o < options.length; o++) {
//                let optionName = $(options[o]).val();
//                if (filteredData.some(x => x[colName] == optionName)) {
//                    $(options[o]).removeAttr('disabled', 'disabled');
//                }
//                else {
//                    $(options[o]).attr('disabled', 'disabled');
//                    $(options[o]).prop('selected', false);
//                }
//            }

//            setTimeout(refreshSelect2, 500);
//        }
//    }

//let waqaiAsliFilters = [];
//for (let i = 0; i < filters.length; i++) {
//    var parentId = $(filters[i]).parent().attr('id');
//    var colName = $(`#${parentId} label span`).text();

//    let RegisterEntry = {
//        "Field": colName,
//        "Values": []
//    }

//    for (var j = 0; j < filters[i].selectedOptions.length; j++) {
//        var textValue = filters[i].selectedOptions[j].value;
//        RegisterEntry.Values.push(textValue);
//    }

//    if (RegisterEntry.Values.length > 0) {
//        waqaiAsliFilters.push(RegisterEntry);
//    }
//}
//}

function refreshSelect2() {
    $('.select2').select2({
        placeholder: "Filter Items",
        allowClear: true
    });
}




function UpdateFiltersFilter(val) {

    ////Gather all data according to filters and treat ALL filters as OR condition
    //let filteredFilterObjs = [];
    //asliFilters.forEach(function (el, i) {
    //    el.Values.forEach(function (item, j) {
    //        var colName = el.Field;
    //        var value = item;

    //        for (var x = 0; x < fileData.length; x++) {
    //            if (fileData[x][colName] == value) {
    //                filteredFilterObjs.push(fileData[x]);
    //            }
    //        }
    //    });
    //});
    ////Gather all data according to filters and treat ALL filters as OR condition

    //let uniqueFilterObjs = [];
    //if (filteredFilterObjs.length === 0) {
    //    return;
    //}
    //else {
    //    uniqueFilterObjs = Array.from(new Set(filteredFilterObjs.map(JSON.stringify))).map(JSON.parse);
    //}

    var filters = $('#filters .form-control');

    if (filters.length == 1) {
        let parentId = $(filters[0]).parent().attr('id');
        let colName = $(`#${parentId} label span`).text();

        val = colName;
        lastFilterVal = val;

        let dOpts = document.getElementById(parentId).querySelectorAll("[disabled]");
        for (let o = 0; o < dOpts.length; o++) {
            $(dOpts[o]).removeAttr('disabled', 'disabled');
        }
    }
    else {
        if (val === null || val === undefined || val === '') {
            val = lastFilterVal;
        }
        else {
            lastFilterVal = val;
        }
    }

    let waqaiAsliFilters = [];
    for (let i = 0; i < filters.length; i++) {
        let parentId = $(filters[i]).parent().attr('id');
        let colName = $(`#${parentId} label span`).text();

        let RegisterEntry = {
            "Field": colName,
            "Values": []
        }

        for (var j = 0; j < filters[i].selectedOptions.length; j++) {
            var textValue = filters[i].selectedOptions[j].value;
            RegisterEntry.Values.push(textValue);
        }

        if (RegisterEntry.Values.length > 0) {
            waqaiAsliFilters.push(RegisterEntry);
        }
    }

    for (let i = 0; i < filters.length; i++) {
        let parentId = $(filters[i]).parent().attr('id');
        let colName = $(`#${parentId} label span`).text();

        let options = $(`#${parentId} .form-control > option`);

        if (waqaiAsliFilters.length === 1 && waqaiAsliFilters.some(x => x['Field'] == colName)) {
            let dOpts = document.getElementById(parentId).querySelectorAll("[disabled]");
            for (let o = 0; o < dOpts.length; o++) {
                $(dOpts[o]).removeAttr('disabled', 'disabled');
            }
        }
        else if (waqaiAsliFilters.length === 0) {
            let dOpts = document.getElementById(parentId).querySelectorAll("[disabled]");
            for (let o = 0; o < dOpts.length; o++) {
                $(dOpts[o]).removeAttr('disabled', 'disabled');
            }
        }
        else {
            if (val === colName) {

            }
            else {

                let asliOptions = waqaiAsliFilters.find(x => x['Field'] == val);
                let selOptns = [];
                for (let yyy = 0; yyy < asliOptions.Values.length; yyy++) {
                    let items = fileData.filter(item => item[val] == asliOptions.Values[yyy]);
                    for (let ccc = 0; ccc < items.length; ccc++) {
                        selOptns.push(items[ccc]);
                    }
                }
                let uniqueFilterObjs = Array.from(new Set(selOptns.map(JSON.stringify))).map(JSON.parse);

                for (let o = 0; o < options.length; o++) {
                    let optionName = $(options[o]).val();

                    if (uniqueFilterObjs.some(x => x[colName] == optionName)) {
                        $(options[o]).removeAttr('disabled', 'disabled');
                    }
                    else {
                        $(options[o]).attr('disabled', 'disabled');
                        $(options[o]).prop('selected', false);
                    }
                }
            }
        }
    }

    setTimeout(refreshSelect2, 200);
}