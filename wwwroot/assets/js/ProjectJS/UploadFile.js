var filteredData = null;
var formattedFilteredData = null;
var fileData = null;
var formattedFileData = null;
var columnNames = null;

function resetAllContent() {
 /*   $(".marque").removeClass("d-none");*/
    destroyAllCharts();
    comments_for_row = [];
    $('#FieldsList').empty();
    $('#column_fields_search').val('');
    $('#searchSavedReports').val('');
    $("#div_fieldsearch").hide();
    columnNames = null;
    fileData = null;
    filteredData = null;
    formattedFileData = null;
    formattedFilteredData = null;
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

    $('#custom_formula_column_fields').empty();
    $('#custom_formula_column_fields_search').val('');

    ClearCFields();//Clears Textboxes or select boxes or checkboxes only
    ClearCDateFields();//Clears Textboxes or select boxes or checkboxes only

    cDateFields = [];
    cFields = [];
    chartsconfigurations = [];
    chartIds = [];
    RplaceAbleFields = [];
    PinkFields = [];
    // 
    filteredData = fileData;

    var filters = $('#filters .form-control');
    for (var i = 0; i < filters.length; i++) {
        removeFilter_OnlyHtml(filters[i].parentElement.id);
    }

    $('#main_div').empty();
    AddNewRow();
}

