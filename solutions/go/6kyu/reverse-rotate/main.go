package main

import (
	"strconv"
	"strings"
)

// https://www.codewars.com/kata/56b5afb4ed1f6d5fb0000991/train/go
func Revrot(digits string, n int) string {

	var result string

	if n <= 0 || digits == "" {
		return ""
	}

	if n > len(digits) {
		return ""
	}

	chunksCount := int(len(digits) / n)

	for i := 0; i < chunksCount; i++ {
		start := i
		end := i + n - 1
		chunkDigits := digits[start:end]

		if isSumOfCubedDigitsEven(chunkDigits) {
			result += reverse(chunkDigits)
		} else {
			result += rotateLeft(chunkDigits)
		}
	}

	return result
}

func isSumOfCubedDigitsEven(digits string) bool {
	sum := 0

	for _, d := range digits {
		n, _ := strconv.Atoi(string(d))
		sum += n * n * n
	}

	return sum%2 == 0
}

func reverse(input string) string {

	var result strings.Builder
	chars := []rune(input)
	count := len(input)

	for i := count - 1; i >= 0; i-- {
		result.WriteRune(chars[i])
	}

	return result.String()
}

func rotateLeft(input string) string {
	chars := []rune(input)
	return string(chars[1:]) + string(chars[0])
}

func rotateRight(input string) string {
	chars := []rune(input)
	count := len(chars)
	return string(chars[count-1]) + string(chars[:count-1])
}
