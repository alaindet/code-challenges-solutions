package main

// https://leetcode.com/problems/trapping-rain-water/
func trap(height []int) int {
	water := 0
	size := len(height)

	for {
		waterSegment := 0
		allSubmerged := true

		for i := 0; i < size; i++ {

			// Is it a rock?
			if height[i] > 0 {
				water += waterSegment
				waterSegment = 0
				allSubmerged = false
				height[i]-- // Sink
				continue
			}

			// Is it an air cell on the edge?
			if i == 0 || i == (size-1) {
				waterSegment = 0
				height[i]-- // Sink
				continue
			}

			// Is it an air cell with a left (sunken) rock?
			if height[i-1] >= 0 {
				waterSegment = 1
				height[i]--
				continue
			}

			// Is it just an air cell?
			if waterSegment > 0 {
				waterSegment++
			}

			// Sink the cell
			height[i]--
		}

		if allSubmerged {
			break
		}
	}

	return water
}
