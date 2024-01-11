const Queue = function () {
  this.items = [];
};
Queue.prototype.enqueue = function (obj) {
  this.items.push(obj);
};
Queue.prototype.dequeue = function () {
  return this.items.shift();
};
Queue.prototype.isEmpty = function () {
  return this.items.length === 0;
};

/*
 * Performs a breadth-first search on a graph
 * @param {array} graph - Graph, represented as adjacency lists.
 * @param {number} source - The index of the source vertex.
 * @returns {array} Array of objects describing each vertex, like
 *     [{distance: _, predecessor: _ }]
 */
const doBFS = function (graph, source) {
  const bfsInfo = [];

  for (let i = 0; i < graph.length; i += 1) {
    bfsInfo[i] = {
      distance: null,
      predecessor: null,
    };
  }

  bfsInfo[source].distance = 0;

  const queue = new Queue();
  queue.enqueue(source);

  // Traverse the graph

  // As long as the queue is not empty:
  //  Repeatedly dequeue a vertex u from the queue.
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    console.log(u);
    console.log(graph[u]);
    for (let v = 0; v < graph[u].length; v += 1) {
      const neighbor = graph[u][v];
      console.log(neighbor);
      if (bfsInfo[neighbor].distance === null) {
        bfsInfo[neighbor].distance = bfsInfo[u].distance + 1;
        bfsInfo[neighbor].predecessor = u;
        queue.enqueue(neighbor);
      }
    }
  }

  //  For each neighbor v of u that has not been visited:
  //     Set distance to 1 greater than u's distance
  //     Set predecessor to u
  //     Enqueue v
  //
  //  Hint:
  //  use graph to get the neighbors,
  //  use bfsInfo for distances and predecessors

  return bfsInfo;
};

export default doBFS;
