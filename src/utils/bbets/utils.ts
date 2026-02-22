import { LocalDate } from "@js-joda/core";
import { CalendarChinese } from "date-chinese";

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const getChineseNewYear = (year: number) => {
  const cal = new CalendarChinese();
  const jde = cal.newYear(year); // Chinese New Year in JDE
  cal.fromJDE(jde); // load that date
  const g = cal.toGregorian(year); // { year, month, day }
  return LocalDate.of(g.year, g.month, g.day).toString();
};
