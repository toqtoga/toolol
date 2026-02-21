/* eslint-disable @typescript-eslint/no-unused-vars */
import { EPOCH, find_event, find_moon_ra, find_newmoon, JSDate, MICHID, moon_ra, moonphase_fast } from "./moonphase";
import { Animal, attrib_day, attrib_month, attrib_year, cal_type, Element8, first_day_jd, g2jdn, jd2g, julian_day, leap_month_number, leap_year, new_year_jd, next_month, Numbern, prev_month, tibetan_year } from "./zurhai";

var flg = 0;
var fst = 3;
var fs = 3;
var fsg = 1;
var bg = "white";
var mbg = 'FFE0FF';
var col = ["red", "blue"];
var bgcol = ['FFFFCC', 'CCFFFF'];
var mmn = ["С…Р°РІСЂС‹РЅ С‚СЌСЂРіТЇТЇРЅ", "С…Р°РІСЂС‹РЅ РґСѓРЅРґ", "С…Р°РІСЂС‹РЅ СЃТЇТЇР»", "Р·СѓРЅС‹ СЌС…СЌРЅ", "Р·СѓРЅС‹ РґСѓРЅРґ", "Р·СѓРЅС‹ СЃТЇТЇР»", "РЅР°РјСЂС‹РЅ СЌС…СЌРЅ", "РЅР°РјСЂС‹РЅ РґСѓРЅРґ", "РЅР°РјСЂС‹РЅ СЃТЇТЇР»", "У©РІР»РёР№РЅ СЌС…СЌРЅ", "У©РІР»РёР№РЅ РґСѓРЅРґ", "У©РІР»РёР№РЅ СЃТЇТЇР»"];
var Mmn = ["РҐР°РІСЂС‹РЅ С‚СЌСЂРіТЇТЇРЅ", "РҐР°РІСЂС‹РЅ РґСѓРЅРґ", "РҐР°РІСЂС‹РЅ СЃТЇТЇР»", "Р—СѓРЅС‹ СЌС…СЌРЅ", "Р—СѓРЅС‹ РґСѓРЅРґ", "Р—СѓРЅС‹ СЃТЇТЇР»", "РќР°РјСЂС‹РЅ СЌС…СЌРЅ", "РќР°РјСЂС‹РЅ РґСѓРЅРґ", "РќР°РјСЂС‹РЅ СЃТЇТЇР»", "УЁРІР»РёР№РЅ СЌС…СЌРЅ", "УЁРІР»РёР№РЅ РґСѓРЅРґ", "УЁРІР»РёР№РЅ СЃТЇТЇР»"];
var D = ["РќСЏ", "Р”Р°", "РњСЏ", "Р›С…", "РџТЇ", "Р‘Р°", "Р‘СЏ"];
var Dlong = ["РќСЏРј", "Р”Р°РІР°Р°", "РњСЏРіРјР°СЂ", "Р›С…Р°РіРІР°", "РџТЇСЂСЌРІ", "Р‘Р°Р°СЃР°РЅ", "Р‘СЏРјР±Р°"];
var Seas = ["С…Р°РІР°СЂ", "Р·СѓРЅ", "РЅР°РјР°СЂ", "У©РІУ©Р»"];
var Roman12 = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function possessive_form(n) {
    var m = n % 10;
    if (m == 1 || m == 4 || m == 9) return n + "-РЅРёР№"; else return n + "-РЅС‹";
}

