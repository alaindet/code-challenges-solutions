package main

import "fmt"

func main() {
	input := [][]int{
		{2, 3, 4, 6, 7},
		{3, 4, 2, 1, 5},
		{9, 7, 4, 5, 8},
		{3, 5, 2, 6, 7},
		{1, 0, 5, 7, 4},
	}

	result := Snail(input)

	fmt.Println("result", result)
}

// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/go
func Snail(snailMap [][]int) []int {
	s := NewSnailSort(snailMap)
	return s.Sort()
}
