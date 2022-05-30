package main

import (
	"fmt"
	"testing"
)

type testCaseInput struct {
	money int
	price float64
}

type testCase struct {
	input    testCaseInput
	expected int
}

func TestBeeramid(t *testing.T) {

	var testCases = []testCase{
		{testCaseInput{9, 2.0}, 1},
		{testCaseInput{21, 1.5}, 3},
		{testCaseInput{-1, 4.0}, 0},
		{testCaseInput{58, 2.0}, 3},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf(
			"Beeramid(%d, %.2f)=%d",
			c.input.money,
			c.input.price,
			c.expected,
		)

		t.Run(testName, func(t *testing.T) {
			result := Beeramid(c.input.money, c.input.price)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
