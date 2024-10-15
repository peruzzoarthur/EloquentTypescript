import { Group } from "./2.ts";

export class GroupIterator {
  private group: Group;
  private position: number;

  constructor(group: Group) {
    this.group = group;
    this.position = 0;
  }
  next(): IteratorResult<unknown> {
    if (this.position >= this.group.group.length) {
      return { done: true, value: undefined };
    } else {
      const value = this.group.group[this.position];
      this.position++;
      return { done: false, value: value };
    }
  }
  //   [Symbol.iterator](): GroupIterator {
  //     return this;
  //   }
}
