function ShowVedioTutorials() {
    if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
        debugger;
        currentscroll = $(document).scrollTop();
    }
    loading_start(0, 0, LoadingMessage);
    $.ajax({
        async: true,
        type: "POST",
        url: "/Home/GetVedioTutorialsSrcs",
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                $("#vediotutorialtitle").empty();
                $("#vediotutorialsource").attr("src", "");
                $("#vediotutorialtitle").text(response.data.title);
                $("#vediotutorialsource").attr("src", response.data.source);
                hideshowvediotutorialsection();
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
function hideshowvediotutorialsection() {
    if ($(".first-link").hasClass("active") || $(".clr-pallet").hasClass("active")) {
        debugger;
        currentscroll = $(document).scrollTop();
    }
    $('#main_div').addClass('d-none');
    $("#new_row_btn").addClass('d-none');
    $('#custom_fields_main_div').addClass('d-none');
    $('#SavedReportsSection').addClass('d-none');
    $('#InternalDashBoardSection').addClass('d-none');
    $("#VedioTutorialSection").removeClass('d-none');
    $('.left-sidenav').css('min-width', '80px')
    $('#LeftSideFileUpload').addClass('d-none')
    $('#AccountDetailsSection').addClass('d-none')
    $('#useful_stuff').addClass('d-none');
    $('#stuff_content').addClass('d-none');
}

function TurnOffVideo() {
    $("#vediotutorialtitle").empty();
    $("#vediotutorialsource").attr("src", "");
}