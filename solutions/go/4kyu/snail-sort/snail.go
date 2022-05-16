package main

type SnailSort struct {

	// Grid data
	grid        [][]int
	width       int
	height      int
	visitedGrid [][]bool

	// Directions data
	directions           [][]int
	direction            []int
	currentDirection     []int
	directionJustChanged bool
	directionIndex       int

	// Position data
	currentPosition []int
	nextPosition    []int

	// Result
	result []int
}

// X-axis => vertical, positive down
// Y-axis => horizontal, positive right
func NewSnailSort(grid [][]int) *SnailSort {
	s := &SnailSort{}
	s.grid = grid
	s.height = len(grid)
	s.width = len(grid[0])
	s.visitedGrid = s.initVisitedGrid()
	s.directions = [][]int{
		{0, 1},  // Right
		{1, 0},  // Down
		{0, -1}, // Left
		{-1, 0}, // Up
	}
	s.currentPosition = []int{0, 0}
	s.currentDirection = nil
	s.nextPosition = nil
	s.result = make([]int, 0, s.width*s.height)
	return s
}

func (s *SnailSort) initVisitedGrid() [][]bool {
	visited := make([][]bool, 0, s.height)
	for i := 0; i < s.height; i++ {
		visited = append(visited, make([]bool, s.width))
	}
	return visited
}

func (s *SnailSort) calculateNextPosition() []int {
	s.nextPosition = []int{
		s.currentPosition[0] + s.currentDirection[0],
		s.currentPosition[1] + s.currentDirection[1],
	}

	return s.nextPosition
}

func (s *SnailSort) isPosition(pos []int) bool {
	x, y := pos[0], pos[1]

	// Vertically out of bound?
	if x < 0 || x > s.height {
		return false
	}

	// Horizontally out of bound?
	if y < 0 || y > s.width {
		return false
	}

	// Already visited?
	if s.visitedGrid[x][y] {
		return false
	}

	return true
}

func (s *SnailSort) changeDirection() {
	s.directionJustChanged = true
	s.directionIndex += 1
	if s.directionIndex >= len(s.directions) {
		s.directionIndex -= len(s.directions)
	}
	s.direction = s.directions[s.directionIndex]
}

func (s *SnailSort) changePosition() {
	x, y := s.nextPosition[0], s.nextPosition[1]
	s.currentPosition = []int{x, y}
	s.visitedGrid[x][y] = true
	s.result = append(s.result, s.grid[x][y])
	s.directionJustChanged = false
}

func (s *SnailSort) Sort() []int {

	if len(s.grid[0]) == 0 {
		return []int{}
	}

	s.visitedGrid[0][0] = true
	s.directionIndex = 0
	s.direction = s.directions[0]
	s.currentPosition = []int{0, 0}
	s.directionJustChanged = false
	s.result = []int{s.grid[0][0]}

	for {
		s.visitedGrid[0][0] = true

		if !s.isPosition(s.calculateNextPosition()) {
			if s.directionJustChanged {
				break
			}

			s.changeDirection()
			continue
		}

		s.changePosition()
	}

	return s.result
}
