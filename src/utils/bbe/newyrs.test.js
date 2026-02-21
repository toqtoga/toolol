import { describe, it, expect } from  "vitest";
import { newyrs } from  "./newyrs";
import {  newyrs as newyrsTS } from  "../bbets/newyrs";

describe("moonphase", () => {
  it.skip("should be equal", () => {
    const a = newyrs(1900,2030);
    const b = newyrsTS(1900,2030);
    expect(b).toEqual(a);
  });

});

