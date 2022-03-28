package main

import (
	"fmt"
	"strings"
)

func MultiTable(n int) string {
	var sb strings.Builder

	for i := 1; i <= 10; i++ {
		sb.WriteString(fmt.Sprintf("%d * %d = %d\n", i, n, i*n))
	}

	return strings.Trim(sb.String(), "\n")
}

func main() {
	fmt.Println(
		MultiTable(5),
	)
}
