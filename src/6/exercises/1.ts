export interface Vec {
  x: number;
  y: number;
}

export class Vec {
  constructor(public x: number, public y: number) {}

  plus(vector: Vec) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  minus(vector: Vec) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

// const aVec = new Vec(1, 2);
// const newVec = aVec.plus(new Vec(2, 3));
// console.log(aVec);
// console.log(newVec);
// console.log(new Vec(3, 4).length);
