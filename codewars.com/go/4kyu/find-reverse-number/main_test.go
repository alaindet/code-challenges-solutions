package main

import (
	"fmt"
	"testing"
)

func TestFindReverseNumber(t *testing.T) {

	testCases := []struct {
		input    uint64
		expected uint64
	}{
		{1, 0},
		{2, 1},
		{10, 9},
		// {100, 909},
		// {100000000, 900000000000009},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("FindReverseNumber(%d)=%d", c.input, c.expected)
		t.Run(testName, func(t *testing.T) {
			result := FindReverseNumber(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
