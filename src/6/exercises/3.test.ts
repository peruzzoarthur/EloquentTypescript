import { Group } from "./2.ts";
import { expect } from "jsr:@std/expect";
import { describe } from "jsr:@std/testing/bdd";
describe("Group Iterable", () => {
  Deno.test("should iterate over values of the Group", () => {
    const group = Group.from(["a", "b", "c"]);
    const values: string[] = [];

    // Iterate over the group and collect the values
    for (const value of group) {
      values.push(value);
    }

    // Test that the collected values match the expected result
    expect(values).toEqual(["a", "b", "c"]);
  });
});
