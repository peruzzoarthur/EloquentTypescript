import { GroupIterator } from "./3.ts";
export interface Group {
  group: unknown[];
  add(value: unknown): void;
  delete(value: unknown): void;
  has(value: unknown): boolean;
}

export class Group {
  group: unknown[];
  constructor() {
    this.group = [];
  }
  add(value: unknown): void {
    if (this.group.includes(value)) {
      return;
    } else {
      this.group.push(value);
      return;
    }
  }
  delete(value: unknown): void {
    if (this.group.includes(value)) {
      this.group = this.group.filter((v) => v !== value);
      return;
    } else {
      return;
    }
  }
  has(value: unknown): boolean {
    return this.group.includes(value);
  }
  static from(iterable: Iterable<unknown>): Group {
    const group = new Group();
    for (const i of iterable) {
      group.add(i);
    }
    return group;
  }
  [Symbol.iterator](): GroupIterator {
    return new GroupIterator(this);
  }
}

for (const value of Group.from(["a", "b", "c", 4])) {
  console.log(value);
}
