package main

import (
	"math"
	"strings"
)

// https://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3/train/go
type VigenèreCipher struct {
	Key   string
	Alpha string
	alpha *VigenèreCipherAlphabet
}

func (c VigenèreCipher) Encode(str string) string {
	return c.remapChars(str, func(charIndex, keyIndex int) int {
		return charIndex + keyIndex
	})
}

func (c VigenèreCipher) Decode(str string) string {
	return c.remapChars(str, func(charIndex, keyIndex int) int {
		return charIndex - keyIndex
	})
}

func (c *VigenèreCipher) InitAlphabet() {
	if c.alpha == nil {
		c.alpha = NewVigenèreCipherAlphabet(c.Alpha)
	}
}

func (c VigenèreCipher) remapChars(
	str string,
	indexFn func(int, int) int,
) string {
	c.InitAlphabet()
	contentRunes := []rune(str)
	contentLength := len(contentRunes)
	remapped := make([]rune, contentLength)
	keyRunes := c.InitKey(contentLength)

	for i, char := range contentRunes {
		if c.alpha.Exists(char) {
			charIndex := c.alpha.Index(char)
			keyIndex := c.alpha.Index(keyRunes[i])
			nextIndex := indexFn(charIndex, keyIndex)
			remapped[i] = c.alpha.Char(nextIndex)
			continue
		}

		remapped[i] = char
	}

	return string(remapped)
}

func (c VigenèreCipher) InitKey(length int) []rune {
	keyRunes := []rune(c.Key)
	keyLength := len(keyRunes)

	// Shorten
	if keyLength > length {
		return keyRunes[0:length]
	}

	// Lengthen perfectly
	repetitions := length / keyLength
	if repetitions*keyLength == length {
		return []rune(strings.Repeat(c.Key, repetitions))
	}

	// Lengthen first
	normalizedKeyRunes := make([]rune, 0, keyLength*repetitions+1)
	for range repetitions + 1 {
		normalizedKeyRunes = append(normalizedKeyRunes, keyRunes...)
	}

	// Trim excess
	return normalizedKeyRunes[0:length]
}

type VigenèreCipherAlphabet struct {
	Alphabet string
	Length   int
	ByIndex  map[int]rune
	ByChar   map[rune]int
}

func NewVigenèreCipherAlphabet(alphabet string) *VigenèreCipherAlphabet {
	alphabet_ := []rune(alphabet)
	alphabetLength := len(alphabet_)
	byIndex := make(map[int]rune, alphabetLength)
	byChar := make(map[rune]int, alphabetLength)

	for index, char := range alphabet_ {
		byIndex[index] = char
		byChar[char] = index
	}

	return &VigenèreCipherAlphabet{
		Alphabet: alphabet,
		Length:   alphabetLength,
		ByIndex:  byIndex,
		ByChar:   byChar,
	}
}

func (alpha *VigenèreCipherAlphabet) Exists(char rune) bool {
	_, exists := alpha.ByChar[char]
	return exists
}

func (alpha *VigenèreCipherAlphabet) Index(char rune) int {
	index, _ := alpha.ByChar[char]
	return index
}

func (alpha *VigenèreCipherAlphabet) Char(index int) rune {
	if index < 0 {
		indexValue := int(math.Abs(float64(index)))
		normalizedIndex := alpha.Length - indexValue%alpha.Length
		return alpha.ByIndex[normalizedIndex]
	} else {
		normalizedIndex := index % alpha.Length
		return alpha.ByIndex[normalizedIndex]
	}
}
