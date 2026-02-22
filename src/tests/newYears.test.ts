import { describe, expect, it } from "vitest";
import { chineseNewYears } from "./fixtures/chineseNewYears";
import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import { getChineseNewYear } from "../utils/bbets/utils";
import "@js-joda/timezone";
import { Locale } from "@js-joda/locale";
import { phugpaNewYears } from "./fixtures/phugpaNewYears";
import { getTsagaanSarAttributes } from "../utils/bbets/newyrs";
import { Calendar } from "../utils/bbets/zurhai";
import { tsurphuNewYears } from "./fixtures/tsurphuNewYears";

describe("New Year", () => {
  it.skip("should have correct Chinese New Year dates", () => {
    for (let index = 0; index < chineseNewYears.length; index++) {
      const dateStr = chineseNewYears[index][0];
      const cleaneddateStr = dateStr.replace(".", ""); // "Jan 28, 1645"
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

  it("should have correct Phugpa New Year dates1", () => {
    for (let index = 0; index < phugpaNewYears.length; index++) {
      const dateStr = phugpaNewYears[index];
      const formatter = DateTimeFormatter.ofPattern("d MMM yyyy").withLocale(
        Locale.ENGLISH,
      );
      const formattedDate = LocalDate.parse(dateStr, formatter);
      const expected = formattedDate.toString();

      const year = formattedDate.year();
      const calculated = getTsagaanSarAttributes(year, Calendar.Phugpa);

      expect(calculated["он гарах огноо"]).toEqual(expected);
    }
  });

  it("should have correct Tsurphu New Year dates", () => {
    for (let index = 0; index < tsurphuNewYears.length; index++) {
      const dateStr = tsurphuNewYears[index];
      const formatter = DateTimeFormatter.ofPattern("d MMM yyyy").withLocale(
        Locale.ENGLISH,
      );
      const formattedDate = LocalDate.parse(dateStr, formatter);
      const expected = formattedDate.toString();

      const year = formattedDate.year();
      const calculated = getTsagaanSarAttributes(year, Calendar.Tsurphu);

      expect(calculated["он гарах огноо"]).toEqual(expected);
    }
  });
});
