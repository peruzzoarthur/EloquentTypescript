// function speak(line: string) {
//   console.log(`The ${this.type} rabbit says '${line}'`);
// }

// const greenRabbit = { type: "green", speak };
// const nervousRabbit = { type: "nervous", speak };

// greenRabbit.speak("Oh my dear weed, you're so green.");
// nervousRabbit.speak("I get nervous everytime..");

// speak.call(greenRabbit, "Come with me Nervous Rabbit, I show'ya something.");

// // Arrow functions can reference the this from inside a local function

// let finder = {
//   find(array) {
//     return array.some((v) => v == this.value);
//   },
//   value: 5
// };

// console.log(finder.find([4, 5]));

// const empty: object = {};
// console.log(typeof empty);
// console.log(empty.toString);
// console.log(empty.toString());

// console.log(Object.getPrototypeOf({}) === Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype));

// let protoRabbit = {
//   speak(line) {
//     console.log(`The ${this.type} rabbit says '${line}'.`);
//   },
//   type: "proto",
// };

// let blackRabbit = Object.create(protoRabbit) as typeof protoRabbit;

// blackRabbit.type = "black";
// blackRabbit.speak("I am the darkest rabbit (in many means)...");

// function makeRabbit(type: string) {
//   const rabbit = Object.create(protoRabbit) as typeof protoRabbit;
//   rabbit.type = type;
//   return rabbit;
// }

// const greyRabbit = makeRabbit("grey");
// greyRabbit.speak("I have 50 shades of grey.");
interface Rabbit {
  type: string;
  teeth: string;
  speak(line: string): void;
}
class Rabbit {
  constructor(public type: string) {} // Remove 'teeth' from constructor
  speak(line: string) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

const banguelaRabbit = new Rabbit("banguela");
console.log(banguelaRabbit.teeth);
Rabbit.prototype.teeth = "small";
const toxicRabbit = new Rabbit("toxic");
console.log(toxicRabbit.teeth);
const killerRabbit = new Rabbit("killer");
killerRabbit.teeth = "sharp and bloody";
console.log(killerRabbit.teeth);

// const orangeRabbit = new Rabbit("orange");

// orangeRabbit.speak("Orange is the color!");

// console.log(orangeRabbit.type);

// class SecretiveObject {
//   #getSecret() {
//     return "I ate all cheese bread";
//   }

//   interrogate() {
//     let shallISayIt = this.#getSecret();
//     const random = Math.random();
//     return random >= 0.5 ? shallISayIt : "never";
//   }
// }

// const secret = new SecretiveObject();
// console.log(secret.interrogate());

// class RandomSource {
//   private max: number;
//   constructor(max: number) {
//     this.max = max;
//   }
//   getNumber() {
//     return Math.floor(Math.random() * this.max);
//   }
// }
// const randomNumber = new RandomSource(666);

// console.log(randomNumber.getNumber());

// const ages = {
//   Mari: 8,
//   Xoan: 5,
//   Guel: undefined,
// };

// let ages = new Map();
// ages.set("Mari", 8);
// ages.set("Xoan", 5);
// ages.set("Guel", undefined);
// console.log(ages);
// console.log(`Mari is ${ages.get("Mari")}, Guel is ${ages.get("Guel")}`);
// console.log("Is Xoan's age know?", ages.has("Xoan"));

// // Interface for instance members
// interface TemperatureInstance {
//   celsius: number;
//   fahrenheit: number; // Getter/Setter
// }

// // Type for the static side (constructor and static methods)
// interface TemperatureConstructor {
//   new (celsius: number): TemperatureInstance; // Constructor signature
//   fromFahrenheit(value: number): TemperatureInstance; // Static method
// }

// // Implementing both the instance interface and constructor type
// const Temperature: TemperatureConstructor = class Temperature
//   implements TemperatureInstance
// {
//   constructor(public celsius: number) {}

//   get fahrenheit() {
//     return this.celsius * 1.8 + 32;
//   }

//   set fahrenheit(value: number) {
//     this.celsius = (value - 32) / 1.8;
//   }

//   static fromFahrenheit(value: number) {
//     return new Temperature((value - 32) / 1.8);
//   }
// };

// const temp = new Temperature(0);
// console.log(temp.fahrenheit);
// temp.fahrenheit = 100;
// console.log(temp.celsius);

// const anotherTemp = Temperature.fromFahrenheit(212);
// console.log(anotherTemp.celsius);

// const okIterator = "OK"[Symbol.iterator]();

// console.log(okIterator.next());
// console.log(okIterator.next());
// console.log(okIterator.next());

class List {
  constructor(public value: number, public rest: List | null) {
    this.value = value;
    this.rest = rest;
  }
  get length() {
    return 1 + (this.rest ? this.rest.length : 0);
  }
  static fromArray(array: number[]): List {
    let result = null;

    for (let i = array.length - 1; i >= 0; i--) {
      result = new this(array[i], result);
    }
    return result;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
}

class ListIterator {
  current: List | null;

  constructor(public list: List) {
    this.current = list;
  }

  next() {
    if (this.current === null) {
      return { done: true };
    }

    const value = this.current.value;
    this.current = this.current.rest;

    return { value, done: false };
  }
}

class LengthList extends List {
  private lengthValue: number;

  constructor(value: number, rest: List | null) {
    super(value, rest);
    this.lengthValue = super.length;
  }

  get length() {
    return this.lengthValue;
  }
}

let list = List.fromArray([1, 2, 3]);
console.log(list);
for (let element of list) {
  console.log(element);
}

const lengthLengthArray = LengthList.fromArray([1, 2, 3, 4, 5]);
console.log(lengthLengthArray.length);
