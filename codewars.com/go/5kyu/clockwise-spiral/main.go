// https://www.codewars.com/kata/536a155256eb459b8700077e/train/go
package main

import "fmt"

const (
	right = iota
	down
	left
	top
)

func main() {
	s := CreateSpiral(3)
	fmt.Println(s)
}

/*
N = 4

01	02	03	04
12	13	14	05
11	16	15	06
10	09	08	07

Clockwise spiral
- - - \
/ - \ |
| < / |
\ - - /
*/
func CreateSpiral(n int) [][]int {
	dirs := []int{right, down, left, top}
	visited := makeSquareGrid(n, false)
	result := makeSquareGrid(n, 0)
	prevPos := [2]int{0, 0}
	pos := [2]int{0, 0}
	i := 1

mainLoop:
	for {
		for _, dir := range dirs {
		dirLoop:
			for {
				switch dir {
				case right:
					pos[1] = pos[1] + 1
				case down:
					pos[0] = pos[0] + 1
				case left:
					pos[1] = pos[1] - 1
				case top:
					pos[0] = pos[0] - 1
				}

				if pos[0] >= n || pos[1] >= n || visited[pos[0]][pos[1]] {
					pos = prevPos
					break dirLoop
				}

				visited[pos[0]][pos[1]] = true
				result[pos[0]][pos[1]] = i
				i += 1
				prevPos = pos
			}
		}

		if i == n {
			break mainLoop
		}
	}

	return result
}

func makeSquareGrid[T any](n int, defaultVal T) [][]T {
	grid := make([][]T, 0, n)

	for i := 0; i < n; i++ {
		row := make([]T, 0, n)
		for j := 0; j < n; j++ {
			row = append(row, defaultVal)
		}
		grid = append(grid, row)
	}

	return grid
}
