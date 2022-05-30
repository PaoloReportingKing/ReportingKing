////const { isNumeric } = require("jquery");
////const { forEach } = require("../../plugins/fullcalendar/packages/core/locales-all");

function saveChart() {
    if ($('#nameLabel')[0].innerText.length < 1) {
        popupShow('Template name cannot be empty...', 'warn');
        return;
    }

    loading_start();


    for (var i = 0; i < chartsconfigurations.length; i++) {
        //debugger;
        var randomchartid = getrandomchartidusingid(chartsconfigurations[i].chartId);
        var comment = $("#comments_text_" + randomchartid).summernote("code");
        chartsconfigurations[i].comments = comment;
    }





    var RegisterEntry = {
        "id": $("#nameLabel").attr('data-id'),
        "name": $('#nameLabel')[0].innerText,
        "columns": JSON.stringify(columnNames),
        "palette": JSON.stringify(selectedpallet),
        "charts": JSON.stringify(chartsconfigurations),
        "filters": JSON.stringify(getFilterFields()),
        "mainHtml": $('#main_div').html(),
        "chartIds": JSON.stringify(chartIds),
        "cFields": JSON.stringify(cFields)
    }

    //var tempComs = [];
    //for (var i = 0; i < chartsconfigurations.length; i++) {
    //    var coms = $($("#comments_text_" + chartsconfigurations[i].chartId.replace('chart_', '')).summernote("code")).text();
    //    tempComs.push(coms);
    //}
    //RegisterEntry.comments = JSON.stringify(tempComs);


    $.ajax({
        async: true,
        type: "POST",
        url: "/Home/SaveChart",
        data: { obj: RegisterEntry },
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();

            if (response.status) {
                popupShow('Template Saved...', 'good');
                //  debugger;
                $("#nameLabel").attr('data-id', response.id);
                getAllCharts(true);

            }
            else {
                popupShow('Template not saved...', 'fail');
            }
        },
        failure: function (response) {
            loading_end();
        },
        error: function (response) {
            loading_end();
        }
    });
}
var RPID;
function OpenReport(chartId) {
    if ($('#FieldsList li').length > 0) {
        $('#savedCharts').val(chartId);
        
        getChart(chartId);
        $('.main-icon-menu nav a:first-child').addClass('active');
        $('.main-icon-menu nav a:last-child').removeClass('active');
    } else {
        if (confirm("Upload source file xlsx to continue \nor go back to Add Fields to start new report")) { }
    }
    
}
function DeleteReport(rptId) {
    if (confirm("Are you sure you want to delete this report?")) {
        loading_start();
        $.ajax({
            async: true,
            type: "POST",
            url: "/Home/DeleteChart",
            data: { id: rptId },
            cache: false,
            dataType: "json",
            success: function (response) {
                loading_end();
                if (response.status) {

                    getAllCharts();
                    getAllChartsForSR();

                    popupShow('Chart deleted successfully...', 'success');
                }
            },
            failure: function (response) {
                loading_end();
            },
            error: function (response) {
                loading_end();
            }
        });
    }
}
function getColumns(rptId, UsedColumns) {
    loading_start();
    //$.ajax({
    //    async: true,
    //    type: "POST",
    //    url: "/Home/GetChart",
    //    data: { id: rptId },
    //    cache: false,
    //    dataType: "json",
    //    success: function (response) {
    //        loading_end();
    //        if (response.status) {
    loading_end();

    var totalCharts = UsedColumns;
                var columns = '';
    $.each(totalCharts, function (i, item) {
                    columns = columns + `<li id="${i}" exist="true" class="bg-gray-4-SR field ui-draggable ui-draggable-handle">${item}</li>`;
                });
                $('#ReportColumns').empty();
                $('#ReportColumns').append(columns);
                //$('#ReportColumns').addClass('ReportColumns');


                var noOfCol = 0;
                var columns = '';

                var input = document.getElementById('PaymentFile');
    var files = input.files;
    PinkFields = [];
                if ($('#FieldsList li').length > 0) {

                    $.each($('#ReportColumns li'), function (i, item) {
                        var ThisText = $(this).text();

                        var exist = false;

                        $('#FieldsList li').each(function () {
                            if (($(this).text()).toLowerCase() === ThisText.toLowerCase()) {
                                exist = true;
                            }
                        });

                      //  debugger;
                        if (!exist) {
                            noOfCol = noOfCol + 1;
                            columns = columns + ThisText + ", ";
                            $(this).attr('exist', 'false');
                            $(this).css('background', 'pink');
                            $(this).addClass('DropAbleArea');
                            PinkFields.push(ThisText);
                        } else {
                            $(this).css('background', '#F5F8FF');
                            $(this).attr('exist', 'true');
                            $(this).removeClass('DropAbleArea');
                        }
                    })

                    if (noOfCol > 0) {
                        columns = columns.replace(/,\s*$/, '');
                        var selectedReport = $('.ReportNames.active').text();
                        var message = `The source file uploaded Source ${files[0].name} is missing ${noOfCol} columns used in ${selectedReport} Report: `

                        $('#ErrorMessage span').empty();
                        $('#ErrorMessage b').empty();
                        $('#ErrorMessage').removeClass('d-none');
                        $('#ErrorMessage span').prepend(message);
                        $('#ErrorMessage b').append(columns);
                    } else {

                        //$('#ErrorMessage').empty();
                        $('#ErrorMessage').addClass('d-none');
                    }

                    if ($('#FieldsList li').length > 0) {
                        ReplaceElements();
                    }
                    

                }
    //        }
    //    },
    //    failure: function (response) {
    //        loading_end();
    //    },
    //    error: function (response) {
    //        loading_end();
    //    }
    //});

}

