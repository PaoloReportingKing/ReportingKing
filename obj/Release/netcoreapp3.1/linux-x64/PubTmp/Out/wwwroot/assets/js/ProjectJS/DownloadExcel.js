
downloadChartsAsSpreadSheet = function () {
    try {

        if (chartsconfigurations.length == 0) {
            return;
        }
        loading_start(0, 0, DownLoadExcelMessage);
        var customchartsconfigurations = chartsconfigurations.filter(x => x.chartType !== 'number_chart' && x.chartType !== 'comments_chart');
        var model = {
            columnNames: columnNames,
            /* filteredData: filteredData,*/
            chartsconfigurations: customchartsconfigurations,
            fileName: ""
        }
        customchartsconfigurations.forEach(function (e, i) {
            try {
                let chart__id = getrandomchartidusingid(e.chartId);
                let row__id = $(`#chart_div_${chart__id}`).parent()[0].id.replace('charts_data_', '');

                var randomchartid = '';
                if (comments_for_row.indexOf(row__id) > -1) {
                    randomchartid = row__id;
                }
                else {
                    randomchartid = chart__id;
                }

                var comment = $("#comments_text_" + randomchartid).summernote("code").replace(/<\/p>/gi, " ")
                    .replace(/<br\/?>/gi, " ")
                    .replace(/<\/?[^>]+(>|$)/g, "");;
                e.comments = comment;
            } catch (err) {

            }
            e.yaxisData = [];
            var xAxisCount = 0;
            var excellabelcount = 0;

            e.chartXAxisLabels.forEach(function (val, index) {
                if (e.TableLocked && index >= e.TableLockedRows - 1) {
                    if (excellabelcount == 0) {
                        excellabelcount = index+1;
                    }
                  
                }
                else {
                    e.chartXAxisLabels[xAxisCount] = val.toString();
                }
                //e.chartXAxisLabels[xAxisCount] = val.toString();
                xAxisCount++;
            })
            if (e.TableLocked) {
                var spliceitems = (e.chartXAxisLabels.length - excellabelcount);
                e.chartXAxisLabels.splice(excellabelcount, spliceitems);//
            }
            if (e.chartType == "number_chart") {

                e.chartSeries.forEach(function (e2, i2) {
                    var obj = {
                        name: e.chartYAxises[i2].label,
                        data: []
                    };
                    obj.data.push(e2.toString());
                    e.yaxisData.push(obj)
                })

            }
            else if (e.chartType == "pie_chart") {

                var obj = {
                    name: e.chartYAxises[0].label,
                    data: []
                };

                e.chartSeries.forEach(function (e2, i2) {
                    obj.data.push(e2.toString());
                })
                e.yaxisData.push(obj)
                /* e.chartSeries = e.yaxisData*/
            }
            else {
                if (e.chartType == "table_chart") {
                    //readTableData(e.chartId.replace('chart_', 'tablechart_'));
                    var indexfind = e.chartXAxisLabels.findIndex(x => x == 'Totals: ');
                    if (indexfind == -1) {
                        e.chartXAxisLabels.push('Totals: ')
                    }

                    //e.chartSeries.forEach(function (e2, i2) {
                    //    var total = 0;
                    //    e2.data.forEach(function (val, i) {

                    //        total = total + val;

                    //    });
                    //    e2.data.push(total)
                    //});
                }
                e.chartSeries.forEach(function (e2, i2) {

                    var obj = {
                        name: e2.name,
                        data: []
                    }

                    if (e.chartType == "table_chart") {
                        e2.data.forEach(function (val, i) {
                            if (e2.StringType) {
                                obj.data.push(val.toString());
                            }
                            else {
                                let formattedVal = ApplyFormatting(val, e2.name);
                                obj.data.push(formattedVal);
                            }
                        })
                    }
                    else {
                        e2.data.forEach(function (val, i) {
                            obj.data.push(val.toString());
                        })
                    }

                    e.yaxisData.push(obj)

                });
            }
            //}
        })

        console.log(JSON.stringify(model))
        var settings = {
            "url": location.origin + "/api/export/excel",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            "data": JSON.stringify(model),
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            var element = document.createElement('a');
            element.setAttribute('href', response.downloadLink);
            element.setAttribute('download', new Date() + '_charts.xlsx' /*response.fileName*/);

            // Above code is equivalent to
            // <a href="path of file" download="file name">

            document.body.appendChild(element);
            loading_end();
            //onClick property
            element.click();

            document.body.removeChild(element);
            /* window.location.href = response.downloadLink*/
        }).fail(function (jqXHR, textStatus) {
            loading_end();
            popupShow('Error occured while generating excel file!', 'error');
        })
    } catch (err) {
        loading_end();
        popupShow('Error occured while generating excel file!', 'error');
    }
}

//function readTableData(id) {
//    var myTab = document.getElementById(id);
//    var wholeValues = [];

//    for (i = 1; i < myTab.rows.length; i++) {
//        var objCells = myTab.rows.item(i).cells;

//        var colValues = [];
//        for (var j = 0; j < objCells.length; j++) {
//            colValues.push(objCells[j].innerHTML);
//        }
//        wholeValues.push(colValues);
//    }
//}