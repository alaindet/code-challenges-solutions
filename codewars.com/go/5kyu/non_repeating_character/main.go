package main

import (
	"strings"
)

// https://www.codewars.com/kata/52bc74d4ac05d0945d00054e/train/go
func FirstNonRepeating(word string) string {
	letters := []rune(word)
	count := len(letters)

	for i := 0; i < count; i++ {

		letter := letters[i]
		letterLower := strings.ToLower(string(letter))

		found := false

		for j := 0; j < count; j++ {
			if i == j {
				continue
			}
			if letterLower == strings.ToLower(string(letters[j])) {
				found = true
			}
		}

		if !found {
			return string(letter)
		}
	}

	return ""
}
