package main

func TwoOldestAges(ages []int) [2]int {
	oldest := 0
	secondOldest := 0

	for _, age := range ages {
		if age > oldest {
			secondOldest = oldest
			oldest = age
		} else if age > secondOldest {
			secondOldest = age
		}
	}

	return [2]int{secondOldest, oldest}
}
