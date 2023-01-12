// https://www.codewars.com/kata/6112917ef983f2000ecbd506/train/go
package main

import "errors"

func main() {
	// ...
}

type Floor [][]rune
type Position [2]int
type Direction int
type AvailableSpot struct {
	pos   Position
	score float64
}

const (
	Top = iota
	Right
	Bottom
	Left
)

var (
	ErrUnavaibleSpot = errors.New("unavailable spot")
	emptySpot        = ' '
)

/*
- Spot must be empty
- Initial score is calc'd from stage distance
- Person in front account for *0.99^H where H is the index of letter
- Each neighbor beer (up, right, bottom, left) accounts for *0.8
- Moshpits should be marked and deprioritized
*/
func BestPlace(danceFloor []string) (int, int) {
	pos := Position{-1, -1}
	grid, w, h := initGrid(danceFloor)
	size := len(grid) * len(grid)
	availables := make([]AvailableSpot, 0, size)

	for row, _ := range grid {
		for col, _ := range grid[row] {

			if grid[row][col] != emptySpot {
				continue
			}

			score := float64(h - row)

			// TODO: Account for other factors
			// for _, dir := range []int{Top, Right, Bottom, Left} {

			// }

			pos := Position{row, col}
			availables = append(availables, AvailableSpot{pos, score})
		}
	}

	return pos[0], pos[1]
}

func initGrid(danceFloor []string) (Floor, int, int) {
	grid := make(Floor, len(danceFloor))
	for _, line := range danceFloor {
		grid = append(grid, []rune(line))
	}
	w, h := len(grid[0]), len(grid)
	return grid, w, h
}

func lookAround(grid Floor, pos Position, dir Direction) (Position, error) {
	newPos := Position{pos[0], pos[1]}
	w, h := len(grid[0]), len(grid)

	switch dir {
	case Top:
		newPos[0] = newPos[0] - 1
	case Right:
		newPos[1] = newPos[1] + 1
	case Bottom:
		newPos[0] = newPos[0] + 1
	case Left:
		newPos[1] = newPos[1] - 1
	}

	invalidRowIndex := newPos[0] < 0 || newPos[0] >= h
	invalidColIndex := newPos[1] < 0 || newPos[1] >= w
	spotIsEmpty := grid[newPos[0]][newPos[1]] == emptySpot

	if invalidRowIndex || invalidColIndex || !spotIsEmpty {
		return newPos, ErrUnavaibleSpot
	}

	return newPos, nil
}
