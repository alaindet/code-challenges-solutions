package main

import (
	"strconv"
	"strings"
)

// https://www.codewars.com/kata/541c8630095125aba6000c00/train/go
func DigitalRoot(n int) int {
	result := n

	for {
		if hasOneDigit(result) {
			break
		}
		result = sumDigits(result)
	}

	return result
}

func sumDigits(n int) int {
	if hasOneDigit(n) {
		return n
	}

	result := 0
	digits := strings.Split(strconv.Itoa(n), "")

	for _, digit := range digits {
		val, _ := strconv.Atoi(digit)
		result += val
	}

	return result
}

func hasOneDigit(n int) bool {
	return n >= -9 && n <= 9
}
