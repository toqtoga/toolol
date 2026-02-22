import { describe, expect, it } from "vitest";
import { chineseNewYears } from "./fixtures/chineseNewYears";
import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import { getChineseNewYear } from "../utils/bbets/utils";
import "@js-joda/timezone";
import { Locale } from "@js-joda/locale";

describe("Chinese New Year", () => {
  it("should have correct Chinese New Year dates", () => {
    for (let index = 0; index < chineseNewYears.length; index++) {
      const dateStr = chineseNewYears[index][0];
      const cleaneddateStr = dateStr.replace(".", ""); // "Jan 28, 1645"
      console.log(cleaneddateStr);
      const formatter = DateTimeFormatter.ofPattern("MMM d, yyyy").withLocale(
        Locale.ENGLISH,
      );

      // Format the date
      const formattedDate = LocalDate.parse(cleaneddateStr, formatter);

      const year = formattedDate.year();
      const calculated = getChineseNewYear(year);
      const expected = formattedDate.toString();

      expect(calculated).toEqual(expected);
    }
  });
});
