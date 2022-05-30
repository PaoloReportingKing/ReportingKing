
function saveChart() {
    if ($('#nameLabel').val().length < 1) {
        popupShow('Template name cannot be empty...', 'warn');
        return;
    }

    if (chartIds.length === 0) {
        return;
    }

    loading_start(0, 0, SaveReportsMessage);

    //if (!$("body").hasClass("enlarge-menu")) {
    //    $(".button-menu-mobile").trigger("click");
    //}

    hideallstyletoolbar();

    for (var i = 0; i < chartsconfigurations.length; i++) {
        var randomchartid = getrandomchartidusingid(chartsconfigurations[i].chartId);
        var comment = $("#comments_text_" + randomchartid).summernote("code");
        chartsconfigurations[i].comments = comment;
    }

    var reportName = $('#nameLabel').val();
    if (reportName.indexOf(`<`) > -1) {
        reportName = reportName.replaceAll(`<`, ``);
    }
    if (reportName.indexOf(`>`) > -1) {
        reportName = reportName.replaceAll(`>`, ``);
    }

    var blob = new Blob([$('#main_div').html()], { type: 'text/plain' });
    var file = new File([blob], "foo.txt", { type: "text/plain" });
    var formData = new FormData();
    formData.append("files", file);

    formData.append("id", $("#nameLabel").attr('data-id'));
    formData.append("name", reportName);
    formData.append("columns", JSON.stringify(columnNames));
    formData.append("palette", JSON.stringify(selectedpallet));
    formData.append("charts", JSON.stringify(chartsconfigurations));
    formData.append("filters", JSON.stringify(getFilterFields()));
    formData.append("chartIds", JSON.stringify(chartIds));
    formData.append("cFields", JSON.stringify(cFields));
    formData.append("cDateFields", JSON.stringify(cDateFields));
    formData.append("selectedpalletid", JSON.stringify(selectedpalletid));
    formData.append("commentsForRow", JSON.stringify(comments_for_row));
    formData.append("lastFilterVal", lastFilterVal)

    //var RegisterEntry = {
    //    "id": $("#nameLabel").attr('data-id'),
    //    "name": reportName,
    //    "columns": JSON.stringify(columnNames),
    //    "palette": JSON.stringify(selectedpallet),
    //    "charts": JSON.stringify(chartsconfigurations),
    //    "filters": JSON.stringify(getFilterFields()),
    //    "mainHtml": $('#main_div').html(),
    //    "chartIds": JSON.stringify(chartIds),
    //    "cFields": JSON.stringify(cFields),
    //    "cDateFields": JSON.stringify(cDateFields),
    //    "selectedpalletid": JSON.stringify(selectedpalletid),
    //    "commentsForRow": JSON.stringify(comments_for_row)
    //}

    $.ajax({
        processData: false,
        contentType: false,
      //  async: true,
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            // Upload progress
            xhr.upload.addEventListener("progress", function (evt) {
                ComputeAjaxCallProgress(evt, SaveReportsMessage);
            }, false);
            return xhr;
        },
        type: "POST",
        url: "/Home/SaveChart",
        //data: { obj: RegisterEntry },
        data: formData,
        //cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();

            if (response.status) {
                popupShow(response.msg, 'good');
                $("#nameLabel").attr('data-id', response.id);
                getAllCharts(true);

            }
            else {
                popupShow(response.msg, 'fail');
            }
        },
        failure: function (response) {
            loading_end(false);
        },
        error: function (response) {
            loading_end(false);
        }
    });
}
var RPID;

function OpenReportNotUsed(chartId) {

    if ($('#FieldsList li').length > 0) {
        loading_start();
        setTimeout(function () {

            $('#savedCharts').val(chartId);
            //  getChart(chartId);
            //  loading_start();
            appendchartafterload(null, false);
            //  loading_start();
            //populateDateFileds(JSON.stringify(selectedreportcDateFields));
            //  loading_start();


            SetDynamicGrid();
            if (!$("body").hasClass("enlarge-menu")) {
                $(".button-menu-mobile").trigger("click");
            }
            $('.main-icon-menu nav a:first-child').addClass('active');
            $('.main-icon-menu nav a:last-child').removeClass('active');
            //  loading_start();
            setdatausageflags();
            RefreshAllCharts(true);
            //$('.main-icon-menu nav a:first-child').addClass('active');
            //$('.main-icon-menu nav a:last-child').removeClass('active');
            refreshCommentsSection();//regenerates summernote comments
            ClearCFields();//Clears Textboxes or select boxes or checkboxes only
            ClearCDateFields();//Clears Textboxes or select boxes or checkboxes only
            loading_end();

            setTimeout(function () {
                //  reflowAllHighchartswithtimer();
                hideshowtotalonthetimeofreupload();
            }, 280);
        }, 15);
    } else {
        if (confirm("Upload source file  to continue \nor go back to Add Fields to start new report")) { }
    }

}

