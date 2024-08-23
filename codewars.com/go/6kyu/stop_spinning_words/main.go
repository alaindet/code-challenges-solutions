package main

import "strings"

const (
	threshold = 5
)

// https://www.codewars.com/kata/5264d2b162488dc400000001/train/go
func SpinWords(input string) string {

	if input == "" {
		return input
	}

	words := strings.Split(input, " ")

	for i, w := range words {
		if len(w) >= threshold {
			words[i] = ReverseWord(words[i])
		}
	}

	return strings.Join(words, " ")
}

func ReverseWord(word string) string {
	letters := []rune(word)

	for i, j := 0, len(letters)-1; i < j; i, j = i+1, j-1 {
		letters[i], letters[j] = letters[j], letters[i]
	}

	return string(letters)
}
