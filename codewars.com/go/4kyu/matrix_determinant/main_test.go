package main

import (
	"strconv"
	"testing"
)

func TestDeterminant(t *testing.T) {
	testCases := []struct {
		input    [][]int
		expected int
	}{
		{
			input: [][]int{
				{1},
			},
			expected: 1,
		},
		{
			input: [][]int{
				{1, 3},
				{2, 5},
			},
			expected: -1,
		},
		{
			input: [][]int{
				{2, 5, 3},
				{1, -2, -1},
				{1, 3, 4},
			},
			expected: -20,
		},
	}

	for _, tc := range testCases {
		testName := strconv.Itoa(tc.expected)
		t.Run(testName, func(t *testing.T) {
			result := Determinant(tc.input)
			if result != tc.expected {
				t.Errorf("Result: %v, Expected: %v", result, tc.expected)
			}
		})
	}
}
