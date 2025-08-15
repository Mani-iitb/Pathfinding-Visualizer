// Performs DFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, allowing us to compute the path by backtracking.
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [];
  
  startNode.isVisited = true;
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();

    // Skip if wall
    if (currentNode.isWall) continue;

    visitedNodesInOrder.push(currentNode);

    // Found finish
    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }

  return visitedNodesInOrder; // In case finish is unreachable
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

// Backtracks from the finishNode to find the path.
// Only works when called *after* the dfs method above.
export function getNodesInShortestPathOrder_dfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
