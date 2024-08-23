// https://www.codewars.com/kata/59c5f4e9d751df43cf000035/train/go
package main

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

func FindShort(s string) int {
	shortest := utf8.RuneCountInString(s)
	words := strings.Split(s, " ")
	for _, word := range words {
		wordLen := utf8.RuneCountInString(word)
		if wordLen < shortest {
			shortest = wordLen
		}
	}
	return shortest
}

type TestCase struct {
	args     string
	expected int
}

func runTests(testCases []TestCase) {
	for _, testCase := range testCases {
		result := FindShort(testCase.args)
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
		{args: "bitcoin take over the world maybe who knows perhaps", expected: 3},
		{args: "turns out random test cases are easier than writing out basic ones", expected: 3},
		{args: "Let's travel abroad shall we", expected: 2},
	})
}
