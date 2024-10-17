import { readTextFile } from "../hangar2.ts";
type FileInfo = {
  year: number;
  month: number;
  day: number;
  weekDay: string;
  filename: string;
  fileContent: string;
};

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

function findDateObject(
  day: number,
  month: number,
  year: number,
  modifiedDays: FileInfo[]
): FileInfo {
  const fileInfo = modifiedDays.find(
    (md) => md.day === day && md.month === month && md.year === year
  );

  if (!fileInfo) {
    throw new Error("No data for the specified date :[");
  }
  return fileInfo;
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getFilesInfo = async () => {
  const logFileList = await readTextFile("camera_logs.txt");
  const days = logFileList.split("\n");
  const regex = /activity-(\d{4})-(\d{2})-(\d{2})\.log/;

  const filesInfo: (FileInfo | undefined)[] = await Promise.all(
    days.map(async (filename) => {
      const match = filename.match(regex);
      if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const fileContent = await readTextFile(filename);
        const weekDayNumber = new Date(
          Number(fileContent.split("\n")[0])
        ).getDay();
        const weekDay = weekDays[weekDayNumber];
        return {
          year,
          month,
          day,
          weekDay,
          filename,
          fileContent,
        };
      }
      return undefined;
    })
  );

  const validFilesInfo = filesInfo.filter((item) => item !== undefined);

  if (validFilesInfo.length === 0) {
    throw new Error("There is no data recorded yet, sorry :(");
  }
  return validFilesInfo;
};

async function activityTable(day: number, month: number, year: number) {
  const filesInfo = await getFilesInfo();
  const query = findDateObject(day, month, year, filesInfo);

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

const data = await getFilesInfo();

for (const fileInfo of data) {
  const table = await activityTable(
    fileInfo.day,
    fileInfo.month,
    fileInfo.year
  );
  console.log("-------------------------------------------------");
  console.log(
    `${fileInfo.day}/${fileInfo.month}/${fileInfo.year} - ${fileInfo.weekDay}`
  );
  console.log(activityGraph(table));
}
