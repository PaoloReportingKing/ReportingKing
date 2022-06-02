


var totalCol = "";
function settableChart(chartid, sorttable) {
    removelegendiv(chartid);
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == chartid);
    tableLockRows = parseInt(chartconfigobj.TableLockedRows);
    var totalCollength = chartconfigobj.chartYAxises.length;
    if (chartconfigobj.chartXAxis.length > 0) {
        totalCollength = totalCollength + 1;
    }
    if (totalCollength == 1 || totalCollength == 2) {
        totalCol = "OneTwoColumns"
    }
    else if (totalCollength == 3 || totalCollength == 4) {
        totalCol = "ThreeFourColumns"
    }
    else {
        totalCol = "Noofcolumns"

    }
    var randomchartid = getrandomchartidusingid(chartid);
    if (chartconfigobj.TableLocked == undefined) {
        chartconfigobj.TableLocked = false;
        var html = $("#reset_chart_" + randomchartid);
        $("#reset_chart_" + randomchartid)[0].outerHTML = $("#reset_chart_" + randomchartid)[0].outerHTML + ` <a id='LockTable_${randomchartid}' class='LockTableButtonStyle' onclick="LockUnLockChart('${randomchartid}')" style='color: red;cursor:pointer;font-size: 12px'>Lock</a><span id="BlockRowsBlock_${randomchartid}" class=BlockRowsBlock><span class=BlockRowsTitle>Rows:</span><b id="BlockRows_${randomchartid}">8</b><b class=BlockRowsMinus onclick=MinusBlockRows("${randomchartid}")> -</b><b class=BlockRowsPlusSpan onclick=PlusBlockRows("${randomchartid}")> +</b></span>`;
    }
    else {
        var BlockRowsBlock = document.getElementById("BlockRowsBlock_" + randomchartid);
        if (BlockRowsBlock == null) {
            $("#LockTable_" + randomchartid)[0].outerHTML = $("#LockTable_" + randomchartid)[0].outerHTML + ` <span id="BlockRowsBlock_${randomchartid}" class=BlockRowsBlock><span class=BlockRowsTitle>Rows:</span><b class=BlocRowsTotal id="BlockRows_${randomchartid}">8</b><b class=BlockRowsMinus onclick=MinusBlockRows("${randomchartid}")> -</b><b class=BlockRowsPlusSpan onclick=PlusBlockRows("${randomchartid}")> +</b></span>`;
        }
    }
    var tableRowLength = chartconfigobj.chartXAxisLabels.length;//$("#tablechart_" + randomchartid + ">tbody>tr").length;
    if (tableRowLength > 7) {
        TableLockMinRows = 8;
        TableLockMaxRows = tableRowLength;
        if (chartconfigobj.TableLockedRows < 6 || chartconfigobj.TableLockedRows == undefined) {
            chartconfigobj.TableLockedRows = 8;
        }
    }
    else {

        TableLockMinRows = tableRowLength;
        TableLockMaxRows = tableRowLength;
        chartconfigobj.TableLockedRows = TableLockMinRows;
    }
    RefreshTableRowsCount(chartconfigobj);
    var tablehtml = GetTableChartDiv(chartid, true, chartconfigobj);// "<div style='display: block;max-height:350px;overflow:auto'><table class='table table-border' id=table" + chartid + "><thead id='th'" + chartid + ">" + tablehead + "</thead><tbody id='th'" + chartid + ">" + trs+"</tbody></table></div>"
    var b = $("#" + chartid);
    b.empty();
    b.append(tablehtml);
    $("#div" + chartid).hide();
    

   
    //$('#comments_parent_div_' + randomchartid).css({'position' : 'absolute', 'bottom': 0});
    //$("#anc_" + randomchartid).addClass("d-none");
    //if (chartconfigobj.TableChartStyle == "tblStyle1") {
    //    $("#table" + chartid + " thead th").css({
    //        "background-color": "darkgray",//chartconfigobj.TableChartRowColour,
    //        "color": "black"
    //    });
    //    $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
    //}
    //if (chartconfigobj.TableChartStyle == "tblStyle2") {
    //    $("#table" + chartid + " thead th").css({
    //        "background-color": "white",
    //        "border": "1px solid lightgray",
    //        "color": "black"
    //    });
    //    $("#table" + chartid + " tr td").css({
    //        "border": "1px solid lightgray"
    //    });
    //    //$("#table" + chartid + " tfoot tr th").css({
    //    //    "border": "1px solid lightgray"
    //    //});
    //    $("#table" + chartid + " tfoot").css({
    //        "border": "1px solid lightgray"
    //    });
    //    $("#table" + chartid + " tfoot tr th").css({
    //        "border": "1px solid lightgray"
    //    });
    //    //$("#table" + chartid + " tbody tr:nth-of-type(even)").css({
    //    //    "border": "1px solid lightgray"
    //    //});
    //    $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
    //}
    //if (chartconfigobj.TableChartStyle == "tblStyle3") {
    //    $("#table" + chartid + " thead th").css({
    //        "background-color": chartconfigobj.TableChartRowColour,
    //        "border": "1px solid lightgray",
    //        "color": "white"
    //    });
    //    $("#table" + chartid + " tr td").css({
    //        "border": "1px solid" + chartconfigobj.TableChartRowColour
    //    });
    //    $("#table" + chartid + " tfoot").css({
    //        "border": "1px solid" + chartconfigobj.TableChartRowColour
    //    });
    //    $("#table" + chartid + " tfoot tr th").css({
    //        "border": "1px solid" + chartconfigobj.TableChartRowColour
    //    });
    //    $("#table" + chartid + " tbody tr:odd").css("background-color", "white");
    //}
    debugger;
    if (chartconfigobj.TableSortedColumnId != "") {
        setTimeout(function () {
            AddRemoveClasses(chartconfigobj.TableSortedColumnId, sorttable);
        }, 10);

    }
    else {
        settablestyle(chartconfigobj);
    }
    setTimeout(function () {
        HideShowRowBlocksSpan(chartconfigobj);
        hideshowandrenameLockButton(chartconfigobj);
        bindScroller(chartconfigobj);
    }, 10);
    
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

        var chartYAxisestotalsindex = chartconfigobj.chartYAxises.findIndex(x => x == "Totals: ")
        if (chartYAxisestotalsindex != -1) {
            chartconfigobj.chartYAxises.splice(chartYAxisestotalsindex, 1);
        }

        var chartXAxisLabelstotalindex = chartconfigobj.chartXAxisLabels.findIndex(x => x == "Totals: ")
        if (chartXAxisLabelstotalindex != -1) {
            chartconfigobj.chartXAxisLabels.splice(chartXAxisLabelstotalindex, 1);
        }

        var tablehead = "";
        var tablebody = "";
        var showstyle = "";
        if (!showremoveiconstyle) {
            showstyle = "display:none";
        }

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
            var sortedclass = "";
            if (chartconfigobj.TableSortedColumn == chartconfigobj.chartXAxis) {
                chartconfigobj.TableSortedColumnId = tosortbar;
                sortedclass = chartconfigobj.TableSortedColumnClass;
            }
            //   
            if (notmojuud) {
                tablehead = tablehead + "<th title='" + chartconfigobj.chartXAxis + "' class=fixedtablehead><a class='tableremoveicon' id=Removetableicon" + chartid + " onclick='RemovetablechartxaxisChart( " + chartid + ")' style='color:white !important;height:20px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a id=" + tosortbar + " onclick='calladdremoveclassesfunction(this)' class='sortdata  sort-by" + sortedclass + "'></a><a class='notmojood'  id=" + toopenstylebar + "  ondblclick = 'ChartSeriesStylebarOpen(this)' style='padding-bottom:2px;border-radius:3px;padding-left:3px;padding-right:3px;margin-left:5px;font-size:12px;background-color:red;' font-weight:400>" + chartconfigobj.chartXAxis + "</a> </th><th style=display:none></th>";
            }
            else {
                tablehead = tablehead + "<th  title='" + chartconfigobj.chartXAxis + "' class=fixedtablehead><a class='tableremoveicon' id=Removetableicon" + chartid + " onclick='RemovetablechartxaxisChart( " + chartid + ")' style='color:white !important;height:20px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a id=" + tosortbar + " onclick='calladdremoveclassesfunction(this)' class='sortdata  sort-by " + sortedclass + "'></a><a  id=" + toopenstylebar + "  ondblclick='ChartSeriesStylebarOpen(this)' style='margin-left:5px;font-size:12px;' font-weight:400>" + chartconfigobj.chartXAxis + "</a></th><th style=display:none></th>";
            }
        }

        var totalsumsarray = [];
        var maximumvalue = 0;
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
            var sortedclass = "";
            if (chartconfigobj.TableSortedColumn == catfield.label) {
                chartconfigobj.TableSortedColumnId = tosortbar;
                sortedclass = chartconfigobj.TableSortedColumnClass;
            }
            if (notmojuudinfields) {
                tablehead = tablehead + "<th class='fixedtablehead' title='" + catfield.label + "'><span id=" + yaxisid + " style='display:none'>" + catfield.label + "</span><a class='tableremoveicon' id=Removetableicon" + chartid + "  style='color:white;height:20px;margin-left:3px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a id=" + tosortbar + "  onclick='calladdremoveclassesfunction(this)'  class='sortdata  sort-by " + sortedclass + "'></a><a  class='notmojood' ondblclick='ChartSeriesStylebarOpen(this)' style='padding-bottom:2px;border-radius:3px;padding-left:3px;padding-right:3px;margin-left:5px;font-size:12px;background-color:red;' font-weight:400 id=" + toopenstylebar + " >" + catfield.label + "</a></th><th style=display:none></th>";
            }
            else {
                tablehead = tablehead + "<th class='fixedtablehead' title='" + catfield.label + "' ><span id=" + yaxisid + " style='display:none'>" + catfield.label + "</span><a class='tableremoveicon' id=Removetableicon" + chartid + "  onclick='Removetablechartyaxis( " + yaxisid + ")' style='color:white;height:20px;margin-left:3px; width:20px;background-color:#be2020;border-radius:50%; display:inline-flex; cursor: pointer; align-items: center; justify-content: center;" + showstyle + " '>x</a><a id=" + tosortbar + "  onclick='calladdremoveclassesfunction(this)' class='sortdata  sort-by " + sortedclass + "'></a><a  ondblclick='ChartSeriesStylebarOpen(this)' style='margin-left:5px;font-size:12px' font-weight:400 id=" + toopenstylebar + ">" + catfield.label + "</a></th><th style=display:none></th>";
            }

            var sumobj = {
                lable: catfield.label,
                total: 0,
                typestring: false,
                seriesmax: 0
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
                if (chartconfigobj.TableLocked && i >= chartconfigobj.TableLockedRows) {
                    return false;
                }
                var tds = "";
                var seriesobj = [];
                var data_filter = filteredData.filter(element => element[chartconfigobj.chartXAxis] == xaxis);

                //   tds = tds + "<td>" + xaxis + "</td>"
                seriesobj.push(xaxis);
                var seriesmaximum = 0;
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
                            else if (item[cat] != "" && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN) {
                                var val = parseFloat(item[cat]);//parseFloat(item[cat].toFixed(5))
                                if (!isFinite(val)) {
                                    val = 0;
                                }
                                sumvalue = sumvalue + val; //parseFloat(item[cat].toFixed(5));//.toFixed(2));
                            }
                        });
                    }


                    chetSeriesData.find(x => x.name == catfield.label).data.push(sumvalue);
                    chetSeriesData.find(x => x.name == catfield.label).StringType = stringflag;
                    if (stringflag) {

                        totalsumsarray[m].lable = cat;
                        var totalval = totalsumsarray[m].total + sumvalue;

                        totalsumsarray[m].total = totalval;
                        totalsumsarray[m].typestring = true;
                        if (totalsumsarray[m].seriesmax < sumvalue) {
                            totalsumsarray[m].seriesmax = sumvalue;

                        }
                        //    tds = tds + "<td>" + sumvalue + "</td>";
                        if (maximumvalue < sumvalue) {
                            maximumvalue = sumvalue;
                        }
                        seriesobj.push(sumvalue);
                    }
                    else {
                        totalsumsarray[m].lable = cat;
                        var totalval = totalsumsarray[m].total + sumvalue;
                        totalsumsarray[m].total = totalval;
                        totalsumsarray[m].typestring = false;
                        if (maximumvalue < sumvalue) {
                            maximumvalue = sumvalue;
                        }
                        if (totalsumsarray[m].seriesmax < sumvalue) {
                            totalsumsarray[m].seriesmax = sumvalue;

                        }
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
                var seriesmaximum = 0;
                var stringflag = false;
                sumvalue = calculateValuesForCustomFields(data_filter, cat);
                if (sumvalue == 0) {
                    $.each(data_filter, function (i, item) {
                        /*  $.each(chartconfigobj.chartYAxises, function (i, catfield) {*/
                        var isstring = isNaN(item[cat]);
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
                        /*else if (item[cat] != "" && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN && parseFloat(item[cat]) > 0) {*/
                        else if (!CheckNullUndefined(item[cat]) && item[cat] != "" && parseFloat(item[cat]) != undefined && parseFloat(item[cat]) != NaN) {
                            var val = parseFloat(item[cat]);//.toFixed(5))
                            if (!isFinite(val)) {
                                val = 0;
                            }
                            sumvalue = sumvalue + val; //parseFloat(item[cat].toFixed(5));//.toFixed(2));
                        }
                    });
                }
                chetSeriesData.find(x => x.name == catfield.label).data.push(sumvalue);


                if (stringflag) {
                    if (maximumvalue < sumvalue) {
                        maximumvalue = sumvalue;
                    }
                    seriesobj.push(sumvalue);
                    if (chartconfigobj.TableChartValueType == "Percentage") {
                        tds = tds + "<td>100%</td><td style=display:none>100%</td>";
                    }
                    else {
                        tds = tds + "<td>" + sumvalue + "</td><td style=display:none>" + sumvalue + "</td>";
                    }

                    totalsumsarray[m].lable = cat;
                    totalsumsarray[m].total = totalsumsarray[m].total + sumvalue;
                    if (totalsumsarray[m].seriesmax < sumvalue) {
                        totalsumsarray[m].seriesmax = sumvalue;

                    }

                }
                else {
                    totalsumsarray[m].lable = cat;
                    totalsumsarray[m].total = totalsumsarray[m].total + sumvalue;
                    if (chartconfigobj.TableChartValueType == "Percentage") {
                        tds = tds + "<td>100%</td><td style=display:none></td>";
                    }
                    else {
                        tds = tds + "<td>" + ApplyFormatting(sumvalue, cat) + "</td><td style=display:none>" + sumvalue + "</td>";
                    }
                    if (maximumvalue < sumvalue) {
                        maximumvalue = sumvalue;
                    }
                    if (totalsumsarray[m].seriesmax < sumvalue) {
                        totalsumsarray[m].seriesmax = sumvalue;

                    }
                    totalsumsarray[m].seriesmax = seriesmaximum;
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
                    catfield.total = calculateValuesForCustomFieldsNumberChart(filteredData, catfield.lable, chartconfigobj)
                }
                if (chartconfigobj.chartSeries.find(x => x.name == catfield.lable) != undefined) {
                    chartconfigobj.chartSeries.find(x => x.name == catfield.lable).data.push(catfield.total)
                }

                if (chartconfigobj.chartYAxises[n].TableChartValueType == "Percentage") {
                    totalds = totalds + "<th><b style='color:black;font-size:12px;'>100%</b></th>"
                }
                else if (catfield.typestring) {
                    totalds = totalds + "<th><b style='color:black;font-size:12px;'>" + parseFloat(catfield.total).toFixed(0) + "</b></th>"
                }
                else {
                    totalds = totalds + "<th><b style='color:black;font-size:12px';>" + ApplyFormatting(parseFloat(catfield.total), catfield.lable) + "</b></th>"
                }

            });
            totalthead = totalthead + "<thead>" + totalds + "</thead>";
            tablefoot = tablefoot + "<tfoot>" + totalds + "</tfoot>"
        }
        var serieslength = chartconfigobj.chartXAxisShowLabels.length;
        if (maximumvalue > 0) {
            maximumvalue = maximumvalue + (maximumvalue / 7);
        }

        for (var m = 0; m < serieslength; m++) {
            //var filtereddatavalue = chartconfigobj.chartXAxisLabels[m];
            //if ((filtereddatavalue.toString().indexOf("/") > -1 || filtereddatavalue.toString().indexOf("-") > -1)
            //    && filtereddatavalue.toString().indexOf(":") > -1
            //    && filtereddatavalue.toString().length < 20) {
            //    // filtereddatavalue = new Date(filtereddatavalue);
            //}
            //else {
            //   // filtereddatavalue = chartconfigobj.chartXAxisShowLabels[m];
            //}

            var tds = "<td>" + chartconfigobj.chartXAxisShowLabels[m] + "</td><td style=display:none>" + chartconfigobj.chartXAxisShowLabels[m] + "</td>";
            //for (i = 0; i < chartconfigobj.chartSeries.length; i++) {
            for (i = 0; i < totalsumsarray.length; i++) {
                var backgroundcolor = chartconfigobj.chartselectedpallet[i];// selectedpallet[i];
                //  var back = ["#ff0000", "blue", "gray"];
                // var backgroundcolor = back[Math.floor(Math.random() * back.length)];
                if (totalsumsarray[i].typestring) {
                    var value = chartconfigobj.chartSeries[i].data[m];
                    var percentagevalue = (value / totalsumsarray[i].total) * 100;
                    var progresspercentage = (value / totalsumsarray[i].seriesmax) * 100;// (value / maximumvalue)*100; //100 - (maximumvalue / value);

                    if (chartconfigobj.chartYAxises[i].TableChartValueType == "Percentage") {
                        //var progressbar = ` <div class=row><div class='col-md-5' style="text-align: center;">${percentagevalue.toFixed(2)}%</div><div class="col-md-7">
                        //                        <div class=progress ><div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        //                    </div></div></div>`;
                        var progressbar = `<div>${percentagevalue.toFixed(2)}%</div>
                                                <div class='progress ${totalCol}' style='height:17;background-color:transparent'><div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width: ${progresspercentage}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div></div>`;
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td><td style=display:none>" + percentagevalue + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + percentagevalue.toFixed(2) + "% </td><td style=display:none>" + percentagevalue + "</td>"
                        }
                        //tds = tds + "<td>" + percentagevalue.toFixed(2) + "% "+progressbar+"</td>"

                    }
                    else {
                        //var progressbar = ` <div style="float:left;margin-right:3px">${value}</div><div class="progress " style='height:17;background-color:transparent'>
                        //                      <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width:${progresspercentage}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                        //                     </div>`;
                        var progressbar = ` <div>${value}</div><div class='progress ${totalCol}' style='height:17;background-color:transparent'>
                                              <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width:${progresspercentage}%" aria-valuenow="${percentagevalue}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>`;
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td><td style=display:none>" + value + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + value + "</td><td style=display:none>" + value + "</td>";
                        }
                        //tds = tds + "<td>" + value + " " + progressbar +"</td>"
                    }

                }
                else {
                    var value = chartconfigobj.chartSeries[i].data[m];
                    var percentagevalue = (value / totalsumsarray[i].total) * 100;
                    // var progresspercentage = (value / maximumvalue) * 100;
                    var progresspercentage = (value / totalsumsarray[i].seriesmax) * 100;// (value / maximumvalue)*100; //100 - (maximumvalue / value);
                    if (chartconfigobj.chartYAxises[i].TableChartValueType == "Percentage") {

                        //var progressbar = ` <div style="float:left;margin-right:3px">${percentagevalue.toFixed(2)}%</div><div class="progress" style='height:20;background-color:transparent'>
                        //                      <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width: ${progresspercentage}%" aria-valuenow="${progresspercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                        //                     </div>`;
                        var progressbar = ` <div >${percentagevalue.toFixed(2)}%</div><div class='progress ${totalCol}' style='height:17;background-color:transparent'>
                                              <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width: ${progresspercentage}%" aria-valuenow="${progresspercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>`;
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td><td style=display:none>" + percentagevalue + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + percentagevalue.toFixed(2) + "%</td><td style=display:none>" + percentagevalue + "</td>"
                        }
                    }
                    else {
                        //var progressbar = ` <div style="float:left;margin-right:3px">${ApplyFormatting(value, totalsumsarray[i].lable)}</div><div class="progress" style='height:17;background-color:transparent'>
                        //                      <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width:${progresspercentage}%" aria-valuenow="${progresspercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                        //                     </div>`;
                        var progressbar = ` <div>${ApplyFormatting(value, totalsumsarray[i].lable)}</div><div class='progress ${totalCol}' style='height:17;background-color:transparent'>
                                              <div class="progress-bar" role="progressbar" style="background-color:${backgroundcolor};width:${progresspercentage}%" aria-valuenow="${progresspercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                             </div>`;
                        if (chartconfigobj.chartYAxises[i].TableChartBar) {
                            tds = tds + "<td>" + progressbar + "</td><td style=display:none>" + value + "</td>"
                        }
                        else {
                            tds = tds + "<td>" + ApplyFormatting(value, totalsumsarray[i].lable) + "</td><td style=display:none>" + value + "</td>"
                        }
                    }

                }
            }
            if (chartconfigobj.TableLocked && m >= chartconfigobj.TableLockedRows) {

            }
            else {
                trs = trs + "<tr id=tr" + random(5) + ">" + tds + "</tr>";
            }
        }

        var styledata = 'display: block;overflow:auto;min-height:50px;';
        if (!showremoveiconstyle) {
            styledata = "display: block;overflow:auto;min-height:50px;";
        }
        // alert(maximumvalue);
        var tablestyleononecolumn = "";

        if (chartconfigobj.chartXAxis.length > 0 && chartconfigobj.chartYAxises.length < 1 || chartconfigobj.chartXAxis.length == 0 && chartconfigobj.chartYAxises.length > 0) {
            tablestyleononecolumn = "text-align:center;";
        }

        var tablestyle = "max-width:920px;margin:auto";
        var totallength = chartconfigobj.chartYAxises.length;
        if (chartconfigobj.chartXAxis.length > 0) {
            totallength = totallength + 1;
        }

        if (totallength > 5) {
            tablestyle = "";
        }

        return "<div id=tablediv" + chartid + "  style='" + styledata + "' class='tablechartheight tableFixHead'><table class='table table-striped' style='font-size:11px;" + tablestyle + ";color:black;" + tablestyleononecolumn + "' id=table" + chartid + "><thead class='thead-light' id='th'" + chartid + ">" + tablehead + "</thead>" + tablefoot + "<tbody id='th'" + chartid + ">" + trs + "</tbody></table></div>"
    }


    if (!showremoveiconstyle) {



        if (chartconfigobj.TableSortedColumnId != "") {
            AddRemoveClasses(chartconfigobj.TableSortedColumnId);
        }
        else {
            settablestyle(chartconfigobj);
        }
    }
}



