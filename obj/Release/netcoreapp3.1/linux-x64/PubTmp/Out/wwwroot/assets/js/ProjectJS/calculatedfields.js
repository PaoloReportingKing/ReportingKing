function ScrollNow() {
  //  debugger;

    if (currentscroll == 0 || $(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
    }
    else {
        console.log(currentscroll);
        $(window).scrollTop(currentscroll);
    }

}
createdFields = [];
cFields = [];
cDateFields = [];
function showCreatedField(filedName) {

    columnNames.push(filedName);
    var id = Date.now()
    var fieldHtml = `<li id="menu_column_${id}" category="${filedName}" class="bg-gray field ui-draggable ui-draggable-handle">${filedName}</li>`;
    $('#FieldsList').append(fieldHtml);
    hideshowfieldsearchdiv();
    $(".field").draggable({
        revert: "invalid",
        stack: ".draggable",
        helper: 'clone',
        cursor: "crosshair", revert: "invalid"

    });
    var sidePanelHtml = `<div class="row" id="custom_created_fields_${id}">
                                <div class="col-md-2">
                                    <a onclick="removeCreatedField('${id}','${filedName}')" style="color:red; float:right; cursor:pointer;">X</a>
                                </div>
                                <div class="col-md-10">
                                    <p>${filedName}</p>
                                </div>

                            </div>`;
    $('#custom_created_fields_list').append(sidePanelHtml);

}

function GetInternalDashboardData() {
    TurnOffVideo();
    $('#main_div').addClass('d-none');
    $("#new_row_btn").addClass('d-none');
    $('#custom_fields_main_div').addClass('d-none');
    $('#SavedReportsSection').addClass('d-none');
    $('#InternalDashBoardSection').removeClass('d-none');
    $('.left-sidenav').css('min-width', '80px')
    $('#LeftSideFileUpload').addClass('d-none')
    $('#AccountDetailsSection').addClass('d-none')
    $("#VedioTutorialSection").addClass('d-none');
    $('#stuff_content').addClass('d-none');
    $(".filters h4").removeClass("visibility");
}



function showFieldsDiv() {
    restartCaption();
    TurnOffVideo();
    try {
        debugger;
        if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
          
            currentscroll = $(document).scrollTop();
        }
        //window.scrollTo(0, 0);
        $('#main_div').addClass('d-none');
        $("#new_row_btn").addClass('d-none');
        $('.container-fluid.filters').addClass('d-none');
        $('#custom_fields_main_div').removeClass('d-none');
        $('#custom_formula_column_fields').empty();
        $('#SavedReportsSection').addClass('d-none');
        $('#AccountDetailsSection').addClass('d-none');
        $("#VedioTutorialSection").addClass('d-none');
        $('#useful_stuff').addClass('d-none');
        $('#stuff_content').addClass('d-none');
        $(".filters h4").removeClass("visibility");
        if (columnNames != null) {
            columnNames.forEach(function (val, i) {
                var columnHtml = `<li onclick="addColumnToFormula('${val}')" style="cursor:pointer" class="list-group-item columnNameLi">${val}</li>`;
                $('#custom_formula_column_fields').append(columnHtml);
            });
        }
        if (!$('#new_row_btn').hasClass('d-none')) {
            $('#new_row_btn').addClass('d-none');
            $('#new_row_btn').addClass('customfield_page_remove')
        }
        $('.left-sidenav').css('min-width', '365px')
        $('#LeftSideFileUpload').removeClass('d-none')
        $('#InternalDashBoardSection').addClass('d-none')
    } catch (err) {

    }
    $(`#date_field_drop`).droppable({
        accept: ".field",
        drop: function (event, ui) {
            var colName = ui.draggable.attr('category');
            $('#date_field_drop').text(colName);
        },
        over: function (event, elem) {
            $(this).addClass("over");
        }
        ,
        out: function (event, elem) {
            $(this).removeClass("over");
        }
    });
}
function SavedFieldsDiv() {
    TurnOffVideo();

    if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
        //debugger;
        currentscroll = $(document).scrollTop();
    }
    $('.left-sidenav').css('min-width', '365px')
    $('#LeftSideFileUpload').removeClass('d-none')
    $('#InternalDashBoardSection').addClass('d-none')
    $("#VedioTutorialSection").addClass('d-none');
    $(".filters h4").removeClass("visibility");
    //$('.ui-details').addClass('d-none');
    //$('.ReportNames').css('color', '#50649c')
    // 
    if (getpermissionstatus("SavedReports")) {
        $('#main_div').addClass('d-none');
        $("#new_row_btn").addClass('d-none');
        $('#custom_fields_main_div').addClass('d-none');
        //  $("#filters").addClass('d-none');
        $('#SavedReportsSection').removeClass('d-none');
        $('#AccountDetailsSection').addClass('d-none');
        $('#stuff_content').addClass('d-none');
        $(".filters h4").removeClass("visibility");
        //$('#ReportColumns').empty();
        getAllChartsForSR(false);
        if ($(".ui-details").not(".d-none").length == 0) {
            getAllCharts(false,false);
        }

    }
    else {
        popupShow("Update Package Plan", 'fail');
        setTimeout(function () {
            $('#a_AddFields').click();
        }, 0);
    }

    //$('#SavedReportUL').addClass('ReportColumns');
}
function restartCaption() {
    try {
        document.getElementById('marque').stop();
        document.getElementById('marque').start();
    } catch (e) {

    }
}
function showChartsDiv() {
    
    TurnOffVideo();
    restartCaption();
    
    $('.left-sidenav').css('min-width', '365px')
    $('#LeftSideFileUpload').removeClass('d-none')
    $('#InternalDashBoardSection').addClass('d-none')
    
    //window.scrollTo(0, 0);
    $('#main_div').removeClass('d-none');

    $('.container-fluid.filters').removeClass('d-none');
    $('#custom_fields_main_div').addClass('d-none');
    $('#SavedReportsSection').addClass('d-none');
    $('#AccountDetailsSection').addClass('d-none');
    $("#VedioTutorialSection").addClass('d-none');
    $('#useful_stuff').addClass('d-none');
    $(".filters h4").removeClass("visibility");
    $('#stuff_content').addClass('d-none');
    // $("#filters").removeClass('d-none');

    if ($('#new_row_btn').hasClass('customfield_page_remove')) {
        $('#new_row_btn').removeClass('d-none');
        $('#new_row_btn').removeClass('customfield_page_remove')
    }
    ScrollNow();
}

