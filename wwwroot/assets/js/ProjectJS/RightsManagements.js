function getpermissionstatus(rightData) {
    var RightFlag = false;
    try {
        var rightobj = UserObjDetail.components.find(x => x.hiddenDescription == rightData);
        if (rightobj !== undefined && rightobj.add) {

            RightFlag = true;
        }
    }
    catch (exception)
    {

    }

    return RightFlag;
}

function applyReportingToolsRights() {
    // UserObjDetail
    if (!UserObjDetail.isSuperAdmin && !UserObjDetail.isFreeUser && getpermissionstatus("Profile")) {
        $('#profileBtn').removeClass('d-none');
    }
    else {
        $('#profileBtn').addClass('d-none');
    }
    if (getpermissionstatus("Save")) {
        $("#nameLabel").removeClass('d-none');
        $("#btn_ReportSave").removeAttr('disabled');
        $("#savedCharts").show();
        $("#savedCharts").removeClass("d-none");
        if (UserObjDetail.isSuperAdmin) {
            $("#UsersSideMenu").show();
        } else {
            $("#UsersSideMenu").hide();
        }
    }
    else {
        $("#nameLabel").addClass('d-none');
        $("#btn_ReportSave").prop("disabled", true);
        $("#savedCharts").hide();
        $("#savedCharts").addClass("d-none");
        $("#UsersSideMenu").hide();
    }
    if (getpermissionstatus("Download")) {
        $("#btn_DownLoad").removeAttr('disabled');
    }
    else {
        $("#btn_DownLoad").prop("disabled", true);
    }
    if (getpermissionstatus("SavedReports")) {
        getAllCharts();
    }
    else {
        var options = '<option value="0">New Dashboard</option>';
        $('#savedCharts').empty();
        $('#savedCharts').append(options);
    }
    if (getpermissionstatus("CalculatedFields")) {
        $("#btn_AddCalculatedField").removeAttr('disabled');
        $("#btn_AddCalculatedFieldDate").removeAttr('disabled');
       
        $("#btn_AddCalculatedField").removeClass('blockpointer');
        $("#btn_AddCalculatedFieldDate").removeClass('blockpointer');
    }
    else {
        $("#btn_AddCalculatedField").prop("disabled", true);
        $("#btn_AddCalculatedFieldDate").prop('disabled', true);
        $("#btn_AddCalculatedField").addClass('blockpointer');
        $("#btn_AddCalculatedFieldDate").addClass('blockpointer');
    }
    if (getpermissionstatus("ColourPallet")) {
        abledisablecolourpallet(false);
    }
    else {
        abledisablecolourpallet(true);
    }

    abledisableNewRowButton();
}

function abledisablecolourpallet(flag) {
    if (flag) {
        $("#customSwitch3").prop("disabled", true);
        $("#customSwitch4").prop("disabled", true);
        $("#customSwitch5").prop("disabled", true);
        $("#customSwitch6").prop("disabled", true);
        $("#customSwitch7").prop("disabled", true);
        $("#customSwitch8").prop("disabled", true);
        $("#customSwitch9").prop("disabled", true);
    }
    else {
        $("#customSwitch3").removeAttr('disabled');
        $("#customSwitch4").removeAttr('disabled');
        $("#customSwitch5").removeAttr('disabled');
        $("#customSwitch6").removeAttr('disabled');
        $("#customSwitch7").removeAttr('disabled');
        $("#customSwitch8").removeAttr('disabled');
        $("#customSwitch9").removeAttr('disabled');
    }
}


function abledisableNewRowButton() {
    if (getpermissionstatus("NewRow")) {
        $("#new_row_btn").removeAttr('disabled');
    }
    else {
        $("#new_row_btn").prop("disabled", true);
    }
}
