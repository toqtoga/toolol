import { Animal, DatesMn, Element8, JaranName, Numbern } from "./consts";
import { attrib_day, attrib_year, g2jdn, jd2g } from "./zurhai";

export const getSingleDayAttributes = (date: Date, calendarType: number) => {
  const julianDate = g2jdn(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  const gregorianDate = jd2g(julianDate);
  const yearAttributes = attrib_year(date.getFullYear(), calendarType);
  const a = attrib_day(julianDate, calendarType);

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
    "жарны жилийн нэр": JaranName[yearAttributes.year - 1],
  };
};
