package main

import (
	"reflect"
	"strings"
	"testing"
)

func TestDirReduc(t *testing.T) {
	var testCases = []struct {
		input    []string
		expected []string
	}{
		{
			[]string{"NORTH", "SOUTH", "EAST", "WEST"},
			[]string{},
		},
		{
			[]string{"NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"},
			[]string{"WEST"},
		},
		{
			[]string{"NORTH", "WEST", "SOUTH", "EAST"},
			[]string{"NORTH", "WEST", "SOUTH", "EAST"},
		},
		{
			[]string{"NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "NORTH"},
			[]string{"NORTH"},
		},
	}

	for _, c := range testCases {
		testName := strings.Join(c.input, ",")
		t.Run(testName, func(t *testing.T) {
			result := DirReduc(c.input)
			if !reflect.DeepEqual(result, c.expected) {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