function OpenReport(chartId) {

    if ($('#FieldsList li').length > 0) {
        loading_start(0, 0, UpdateChartsMessage);
        setTimeout(function () {

            $('#savedCharts').val(chartId);
            //  getChart(chartId);
            //  loading_start();
            appendchartafterload(null, false);
            //  loading_start();
            //populateDateFileds(JSON.stringify(selectedreportcDateFields));
            //  loading_start();


            SetDynamicGrid();
            if (!$("body").hasClass("enlarge-menu")) {
                $(".button-menu-mobile").trigger("click");
            }
            $('.main-icon-menu nav a:first-child').addClass('active');
            $('.main-icon-menu nav a:last-child').removeClass('active');
            //  loading_start();
            setdatausageflags();
            RefreshAllCharts(true);
            //$('.main-icon-menu nav a:first-child').addClass('active');
            //$('.main-icon-menu nav a:last-child').removeClass('active');
            refreshCommentsSection();//regenerates summernote comments
            ClearCFields();//Clears Textboxes or select boxes or checkboxes only
            ClearCDateFields();//Clears Textboxes or select boxes or checkboxes only
            // loading_end();

            //    setTimeout(function () {
            //      //  reflowAllHighchartswithtimer();
            //        hideshowtotalonthetimeofreupload();
            //}, 280);
        }, 15);
    } else {
        if (confirm("Upload source file  to continue \nor go back to Add Fields to start new report")) { }
    }

}
function DeleteReport(rptId) {
    if (confirm("Are you sure you want to delete this report?")) {
        loading_start(0, 0, DeleteReportsMessage);
        $.ajax({
            async: true,
            type: "POST",
            url: "/Home/DeleteChart",
            data: { id: rptId },
            cache: false,
            dataType: "json",
            success: function (response) {

                if (response.status) {

                    getAllCharts();
                    getAllChartsForSR();

                    popupShow('Report deleted successfully...', 'success');
                }
                loading_end();
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
function getColumns(rptId, UsedColumns, addinpinkfields, onsavedreportclick) {

    var totalCharts = UsedColumns;
    var columns = '';
    var datefieldappend = [];
    var parseselectedreportdatefields = selectedreportcDateFields;
    $.each(totalCharts, function (i, item) {
        if (onsavedreportclick) {
            var datefieldindex = parseselectedreportdatefields.findIndex(x => x.name == item);
            if (datefieldindex != undefined && datefieldindex != -1) {
                var datecolumnname = parseselectedreportdatefields[datefieldindex].columnName;
                var datefieldappendnameindex = datefieldappend.findIndex(x => x == datecolumnname)
                if (datefieldappendnameindex == -1) {
                    datefieldappend.push(datecolumnname);
                    columns = columns + `<li id="${i}" exist="true" class="bg-gray-4-SR field ui-draggable ui-draggable-handle">${datecolumnname}</li>`;
                }

            }
            else {
                columns = columns + `<li id="${i}" exist="true" class="bg-gray-4-SR field ui-draggable ui-draggable-handle">${item}</li>`;
            }

        }
        else {
            columns = columns + `<li id="${i}" exist="true" class="bg-gray-4-SR field ui-draggable ui-draggable-handle">${item}</li>`;
        }

    });
    $('#ReportColumns').empty();
    $('#ReportColumns').append(columns);
    //$('#ReportColumns').addClass('ReportColumns');


    var noOfCol = 0;
    var columns = '';

    var input = document.getElementById('PaymentFile');
    var files = input.files;
    if (addinpinkfields != false) {
        PinkFields = [];
    }

    if ($('#FieldsList li').length > 0) {

        $.each($('#ReportColumns li'), function (i, item) {
            var ThisText = $(this).text();

            var exist = false;

            $('#FieldsList li').each(function () {
                //if (($(this).text()).toLowerCase() === ThisText.toLowerCase()) {
                //    exist = true;
                //}
                if ($(this).text() === ThisText) {
                    exist = true;
                }
            });

            if (!exist) {
                noOfCol = noOfCol + 1;
                columns = columns + ThisText + ", ";
                $(this).attr('exist', 'false');
                $(this).css('background', '#ffc7cf');
                $(this).css('border', '2px solid #efaaaf');
                $(this).addClass('DropAbleArea');
                // if (addinpinkfields != false) {
                var pinkfieldindex = PinkFields.findIndex(x => x == ThisText)
                if (pinkfieldindex == -1) {
                    PinkFields.push(ThisText);
                }


            } else {
                // $(this).css('background', '#F5F8FF');
                $(this).attr('exist', 'true');
                $(this).removeClass('DropAbleArea');
            }
        })

        if (noOfCol > 0) {
            columns = columns.replace(/,\s*$/, '');
            var selectedReport = $('.ReportNames.active').text();
            var message = "";

            if (files.length == 0) {
                message = `The source file uploaded: is missing ${noOfCol} columns used in ${selectedReport}: `
            }
            else {
                message = `The source file uploaded: ${files[0].name} is missing ${noOfCol} columns used in ${selectedReport}: `
            }

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
}

function refreshCommentsSection() {
    var rows = $("div[id^='charts_data_']");
    for (var j = 0; j < rows.length; j++) {
        var charts = rows[j].children;
        for (var i = 0; i < charts.length; i++) {
            var ChartId = charts[i].id.replace('chart_div_', '');
            //var comments = $(`#comments_text_${ChartId}`).summernote('code');
            var comments = $(`#comments_${ChartId} .note-editable`).html();
            $(`#comments_text_${ChartId}`).remove();
            $(`#comments_${ChartId} .note-editor`).remove();
            $(`#comments_${ChartId}`).append(`<div id="comments_text_${ChartId}" class="summernote"></div>`);
            $(`#comments_text_${ChartId}`).summernote({
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
            });
            $(`#comments_text_${ChartId}`).summernote('code', comments);
            //if ($(`#comments_${ChartId}`).hasClass('d-none')) {

            //}
            //else {
            //    ShowHideComments(ChartId);
            //}
        }

        var row_id = rows[j].id.replace('charts_data_', '');
        var myElem = $(`#comments_parent_div_${row_id}`).length;
        if (myElem === 0) {

        }
        else {
            var comments_row = $(`#comments_${row_id} .note-editable`).html();
            var dnone = false;
            if ($(`#comments_${row_id}`).hasClass('d-none')) {
                dnone = true;
            }

            var dnoneClass = '';
            if ($(`#cwr_div_${row_id}`).hasClass('d-none')) {
                dnoneClass = 'd-none';
            }

            var new_comments_html = `<a class="comment-btn" onclick="ShowHideComments('${row_id}')" style="margin-left:15px;color:#4d79f6;font-size: 12px;cursor: pointer;margin-top: 20px; margin-bottom: 10px;">Comment</a>
                                    <div class="row ${dnoneClass}" id="cwr_div_${row_id}" style="margin-left:15px; margin-top: 20px;">
                                        <input class="mt-1 mr-1" type="checkbox" id="cwr_${row_id}" checked onchange="show_row_comments('${row_id}')">
                                        <label>Resize</label>
                                    </div>`;

            $(`#comments_parent_div_${row_id}`).empty();
            $(`#comments_parent_div_${row_id}`).append(new_comments_html);

            $(`#comments_${row_id}`).empty();
            $(`#comments_${row_id}`).append(`<div id="comments_text_${row_id}" class="summernote"></div>`);

            //$(`#${row_id} .dynamic-grid .card-body`).append(new_comments_html);

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
                fontSizes: fontSizesArray,
                tooltip: false
            });

            $(`#comments_text_${row_id}`).summernote('code', comments_row);
            if (!dnone) {
                ShowHideComments(row_id);
                ShowHideComments(row_id);
            }
            AutoAdjustWholeComment(row_id);





            ////var comments_row = $("#comments_text_" + row_id).summernote('code');
            //var dnone = false;
            //if ($(`#comments_${row_id}`).hasClass('d-none')) {
            //    dnone = true;
            //}

            //var comments_row = $(`#comments_${row_id} .note-editable`).html();
            ////$(`#comments_text_${row_id}`).remove();
            //$(`#comments_${row_id}`).remove();
            //$(`#comments_parent_div_${row_id}`).remove();
            //var new_comments_html = `<div id="comments_parent_div_${row_id}" class="row">
            //                    <a class="comment-btn" onclick="ShowHideComments('${row_id}')" style="margin-left:15px;color:#4d79f6;font-size: 12px;cursor: pointer;margin-top: 20px; margin-bottom: 10px;">Comment</a>
            //                    <div class="row d-none" id="cwr_div_${row_id}" style="margin-left:15px; margin-top: 20px;">
            //                        <input class="mt-1 mr-1" type="checkbox" id="cwr_${row_id}" checked onchange="show_row_comments('${row_id}')">
            //                        <label>Resize</label>
            //                    </div>
            //                </div>
            //                <div id="comments_${row_id}" class="form-group notes d-none" style="display:none;">
            //                    <div id="comments_text_${row_id}" class="summernote"></div>
            //                </div>`;
            //$(`#${row_id} .dynamic-grid .card-body`).append(new_comments_html);

            //$(`#comments_text_${row_id}`).summernote({
            //    toolbar: [
            //        // [groupName, [list of button]]
            //        ['style', ['bold', 'italic', 'underline', 'clear']],
            //        ['font', ['strikethrough', 'superscript', 'subscript']],
            //        ['fontsize', ['fontsize']],
            //        ['color', ['color']],
            //        ['para', ['ul', 'ol', 'paragraph']],
            //        ['height', ['height']]
            //    ],
            //      tooltip: false
            //});

            //$(`#comments_text_${row_id}`).summernote('code', comments_row);

            //if (!dnone) {
            //    ShowHideComments(row_id);
            //}

            //AutoAdjustWholeComment(row_id);
        }
    }
    refreshCommentsCharts();
}

function refreshCommentsCharts() {
    let cmntCharts = document.querySelectorAll("[data-charttype='comments_chart']");

    for (let j = 0; j < cmntCharts.length; j++) {
        let ChartId = cmntCharts[j].id;
        let asliChartId = ChartId.replace('chart_', '');
        //let commentsChartHtml = $("#comments_chart_text_" + asliChartId).summernote('code');

        var comments = $(`#${ChartId} .note-editable`).html();
        $(`#${ChartId}`).empty();
        displayCommentsChart(ChartId);
        $("#comments_chart_text_" + asliChartId).summernote('code', comments);
    }
}

function getChart(id) {
    /*if ($('#PaymentFile').val() === "") {*/
    if (fileData.length === 0) {
        popupShow('Upload a file then click on save button', 'error');
        $('#savedCharts').val(0);
        return;
    }

    if (!$("body").hasClass("enlarge-menu")) {
        $(".button-menu-mobile").trigger("click");
    }

    $('.main-icon-menu nav a').removeClass('active');
    $('.main-icon-menu nav a:first-child').addClass('active');

    if (confirm("Are you sure to load this template?\nAll previous settings will be lost...")) {
        loading_start();
        destroyAllCharts();
        showChartsDiv();
        var myChartId = $('#savedCharts').val();

        if (myChartId === "0") {
            $("#nameLabel").attr('data-id', '0');
            $('#nameLabel').val('Report Title - Untitled');
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
            cDateFields.forEach(function (val, index) {
                $('#custom_date_created_fields_list a').click();
            })

            cDateFields = [];
            cFields = [];
            chartsconfigurations = [];
            chartIds = [];
            filteredData = fileData;

            var filters = $('#filters .form-control');
            for (var i = 0; i < filters.length; i++) {
                removeFilter_OnlyHtml(filters[i].parentElement.id);
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

                    if (response.status) {
                        populateDateFileds(response.data.cDateFields)
                        appendchartafterload(response, true);
                        SetDynamicGrid();
                        RefreshAllCharts(true);
                        //refreshCommentsSection();//regenerates summernote comments
                        ClearCFields();//Clears Textboxes or select boxes or checkboxes only
                        ClearCDateFields();//Clears Textboxes or select boxes or checkboxes only
                    }
                    loading_end();
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

function refreshFilterSection() {
    $('.select2').select2({
        placeholder: "Filter Items",
    });
}

function SetDynamicGrid() {
    var rows = $("div[id^='charts_data_']");
    for (var j = 0; j < rows.length; j++) {
        var charts = rows[j].children;
        var rowId = rows[j].id.replaceAll('charts_data_', '');
        $(`#${rowId} .dynamic-grid`).removeClass("col-md-12");
        if ($("body").hasClass("enlarge-menu")) {
            $(`#${rowId} .dynamic-grid`).addClass("col-md-12");
        }
        else if (charts.length > 3 || charts.length === 0) {
            $(`#${rowId} .dynamic-grid`).addClass("col-md-12");
        }
        else {
            $(`#${rowId} .dynamic-grid`).addClass("col-md-9");
        }
    }

    refreshFilterSection();//only refreshes filters section layout
}

function appendchartafterload(response, onchange) {

    if (onchange) {

        cFields.forEach(function (val, index) {
            $('#custom_created_fields_list a').click();
        })
        cFields = [];

        selectedpallet = JSON.parse(response.data.palette);
        selectedpalletid = JSON.parse(response.data.selectedpalletid);
        chartsconfigurations = JSON.parse(response.data.charts);
        comments_for_row = JSON.parse(response.data.commentsForRow);
        setdatausageflags();
        chartIds = JSON.parse(response.data.chartIds);
        var id = response.data.id;
        var name = response.data.name;
        var mainHtml = response.data.mainHtml;
        $('#main_div').empty();
        $('#main_div').append(mainHtml);
        var cFieldsfor_temp = JSON.parse(response.data.cFields);
        var templateFilters = JSON.parse(response.data.filters);


        $("#nameLabel").attr('data-id', id);
        $('#nameLabel').val(name);


        //Set Calculated Fields
        var cFields_temp = cFieldsfor_temp;
        cFields_temp.forEach(function (val, index) {
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
            removeFilter_OnlyHtml(filters[i].parentElement.id);
        }

        if (templateFilters.length > 0) {
            $("#main_div").css("padding-top", "155px");
        }
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
                `<select id="select_${randomId}" onchange="updateFilterData('${droppeditem}', true)" class="form-control select2 " multiple="multiple">` +
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


        RplaceAbleFields = [];
        $.each(chartsconfigurations, function (i, item) {
            getUsedColumns(item);

        })
        getColumns(id, RplaceAbleFields);
        // RefreshAllCharts(true);
        SetSelectedColourPallets(selectedpalletid, true);

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
        loading_end();
    }
    else {
        loading_start();
        $('.main-icon-menu nav a').removeClass('active');
        $('.main-icon-menu nav a:first-child').addClass('active');
        $('#main_div').removeClass('d-none');

        $('#custom_fields_main_div').addClass('d-none');
        $('#SavedReportsSection').addClass('d-none');

        cFields.forEach(function (val, index) {
            $('#custom_created_fields_list a').click();
        })

        cDateFields.forEach(function (val, index) {
            $('#custom_date_created_fields_list a').click();
        })
        loading_start();
        cDateFields = [];
        cFields = [];
        loading_start();



        destroyAllCharts(false);
        populateDateFileds(JSON.stringify(selectedreportcDateFields));
        selectedpallet = selectedreportpallet;
        selectedpalletid = selectedreportpalletid;
        chartsconfigurations = selectedreportchartconfiguration;
        comments_for_row = selectedreportrowcomments;
        loading_start();
        setdatausageflags();
        chartIds = selectedreportchartIds;
        lastFilterVal = selectedLastFilterVal;
        var id = selectedreportid;
        var name = selectedreportname;
        var mainHtml = selectedreportmainhtml;
        
        $('#main_div').empty();
        $('#main_div').append(mainHtml);
        // loading_start();
        var cFieldsfor_temp = selectedreportcFields;//JSON.parse(response.data.cField);
        var templateFilters = selectedreportchartsfilter;//JSON.parse(response.data.filters);

        $("#nameLabel").attr('data-id', id);
        $('#nameLabel').val(name);


        ////Set Calculated Fields
        var cFields_temp = cFieldsfor_temp;
        if (cFields_temp != null && cFields_temp != undefined) {
            cFields_temp.forEach(function (val, index) {
                $('#custom_field_name').val(val.name);
                $('#custom_formula').val(val.formula);
                $('#decimal_places').val(val.decimalPlaces);
                $('#custom_field_format').val(val.formattingType);
                $('#format_currency').val(val.currencySymbol);
                showFormatOptions();
                $('#custom_field_format_type').val(val.formatType);

                createField();
            })
        }
        //Set Calculated Fields
        //debugger;
        ////Set pallete btn
        $("#Colors :input").each(function (i, el) {
            if (JSON.stringify(selectedpallet) === JSON.stringify(palleteArray[i])) {
                $(this).prop("checked", true);
            }
            else {
                $(this).prop("checked", false);
            }
        });
        debugger;
        $("#" + selectedpalletid).prop("checked", true);
        //Set pallete btn

        //Repopulate Filters Section
        var filters = $('#filters .form-control');
        for (var i = 0; i < filters.length; i++) {
            removeFilter_OnlyHtml(filters[i].parentElement.id);
        }

        if (templateFilters != null && templateFilters.length > 0) {
            $("#main_div").css("padding-top", "155px");
            for (var xxx = 0; xxx < templateFilters.length; xxx++) {
                var droppeditem = templateFilters[xxx].Field;

                $(".append-filter h4").hide();
                var totalOptions = [];
                var totalFormattedOptions = [];

                //$.each(fileData, function (i, item) {
                //    if (item[droppeditem] != null && item[droppeditem] != undefined) {
                //        totalOptions.push(item[droppeditem]);
                //    }
                //});
                //var uniqueOptions = [... new Set(totalOptions)];
                //uniqueOptions.sort();

                //var options = '';
                //$.each(uniqueOptions, function (i, item) {
                //    options = options + `<option>${item}</option>`;
                //});//commented by umar on 27-Dec-2021

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

                var html =
                    '<div class="col-3">' +
                    '<div id="' + randomId + '" class="form-group">' +
                    `<label><a onclick="removeFilter('` + randomId + `')" style="color:red">X</a>&nbsp;&nbsp;&nbsp;<span>` + droppeditem + `</span></label>` +
                    `<select id="select_${randomId}" onchange="updateFilterData('${droppeditem}', true)" class="form-control select2 " multiple="multiple">` +
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

                let ooptions = $(`#${randomId} .form-control > option`);
                for (let o = 0; o < ooptions.length; o++) {
                    let findIndex = templateFilters.findIndex(x => x.Field == droppeditem);
                    let dataFilters = templateFilters[findIndex];
                    let optionName = $(ooptions[o]).val().trim();
                    if (dataFilters['Values'].some(x => x.trim() == optionName)) {
                        $(ooptions[o]).prop('selected', true);
                    }

                    if (dataFilters['DisabledValues'].some(x => x.trim() == optionName)) {
                        $(ooptions[o]).attr('disabled', 'disabled');
                    }
                }

                updateFilterData(undefined, false);

                //var selOptns = [];
                //for (var yyy = 0; yyy < templateFilters[xxx].Values.length; yyy++) {
                //    selOptns.push(templateFilters[xxx].Values[yyy].trim());
                //}
                //$(`#select_${randomId}`).val(selOptns);
                //$(`#select_${randomId}`).trigger('change');
            }
        }

        setTimeout(refreshSelect2, 200);

        RplaceAbleFields = [];
        $.each(selectedreportchartconfiguration, function (i, item) {
            getUsedColumns(item);

        })
        getColumns(id, RplaceAbleFields, false);
        //  RefreshAllCharts(true);
        // loading_start();
        //   SetSelectedColourPallets(selectedpalletid, true);
        // loading_start();


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

        //   loading_start();
    }

    $('.container-fluid.filters').removeClass('d-none');
}
function getFilterFields() {
    asliFilters = [];
    var filters = $('#filters .form-control');
    for (var i = 0; i < filters.length; i++) {
        var parentId = $(filters[i]).parent().attr('id');
        var colName = $(`#${parentId} label span`).text();
        //let options = $(`#${parentId} .form-control > option`);

        var RegisterEntry = {
            "Field": colName,
            "Values": [],
            "DisabledValues": []
        }

        let dOpts = document.getElementById(parentId).querySelectorAll("[disabled]");
        for (let o = 0; o < dOpts.length; o++) {
            RegisterEntry.DisabledValues.push($(dOpts[o]).val());
        }

        for (var j = 0; j < filters[i].selectedOptions.length; j++) {
            var value = filters[i].selectedOptions[j].textContent;
            RegisterEntry.Values.push(value);
        }

        asliFilters.push(RegisterEntry);
    }

    return asliFilters;
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
function getAllChartsForSR(hideloader) {

    loading_start(0, 0, SyncAllChartsMessage);
    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            // Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = (evt.loaded / evt.total) * 100;
                    ComputeAjaxCallProgress(evt, SyncAllChartsMessage);
                }
            }, false);
            return xhr;
        },


        async: true,
        type: "POST",
        url: "/Home/GetAllCharts",
        cache: false,
        dataType: "json",
        success: function (response) {
           
            loading_start(85, 85, SyncAllChartsMessage);
            setTimeout(function () {
                if (response.status) {
                    var lines = ``;

                    $.each(response.data, function (i, item) {
                        var totalCharts = JSON.parse(item.chartIds);
                        lines = lines + `<li class="bg-gray-4-SR field ui-draggable ui-draggable-handle class4SearchPurposeOuter" style="background: none;"><a onclick="SR_ShowFields(${item.id})" href="#." class="ReportNames col-md-4 class4SearchPurpose" style="display: inline-block;background-color: #f7f7f7; !important; padding: 20px;border-radius: 6px;" id="RN-${item.id}" >${item.name}</a><ul class="ui-details col-md-8 d-none" id="ui-details-${item.id}" style="bottom: unset;"><li style='cursor:default'><label >${item.createdOn}</label></li> <li style='cursor:default'><label>${totalCharts.length} Chart(s)</label></li> <li style='background-color:transparent'><button class="btn btn-success" onclick="OpenReport(${item.id})">Open</button></li> <li style='cursor:default'><label style="color:red;cursor:pointer" onclick="DeleteReport(${item.id})">Delete</label></ul></li>`;
                    });
                    $('#SavedReportUL').empty();
                    $('#SavedReportUL').append(lines);
                    var value = $('#searchSavedReports').val().toLowerCase();
                    if (value != "") {
                        searchSavedReports();

                    }
                 //   loading_end();
                    if (RPID != undefined && RPID > 0) {
                        
                        SR_ShowFields(RPID,false);
                    }
                    else {
                        loading_end();
                    }

                }
                if (hideloader != false) {
                    loading_end();
                }
              
            }, 200);
            
          
            // 
        },
        failure: function (response) {
            loading_end(false);
        },
        error: function (response) {
            loading_end(false);
        }
    });
}

function getAllCharts(isSave, HideLoader) {
    if (getpermissionstatus("SavedReports")) {


      //  loading_start(0, 0, 'Loading...');//loading_start();

        $.ajax({
            async: true,
            type: "POST",
            url: "/Home/GetAllCharts",
            cache: false,
            dataType: "json",
            success: function (response) {

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
                if (HideLoader != false) {
                    loading_end();
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

function SR_ShowFields(id,ShowLoader) {
    debugger;
    if (id != undefined && id > 0) {

    
    selectedreportid = id;
    $('.ReportNames').css('color', '#50649c')
    $('#RN-' + id).css('color', '#1ecab8')
    $('.ReportNames').removeClass('active');
    $('#RN-' + id).addClass('active');
    $('.ui-details').addClass('d-none');
    var ud = 'ui-details-' + id;
    $('#' + ud).removeClass('d-none');
        getselectedreportChartconfiguration(id, ShowLoader);
    RPID = id;
    }
}

function ApplyFormatting(val, fieldName) {

    if (typeof (val) !== "number") {
        return val;
    }

    if (isNaN(val)) {
        return val;
    }

    try {
        var sampleValue = getsamplevalue(fieldName);//formattedFileData[0][fieldName];

        if (sampleValue === undefined || sampleValue === null ) {
            return val;
        }

        /*if (formattedFileData[i][fieldName] != undefined ||sampleValue.includes("/") || sampleValue.includes(":") || sampleValue.includes("-")) {*/


        if (sampleValue.includes("/") || sampleValue.includes(":") || sampleValue.includes("-")) {
            return val;
        }


        var fVal = sampleValue.trim();
    }
    catch
    {
        return val;
    }

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

    temp_val = formatNumber(val.toFixed(noofdecimalplaces));//val.toFixed(noofdecimalplaces);//roundDownSignificantDigits(val, noofdecimalplaces + 1);//formatter.format(roundDownSignificantDigits(val, noofdecimalplaces + 1));//trauncateFractionAndFormat(formatter.format(val, noofdecimalplaces));

    finalString = finalString.replaceAll(".", "");
    finalString = finalString.replaceAll(",", "");

    finalString = finalString.replaceAll(numCode, temp_val);

    return finalString;
}


function formatNumber(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
    //return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    //if ($('#PaymentFile').val() != "") {
    if (fileData.length != 0) {
        for (var i = 0; i < formattedFileData.length; i++) {
            if (formattedFileData[i][fieldName] != undefined && (formattedFileData[i][fieldName].includes("/") || formattedFileData[i][fieldName].includes(":") || formattedFileData[i][fieldName].includes("-") || formattedFileData[i][fieldName] == undefined || formattedFileData[i][fieldName] == null || formattedFileData[i][fieldName] == "" || formattedFileData[i][fieldName].trim() == "")) {
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




//this is  used
function getselectedreportChartconfiguration(myChartId,ShowLoader) {

    selectedreportid = myChartId;
    if (ShowLoader != false) {
        loading_start(0, 0, DownLoadingReportMessage);
    }
    
    $.ajax({
        async: true,
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            // Download progress
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = (evt.loaded / evt.total) * 100;
                    if (ShowLoader != false) {
                        ComputeAjaxCallProgress(evt, DownLoadingReportMessage);
                    }
                   
                }
            }, false);
            return xhr;
        },
        type: "POST",
        url: "/Home/GetChart",
        data: { id: myChartId },
        cache: false,
        dataType: "json",
        success: function (response) {

            if (response.status) {
                if (ShowLoader != false) {
                    loading_start(85, 85, DownLoadingReportMessage);
                }
               
                selectedreportchartconfiguration = JSON.parse(response.data.charts);
                selectedreportchartIds = JSON.parse(response.data.chartIds);
                selectedreportcolumns = JSON.parse(response.data.columns);

                //Set Calculated Fields
                if (response.data.cFields != "") {
                    selectedreportcFields = JSON.parse(response.data.cFields);
                }
                try {
                    selectedreportrowcomments = JSON.parse(response.data.commentsForRow);
                }
                catch
                {
                    selectedreportrowcomments = [];
                }
                selectedreportpallet = JSON.parse(response.data.palette);
                selectedreportmainhtml = response.data.mainHtml;
                selectedreportchartsfilter = JSON.parse(response.data.filters);
                selectedLastFilterVal = response.data.lastFilterVal;
                selectedreportpalletid = JSON.parse(response.data.selectedpalletid);
                selectedreportname = response.data.name;
                if (response.data.cDateFields != "") {
                    selectedreportcDateFields = JSON.parse(response.data.cDateFields);
                }

                //Set Calculated Fields
                formulaName = [];
                RplaceAbleFields = [];
                $.each(selectedreportcFields, function (i, item) {
                    formulaName.push(item.name);

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

                $.each(selectedreportchartconfiguration, function (i, item) {
                    getUsedColumns(item);
                })
                $.each(formulaName, function (i, item) {
                    RplaceAbleFields = jQuery.grep(RplaceAbleFields, function (value) {
                        return value != item ? item : "";
                    });
                });
                getColumns(myChartId, RplaceAbleFields, false, true);
                loading_end();
            }
            else {
                loading_end(false);
            }
            
        },
        failure: function (response) {
            loading_end(false);
        },
        error: function (response) {
            loading_end(false);
        }
    });
}
//


function ReplaceChartsColumn(dropedplacetext, dragedtext) {
    //var selectedreport = selectedreportid;
    debugger;
    var returnvalue = "True";
    try {
        $.each(selectedreportchartconfiguration, function (s, chart) {
            if (chart.chartXAxis == dragedtext) {
                popupShow('Field cannot be replaced...', 'fail');
                returnvalue = "False";
                return returnvalue;
            }
            else if (chart.chartXAxis.indexOf(dropedplacetext) != -1) {
                selectedreportchartconfiguration[s].chartXAxis = selectedreportchartconfiguration[s].chartXAxis.replace(dropedplacetext, dragedtext);
            }
            $.each(chart.chartYAxises, function (i, chartyaxis) {
                if (chartyaxis.label == dragedtext) {
                    popupShow('Field cannot be replaced...', 'fail');
                    returnvalue = "False";
                    return returnvalue;
                }
                else if (chartyaxis.label.indexOf(dropedplacetext) != -1) {
                    selectedreportchartconfiguration[s].chartYAxises[i].label = selectedreportchartconfiguration[s].chartYAxises[i].label.replace(dropedplacetext, dragedtext);
                }
            });
        });
        $.each(selectedreportcolumns, function (i, column) {
            if (column == dropedplacetext) {
                selectedreportcolumns[i] = dragedtext;
                //return returnvalue;
            }
        });
        $.each(selectedreportcFields, function (i, column) {
            selectedreportcFields[i].formula = selectedreportcFields[i].formula.replace(dropedplacetext, dragedtext);

        });
        $.each(selectedreportcDateFields, function (i, column) {

            selectedreportcDateFields[i].columnName = selectedreportcDateFields[i].columnName.replace(dropedplacetext, dragedtext);
            selectedreportcDateFields[i].name = selectedreportcDateFields[i].name.replace(dropedplacetext, dragedtext);
        });
    } catch (e) {
        return "False";
    }
    return returnvalue;
}

function ReplaceElements() {
    $(".DropAbleArea").droppable({
        accept: ".field4SR",
        hoverClass: "highlight",
        helper: "clone",
        drop: function (event, ui) {
            var $this = $(this);
            var dropedplacetext = $this.text();
            var dragedtext = ui.draggable.text();
            var indexofexeistingfield = RplaceAbleFields.findIndex(x => x == dragedtext);
            if (indexofexeistingfield != -1) {
                popupShow('Field cannot be replaced...', 'fail');
                return false;
            }
            var replacevalue = ReplaceChartsColumn(dropedplacetext, dragedtext);
            if (replacevalue == "True") {
                $this.css('background', '#ebf1fc')
                /*$this.css('background', '#DADADA')*/
                $this.text(dragedtext);
                $this.removeClass('DropAbleArea');
                var index = PinkFields.findIndex(x => x == dropedplacetext);
                PinkFields.splice(index, 1);
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

function updatechartcolumnconfiguration($this, dragedtext, dropedplacetext) {
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
                /* $this.css('background', '#DADADA')*/
                $this.text(dragedtext);
                $this.removeClass('DropAbleArea');
                var index = PinkFields.findIndex(x => x == dropedplacetext);
                PinkFields.splice(index, 1);
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


function populateDateFileds(cDateFieldsString) {
    try {
        var cDateFileds_temp = JSON.parse(cDateFieldsString)
        cDateFileds_temp.forEach(function (val, index) {
            var params = {
                date_field_drop: val.columnName,
                date_day: false,
                date_week: false,
                date_month: false,
                date_year: false,
                date_quarter: false,
                date_week_start: val.weekStart

            }
            if (val.format == "Weekday") {
                params.date_day = true
            }
            if (val.format == "Week") {
                params.date_week = true
            }
            if (val.format == "Year") {
                params.date_year = true
            }
            if (val.format == "Quarter") {
                params.date_quarter = true
            }
            if (val.format == "Month") {
                params.date_month = true
            }


            createDateField(params)
        })
    } catch (err) { }
}
