function settableChart(chartid) {
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    var tablehtml = GetTableChartDiv(chartid, true, chartconfigobj);// "<div style='display: block;max-height:350px;overflow:auto'><table class='table table-border' id=table" + chartid + "><thead id='th'" + chartid + ">" + tablehead + "</thead><tbody id='th'" + chartid + ">" + trs+"</tbody></table></div>"
    var b = $("#" + chartid);
    b.empty();
    b.append(tablehtml);
    $("#div" + chartid).hide();

    var randomchartid = getrandomchartidusingid(chartid);
    $("#anc_" + randomchartid).addClass("d-none");
    if (chartconfigobj.TableChartStyle == "tblStyle1") {
        $("#table" + chartid + " thead th").css({
            "background-color": "darkgray",//chartconfigobj.TableChartRowColour,
            "color": "black"
        });
        $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
    }
    if (chartconfigobj.TableChartStyle == "tblStyle2") {
        $("#table" + chartid + " thead th").css({
            "background-color": "white",
            "border": "1px solid lightgray",
            "color": "black"
        });
        $("#table" + chartid + " tr td").css({
            "border": "1px solid lightgray"
        });
        //$("#table" + chartid + " tfoot tr th").css({
        //    "border": "1px solid lightgray"
        //});
        $("#table" + chartid + " tfoot").css({
            "border": "1px solid lightgray"
        });
        $("#table" + chartid + " tfoot tr th").css({
            "border": "1px solid lightgray"
        });
        //$("#table" + chartid + " tbody tr:nth-of-type(even)").css({
        //    "border": "1px solid lightgray"
        //});
        $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
    }
    if (chartconfigobj.TableChartStyle == "tblStyle3") {
        $("#table" + chartid + " thead th").css({
            "background-color": chartconfigobj.TableChartRowColour,
            "border": "1px solid lightgray",
            "color": "white"
        });
        $("#table" + chartid + " tr td").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tfoot").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tfoot tr th").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tbody tr:odd").css("background-color", "white");
    }
    if (chartconfigobj.TableSortedColumnId != "") {
        AddRemoveClasses(chartconfigobj.TableSortedColumnId);
    }

}

function RemovetablechartxaxisChart(chartid) {

    RemovexaxisChart('', getrandomchartidusingid(chartid.id));
}
function Removetablechartyaxis(data) {

    var dataarray = data.id.split('___');
    var lable = $("#" + data.id).text();
    removeyaxis(lable, dataarray[1]);
}

