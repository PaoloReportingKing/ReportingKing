
//$(function () {
//$(document).ready(function () {
//    Dropzone.autoDiscover = false;
//    var fileList = new Array;
//    var i = 0;

//    Dropzone.options.uploader = {
//        autoProcessQueue: false,
//        maxFiles: 1,
//        uploadMultiple: false,
//        maxFilesize: 20,//MB
//        addRemoveLinks: true,
//        dictResponseError: 'Server not Configured',
//        acceptedFiles: ".csv,.xlsx",//"audio/mpeg,audio/wav",// use this to restrict file type
//        accept: function (file, done) {
//            if (file.name == "test.jpg") {
//                alert("Can't upload a test file.");
//            }
//            else {
//                //Show a confirm alert and display the image on the page.
//            }
//        }
//    };



//});
/*});*/

var filteredData = null;
var formattedFilteredData = null;
var fileData = null;
var formattedFileData = null;
var columnNames = null;

//Dropzone.options.uploadMedia = {
//    //prevents Dropzone from uploading dropped files immediately
//    autoProcessQueue: true,
//    maxFiles: 1,
//    uploadMultiple: false,
//    maxFilesize: 20,//MB
//    addRemoveLinks: true,
//    dictResponseError: 'Server not Configured',
//    acceptedFiles: ".csv,.xlsx,.xls",// use this to restrict file type
//    init: function () {
//        // var submitButton = document.querySelector("#saveBtn");
//        var myDropzone = this; //closure
//        //  myDropzone.processQueue();
//        //submitButton.addEventListener("click", function () {
//        //    if (validateFunction()) {
//        //        return;
//        //    }
//        //    else {
//        //        //tell Dropzone to process all queued files
//        //        if (!myDropzone.files || !myDropzone.files.length) {
//        //            //No file added
//        //            $('#fileError').removeClass('d-none');
//        //            return;
//        //        } else {
//        //            Block();
//        //            //File added
//        //            myDropzone.processQueue();
//        //        }
//        //    }
//        //}),
//        this.on("success", function (file, response) {
//         //   debugger;
//            if (response != null) {
//                if (response.status) {
//                  //  debugger;
//                 //   myDropzone.removeAllFiles();

//                    columnNames = response.columns;
//                    fileData = JSON.parse(response.data)[0];

//                    $('#FieldsList').empty();
//                    for (var i = 0; i < columnNames.length; i++) {
//                        $('#FieldsList').append(`<li category='${columnNames[i]}' class='bg-gray field'>${columnNames[i]}</li>`);
//                    }

//                    $(".field").draggable({
//                        revert: "invalid",
//                        stack: ".draggable",
//                        helper: 'clone',
//                        cursor: "crosshair", revert: "invalid"
//                    });
//                }
//                else {
//                //    debugger;
//                    //popupShow(response.msg, 'error');
//                }
//            }
//            else {
//                //popupShow('Something Went Wrong...', 'error');
//            }
//        }),
//            this.on("maxfilesreached", function (file) {
//            //    debugger;
//                this.removeEventListeners();
//            }),
//            this.on("removedfile", function (file) {
//              //  debugger;
//                this.setupEventListeners();
//            }),
//            this.on("sending", function (file, xhr, formData) {
//                formData.append("file_name", $("#newFileName").val());
//            });
//    }
//};


function postfiles(CtrlName) {
    //showmodal();
    loading_start();
    var input = document.getElementById(CtrlName);
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    if (files.length > 0) {
        $.ajax({
            url: location.origin + "/Home/UploadMedia",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (response) {
                loading_end();
                //if (response.model != null && response.model.length > 0) {
                //    showmodal(response.model);
                //}
                if (response != null) {
                    if (response.status) {
                        // debugger;
                        //   myDropzone.removeAllFiles();

                        columnNames = response.columns;
                        fileData = JSON.parse(response.data)[0];
                        formattedFileData = JSON.parse(response.formattedData)[0];

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

                        //debugger;
                        filteredData = fileData;
                        formattedFilteredData = formattedFileData;


                        $('#FieldsList').empty();
                        for (var i = 0; i < columnNames.length; i++) {
                            $('#FieldsList').append(`<li category='${columnNames[i]}' class='bg-gray field field4SR'>${columnNames[i]}</li>`);
                        }
                      //  debugger;

                        

                        var noOfCol = 0;
                        var columns = '';
                        $.each($('#ReportColumns li'), function (i, item) {
                            var ThisText = $(this).text();
                            
                            var exist = false;

                            $('#FieldsList li').each(function () {
                                if (($(this).text()).toLowerCase() === ThisText.toLowerCase()) {
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
                                $(this).attr('exist', 'true');
                                $(this).removeClass('DropAbleArea');

                            }
                        })
                    //    debugger;
                        if (!$('#SavedReportsSection').hasClass('d-none') && $('#ReportColumns li').length > 0) {
                            if (noOfCol > 0) {
                                columns = columns.replace(/,\s*$/, '');
                                var selectedReport = $('.ReportNames.active').text();
                                var message = `The source file uploaded Source ${files[0].name} is missing ${noOfCol} columns used in ${selectedReport} Report: `
                                //debugger;
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
                    }
                    else {
                        //debugger;
                        //popupShow(response.msg, 'error');
                    }
                }

            },
            failure: function (response) {
                ScreenUnBlock();
                loading_end();
                //toastr.error('Error', '');
                popupShow('Error', 'error');
            },
            error: function (response) {
                ScreenUnBlock();
                loading_end();
                //toastr.error('Error', '');
                popupShow('Error', 'error');
            }
        });
    }
    else {
        loading_end();
        popupShow('Upload a file then click on save button', 'error');
    }
}