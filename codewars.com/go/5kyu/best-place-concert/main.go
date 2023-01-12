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
	ErrEmptyGrid     = errors.New("empty grid")
	ErrUnavaibleSpot = errors.New("unavailable spot")
	dirs             = []int{Top, Right, Bottom, Left}
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
	grid := initGrid(danceFloor)
	size := len(grid) * len(grid)
	availables := make([]AvailableSpot, 0, size)

	for i, line := range grid {
		for j, spot := range line {

			if grid[i][j] != ' ' {
				continue
			}

			score := 0

			for _, dir := range dirs {

			}
		}
	}

	return pos[0], pos[1]
}

func initGrid(danceFloor []string) Floor {
	result := make(Floor, len(danceFloor))
	for _, line := range danceFloor {
		result = append(result, []rune(line))
	}
	return result
}

func lookAround(grid Floor, pos Position, dir Direction) (Position, error) {
	newPos := Position{pos[0], pos[1]}
	w := len(grid)

	if w == 0 {
		return newPos, ErrEmptyGrid
	}

	h := len(grid[0])

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
	spotIsEmpty := grid[newPos[0]][newPos[1]] == ' '

	if invalidRowIndex || invalidColIndex || !spotIsEmpty {
		return newPos, ErrUnavaibleSpot
	}

	return newPos, nil
}
