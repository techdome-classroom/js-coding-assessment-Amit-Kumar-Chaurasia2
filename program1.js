const getTotalIsles = function(grid) {
  // Edge case: If grid is empty, return 0
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  // Directions for moving up, down, left, right
  const directions = [
    [-1, 0],  // Up
    [1, 0],   // Down
    [0, -1],  // Left
    [0, 1]    // Right
  ];

  // Helper function to perform DFS
  const dfs = (r, c) => {
    // Stack for DFS
    const stack = [[r, c]];

    // Iterate through the stack to mark connected land
    while (stack.length > 0) {
      const [x, y] = stack.pop();

      // If out of bounds or water, skip
      if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] === 'W') {
        continue;
      }

      // Mark the current land as visited (turn 'L' into 'W')
      grid[x][y] = 'W';

      // Explore all 4 directions
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        stack.push([newX, newY]);
      }
    }
  };

  // Traverse the entire grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // If we find unvisited land ('L'), start DFS
      if (grid[i][j] === 'L') {
        dfs(i, j);  // Mark all connected land as visited
        islandCount++;  // Increment the island count
      }
    }
  }

  return islandCount;
};

// Export the function for testing or use in other modules
module.exports = getTotalIsles;
