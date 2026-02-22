import { DatesMn, RomanNumbers, TSAGAAN_SAR_ATTRIBUTES } from "./consts";
import { JSDate, find_newmoon } from "./moonphase";
import {
  attrib_day,
  attrib_year,
  Calendar,
  g2jdn,
  jd2g,
  // jd2g,
  jd2g_actual,
  new_year_jd,
} from "./zurhai";
import { Animal, Element8, JaranName, Numbern } from "./consts";
import { pad2 } from "./utils";
import { LocalDate } from "@js-joda/core";

// For testing former compatibility with bbe version. Do not remove.
export function newyrs(y1: number, y2: number) {
  const keys = [
    "жаран",
    "жил",
    "жилийн мэнгэ",
    "он гарах өдөр",
    "өдрийн өнгө",
    "өдрийн мэнгэ",
    "суудал",
    "битүүний сар",
  ];
  let str =
    "<TABLE class='table table-bordered table-hover table-striped'><thead><TR class='text-center'>" +
    keys.map((key) => "<th><b>" + key + "</b></th>").join("") +
    "</TR></thead><tbody>";
  for (let y = y1; y <= y2; ++y) {
    const ret = getTsagaanSarAttributes(y, Calendar.Mongolian, true);
    str +=
      "<TR>" +
      keys
        .map(
          (key) =>
            "<TD ALIGN=CENTER>" +
            (() => {
              switch (key) {
                case "жаран":
                  return ret.жаран;
                case "жил":
                  return ret.жил;
                case "жилийн мэнгэ":
                  return ret["жилийн мэнгэ"];
                case "он гарах өдөр": // Note the below is different from the one in getTsagaanSarAttributes. This is for testing former compatibility with bbe version. Do not remove.
                  // return `${y}/${RomanNumbers[new Date(Number(ret["он гарах огноо"])).getMonth()]}/${pad2(new Date(Number(ret["он гарах огноо"])).getDate())}&nbsp;&nbsp;&nbsp;${ret["он гарах өдөр"]}`;
                  return `${y}/${RomanNumbers[LocalDate.parse(ret["он гарах огноо"]).monthValue() - 1]}/${pad2(LocalDate.parse(ret["он гарах огноо"]).dayOfMonth())}&nbsp;&nbsp;&nbsp;${ret["он гарах өдөр"]}`;
                case "өдрийн өнгө":
                  return ret["өдрийн өнгө"];
                case "өдрийн мэнгэ":
                  return ret["өдрийн мэнгэ"];
                case "суудал":
                  return ret.суудал;
                case "битүүний сар":
                  return ret["битүүний сар"];
              }
            })() +
            "</TD>",
        )
        .join("") +
      "</TR>";
  }
  str += "</tbody></TABLE>";
  return str;
}

export type TsagaanSarAttrs = Record<
  (typeof TSAGAAN_SAR_ATTRIBUTES)[number],
  string
>;

export const getTsagaanSarAttributes = (
  y: number,
  calendarType: number,
  isProlepticGregorian = false,
): TsagaanSarAttrs => {
  const julianDate = new_year_jd(y, calendarType);
  const gregorianDate = isProlepticGregorian
    ? jd2g(julianDate)
    : jd2g_actual(julianDate);

  const dayAttributes = getDayAttributes(
    {
      year: gregorianDate.year,
      month: gregorianDate.month,
      day: gregorianDate.day,
    },
    calendarType,
  );

  // Битүүний сарны өдөр, цагийг олно. Битүүний сар нь шинэ сарын өдөр бөгөөд шинэ сарын өдөр нь шинэ сарын эхний өдрөөс 3 хоногийн өмнө ба 3 хоногийн дараа хооронд байдаг.
  const jnew = find_newmoon(julianDate - 3, julianDate + 3, 0);
  const sd = JSDate(jnew + 8 / 24);

  return {
    ...dayAttributes,
    "битүүний сар": `${RomanNumbers[sd.getUTCMonth()]}/${pad2(sd.getUTCDate())} - ${pad2(sd.getUTCHours())}ц ${pad2(sd.getUTCMinutes())}м`,
  };
};

export const getDayAttributes = (
  gregorianDate: {
    year: number;
    month: number;
    day: number;
  },
  calendarType: number,
): TsagaanSarAttrs => {
  const julianDate = g2jdn(
    gregorianDate.year,
    gregorianDate.month,
    gregorianDate.day,
  );

  const yearAttributes = attrib_year(gregorianDate.year, calendarType);
  const dayAttribs = attrib_day(julianDate, calendarType);

  return {
    "жарны жил": yearAttributes.year.toString(),
    жаран: yearAttributes.cycle.toString(),
    жил: yearAttributes.elcor + " " + yearAttributes.animal,
    "жилийн мэнгэ":
      Numbern[yearAttributes.number - 1] + " " + yearAttributes.colour9,
    "он гарах огноо": LocalDate.of(
      gregorianDate.year,
      gregorianDate.month,
      gregorianDate.day,
    ).toString(),
    "он гарах өдөр": DatesMn[dayAttribs.day],
    "өдрийн өнгө": dayAttribs.elcor + " " + Animal[dayAttribs.animal - 1],
    "өдрийн мэнгэ": Numbern[dayAttribs.number - 1] + " " + dayAttribs.colour9,
    суудал: Element8[dayAttribs.trigram - 1],
    "жарны жилийн нэр": JaranName[yearAttributes.year - 1],
  };
};