function getChart(id) {
   // debugger
    $('.main-icon-menu nav a').removeClass('active');
    $('.main-icon-menu nav a:first-child').addClass('active');

    if (id == 'CallFromSavedReports') {
        loading_start();
        var myChartId = $('#savedCharts').val();

        if (myChartId === "0") {
            $("#nameLabel").attr('data-id', '0');
            $('#nameLabel').removeClass('d-none');
            $('#nameEditor').addClass('d-none');
            $('#nameLabel').empty();
            $('#nameLabel').append('Report Title - Untitled');
            $(`#new_row_btn`).addClass('d-none');

            $("#Colors :input").each(function (i, el) {
                if ($(this).is(":checked")) {
                    selectedpallet = palleteArray[i];
                    return false;
                }
            });

            cFields.forEach(function (val, index) {
                $('#custom_created_fields_list a').click();
            })

            cFields = [];
            chartsconfigurations = [];
            chartIds = [];
          //  debugger;
            filteredData = fileData;

            var filters = $('#filters .form-control');
            for (var i = 0; i < filters.length; i++) {
                removeFilter(filters[i].parentElement.id);
            }

            $('#main_div').empty();
            AddNewRow();
            loading_end();
        }
        else {
            $.ajax({
                async: true,
                type: "POST",
                url: "/Home/GetChart",
                data: { id: myChartId },
                cache: false,
                dataType: "json",
                success: function (response) {
                    loading_end();
                    if (response.status) {
                        cFields.forEach(function (val, index) {
                            $('#custom_created_fields_list a').click();
                        })
                        cFields = [];
                        $("#nameLabel").attr('data-id', response.data.id);
                        $('#nameLabel').removeClass('d-none');
                        $('#nameEditor').addClass('d-none');
                        $('#nameLabel').empty();
                        $('#nameLabel').append(response.data.name);
                        selectedpallet = JSON.parse(response.data.palette);
                        chartsconfigurations = JSON.parse(response.data.charts);
                        chartIds = JSON.parse(response.data.chartIds);
                        $('#main_div').empty();
                        $('#main_div').append(response.data.mainHtml);

                        //debugger;
                        //Set Calculated Fields
                        var cFields_temp = JSON.parse(response.data.cFields);
                        cFields_temp.forEach(function (val, index) {
                            //debugger;
                            $('#custom_field_name').val(val.name);
                            $('#custom_formula').val(val.formula);
                            $('#decimal_places').val(val.decimalPlaces);
                            $('#custom_field_format').val(val.formattingType);
                            $('#format_currency').val(val.currencySymbol);
                            showFormatOptions();
                            $('#custom_field_format_type').val(val.formatType);

                            createField();
                        })
                        //Set Calculated Fields

                        //Set pallete btn
                        $("#Colors :input").each(function (i, el) {
                            if (JSON.stringify(selectedpallet) === JSON.stringify(palleteArray[i])) {
                                $(this).prop("checked", true);
                            }
                            else {
                                $(this).prop("checked", false);
                            }
                        });
                        //Set pallete btn

                        //Repopulate Filters Section
                        var filters = $('#filters .form-control');
                        for (var i = 0; i < filters.length; i++) {
                            removeFilter(filters[i].parentElement.id);
                        }

                        var templateFilters = JSON.parse(response.data.filters);
                        for (var xxx = 0; xxx < templateFilters.length; xxx++) {
                            var droppeditem = templateFilters[xxx].Field;

                            $(".append-filter h4").hide();
                            var totalOptions = [];
                            $.each(fileData, function (i, item) {
                                if (item[droppeditem] != null && item[droppeditem] != undefined) {
                                    totalOptions.push(item[droppeditem]);
                                }
                            });
                            var uniqueOptions = [... new Set(totalOptions)];
                            uniqueOptions.sort();

                            var options = '';
                            $.each(uniqueOptions, function (i, item) {
                                options = options + `<option>${item}</option>`;
                            });

                            var randomId = random(14);

                            var html =
                                '<div class="col-3">' +
                                '<div id="' + randomId + '" class="form-group">' +
                                `<label><a onclick="removeFilter('` + randomId + `')" style="color:red">X</a>&nbsp;&nbsp;&nbsp;<span>` + droppeditem + `</span></label>` +
                                '<select id="select_' + randomId + '" onchange="updateFilterData()" class="form-control select2 " multiple="multiple">' +
                                options +
                                '</select>' +
                                '</div>' +
                                '</div>';
                            $(".append-filter").append(html);
                            $(".main-content").addClass('mt-40');
                            $('.select2').select2({
                                placeholder: "Filter Items",
                            });

                            var selOptns = [];
                            for (var yyy = 0; yyy < templateFilters[xxx].Values.length; yyy++) {
                                selOptns.push(templateFilters[xxx].Values[yyy].trim());
                            }
                            $(`#select_${randomId}`).val(selOptns);
                            $(`#select_${randomId}`).trigger('change');
                        }
                        //Repopulate Filters Section


                        //columnNames = JSON.parse(response.data.columns);
                        //$('#FieldsList').empty();
                        //for (var i = 0; i < columnNames.length; i++) {
                        //    $('#FieldsList').append(`<li category='${columnNames[i]}' class='bg-gray field'>${columnNames[i]}</li>`);
                        //}

                        var selectedreportchartconfiguration = JSON.parse(response.data.charts);
                        RplaceAbleFields = [];
                      //  debugger
                        $.each(selectedreportchartconfiguration, function (i, item) {
                            getUsedColumns(item);
                        })

                        RefreshAllCharts(true);
                        getColumns(id, RplaceAbleFields);
                        //$(`#new_row_btn`).removeClass('d-none');
                        //updateFilterData();

                        $("#main_div > div").each((index, elem) => {
                            $(`#${elem.id} .chart-box.active`).droppable({
                                accept: ".field",
                                drop: function (event, ui) {
                                    alabad(event, ui, elem.id, this);
                                },
                                over: function (event, elem) {
                                    $(this).addClass("over");
                                }
                                ,
                                out: function (event, elem) {
                                    $(this).removeClass("over");
                                }
                            });
                        });
                        // initializesummernote();
                        //  $(".summernote").summernote("reset");

                        hideallstyletoolbar();

                    }
                },
                failure: function (response) {
                    loading_end();
                },
                error: function (response) {
                    loading_end();
                }
            });
        }
    }
    else {
        if (confirm("Are you sure to load this template?\nAll previous settings will be lost...")) {
            loading_start();
            $('#main_div').removeClass('d-none');
            $('#custom_fields_main_div').addClass('d-none');
            $('#SavedReportsSection').addClass('d-none');
            var myChartId = $('#savedCharts').val();

            if (myChartId === "0") {
                $("#nameLabel").attr('data-id', '0');
                $('#nameLabel').removeClass('d-none');
                $('#nameEditor').addClass('d-none');
                $('#nameLabel').empty();
                $('#nameLabel').append('Report Title - Untitled');
                $(`#new_row_btn`).addClass('d-none');

                $("#Colors :input").each(function (i, el) {
                    if ($(this).is(":checked")) {
                        selectedpallet = palleteArray[i];
                        return false;
                    }
                });

                cFields.forEach(function (val, index) {
                    $('#custom_created_fields_list a').click();
                })

                cFields = [];
                chartsconfigurations = [];
                chartIds = [];
               // debugger;
                filteredData = fileData;

                var filters = $('#filters .form-control');
                for (var i = 0; i < filters.length; i++) {
                    removeFilter(filters[i].parentElement.id);
                }

                $('#main_div').empty();
                AddNewRow();
                loading_end();
            }
            else {
                $.ajax({
                    async: true,
                    type: "POST",
                    url: "/Home/GetChart",
                    data: { id: myChartId },
                    cache: false,
                    dataType: "json",
                    success: function (response) {
                       // debugger
                        loading_end();
                        if (response.status) {
                            cFields.forEach(function (val, index) {
                                $('#custom_created_fields_list a').click();
                            })
                            cFields = [];
                            $("#nameLabel").attr('data-id', response.data.id);
                            $('#nameLabel').removeClass('d-none');
                            $('#nameEditor').addClass('d-none');
                            $('#nameLabel').empty();
                            $('#nameLabel').append(response.data.name);
                            selectedpallet = JSON.parse(response.data.palette);
                            chartsconfigurations = JSON.parse(response.data.charts);
                            chartIds = JSON.parse(response.data.chartIds);
                            $('#main_div').empty();
                            $('#main_div').append(response.data.mainHtml);

                            //debugger;
                            //Set Calculated Fields
                            var cFields_temp = JSON.parse(response.data.cFields);
                            cFields_temp.forEach(function (val, index) {
                                //debugger;
                                $('#custom_field_name').val(val.name);
                                $('#custom_formula').val(val.formula);
                                $('#decimal_places').val(val.decimalPlaces);
                                $('#custom_field_format').val(val.formattingType);
                                $('#format_currency').val(val.currencySymbol);
                                showFormatOptions();
                                $('#custom_field_format_type').val(val.formatType);

                                createField();
                            })
                            //Set Calculated Fields

                            //Set pallete btn
                            $("#Colors :input").each(function (i, el) {
                                if (JSON.stringify(selectedpallet) === JSON.stringify(palleteArray[i])) {
                                    $(this).prop("checked", true);
                                }
                                else {
                                    $(this).prop("checked", false);
                                }
                            });
                            //Set pallete btn

                            //Repopulate Filters Section
                            var filters = $('#filters .form-control');
                            for (var i = 0; i < filters.length; i++) {
                                removeFilter(filters[i].parentElement.id);
                            }

                            var templateFilters = JSON.parse(response.data.filters);
                            for (var xxx = 0; xxx < templateFilters.length; xxx++) {
                                var droppeditem = templateFilters[xxx].Field;

                                $(".append-filter h4").hide();
                                var totalOptions = [];
                                $.each(fileData, function (i, item) {
                                    if (item[droppeditem] != null && item[droppeditem] != undefined) {
                                        totalOptions.push(item[droppeditem]);
                                    }
                                });
                                var uniqueOptions = [... new Set(totalOptions)];
                                uniqueOptions.sort();

                                var options = '';
                                $.each(uniqueOptions, function (i, item) {
                                    options = options + `<option>${item}</option>`;
                                });

                                var randomId = random(14);

                                var html =
                                    '<div class="col-3">' +
                                    '<div id="' + randomId + '" class="form-group">' +
                                    `<label><a onclick="removeFilter('` + randomId + `')" style="color:red">X</a>&nbsp;&nbsp;&nbsp;<span>` + droppeditem + `</span></label>` +
                                    '<select id="select_' + randomId + '" onchange="updateFilterData()" class="form-control select2 " multiple="multiple">' +
                                    options +
                                    '</select>' +
                                    '</div>' +
                                    '</div>';
                                $(".append-filter").append(html);
                                $(".main-content").addClass('mt-40');
                                $('.select2').select2({
                                    placeholder: "Filter Items",
                                });

                                var selOptns = [];
                                for (var yyy = 0; yyy < templateFilters[xxx].Values.length; yyy++) {
                                    selOptns.push(templateFilters[xxx].Values[yyy].trim());
                                }
                                $(`#select_${randomId}`).val(selOptns);
                                $(`#select_${randomId}`).trigger('change');
                            }
                            //Repopulate Filters Section


                            //columnNames = JSON.parse(response.data.columns);
                            //$('#FieldsList').empty();
                            //for (var i = 0; i < columnNames.length; i++) {
                            //    $('#FieldsList').append(`<li category='${columnNames[i]}' class='bg-gray field'>${columnNames[i]}</li>`);
                            //}

                            var selectedreportchartconfiguration = JSON.parse(response.data.charts);
                            RplaceAbleFields = [];
                          //  debugger
                            $.each(selectedreportchartconfiguration, function (i, item) {
                                getUsedColumns(item);


                                //var noOfCol = 0;
                                //var columns = '';
                                //$.each(RplaceAbleFields, function (i, item) {
                                //    var ThisText = $(this).text();

                                //    var exist = false;

                                //    $('#FieldsList li').each(function () {
                                //        if (($(this).text()).toLowerCase() === ThisText.toLowerCase()) {
                                //            exist = true;
                                //        }
                                //    });

                                //    if (!exist) {
                                        
                                //    } else {

                                //    }
                                //})
                            })
                            //debugger
                            RefreshAllCharts(true);
                            getColumns(id, RplaceAbleFields);
                            $(`#new_row_btn`).removeClass('d-none');
                            //updateFilterData();

                            $("#main_div > div").each((index, elem) => {
                                $(`#${elem.id} .chart-box.active`).droppable({
                                    accept: ".field",
                                    drop: function (event, ui) {
                                        alabad(event, ui, elem.id, this);
                                    },
                                    over: function (event, elem) {
                                        $(this).addClass("over");
                                    }
                                    ,
                                    out: function (event, elem) {
                                        $(this).removeClass("over");
                                    }
                                });
                            });
                            // initializesummernote();
                            //  $(".summernote").summernote("reset");
                        }
                    },
                    failure: function (response) {
                        loading_end();
                    },
                    error: function (response) {
                        loading_end();
                    }
                });
            }
        }
    }
}



