import {
  goalOrientedRobot,
  routeRobot,
  runRobot,
  VillageState,
} from "../robot.ts";

type RobotFunction = (
  state: VillageState,
  memory: string[]
) => { direction: string; memory: string[] };

function compareRobots(
  robot1: RobotFunction,
  memory1: string[],
  robot2: RobotFunction,
  memory2: string[]
) {
  const robot1Turns: number[] = [];
  const robot2Turns: number[] = [];
  for (let i = 0; i < 100; i++) {
    const state = VillageState.random();
    const turnsRobot1 = runRobot(state, robot1, memory1);
    robot1Turns.push(turnsRobot1);

    const turnsRobot2 = runRobot(state, robot2, memory2);
    robot2Turns.push(turnsRobot2);
  }
  return {
    robot1: robot1Turns.reduce((prev, curr) => prev + curr) / 100,
    robot2: robot2Turns.reduce((prev, curr) => prev + curr) / 100,
  };
}

console.log(compareRobots(routeRobot, [], goalOrientedRobot, []));
