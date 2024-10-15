import { Group } from "./2.ts";
import { expect } from "jsr:@std/expect";
import { describe } from "jsr:@std/testing/bdd";
describe("Group Iterable", () => {
  Deno.test("should iterate over values of the Group", () => {
    const group = Group.from(["a", "b", "c"]);
    const values: string[] = [];

    for (const value of group) {
      values.push(value as string);
    }

    expect(values).toEqual(["a", "b", "c"]);
  });
});
