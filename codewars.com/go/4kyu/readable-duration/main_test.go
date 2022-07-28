package main

import (
	"fmt"
	"testing"
)

func TestFormatDuration(t *testing.T) {
	var testCases = []struct {
		input    int64
		expected string
	}{
		{1, "1 second"},
		{62, "1 minute and 2 seconds"},
		{120, "2 minutes"},
		{3600, "1 hour"},
		{3662, "1 hour, 1 minute and 2 seconds"},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("%d", c.input)
		t.Run(testName, func(t *testing.T) {
			result := FormatDuration(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
