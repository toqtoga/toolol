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
import { losar } from "./fixtures/losar";
import { tsurphuKagyu } from "./fixtures/tsurphuKagyu";

describe("New Year", () => {
  it("should have correct Chinese New Year dates", () => {
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

  it.skip("should have correct Tsurphu New Year dates", () => {
    for (let index = 0; index < tsurphuNewYears.length; index++) {
      const dateStr = tsurphuNewYears[index];
      const formatter = DateTimeFormatter.ofPattern("d MMM yyyy").withLocale(
        Locale.ENGLISH,
      );
      const formattedDate = LocalDate.parse(dateStr, formatter);
      const expected = formattedDate.toString();

      const year = formattedDate.year();
      const calculated = getTsagaanSarAttributes(year, Calendar.Tsurphu1852);

      expect(calculated["он гарах огноо"]).toEqual(expected);
    }
  });

  it("should have correct Losars", () => {
    for (let index = 0; index < losar.length; index++) {
      const year = losar[index][0];
      const dateStrPhugpa = losar[index][1];
      const dateStrTsurphu = losar[index][2];
      const dateStrMongolia = losar[index][3];
      const dateStrBhutan = losar[index][4];

      const calculated1 = getTsagaanSarAttributes(
        Number(year),
        Calendar.Phugpa,
      )["он гарах огноо"];

      expect(LocalDate.parse(calculated1)).toEqual(
        LocalDate.of(
          Number(year),
          Number(dateStrPhugpa.split("/")[1]),
          Number(dateStrPhugpa.split("/")[0]),
        ),
      );

      const calculated2 = getTsagaanSarAttributes(
        Number(year),
        Calendar.Tsurphu,
      )["он гарах огноо"];

      expect(LocalDate.parse(calculated2)).toEqual(
        LocalDate.of(
          Number(year),
          Number(dateStrTsurphu.split("/")[1]),
          Number(dateStrTsurphu.split("/")[0]),
        ),
      );

      const calculated3 = getTsagaanSarAttributes(
        Number(year),
        Calendar.Mongolian,
      )["он гарах огноо"];

      expect(LocalDate.parse(calculated3)).toEqual(
        LocalDate.of(
          Number(year),
          Number(dateStrMongolia.split("/")[1]),
          Number(dateStrMongolia.split("/")[0]),
        ),
      );

      const calculated4 = getTsagaanSarAttributes(
        Number(year),
        Calendar.Bhutanese,
      )["он гарах огноо"];

      expect(LocalDate.parse(calculated4)).toEqual(
        LocalDate.of(
          Number(year),
          Number(dateStrBhutan.split("/")[1]),
          Number(dateStrBhutan.split("/")[0]),
        ),
      );
    }
  });

  it.skip("should align to Karma Kagyu", () => {
    for (let index = 0; index < tsurphuKagyu.length; index++) {
      const dateStr = tsurphuKagyu[index].split(", ")[1];
      const formatter = DateTimeFormatter.ofPattern("d MMM yyyy").withLocale(
        Locale.ENGLISH,
      );

      // Format the date
      const formattedDate = LocalDate.parse(dateStr, formatter);

      const year = formattedDate.year();
      const calculated4 = getTsagaanSarAttributes(
        Number(year),
        Calendar.Tsurphu,
      )["он гарах огноо"];

      expect(LocalDate.parse(calculated4)).toEqual(formattedDate);
    }
  });
});
