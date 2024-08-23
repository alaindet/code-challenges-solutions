package main

import (
	"reflect"
	"testing"
)

func TestCreateSpiral(t *testing.T) {
	testCases := []struct {
		name     string
		input    int
		expected [][]int
	}{
		{
			name:     "n<=1",
			input:    -42,
			expected: [][]int{},
		},
		{
			name:     "n=1",
			input:    1,
			expected: [][]int{{1}},
		},
		{
			name:     "n=2",
			input:    2,
			expected: [][]int{{1, 2}, {4, 3}},
		},
		{
			name:     "n=3",
			input:    3,
			expected: [][]int{{1, 2, 3}, {8, 9, 4}, {7, 6, 5}},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			result := CreateSpiral(testCase.input)
			if !reflect.DeepEqual(result, testCase.expected) {
				t.Errorf("got %v instead of %v", result, testCase.expected)
			}
		})
	}
}
