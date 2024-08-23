// https://www.codewars.com/kata/57a6633153ba33189e000074/train/go
package main

import (
	"fmt"
	"reflect"
	"unicode/utf8"
)

type Tuple struct {
	Char  rune
	Count int
}

func OrderedCount(text string) []Tuple {

	textLength := utf8.RuneCountInString(text)
	var letterToIndex = make(map[rune]int)
	var indexToLetter = make(map[int]rune)
	var counters = make([]int, textLength)
	var result = make([]Tuple, 0, textLength)

	for i, letter := range text {
		index, ok := letterToIndex[letter]
		if !ok {
			letterToIndex[letter] = i
			indexToLetter[i] = letter
			counters[i] = 1
		} else {
			counters[index] += 1
		}
	}

	for letterIndex, count := range counters {
		if count == 0 {
			continue
		}
		letter := indexToLetter[letterIndex]
		result = append(result, Tuple{letter, count})
	}

	return result
}

type TestCase struct {
	args     string
	expected []Tuple
}

func runTests(testCases []TestCase) {
	for _, testCase := range testCases {
		result := OrderedCount(testCase.args)
		passed := reflect.DeepEqual(result, testCase.expected)
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
		{
			args: "abracadabra",
			expected: []Tuple{
				{'a', 5},
				{'b', 2},
				{'r', 2},
				{'c', 1},
				{'d', 1},
			},
		},
		{
			args: "Code Wars",
			expected: []Tuple{
				{'C', 1},
				{'o', 1},
				{'d', 1},
				{'e', 1},
				{' ', 1},
				{'W', 1},
				{'a', 1},
				{'r', 1},
				{'s', 1},
			},
		},
		{
			args:     "",
			expected: []Tuple{},
		},
	})
}
