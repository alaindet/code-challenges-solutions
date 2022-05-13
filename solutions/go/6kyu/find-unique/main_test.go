package main

import (
	"strconv"
	"testing"
)

func TestFindUnique(t *testing.T) {
	testCases := []struct {
		input    []float32
		expected float32
	}{
		{
			[]float32{1.0, 1.0, 1.0, 2.0, 1.0, 1.0},
			float32(2),
		},
		{
			[]float32{0, 0, 0.55, 0, 0},
			float32(0.55),
		},
	}

	for i, c := range testCases {
		testName := "Test #" + strconv.Itoa(i)
		t.Run(testName, func(t *testing.T) {
			result := FindUniq(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
