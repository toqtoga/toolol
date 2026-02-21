import { DatesMn, RomanNumbers, TSAGAAN_SAR_ATTRIBUTES } from "./consts";
import { JSDate, find_newmoon } from "./moonphase";
import { attrib_day, attrib_year, Calendar, jd2g, new_year_jd } from "./zurhai";
import { Animal, Element8, JaranName, Numbern } from "./consts";
const pad2 = (n: number) => String(n).padStart(2, "0");

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
    const ret = getTsagaanSarAttributes(y, Calendar.Mongolian);
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
                case "он гарах өдөр":
                  return `${new Date(ret["он гарах огноо"]).getFullYear()}/${RomanNumbers[new Date(ret["он гарах огноо"]).getMonth()]}/${pad2(new Date(ret["он гарах огноо"]).getDate())}&nbsp;&nbsp;&nbsp;${ret["он гарах өдөр"]}`;
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
): TsagaanSarAttrs => {
  const julianDate = new_year_jd(y, calendarType);
  const gregorianDate = jd2g(julianDate);
  const yearAttributes = attrib_year(y, calendarType);
  const a = attrib_day(julianDate, calendarType);

  // Битүүний сарны өдөр, цагийг олно. Битүүний сар нь шинэ сарын өдөр бөгөөд шинэ сарын өдөр нь шинэ сарын эхний өдрөөс 3 хоногийн өмнө ба 3 хоногийн дараа хооронд байдаг.
  const jnew = find_newmoon(julianDate - 3, julianDate + 3, 0);
  const sd = JSDate(jnew + 8 / 24);

  return {
    "жарны жил": yearAttributes.year.toString(),
    жаран: yearAttributes.cycle.toString(),
    жил: yearAttributes.elcor + " " + yearAttributes.animal,
    "жилийн мэнгэ":
      Numbern[yearAttributes.number - 1] + " " + yearAttributes.colour9,
    "он гарах огноо": new Date(
      gregorianDate.year,
      gregorianDate.month - 1,
      gregorianDate.day,
    ).toLocaleDateString("mn-MN"),
    "он гарах өдөр": DatesMn[a.day],
    "өдрийн өнгө": a.elcor + " " + Animal[a.animal - 1],
    "өдрийн мэнгэ": Numbern[a.number - 1] + " " + a.colour9,
    суудал: Element8[a.trigram - 1],
    "битүүний сар": `${RomanNumbers[sd.getUTCMonth()]}/${pad2(sd.getUTCDate())} - ${pad2(sd.getUTCHours())}ц ${pad2(sd.getUTCMinutes())}м`,
    "жарны жилийн нэр": JaranName[yearAttributes.year - 1],
  };
};
