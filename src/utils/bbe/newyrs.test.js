import { describe, it, expect } from  "vitest";
import { newyrs } from  "./newyrs";

describe("moonphase", () => {
  it("should find new moon", () => {
    const a = newyrs(2020, 2021);
    console.log(a);
    expect(a).toBeTruthy();
  });
});