export function year_string(Y) {
    var njd = new_year_jd(Y);
    var g = {};
    jd2g(njd, g);
    var att = {};
    attrib_year(Y, att);
    var today = new Date();
    var ddd = today.getDate();
    var mmm = today.getMonth() + 1;
    var yyy = today.getFullYear();
    var nnn = "РЅРѕ";
    if (g.year < yyy) nnn = "СЃРѕРЅ";
    else if (g.year == yyy) if (g.month < mmm) nnn = "СЃРѕРЅ";
    else if (g.month == mmm) if (g.day < ddd) nnn = "СЃРѕРЅ";
    else if (g.day == ddd) nnn = "Р¶ Р±Р°Р№РЅР°";
    var sss = "<p><ul><li>" + att.cycle + "-СЂ Р¶Р°СЂРЅС‹ " + att.year + " РѕРЅ Р±СѓСЋСѓ " + Numbern[att.number - 1] + " " + att.colour9 + " РјСЌРЅРіСЌС‚СЌР№ <b>" + att.elcor + " " + att.animalin + " Р¶РёР»РёР№РЅ</b> С†Р°РіР°Р°РЅ СЃР°СЂС‹РЅ С€РёРЅРёР№РЅ РЅСЌРіСЌРЅ <b>" + Y + " РѕРЅС‹ " + g.month + " СЃР°СЂС‹РЅ " + possessive_form(g.day) + " " + Dlong[(njd + 1) % 7] + "</b> РіР°СЂР°РіС‚ Р±РѕР»" + nnn + ".</li>";
    if (leap_year(Y)) { sss += "<li>Р­РЅСЌ Р¶РёР»РёР№РЅ " + Seas[Math.floor((leap_month_number(Y) - 1) / 3)] + " <i>РёР»ТЇТЇ СЃР°СЂС‚Р°Р№</i>.</li>" }
    else { sss += "<li>Р­РЅСЌ РЅСЊ РµСЂРґРёР№РЅ (РёР»ТЇТЇ СЃР°СЂРіТЇР№) Р¶РёР» С‚СѓР» 12 СЃР°СЂС‚Р°Р№.</li>" }
    //sss+="<p>Р–РёР»РёР№РЅ РјСЌРЅРіСЌ РЅСЊ "+att.number+" "+att.colour9+".";
    if (cal_type != 2) sss += "<li>Р­РЅСЌ Р¶РёР» РўУ©РІРґРёР№РЅ " + tibetan_year(Y) + " РѕРЅРґ С…Р°СЂРіР°Р»Р·Р°РЅР°.<li>";
    sss += "<li>'Р‘РёР»РіРёР№РЅ Р¶РёР»РёР№РЅ РґСѓРіР°Р°СЂ' РіСЌРґРіСЌСЌСЂ С‚СѓС…Р°Р№РЅ Р±РёР»РіРёР№РЅ Р¶РёР»РёР№РЅ РёС…СЌРЅС… РЅСЊ Р±Р°РіС‚РґР°Рі Р°СЂРіС‹РЅ Р¶РёР»РёР№РЅ РґСѓРіР°Р°СЂС‹Рі РѕР№Р»РіРѕРЅРѕ. Р–РёС€СЌСЌР»Р±СЌР», Р°СЂРіС‹РЅ 2016 РѕРЅС‹ 1-СЂ СЃР°СЂ Р±ТЇС…Р»СЌСЌСЂСЌСЌ Р±РёР»РіРёР№РЅ 2015 РґСѓРіР°Р°СЂС‚Р°Р№ Р¶РёР»Рґ С…Р°РјР°Р°СЂРЅР°.</li></ul>";
    return sss;
}

