export type Graph = Record<string, string[]>;

export function buildGraph(edges: string[]): Graph {
  const graph: Record<string, string[]> = {};
  function addEdge(from: string, to: string) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (const [from, to] of edges.map((r) => r.split("-") as [string, string])) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
