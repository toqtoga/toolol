import { describe, it } from "vitest";
import { Calendar } from "./zurhai";
import { getTsagaanSarAttributes } from "./newyrs";

describe("moonphase", () => {
  // it("should be equal", () => {
  //   const a = newyrs(1900,2030);
  //   const b = newyrsTS(1900,2030);
  //   expect(b).toEqual(a);
  // });

  it("should work", () => {
    const y = 1460;
    const a = getTsagaanSarAttributes(y, Calendar.Phugpa);
    console.log("Attributes:", a);
  });
});

// 1450.01.23
