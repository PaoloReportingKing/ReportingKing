#pragma checksum "D:\Working Apps\Web\reportingtool\Views\Home\Privacy.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "484b7df17bd5dc08501bed5a62798584ebba0d20"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Privacy), @"mvc.1.0.view", @"/Views/Home/Privacy.cshtml")]
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
#line 1 "D:\Working Apps\Web\reportingtool\Views\_ViewImports.cshtml"
using ReportingApp;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Working Apps\Web\reportingtool\Views\_ViewImports.cshtml"
using ReportingApp.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"484b7df17bd5dc08501bed5a62798584ebba0d20", @"/Views/Home/Privacy.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3a7b767790137790f162fe3c00880dfb4a057a3b", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Privacy : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\Working Apps\Web\reportingtool\Views\Home\Privacy.cshtml"
  
    ViewData["Title"] = "Privacy Policy";

#line default
#line hidden
#nullable disable
            WriteLiteral("<style>\r\n</style>\r\n\r\n<div class=\"test\" style=\"width:100%;margin-top:10%;\">\r\n    <h1>");
#nullable restore
#line 8 "D:\Working Apps\Web\reportingtool\Views\Home\Privacy.cshtml"
   Write(ViewData["Title"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</h1>
    <div class=""progress"" style=""width:300px;height:30px;"">
        <div class=""progress-bar"" style=""background: url('/assets/images/ProgressBar.png'); width: 30% "" role=""progressbar"" aria-valuenow=""70"" aria-valuemin=""0"" aria-valuemax=""100"">
            <span class=""sr-only"">70% Complete</span>
        </div>
    </div>
</div>

<div class=""col-md-3"">
    <div class=""tool tool_charts"">
        <label id=""lbl_${randomChartId}"" class=""red"" style=""font-size:12px;padding-left: 10px; text-transform:none;"">Impressions</label>
        <div class=""row"">
            <div class=""col-md-2"">
                <div class=""icon mixed "" onclick=changeseriestype(""${randomChartId}"",""Style1"")>
                    <img class=""seriestypeborder"" id=""Style1_${randomChartId}"" src=""../../assets/new/Font Styles 1.png"" />
                </div>
            </div>

            <div class=""col-md-2"">
                <div class=""icon bar"" onclick=changeseriestype(""${randomChartId}"",""Style2"")>
                    <i");
            WriteLiteral(@"mg id=""Style2_${randomChartId}"" src=""../../assets/new/Font Styles 2.png"" />
                </div>
            </div>
            <div class=""col-md-2"">
                <div class=""icon"" onclick=changeseriestype(""${randomChartId}"",""Style3"")>
                    <img id=""Style3_${randomChartId}"" src=""../../assets/new/Font Styles 3.png"" />
                </div>
            </div>
        </div>
    </div>
</div>
<div class=""col-md-4"">
    <div class=""color"">
        <button class=""prev"" onclick=movetoprevious('${randomChartId}')><i class=""fa fa-caret-left"" aria-hidden=""true""></i></button>
        <div class=""box"" id='box${randomChartId}'></div>
        <button class=""next"" onclick=movetoforword('${randomChartId}')><i class=""fa fa-caret-right"" aria-hidden=""true""></i></button>
    </div>
</div>
<div class=""col-md-5"">
    <div class=""delete"">
        <a href=""#"" id=""remove_${randomChartId}"" onclick=""RemoveThisSeries('remove_${randomChartId}')"">Delete</a>
        <button type=""button"" class=""c");
            WriteLiteral("lose-panel-btn \" onclick=\"closestylebar(\'snav_${randomChartId}\')\">&times;</button>\r\n    </div>\r\n</div>");
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
