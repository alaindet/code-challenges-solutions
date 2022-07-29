package main

import (
	"math"
)

// https://www.codewars.com/kata/52a382ee44408cea2500074c/train/go
func Determinant(m [][]int) int {
	size := len(m)

	if size == 1 {
		return m[0][0]
	}

	if size == 2 {
		a, b, c, d := m[0][0], m[0][1], m[1][0], m[1][1]
		return a*d - b*c
	}

	result := 0

	for i, val := range m[0] {
		sign := int(math.Pow(-1, float64(i)))
		result += sign * val * Determinant(getSubMatrix(m, i))
	}

	return result
}

func getSubMatrix(m [][]int, colToRemove int) [][]int {
	size := len(m)
	subMatrix := make([][]int, 0, size-1)

	for i := 1; i < size; i++ {
		row := make([]int, 0, size-1)

		for j := 0; j < size; j++ {
			if j != colToRemove {
				row = append(row, m[i][j])
			}
		}

		subMatrix = append(subMatrix, row)
	}

	return subMatrix
}