export function month(Y, M, L) {
    var att = {};
    attrib_year(Y, att);
    var attm = {};
    attrib_month(Y, M, attm);
    var ss = "<h3>" + att.cycle + "-СЂ Р¶Р°СЂРЅС‹ " + att.elcor + " " + att.animalin + " Р¶РёР»РёР№РЅ "
        + mmn[M - 1] + " " + (L ? " РёР»ТЇТЇ " : " ") + "СЃР°СЂ<br/>("
        + Numbern[attm.number - 1] + " " + attm.colour9 + " РјСЌРЅРіСЌС‚СЌР№, " + attm.elcor + " " + attm.animal + " СЃР°СЂ)</h3>"
    var j1 = first_day_jd(Y, M, L);

    var jj = julian_day(Y, M, L, 30);

    var jm1 = find_moon_ra(j1 - 1, jj, MICHID.RAR);
    var jm2 = find_moon_ra(jj - 5, jj + 1, MICHID.RAR);
    var mich2 = true;
    if (jm2 < -EPOCH.JD) mich2 = false;
    if (Math.abs(jm1 - jm2) < 25) mich2 = false; //-EPOCH.JD
    ss += "<p>";
    var jnew = find_newmoon(j1 - 3, j1 + 3, 0);
    var sd = JSDate(jnew);
    ss += "&nbsp;&nbsp;&#x1F311;&nbsp;СЃР°СЂР°РЅ С€РёРЅСЌС‡Р»СЌРіРґСЌС… РјУ©С‡ ";
    ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
    ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
    sd = JSDate(jnew + 8 / 24);
    ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
    ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    jj = julian_day(Y, M, L, 7);
    jnew = find_event(jj - 3, jj + 3, 0.25);
    sd = JSDate(jnew);
    ss += "&nbsp;&nbsp;&#x1F313;&nbsp;С‚Р°Р» СЃР°СЂР°РЅ РіР°СЂР°С… РјУ©С‡ ";
    ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
    ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
    sd = JSDate(jnew + 8 / 24);
    ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
    ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    jj = julian_day(Y, M, L, 15);
    jnew = find_event(jj - 3, jj + 3, 0.5);
    sd = JSDate(jnew);
    ss += "&nbsp;&nbsp;&#x1F315;&nbsp;С‚СЌСЂРіСЌР» СЃР°СЂР°РЅ РіР°СЂР°С… РјУ©С‡ ";
    ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
    ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
    sd = JSDate(jnew + 8 / 24);
    ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
    ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    jj = julian_day(Y, M, L, 22);
    jnew = find_event(jj - 3, jj + 3, 0.75);
    sd = JSDate(jnew);
    ss += "&nbsp;&nbsp;&#x1F317;&nbsp;С‚Р°Р» СЃР°СЂР°РЅ РіР°СЂР°С… РјУ©С‡ ";
    ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
    ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
    sd = JSDate(jnew + 8 / 24);
    ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
    ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    jj = julian_day(Y, M, L, 30);
    jnew = find_newmoon(jj - 3, jj + 3, 0);
    sd = JSDate(jnew);
    ss += "&nbsp;&nbsp;&#x1F311;&nbsp;СЃР°СЂР°РЅ С€РёРЅСЌС‡Р»СЌРіРґСЌС… РјУ©С‡ ";
    ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
    ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
    sd = JSDate(jnew + 8 / 24);
    ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
    ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    sd = JSDate(jm1);
    ss += "&nbsp;&nbsp;&#x2728;&nbsp;РјРёС‡РёРґ С‚РѕС…РёРѕС… РјУ©С‡ ";
    ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
    ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
    sd = JSDate(jm1 + 8 / 24);
    ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
    ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    if (mich2) {
        sd = JSDate(jm2);
        ss += "&nbsp;&nbsp;&#x2728;&nbsp;РґР°СЂР°Р°РіРёР№РЅ РјРёС‡РёРґ С‚РѕС…РёРѕС… РјУ©С‡ ";
        ss += Roman12[sd.getMonth()] + "/" + ((sd.getDate() <= 9) ? "0" : "") + possessive_form(sd.getDate()) + " У©РґСЂРёР№РЅ ";
        ss += ((sd.getHours() <= 9) ? "0" : "") + sd.getHours() + "С† " + ((sd.getMinutes() <= 9) ? "0" : "") + sd.getMinutes() + "Рј РѕСЂС‡РёРјРґ";
        sd = JSDate(jm2 + 8 / 24);
        ss += " (РЈР‘ У©РІР»РёР№РЅ С†Р°РіР°Р°СЂ " + Roman12[sd.getUTCMonth()] + "/" + ((sd.getUTCDate() <= 9) ? "0" : "") + sd.getUTCDate();
        ss += " - " + ((sd.getUTCHours() <= 9) ? "0" : "") + sd.getUTCHours() + "С† " + ((sd.getUTCMinutes() <= 9) ? "0" : "") + sd.getUTCMinutes() + "Рј)<br/>";
    }
    ss += "</p>";
    var g = {};
    jd2g(j1, g);
    var dy = g.day;
    var mo = g.month;
    var yr = g.year;
    var d = "312831303130313130313031";
    var leap = false;
    if (yr / 4 == Math.floor(yr / 4)) leap = true;
    if (yr / 100 == Math.floor(yr / 100)) leap = false;
    if (yr / 400 == Math.floor(yr / 400)) leap = true;
    if (leap) d = "312931303130313130313031";
    var ld = eval(d.substring(mo * 2 - 2, mo * 2));

    var today = new Date();
    var ddd = today.getDate();
    var mmm = today.getMonth() + 1;
    var yyy = today.getFullYear();
    var jjj = g2jdn(yyy, mmm, ddd);
    ss += "<TABLE class='table table-bordered table-hover table-striped'><thead><TR><th class='text-center'>У©РґУ©СЂ</th>";
    ss += "<th class='text-center'>У©РЅРіУ©</th>";
    ss += "<th class='text-center'>РіР°СЂР°Рі</th>";
    ss += "<th class='text-center'>Р°СЂРіС‹РЅ С‚РѕРѕР»Р»РѕРѕСЂ</th>";
    ss += "<th class='text-center'>РјСЌРЅРіСЌ</th>";
    ss += "<th class='text-center'>СЃСѓСѓРґР°Р»</th>";
    ss += "<th class='text-center'>СЃР°СЂРЅС‹ У©РЅС†У©Рі</th>";
    ss += "<th class='text-center'>РґТЇТЇСЂСЌР»С‚</th>";
    ss += "<th class='text-center'>С†СЌС… РјР°РЅРґР°Р»</th></TR></thead><tbody>";

    var a = {};
    var bb = 0;
    var ctr = 1;
    var dd = 1;
    var j = 0;
    var jd = j1;
    j1--;

    while (dd <= 30) {
        j = julian_day(Y, M, L, dd);
        if (j1 == j) { dd++; continue; }
        else if (j == j1 + 1) { j1 = j; ctr = dd; dd++; }
        else { j1 = j - 1; ctr = dd; }
        var p = moonphase_fast(j - 2451545 - 1 / 3);
        var ra = moon_ra(j - 2451545 - 1 / 3);
        attrib_day(jd, a);
        var sa = "";
        var sb = "";
        if (jd == jjj) { sa = "<b><FONT COLOR='blue'>"; sb = "</FONT></b>"; }
        ss += "<TR>"; bb = 1 - bb;
        ss += "<TD ALIGN=CENTER>" + sa + ctr + sb + "</TD>";
        ss += "<TD ALIGN=CENTER>" + a.elcor + " " + Animal[a.animal - 1] + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Dlong[a.day] + "</TD>";
        ss += "<TD ALIGN=CENTER>" + sa + yr + "." + ((mo < 10) ? "0" : "") + mo + "." + ((dy < 10) ? "0" : "") + dy + sb + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Numbern[a.number - 1] + " " + a.colour9 + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Element8[a.trigram - 1] + "</TD>";
        ss += "<TD ALIGN=CENTER>" + Math.round((0.5 - Math.abs(p - 0.5)) * 360) + "&deg;</TD>";
        ss += "<TD ALIGN=CENTER>" + Math.round((1 - Math.cos(p * Math.PI * 2)) * 5000) / 100 + "%</TD>";
        ss += "<TD ALIGN=CENTER>" + Math.round(ra * 360) + "&deg;</TD>";
        ss += "</TR>";
        j++;
        dy++;
        jd++;
        if (dy > ld) { dy = 1; mo++; ld = eval(d.substring(mo * 2 - 2, mo * 2)); }
        if (mo > 12) { yr++; mo = 1; ld = eval(d.substring(mo * 2 - 2, mo * 2)); }
    }
    ss += "</tbody></TABLE>";
    ss += "<ul><li>'РЎР°СЂРЅС‹ У©РЅС†У©Рі' РіСЌРґРіСЌСЌСЂ РЅР°СЂ СЃР°СЂРЅС‹ С…Р°СЂР°РіРґР°С… С‡РёРіР»СЌР»ТЇТЇРґРёР№РЅ С…РѕРѕСЂРѕРЅРґРѕС… У©РЅС†РіРёР№Рі С‚РѕРІС‡Р»РѕРЅ С‚СЌРјРґСЌРіР»СЌРІ.</li>";
    ss += "<li>РЎР°СЂРЅС‹ Р±Р°Р№СЂР»Р°Р»С‹Рі РЈР»Р°Р°РЅР±Р°Р°С‚Р°СЂС‹РЅ С†Р°РіР°Р°СЂ С‚СѓС…Р°Р№РЅ У©РґСЂРёР№РЅ ТЇРґ РґСѓРЅРґР°Р°СЂ Р±Р°СЂРёРјР¶Р°Р°Р»СЃР°РЅ.</li>";
    ss += "<li>РњРёС‡РёРґ С‚РѕС…РёРѕС… РіСЌРґСЌРі РЅСЊ СЃР°СЂ РјРёС‡РёРґ Р·СѓСЂРіР°Р°С‚Р°Р№ С…Р°СЂРіР°Р»РґР°Р° РёСЂСЌС…РёР№Рі С…СЌР»РЅСЌ.</li></ul>";
    return ss;
}