function showFormatOptions() {
    $('#format_choose_currency').addClass('d-none');
    if ($('#custom_field_format').val() != "") {

        $('#custom_field_format_type').empty()
        $('#format_type_div').removeClass('d-none');
        var option = $('#custom_field_format').val();

        if (option == "4" || option == "5") {
            $("#row_DecimalPlacesLabel").addClass("d-none");
            $("#row_DecimalPlaces").addClass("d-none");
        }
        else {
            $("#row_DecimalPlacesLabel").removeClass("d-none");
            $("#row_DecimalPlaces").removeClass("d-none");
        }

        var html = ``;
        switch (option) {
            case "0":
                // Number
                html = `<option value="-1234">-1234</option>

                        <option value="1,234">1,234</option>`
                $('#custom_field_format_type').append(html)
                break;
            case "1":
                // Percentage
                html = `<option value="137">137</option>`
                $('#custom_field_format_type').append(html)
                break;
            case "2":
                // Currency
                $('#format_choose_currency').removeClass('d-none');
                var currencySymbol = $("#format_currency option:selected").text();
                html = `<option value="1234">-${currencySymbol}1234</option>
                        <option value="1,234.00">${currencySymbol}1,234.00</option>`
                $('#custom_field_format_type').append(html)
                break;
            case "3":
                // Account
                break;
            case "4":
                // Date
                html = `<option value="M/D/YY">M/D/YY</option>
                        <option value="MM/DD/YY">MM/DD/YY</option>
                        <option value="D. MMMM YYYY">D. MMMM YYYY</option>
                        <option value="NN, MMM D, YY">NN, MMM D, YY</option>
                        <option value="MM-DD">MM-DD</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="MMMM D, YYYY">MMMM D, YYYY</option>`
                $('#custom_field_format_type').append(html)
                break;
            case "5":
                // Time
                html = `<option value="HH:MM">HH:MM</option>
                        <option value="HH:MM:SS">HH:MM:SS</option>
                        <option value="HH:MM AM/PM">HH:MM AM/PM</option>
                        <option value="HH:MM:SS AM/PM">HH:MM:SS AM/PM</option>
                        <option value="MM:SS.00">MM:SS.00</option>
                        <option value="MM/DD/YYYY HH:MM AM/PM">MM/DD/YYYY HH:MM AM/PM</option>
                        <option value="MM/DD/YY HH:MM AM/PM">MM/DD/YY HH:MM AM/PM</option>
                        <option value="MM/DD/YYYY HH:MM:SS">MM/DD/YYYY HH:MM:SS</option>
                        <option value="YYYY-MM-DD HH:MM:SS">YYYY-MM-DD HH:MM:SS</option>`
                $('#custom_field_format_type').append(html)
                break;
            default:
                break;
        }
    } else {
        $('#format_type_div').addClass('d-none');
    }
}
function showCurrencyFormating() {
    $('#custom_field_format_type').empty()
    $('#format_choose_currency').removeClass('d-none');
    var currencySymbol = $("#format_currency option:selected").text();
    html = `<option value="1234">-${currencySymbol}1234</option>
                        <option value="1234.00">${currencySymbol}1234.00</option>
                        <option value="1,234.00">${currencySymbol}1,234.00</option>`
    $('#custom_field_format_type').append(html)
}
function addColumnToFormula(column) {
    $('#custom_formula').val($('#custom_formula').val() + '"' + column + '" ');
}
function calculateDecimalPlaces(type) {
    var decimal_val = parseInt($('#decimal_places').val());
    if (type == "minus" && decimal_val != 0) {

        $('#decimal_places').val((decimal_val - 1))
    }
    else if (type == "plus") {
        $('#decimal_places').val((decimal_val + 1))
    }
}

function showAccountDetails() {
    TurnOffVideo();
    if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
        debugger;
        currentscroll = $(document).scrollTop();
    }
    $('#main_div').addClass('d-none');
    $("#new_row_btn").addClass('d-none');
    $('.container-fluid.filters').addClass('d-none');
    $('#custom_fields_main_div').addClass('d-none');
    $('#custom_formula_column_fields').empty();
    $('#SavedReportsSection').addClass('d-none');
    $("#VedioTutorialSection").addClass('d-none');
    $('.left-sidenav').css('min-width', '365px')
    $('#LeftSideFileUpload').removeClass('d-none')
    $('#InternalDashBoardSection').addClass('d-none')

    $('#AccountDetailsSection').removeClass('d-none');
    $('#stuff_content').addClass('d-none');
    $(".filters h4").removeClass("visibility");
    GetUserProfile();
}

