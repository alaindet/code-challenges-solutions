// https://www.codewars.com/kata/536a155256eb459b8700077e/train/go
package main

import (
	"errors"
)

const (
	Right = iota
	Down
	Left
	Top
)

var (
	ErrOutOfBound     = errors.New("out of bound")
	ErrAlreadyVisited = errors.New("already visited")
)

func CreateSpiral(n int) [][]int {

	if n < 1 {
		return [][]int{}
	}

	dirs := []int{Right, Down, Left, Top}
	grid := makeSquareGrid(n, 0)
	pos := [2]int{0, 0}
	i := 1
	last := n*n + 1

	grid[pos[0]][pos[1]] = i
	i += 1

	for {
		for _, dir := range dirs {
			for {
				newPos, err := move(grid, pos, dir)

				if err != nil {
					break
				}

				grid[newPos[0]][newPos[1]] = i
				pos = newPos
				i += 1
			}

			if i == last {
				return grid
			}
		}
	}
}

func move(grid [][]int, pos [2]int, dir int) ([2]int, error) {
	newPos := pos
	size := len(grid)

	switch dir {
	case Right:
		newPos[1] = pos[1] + 1
	case Down:
		newPos[0] = pos[0] + 1
	case Left:
		newPos[1] = pos[1] - 1
	case Top:
		newPos[0] = pos[0] - 1
	}

	if newPos[0] >= size || newPos[0] < 0 || newPos[1] >= size || newPos[1] < 0 {
		return pos, ErrOutOfBound
	}

	if grid[newPos[0]][newPos[1]] != 0 {
		return pos, ErrAlreadyVisited
	}

	return newPos, nil
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
