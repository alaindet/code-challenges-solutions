package main

import (
	"math"
	"strconv"
	"strings"
	"testing"
)

type testCase struct {
	input    []int
	expected int
}

func TestFindParityOutlier(t *testing.T) {

	var testCases = []testCase{
		{
			input:    []int{2, 6, 8, -10, 3},
			expected: 3,
		},
		{
			input:    []int{206847684, 1056521, 7, 17, 1901, 21104421, 7, 1, 35521, 1, 7781},
			expected: 206847684,
		},
		{
			input:    []int{math.MaxInt32, 0, 1},
			expected: 0,
		},
		{
			input:    []int{-33, -15, 21, 25, -12, -21, -341},
			expected: -12,
		},
		{
			input:    []int{13, 45, -1001, 15, -100, -99, 303},
			expected: -100,
		},
	}

	for _, c := range testCases {
		testName := getTestCaseName(c.input)
		t.Run(testName, func(t *testing.T) {
			result := FindOutlier(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}

func getTestCaseName(args []int) string {
	var b strings.Builder
	for _, arg := range args {
		b.WriteString(strconv.Itoa(arg))
	}
	return b.String()
}
