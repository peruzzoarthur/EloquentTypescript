export class PGroup {
  private members: unknown[];
  constructor(members: unknown[]) {
    this.members = members;
  }

  add(value: unknown): PGroup {
    if (this.has(value)) {
      return this;
    }
    return new PGroup(this.members.concat([value]));
  }

  delete(value: unknown): PGroup {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter((m) => m !== value));
  }

  has(value: unknown): boolean {
    return this.members.includes(value);
  }

  static empty(): PGroup {
    return new PGroup([]);
  }
}

const a = PGroup.empty().add("a");
const ab = a.add("b");
const b = ab.delete("a");

console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));
