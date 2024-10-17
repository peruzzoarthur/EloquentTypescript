import { describe } from "@std/testing/bdd";
import { PGroup } from "./3.ts";
import { assertEquals } from "@std/assert/equals";

describe("Persistent Group", () => {
  Deno.test({
    name: "Create and add 2",
    fn() {
      const group = PGroup.empty().add(2);
      const has = group.has(2);
      assertEquals(true, has);
    },
  });

  Deno.test("Create empty group, add and delete values", () => {
    const a = PGroup.empty().add("a");
    const ab = a.add("b");
    const b = ab.delete("a");
    assertEquals(true, b.has("b"));
    assertEquals(false, a.has("b"));
    assertEquals(false, b.has("a"));
  });
});
