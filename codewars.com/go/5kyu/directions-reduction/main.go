package main

const (
	north = "NORTH"
	east  = "EAST"
	south = "SOUTH"
	west  = "WEST"
)

func DirReduc(dirs []string) []string {
	result := make([]string, 0, len(dirs))
	next := make([]string, 0, len(dirs))
	copy(result, dirs)

	for {
		resultLen := len(result)
		for i := 0; i < resultLen; i++ {
			dir := result[i]

			if i == (resultLen - 1) {
				next = append(next, dir)
				continue
			}

			nextDir := result[i+1]
			ns := dir == north && nextDir == south
			sn := dir == south && nextDir == north
			ew := dir == east && nextDir == west
			we := dir == west && nextDir == east

			if ns || sn || ew || we {
				i += 2
				continue
			}

			next = append(next, dir)
		}

		if len(result) == len(next) {
			break
		}

		result = next
		next = make([]string, 0, len(dirs))
	}

	return result
}
