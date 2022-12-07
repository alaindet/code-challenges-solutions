package main

import "strconv"

// DOES NOT WORK
// https://www.codewars.com/kata/5518a860a73e708c0a000027/train/go
func LastDigit(nums []int) int {

	count := len(nums)

	if count == 0 {
		return 1
	}

	if count == 2 {
		return lastDigitOfPower(nums[0], nums[1])
	}

	result := lastDigitOfPower(nums[count-2], nums[count-1])

	for i := count - 3; i >= 0; i-- {
		result = lastDigitOfPower(nums[i], result)
	}

	return result
}

// Works
func lastDigitOfNum(a int) int {
	digits := getDigits(a)
	return digits[len(digits)-1]
}

// Works
func lastDigitOfPower(a int, b int) int {

	if b == 0 {
		return 1
	}

	if b == 1 {
		return lastDigitOfNum(a)
	}

	result := lastDigitOfNum(lastDigitOfNum(a) * lastDigitOfNum(a))

	for i := 2; i < b; i++ {
		result = lastDigitOfNum(result * lastDigitOfNum(a))
	}

	return result
}

// Works
func getDigits(n int) []int {
	digitChars := strconv.Itoa(n)
	digits := make([]int, 0, len(digitChars))

	for _, digitChar := range digitChars {
		d, _ := strconv.Atoi(string(digitChar))
		digits = append(digits, d)
	}

	return digits
}
