// https://www.codewars.com/kata/6112917ef983f2000ecbd506/train/go
package main

import (
	"errors"
	"fmt"
	"math"
	"sort"
	"unicode"
)

func main() {
	fmt.Println(
		BestPlace([]string{
			"  A  AA",
			"  A  A ",
		}),
	)
}

type Floor struct {
	grid   [][]rune
	width  int
	height int
	size   int
}

type Position struct {
	row int
	col int
}

type Direction int

const (
	Top = iota
	TopRight
	Right
	BottomRight
	Bottom
	BottomLeft
	Left
	TopLeft
)

var (
	ErrOutOfBound = errors.New("out of bound")
	emptySpot     = ' '
)

func BestPlace(danceFloor []string) (int, int) {
	f := NewFloor(danceFloor)
	scores := make([]float64, 0, f.size)
	spots := make(map[float64]Position, f.size)

	for row := range f.grid {
		for col := range f.grid[row] {

			pos := Position{row, col}

			if f.at(pos) != emptySpot {
				continue
			}

			score := f.factorStageDistance(pos)
			score = f.factorFrontPerson(pos, score)
			score = f.factorBeerHolders(pos, score)
			score = f.factorMoshPits(pos, score)

			scores = append(scores, score)
			spots[score] = pos
		}
	}

	sort.Sort(sort.Reverse(sort.Float64Slice(scores)))
	bestScore := scores[0]
	bestSpot := spots[bestScore]

	// TODO
	fmt.Println(spots)
	fmt.Println(scores)

	return bestSpot.row, bestSpot.col
}

func NewFloor(danceFloor []string) *Floor {

	grid := make([][]rune, 0, len(danceFloor))

	for _, line := range danceFloor {
		grid = append(grid, []rune(line))
	}

	width, height := len(grid[0]), len(grid)

	return &Floor{
		grid:   grid,
		width:  width,
		height: height,
		size:   width * height,
	}
}

func (f *Floor) at(pos Position) rune {
	return f.grid[pos.row][pos.col]
}

func (f *Floor) factorStageDistance(pos Position) float64 {
	return float64(f.height - pos.row)
}

func (f *Floor) factorFrontPerson(pos Position, score float64) float64 {
	frontPos, err := f.lookTowards(pos, Top)
	if err != nil {
		return score
	}
	frontSpot := f.at(frontPos)
	if frontSpot == emptySpot {
		return score
	}
	exp := float64(byte(unicode.ToLower(frontSpot)) - byte('a') + 1)
	factor := math.Pow(0.99, exp)
	return score * factor
}

func (f *Floor) factorBeerHolders(pos Position, score float64) float64 {

	count := 0

	for _, dir := range []Direction{Top, Right, Bottom, Left} {
		newPos, err := f.lookTowards(pos, dir)

		if err != nil {
			continue
		}

		if unicode.IsUpper(f.at(newPos)) {
			count += 1
		}
	}

	if count == 0 {
		return score
	}

	factor := math.Pow(0.80, float64(count))
	return score * factor
}

func (f *Floor) factorMoshPits(pos Position, score float64) float64 {

	adjacent := 0
	dirs := []Direction{
		Top,
		TopRight,
		Right,
		BottomRight,
		Bottom,
		BottomLeft,
		Left,
		TopLeft,
		Top,
	}

	for _, dir := range dirs {
		newPos, err := f.lookTowards(pos, dir)

		if err != nil {
			continue
		}

		if f.at(newPos) != emptySpot {
			adjacent = 0
			continue
		}

		adjacent += 1
	}

	if adjacent < 3 {
		return score
	}

	// TODO
	maxScore := float64(f.height)
	newScore := score - 2*maxScore
	fmt.Printf("MOSHPIT! {%d %d} score %f => %f\n", pos.row, pos.col, score, newScore)
	return newScore

	// maxScore := float64(f.height)
	// return score - 2*maxScore
}

func (f *Floor) lookTowards(from Position, dir Direction) (Position, error) {
	deltaRow, deltaCol := 0, 0

	switch dir {
	case Top:
		deltaRow, deltaCol = -1, 0
	case TopRight:
		deltaRow, deltaCol = -1, 1
	case Right:
		deltaRow, deltaCol = 0, 1
	case BottomRight:
		deltaRow, deltaCol = 1, 1
	case Bottom:
		deltaRow, deltaCol = 1, 0
	case BottomLeft:
		deltaRow, deltaCol = 1, -1
	case Left:
		deltaRow, deltaCol = 0, -1
	case TopLeft:
		deltaRow, deltaCol = -1, -1
	}

	to := Position{from.row + deltaRow, from.col + deltaCol}

	if to.row < 0 || to.row >= f.height || to.col < 0 || to.col >= f.width {
		return to, ErrOutOfBound
	}

	return to, nil
}