function getFilterFields() {
    asliFilters = [];
    var filters = $('#filters .form-control');
    for (var i = 0; i < filters.length; i++) {
        var parentId = $(filters[i]).parent().attr('id');
        var colName = $(`#${parentId} label span`).text();

        var RegisterEntry = {
            "Field": colName,
            "Values": []
        }

        for (var j = 0; j < filters[i].selectedOptions.length; j++) {
            var value = filters[i].selectedOptions[j].textContent;
            RegisterEntry.Values.push(value);
        }

        if (RegisterEntry.Values.length > 0) {
            asliFilters.push(RegisterEntry);
        }
    }

    return asliFilters;
}

function editName() {
    $('#nameLabel').addClass('d-none');
    $('#nameEditor').removeClass('d-none');
    $('#nameTxtbox').val($('#nameLabel')[0].innerText);
}

function editNameComplete() {
    $('#nameLabel').removeClass('d-none');
    $('#nameEditor').addClass('d-none');

    var tempName = $('#nameTxtbox').val();
    if (tempName.length < 1) {
        return;
    }

    $('#nameLabel').empty();
    $('#nameLabel').append(tempName);
}

function searchSavedReports() {
    var value = $('#searchSavedReports').val().toLowerCase();
    $("#SavedReportUL .class4SearchPurposeOuter").each(function (index) {

        $row = $(this);
        var id = $row.find(".class4SearchPurpose").text().toLowerCase();
        if (value == "") {
            $(this).show();
        } else {
            if (id.indexOf(value) < 0) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        }
    });
}
function getAllChartsForSR() {

    loading_start();
    $.ajax({
        async: true,
        type: "POST",
        url: "/Home/GetAllCharts",
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                var lines = ``;

                $.each(response.data, function (i, item) {
                    var totalCharts = JSON.parse(item.chartIds);
                    lines = lines + `<li class="bg-gray-4-SR field ui-draggable ui-draggable-handle class4SearchPurposeOuter" style="background: none;"><a onclick="SR_ShowFields(${item.id})" href="#." class="ReportNames col-md-4 class4SearchPurpose" style="display: inline-block;background-color: #F5F8FF !important;border: 1px solid #F5F8FF; padding: 20px;border-radius: 3px;" id="RN-${item.id}" >${item.name}</a><ul class="ui-details col-md-8 d-none" id="ui-details-${item.id}" style="bottom: unset;"><li><label>${item.createdOn}</label></li> <li>${totalCharts.length} Chart(s)</li> <li><button class="btn btn-success" onclick="OpenReport(${item.id})">Open</button></li> <li><a href="#" style="color:red" onclick="DeleteReport(${item.id})">Delete</a></ul></li>`;
                });
                $('#SavedReportUL').empty();
                $('#SavedReportUL').append(lines);
                var value = $('#searchSavedReports').val().toLowerCase();
                if (value != "") {
                    searchSavedReports();
                   
                }
                SR_ShowFields(RPID);
            }
        },
        failure: function (response) {
            loading_end();
        },
        error: function (response) {
            loading_end();
        }
    });
}

