package main

import (
	"sort"
	"strings"
)

func Anagrams(word string, words []string) []string {
	result := make([]string, 0, len(words))
	normalizedWord := normalizeWord(word)
	for _, aWord := range words {
		if normalizeWord(aWord) == normalizedWord {
			result = append(result, aWord)
		}
	}
	if len(result) == 0 {
		return nil
	}
	return result
}

// Tranforms word as sorted lower case letters
func normalizeWord(word string) string {
	letters := make([]string, len(word))
	for _, letter := range []rune(strings.ToLower(word)) {
		letters = append(letters, string(letter))
	}
	sort.Strings(letters)
	return strings.Join(letters, "")
}
