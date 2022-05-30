package main

import (
	"fmt"
	"strconv"
	"strings"
)

const (
	space = 32
)

func Encode(n int, s string) string {
	result := s
	for i := 0; i < n; i++ {
		result = _encode(n, result)
	}
	return fmt.Sprintf("%d %s", n, result)
}

func Decode(s string) string {
	n, encoded := parseEncoded(s)
	result := encoded
	for i := 0; i < n; i++ {
		result = _decode(n, result)
	}
	return result
}

func _encode(n int, s string) string {
	letters := []rune(s)
	count := len(letters)
	wordLength := 0
	wordLengths := make([]int, 0, count)
	condensed := make([]rune, 0, count)

	for _, letter := range letters {
		if letter == space {
			wordLengths = append(wordLengths, wordLength)
			wordLength = 0
		} else {
			wordLength++
			condensed = append(condensed, letter)
		}
	}

	wordLengths = append(wordLengths, wordLength)
	rotateRight(n, &condensed)
	words := make([][]rune, 0, len(wordLengths)+1)

	from := 0
	for _, wl := range wordLengths {
		slice := condensed[from : from+wl]
		word := append(make([]rune, 0, len(slice)), slice...)
		words = append(words, word)
		from += wl
	}

	var b strings.Builder

	for wi := range words {
		rotateRight(n, &words[wi])
		b.WriteString(string(words[wi]))
		b.WriteRune(space)
	}

	result := b.String()

	return result[:len(result)-1]
}

func _decode(n int, s string) string {

	count := len(s)
	words := make([][]rune, 0, count)
	word := make([]rune, 0, count)
	wordLengths := make([]int, 0, count)

	for _, r := range []rune(s) {
		switch {
		case r == space:
			words = append(words, word)
			word = make([]rune, 0, len(s))
		default:
			word = append(word, r)
		}
	}
	words = append(words, word)

	condensed := make([]rune, 0, count)

	for _, w := range words {
		wordLengths = append(wordLengths, len(w))
		rotateLeft(n, &w)
		condensed = append(condensed, w...)
	}

	rotateLeft(n, &condensed)

	from := 0
	var b strings.Builder
	for _, wl := range wordLengths {
		b.WriteString(string(condensed[from : from+wl]))
		b.WriteRune(space)
		from += wl
	}

	result := b.String()

	return result[:len(result)-1]
}

func parseEncoded(s string) (int, string) {

	chars := []rune(s)
	pos := 0

	for i, r := range chars {
		if r == space {
			pos = i
			break
		}
	}

	n, _ := strconv.Atoi(string(chars[:pos]))
	encoded := string(chars[pos+1:])

	return n, encoded
}

func rotateRight[K any](n int, ref *[]K) {
	arr := *ref
	count := len(arr)

	if count == 0 {
		return
	}

	for i := 0; i < n; i++ {
		last := arr[count-1]
		for i := count - 2; i >= 0; i-- {
			arr[i+1] = arr[i]
		}
		arr[0] = last
	}
}

func rotateLeft[K any](n int, ref *[]K) {
	arr := *ref
	count := len(arr)

	if count == 0 {
		return
	}

	for i := 0; i < n; i++ {
		first := arr[0]
		for i := 0; i < count-1; i++ {
			arr[i] = arr[i+1]
		}
		arr[count-1] = first
	}
}