function createField(refreshaftercreation) {
    //
    if (!getpermissionstatus("CalculatedFields")) {
        return false;
    }

    $('#errors_fileds').empty();
    var filedName = $("#custom_field_name").val();
    var formulaString = $('#custom_formula').val();
    //var findCOlumnExist = columnNames.find(x => x == filedName);
    var findCOlumnExist = columnNames != null ? columnNames.find(x => x == filedName) : undefined;
    if (findCOlumnExist != undefined) {
        generateError("Name already exist")
        return;
    }
    if (filedName == "" || formulaString == "") {
        generateError("Name and create formula are required");
        return;
    }
    if ($("#decimal_places").val() == "") {
        generateError("Decimal places is required");
        return;
    }
    var createdsuccessfull = true;;
    var formulaArr = formulaString.split('"');
    try {
        // var formulaWithValuesArr = [];
        for (var j = 0; j < fileData.length; j++) {
            var formulaWithValues = ''
            var executeEval = false;
            var operator = "";

            formulaArr.forEach(function (val, index) {

                var findColumn = columnNames.find(x => x == val);
                if (findColumn != undefined) {
                    var value = fileData[j][val];
                    if (value == null || value == "" || value == undefined) {
                        value = 0
                    }
                    formulaWithValues = formulaWithValues + value;
                }
                else if (val != "" && val != " ") {
                    operator = val;
                    formulaWithValues = formulaWithValues + val;
                    executeEval = true;
                }
            });

            if (executeEval) {
                //  
                var calculatedvalue = eval(formulaWithValues);
                var isfinitenum = false;
                if (!isFinite(calculatedvalue)) {
                    calculatedvalue = "0";
                    isfinitenum = true;
                }
                //else {
                //    fileData[j][filedName] = 0;//eval(formulaWithValues);
                //}
                var executedValue = calculatedvalue;
                //  if (executedValue != "0") {
                executedValue = getFormattedValue(calculatedvalue);
                // }

                //
                //if (!isFinite(executedValue)) {
                //    executedValue = 0;
                //}
                if (isfinitenum) {
                    fileData[j][filedName] = 0;//eval(formulaWithValues);
                }
                else {
                    fileData[j][filedName] = calculatedvalue;//eval(formulaWithValues);
                }

                formattedFileData[j][filedName] = executedValue.toString();
            }
            else {
                // 
                //if (!isFinite(formulaWithValues)) {
                //    formulaWithValues = "0";
                //}
                if (!isNaN(formulaWithValues)) {
                    formulaWithValues = parseFloat(formulaWithValues)
                }
                var executedValue = getFormattedValue(formulaWithValues);

                fileData[j][filedName] = executedValue;
                formattedFileData[j][filedName] = executedValue;
            }

        }

        var RegisterEntry = {
            "name": filedName,
            "formula": formulaString,
            "decimalPlaces": parseInt($("#decimal_places").val()),
            "formattingType": $("#custom_field_format").val(),
            "formatType": $("#custom_field_format_type").val(),
            "currencySymbol": $("#format_currency").val()
        }
        cFields.push(RegisterEntry);

        showCreatedField(filedName);

        ClearCFields();
        lookupcolumns();
    } catch (err) {
        createdsuccessfull = false;
        var message = "Incorrect formula."
        if (err == "Invalid date field") {
            message = err;
        }
        popupShow(message, 'error');
    };
    if (createdsuccessfull && refreshaftercreation != false) {
        createandrefreshchartsoncalculatedfieldsbase(filedName);
    }
}

function ClearCFields() {
    $('#custom_field_name').val('');
    $('#custom_formula').val('');
    $('#custom_formula_column_fields_search').val('');
    $('#decimal_places').val('2');
    $('#custom_field_format').val('');
    showFormatOptions();
}

function convertToFloat(val) {
    try {
        val = parseFloat(val);
        if (isNaN(val)) {
            val = 0;
        }
    }
    catch (err) {
        val = 0;
    }
    return val;
}


