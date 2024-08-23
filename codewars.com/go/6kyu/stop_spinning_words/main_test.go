package main

import (
	"testing"
)

func TestSpinWords(t *testing.T) {
	var testCases = []struct {
		input    string
		expected string
	}{
		{"Welcome", "emocleW"},
		{"to", "to"},
		{"CodeWars", "sraWedoC"},
		{"Hey fellow warriors", "Hey wollef sroirraw"},
		{"Burgers are my favorite fruit", "sregruB are my etirovaf tiurf"},
		{"Pizza is the best vegetable", "azziP is the best elbategev"},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			result := SpinWords(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
