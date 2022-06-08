package main

import (
	"fmt"
	"testing"
)

type testCase struct {
	input    string
	expected string
}

func TestNextBigger(t *testing.T) {

	var testCases = []testCase{
		{"EBG13 rknzcyr.", "ROT13 example."},
		{"How can you tell an extrovert from an\nintrovert at NSA? Va gur ryringbef,\ngur rkgebireg ybbxf ng gur BGURE thl'f fubrf.", "Ubj pna lbh gryy na rkgebireg sebz na\nvagebireg ng AFN? In the elevators,\nthe extrovert looks at the OTHER guy's shoes."},
		{"123", "123"},
		{"Guvf vf npghnyyl gur svefg xngn V rire znqr. Gunaxf sbe svavfuvat vg! :)", "This is actually the first kata I ever made. Thanks for finishing it! :)"},
		{"@[`{", "@[`{"},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("Rot13(%q)", c.input)
		t.Run(testName, func(t *testing.T) {
			result := Rot13(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