function postfiles(CtrlName) {
    loading_start(0, 0, UploadFileMessage,false ,true);
    //if (fileData != null && fileData != undefined) {
    //    if (fileData.length > 0) {
    //        if (confirm("Are you sure to upload new file?\nAll unsaved changes will be lost...")) {

    //        }
    //        else {
    //            return;
    //        }
    //    }
    //}
   
   
    var input = document.getElementById(CtrlName);
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    if (files.length > 0) {
        if (CtrlName == "PaymentFile") {

            $("#" + CtrlName).parents().find(".text-upload").text(files[0].name);
        }
        var requestSendTime = new Date();
        debugger;
     //   loading_start(25, 25, UploadFileMessage,false,true);
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                // Upload progress
                xhr.upload.addEventListener("progress", function (evt) {
                    ComputeAjaxCallProgress(evt, UploadFileMessage,false,true);
                }, false);
                return xhr;
            },
            url: location.origin + "/Home/UploadMedia",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (response) {
                loading_start(85, 85, UploadFileMessage,false,true);
                try {
                    $(".marque").remove();
                } catch (e) {

                }

                if (response != null) {
                    if (response.status) {

                        resetAllContent();


                        var responseGetTime = new Date();
                        console.log('requestSendTime : ' + requestSendTime);
                        console.log('requestReceivedTime : ' + response.requestReceivedTime);
                        console.log('processingEndTime : ' + response.processingEndTime);
                        console.log('responseGetTime : ' + responseGetTime);


                        columnNames = response.columns;
                        fileData = JSON.parse(response.data)[0];
                        formattedFileData = JSON.parse(response.formattedData)[0];

                        columnNames.forEach(function (val, i) {
                            var columnHtml = `<li onclick="addColumnToFormula('${val}')" style="cursor:pointer" class="list-group-item columnNameLi">${val}</li>`;
                            $('#custom_formula_column_fields').append(columnHtml);
                        });

                        for (var colIndex = 0; colIndex < columnNames.length; colIndex++) {
                            for (var rowIndex = 0; rowIndex < fileData.length; rowIndex++) {
                                var ff = fileData[rowIndex][columnNames[colIndex]];
                                if (ff !== null && ff !== undefined) {
                                    if ((ff.toString().indexOf("/") > -1 || ff.toString().indexOf("-") > -1) && ff.toString().indexOf(":") > -1 && ff.toString().indexOf("T") > -1 && ff.toString().length < 20) {
                                        //Valid Date
                                        //Old code -- commented by Abdul for date field formattings
                                        //fileData[rowIndex][columnNames[colIndex]] = formattedFileData[rowIndex][columnNames[colIndex]];
                                        //End Old code -- commented by Abdul for date field formattings
                                        var mydate = new Date(ff.toString());
                                        var monthSignle = mydate.getMonth() + 1;
                                        var monthDouble = monthSignle;
                                        if (monthDouble < 10) {
                                            monthDouble = '0' + monthDouble;
                                        }
                                        var dateSignle = mydate.getDate();
                                        var dateDobule = dateSignle;
                                        if (dateDobule < 10) {
                                            dateDobule = '0' + dateDobule;
                                        }
                                        var hours = mydate.getHours();
                                        if (hours < 10) {
                                            hours = '0' + hours;
                                        }
                                        var minutes = mydate.getMinutes();
                                        if (minutes < 10) {
                                            minutes = '0' + minutes;
                                        }
                                        var seconds = mydate.getSeconds();
                                        if (seconds < 10) {
                                            seconds = '0' + seconds
                                        }
                                        fileData[rowIndex][columnNames[colIndex]] = mydate.getFullYear() + "/" + monthDouble + "/" + dateDobule + " " + hours + ":" + minutes + ":" + seconds;

                                    }
                                    else {
                                        //Not a valid Date
                                        break;

                                    }
                                }
                            }
                        }

                        filteredData = fileData;
                        formattedFilteredData = formattedFileData;


                        $('#FieldsList').empty();
                        for (var i = 0; i < columnNames.length; i++) {
                            $('#FieldsList').append(`<li category='${columnNames[i]}' class='bg-gray field field4SR'>${columnNames[i]}</li>`);
                        }

                        var noOfCol = 0;
                        var columns = '';
                        $.each($('#ReportColumns li'), function (i, item) {
                            var ThisText = $(this).text();

                            var exist = false;

                            $('#FieldsList li').each(function () {
                               /* if (($(this).text()).toLowerCase() === ThisText.toLowerCase()) {*/
                                if ($(this).text() === ThisText) {
                                exist = true;
                                }
                            });

                            if (!exist) {
                                noOfCol = noOfCol + 1;
                                columns = columns + ThisText + ", ";
                                $(this).attr('exist', 'false');
                                $(this).css('background', 'pink');
                                $(this).addClass('DropAbleArea');
                            } else {
                                 $(this).css('background', '#F5F8FF');
                               /* $(this).css('background', '#DADADA');*/
                                $(this).attr('exist', 'true');
                                $(this).removeClass('DropAbleArea');

                            }
                        })

                        if (!$('#SavedReportsSection').hasClass('d-none') && $('#ReportColumns li').length > 0) {
                            if (noOfCol > 0) {
                                columns = columns.replace(/,\s*$/, '');
                                var selectedReport = $('.ReportNames.active').text();
                                var message = `The source file uploaded: ${files[0].name} is missing ${noOfCol} columns used in ${selectedReport}: `

                                $('#ErrorMessage span').empty();
                                $('#ErrorMessage b').empty();
                                $('#ErrorMessage').removeClass('d-none');
                                $('#ErrorMessage span').prepend(message);
                                $('#ErrorMessage b').append(columns);
                            } else {

                                //$('#ErrorMessage').empty();
                                $('#ErrorMessage').addClass('d-none');
                            }

                        }

                        hideshowfieldsearchdiv();
                        $(".field").draggable({
                            revert: "invalid",
                            stack: ".draggable",
                            helper: 'clone',
                            cursor: "crosshair", revert: "invalid"
                        });

                        getAllCharts();
                        //$('#savedCharts').removeClass('d-none');

                        if ($('#ReportColumns li').length > 0) {
                            ReplaceElements();
                        }
                        loading_end();
                    }
                    else {
                        loading_end(false);
                        popupShow('Something went wrong. Please try again', 'error');
                    }
                  //  loading_end();
                }
                else {
                    loading_end(false);
                    popupShow('Something went wrong. Please try again', 'error');
                }
              
            },
            failure: function (response) {
                loading_end(false);
                popupShow('Something went wrong. Please try again', 'error');
            },
            error: function (response) {
                loading_end(false);
                popupShow('Something went wrong. Please try again', 'error');
            }
        });

        
    }
    else {
        //$("#" + CtrlName).parents().find(".text-upload").text("Upload");
        //resetAllContent();
        loading_end();
        //popupShow('Upload a file then click on save button', 'error');
        $(".marque").removeClass("d-none");
    }
}