export function monthday() {

    var td = new Date();

    var Y = td.getYear() + 1900;
    var M = td.getMonth();

    var njd = new_year_jd(Y);
    var L = 0;
    var g = {};
    jd2g(njd, g);
    var att = {};
    attrib_year(Y, att);
    
    var bgn = {};
    var myCalendar = [];
    prev_month(Y, M, L, bgn);

    for (var i = 1; i < 2; i++) {
        next_month(bgn.Y, bgn.M, bgn.L, bgn);
        Calendar(bgn.Y, bgn.M, bgn.L, myCalendar);           // 1 month
    }

    myCalendar = myCalendar.sort(function (a, b) { return a.Date - b.Date }).filter(x => x.Year === Y && x.Month === parseInt(td.getMonth() + 1) && x.Day === td.getDate());

    //lunar_month(2022, 2, 15, dat);



    var ss = "{";
    ss += "'jaran':'" + myCalendar[0].Cycle + "'";
    ss += ",'jil':'" + myCalendar[0].Animal + "'";

    ss += ",'sar':'" + myCalendar[0].LunarTitle + "'";
    ss += ",'title':'" + myCalendar[0].Cycle + "-СЂ Р¶Р°СЂРЅС‹ " + myCalendar[0].Color +" "+  myCalendar[0].Animal + " Р¶РёР»РёР№РЅ "
        + myCalendar[0].LunarTitle + "'";

    ss += ",'udur':'" + myCalendar[0].BiligDate + "'";
    ss += ",'ungu':'" + myCalendar[0].DayColor +  "'";
    ss += ",'garig':'" + myCalendar[0].DLong + "'";
    ss += ",'argiintoolol':'" + myCalendar[0].Year + "-" + myCalendar[0].Month + "-" + myCalendar[0].Day + "'";
    ss += ",'menge':'" + myCalendar[0].DayMenge + "'";
    ss += ",'suudal':'" + myCalendar[0].DaySuudal + "'";

    ss += "}";

    return ss;
}


