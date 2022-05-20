package main

import (
	"strconv"
	"strings"
	"testing"
)

type testCase struct {
	input    []int
	expected int
}

func TestTrap(t *testing.T) {

	var testCases = []testCase{
		{
			input:    []int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1},
			expected: 6,
		},
		{
			input:    []int{4, 3, 1, 1, 1, 4, 3, 2, 3, 4, 2, 1},
			expected: 14,
		},
		{
			input:    []int{4, 2, 0, 3, 2, 5},
			expected: 9,
		},
	}

	for i, c := range testCases {
		testName := getTestName(i, c)

		t.Run(testName, func(t *testing.T) {
			result := trap(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}

func getTestName(i int, t testCase) string {
	var b strings.Builder

	for _, n := range t.input {
		b.WriteString(string(strconv.Itoa(n)))
	}

	return b.String()
}