function GetTableChartDiv(chartid, showremoveiconstyle, chartconfigobj) {

    var randomchartid = getrandomchartidusingid(chartid);
    if (chartconfigobj != undefined) {
        var tablehead = "";
        var tablebody = "";
        var showstyle = "";
        if (!showremoveiconstyle) {
            showstyle = "display:none";
        }
        debugger;
        if (chartconfigobj.chartXAxis.length > 0) {
            var notmojuud = false;
            for (var i = 0; i < PinkFields.length; i++) {
                if (PinkFields[i] == chartconfigobj.chartXAxis) {
                    notmojuud = true;
                    break;
                }
            }
            var toopenstylebar = chartid + "___Xaxis";
            var tosortbar = chartid + "___Xaxis___";
            if (chartconfigobj.TableSortedColumn == chartconfigobj.chartXAxis) {
                chartconfigobj.TableSortedColumnId = tosortbar;
            }
            if (notmojuud) {
                tablehead = tablehead + "<th><a onclick='RemovetablechartxaxisChart( " + chartid + ")' style='color:white;height:20px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a  id=" + toopenstylebar + "  ondblclick = 'ChartSeriesStylebarOpen(this)' style='margin-left:6px;font-size:12px;background-color:red;' font-weight:400>" + chartconfigobj.chartXAxis + "</a><a id=" + tosortbar + " onclick='calladdremoveclassesfunction(this)' class='sort-byAfter'></a> </th>";
            }
            else {
                tablehead = tablehead + "<th><a onclick='RemovetablechartxaxisChart( " + chartid + ")' style='color:white;height:20px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a  id=" + toopenstylebar + "  ondblclick='ChartSeriesStylebarOpen(this)' style='margin-left:6px;font-size:12px;' font-weight:400>" + chartconfigobj.chartXAxis + "</a><a id=" + tosortbar + " onclick='calladdremoveclassesfunction(this)' class='sort-byAfter'></a> </th>";
            }
        }

        var totalsumsarray = [];
        $.each(chartconfigobj.chartYAxises, function (i, catfield) {
            var randomid = random(14);
            var yaxisid = "spn" + randomid + "___" + chartid;

            var notmojuudinfields = false;
            for (var i = 0; i < PinkFields.length; i++) {
                if (PinkFields[i] == catfield.label) {
                    notmojuudinfields = true;
                    break;
                }
            }
            var toopenstylebar = chartid + "___" + randomid;
            var tosortbar = chartid + "___" + randomid + "___";
            if (chartconfigobj.TableSortedColumn == catfield.label) {
                chartconfigobj.TableSortedColumnId = tosortbar;
            }
            if (notmojuudinfields) {
                tablehead = tablehead + "<th><span id=" + yaxisid + " style='display:none'>" + catfield.label + "</span><a    style='color:white;height:20px;margin-left:3px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a  ondblclick='ChartSeriesStylebarOpen(this)' style='margin-left:6px;font-size:12px;background-color:red;' font-weight:400 id=" + toopenstylebar + " >" + catfield.label + "</a><a id=" + tosortbar + "  onclick='calladdremoveclassesfunction(this)'  class='sort-byAfter'></a></th>";
            }
            else {
                tablehead = tablehead + "<th><span id=" + yaxisid + " style='display:none'>" + catfield.label + "</span><a   onclick='Removetablechartyaxis( " + yaxisid + ")' style='color:white;height:20px;margin-left:3px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a  ondblclick='ChartSeriesStylebarOpen(this)' style='margin-left:6px;font-size:12px' font-weight:400 id=" + toopenstylebar + ">" + catfield.label + "</a><a id=" + tosortbar + "  onclick='calladdremoveclassesfunction(this)' class='sort-byAfter'></a></th>";
            }

            var sumobj = {
                lable: catfield.label,
                total: 0,
                typestring: false
            }
            totalsumsarray.push(sumobj);
        });
        var trs = "";

        var sumvalue = 0;
        var uniquearray = [];
        chartconfigobj.chartSeries = [];
        var chetSeriesData = [];
        $.each(chartconfigobj.chartYAxises, function (m, catfield) {
            var chartSeriresObj = {
                name: catfield.label,
                data: []
            }
            chetSeriesData.push(chartSeriresObj)
        });
        if (chartconfigobj.chartXAxis.length > 0) {

            $.each(chartconfigobj.chartXAxisLabels, function (i, xaxis) {
                var tds = "";
                var seriesobj = [];
                var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);

                //   tds = tds + "<td>" + xaxis + "</td>"
                seriesobj.push(xaxis);

                $.each(chartconfigobj.chartYAxises, function (m, catfield) {

                    sumvalue = 0;
                    var cat = catfield.label;
                    var stringflag = false;
                    var calculatedField = cFields.find(x => x.name == cat);
                    if (calculatedField != undefined) {
                        sumvalue = calculateValuesForCustomFields(data_filter, cat)
                    } else {
                        $.each(data_filter, function (i, item) {
                            /*  $.each(chartconfigobj.chartYAxises, function (i, catfield) {*/

                            if (item[cat] != "" && item[cat] != null && item[cat] != undefined && isNaN(item[cat])) {
                                var exist = false;
                                $.each(uniquearray, function (i, xaxisitem) {
                                    if (xaxisitem == item[cat]) {
                                        // exist = true;
                                    }
                                });
                                if (!exist) {
                                    uniquearray.push(item[cat]);
                                    sumvalue = sumvalue + 1;
                                }
                                stringflag = true;
                            }
                            else if (item[cat] != "" && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                                var val = parseFloat(item[cat].toFixed(5))
                                if (!isFinite(val)) {
                                    val = 0;
                                }
                                sumvalue = sumvalue + val; //parseFloat(item[cat].toFixed(5));//.toFixed(2));
                            }
                        });
                    }
                    chetSeriesData.find(x => x.name == catfield.label).data.push(sumvalue);

                    if (stringflag) {

                        totalsumsarray[m].lable = cat;
                        var totalval = totalsumsarray[m].total + sumvalue;
                        totalsumsarray[m].total = totalval;
                        totalsumsarray[m].typestring = true;
                        //    tds = tds + "<td>" + sumvalue + "</td>";
                        seriesobj.push(sumvalue);
                    }
                    else {
                        totalsumsarray[m].lable = cat;
                        var totalval = totalsumsarray[m].total + sumvalue;
                        totalsumsarray[m].total = totalval;
                        totalsumsarray[m].typestring = false;
                        //    tds = tds + "<td>" + ApplyFormatting(parseFloat(sumvalue), cat) + "</td>";
                        seriesobj.push(ApplyFormatting(parseFloat(sumvalue), cat));
                    }

                });

                //   trs = trs + "<tr>" + tds + "</tr>";

                /*chartconfigobj.chartSeries.push(seriesobj);*/
                chartconfigobj.chartSeries = chetSeriesData
            });
        }
        else {
            var tds = "";
            var data_filter = filteredData;//.filter(element => element[chartconfigobj.chartXAxis] == xaxis);
            //  tds = tds + "<td>" + xaxis + "</td>"
            var seriesobj = [];
            $.each(chartconfigobj.chartYAxises, function (m, catfield) {
                sumvalue = 0;
                var cat = catfield.label;
                var stringflag = false;
                sumvalue = calculateValuesForCustomFields(data_filter, cat);
                if (sumvalue == 0) {
                    $.each(data_filter, function (i, item) {
                        /*  $.each(chartconfigobj.chartYAxises, function (i, catfield) {*/

                        if (item[cat] != "" && item[cat] != null && item[cat] != undefined && isNaN(item[cat])) {
                            var exist = false;
                            $.each(uniquearray, function (i, xaxisitem) {
                                if (xaxisitem == item[cat]) {
                                    //  exist = true;
                                }
                            });
                            if (!exist) {
                                uniquearray.push(item[cat]);
                                sumvalue = sumvalue + 1;
                            }
                            stringflag = true;
                        }
                        else if (item[cat] != "" && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {
                            var val = parseFloat(item[cat].toFixed(5))
                            if (!isFinite(val)) {
                                val = 0;
                            }
                            sumvalue = sumvalue + val; //parseFloat(item[cat].toFixed(5));//.toFixed(2));
                        }
                    });
                }

                chetSeriesData.find(x => x.name == catfield.label).data.push(sumvalue);
                if (stringflag) {
                    seriesobj.push(sumvalue);
                    if (chartconfigobj.TableChartValueType == "Percentage") {
                        tds = tds + "<td>100%</td>";
                    }
                    else {
                        tds = tds + "<td>" + sumvalue + "</td>";
                    }

                    totalsumsarray[m].lable = cat;
                    totalsumsarray[m].total = totalsumsarray[m].total + sumvalue;

                }
                else {
                    totalsumsarray[m].lable = cat;
                    totalsumsarray[m].total = totalsumsarray[m].total + sumvalue;
                    if (chartconfigobj.TableChartValueType == "Percentage") {
                        tds = tds + "<td>100%</td>";
                    }
                    else {
                        tds = tds + "<td>" + ApplyFormatting(sumvalue, cat) + "</td>";
                    }

                    seriesobj.push(ApplyFormatting(sumvalue, cat));
                }

            });

            trs = trs + "<tr>" + tds + "</tr>";

            /*chartconfigobj.chartSeries.push(seriesobj);*/
            chartconfigobj.chartSeries = chetSeriesData
        }
        var totalthead = "";
        var tablefoot = "";
        if (chartconfigobj.chartXAxis.length > 0) {
            var totalds = "";
            totalds = totalds + "<th><b style='color:black;font-size:12px'>Totals:</b> </th>";


            $.each(totalsumsarray, function (n, catfield) {
                var calculatedField = cFields.find(x => x.name == catfield.lable);

                if (calculatedField != undefined) {
                    catfield.total = calculateValuesForCustomFieldsNumberChart(filteredData, catfield.lable)
                }
                chartconfigobj.chartSeries.find(x => x.name == catfield.lable).data.push(catfield.total)
                if (chartconfigobj.chartYAxises[n].TableChartValueType == "Percentage") {
                    totalds = totalds + "<th><b style='color:black;font-size:12px'>100%</b></th>"
                }
                else if (catfield.typestring) {
                    totalds = totalds + "<th><b style='color:black;font-size:12px'>" + parseFloat(catfield.total).toFixed(0) + "</b></th>"
                }
                else {
                    totalds = totalds + "<th><b style='color:black;font-size:12px'>" + ApplyFormatting(parseFloat(catfield.total), catfield.lable) + "</b></th>"
                }

            });
            totalthead = totalthead + "<thead>" + totalds + "</thead>";
            tablefoot = tablefoot + "<tfoot>" + totalds + "</tfoot>"
        }
        var serieslength = chartconfigobj.chartXAxisShowLabels.length;
        for (var m = 0; m < serieslength; m++) {
            var tds = "<td>" + chartconfigobj.chartXAxisShowLabels[m] + "</td>";
            //for (i = 0; i < chartconfigobj.chartSeries.length; i++) {
            for (i = 0; i < totalsumsarray.length; i++) {
                var backgroundcolor = chartconfigobj.chartselectedpallet[i];// selectedpallet[i];
                //  var back = ["#ff0000", "blue", "gray"];
                // var backgroundcolor = back[Math.floor(Math.random() * back.length)];
                if (totalsumsarray[i].typestring) {
                    var value = chartconfigobj.chartSeries[i].data[m];
                    var percentagevalue = (value / totalsumsarray[i].total) * 100;

                    if (chartconfigobj.chartYAxises[i].TableChartValueType == "Percentage") {
                        //var progressbar = ` <div class=row><div class='col-md-5' style="text-align: center;">${percentagevalue.toFixed(2)}%</div><div class="col-md-7">
                        //                        <div class=progress ><div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        //                    </div></div></div>`;
                        var progressbar = `<div style="float:left;margin-right:20px">${percentagevalue.toFixed(2)}%</div>
                                                <div class=progress style='height:17;background-color:transparent'><div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width: ${percentagevalue}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div></div>`;
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + percentagevalue.toFixed(2) + "% </td>"
                        }
                        //tds = tds + "<td>" + percentagevalue.toFixed(2) + "% "+progressbar+"</td>"

                    }
                    else {
                        var progressbar = ` <div style="float:left;margin-right:20px">${value}</div><div class="progress " style='height:17;background-color:transparent'>
                                              <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width:${percentagevalue}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>`;
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + value + "</td>";
                        }
                        //tds = tds + "<td>" + value + " " + progressbar +"</td>"
                    }

                }
                else {
                    var value = chartconfigobj.chartSeries[i].data[m];
                    var percentagevalue = (value / totalsumsarray[i].total) * 100;
                    if (chartconfigobj.chartYAxises[i].TableChartValueType == "Percentage") {

                        var progressbar = ` <div style="float:left;margin-right:20px">${percentagevalue.toFixed(2)}%</div><div class="progress" style='height:20;background-color:transparent'>
                                              <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width: ${percentagevalue}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>`;
                        //tds = tds + "<td>" + percentagevalue.toFixed(2) + "%" + progressbar +"</td>"
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + percentagevalue.toFixed(2) + "%</td>"
                        }
                    }
                    else {
                        var progressbar = ` <div style="float:left;margin-right:20px">${ApplyFormatting(value, totalsumsarray[i].lable)}</div><div class="progress" style='height:17;background-color:transparent'>
                                              <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width:${percentagevalue}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>`;
                        //tds = tds + "<td>" + ApplyFormatting(value, totalsumsarray[i].lable) + "" + progressbar +"</td>"
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + ApplyFormatting(value, totalsumsarray[i].lable) + "</td>"
                        }
                    }

                }
            }

            trs = trs + "<tr>" + tds + "</tr>";
        }

        var styledata = 'display: block;max-height:350px;overflow:auto;min-height:50px;';
        if (!showremoveiconstyle) {
            styledata = "display: block;overflow:auto;min-height:50px;";
        }

        return "<div style='" + styledata + "' class='tableFixHead'><table class='table table-striped' style='font-size:11px;color:black' id=table" + chartid + "><thead class='thead-light' id='th'" + chartid + ">" + tablehead + "</thead>" + tablefoot + "<tbody id='th'" + chartid + ">" + trs + "</tbody></table></div>"
    }
}



