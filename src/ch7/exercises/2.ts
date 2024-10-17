import { findRoute, roadGraph, type VillageState } from "../robot.ts";

export function lazyRobot(state: VillageState, route: string[] = []) {
  function score({ route, pickUp }: { route: string[]; pickUp: boolean }) {
    return (pickUp ? 0.5 : 0) - route.length;
  }
  if (route.length == 0) {
    // Describe a route for every parcel
    const routes = state.parcels.map((parcel) => {
      if (parcel.place != state.place) {
        return {
          route: findRoute(roadGraph, state.place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, state.place, parcel.address),
          pickUp: false,
        };
      }
    });
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }
  return { direction: route[0], memory: route.slice(1) };
}
