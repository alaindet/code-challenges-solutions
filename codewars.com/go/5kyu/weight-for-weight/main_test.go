package main

import (
	"testing"
)

type testCase struct {
	input    string
	expected string
}

func TestOrderWeight(t *testing.T) {

	var testCases = []testCase{
		{"103 123 4444 99 2000", "2000 103 123 4444 99"},
		{"2000 10003 1234000 44444444 9999 11 11 22 123", "11 11 2000 10003 22 123 1234000 44444444 9999"},
		{"", ""},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			result := OrderWeight(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
