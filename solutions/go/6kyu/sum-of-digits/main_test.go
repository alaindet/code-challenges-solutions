package main

import (
	"strconv"
	"testing"
)

type testCase struct {
	input    int
	expected int
}

func TestSnail(t *testing.T) {

	var testCases = []testCase{
		{16, 7},
		{195, 6},
		{992, 2},
		{167346, 9},
		{0, 0},
		{5, 5},
	}

	for _, c := range testCases {
		testName := strconv.Itoa(c.input) + "->" + strconv.Itoa(c.expected)
		t.Run(testName, func(t *testing.T) {
			result := DigitalRoot(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
