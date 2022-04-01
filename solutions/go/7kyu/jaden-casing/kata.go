package main

import (
	"strings"
)

func ToJadenCase(sentence string) string {

	words := strings.Split(sentence, " ")
	wordsCount := len(words)
	result := make([]string, 0, wordsCount)

	for _, word := range words {
		result = append(result, strings.Title(word))
	}

	return strings.Join(result, " ")
}
