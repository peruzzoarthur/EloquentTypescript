export const readTextFile = (function () {
  const min = 60 * 1000,
    hour = min * 60,
    day = hour * 24;

  const logs: { name: string; time: number; day: number }[] = [],
    year = 2023,
    start = new Date(year, 8, 21).getTime();
  for (let i = 21; i <= 30; i++) {
    if (i != 27)
      logs.push({
        name: "activity-" + year + "-09-" + i + ".log",
        time: start + i * day,
        day: (i - 17) % 7,
      });
  }

  let rState = 81782;
  function r1() {
    rState ^= rState << 13;
    rState ^= rState << 17;
    rState ^= rState << 5;
    return (rState & 0xffffff) / 0xffffff;
  }
  function r(n: number) {
    return Math.floor(r1() * n);
  }

  const weekday = [
    1, 1, 1, 1, 1, 3, 8, 20, 10, 15, 15, 20, 25, 12, 15, 20, 18, 16, 10, 8, 8,
    7, 4, 2,
  ];
  const saturday = [
    1, 1, 1, 1, 1, 2, 3, 5, 3, 2, 2, 5, 8, 7, 9, 5, 5, 3, 3, 3, 4, 2, 2, 2,
  ];
  const sunday = [
    2, 2, 1, 1, 1, 1, 1, 2, 2, 3, 6, 6, 2, 1, 1, 1, 1, 4, 4, 4, 3, 2, 1, 1,
  ];

  const activity = (day: number, base: number) => {
    const schedule = day == 0 ? sunday : day == 6 ? saturday : weekday;
    const events: number[] = [];
    for (let h = 0; h < 24; h++) {
      const n = schedule[h] * 2 + r(5) - 2;
      for (let i = 0; i < n; i++) {
        const t = base + h * hour + r(hour);
        let j = events.length;
        while (j > 0 && events[j - 1] > t) --j;
        events.splice(j, 0, t);
      }
    }
    return events;
  };

  let generated = false;
  function generateLogs() {
    if (generated) return;
    generated = true;
    for (const log of logs) {
      files[log.name] = activity(log.day, log.time).join("\n");
    }
  }

  const files: Record<string, string> = {
    "shopping_list.txt": "Peanut butter\nBananas",
    "old_shopping_list.txt": "Peanut butter\nJelly",
    "package.json":
      '{"name":"test project","author":"cāāw-krö","version":"1.1.2"}',
    "plans.txt":
      "* Write a book\n  * Figure out asynchronous chapter\n  * Find an artist for the cover\n  * Write the rest of the book\n\n* Don't be sad\n  * Sit under tree\n  * Study bugs\n",
    "camera_logs.txt": logs.map((l) => l.name).join("\n"),
  };

  return function readTextFile(filename: string): Promise<string> {
    if (/^activity/.test(filename)) generateLogs();
    const file =
      filename == "files.list"
        ? Object.keys(files).join("\n")
        : files[filename];

    if (file == null) {
      throw new Error(`File ${filename} does not exist`);
    }
    return Promise.resolve(file);
  };
})();
