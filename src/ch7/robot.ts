import { buildGraph, type Graph } from "./buildGraphs.ts";
import { roads } from "./roads.ts";

const roadGraph = buildGraph(roads);
type Parcel = {
  place: string;
  address: string;
};

type Action = {
  direction: string;
  memory: string[];
};
function randomPick(array: string[]): string {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
export class VillageState {
  constructor(public place: string, public parcels: Parcel[]) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination: string): VillageState {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      const parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) {
            return p;
          }
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
  static random(parcelCount: number = 5): VillageState {
    const parcels: Parcel[] = [];
    for (let i = 0; i < parcelCount; i++) {
      const address = randomPick(Object.keys(roadGraph));
      let place: string;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({ place, address });
    }
    return new VillageState("Post Office", parcels);
  }
}

export function runRobot(
  state: VillageState,
  robot: (state: VillageState, memory: string[]) => Action,
  memory: string[] = []
) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
      // break;
    }
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

function _randomRobot(state: VillageState): Action {
  return { direction: randomPick(roadGraph[state.place]), memory: [] };
}

// runRobot(VillageState.random(), randomRobot);

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];
export function routeRobot(_state: VillageState, memory: string[]) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, []);

function findRoute(graph: Graph, from: string, to: string): string[] {
  const work: { at: string; route: string[] }[] = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    const { at, route } = work[i];
    for (const place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
  return [];
}

export function goalOrientedRobot(
  state: VillageState,
  route: string[] = []
): Action {
  if (route.length === 0) {
    const parcel = state.parcels[0];
    if (parcel.place !== state.place) {
      route = findRoute(roadGraph, state.place, parcel.place);
    } else {
      route = findRoute(roadGraph, state.place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

console.log(runRobot(VillageState.random(), goalOrientedRobot, []));