function getAllCharts(isSave) {

    loading_start();

    $.ajax({
        async: true,
        type: "POST",
        url: "/Home/GetAllCharts",
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                var options = '<option value="0">New Dashboard</option>';

                $.each(response.data, function (i, item) {
                    options = options + `<option value=${item.id}>${item.name}</option>`;
                });
                $('#savedCharts').empty();
                $('#savedCharts').append(options);
                if (isSave) {
                    var val = $("#nameLabel").attr('data-id');
                    $('#savedCharts').val(val);
                }
            }
        },
        failure: function (response) {
            loading_end();
        },
        error: function (response) {
            loading_end();
        }
    });
}

function SR_ShowFields(id) {
    selectedreportid = id;
    $('.ReportNames').css('color', '#50649c')
    $('#RN-' + id).css('color', 'green')
    $('.ReportNames').removeClass('active');
    $('#RN-' + id).addClass('active');
    $('.ui-details').addClass('d-none');
    var ud = 'ui-details-' + id;
    $('#' + ud).removeClass('d-none');
    //$('#savedCharts').val(id);
    selectedreportchartconfiguration = [];
    //getChart('CallFromSavedReports');
    getselectedreportChartconfiguration(id);
    RPID = id;
    
}

function ApplyFormatting(val, fieldName) {

    if (typeof (val) !== "number") {
        return val;
    }

    if (isNaN(val)) {
        return val;
    }

    var sampleValue = getsamplevalue(fieldName);;//formattedFileData[0][fieldName];
    
    if (sampleValue === undefined || sampleValue === null) {
        return val;
    }

    /*if (formattedFileData[i][fieldName] != undefined ||sampleValue.includes("/") || sampleValue.includes(":") || sampleValue.includes("-")) {*/

    if (sampleValue.includes("/") || sampleValue.includes(":") || sampleValue.includes("-")) {
        return val;
    }

    var fVal = sampleValue.trim();

    var numCode = "_!/_";
    var temp_val = null;

    var finalString = "";
    var noofdecimalplaces = 0;
    var noofdecimalstart = false;
    for (var i = 0; i < fVal.length; i++) {
        if (fVal[i] == ".") {
            noofdecimalstart = true;
        }
        if (isNaN(fVal[i])) {
            finalString = finalString + fVal[i];
        }
        else {
            if (noofdecimalstart) {
                noofdecimalplaces = noofdecimalplaces + 1;
            }
            if (!finalString.includes(numCode)) {
                finalString = finalString + numCode;
            }
        }
    }

    //if (finalString.includes(",")) {
    //  temp_val = new Intl.NumberFormat().format(val);
    //temp_val = parseFloat(temp_val).toFixed(noofdecimalplaces);
    //const formatter = new Intl.NumberFormat('en-US', {
    //    minimumFractionDigits: 1,
    //    maximumFractionDigits: 4,
    //    minimumSignificantDigits: 1,
    //    maximumSignificantDigits: 4
    //})
    temp_val = formatNumber(val.toFixed(noofdecimalplaces));//val.toFixed(noofdecimalplaces);//roundDownSignificantDigits(val, noofdecimalplaces + 1);//formatter.format(roundDownSignificantDigits(val, noofdecimalplaces + 1));//trauncateFractionAndFormat(formatter.format(val, noofdecimalplaces));

    finalString = finalString.replaceAll(".", "");
    finalString = finalString.replaceAll(",", "");

    finalString = finalString.replaceAll(numCode, temp_val);

    return finalString;

    //var params = {
    //    "decimalPlaces": parseInt($("#decimal_places").val()),
    //    "formattingType": $("#custom_field_format").val(),
    //    "formatOption": $("#custom_field_format").val(),
    //    "formatType": $("#custom_field_format_type").val(),
    //    "currencySymbol": $("#format_currency option:selected").text()
    //}
    //return getFormattedValue(val, params);
}