function getFormattedValue(val, params) {
    //   


    if (params === undefined || params === null) {
        params = {
            "decimalPlaces": parseInt($("#decimal_places").val()),
            "formattingType": $("#custom_field_format").val(),
            "formatOption": $("#custom_field_format").val(),
            "formatType": $("#custom_field_format_type").val(),
            "currencySymbol": $("#format_currency option:selected").text()
        }
    }
    var decimalPlaces = params.decimalPlaces;
    var formattingType = params.formattingType;
    if (formattingType == "") {
        if (isNaN(val)) {
            return val;
        }
        else {
            return val.toFixed(decimalPlaces);
        }
    }
    else {
        var formatOption = params.formatOption;
        var formatType = params.formatType;
        if (formatOption == "0") {
            val = convertToFloat(val)
            if (formatType == "-1234") {
                return val.toFixed(decimalPlaces);
            }
            if (formatType == "-1234.57") {
                return val.toFixed(decimalPlaces);
            }

            if (formatType == "1,234") {
                return numberWithCommas(val.toFixed(decimalPlaces));
            }
        }
        if (formatOption == "1") {
            val = convertToFloat(val)
            if (formatType == "137.00") {
                // if (val != 0) {
                return (val * 100).toFixed(decimalPlaces) + "%";
                // }
                //else {
                //    return val+ "%";
                //}

            }
            if (formatType == "137") {
                return (val * 100).toFixed(decimalPlaces) + "%";
            }
        }
        if (formatOption == "2") {
            val = convertToFloat(val)
            var currencySymbol = params.currencySymbol;
            if (formatType == "1234") {
                return currencySymbol + val.toFixed(decimalPlaces);
            }
            if (formatType == "1234.00") {
                return currencySymbol + val.toFixed(decimalPlaces);
            }
            if (formatType == "1,234.00") {
                return currencySymbol + numberWithCommas(val.toFixed(decimalPlaces));
            }

        }
        //if (formatOption == "3") {
        //}
        if (formatOption == "4") {

            var mydate = new Date(val);
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
            if (mydate == "Invalid Date") {
                throw "Invalid date field";
            }
            if (formatType == "Weekday") {
                return getDayName(mydate.getDay(), true);
            }
            if (formatType == "Month") {
                return getMonthName(monthSignle, true) /*monthDouble*/;
            }
            if (formatType == "Year") {
                return mydate.getFullYear();
            }
            if (formatType == "Week") {
                var oneJan = new Date(mydate.getFullYear(), 0, 1);
                var numberOfDays = Math.floor((mydate - oneJan) / (24 * 60 * 60 * 1000));
                return Math.ceil((mydate.getDay() + numberOfDays) / 7);
            }
            if (formatType == "M/D/YY") {
                return monthSignle + "/" + dateDobule + "/" + mydate.getFullYear().toString().slice(2);
            }
            if (formatType == "MM/DD/YY") {
                return monthDouble + "/" + dateDobule + "/" + mydate.getFullYear().toString().slice(2);
            }
            if (formatType == "D. MMMM YYYY") {
                return dateDobule + ". " + getMonthName(monthSignle, true) + " " + mydate.getFullYear();
            }
            if (formatType == "NN, MMM D, YY") {
                return getDayName(mydate.getDate(), false) + ", " + getMonthName(monthSignle, false) + " " + dateDobule + "," + mydate.getFullYear().toString().slice(2);
            }
            if (formatType == "MM-DD") {
                return monthDouble + "-" + dateDobule;
            }
            if (formatType == "YYYY-MM-DD") {
                return mydate.getFullYear() + "-" + monthDouble + "-" + dateDobule;
            }
            if (formatType == "MMMM D, YYYY") {
                return getMonthName(monthSignle, true) + " " + dateDobule + ", " + mydate.getFullYear();
            }
        }
        if (formatOption == "5") {
            var mydate = new Date(val);
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
            var seconds = 00;

            if (val.split(":").length - 1 == 2) {
                seconds = val.split(":")[2];

            }
            var newVal = val.split(":");
            if (newVal[0].length < 2) {
                val = "0" + val;
            }
            if (newVal[1].length < 2) {
                val[3] = "0" + val[3];
            }
            if (val.indexOf("AM") > -1 || val.indexOf("PM") > -1) {
                val = convert12To24Hr(val) + ":" + seconds
            }
            var timeModel = formatTimeModel(val);
            if (formatType == "HH:MM") {
                return timeModel.hrs24 + ":" + timeModel.mins;
            }
            if (formatType == "HH:MM:SS") {
                return timeModel.hrs24 + ":" + timeModel.mins + ":" + timeModel.secs;
            }
            if (formatType == "HH:MM AM/PM") {
                return timeModel.hrs12 + ":" + timeModel.mins + " " + timeModel.ampm;
            }
            if (formatType == "HH:MM:SS AM/PM") {
                return timeModel.hrs12 + ":" + timeModel.mins + ":" + timeModel.secs + " " + timeModel.ampm;
            }
            if (formatType == "MM:SS.00") {
                //return timeModel.mins + ":" + timeModel.secs + "." + timeModel.ampm;
                return timeModel.mins + ":" + timeModel.secs + ".00";
            }
            if (formatType == "MM/DD/YYYY HH:MM AM/PM") {
                return monthDouble + "/" + dateDobule + "/" + mydate.getFullYear() + " " + timeModel.hrs12 + ":" + timeModel.mins + " " + timeModel.ampm;
            }
            if (formatType == "MM/DD/YY HH:MM AM/PM") {
                return monthDouble + "/" + dateDobule + "/" + mydate.getFullYear().toString().slice(2) + " " + timeModel.hrs12 + ":" + timeModel.mins + " " + timeModel.ampm;
            }
            if (formatType == "MM/DD/YYYY HH:MM:SS") {
                return monthDouble + "/" + dateDobule + "/" + mydate.getFullYear() + " " + timeModel.hrs24 + ":" + timeModel.mins + ":" + timeModel.secs;
            }
            if (formatType == "YYYY-MM-DD HH:MM:SS") {
                return mydate.getFullYear() + "-" + monthDouble + "-" + dateDobule + " " + timeModel.hrs24 + ":" + timeModel.mins + ":" + timeModel.secs;
            }

        }
        return val;
    }
}
function lookupcolumns() {
    var seachVal = $('#custom_formula_column_fields_search').val();
    $("ul#custom_formula_column_fields li").each(function (index, value) {

        currentName = $(value).text()
        if (currentName.toUpperCase().indexOf(seachVal.toUpperCase()) > -1) {
            $(value).show();
        } else {
            $(value).hide();
        }

    });
}
function removeCreatedField(id, filedName) {

    $('#menu_column_' + id).remove();
    $('#custom_created_fields_' + id).remove();
    if (columnNames != null && columnNames.length > 0) {
        const index = columnNames.indexOf(filedName);
        if (index > -1) {
            columnNames.splice(index, 1);
        }

        fileData.forEach(function (v) { delete v[filedName] });

        cFields = cFields.filter(x => x.name !== filedName);
        cDateFields = cDateFields.filter(x => x.name !== filedName);
        deleteandrefreshchartsoncalculatedfieldsbase(filedName);
    }


}
function removeHtml(id) {
    $('#' + id).remove()
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getMonthName(val, full) {
    if (full) {
        var month = "January";
        switch (val) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February"//"Feburary"
                break;
            case 3:
                month = "March"
                break;
            case 4:
                month = "April"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "June"
                break;
            case 7:
                month = "July"
                break;
            case 8:
                month = "August"
                break;
            case 9:
                month = "September"
                break;
            case 10:
                month = "October"
                break;
            case 11:
                month = "November"
                break;
            case 12:
                month = "December"
                break;
            default:
                // code block
                break;

        }
        return month;
    }
    else {
        var month = "Jan";
        switch (val) {
            case 1:
                month = "Jan";
                break;
            case 2:
                month = "Feb"
                break;
            case 3:
                month = "Mar"
                break;
            case 4:
                month = "Apr"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "Jun"
                break;
            case 7:
                month = "Jul"
                break;
            case 8:
                month = "Aug"
                break;
            case 9:
                month = "Sep"
                break;
            case 10:
                month = "Oct"
                break;
            case 11:
                month = "Nov"
                break;
            case 12:
                month = "Dec"
                break;
            default:
                // code block
                break;

        }
        return month;
    }
}