function ChartSeriesStylebarOpen(element) {
    debugger;
    var ids = element.id.split('___');
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == ids[0]);
    if (ids[1] == "Xaxis") {
        ChartSereisCustomizeOpen(ids[0], chartconfigobj.chartXAxis);
    }
    else {
        //ChartSereisCustomizeOpen(ids[0], chartconfigobj.chartYAxises[ids[1]].label);
        ChartSereisCustomizeOpen(ids[0], $("#" + element.id).text());
    }

}

function sortTable(column, type, tblIdentity, isThis) {
    debugger;
    var order = $('#' + tblIdentity + ' thead tr>th:eq(' + column + ')').data('order');
    if (order == undefined) {
        order = 'ASC';
    }
    order = order === 'ASC' ? 'DESC' : 'ASC';
    if (!isThis) {
        order = 'ASC';
    }
    $('#' + tblIdentity + ' thead tr>th:eq(' + column + ')').data('order', order);

    $('#' + tblIdentity + ' tbody tr').sort(function (a, b) {
        a = $(a).find('td:eq(' + column + ')').text();
        b = $(b).find('td:eq(' + column + ')').text();
        // debugger;
        switch (type) {
            case 'text':
                return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
                break;
            case 'number':
                return order === 'ASC' ? a - b : b - a;
                break;
            case 'percentageBased':

                a = a.replace('£', '');
                a = a.replace('£', '');
                var aa = a.split('/');
                a = aa[0] / aa[1];
                a = a * 100;

                b = b.replace('£', '');
                b = b.replace('£', '');
                var bb = b.split('/');
                b = bb[0] / bb[1];
                b = b * 100;
                return order === 'ASC' ? a - b : b - a;
                break;
            case 'date':
                var dateFormat = function (dt) {
                    [d, m, y] = dt.split('/');
                    return [y, m - 1, d];
                }
                a = new Date(...dateFormat(a));
                b = new Date(...dateFormat(b));
                return order === 'ASC' ? a - b : b - a;
                break;
            case 'datetime':
                var datetimeFormat = function (dt) {
                    var dWithTime = dt.replace(':', '/');
                    dWithTime = dWithTime.replace(' ', '/');
                    [y, m, d, hh, mm] = dWithTime.split('/');
                    return [y, m - 1, d, hh, mm];
                }
                a = new Date(...datetimeFormat(a));
                b = new Date(...datetimeFormat(b));
                return order === 'ASC' ? a - b : b - a;
                break;
        }
    }).appendTo('#' + tblIdentity + ' tbody');
}