function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function roundDownSignificantDigits(number, decimals) {
    let significantDigits = (parseInt(number.toExponential().split('e-')[1])) || 0;
    let decimalsUpdated = (decimals || 0) + significantDigits - 1;
    decimals = Math.min(decimalsUpdated, number.toString().length);

    return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}
const trauncateFractionAndFormat = (parts, digits) => {
    return parts.map(({ type, value }) => {
        if (type !== 'fraction' || !value || value.length < digits) {
            return value;
        }

        let retVal = "";
        for (let idx = 0, counter = 0; idx < value.length && counter < digits; idx++) {
            if (value[idx] !== '0') {
                counter++;
            }
            retVal += value[idx];
        }
        return retVal;
    }).reduce((string, part) => string + part);
};


function getsamplevalue(fieldName) {
    var sampleValue = 0;
    if ($('#PaymentFile').val() != "") {
        for (var i = 0; i < formattedFileData.length; i++) {
            //console.log(formattedFileData[i][fieldName]);
            //if (formattedFileData[i][fieldName] != undefined &&!isNaN(formattedFileData[i][fieldName])) {
            //    sampleValue = formattedFileData[i][fieldName];
            //    break;
            //}
            if (formattedFileData[i][fieldName] != undefined && (formattedFileData[i][fieldName].includes("/") || formattedFileData[i][fieldName].includes(":") || formattedFileData[i][fieldName].includes("-") || formattedFileData[i][fieldName] == undefined || formattedFileData[i][fieldName] == null || formattedFileData[i][fieldName] == "")) {
                sampleValue = formattedFileData[i][fieldName];
            }
            else {
                sampleValue = formattedFileData[i][fieldName];
                break;
            }
        }
    }
    
    return sampleValue;
}




