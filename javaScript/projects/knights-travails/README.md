# Readme
---
## Live preview: [Knights Travails](https://mikeycos.github.io/theOdinProject/javaScript/projects/knights-travails/dist/)
---
### Ideas
1. Implement a user interface.
2. Refactor `generatePossibleMoves` function to use a Node object with a `previous` property referencing a Node pointing to a possible move.
---
### Questions
1. Is it bad practice to use an iterative method, returns a boolean primitive, inside a condition statement? For example, `if(newMoveV.every((element) => element !== null))`. 
---
### About
Project: Knights Travails

Hello world,

**Disclaimer**, I ended up using Google Bard (Gemini) when I was stuck.

<details>
<summary>My prompt</summary>

```js
// Can I use breadth first search on this object?
{ possibleMoves
: [{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
start: [4, 1] },
{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
start: [5, 2] },
{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
start: [2, 1] },
{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
start: [1, 2] }, 
{ possibleMoves:  [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
start: [4, 5] },
{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
start: [5, 4] },
{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
start: [2, 5] },
{ possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
start:  [1, 4] },
],
start:  [3, 3]
}

If so, how can I find the shortest path and return the path? Please provide the answer in pseudocode

```
</details>

<details>
<summary>What it returned</summary>

```
# Define a node containing its value, previous node, and distance
Node(value, previous, distance)

# Function to perform BFS and find the shortest path
function BFS(object, start):
  # Initialize variables
  queue = []
  visited = set()
  start_node = Node(start, None, 0)
  queue.append(start_node)

  # BFS loop
  while queue:
    current_node = queue.pop(0)
    visited.add(current_node.value)

    # Check if reaching the goal (defined by your criteria)
    if is_goal(current_node.value):
      return reconstruct_path(current_node)

    # Explore possible moves
    for neighbor in object[current_node.value]["possibleMoves"]:
      if neighbor["start"] not in visited:
        new_node = Node(neighbor["start"], current_node, current_node.distance + 1)
        queue.append(new_node)

  # No path found
  return None

# Function to reconstruct the path from the end node
function reconstruct_path(node):
  path = []
  while node:
    path.append(node.value)
    node = node.previous
  return path[::-1]

# Example usage (assuming reaching any element with "start" value as 5 is the goal)
shortest_path = BFS(object, [3, 3])
print(shortest_path)
```
</details>
<br/>

I do feel a bit guilty using a large language model (LLM) to move forward with this project, especially when I requested pseudocode. I learned that I am able to ask questions, and I wish I asked my question in The Odin Project's Discord community; specifically, `can I use breadth first search on this object?`. Would have I received an answer or an answered I wanted to hear? Maybe, maybe not. I wish I at least tried. Even so, when that question was on my mind, I wish I attempted performing breadth-first-search (BFS) on the object.

Prior to using an LLM, I managed to somehow get to the point of generating all possible moves. When I first created the `generatePossibleMoves`, it only generated the first set of possible moves given a starting point. Now, I needed to get the possible moves for the first set's possible moves, their subsequent possible moves and so on. In order to achieve this, I converted the function into a recursive function which utilizes a divide-and-conquer algorithm because to call stack kept exceeding the limit without it. Once the first set of possible moves are generated (stored in an array, `moves`), the moves are divided in halves, and each half is iterated to generate their possible moves.

The base case I came up with involves memoization, by looking if the `memo` array has an object with the same starting values. If that object exists, then the base case will return that object. Each time `generatePossibleMoves` runs, `obj` is pushed into `memo`. The `obj` has a start property and when the recursive calls are done, `obj` gets assigned a new property, `.possibleMoves`.

Looking back at the object, it somewhat does resemble a tree of sort because it starts with a starting point like a root node and it has children with more children and so on. With hindsight, that is a sign that I can use BFS to traverse the tree-like structure and find the shortest path(s).

<details>
<summary>Tree-like object</summary>

```js
{ 
  possibleMoves: [
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
    start: [4, 1]
  },
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
    start: [5, 2]
  },
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
    start: [2, 1]
  },
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
    start: [1, 2]
  }, 
  {
    possibleMoves:  [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
    start: [4, 5]
  },
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
    start: [5, 4]
  },
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
    start: [2, 5]
  },
  {
    possibleMoves: [{…}, {…}, {…}, {…}, {…}, {…}],
    start: [1, 4]
  },
  ],
  start: [3, 3]
}
```
</details>
<br/>
It was smooth sailing once I was able to move forward and apply BFS. In my BFS function, `findShortestPath`, the shortest path(s) are pushed into an array, the depth of the shortest path is recorded and used as a base case. If the queue no longer has nodes with the same value as the recorded depth, then `shortestPaths` is returned.

I created `printPath` function to iterate the array returned from the `findShortestPath` function. A linked list object is created at the start of each iteration and prepends each node of a path. The linked list method `.toString()` is used to log the path as such, `[3,3] -> [5,4] -> [4,6] -> [2,7]`.

This project nearly broke me. I cried and thought about how I made a mistake going down this journey. Despite using a LLM, I feel proud to have figure out how to generate all the knight's possible moves given a position. I did not realize how close I was to figuring out the the shortest path with the object generated by `generatePossibleMoves`. There are few other things I like to try and figure out, like using Node objects inside the `generatePossibleMoves` that will have a `.previous` property.

To failing forward, cheers!

---
### Notes
* The `knightMoves` function is declared globally in `index.js`
* The arguments passed into the `knightMoves` function must be an array of 2 vales. For example, `knightMoves([0,0],[3,3])`.
---
### Instructions
1. Click on [Knights Travails](https://mikeycos.github.io/theOdinProject/javaScript/projects/knights-travails/dist/)
2. Open browser's DevTools and go to the console.
3. In the browser's console:
  * Enter `knightMoves([3,3],[2,7])`
---

