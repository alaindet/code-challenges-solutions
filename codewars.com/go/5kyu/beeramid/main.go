package main

// https://www.codewars.com/kata/51e04f6b544cf3f6550000c1/train/go
func Beeramid(money int, price float64) int {

	budget := float64(money)

	if budget < price {
		return 0
	}

	// This acts as math.Floor() since we're dividing an int with a float64
	beers := budget / price

	i := 0
	for beers >= 0 {
		i++
		j := float64(i)
		beers -= j * j
	}

	return i - 1
}
