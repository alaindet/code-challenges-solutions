package main

import (
	"fmt"
	"testing"
)

type testCase struct {
	input    string
	expected bool
}

func TestValidISBN10(t *testing.T) {

	var testCases = []testCase{
		{"1112223339", true},
		{"048665088X", true},
		{"1293000000", true},
		{"1234554321", true},
		{"1234512345", false},
		{"1293", false},
		{"X123456788", false},
		{"ABCDEFGHIJ", false},
		{"XXXXXXXXXX", false},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("ValidISBN10(%q)=%t", c.input, c.expected)
		t.Run(testName, func(t *testing.T) {
			result := ValidISBN10(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
