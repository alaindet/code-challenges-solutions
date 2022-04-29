package main

import (
	"strings"
	"unicode"
	"unicode/utf8"
)

func Title(s string) string {
	chars := []rune(s)
	charsCount := utf8.RuneCountInString(s)
	first := unicode.ToUpper(chars[0])

	if charsCount == 1 {
		return string(first)
	}

	theRest := ""

	for i := 1; i < charsCount; i++ {
		theRest += string(chars[i])
	}

	return string(first) + theRest
}

func buildSegment(c rune, times int) string {
	return Title(strings.ToLower(strings.Repeat(string(c), times)))
}

// https://www.codewars.com/kata/5667e8f4e3f572a8f2000039/train/go
func Accum(s string) string {

	charCount := utf8.RuneCountInString(s)
	chars := []rune(s)
	segments := make([]string, 0, charCount)

	for i := 0; i < charCount; i++ {
		segment := buildSegment(chars[i], i+1)
		segments = append(segments, segment)
	}

	return strings.Join(segments, "-")
}
