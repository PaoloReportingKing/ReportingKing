
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
            //this is using afzaal
            /* client_id: '495447302183-ul6n1bgt9gdcjelhuniqlt1qce24ohp7.apps.googleusercontent.com',*/
            //this is using paolo account
            client_id: '157628865637-4bie7rn50mikigce25hpd0p8ljueg21t.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('customBtn'));
        attachSignUp(document.getElementById('customBtn2'));
    });
};

function attachSignin(element) {

    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function (googleUser) {
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
            var userData = {};
            userData.id = googleUser.Ts.mS;
            userData.name = googleUser.Ts.Ne;
            userData.email = googleUser.Ts.Et;

            loading_start(0, 0, LoadingMessage);
            $.ajax({
                async: true,
                type: "POST",
                url: "/Account/CheckUserExists",
                data: { email: userData.email },
                cache: false,
                dataType: "json",
                success: function (response) {
                    loading_end();
                    if (response.status) {
                        popupShow(response.msg, 'fail');
                    }
                    else {
                        //saveUserData(userData);
                        SignUpUserInfo = userData;
                        $('#SignupPackageModal').modal('show');
                    }
                },
                failure: function (response) {
                    loading_end();
                },
                error: function (response) {
                    loading_end();
                }
            });
        }, function (error) {
            //  alert(JSON.stringify(error, undefined, 2));
        });
}

var SignUpUserInfo = null;
function saveUserData(userData) {
    SignUpUserInfo = null;
    loading_start(0, 0, LoadingMessage);
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
    loading_start(0, 0, LoadingMessage);
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
            }
            else {
                popupShow(response.msg, 'fail');
            }
        },
        failure: function (response) {
            loading_end();
            popupShow('Something went wrong...', 'fail');
        },
        error: function (response) {
            loading_end();
            popupShow('Something went wrong...', 'fail');
        }
    });
}


function Logout() {
    if (confirm("Are you sure you want to Logout?")) {
        loading_start(0, 0, LoadingMessage);
        $.ajax({
            async: true,
            type: "POST",
            url: "/Account/Logout",
            success: function (response) {
                loading_end();
                if (response.status) {
                    showChartsDiv();
                    UserObjDetail = response.model;
                    hideshowfunctionality();
                    window.location.href = "/Home/Index";
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
    if (!UserObjDetail.isLogin) {
        $("#gSignOutWrapper").text('');
        $("#gSignOutWrapper").text('U');
        $("#gSignOutWrapper").hide();
        $("#gSignOutWrapper").addClass('d-none');
        $(".signinsignup").show();
        $(".signinsignup").removeClass('d-none');
        $("#SignInUserName").hide();
        $("#SignInUserName").addClass('d-none');
    }
    else {
        $("#gSignOutWrapper").text('');
        if (UserObjDetail.userName.length > 0) {
            $("#gSignOutWrapper").text(UserObjDetail.userName.substring(0,1));
        }
        
        $("#SignInUserName").show();
       // $("#SignInUserName").removeClass('d-none');
        $("#SignInUserName").empty();
        $("#SignInUserName").text(UserObjDetail.userName);

        $(".signinsignup").hide();
        $(".signinsignup").addClass('d-none');
        $("#gSignOutWrapper").removeClass('d-none');
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
                Authtenticate();
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

function Authtenticate() {
    if (UserObjDetail.isLogin) {
        $.ajax({
            async: true,
            type: "POST",
            url: "/Home/CheckLicense",
            data: { userId: UserObjDetail.userId },
            cache: false,
            dataType: "json",
            success: function (response) {
                if (!response.status) {
                    showChartsDiv();
                    UserObjDetail = response.model;
                    hideshowfunctionality();
                }
            },
            failure: function (response) {
            },
            error: function (response) {
            }
        });
    }
}