package main

// https://www.codewars.com/kata/585d7d5adb20cf33cb000235/train/go
// TODO: Make it effiecient!
func FindUniq(nums []float32) float32 {

	counters := make(map[float32]int, 2)

	for _, n := range nums {
		counters[n]++
	}

	var repeatedVal float32
	var maxCounter int

	for val, counter := range counters {
		if counter > maxCounter {
			maxCounter = counter
			repeatedVal = val
		}
	}

	for _, n := range nums {
		if n != repeatedVal {
			return n
		}
	}

	return 0
}
