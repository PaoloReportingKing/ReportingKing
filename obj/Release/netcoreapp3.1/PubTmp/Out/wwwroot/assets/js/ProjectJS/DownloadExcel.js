
downloadChartsAsSpreadSheet = function () {
    try {
        
        if (chartsconfigurations.length == 0) {
            return;
        }
        loading_start();
        var customchartsconfigurations = chartsconfigurations;
        var model = {
            columnNames: columnNames,
            /* filteredData: filteredData,*/
            chartsconfigurations: customchartsconfigurations,
            fileName: ""
        }
        customchartsconfigurations.forEach(function (e, i) {
            try {
                var randomchartid = getrandomchartidusingid(e.chartId);
                var comment = $("#comments_text_" + randomchartid).summernote("code").replace(/<\/p>/gi, " ")
                    .replace(/<br\/?>/gi, " ")
                    .replace(/<\/?[^>]+(>|$)/g, "");;
                e.comments = comment
            } catch (err) {

            }
            e.yaxisData = [];
            var xAxisCount = 0;
            e.chartXAxisLabels.forEach(function (val, index) {

                e.chartXAxisLabels[xAxisCount] = val.toString();
                xAxisCount++;
            })
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
                    e.chartXAxisLabels.push('Totals: ')
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


                    e2.data.forEach(function (val, i) {

                        obj.data.push(val.toString());

                    })

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