//this is not used
function getselectedreportChartconfiguration(myChartId) {

    selectedreportid = myChartId;
    loading_start();
            $.ajax({
                async: true,
                type: "POST",
                url: "/Home/GetChart",
                data: { id: myChartId },
                cache: false,
                dataType: "json",
                success: function (response) {
                    loading_end();
                    if (response.status) {
                       
                        selectedreportchartconfiguration = JSON.parse(response.data.charts);
                        selectedreportchartIds = JSON.parse(response.data.chartIds);
                        selectedreportcolumns = JSON.parse(response.data.columns);

                        //debugger;
                        //Set Calculated Fields
                        selectedreportcFields = JSON.parse(response.data.cFields);
                        selectedreportpallet = JSON.parse(response.data.palette);
                        selectedreportmainhtml = response.data.mainHtml;
                        selectedchartsFilter = response.data.filters;


                        //cFields_temp.forEach(function (val, index) {
                        //    //debugger;
                        //    $('#custom_field_name').val(val.name);
                        //    $('#custom_formula').val(val.formula);
                        //    $('#decimal_places').val(val.decimalPlaces);
                        //    $('#custom_field_format').val(val.formattingType);
                        //    $('#format_currency').val(val.currencySymbol);
                        //    showFormatOptions();
                        //    $('#custom_field_format_type').val(val.formatType);


                        //})
                        //Set Calculated Fields
                        formulaName = [];
                        RplaceAbleFields = [];
                        $.each(selectedreportcFields, function (i, item) {
                            //debugger;
                            formulaName.push(item.name);
                            //var formulaFields = item.formula.replace('/', '').split('"').filter(function (v) { return v !== '' && v !== " " });
                            //var formulaFields = item.formula.split('"').filter(function (v) { return v !== '' && v !== " "&&selectedreportcolumns.findIndex(x => x == v)!=-1 }); //This will work exactly same as following 11 working line of code.

                            //var calculatedField = selectedreportcolumns.findIndex(x => x == item.name);
                            //if (calculatedField != undefined) {

                            //}

                            //var formulaFields = [];
                            //var formulaArr = item.formula.split('"');
                            //formulaArr.forEach(function (val, index) {
                              
                            //    if (findColumn != undefined) {
                            //        var value = fileData[j][val];
                            //        formulaFields.push(value);
                            //    }
                            //    else if (val != "" && val != " ") {
                            //        operator = val;
                            //        formulaFields.push(value);
                            //        executeEval = true;
                            //    }
                            //});
                         //   debugger
                            var formulaFields = [];
                            var formulaArr = item.formula.split('"');
                            formulaArr.forEach(function (val, index) {
                                if (val != "" && val != " ") {
                                    var calculatedFieldindex = selectedreportcolumns.findIndex(x => x == val);
                                    if (calculatedFieldindex != -1) {
                                        formulaFields.push(val);
                                    }
                                }
                            });
                            getFormulaFields(formulaFields);
                            //getUsedColumns(item);
                        })
                        
                      //  debugger
                        $.each(selectedreportchartconfiguration, function (i, item) {
                            getUsedColumns(item);
                        })
                        $.each(formulaName, function (i, item) {
                            RplaceAbleFields = jQuery.grep(RplaceAbleFields, function (value) {
                                return value != item ? item:"";
                            });
                        });
                        getColumns(myChartId, RplaceAbleFields);
                    }
                },
                failure: function (response) {
                    loading_end();
                },
                error: function (response) {
                    loading_end();
                }
            });
}
//


