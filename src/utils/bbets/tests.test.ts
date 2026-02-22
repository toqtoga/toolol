import { describe, expect, it } from "vitest";
import { Calendar } from "./zurhai";
import { getTsagaanSarAttributes } from "./newyrs";
import { LocalDate } from "js-joda";

describe("moonphase", () => {
  // it("should be equal", () => {
  //   const a = newyrs(1900,2030);
  //   const b = newyrsTS(1900,2030);
  //   expect(b).toEqual(a);
  // });

  it("All Phugpa calendars should return the same values within tolerance", () => {
    const year1 = 1;
    const year2 = 1000;

    for (let y = year1; y <= year2; y++) {
      const c1 = getTsagaanSarAttributes(y, Calendar.Phugpa);
      const c2 = getTsagaanSarAttributes(y, Calendar.Phugpa1927);
      const c3 = getTsagaanSarAttributes(y, Calendar.Phugpa1987);

      // c1 to c1 (Phugpa to Phugpa1927)
      expect(c1["жарны жил"]).toEqual(c2["жарны жил"]);
      expect(c1["жаран"]).toEqual(c2["жаран"]);
      expect(c1["жил"]).toEqual(c2["жил"]);
      expect(c1["жилийн мэнгэ"]).toEqual(c2["жилийн мэнгэ"]);
      expect(LocalDate.parse(c1["он гарах огноо"]).toEpochDay()).toEqual(
        LocalDate.parse(c2["он гарах огноо"]).toEpochDay(),
      );
      expect(c1["он гарах өдөр"]).toEqual(c2["он гарах өдөр"]);
      expect(c1["өдрийн өнгө"]).toEqual(c2["өдрийн өнгө"]);
      expect(c1["өдрийн мэнгэ"]).toEqual(c2["өдрийн мэнгэ"]);
      expect(c1["суудал"]).toEqual(c2["суудал"]);
      expect(c1["битүүний сар"]).toEqual(c2["битүүний сар"]);
      expect(c1["жарны жилийн нэр"]).toEqual(c2["жарны жилийн нэр"]);

      // c1 to c3 (Phugpa to Phugpa1987)
      expect(c1["жарны жил"]).toEqual(c3["жарны жил"]);
      expect(c1["жаран"]).toEqual(c3["жаран"]);
      expect(c1["жил"]).toEqual(c3["жил"]);
      expect(c1["жилийн мэнгэ"]).toEqual(c3["жилийн мэнгэ"]);
      expect(LocalDate.parse(c1["он гарах огноо"]).toEpochDay()).toEqual(
        LocalDate.parse(c3["он гарах огноо"]).toEpochDay(),
      );
      expect(c1["он гарах өдөр"]).toEqual(c3["он гарах өдөр"]);
      expect(c1["өдрийн өнгө"]).toEqual(c3["өдрийн өнгө"]);
      expect(c1["өдрийн мэнгэ"]).toEqual(c3["өдрийн мэнгэ"]);
      expect(c1["суудал"]).toEqual(c3["суудал"]);
      expect(c1["битүүний сар"]).toEqual(c3["битүүний сар"]);
      expect(c1["жарны жилийн нэр"]).toEqual(c3["жарны жилийн нэр"]);
    }
  });

  it("Early years should output correct values", () => {
    const year1 = 2020;
    const year2 = 2021;

    console.log("Mongolian");
    for (let y = year1; y <= year2; y++) {
      const c1 = getTsagaanSarAttributes(y, Calendar.Mongolian);
      const year = c1["он гарах огноо"];
      console.log(`Year: ${y}, New Year Date: ${year}`);
      console.log(c1);
    }

    console.log("Phugpa");
    for (let y = year1; y <= year2; y++) {
      const c1 = getTsagaanSarAttributes(y, Calendar.Phugpa);
      const year = c1["он гарах огноо"];
      console.log(`Year: ${y}, New Year Date: ${year}`);
      console.log(c1);
    }
  });
});

// 1450.01.23
