package main

import (
	"fmt"
)

type TestCase struct {
	args     string
	expected string
}

var testCases = []TestCase{
	{
		args:     "most trees are blue",
		expected: "Most Trees Are Blue",
	},
	{
		args:     "All the rules in this world were made by someone no smarter than you. So make your own.",
		expected: "All The Rules In This World Were Made By Someone No Smarter Than You. So Make Your Own.",
	},
	{
		args:     "When I die. then you will realize",
		expected: "When I Die. Then You Will Realize",
	},
	{
		args:     "Jonah Hill is a genius",
		expected: "Jonah Hill Is A Genius",
	},
	{
		args:     "Dying is mainstream",
		expected: "Dying Is Mainstream",
	},
}

func runTests() {
	for _, testCase := range testCases {
		result := ToJadenCase(testCase.args)
		passed := result == testCase.expected
		fmt.Printf(
			"fn(%q) = %q; expected = %q; passed? %t\n",
			testCase.args,
			result,
			testCase.expected,
			passed,
		)
	}
}
