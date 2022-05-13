package main

import (
	"reflect"
	"strings"
	"testing"
)

type testCaseArguments struct {
	word  string
	words []string
}

type testCase struct {
	input    testCaseArguments
	expected []string
}

func TestAnagrams(t *testing.T) {

	var testCases = []testCase{
		{
			input: testCaseArguments{
				word:  "abba",
				words: []string{"aabb", "abcd", "bbaa", "dada"},
			},
			expected: []string{"aabb", "bbaa"},
		},
		{
			input: testCaseArguments{
				word:  "laser",
				words: []string{"lazing", "lazy", "lacer"},
			},
			expected: nil,
		},
	}

	for _, c := range testCases {
		testName := c.input.word + " in " + strings.Join(c.input.words, ",")

		t.Run(testName, func(t *testing.T) {
			assertAnagrams(t, c.input.word, c.input.words, c.expected)
		})
	}
}

func assertAnagrams(t *testing.T, word string, words []string, expected []string) {
	t.Helper()
	result := Anagrams(word, words)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Result: %v Expected: %v", result, expected)
	}
}
