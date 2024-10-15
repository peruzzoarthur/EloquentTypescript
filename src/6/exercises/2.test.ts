import { Group } from "./2.ts";
import { expect } from "jsr:@std/expect";
import { describe } from "jsr:@std/testing/bdd";

describe("Group Class", () => {
  Deno.test("should add a value to the group", () => {
    const group = new Group();
    group.add(1);
    group.add(2);
    expect(group.has(1)).toBe(true);
    expect(group.has(2)).toBe(true);
  });

  Deno.test("should return false for a value not in the group", () => {
    const group = new Group();

    console.log(group);
    expect(group.has(3)).toBe(false);
  });

  Deno.test("should delete a value from the group", () => {
    const group = new Group();

    group.add(1);
    group.delete(1);
    expect(group.has(1)).toBe(false);
  });

  Deno.test("should not delete a value not in the group", () => {
    const group = new Group();

    group.add(2);
    group.delete(1); // Trying to delete a value that doesn't exist
    expect(group.has(2)).toBe(true); // Value 2 should still be present
  });

  Deno.test("should create a group from an iterable", () => {
    const arrayGroup = Group.from([1, 2, 2, 3, 4]);
    expect(arrayGroup.has(3)).toBe(true);
    expect(arrayGroup.has(5)).toBe(false);
  });

  Deno.test("should not add duplicate values", () => {
    const group = new Group();

    group.add(1);
    group.add(1); // Adding the same value again
    group.add(2);
    expect(group.has(1)).toBe(true);
    expect(group.has(2)).toBe(true);
    expect(group.group.length).toBe(2); // Accessing the private array
  });

  Deno.test(
    "should check has(), add(), and delete() methods work as expected",
    () => {
      // Test for the scenario provided
      const arrayGroup = Group.from([10, 20]);

      // Check if 10 exists
      expect(arrayGroup.has(10)).toBe(true);

      // Check if 30 exists
      expect(arrayGroup.has(30)).toBe(false);

      // Add 10 (already exists, so no change)
      arrayGroup.add(10);

      // Delete 10 and check again
      arrayGroup.delete(10);
      expect(arrayGroup.has(10)).toBe(false);
    }
  );
});
