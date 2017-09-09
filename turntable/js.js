/**
 * Created by Yaavi on 2016/10/13.
 */
window.onload = function () {

    function urlLog() {
        var url = location.search;
        var urlJSON = new Object();

        var aKey = [];
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                urlJSON[strs[i].split("=")[0]] = strs[i].split("=")[1];
                aKey.push(strs[i].split("=")[0]);
            }
        }

        var aStr = "";
        var aValue = "链接最终输出：";
        for (var i = 0; i < aKey.length; i++) {
            aStr += "第" + (i + 1) + "个 key=" + aKey[i] + " value=" + urlJSON[aKey[i]] + "。\n";
            aValue += urlJSON[aKey[i]] + " ";
        }

        return (aStr + "\n" + aValue);

    }

    console.log(urlLog()); //输出网址后面的value。


    function $(obj) {
        return document.getElementById(obj);
    }

    function init(obj, rot, skew, bg) {
        var aLi = $(obj).getElementsByTagName("li");
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].style.transform = "rotate(" + (i * rot + 67.5) + "deg)" + skew;
            if (i % 2 == 0) {
                aLi[i].style.background = bg;
            }
        }
    }

    /*初始化大转盘*/
    var azpLi = "";
    for (var i = 0; i < 8; i++) {
        azpLi += "<li><p><span>" + (i + 1) + "</span></p></li>";
    }
    $("pie").innerHTML = azpLi;
    init("pie", 45, "skew(45deg)", "#feb8b8");

    /*初始化周围的点*/
    var strLi = "";
    for (var i = 0; i < 16; i++) {
        strLi += "<li></li>";
    }
    $("light").innerHTML = strLi;
    init("light", 22.5, "", "#fde494");


    var btnImg = $("start");
    var blon = true;
    btnImg.onclick = function () {
        if (!blon) {
            return false;
        }
        blon = false;
        var m = Math.ceil(Math.random() * 8); //生成1-8 随机数

        function easeOut(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;   //Tween算法-减速函数
        }

        var t = 0;
        var b = 0;
        var c = -2160 + ((1 - m) * 45); //控制转圈圈
        var d = 180;

        function Run() {
            $("pie").style.transform = "rotate(" + Math.ceil(easeOut(t, b, c, d)) + "deg)";
            if (t == d) {
                if (m % 2 == 0) {  //停在 2 4 6 8 执行函数

                    $("alertWindow").style.display = "block";
                    var fromCon = $("nr");

                    fromCon.over.onclick = function () {
                        if (fromCon.name1.value == "" || fromCon.phone.value === "") {
                            alert("信息不完整");
                        } else {
                            console.log("姓名：" + fromCon.name1.value + " " + "联系方式：" + fromCon.phone.value);

                            $("alertWindow").style.display = "none";
                        }
                    };

                }
                blon = true;
                return false;
            }
            if (t < d) {
                t++;
                setTimeout(Run, 25);
            }
        }

        Run();

    }
}
