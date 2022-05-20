package main

const (
	air  = 0
	rock = 1
)

// This does not work for very large arrays (thousands of elements)
// https://leetcode.com/problems/trapping-rain-water/
func trap(height []int) int {

	water := 0
	size := len(height)
	lines := [][]int{}

	// Build the 2D grid in reverse (lines go from bottom up)
	for {
		line := make([]int, size)
		lineIsFlat := true

		for i, h := range height {
			if h > 0 {
				line[i] = 1
				lineIsFlat = false
				height[i]--
			} else {
				line[i] = 0
			}
		}

		if lineIsFlat {
			break
		} else {
			lines = append(lines, line)
		}
	}

	for _, line := range lines {

		waterLine := 0
		for i, cell := range line {

			// Is it a rock cell?
			if cell == rock {
				water += waterLine
				waterLine = 0
				continue
			}

			// Is it on the edge?
			if i == 0 || i == (size-1) {
				waterLine = 0
				continue
			}

			// Is it an air cell with a left rock cell?
			if line[i-1] == rock {
				waterLine = 1
				continue
			}

			// Is it just air?
			if waterLine > 0 {
				waterLine++
			}
		}
	}

	return water
}
