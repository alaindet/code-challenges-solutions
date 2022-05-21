package main

// https://leetcode.com/problems/trapping-rain-water/
// This is a fast solution but still fails for big arrays (N: 20k, max val: 100k)
func trap(height []int) int {
	water := 0
	lineCh := make(chan []bool)
	waterCh := make(chan int)

	// Generate lines
	go func(ch chan []bool) {
		threshold := 0
		for {
			if line, done := generateLine(&height, threshold); done {
				break
			} else {
				ch <- *line
				threshold++
			}
		}
		close(lineCh)
	}(lineCh)

	// Count water cells in lines
	go func(inputCh chan []bool, outputCh chan int) {
		for line := range lineCh {
			waterCh <- countWaterInLine(line)
		}
		close(waterCh)
	}(lineCh, waterCh)

	for waterCount := range waterCh {
		water += waterCount
	}

	return water
}

func generateLine(arr *[]int, threshold int) (*[]bool, bool) {
	line := make([]bool, len(*arr))
	allBelow := true
	for i, val := range *arr {
		if val > threshold {
			line[i] = true
			allBelow = false
		}
	}

	if allBelow {
		return nil, true
	}

	return &line, false
}

func countWaterInLine(line []bool) int {
	waterInLine := 0
	size := len(line)
	waterSegment := 0

	for i, cell := range line {

		// Is it a rock cell?
		if cell {
			waterInLine += waterSegment
			waterSegment = 0
			continue
		}

		// Is it an air cell on the edge?
		if i == 0 || i == (size-1) {
			waterSegment = 0
			continue
		}

		// Is it an air cell with a left rock cell?
		if line[i-1] {
			waterSegment = 1
			continue
		}

		// Is it just an air cell surrounded by air cells?
		if waterSegment > 0 {
			waterSegment++
		}
	}

	return waterInLine
}
