package main

func CartesianNeighbor(x, y int) [][]int {
	return [][]int{
		{x - 1, y - 1}, // top left
		{x + 0, y - 1}, // top center
		{x + 1, y - 1}, // top right

		{x - 1, y + 0}, // left
		{x + 1, y + 0}, // right

		{x - 1, y + 1}, // bottom left
		{x + 0, y + 1}, // bottom center
		{x + 1, y + 1}, // bottom right
	}
}
