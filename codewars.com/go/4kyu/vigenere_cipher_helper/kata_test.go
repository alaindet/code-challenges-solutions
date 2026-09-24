package main

import (
	"fmt"
	"testing"
)

type testCaseInput struct {
	key      string
	alphabet string
	content  string
}

type testCase struct {
	input    testCaseInput
	expected string
}

func TestEncode(t *testing.T) {
	testCases := []testCase{
		{
			input: testCaseInput{
				key:      "password",
				alphabet: "abcdefghijklmnopqrstuvwxyz",
				content:  "codewars",
			},
			expected: "rovwsoiv",
		},
		{
			input: testCaseInput{
				key:      "password",
				alphabet: "abcdefghijklmnopqrstuvwxyz",
				content:  "waffles",
			},
			expected: "laxxhsj",
		},
		{
			input: testCaseInput{
				key:      "password",
				alphabet: "abcdefghijklmnopqrstuvwxyz",
				content:  "CODEWARS",
			},
			expected: "CODEWARS",
		},
		{
			input: testCaseInput{
				key:      "àòòù",
				alphabet: "àèìòù",
				content:  "ààèèììòòùù",
			},
			expected: "àòùàìàèìùì",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.input.content, func(t *testing.T) {
			cipher := VigenèreCipher{
				Key:   tc.input.key,
				Alpha: tc.input.alphabet,
			}

			result := cipher.Encode(tc.input.content)
			if result != tc.expected {
				t.Errorf("Result: %v, Expected: %v", result, tc.expected)
			}
		})
	}
}

func TestDecode(t *testing.T) {
	testCases := []testCase{
		{
			input: testCaseInput{
				key:      "password",
				alphabet: "abcdefghijklmnopqrstuvwxyz",
				content:  "rovwsoiv",
			},
			expected: "codewars",
		},
		{
			input: testCaseInput{
				key:      "password",
				alphabet: "abcdefghijklmnopqrstuvwxyz",
				content:  "laxxhsj",
			},
			expected: "waffles",
		},
		{
			input: testCaseInput{
				key:      "password",
				alphabet: "abcdefghijklmnopqrstuvwxyz",
				content:  "CODEWARS",
			},
			expected: "CODEWARS",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.input.content, func(t *testing.T) {
			cipher := VigenèreCipher{
				Key:   tc.input.key,
				Alpha: tc.input.alphabet,
			}

			result := cipher.Decode(tc.input.content)
			if result != tc.expected {
				t.Errorf("Result: %v, Expected: %v", result, tc.expected)
			}
		})
	}
}

func TestInitKey(t *testing.T) {
	testCases := []struct {
		inputKey     string
		inputContent string
		expected     string
	}{
		{
			inputKey:     "key",
			inputContent: "ab",
			expected:     "ke",
		},
		{
			inputKey:     "key",
			inputContent: "abcdefghil",
			expected:     "keykeykeyk",
		},
		{
			inputKey:     "àòòù",
			inputContent: "平仮名片仮名漢字名片",
			expected:     "àòòùàòòùàò",
		},
	}

	for _, tc := range testCases {
		testName := fmt.Sprintf("%s|%s", tc.inputKey, tc.inputContent)

		t.Run(testName, func(t *testing.T) {
			cipher := VigenèreCipher{
				Key:   tc.inputKey,
				Alpha: "",
			}

			key := cipher.InitKey(len([]rune(tc.inputContent)))
			result := string(key)

			if result != tc.expected {
				t.Errorf("Result: %v, Expected: %v", result, tc.expected)
			}
		})
	}
}