function ReplaceChartsColumn(dropedplacetext, dragedtext) {
    //debugger;
    //var selectedreport = selectedreportid;
    var returnvalue = "True";
    try {
        $.each(selectedreportchartconfiguration, function (i, chart) {
            if (chart.chartXAxis == dragedtext) {
                popupShow('Field cannot be replaced...', 'fail');
                returnvalue = "False";
                return returnvalue;
            }
           
            else if (chart.chartXAxis == dropedplacetext) {
                chart.chartXAxis = dragedtext;
            }
            else {
                $.each(chart.chartYAxises, function (i, chartyaxis) {
                    if (chartyaxis.label == dragedtext) {
                        popupShow('Field cannot be replaced...', 'fail');
                        returnvalue = "False";
                        return returnvalue;
                    }
                    else if (chartyaxis.label == dropedplacetext) {
                        chartyaxis.label = dragedtext;
                    }
                });
            }

           
        });
        $.each(selectedreportcolumns, function (i, column) {
            if (column == dropedplacetext) {
                selectedreportcolumns[i] = dragedtext;
                //return returnvalue;
            }
        });
      //  debugger;
        $.each(selectedreportcFields, function (i, column) {
            //if (column.formula.includes(dropedplacetext)) {
            //    var changedtext = dropedplacetext + "/";
            //    selectedreportcFields[i].formula.replace(dropedplacetext, dragedtext);// = dragedtext;
            //}
            var formula = "";
            var formulaArr = column.formula.split('"');
            formulaArr.forEach(function (val, index) {
                if (val != "" && val != " ") {
                    if (val == dropedplacetext) {
                        val = dragedtext;
                    }
                    operator = val;
                    formula = formula + val;
                }
            });
            selectedreportcFields[i].formula = formula;
          //  debugger;
        });

        //return returnvalue;
    } catch (e)
    {
        return "False";
    }
    return returnvalue;
}

