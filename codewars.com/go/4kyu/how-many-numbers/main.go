package main

import (
	"fmt"
	"sync"
)

const (
	routines = 8
)

func main() {
	// 118, 127, 136, 145, 226, 235, 244, 334
	fmt.Println("FindAll(10,3)", FindAll(10, 3))
	fmt.Println("FindAll(84, 4)", FindAll(84, 4))
}

// WARNING: Does not work for big numbers
// https://www.codewars.com/kata/5877e7d568909e5ff90017e6/train/go
func FindAll(digitsSum, digitsCount int) []int {

	toProcess := make(chan []int, routines)
	filtered := make(chan []int, routines)
	aggregated := make(chan []int)

	max := 1
	for d := 1; d <= digitsCount; d++ {
		max *= 10
	}

	min := max / 10
	delta := (max - min + 1) / routines

	// Feed the chunks
	go func(ch chan []int) {
		inf := min
		for i := 0; i < routines; i++ {
			if i > 0 {
				inf += delta + 1
			}
			sup := inf + delta

			if sup > max {
				sup = max
			}

			ch <- []int{inf, sup}
		}
		close(ch)
	}(toProcess)

	// Filter the chunks
	go func(fromCh, toCh chan []int, digitsCount, digitsSum, max int) {
		var wg sync.WaitGroup
		wg.Add(routines)
		for limits := range fromCh {
			go func(limits []int) {
				defer wg.Done()
				inf, sup := limits[0], limits[1]
				nums := make([]int, 0, (sup-inf)/10)
				for i := inf; i <= sup; i++ {
					if isValid(i, digitsCount, max, digitsSum) {
						nums = append(nums, i)
					}
				}
				toCh <- nums
			}(limits)
		}
		wg.Wait()
		close(toCh)
	}(toProcess, filtered, digitsCount, digitsSum, max)

	// Aggregate filtered data
	go func(fromCh, toCh chan []int) {
		var count, lowest, highest int
		lowest = max
		highest = 0
		for nums := range fromCh {
			count += len(nums)
			for _, n := range nums {
				if n < lowest {
					lowest = n
				}
				if n > highest {
					highest = n
				}
			}
		}

		result := make([]int, 0, 3)
		if count > 0 {
			result = []int{count, lowest, highest}
		}
		toCh <- result
		close(toCh)
	}(filtered, aggregated)

	result := <-aggregated
	return result
}

func isValid(n, nLength, max, digitsSum int) bool {
	digits := getDigits(n, nLength, max)
	prev := -1
	sum := 0

	for _, d := range digits {

		// Digits should be in increasing order
		if d < prev {
			return false
		}

		sum += d
		prev = d
	}

	return digitsSum == sum
}

func getDigits(n, nLength, max int) []int {
	digits := make([]int, 0, nLength)
	temp := n
	tempDiv := max

	for tempDiv > 0 {

		// Avoid leading zeros
		if tempDiv > temp && len(digits) == 0 {
			tempDiv /= 10
			continue
		}

		d := temp / tempDiv
		digits = append(digits, d)
		temp -= d * tempDiv
		tempDiv /= 10
	}

	return digits
}