function getDayName(val, full) {
    if (full) {
        var day = "Monday"
        switch (val) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday"
                break;
            case 3:
                day = "Wednesday"
                break;
            case 4:
                day = "Thursday"
                break;
            case 5:
                day = "Friday"
                break;
            case 6:
                day = "Saturday"
                break;
            //case 7:
            //    day = "Sunday"
            //    break;

            default:
                // code block
                break;

        }
        return day;

    }
    else {
        var day = "Mon"
        switch (val) {
            case 0:
                day = "Sun";
                break;
            case 1:
                day = "Mon";
                break;
            case 2:
                day = "Tue"
                break;
            case 3:
                day = "Wed"
                break;
            case 4:
                day = "Thu"
                break;
            case 5:
                day = "Fri"
                break;
            case 6:
                day = "Sat"
                break;
            //case 7:
            //    day = "Sun"
            //    break;

            default:
                // code block
                break;

        }
        return day;
    }
}

function convert12To24Hr(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    //
    if (hours.length < 2) {
        hours = "0" + hours;
    }
    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }
    return `${hours}:${minutes}`;
}

function formatTimeModel(val) {
    var model = {};
    var splitVal = val.split(":");
    if (splitVal[0].length < 2) {
        model.hrs24 = "0" + splitVal[0];
    }
    else {
        model.hrs24 = splitVal[0];
    }
    if (splitVal[1].length < 2) {
        model.mins = "0" + splitVal[1];
    }
    else {
        model.mins = splitVal[1];
    }
    if (splitVal[2].length < 2) {
        model.secs = "0" + splitVal[2];
    }
    else {
        model.secs = splitVal[2];
    }
    if (model.hrs24.indexOf(' ') > -1) {
        model.hrs24 = model.hrs24.split(" ")[1].toString();
        if (model.hrs24.length < 2) {
            model.hrs24 = "0" + splitVal[0];
        }
    }
    model.hrs12 = (parseInt(model.hrs24) % 12 || 12).toString();
    if (model.hrs12.length < 2) {
        model.hrs12 = "0" + model.hrs12;
    }
    model.ampm = (parseInt(model.hrs24) < 12 || parseInt(model.hrs24) === 24) ? "AM" : "PM";
    model.actualTimeIn24 = model.hrs24 + ":" + model.mins + ":" + model.secs
    return model;
}
function generateError(message) {
    popupShow(message, 'error');
}


function calculateValuesForCustomFields(dataFilter, columnName) {

    var calculatedField = cFields.find(x => x.name == columnName);
    if (calculatedField != undefined) {
        var params = {
            "decimalPlaces": parseInt(calculatedField.decimalPlaces),
            "formattingType": calculatedField.formattingType,
            "formatOption": calculatedField.formattingType,
            "formatType": calculatedField.formatType,
            "currencySymbol": calculatedField.currencySymbol
        }
        if (calculatedField.formattingType == '2' || calculatedField.formattingType == "1") {
            params.formattingType = '1';
            params.formatOption = '1'

        }
        var formula = calculatedField.formula;
        var formulaArr = formula.split('"');
        var formulaWithValues = '';
        var executeEval = false;
        formulaArr.forEach(function (val, index) {
            var findColumn = columnNames.find(x => x == val);
            if (findColumn != undefined) {
                var sumvalue = 0;
                $.each(dataFilter, function (i, item) {
                    if (parseFloat(item[findColumn]) != undefined && parseFloat(item[findColumn]) != NaN && parseFloat(item[findColumn]) > 0) {
                        sumvalue = sumvalue + parseFloat(item[findColumn]);
                    }
                });
                formulaWithValues = formulaWithValues + sumvalue;
            } else if (val != "" && val != " ") {
                formulaWithValues = formulaWithValues + val;
                executeEval = true;
            }
        });

        if (executeEval) {
            //var calculatedvalue =  eval(formulaWithValues)
            //var isfinitenum = false;
            //if (!isFinite(calculatedvalue)) {
            //    calculatedvalue = "0";
            //    isfinitenum = true;
            //}
            if (!isNaN(eval(formulaWithValues))) {
                var executedValue = getFormattedValue(eval(formulaWithValues), params);

                if (!isFinite(parseFloat(executedValue))) {
                    return 0;
                }
                else {
                    return parseFloat(executedValue);
                }
            } else {
                var executedValue = getFormattedValue('0', params);
                // return parseFloat(executedValue);
                if (!isFinite(parseFloat(executedValue))) {
                    return 0;
                }
                else {
                    return parseFloat(executedValue);
                }
            }
        }
        else {
            if (!isNaN(formulaWithValues)) {
                formulaWithValues = parseFloat(formulaWithValues)
            }
            var executedValue = getFormattedValue(formulaWithValues, params);
            //return parseFloat(executedValue);
            if (!isFinite(parseFloat(executedValue))) {
                return 0;
            }
            else {
                return parseFloat(executedValue);
            }
        }

    } else {
        return 0;
    }
}