export function Calendar(Y, M, L, myCalendar) {
    var j1 = first_day_jd(Y, M, L);

    var att = {};
    attrib_year(Y, att);
    var attm = {};
    attrib_month(Y, M, attm);

    var mTitle = Mmn[M - 1] + " " + (L ? "РёР»ТЇТЇ " : "") + "СЃР°СЂ";

    var g = {};

    jd2g(j1, g);
    var dy = g.day;
    var mo = g.month;
    var yr = g.year;
    var d = "312831303130313130313031";
    var leap = false;
    if (yr / 4 == Math.floor(yr / 4)) leap = true;
    if (yr / 100 == Math.floor(yr / 100)) leap = false;
    if (yr / 400 == Math.floor(yr / 400)) leap = true;
    if (leap) d = "312931303130313130313031";
    var ld = eval(d.substring(mo * 2 - 2, mo * 2));

    var today = new Date();
    var ddd = today.getDate();
    var mmm = today.getMonth() + 1;
    var yyy = today.getFullYear();
    var jjj = g2jdn(yyy, mmm, ddd);


    var a = {};
    var bb = 0;
    var ctr = 1;
    var dd = 1;
    var j = 0;
    var jd = j1;
    j1--;

    while (dd <= 30) {

        j = julian_day(Y, M, L, dd);
        if (j1 == j) { dd++; continue; }
        else if (j == j1 + 1) { j1 = j; ctr = dd; dd++; }
        else { j1 = j - 1; ctr = dd; }

        attrib_day(jd, a);

        let today = false;
        if (jd == jjj) { today = true; }

        var date = parseInt(yr + ((mo < 10) ? "0" : "") + mo + ((dy < 10) ? "0" : "") + dy);
        if (myCalendar.findIndex(x => x.Date === date) == -1) {
            myCalendar.push({
                "Cycle": att.cycle,
                "Color": att.elcor,
                "Animal": att.animalin,
                "Year": yr,
                "Month": mo,
                "Day": dy,
                "DayId": a.day,
                "Date": date,
                "BiligDate": ctr,
                "LunarTitle": mTitle,
                "DayColor": a.elcor + " " + Animal[a.animal - 1],
                "DayMenge": Numbern[a.number - 1] + " " + a.colour9,
                "DaySuudal": Element8[a.trigram - 1],
                "LunarId": M - 1,
                "DShort": D[a.day],
                "DLong": Dlong[a.day],
                "SelectDate": today
            });
        }
        j++;
        dy++;
        jd++;
        if (dy > ld) { dy = 1; mo++; ld = eval(d.substring(mo * 2 - 2, mo * 2)); }
        if (mo > 12) { yr++; mo = 1; ld = eval(d.substring(mo * 2 - 2, mo * 2)); }
    }


}