function ReplaceElements() {
   // debugger;
    $(".DropAbleArea").droppable({
        accept: ".field4SR",
        hoverClass: "highlight",
        helper: "clone",
        drop: function (event, ui) {
            var $this = $(this);
            var dropedplacetext = $this.text();
            var dragedtext = ui.draggable.text();

            var replacevalue = ReplaceChartsColumn(dropedplacetext, dragedtext);
            if (replacevalue == "True") {
                var saved = updatechartcolumnconfiguration($this, dragedtext, dropedplacetext);
            }

          //  debugger;
            if (saved == "True") {
                //$this.css('background', '#F5F8FF')
                //$this.text(ui.draggable.text());
                //$this.removeClass('DropAbleArea');
            }
            loading_end();
        },
        over: function (event, ui) {
            var $this = $(this);
            $this.addClass("highlight");
            ui.draggable.position({
                my: "center",
                at: "center",
                using: function (pos) {
                    $(this).animate(pos, 300, "linear");
                }
            });
        },
        out: function (event, elem) {
            $(this).removeClass("highlight");
        },
    });
}

function updatechartcolumnconfiguration($this, dragedtext,dropedplacetext) {
   // debugger;
    var returnflag = "False";
    var RegisterEntry = {
        "id": selectedreportid,
        "columns": JSON.stringify(selectedreportcolumns),
        "charts": JSON.stringify(selectedreportchartconfiguration),
        "cFields": JSON.stringify(selectedreportcFields)
    }
    $.ajax({
        async: true,
        type: "POST",
        url: "/Home/UpdateChartConfiguration",
        data: { obj: RegisterEntry },
        cache: false,
        dataType: "json",
        success: function (response) {
            //loading_end();
            if (response.status) {
                popupShow('Field Replaced...', 'good');
                returnflag = "True";
                $this.css('background', '#F5F8FF')
                $this.text(dragedtext);
                $this.removeClass('DropAbleArea');
                //debugger;
                var index = PinkFields.findIndex(x => x == dropedplacetext);
                PinkFields.splice(index,1);
            }
            else {
                popupShow('Field not Replaced...', 'fail');
            }
            return returnflag;
        },
        failure: function (response) {
           // loading_end();
            return returnflag;
        },
        error: function (response) {
           // loading_end();
            return returnflag;
        }
    });
}