function calculateValuesForCustomFieldsNumberChart(dataFilter, columnName, chartconfigobj) {
    var calculatedField = cFields.find(x => x.name == columnName);
    if (calculatedField != undefined) {
        var params = {
            "decimalPlaces": parseInt(calculatedField.decimalPlaces),
            "formattingType": calculatedField.formattingType,
            "formatOption": calculatedField.formattingType,
            "formatType": calculatedField.formatType,
            "currencySymbol": calculatedField.currencySymbol
        }
        if (calculatedField.formattingType == '2' || calculatedField.formattingType == "1") {
            params.formattingType = '1';
            params.formatOption = '1'

        }
        var formula = calculatedField.formula;
        var formulaArr = formula.split('"');
        var formulaWithValues = '';
        var executeEval = false;
        formulaArr.forEach(function (val, index) {
            var findColumn = columnNames.find(x => x == val);
            if (findColumn != undefined) {
                var sumvalue = 0;
                //if (chartconfigobj.TableLocked) {
                //    $.each(chartconfigobj.chartSeries[0].data, function (i, item) {
                //        if (chartconfigobj.TableLocked && i > chartconfigobj.TableLockedRows) {
                //            //  sumvalue = 0;
                //        }
                //        else {
                //            if (parseFloat(item) != undefined && parseFloat(item) != NaN && parseFloat(item) > 0) {
                //                sumvalue = sumvalue + parseFloat(item);
                //            }
                //        }

                //    });
                //}
                //else {
                $.each(dataFilter, function (i, item) {
                    if (chartconfigobj != undefined && chartconfigobj.TableLocked && i > chartconfigobj.TableLockedRows) {
                            //  sumvalue = 0;
                        }
                        else {
                            if (parseFloat(item[findColumn]) != undefined && parseFloat(item[findColumn]) != NaN && parseFloat(item[findColumn]) > 0) {
                                sumvalue = sumvalue + parseFloat(item[findColumn]);
                            }
                        }

                    });
              //  }
                
                formulaWithValues = formulaWithValues + sumvalue;
            } else if (val != "" && val != " ") {
                formulaWithValues = formulaWithValues + val;
                executeEval = true;
            }
        });

        if (executeEval) {
            //var executedValue = getFormattedValue(eval(formulaWithValues), params);
            //return parseFloat(executedValue);
            if (!isNaN(eval(formulaWithValues))) {
                var executedValue = getFormattedValue(eval(formulaWithValues), params);
                return parseFloat(executedValue);
            } else {
                var executedValue = getFormattedValue('0', params);
                return parseFloat(executedValue);
            }
        }
        else {
            if (!isNaN(formulaWithValues)) {
                formulaWithValues = parseFloat(formulaWithValues)
            }
            var executedValue = getFormattedValue(formulaWithValues, params);
            return parseFloat(executedValue);
        }

    } else {
        return 0;
    }
}