function ChartSeriesStylebarOpen(element) {

    closeAllPanels();
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

function sortTable(column, type, tblIdentity, isThis, order,chartconfigobj) {

    //var order = $('#' + tblIdentity + ' thead tr>th:eq(' + column + ')').data('order');
    if (order == undefined) {
        order = 'ASC';
    }
    // order = order === 'ASC' ? 'DESC' : 'ASC';
    //if (!isThis) {
    //    order = 'ASC';
    //}
    // $('#' + tblIdentity + ' thead tr>th:eq(' + column + ')').data('order', order);
    var splitter = "";
    var findsplitter = true;
    //var EndRows = $('#' + tblIdentity + ' tbody tr');
    //var FirstSixRow = $('#' + tblIdentity + ' tbody tr');;
    //if (chartconfigobj.TableLocked) {
    //    tableLockRows = parseInt(chartconfigobj.TableLockedRows);
    //    FirstSixRow.splice(tableLockRows, FirstSixRow.length);
    //    EndRows.splice(0, tableLockRows);
    //    $('#' + tblIdentity + ' tbody tr').remove();
    //}
    debugger;
    /**/
    var origionaltype = type;
    /* FirstSixRow.sort(function (a, b) {*/
    $('#' + tblIdentity + ' tbody tr').sort(function (a, b) {
        a = $(a).find('td:eq(' + column + ')').text();
        b = $(b).find('td:eq(' + column + ')').text();
        if (origionaltype == "Weekday") {
            a = GetWeekDayIndex(a);
            b = GetWeekDayIndex(b);
        }
        if (origionaltype == "Week") {
            a = GetWeekNoIndex(a);
            b = GetWeekNoIndex(b);
        }
        if (origionaltype == "Month") {
            a = GetMonthIndex(a);
            b = GetMonthIndex(b);
        }
        if (findsplitter && type == "date") {
            findsplitter = false;
            var splitvalue = a;
            if (splitvalue.indexOf("-") > -1) {
                splitter = "-";
            }
            if (splitvalue.indexOf("/") > -1) {
                splitter = "/";
            }
        }
        if (type == "Weekday" || type == "Week" || type == "Month") {
            type = 'number';
        }
        switch (type) {
            case 'text':
                return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
                break;
            case 'number':
                return order === 'ASC' ? a - b : b - a;
                // return order === 'ASC' ? $('td:last', a).text().localeCompare($('td:last', b).text()) : $('td:last', b).text().localeCompare($('td:last', a).text());
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
                    [d, m, y] = dt.split(splitter);//dt.split('-');
                    return [y, m - 1, d];
                }
                if (splitter == "-") {
                    a = new Date(a).getTime();
                    b = new Date(b).getTime();
                }
                if (splitter == "/") {
                    a = new Date(...dateFormat(a));
                    b = new Date(...dateFormat(b));
                }
                if (splitter == "") {
                    a = new Date(a).getTime();
                    b = new Date(b).getTime();
                }


                var returnorder = order === 'ASC' ? a - b : b - a;
                return returnorder// === 'ASC' ? a - b : b - a;
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
    //debugger;
    //if (chartconfigobj.TableLocked) {
    //    for (var i = 0; i < EndRows.length; i++) {
    //        $('#' + tblIdentity + ' tbody').append(EndRows[i].outerHTML);
    //    }
    //}
}

function AddRemoveClasses(element, SortTable) {
    var id = element;

    // id, tblId, index, type
    var ids = id.split('___');
    var chartconfigobj = chartsconfigurations.find(x => x.chartId == ids[0]);
    var randomid = getrandomchartidusingid(ids[0]);
    var tblId = "table" + ids[0];
    var index = 1;
    var seriesid = ids[0] + "___" + ids[1];
    var seriesname = $("#" + seriesid).text();

    chartconfigobj.TableSortedColumnId = id;
    var type = "text";
    if (ids[1] != "Xaxis") {
        if (chartconfigobj.chartXAxis.length < 1) {
            index = index + 1;
        }
        else {
            index = chartconfigobj.chartYAxises.findIndex(x => x.label === seriesname);
            index = getsortingcolumnindex(index);
            chartconfigobj.TableSortedColumn = seriesname;

        }

    }
    else {
        chartconfigobj.TableSortedColumn = chartconfigobj.chartXAxis;
    }

    if (filteredData.length > 0) {
        var filtereddatavalue = filteredData[0][seriesname];
        if (!isNaN(filtereddatavalue)) {
            type = 'number';
        }
        else {
            if (ids[1] == "Xaxis") {
                if ((filtereddatavalue != undefined && filtereddatavalue.toString().indexOf("/") > -1 || filtereddatavalue != undefined && filtereddatavalue.toString().indexOf("-") > -1)
                    && filtereddatavalue.toString().indexOf(":") > -1
                    && filtereddatavalue.toString().length < 20) {
                    type = "date"
                }
                var calculatedDateField = cDateFields.find(x => x.name == chartconfigobj.chartXAxis);
                if (calculatedDateField != undefined && calculatedDateField != null) {
                    if (calculatedDateField.format == "Weekday") {
                        type = "Weekday";
                    }
                    if (calculatedDateField.format == "Month") {
                        type = "Month";
                    }
                    if (calculatedDateField.format == "Week") {
                        type = "Week";
                    }
                }


            }
            else {
                type = "number"
            }

        }

    }

    var isThis = false;
    if ($('#' + id).hasClass("sort-byAfter") || $('#' + id).hasClass("sort-byBefore")) {
        isThis = true;
    }
    /*   if ($('#' + id).hasClass("sort-by") || $('#' + id).hasClass("sort-byAfter")) {*/
    if (isThis = false || $('#' + id).hasClass("sort-byAfter")) {
        if (SortTable == true) {
            $('#' + tblId + ' tr th a.sortdata').removeClass('sort-byBefore');
            $('#' + tblId + ' tr th a.sortdata').removeClass('sort-byAfter');
            $('#' + tblId + ' tr th a.sortdata').removeClass('sort-by');
            $('#' + tblId + ' tr th a.sortdata').addClass('sort-by');
            $('#' + id).removeClass();
            $('#' + id).addClass('sortdata');


            $('#' + id).addClass('sort-byBefore');

            chartconfigobj.TableSortedColumnClass = 'sort-byBefore';
            sortTable(index, type, tblId, isThis, 'ASC', chartconfigobj);
        }
        else {
            sortTable(index, type, tblId, isThis, 'DESC', chartconfigobj);
        }

    } else {
        if (SortTable == true) {
            //  $('#' + tblId + ' tr th a.sortdata').removeClass();
            $('#' + tblId + ' tr th a.sortdata').removeClass('sort-byAfter');
            $('#' + tblId + ' tr th a.sortdata').removeClass('sort-byBefore');
            $('#' + tblId + ' tr th a.sortdata').removeClass('sort-by');
            $('#' + tblId + ' tr th a.sortdata').addClass('sort-by');
            //$('#' + id + ' a').removeClass();

            $('#' + id).removeClass();
            $('#' + id).addClass('sortdata');

            $('#' + id).addClass('sort-byAfter');
            // $('#' + id).addClass('sort-byBefore');
            chartconfigobj.TableSortedColumnClass = 'sort-byAfter';
            sortTable(index, type, tblId, isThis, 'DESC', chartconfigobj);
        }
        else {
            sortTable(index, type, tblId, isThis, 'ASC', chartconfigobj);
        }


    }
    settablestyle(chartconfigobj);
}
function settablestyle(chartconfigobj) {
    //setTimeout(function () {
    var chartid = chartconfigobj.chartId;
    var randomchartid = getrandomchartidusingid(chartid);
    $("#anc_" + randomchartid).addClass("d-none");

    if (chartconfigobj.TableChartStyle == "tblStyle1") {
        $("#tablediv" + chartid).addClass("tablestyle1");
        $("#tablediv" + chartid).removeClass("tablestyle2");
        $("#tablediv" + chartid).removeClass("tablestyle3");
        $("#table" + chartid + " thead th").css({
            "background-color": "#c6cbd6",//"darkgray",//chartconfigobj.TableChartRowColour,
            "color": "black",
            "border": "none",
        });
        $("#table" + chartid + " tbody tr").css("background-color", "white");

        var trs = $("#table" + chartid + " tbody tr");
        $.each(trs, function (i, tr) {
            var idd = i % 2;
            if (idd != 0)
                $("#" + tr.id).css("background-color", chartconfigobj.TableChartRowColour);

        });
        $("#table" + chartid + " tr td").css({
            //"border": "0px solid darkgray",
            "border": "none",
        });
        $("#table" + chartid + " tfoot tr th").css({
            "background-color": "#DCDCDC",//chartconfigobj.TableChartRowColour, //"darkgray",
            // "border": "0px solid darkgray",
            "border": "none",
        });
        $("#table" + chartid + " tfoot").css({
            // "border": "0px solid darkgray",
            "border": "none",
            //    "background-color": "white",
        });
        //  $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
        $("#table" + chartid + " tr th a").css("color", "black");
        $(".tableremoveicon").css("color", "white");
        $(".notmojood").css("color", "white");
        $(".notmojood").css("background-color", "red");
    }
    if (chartconfigobj.TableChartStyle == "tblStyle2") {
        $("#tablediv" + chartid).addClass("tablestyle2");
        $("#tablediv" + chartid).removeClass("tablestyle1");
        $("#tablediv" + chartid).removeClass("tablestyle3");
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
            "border": "1px solid lightgray",
            "background-color": "white",// chartconfigobj.TableChartRowColour// "white",
        });
        $("#table" + chartid + " tfoot tr th").css({
            "border": "1px solid lightgray",
            "background-color": "white",//chartconfigobj.TableChartRowColour//"white",

        });
        //$("#table" + chartid + " tbody tr:nth-of-type(even)").css({
        //    "border": "1px solid lightgray"
        //});

        $("#table" + chartid + " tbody tr").css("background-color", "white");
        // $("#table" + chartid + " tbody tr:odd").css("background-color", chartconfigobj.TableChartRowColour);
        var trs = $("#table" + chartid + " tbody tr");
        $.each(trs, function (i, tr) {
            var idd = i % 2;
            if (idd != 0)
                $("#" + tr.id).css("background-color", chartconfigobj.TableChartRowColour);
        });
        // var thd = $("#table" + chartid + " tr th a");
        $("#table" + chartid + " tr th a").css("color", "black");
        $(".tableremoveicon").css("color", "white");
        $(".notmojood").css("color", "white");
        $(".notmojood").css("background-color", "red");


    }
    if (chartconfigobj.TableChartStyle == "tblStyle3") {
        $("#tablediv" + chartid).addClass("tablestyle3");
        $("#tablediv" + chartid).removeClass("tablestyle1");
        $("#tablediv" + chartid).removeClass("tablestyle2");
        $("#table" + chartid + " thead th").css({
            "background-color": chartconfigobj.TableChartRowColour,
            "border": "1px solid lightgray",
            "color": "white"
        });
        $("#table" + chartid + " tr td").css({
            "border": "1px solid" + chartconfigobj.TableChartRowColour
        });
        $("#table" + chartid + " tfoot").css({
            "background-color": "white",//chartconfigobj.TableChartRowColour,
            "border": "1px solid" + chartconfigobj.TableChartRowColour,
            "color": "white"
        });
        $("#table" + chartid + " tfoot tr th").css({
            "background-color": "white",//chartconfigobj.TableChartRowColour,
            "border": "1px solid" + chartconfigobj.TableChartRowColour,
            "color": "white"
        });
        $("#table" + chartid + " tr th a").css("color", "white");
        $("#table" + chartid + " tbody tr:odd").css("background-color", "white");
        $(".notmojood").css("color", "white");
        $(".notmojood").css("background-color", "red");
    }
    //}, 100);
}
function calladdremoveclassesfunction(element) {
    var id = element.id;
    AddRemoveClasses(id, true);
}

function getsortingcolumnindex(index) {
    if (index == 0) {
        return 3;
    }
    if (index == 1) {
        return 5;
    }
    if (index == 2) {
        return 7;
    }
    if (index == 3) {
        return 9;
    }
    if (index == 4) {
        return 11;
    }
    if (index == 5) {
        return 13;
    }
    if (index == 6) {
        return 15;
    }
    if (index == 7) {
        return 17;
    }
    if (index == 8) {
        return 19;
    }
    if (index == 9) {
        return 21;
    }
    if (index == 10) {
        return 23;
    }
    if (index == 11) {
        return 25;
    }
    if (index == 12) {
        return 27;
    }
}






function gettablefordownload(chartconfigobj, downloadforhtmlpng) {
    //debugger;
    var chartid = chartconfigobj.chartId;
    var randomchartid = getrandomchartidusingid(chartid);

    var trs = $("#table" + chartid);
    var trsbody = $("#table" + chartid + " tbody");

    var trsfooter = $("#table" + chartid + " tfoot");
    var thead = "";

    let nineWalaFont = 9 + chartsLabelsFontFactor;

    var footerHtml = trsfooter[0].innerHTML;
    if (downloadforhtmlpng != true) {
        if (footerHtml.indexOf(`font-size:12px`) > -1) {
            footerHtml = footerHtml.replaceAll(`font-size:12px`, `font-size:${nineWalaFont}px`)
        }
    }

    var trsbodyhtml = trsbody[0].innerHTML;
    //if (chartconfigobj.TableLocked) {
    //    trsbodyhtml = "";
    //    debugger;
    //    var tableRows = $("#table" + chartid + " tbody tr");
    //    for (var i = 0; i < tableRows.length; i++) {
    //        if (i < parseInt(chartconfigobj.TableLockedRows)) {
    //            trsbodyhtml = trsbodyhtml + tableRows[i].outerHTML;
    //        }

    //    }

    //}
    if (trsbodyhtml.indexOf(`height:17;background-color:transparent`) > -1) {
        trsbodyhtml = trsbodyhtml.replaceAll(`height:17;background-color:transparent`, `height:${tblBarHeight};background-color:transparent`)
    }
    var styledata = "display: block;margin-top:50px";
    /* var styledata = "display: block;";*/

    // alert(maximumvalue);
    var tablestyleononecolumn = "";
    if (chartconfigobj.chartXAxis.length > 0 && chartconfigobj.chartYAxises.length < 1 || chartconfigobj.chartXAxis.length == 0 && chartconfigobj.chartYAxises.length > 0) {
        tablestyleononecolumn = "text-align:center;";
    }
    var headercolour = "rgb(198, 203, 214)";
    var headertextcolor = "Black";
    if (chartconfigobj.TableChartStyle == "tblStyle2") {
        headercolour = "white";
    }
    if (chartconfigobj.TableChartStyle == "tblStyle3") {
        headercolour = chartconfigobj.TableChartRowColour;
        headertextcolor = "white";
    }
    if (downloadforhtmlpng != true) {
        if (chartconfigobj.chartXAxis.length > 0) {
            thead = thead + "<th class='fixedtablehead' font-weight:400 style='font-size:" + nineWalaFont + "px;color:" + headertextcolor + "'>" + chartconfigobj.chartXAxis + "</th>";
        }
        for (var i = 0; i < chartconfigobj.chartYAxises.length; i++) {
            thead = thead + "<th class='fixedtablehead' font-weight:400 style='font-size:" + nineWalaFont + "px;color:" + headertextcolor + "' >" + chartconfigobj.chartYAxises[i].label + "</th>";
        }
    }
    else {
        if (chartconfigobj.chartXAxis.length > 0) {
            thead = thead + "<th class='fixedtablehead'  style='color:" + headertextcolor + "'>" + chartconfigobj.chartXAxis + "</th>";
        }
        for (var i = 0; i < chartconfigobj.chartYAxises.length; i++) {
            thead = thead + "<th class='fixedtablehead'  style='color:" + headertextcolor + "' >" + chartconfigobj.chartYAxises[i].label + "</th>";
        }
    }


    var tablestyle = "max-width:620px;margin:auto";
    var totallength = chartconfigobj.chartYAxises.length;
    if (chartconfigobj.chartXAxis.length > 0) {
        totallength = totallength + 1;
    }

    if (totallength > 5) {
        tablestyle = "";
    }
    //   return "<div style='" + styledata + "' class='tableFixHead tableDownload'><table class='table table-striped' style='font-size:9px;color:black;word-wrap: break-word;" + tablestyleononecolumn + "' id=table" + chartid + "><thead style='color:" + headertextcolor + ";background-color:" + headercolour + "'>" + thead + "</thead>" + trsbody[0].innerHTML + "" + footerHtml + "</table></div>"
    if (downloadforhtmlpng != true) {
        return "<div style='" + styledata + "' class='tableFixHead tableDownload'><table class='table table-striped' style='font-size:" + nineWalaFont + "px;color:black;word-wrap: break-word;" + tablestyle + ";" + tablestyleononecolumn + "' id=table" + chartid + "><thead style='color:" + headertextcolor + ";background-color:" + headercolour + "'>" + thead + "</thead>" + trsbodyhtml + "" + footerHtml + "</table></div>"
    }
    else {
        return "<div style='" + styledata + "' class='tableFixHead tableDownload'><table class='table table-striped' style='font-size:11px;color:black;word-wrap: break-word;" + tablestyle + ";" + tablestyleononecolumn + "margin-bottom:30px;' id=table" + chartid + "><thead style='color:" + headertextcolor + ";background-color:" + headercolour + "'>" + thead + "</thead>" + trsbodyhtml + "" + footerHtml + "</table></div>"
    }
}