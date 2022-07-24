package main

import "strconv"

func Persistence(n int) int {
	persistence := 0

	for n > 9 {
		n = MultiplyDigits(n)
		persistence++
	}

	return persistence
}

func MultiplyDigits(n int) int {
	result := 1

	for _, d := range GetDigits(n) {
		result *= d
	}

	return result
}

func GetDigits(n int) []int {
	digitChars := strconv.Itoa(n)
	digits := make([]int, 0, len(digitChars))

	for _, digitChar := range digitChars {
		d, _ := strconv.Atoi(string(digitChar))
		digits = append(digits, d)
	}

	return digits
}