function createDateField(params) {
    var successfullcreated = true;
    try {
        if (!getpermissionstatus("CalculatedFields")) {
            return false;
        }
        if (params != undefined) {
            var date_day = params.date_day;
            var date_week = params.date_week;
            var date_month = params.date_month;
            var date_year = params.date_year;
            var date_quarter = params.date_quarter;
            var date_week_start = params.date_week_start;
            var date_field_drop = params.date_field_drop;
        }
        else {

            var date_day = $('#date_day').is(":checked");
            var date_week = $('#date_week').is(":checked");
            var date_month = $('#date_month').is(":checked");
            var date_year = $('#date_year').is(":checked");
            var date_quarter = $('#date_quarter').is(":checked");
            var date_week_start = $("#date_week_start").val();
            var date_field_drop = $('#date_field_drop').text();
            if (date_day == false && date_week == false && date_month == false && date_year == false && date_quarter == false) {
                popupShow("Please choose an option", 'error');
                return;
            }
            if (date_field_drop == "") {
                popupShow("Please drop a date filed", 'error');
                return;
            }
        }




        var findCOlumnExist = columnNames != null ? columnNames.find(x => x == date_field_drop) : undefined;
        if (findCOlumnExist != undefined) {

            for (var i = 0; i < fileData.length; i++) {
                try {
                    fileData[i][date_field_drop + "_notShow"] = new Date(fileData[i][date_field_drop]);
                    formattedFileData[i][date_field_drop + "_notShow"] = new Date(fileData[i][date_field_drop]);

                } catch (err) {
                    throw err;
                }
            }

            for (var f = 0; f < filteredData.length; f++) {
                try {
                    filteredData[f][date_field_drop + "_notShow"] = new Date(fileData[f][date_field_drop]);
                    formattedFilteredData[f][date_field_drop + "_notShow"] = new Date(fileData[f][date_field_drop]);
                } catch (err) {
                    throw err;
                }
            }

            fileData.sort((dateA, dateB) => dateA[date_field_drop + "_notShow"] - dateB[date_field_drop + "_notShow"])
            formattedFileData.sort((dateA, dateB) => dateA[date_field_drop + "_notShow"] - dateB[date_field_drop + "_notShow"])
            filteredData.sort((dateA, dateB) => dateA[date_field_drop + "_notShow"] - dateB[date_field_drop + "_notShow"])
            formattedFilteredData.sort((dateA, dateB) => dateA[date_field_drop + "_notShow"] - dateB[date_field_drop + "_notShow"])





            var dayFiledName = date_field_drop + '_' + "Day";
            var WeekFieldName = date_field_drop + '_' + "Week";
            var MonthFieldName = date_field_drop + '_' + "Month";
            var YearFieldName = date_field_drop + '_' + "Year";
            var QuarterFieldName = date_field_drop + '_' + "Quarter";

            var existingNamesDay = columnNames.filter(x => !x.indexOf(date_field_drop + '_' + "Day"));
            if (existingNamesDay.length > 0) {
                dayFiledName = dayFiledName + "_" + (existingNamesDay.length + 1)
            }
            var existingNamesWeek = columnNames.filter(x => !x.indexOf(date_field_drop + '_' + "Week"));
            if (existingNamesWeek.length > 0) {
                WeekFieldName = WeekFieldName + "_" + (existingNamesWeek.length + 1)
            }
            var existingNamesMonth = columnNames.filter(x => !x.indexOf(date_field_drop + '_' + "Month"));
            if (existingNamesMonth.length > 0) {
                MonthFieldName = MonthFieldName + "_" + (existingNamesMonth.length + 1)
            }
            var existingNamesYear = columnNames.filter(x => !x.indexOf(date_field_drop + '_' + "Year"));
            if (existingNamesYear.length > 0) {
                YearFieldName = YearFieldName + "_" + (existingNamesYear.length + 1)
            }
            var existingNamesQuarter = columnNames.filter(x => !x.indexOf(date_field_drop + '_' + "Quarter"));
            if (existingNamesQuarter.length > 0) {
                QuarterFieldName = QuarterFieldName + "_" + (existingNamesQuarter.length + 1)
            }

            for (var j = 0; j < fileData.length; j++) {
                if (fileData[j][findCOlumnExist] === null || fileData[j][findCOlumnExist] === undefined) {
                    continue;
                }

                if ((fileData[j][findCOlumnExist].toString().indexOf("/") > -1 || fileData[j][findCOlumnExist].toString().indexOf("-") > -1) && fileData[j][findCOlumnExist].toString().indexOf(":") > -1 && fileData[j][findCOlumnExist].toString().length < 20) {
                    if (date_day) {
                        var filedName = dayFiledName;
                        var val = formatDateFiled(fileData[j][findCOlumnExist], "Weekday")
                        fileData[j][filedName] = val.toString();
                        formattedFileData[j][filedName] = val.toString();
                    }
                    if (date_week) {

                        var filedName = WeekFieldName;
                        var val = formatDateFiled(fileData[j][findCOlumnExist], "Week");
                        fileData[j][filedName] = "Week" + " " + val.toString();
                        formattedFileData[j][filedName] = "Week" + " " + val.toString();
                    }
                    if (date_month) {

                        var filedName = MonthFieldName;
                        var val = formatDateFiled(fileData[j][findCOlumnExist], "Month")
                        fileData[j][filedName] = val;
                        formattedFileData[j][filedName] = val.toString();
                    }
                    if (date_year) {
                        var filedName = YearFieldName;

                        var val = formatDateFiled(fileData[j][findCOlumnExist], "Year")
                        fileData[j][filedName] = "Year" + " " + val.toString();
                        formattedFileData[j][filedName] = "Year" + " " + val.toString();
                    }
                    if (date_quarter) {

                        var filedName = QuarterFieldName;
                        var val = formatDateFiled(fileData[j][findCOlumnExist], "Quarter")
                        fileData[j][filedName] = "Quarter" + " " + val.toString();
                        formattedFileData[j][filedName] = "Quarter" + " " + val.toString();
                    }
                }
                else {
                    throw err;
                }
            }

            if (date_week_start != "" && date_week) {
                //var l = fileData.sort((a, b) => (a[WeekFieldName] > b[WeekFieldName]) ? 1 : ((b[WeekFieldName] > a[WeekFieldName]) ? -1 : 0))
                //var m = formattedFileData.sort((a, b) => (a[WeekFieldName] > b[WeekFieldName]) ? 1 : ((b[WeekFieldName] > a[WeekFieldName]) ? -1 : 0))
                //var n = filteredData.sort((a, b) => (a[WeekFieldName] > b[WeekFieldName]) ? 1 : ((b[WeekFieldName] > a[WeekFieldName]) ? -1 : 0))

                //var firstWeek = fileData[0][WeekFieldName];//comment by umar
                var firstWeek = fileData.find(e => e[WeekFieldName] != null || e[WeekFieldName] != undefined)[WeekFieldName];

                var currentSequence = 0;
                var nextSequence = 0;
                var asliSequence = date_week_start;
                for (var j = 0; j < fileData.length; j++) {
                    if (fileData[j][WeekFieldName] === null || fileData[j][WeekFieldName] === undefined) {
                        continue;
                    }

                    var week = fileData[j][WeekFieldName];

                    currentSequence = week.split(' ')[1];
                    if (j === 0) {
                        nextSequence = currentSequence;
                    }
                    if (j === fileData.length - 1) {
                        
                        if (currentSequence == nextSequence) {

                        }
                        else {
                            asliSequence++;

                            currentSequence = nextSequence;
                        }
                        fileData[j][WeekFieldName] = "Week " + asliSequence;
                        formattedFileData[j][WeekFieldName] = "Week " + asliSequence;
                    }
                    if (fileData.length -2  >= j) {
                        nextSequence = fileData[j + 1][WeekFieldName].split(' ')[1];
                        fileData[j][WeekFieldName] = "Week " + asliSequence;
                        formattedFileData[j][WeekFieldName] = "Week " + asliSequence;
                        if (currentSequence == nextSequence) {

                        }
                        else {
                            asliSequence++;

                            currentSequence = nextSequence;
                        }
                    }

                    //if (week == firstWeek) {
                    //    fileData[j][WeekFieldName] = "Week" + " " + date_week_start;
                    //    formattedFileData[j][WeekFieldName] = "Week" + " " + date_week_start;
                    //}
                    //else {
                    //    var week_val = "Week" + " " + Math.ceil((parseInt(fileData[j][WeekFieldName].split("Week ")[1]) - parseInt(firstWeek.split("Week ")[1])) + parseInt(date_week_start)).toString();
                    //    if (week_val.indexOf('-') > -1) {
                    //        week_val = week_val.replace('-', "")
                    //    }
                    //    if (week_val.indexOf(' 0') > -1) {
                    //    }

                    //    fileData[j][WeekFieldName] = week_val;
                    //    formattedFileData[j][WeekFieldName] = week_val;
                    //}
                }
            }
            if (date_day) {
                showCreatedDateField(dayFiledName);

                var DateRegisterEntry = {
                    "name": dayFiledName,
                    "columnName": date_field_drop,
                    "format": "Weekday",
                    "weekStart": date_week_start
                }

                cDateFields.push(DateRegisterEntry);
                createandrefreshchartsoncalculatedfieldsbase(dayFiledName);
            }
            if (date_week) {
                showCreatedDateField(WeekFieldName);
                var DateRegisterEntry = {
                    "name": WeekFieldName,
                    "columnName": date_field_drop,
                    "format": "Week",
                    "weekStart": date_week_start
                }

                cDateFields.push(DateRegisterEntry);
                createandrefreshchartsoncalculatedfieldsbase(WeekFieldName);
            }
            if (date_month) {
                showCreatedDateField(MonthFieldName);
                var DateRegisterEntry = {
                    "name": MonthFieldName,
                    "columnName": date_field_drop,
                    "format": "Month",
                    "weekStart": date_week_start
                }

                cDateFields.push(DateRegisterEntry);
                createandrefreshchartsoncalculatedfieldsbase(MonthFieldName);
            }
            if (date_year) {
                showCreatedDateField(YearFieldName);
                var DateRegisterEntry = {
                    "name": YearFieldName,
                    "columnName": date_field_drop,
                    "format": "Year",
                    "weekStart": date_week_start
                }

                cDateFields.push(DateRegisterEntry);
                createandrefreshchartsoncalculatedfieldsbase(YearFieldName);
            }
            if (date_quarter) {
                showCreatedDateField(QuarterFieldName);
                var DateRegisterEntry = {
                    "name": QuarterFieldName,
                    "columnName": date_field_drop,
                    "format": "Quarter",
                    "weekStart": date_week_start
                }

                cDateFields.push(DateRegisterEntry);
                createandrefreshchartsoncalculatedfieldsbase(QuarterFieldName);
            }

            ClearCDateFields();
        }
    } catch (err) {

        //var html = `<div id="custom_field_error_${Date.now()}" class="alert alert-danger" role="alert">
        //                    <span id="custom_field_error_message">Error occured while adding date field.</span>
        //                    <span style="float:right" onclick="removeHtml('custom_field_error_${Date.now()}')" id="custom_field_error_close">X</span>
        //                </div>`;
        //$('#errors_fileds_date').append(html);
        popupShow("Error occured while creating date field.", 'error');
        console.log(err);
    }
}

