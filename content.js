"use strict";
var Selector = a => document.querySelector(a);
var SelectorAll = b => document.querySelectorAll(b);
var newEle = c => document.createElement(c);
var hrefIndex = d => window.location.href.indexOf(d);
var ls = localStorage;
var lsSet = (e, f) => localStorage.setItem(e, f);
var lsGet = g => localStorage.getItem(g);
var lsRem = h => localStorage.removeItem(h);
var sIn = (i, j) => setInterval(i, j);
var cIn = k => clearInterval(k);
var xmlR = new XMLHttpRequest();
xmlR.open("GET", "https://soaibhaque.github.io/train.github.io/keys.txt", false);
xmlR.onreadystatechange = function () {
    if (xmlR.readyState === 4) {
        var allText = xmlR.responseText;
        thisis(allText)
    }
}
xmlR.send(null)
window.addEventListener("load", () => {
    if (lsGet("KEYS") !== null) {
        Selector("input").value = lsGet("KEYS");
    }
})

function thisis(is) {
    var mykeys = JSON.parse(is);
    var getKey = sIn(() => {
        if (mykeys.indexOf(Selector("input").value) > -1) {
            lsSet("KEYS", Selector("input").value);
            Selector("body").style.animation = "colorchange 4s infinite"
            Selector("section").style.animation = "exittoout 1s forwards";
            Selector("span#line1").style.animation = "linesec 3s infinite";
            Selector("span#line2").style.animation = "linefir 3s infinite";
            Selector("div").style.display = "block";
            timestemp();
            cIn(getKey);
        }
    }, 30)
}

function timestemp() {
    var newDate = new Date();
    var todayDate = newDate.getDate();
    var todayMonth = newDate.getMonth() + 1;
    if (lsGet("TIME") !== null) {
        if (JSON.parse(lsGet("TIME"))[1] == 12) {
            if (JSON.parse(lsGet("TIME"))[1] < todayMonth + 12) {
                lsRem("TIME");
                lsRem("KEYS");
                location.reload();
            }
        } else if (JSON.parse(lsGet("TIME"))[0] == todayDate && JSON.parse(lsGet("TIME"))[1] < todayMonth) {
            lsRem("TIME");
            lsRem("KEYS");
            location.reload();
        }
    } else if (lsGet("TIME") == null) {
        lsSet("TIME", `[${todayDate},${todayMonth}]`)
    }
}