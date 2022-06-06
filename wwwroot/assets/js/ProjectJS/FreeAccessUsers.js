function ShowHideDashboardTable() {
    var showhidelinktext = $("#freeaccessuser").text();
    if (showhidelinktext == "Allow Free Access") {
        UpdateFreeUsersDivs();
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

function AddFreeAccessUser() {
    var EmailId = $("#txt_FreeAccessEmail").val();

    if (!validateEmail(EmailId)) {
        alert("Please add valid email");
        return false;
    }
    $.ajax({
        async: true,
        type: "POST",
        url: "/Account/SaveNewFreeUser",
        data: { Email: EmailId },
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                resetAddFreeUser();
                UpdateFreeUsersDivs();
                popupShow(response.msg, 'good');
            }
            else {
                popupShow(response.msg, 'fail');
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

function resetAddFreeUser() {
    $("#txt_FreeAccessEmail").val('');
}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


function UpdateFreeUsersDivs() {
    $("#AllFreeUsers").empty();
    $.ajax({
        type: "GET",
        url: "/Home/GetFreeUsers",
        dataType: 'json',
        success: function (Response) {
            if (Response.status) {
               
                var totaldivs = "";
                $.each(Response.data, function (i, item) {
                    totaldivs = totaldivs + `<div style="margin-top:11px"><a onclick="DeleteFreeUser('${item.customerId}')" style="color: white;height: 20px;width: 20px;background-color: #be2020;border-radius: 50%;display: inline-flex;cursor: pointer;align-items: center;justify-content: center;">x</a><span class="freeuseremail">${item.email}</span></div>`;
                }

                );

                $("#AllFreeUsers").append(totaldivs)
                 } else {

            }
        },
        failure: function (response) {
        },
        error: function (response) {
        }
    });
}

function DeleteFreeUser(Idd) {
    $.ajax({
        async: true,
        type: "POST",
        url: "/Account/DeleteFreeUser",
        data: { Id: Idd },
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                UpdateFreeUsersDivs();
                popupShow(response.msg, 'good');
            }
            else {
                popupShow(response.msg, 'fail');
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