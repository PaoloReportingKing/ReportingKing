
var googleUser = {};

$(document).ready(function () {
    try {
        startApp();
    }
    catch (ex) {
        startApp();
    }

});

var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '495447302183-ul6n1bgt9gdcjelhuniqlt1qce24ohp7.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('customBtn'));
        attachSignUp(document.getElementById('customBtn2'));
    });
};

function attachSignin(element) {


    /* if (confirm("Are you sure you want to delete this report?")) {*/
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            debugger;
            //document.getElementById('name').innerText = "Signed in: " +
            //    googleUser.getBasicProfile().getName();

            var userData = {};
            userData.id = googleUser.Ts.mS;
            userData.name = googleUser.Ts.Ne;
            userData.email = googleUser.Ts.Et;
            Login(userData);

        }, function (error) {
            //  alert(JSON.stringify(error, undefined, 2));
        });

}

function attachSignUp(element) {
    console.log(element.id);

    auth2.attachClickHandler(element, {},
        function (googleUser) {
            debugger;
            //document.getElementById('name').innerText = "Signed in: " +
            //    googleUser.getBasicProfile().getName();

            var userData = {};
            userData.id = googleUser.Ts.mS;
            userData.name = googleUser.Ts.Ne;
            userData.email = googleUser.Ts.Et;
            //saveUserData(userData);
            SignUpUserInfo = userData;
            $('#SignupPackageModal').modal('show');
        }, function (error) {
            //  alert(JSON.stringify(error, undefined, 2));
        });
}

var SignUpUserInfo = null;
function saveUserData(userData) {
    SignUpUserInfo = null;
    loading_start();
    $.ajax({
        async: true,
        type: "POST",
        url: "/Account/SignUpAndLogin",
        data: { obj: userData },
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                $('#SignupPackageModal').modal('hide');
                popupShow(response.msg, 'good');
                UserObjDetail = response.model;
                hideshowfunctionality();
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

function clickhiddencustombtn() {
    //if (confirm("Are you sure you want to sign up?")) {
    $("#customBtn").click();
    // }
}
function clickhiddencustomSignUpbtn() {
    $("#customBtn2").click();
}

function Login(userData) {
    loading_start();
    //  debugger;
    // $.post('userData.php', { oauth_provider: 'google', userData: JSON.stringify(userData) });
    $.ajax({
        async: true,
        type: "POST",
        url: "/Account/Login",
        data: { obj: userData },
        cache: false,
        dataType: "json",
        success: function (response) {
            loading_end();
            if (response.status) {
                UserObjDetail = response.model;
                hideshowfunctionality();
                //  popupShow(response.msg, 'good');
            }
            else {
                popupShow('Not Login to Reporting System...', 'fail');
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


function Logout() {
    if (confirm("Are you sure you want to Logout?")) {
        loading_start();
        $.ajax({
            async: true,
            type: "POST",
            url: "/Account/Logout",
            // cache: false,
            //   dataType: "json",
            success: function (response) {
                loading_end();
                if (response.status) {
                    showChartsDiv();
                    UserObjDetail = response.model;
                    hideshowfunctionality();
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

function hideshowfunctionality() {
    //debugger;
    if (!UserObjDetail.isLogin) {
        $("#gSignOutWrapper").hide();
        $(".signinsignup").show();
        $("#SignInUserName").hide();
    }
    else {
        $("#SignInUserName").show();
        $("#SignInUserName").empty();
        $("#SignInUserName").text(UserObjDetail.userName);

        $(".signinsignup").hide();
        $("#gSignOutWrapper").show();
    }
    applyReportingToolsRights();
}


function GetPackagesData() {

    $.ajax({
        async: true,
        type: "POST",
        url: "/Account/GetSessionManagerData",
        cache: false,
        dataType: "json",
        success: function (response) {
            //   loading_end();
            if (response.status) {
                UserObjDetail = response.model;
                hideshowfunctionality();
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