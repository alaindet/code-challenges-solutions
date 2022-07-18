package main

import (
	"reflect"
	"testing"
)

func TestParse(t *testing.T) {
	var testCases = []struct {
		input    string
		expected []int
	}{
		{"ooo", []int{0, 0, 0}},
		{"ioioio", []int{1, 2, 3}},
		{"idoiido", []int{0, 1}},
		{"isoisoiso", []int{1, 4, 25}},
		{"codewars", []int{0}},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			result := Parse(c.input)
			if !reflect.DeepEqual(result, c.expected) {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
