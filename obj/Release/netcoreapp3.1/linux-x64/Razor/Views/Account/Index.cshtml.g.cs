#pragma checksum "D:\Working Apps\Web\Reportingkingrepo\Views\Account\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "87b47bc6ccf4adffedd1644373e317ead0e1d7a5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Account_Index), @"mvc.1.0.view", @"/Views/Account/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Working Apps\Web\Reportingkingrepo\Views\_ViewImports.cshtml"
using ReportingApp;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Working Apps\Web\Reportingkingrepo\Views\_ViewImports.cshtml"
using ReportingApp.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"87b47bc6ccf4adffedd1644373e317ead0e1d7a5", @"/Views/Account/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3a7b767790137790f162fe3c00880dfb4a057a3b", @"/Views/_ViewImports.cshtml")]
    public class Views_Account_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            DefineSection("CSS", async() => {
                WriteLiteral(@"
    <style type=""text/css"">
        #customBtn {
            display: inline-block;
            background: white;
            color: #444;
            width: 190px;
            border-radius: 5px;
            border: thin solid #888;
            box-shadow: 1px 1px 1px grey;
            white-space: nowrap;
        }

            #customBtn:hover {
                cursor: pointer;
            }

        span.label {
            font-family: serif;
            font-weight: normal;
        }

        span.icon {
            background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
            display: inline-block;
            vertical-align: middle;
            width: 42px;
            height: 42px;
        }

        span.buttonText {
            display: inline-block;
            vertical-align: middle;
            padding-left: 42px;
            padding-right: 42px;
            font-size: 14px;
            font-weight: bold;
            font-fami");
                WriteLiteral("ly: \'Roboto\', sans-serif;\r\n        }\r\n    </style>\r\n\r\n\r\n\r\n");
            }
            );
            WriteLiteral("\r\n");
            WriteLiteral("\r\n\r\n<div id=\"gSignInWrapper\" style=\"margin-top:130px\">\r\n");
            WriteLiteral("    <div id=\"customBtn\" class=\"customGPlusSignIn\">\r\n");
            WriteLiteral("        <span class=\"buttonText\">Sign in with Google</span>\r\n    </div>\r\n</div>\r\n<div id=\"name\"></div>\r\n\r\n\r\n\r\n<!-- Show the user profile details -->\r\n<div class=\"userContent\" style=\"display: none;\"></div>\r\n");
            DefineSection("SCRIPTS", async() => {
                WriteLiteral(@"

    <script>

        $(document).ready(function () {
            try {
                startApp();
            }
            catch (ex) {
                startApp();
            }

            // renderButton();
            //   signOut();
        });
        // Render Google Sign-in button
        function renderButton() {
            gapi.signin2.render('gSignIn', {
                'scope': 'profile email',
                'width': 100,
                'height': 30,
                // 'longtitle': true,
                //  'theme': 'dark',
                /*'onsuccess': onSuccess,*/
                'onclick': onSuccess,
                'onfailure': onFailure
            });
        }

        // Sign-in success callback
        function onSuccess(googleUser) {
            // Get the Google profile data (basic)
            //var profile = googleUser.getBasicProfile();

            // Retrieve the Google account data
            gapi.client.load('oauth2', 'v2', function (");
                WriteLiteral(@") {
                var request = gapi.client.oauth2.userinfo.get({
                    'userId': 'me'
                });
                request.execute(function (resp) {
                    // Display the user details
                    var profileHTML = '<h3>Welcome ' + resp.given_name + '! <a href=""javascript:void(0);"" onclick=""signOut();"">Sign out</a></h3>';
                    profileHTML += '<img src=""' + resp.picture + '""/><p><b>Google ID: </b>' + resp.id + '</p><p><b>Name: </b>' + resp.name + '</p><p><b>Email: </b>' + resp.email + '</p><p><b>Gender: </b>' + resp.gender + '</p><p><b>Locale: </b>' + resp.locale + '</p><p><b>Google Profile:</b> <a target=""_blank"" href=""' + resp.link + '"">click to view profile</a></p>';
                    document.getElementsByClassName(""userContent"")[0].innerHTML = profileHTML;

                    document.getElementById(""gSignIn"").style.display = ""none"";
                    document.getElementsByClassName(""userContent"")[0].style.display = ""block"";
     ");
                WriteLiteral(@"               //   acToken = gup(url, 'access_token');
                    // Save user data
                    saveUserData(resp);

                });
            });
        }

        // Sign-in failure callback
        function onFailure(error) {
            alert(error);
        }

        // Sign out the user
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                document.getElementsByClassName(""userContent"")[0].innerHTML = '';
                document.getElementsByClassName(""userContent"")[0].style.display = ""none"";
                document.getElementById(""gSignIn"").style.display = ""block"";
            });

            auth2.disconnect();
        }

        function saveUserData(userData) {
            // $.post('userData.php', { oauth_provider: 'google', userData: JSON.stringify(userData) });
            $.ajax({
                async: true,
                type: ""POST"",
         ");
                WriteLiteral(@"       url: ""/Account/Login"",
                data: { obj: userData },
                cache: false,
                dataType: ""json"",
                success: function (response) {
                    loading_end();
                    if (response.status) {
                        popupShow(response.msg, 'good');
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






        ////this is working


        //var OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';
        //var VALIDURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
        //var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile';
      ");
                WriteLiteral(@"  //var CLIENTID = ""495447302183-ul6n1bgt9gdcjelhuniqlt1qce24ohp7.apps.googleusercontent.com"";
        //var REDIRECT =""https://localhost:44392/Account/Index"" ;//redirectUrl;
        //var TYPE = 'token';
        //var _url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
        //var acToken;
        //var tokenType;
        //var expiresIn;
        //var user;
        //$('#googleLogin').click(function () {
        //    var win = window.open(_url, ""windowname1"", 'width=800, height=600');

        //    var pollTimer = window.setInterval(function () {
        //        if (win.document.URL.indexOf(REDIRECT) != -1) {
        //            window.clearInterval(pollTimer);
        //            var url = win.document.URL;
        //            acToken = gup(url, 'access_token');
        //            tokenType = gup(url, 'token_type');
        //            expiresIn = gup(url, 'expires_in');
        //            win.close();");
                WriteLiteral(@"

        //            validateToken(acToken);
        //        }
        //    }, 100);
        //});
        //function validateToken(token) {
        //    $.ajax({
        //        url: VALIDURL + token,
        //        data: null,
        //        success: function (responseText) {
        //            getUserInfo();
        //        },
        //        dataType: ""jsonp""
        //    });
        //}
    </script>




    <script>
        var googleUser = {};
        var startApp = function () {
            gapi.load('auth2', function () {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                auth2 = gapi.auth2.init({
                    client_id: '495447302183-ul6n1bgt9gdcjelhuniqlt1qce24ohp7.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    // Request scopes in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
             ");
                WriteLiteral(@"   });
                attachSignin(document.getElementById('customBtn'));
            });
        };

        function attachSignin(element) {
            console.log(element.id);
            auth2.attachClickHandler(element, {},
                function (googleUser) {
                    document.getElementById('name').innerText = ""Signed in: "" +
                        googleUser.getBasicProfile().getName();

                    var userData = {};
                    userData.id = googleUser.Ts.mS;
                    userData.name = googleUser.Ts.Ne;
                    userData.email = googleUser.Ts.Et;
                    saveUserData(userData);
                }, function (error) {
                    //  alert(JSON.stringify(error, undefined, 2));
                });
        }
    </script>
    

");
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
