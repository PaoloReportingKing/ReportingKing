function ShowHideDashboardTable() {
    var showhidelinktext = $("#freeaccessuser").text();
    if (showhidelinktext == "Allow Free Access") {
        $("#freeaccessuser").text('');
        $("#freeaccessuser").text('Hide Free Access Section');
        $("#dashboardrow").addClass('d-none')
        $("#FreeAccessSections").removeClass("d-none");
    }
    else {
        $("#freeaccessuser").text('');
        $("#freeaccessuser").text('Allow Free Access');
        $("#dashboardrow").removeClass('d-none')
        $("#FreeAccessSections").addClass('d-none')
    }
   // alert(showhidelinktext);
}

function showChartsDivusingFreeVersion() {


    //TurnOffVideo();
    //restartCaption();

    //$('.left-sidenav').css('min-width', '365px')  
   
    //$('#InternalDashBoardSection').addClass('d-none')
    //$('#LeftSideFileUpload').removeClass('d-none')
    ////window.scrollTo(0, 0);
    //$('#main_div').removeClass('d-none');
                
    //$('.container-fluid.filters').removeClass('d-none');
    //$('#custom_fields_main_div').addClass('d-none');
    //$('#SavedReportsSection').addClass('d-none');
    //$('#AccountDetailsSection').addClass('d-none');
    //$("#VedioTutorialSection").addClass('d-none');
    //$('#useful_stuff').addClass('d-none');
    //$(".filters h4").removeClass("visibility");
    //$('#stuff_content').addClass('d-none');
    //// $("#filters").removeClass('d-none');

    //if ($('#new_row_btn').hasClass('customfield_page_remove')) {
    //    $('#new_row_btn').removeClass('d-none');
    //    $('#new_row_btn').removeClass('customfield_page_remove')
    //}
    //ScrollNow();
    //showChartsDiv();
    $("#a_AddFields").click();
   // setTimeout(showChartsDiv, 100);
}