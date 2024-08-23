package main

import (
	"fmt"
	"testing"
)

type testCase struct {
	input    int
	expected int
}

func TestNextBigger(t *testing.T) {

	var testCases = []testCase{
		{12, 21},
		{513, 531},
		{2017, 2071},
		{414, 441},
		{144, 414},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("NextBigger(%d)=%d", c.input, c.expected)
		t.Run(testName, func(t *testing.T) {
			result := NextBigger(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