function AddRemoveClasses(element) {
    var id = element;
    //   debugger;
    // id, tblId, index, type
    var ids = id.split('___');
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == ids[0]);
    var randomid = getrandomchartidusingid(ids[0]);
    var tblId = "table" + ids[0];
    var index = 0;
    var seriesname = $("#" + id[0] + id[1]).text();

    chartconfigobj.TableSortedColumnId = id;
    if (ids[1] != "Xaxis") {
        index = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
        index = index + 1;
        chartconfigobj.TableSortedColumn = seriesname;
    }
    else {
        chartconfigobj.TableSortedColumn = chartconfigobj.chartXAxis;
    }
    var type = "text";
    var isThis = false;
    if ($('#' + id).hasClass("sort-byAfter") || $('#' + id).hasClass("sort-byBefore")) {
        isThis = true;
    }
    if ($('#' + id).hasClass("sort-by") || $('#' + id).hasClass("sort-byBefore")) {
        //  $('#' + tblId + ' tr th a').removeClass();
        // $('#' + tblId + ' tr th a').addClass('sort-by');
        $('#' + id).removeClass();
        $('#' + id).addClass('sort-byAfter');
        sortTable(index, type, tblId, isThis);
    } else {
        // $('#' + tblId + ' tr th a').removeClass();
        //  $('#' + tblId + ' tr th a').addClass('sort-by');
        $('#' + id + ' a').removeClass();
        $('#' + id + ' a').addClass('sort-byBefore');

        sortTable(index, type, tblId, isThis);
        //  debugger;
        settablestyle(chartconfigobj);
    }
}
function settablestyle(chartconfigobj) {
    // debugger;
    var chartid = chartconfigobj.chartId;
    var randomchartid = getrandomchartidusingid(chartid);
    $("#anc_" + randomchartid).addClass("d-none");

    if (chartconfigobj.TableChartStyle == "tblStyle1") {
        $("#table" + chartid + " thead th").css({
            "background-color": "darkgray",//chartconfigobj.TableChartRowColour,
            "color": "black"
        });
        $("#table" + chartid + " tbody tr").css("background-color", "white");
        $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
    }
    if (chartconfigobj.TableChartStyle == "tblStyle2") {
        $("#table" + chartid + " thead th").css({
            "background-color": "white",
            "border": "1px solid lightgray",
            "color": "black"
        });
        $("#table" + chartid + " tr td").css({
            "border": "1px solid lightgray"
        });
        //$("#table" + chartid + " tfoot tr th").css({
        //    "border": "1px solid lightgray"
        //});
        $("#table" + chartid + " tfoot").css({
            "border": "1px solid lightgray"
        });
        $("#table" + chartid + " tfoot tr th").css({
            "border": "1px solid lightgray"
        });
        //$("#table" + chartid + " tbody tr:nth-of-type(even)").css({
        //    "border": "1px solid lightgray"
        //});
        $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
    }
    if (chartconfigobj.TableChartStyle == "tblStyle3") {
        $("#table" + chartid + " thead th").css({
            "background-color": chartconfigobj.TableChartRowColour,
            "border": "1px solid lightgray",
            "color": "white"
        });
        $("#table" + chartid + " tr td").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tfoot").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tfoot tr th").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tbody tr:odd").css("background-color", "white");
    }

}
function calladdremoveclassesfunction(element) {
    var id = element.id;
    AddRemoveClasses(id);
}