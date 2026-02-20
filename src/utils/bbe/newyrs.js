import { JSDate } from "./moonphase";
import { find_newmoon } from "./moonphase";
import { Animal, attrib_day, attrib_year, Element8, jd2g, new_year_jd, Numbern } from "./zurhai.js";

// var flg = 0;
// var fst = 3;
// var fs = 3;
// var fsg = 1;
// var bg = "white";
// var mbg = 'FFE0FF';
// var col = ["red", "blue"];
// var bgcol = ['FFFFCC', 'CCFFFF'];
// var mmn = ["хаврын тэргүүн", "хаврын дунд", "хаврын сүүл", "зуны эхэн", "зуны дунд", "зуны сүүл", "намрын эхэн", "намрын дунд", "намрын сүүл", "өвлийн эхэн", "өвлийн дунд", "өвлийн сүүл"];
var Dlong = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
// var Seas = ["хавар", "зун", "намар", "өвөл"];
var Roman12 = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function possessive_form(n) {
    var m = n % 10;
    if (m == 1 || m == 4 || m == 9) return n + "-ний"; else return n + "-ны";
}

export function newyrs(y1, y2) {
    var ss = "<TABLE class='table table-bordered table-hover table-striped'><thead><TR class='text-center'><th><b>жаран</b></th>";
    ss += "<th><b>жил</b></th>";
    ss += "<th><b>жилийн мэнгэ</b></th>";
    ss += "<th><b>он гарах өдөр</b></th>";
    ss += "<th><b>өдрийн өнгө</b></th>";
    ss += "<th><b>өдрийн мэнгэ</b></th>";
    ss += "<th><b>суудал</b></th>";
    ss += "<th><b>битүүний сар</b></th>";
    //ss+="<th><b>шинийн сар</b></th>";
    ss += "</TR></thead><tbody>";

    var att = {};
    var a = {};
    var g = {};
    var bb = 0;

    for (var y = y1; y <= y2; ++y) {
        var j = new_year_jd(y);
        jd2g(j, g);
        attrib_year(y, att);
        attrib_day(j, a);
        var jnew = find_newmoon(j - 3, j + 3, 0);
        var sd = JSDate(jnew + 8 / 24);
        // var j1 = find_newmoon(j - 3, j + 3, 1.0 / 30);
        // var sd1 = JSDate(j1 + 8 / 24);

        ss += "<TR>"; bb = 1 - bb;
        ss += "<TD ALIGN=CENTER>" + att.cycle + "</TD>";
        ss += "<TD ALIGN=CENTER>" + att.elcor + " " + att.animal + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Numbern[att.number - 1] + " " + att.colour9 + "</TD>";
        ss += "<TD ALIGN=CENTER>" + y + "/" + Roman12[g.month - 1] + "/" + ((g.day < 10) ? "0" : "") + g.day + "&nbsp;&nbsp;&nbsp;" + Dlong[a.day] + "</TD>";
        ss += "<TD ALIGN=CENTER>" + a.elcor + " " + Animal[a.animal - 1] + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Numbern[a.number - 1] + " " + a.colour9 + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Element8[a.trigram - 1] + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
        ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "ц " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "м</TD>";
        //ss+="<TD ALIGN=CENTER>"+Roman12[sd1.getUTCMonth()]+"/"+((sd1.getUTCDate()<=9)?"0":"")+sd1.getUTCDate();
        //ss+=" - "+((sd1.getUTCHours()<=9)?"0":"")+sd1.getUTCHours()+"ц "+((sd1.getUTCMinutes()<=9)?"0":"")+sd1.getUTCMinutes()+"м</TD>";
        ss += "</TR>";
    }
    ss += "</tbody></TABLE>"
    return ss;
}
