package main

import "testing"

func TestCamelCase(t *testing.T) {

	var testCases = []struct {
		input    string
		expected string
	}{
		{"hello case", "HelloCase"},
		{"camel case word", "CamelCaseWord"},
		{"test case", "TestCase"},
		{"camel case method", "CamelCaseMethod"},
		{"say hello ", "SayHello"},
		{" camel case word", "CamelCaseWord"},
		{"", ""},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			assertStrings(t, CamelCase(c.input), c.expected)
		})
	}
}

func assertStrings(t *testing.T, result, expected string) {
	if result != expected {
		t.Errorf("Result: %v Expected: %v", result, expected)
	}
}
