package main

import (
	"testing"
)

type testCase struct {
	input    string
	expected string
}

func TestFindNonRepeating(t *testing.T) {

	var testCases = []testCase{
		{"a", "a"},
		{"abba", ""},
		{"stress", "t"},
		{"sTreSS", "T"},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			result := FirstNonRepeating(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
