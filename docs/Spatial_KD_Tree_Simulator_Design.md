# 2D KD-Tree Interactive HTML5 Canvas Spatial Simulator

## 1. Visualization Mechanics
- Renders 2D spatial partitioning live on an HTML5 `<canvas>` element at 60 FPS.
- Visualizes alternating axis-aligned hyperplane cuts (vertical red lines for $x$-splits, horizontal blue lines for $y$-splits).

## 2. Interactive Nearest Neighbor Querying
- Tracks user mouse coordinates as the dynamic query point.
- Renders the circular search radius expanding dynamically, demonstrating in real-time how subtrees whose bounding rectangles do not intersect the query radius are pruned from traversal.
