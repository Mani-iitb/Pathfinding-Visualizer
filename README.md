# Pathfinding Visualizer

A React-based interactive tool to visualize and understand various pathfinding algorithms in action.  
This project lets you **create grids**, **add walls**, **apply terrain weights** (mud, grass), and **watch algorithms find their path** step-by-step.

---

## Features

- **Interactive Grid Editing**

  - Place **Start** and **End** nodes
  - Add or remove **walls** (impassable tiles)
  - Draw **mud** and **grass** tiles with different movement costs
  - Change Start/End positions dynamically
  - Reset grid instantly

- **Supported Algorithms**

  - Dijkstra’s Algorithm (weighted shortest path)
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Greedy Best-First Search (GBFS)
  - (Optional) A\* Search (recommended for weight-aware heuristic search)

- **Visualization**
  - Step-by-step animation of visited nodes
  - Highlighted final shortest path
  - Adjustable algorithm selection via dropdown

---

## How It Works

1. **Change start and end point**, if needed.

2. **Select a Weight Type** from the dropdown:

   - **Wall** → Blocks movement
   - **Mud** → Higher cost (weight 5)
   - **Grass** → Medium cost (weight 2)

3. **Click & Drag** on the grid to add walls or weighted tiles.

4. **Choose an Algorithm to visualize**:

   - Dijkstra: Finds the shortest path in weighted graphs.
   - BFS: Finds the shortest path in unweighted graphs.
   - DFS: Explores deep first (not guaranteed shortest path).
   - GBFS: Chooses nodes closest to the goal (by heuristic only).

5. **Reset** to start fresh.

---
