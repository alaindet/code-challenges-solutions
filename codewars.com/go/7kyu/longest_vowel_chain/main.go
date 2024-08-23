// https://www.codewars.com/kata/59c5f4e9d751df43cf000035/train/go
package main

import (
	"fmt"
	"regexp"
	"unicode/utf8"
)

func Solve(s string) int {
	isVowel := regexp.MustCompile(`([aeiou]+)`)
	vowelGroups := isVowel.FindAllString(s, -1)
	maxLen := 0

	for _, word := range vowelGroups {
		wordLength := utf8.RuneCountInString(word)
		if wordLength > maxLen {
			maxLen = wordLength
		}
	}

	return maxLen
}

type TestCase struct {
	args     string
	expected int
}

func runTests(testCases []TestCase) {
	for _, testCase := range testCases {
		result := Solve(testCase.args)
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
		{args: "codewarriors", expected: 2},
		{args: "suoidea", expected: 3},
		{args: "ultrarevolutionariees", expected: 3},
		{args: "strengthlessnesses", expected: 1},
		{args: "cuboideonavicuare", expected: 2},
		{args: "chrononhotonthuooaos", expected: 5},
		{args: "iiihoovaeaaaoougjyaw", expected: 8},
	})
}
