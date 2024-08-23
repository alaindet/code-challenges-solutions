package main

import (
	"testing"
)

func TestValidBraces(t *testing.T) {
	it := func(given string, expected bool) {
		t.Run(given, func(t *testing.T) {
			outcome := ValidBraces(given)
			if outcome != expected {
				t.Errorf("Expected %t, got %t", expected, outcome)
			}
		})
	}

	it(")", false)
	it("(failing hard)", false)
	it("[doomed]", false)
	it("[", false)
	it("{}", true)
	it("(){}[]", true)
	it("([{}])", true)
	it("(}", false)
	it("[(])", false)
	it("[({)](]", false)
}
