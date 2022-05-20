package main

// https://www.codewars.com/kata/5667e8f4e3f572a8f2000039/train/go

import (
	"strings"
	"unicode"
)

func firstUpper(s string) string {
	chars := []rune(s)
	first := unicode.ToUpper(chars[0])
	if len(chars) == 1 {
		return string(first)
	}
	return string(first) + string(chars[1:])
}

func buildSegment(c rune, times int) string {
	return firstUpper(strings.ToLower(strings.Repeat(string(c), times)))
}

func Accum(s string) string {

	chars := []rune(s)
	charsCount := len(chars)
	segments := make([]string, 0, charsCount)

	for i := 0; i < charsCount; i++ {
		segment := buildSegment(chars[i], i+1)
		segments = append(segments, segment)
	}

	return strings.Join(segments, "-")
}
