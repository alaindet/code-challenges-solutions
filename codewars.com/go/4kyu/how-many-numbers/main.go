package main

// WARNING: Does not work for big numbers
// https://www.codewars.com/kata/5877e7d568909e5ff90017e6/train/go
func FindAll(digitsSum, digitsCount int) []int {

	var count, lowest, highest int
	max := 1

	for d := 1; d <= digitsCount; d++ {
		max *= 10
	}

	// Consider only numbers with same digits count
	for i := max / 10; i < max; i++ {

		if !isValid(i, digitsCount, max, digitsSum) {
			continue
		}

		if count == 0 {
			lowest = i
			highest = i
		}

		count++

		if i < lowest {
			lowest = i
		}

		if i > highest {
			highest = i
		}

		i++
	}

	if count == 0 {
		return []int{}
	}

	return []int{count, lowest, highest}
}

func isValid(n, nLength, max, digitsSum int) bool {
	digits := getDigits(n, nLength, max)
	prev := -1
	sum := 0

	for _, d := range digits {

		// Digits should be in increasing order
		if d < prev {
			return false
		}

		sum += d
		prev = d
	}

	return digitsSum == sum
}

func getDigits(n, nLength, max int) []int {
	digits := make([]int, 0, nLength)
	temp := n
	tempDiv := max

	for tempDiv > 0 {

		// Avoid leading zeros
		if tempDiv > temp && len(digits) == 0 {
			tempDiv /= 10
			continue
		}

		d := temp / tempDiv
		digits = append(digits, d)
		temp -= d * tempDiv
		tempDiv /= 10
	}

	return digits
}
