package main

func Parse(data string) []int {
	result := make([]int, 0, len(data))
	buffer := 0

	for _, char := range data {
		switch char {
		case 'i':
			buffer++
		case 'd':
			buffer--
		case 's':
			buffer *= buffer
		case 'o':
			result = append(result, buffer)
		default:
			continue
		}
	}

	return result
}