function ClearCDateFields() {
    $('#date_day').prop("checked", false);
    $('#date_week').prop("checked", false);
    $('#date_month').prop("checked", false);
    $('#date_year').prop("checked", false);
    $('#date_quarter').prop("checked", false);
    $("#date_week_start").val('');
    $('#date_field_drop').text('');
}

function formatDateFiled(val, formatType) {
    try {

        var mydate = new Date(val);
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
        if (mydate == "Invalid Date") {
            throw "Invalid date field";
        }
        if (formatType == "Weekday") {
            return getDayName(mydate.getDay(), true);
        }
        if (formatType == "Month") {
            return getMonthName(monthSignle, true) /*monthDouble*/;
        }
        if (formatType == "Year") {
            return mydate.getFullYear();
        }
        if (formatType == "Week") {
            //var oneJan = new Date(mydate.getFullYear(), 0, 1);
            //var numberOfDays = Math.floor((mydate - oneJan) / (24 * 60 * 60 * 1000));
            //return Math.ceil((mydate.getDay() + numberOfDays) / 7);

            return moment(mydate).week();
        }
        if (formatType == "Quarter") {

            var month = mydate.getMonth() + 1;
            return (Math.ceil(month / 3));
        }


    }
    catch (err) {
        throw err;
    }
}

function showCreatedDateField(filedName) {
    columnNames.push(filedName);
    var id = Date.now()
    var fieldHtml = `<li id="menu_column_${id}" category="${filedName}" class="bg-gray field ui-draggable ui-draggable-handle">${filedName}</li>`;
    $('#FieldsList').append(fieldHtml);
    hideshowfieldsearchdiv();
    $(".field").draggable({
        revert: "invalid",
        stack: ".draggable",
        helper: 'clone',
        cursor: "crosshair", revert: "invalid"

    });
    var sidePanelHtml = `<div class="row" id="custom_created_fields_${id}">
                                <div class="col-md-2">
                                    <a onclick="removeCreatedField('${id}','${filedName}')" style="color:red; float:right; cursor:pointer;">X</a>
                                </div>
                                <div class="col-md-10">
                                    <p>${filedName}</p>
                                </div>

                            </div>`;
    $('#custom_date_created_fields_list').append(sidePanelHtml);
}

function createandrefreshchartsoncalculatedfieldsbase(fieldname) {
    var objindex = PinkFields.findIndex(x => x == fieldname);
    if (objindex != -1) {
        PinkFields.splice(objindex, 1);
    }

    refreshchartaftercalculatedfieldscreation(fieldname);
}

function deleteandrefreshchartsoncalculatedfieldsbase(fieldname) {
    var objindex = PinkFields.findIndex(x => x == fieldname);
    if (objindex == -1) {
        PinkFields.push(fieldname);
    }
    refreshchartaftercalculatedfieldscreation(fieldname);
}


function refreshchartaftercalculatedfieldscreation(fieldnames) {
    $.each(chartsconfigurations, function (c, chartobj) {
        if (chartobj.chartXAxis == fieldnames) {
            $.each(chartobj.chartYAxises, function (y, item) {
                chartsconfigurations[c].chartYAxises[y].seriesusage = true;
            })
            chartsconfigurations[c].chartSeries = [];
            rerenderchart(chartsconfigurations[c].chartId);
        }
        else {
            $.each(chartobj.chartYAxises, function (y, item) {
                if (item.label == fieldnames) {
                    chartsconfigurations[c].chartYAxises[y].seriesusage = true;
                    chartsconfigurations[c].chartSeries.splice(y, 1);
                    //  
                    // chartsconfigurations[c].chartSeries[y].data = [];
                    rerenderchart(chartsconfigurations[c].chartId);
                }

            })
        }
    })
}

function showStuff() {
  
    TurnOffVideo();
    if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
        currentscroll = $(document).scrollTop();
    }
    $('#main_div').addClass('d-none');
    $("#new_row_btn").addClass('d-none');
    $('.container-fluid.filters').addClass('d-none');
    $('#custom_fields_main_div').addClass('d-none');
    $('#stuff_content').removeClass('d-none');
    $('#useful_stuff').removeClass('d-none');
    $('#custom_formula_column_fields').empty();
    $('#SavedReportsSection').addClass('d-none');
    $('#AccountDetailsSection').addClass('d-none');
    $("#VedioTutorialSection").addClass('d-none');
 /*   $('#LeftSideFileUpload').removeClass('d-none');*/
   
  //  $('#LeftSideFileUpload').addClass('d-none');
    setTimeout(() => {
        $(".button-menu-mobile").trigger("click");
    }, 0);
}   




