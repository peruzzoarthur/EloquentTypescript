// vec.test.ts

import { Vec } from "./1.ts";
import { expect } from "jsr:@std/expect";
import { describe } from "jsr:@std/testing/bdd";

describe("Vec class", () => {
  Deno.test("plus operation", () => {
    const vec1 = new Vec(1, 2);
    const vec2 = new Vec(2, 3);
    const result = vec1.plus(vec2);
    expect(result).toEqual(new Vec(3, 5));
  });

  Deno.test("minus operation", () => {
    const vec1 = new Vec(1, 2);
    const vec2 = new Vec(2, 3);
    const result = vec1.minus(vec2);
    expect(result).toEqual(new Vec(-1, -1));
  });

  Deno.test("length calculation", () => {
    const vec = new Vec(3, 4);
    expect(vec.length).toBe(5);
  });
});
