package main

import (
	"fmt"
	"testing"
)

type testCase struct {
	order   int
	decoded string
	encoded string
}

var testCases = []testCase{
	{
		5,
		"abcdefghilm",
		"aibhlcgmdfe",
	},
	{
		3,
		"WEAREDISCOVEREDFLEEATONCE",
		"WECRLTEERDSOEEFEAOCAIVDEN",
	},
	{
		3,
		"Hello, World!",
		"Hoo!el,Wrdl l",
	},
}

func TestEncode(t *testing.T) {
	for _, c := range testCases {

		order := c.order
		input := c.decoded
		expected := c.encoded
		testName := fmt.Sprintf("Encode(%d, %q)", order, input)

		t.Run(testName, func(t *testing.T) {
			result := Encode(input, order)
			if result != expected {
				t.Errorf("Result: %v Expected: %v", result, expected)
			}
		})
	}
}

func TestDecode(t *testing.T) {
	for _, c := range testCases {

		order := c.order
		input := c.encoded
		expected := c.decoded
		testName := fmt.Sprintf("Decode(%q)", input)

		t.Run(testName, func(t *testing.T) {
			result := Decode(input, order)
			if result != expected {
				t.Errorf("Result: %v Expected: %v", result, expected)
			}
		})
	}
}
