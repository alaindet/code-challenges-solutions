package main

import "testing"

func assertStrings(t *testing.T, result, expected string) {
	if result != expected {
		t.Errorf("Result: %v Expected: %v", result, expected)
	}
}

var testCases = []struct {
	name     string
	input    string
	expected string
}{
	{
		name:     "abcd",
		input:    "abcd",
		expected: "A-Bb-Ccc-Dddd",
	},
	{
		name:     "RqaEzty",
		input:    "RqaEzty",
		expected: "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy",
	},
	{
		name:     "cwAt",
		input:    "cwAt",
		expected: "C-Ww-Aaa-Tttt",
	},
}

func TestAccum(t *testing.T) {
	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			assertStrings(t, Accum(testCase.input), testCase.expected)
		})
	}
}
