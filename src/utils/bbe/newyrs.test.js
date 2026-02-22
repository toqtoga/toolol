import { describe, it, expect } from  "vitest";
import { newyrs } from  "./newyrs";
import {  newyrs as newyrsTS } from  "../bbets/newyrs";

describe("moonphase", () => {
  it("should be equal", () => {
    const a = newyrs(1450,2000);
    const b = newyrsTS(1450,2000);
    expect(b).toEqual(a);
  });
});

