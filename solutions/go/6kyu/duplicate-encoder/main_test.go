package main

import "testing"

func assertStrings(t *testing.T, result, expected string) {
	if result != expected {
		t.Errorf("Result: %v Expected: %v", result, expected)
	}
}

var testCases = []struct {
	input    string
	expected string
}{
	{"din", "((("},
	{"recede", "()()()"},
	{"Success", ")())())"},
	{"(( @", "))(("},
}

func TestAccum(t *testing.T) {
	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			assertStrings(t, DuplicateEncode(c.input), c.expected)
		})
	}
}
