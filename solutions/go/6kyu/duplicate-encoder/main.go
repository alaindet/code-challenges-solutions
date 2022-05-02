package main

import "strings"

// https://www.codewars.com/kata/54b42f9314d9229fd6000d9c/train/go
func DuplicateEncode(word string) string {

	result := strings.Builder{}
	chars := []rune(strings.ToLower(word))
	charsCount := len(chars)
	charsMap := make(map[rune]int, charsCount)

	for i := 0; i < charsCount; i++ {
		charsMap[chars[i]]++
	}

	for i := 0; i < charsCount; i++ {
		if charsMap[chars[i]] > 1 {
			result.WriteRune(')')
		} else {
			result.WriteRune('(')
		}
	}

	return result.String()
}
