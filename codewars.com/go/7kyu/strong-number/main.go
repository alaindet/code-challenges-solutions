// https://www.codewars.com/kata/5a4d303f880385399b000001/train/go
package main

import (
	"fmt"
	"strconv"
)

func factorial(n int) int64 {

	if n == 0 {
		return 1
	}

	var result int64 = 1

	for i := 1; i <= n; i++ {
		result *= int64(i)
	}

	return result
}

func splitDigits(n int) []int {
	str := strconv.Itoa(n)
	result := make([]int, 0, len(str))
	for _, digit := range str {
		parsedDigit, err := strconv.Atoi(string(digit))
		_ = err
		result = append(result, parsedDigit)
	}
	return result
}

func isStrong(n int) bool {
	total := 0
	for _, digit := range splitDigits(n) {
		total += int(factorial(digit))
	}
	return total == n
}

func Strong(n int) string {
	if isStrong(n) {
		return "STRONG!!!!"
	}

	return "Not Strong !!"
}

type TestCase struct {
	args     int
	expected string
}

func runTests(testCases []TestCase) {
	for _, testCase := range testCases {
		result := Strong(testCase.args)
		passed := result == testCase.expected
		fmt.Printf(
			"fn(%q) = %v; expected = %v; passed? %t\n",
			testCase.args,
			result,
			testCase.expected,
			passed,
		)
	}
}

func main() {
	runTests([]TestCase{
		{args: 1, expected: "STRONG!!!!"},
		{args: 2, expected: "STRONG!!!!"},
		{args: 145, expected: "STRONG!!!!"},
		{args: 7, expected: "Not Strong !!"},
		{args: 93, expected: "Not Strong !!"},
		{args: 185, expected: "Not Strong !!"},
	})
}
