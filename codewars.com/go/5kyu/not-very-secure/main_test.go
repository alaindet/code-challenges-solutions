package main

import (
	"fmt"
	"testing"
)

type testCase struct {
	input    string
	expected bool
}

func TestNextBigger(t *testing.T) {

	var testCases = []testCase{
		{".*?", false},
		{"a", true},
		{"Mazinkaiser", true},
		{"hello world_", false},
		{"PassW0rd", true},
		{"     ", false},
		{"", false},
		{"\n\t\n", false},
		{"ciao\n$$_", false},
		{"__ * __", false},
		{"&)))(((", false},
		{"43534h56jmTHHF3k", true},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("alphanumeric(%q)=%t", c.input, c.expected)
		t.Run(testName, func(t *testing.T) {
			result := alphanumeric(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
