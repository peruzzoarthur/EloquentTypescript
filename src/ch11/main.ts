// setTimeout(() => {
//   console.log("ooooo");
// }, 2000);

import { readTextFile } from "./hangar2.ts";

// const fif = Promise.resolve(15);
// fif.then((v) => console.log(v));

// const thePromiser = (v: number) => {
//   return new Promise((resolve) => resolve(v));
// };

// thePromiser(5).then(console.log);

const withTimeout = <T>(promise: Promise<T>, time: number) => {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(() => reject("Timed out"), time);
  });
};

// const promis = Promise.resolve("Welcome back to promise world!");
// const fetcho = fetch("https://api.github.com/users/peruzzoarthur").then(
//   (data) => data.json()
// );

// console.log(
//   withTimeout(
//     fetcho.then((data) => console.log(data)),
//     1000
//   )
// );

// const crackPasscode = (networkID: string) => {
//   const nextDigit = (code: string, digit: number): Promise<string | null> => {
//     const newCode = code + digit.toString();
//     return withTimeout(joinWifi(networkID, newCode), 50)
//       .then(() => newCode)
//       .catch((failure) => {
//         if (failure === "Timed out") {
//           return nextDigit(newCode, 0);
//         } else if (digit < 9) {
//           return nextDigit(code, digit + 1);
//         } else {
//           throw failure;
//         }
//       });
//   };
//   return nextDigit("", 0);
// };

const joinWifi = (networkID: string, code: string): Promise<null> => {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      if (networkID != "HANGAR 2")
        return reject(new Error("Network not found"));
      const correct = "555555";
      if (code == correct) return accept(null);
      if (!correct.startsWith(code))
        return reject(new Error("Invalid passcode"));
    }, 20);
  });
};

const _crackPasscode = async (networkID: string): Promise<string> => {
  let partialCode = "";

  while (true) {
    for (let digit = 0; digit <= 9; digit++) {
      const currentAttempt = partialCode + digit;

      try {
        await withTimeout(joinWifi(networkID, currentAttempt), 50);
        return currentAttempt;
      } catch (error) {
        if (error === "Timed out") {
          partialCode = currentAttempt;
          break;
        }

        if (digit === 9) {
          throw error;
        }
      }
    }
  }
};

// crackPasscode("HANGAR 2").then(console.log);

// function* powers(n: number) {
//   for (let current = n; ; current *= n) {
//     yield current;
//   }
// }

// for (const power of powers(4)) {
//   if (power > 100) {
//     break;
//   }
//   console.log(power);
// }

// const start = Date.now();
// console.log(start);
// setTimeout(() => {
//   console.log("Timeout ran at", Date.now() - start);
// }, 20);
// while (Date.now() < start + 50) {}
// console.log("Wasted time until", Date.now() - start);

// Promise.resolve("Done.").then(console.log);
// console.log("Me first hehe");\

const activityGraph = (table: number[]) => {
  const widest = Math.max(50, Math.max(...table));
  return table
    .map((n, i) => {
      const width = (n / widest) * 20;
      const full = Math.floor(width),
        rest = " ▏▎▍▌▋▊▉"[Math.floor((width - full) * 8)];
      return String(i).padStart(2, " ") + " " + "█".repeat(full) + rest;
    })
    .join("\n");
};

type DateObject = {
  year: number;
  month: number;
  day: number;
  filename: string;
  fileContent: string;
};

function findDateObject(
  day: number,
  month: number,
  year: number,
  modifiedDays: DateObject[]
): DateObject {
  const query = modifiedDays.find(
    (md) => md.day === day && md.month === month && md.year === year
  );

  if (!query) {
    throw new Error("No data for the specified date :[");
  }

  return query;
}

async function activityTable(day: number, month: number, year: number) {
  const logFileList = await readTextFile("camera_logs.txt");
  const days = logFileList.split("\n");
  const regex = /activity-(\d{4})-(\d{2})-(\d{2})\.log/;

  // Map over the filenames, create promises, and await them with Promise.all
  const modifiedDays: (DateObject | undefined)[] = await Promise.all(
    days.map(async (filename) => {
      const match = filename.match(regex);
      if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const fileContent = await readTextFile(filename);
        return {
          year,
          month,
          day,
          filename,
          fileContent,
        };
      }
      return undefined;
    })
  );

  const validModifiedDays = modifiedDays.filter((item) => item !== undefined);

  if (validModifiedDays.length === 0) {
    throw new Error("There is no data recorded yet, sorry :(");
  }

  const query = findDateObject(day, month, year, validModifiedDays);

  const timestamps = query.fileContent.split("\n").map((str) => Number(str));

  const table: number[] = [];

  for (let i = 0; i < 24; i++) {
    table[i] = 0;
  }

  for (const timestamp of timestamps) {
    const hour = new Date(timestamp).getHours();
    table[hour]++;
  }
  return table;
}

console.log(activityGraph(await activityTable(24, 9, 2023)));
