charset = "utf-8";
window.onload = function () {

    initChart();
    getData();
    showData();
};
var dayers = ['20170906', '20170909', '20170912', '20170915', '20170918'];
var myDate = ['2017/09/06', '2017/09/09', '2017/09/12', '2017/09/15', '2017/09/18'];
var myChart;
var orgList = [""];
var trans = new Array();
var dataGet = [];
var dateList = [];
var LastDate = [];

function initChart() { //初始化图表

    myChart = echarts.init(document.getElementById('main'));
    // console.log("orgList", orgList);
    options = {

        title: {
            text: '',
            link: 'https://github.com/pissang/echarts-next/graphs/punch-card'
        },
        legend: {
            x: 'center',
            data: ['交易情况'],
            left: 'center',
            textStyle: {
                fontSize: 25 // 让字体变大
            }
        },
        tooltip: {},
        grid: {
            left: 2,
            bottom: 10,
            right: 10,
            containLabel: true
        },
        xAxis: {
            axisLabel: {
                margin: 45,
                textStyle: {
                    fontSize: 25 // 让字体变大
                }
            },
            type: 'category',
            data: orgList,
            scale: false,
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 2,
                    type: 'solid'


                }
            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: '#48b',
                    width: 2,
                    type: 'solid'

                }
            }
        },
        yAxis: {
            type: 'value',
            scale: false,
            splitLine: {
                <!-- 去掉网格线 -->
                show: false,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 2,
                    type: 'solid'


                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#48b',
                    type: 'dashed'
                }

            }

        },
        series: [
            {
                name: '交易情况',
                type: 'scatter',
                center: [50, 10],
                symbolSize: function (val) {
                    return val[2] * 4.2;
                },
                data: [],
                animationDelay: function (idx) {
                    return idx * 5;
                }
            }
        ]
    };
    myChart.setOption(options);
}


// function getJsonLength(jsonData){
//
//     var jsonLength = 0;
//
//     for(var item in jsonData){
//         jsonLength++;
//
//     }
//
//     return jsonLength;
//
// }


function getData() {  //获取数据
    search = {};
    search["userid"] = "userid1";
    $.ajax({
        type: "POST",
        contentType: "application/json",
        async: false,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行） true：异步，false：同步。
        url: "/blockchain/transaction/getTransactionByUserID",
        data: JSON.stringify(search),//自定义查询字段
        dataType: 'json',
        cache: false,
        timeout: 60000000,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                trans[i] = data[i].Record;
                console.log(trans[i]);
            }
        },
        error: function (e) {

            console.log("ERROR : ", e);

        }
    });

}

function showData() {
    // var dataGet = [];

    for (var i = 0; i < trans.length; i++) {
        if (orgList.indexOf(trans[i].organizationid) == -1) {
            orgList.push(trans[i].organizationid);
        }
    }
    orgList.push("");

    for (var i = 0; i < 5; i++) {

        // var date = trans[i].transactiondate;
        // dateList[i]= timeConverter(date);
        // console.log("date",timeConverter(date));
        // myDate[i]=shiftDate(dateList[i]);
        //  console.log("hhh",shiftDate(dateList[i]));
        LastDate[i] = shiftDate(myDate[i]);


        var column = orgList.indexOf(trans[i].organizationid);
        var size = trans[i].amount * trans[i].price;
        if (size > 10) {
            size = 10;
        }
        var index = i;
        var tran = [LastDate[i], column, 5, index];
        dataGet.push(tran);
    }

    dataGet = dataGet.map(function (item) {
        return [item[1], item[0], item[2], item[3]];
    });
    console.log(orgList);
    // console.log("baba is son's father", MydataGet);

    myChart = echarts.init(document.getElementById('main'));
    options = {
        tooltip: {
            position: 'top',
            formatter: function (params) {
                var index = params.data[3];
                // var formattime = timeConverter(trans[index].transactiondate);
                //  console.log("formattime", formattime);
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'

                    + '</div>'
                    + 'transactionid' + ':' + trans[index].transactionid + '<br>'
                    + 'transactiondate' + '：' + trans[index].transactiondate + '<br>'
                    + 'Amout' + ':' + trans[index].amount + '<br>'
                    + 'Price' + ':' + trans[index].price + '<br>';

                // return res;
            }
        },
        xAxis: {
            axisLabel: {
                margin: 45,
                textStyle: {
                    fontSize: 25 // 让字体变大
                }
            },
            type: 'category',
            data: orgList,
            scale: false,
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e5e5',
                    width: 2,
                    type: 'solid'


                }
            },
            axisLine: {
                show: true,
                onZero: false,
                lineStyle: {
                    color: '#48b',
                    width: 2,
                    type: 'solid'

                }
            }
        },
        yAxis: {
            data: 'value',
            axisLine: {
                show: true
            },
            axisLabel: {
                formatter: function (value, index) {
                    var texts;
                    for (var i = 0; i < index; i++) {

                        // var a = myDate[i].substring(0, 4);
                        // var b = myDate[i].substring(4, 6);
                        // var c = myDate[i].substring(6);
                        // texts = myDate[i]//a+'/'+b+'/'+c;


                        //texts = myDate[i]//a+'/'+b+'/'+c;
                    }
                    return texts;


                }
            }
        },
        series: [{
            name: '交易情况',
            type: 'scatter',

            center: [50, 10],
            symbolSize: function (val) {
                return val[2] * 4.2;
            },
            //  data: [],
            data: dataGet,
            animationDelay: function (idx) {
                return idx * 5;
            }
        }]
    };
    myChart.setOption(options);
}

//将时间类型转换成数字形式
function shiftDate(my) {
    //  var date1= '2017/09/01 00:00:00';  //开始时间
    // var date1 = dateList[0];
    var date1 = myDate[0];   //因为传输来的数据是最新的几条数据是按时间进行排列的
    var date3 = new Date(my).getTime() - new Date(date1).getTime();   //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var orgList = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);       //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var ggg = days + orgList / 24 + minutes / 60 + seconds / 3600;
    return ggg;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + month + date + hour + min + sec;
    return time;
}

