package main

import (
	"reflect"
	"strconv"
	"strings"
	"testing"
)

type testCase struct {
	input    [][]int
	expected []int
}

func TestSnail(t *testing.T) {

	var testCases = []testCase{
		{
			input: [][]int{
				{1, 2, 3},
				{4, 5, 6},
				{7, 8, 9},
			},
			expected: []int{1, 2, 3, 6, 9, 8, 7, 4, 5},
		},
		{
			input: [][]int{
				{2, 3, 4, 6, 7},
				{3, 4, 2, 1, 5},
				{9, 7, 4, 5, 8},
				{3, 5, 2, 6, 7},
				{1, 0, 5, 7, 4},
			},
			expected: []int{2, 3, 4, 6, 7, 5, 8, 7, 4, 7, 5, 0, 1, 3, 9, 3, 4, 2, 1, 5, 6, 2, 5, 7, 4},
		},
	}

	for i, c := range testCases {
		testName := getTestName(i, c)

		t.Run(testName, func(t *testing.T) {
			result := Snail(c.input)
			if !reflect.DeepEqual(result, c.expected) {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}

func getTestName(i int, t testCase) string {
	var b strings.Builder

	for _, n := range t.input[0] {
		b.WriteString(string(strconv.Itoa(n)))
	}

	return b.String()
}
