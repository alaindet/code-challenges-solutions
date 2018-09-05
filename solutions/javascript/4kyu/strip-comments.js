const solution = (input, markers) => {

  // Take lines one by one
  return input.split('\n').map((line) => {

    // Loop on markers
    markers.forEach((marker) => {

      // If there's a marker, shorten the line
      let pos = line.indexOf(marker);
      if (pos !== -1) {
        line = line.slice(0, pos);
      };

    });

    // Trim excess white space on both ends
    return line.trim();

  // Join back all stripped lines
  }).join('\n');
};

// Testing
console.log(
  [
    // Test 1
    solution(
      "apples, plums % and bananas\npears\noranges !applesauce",
      ["%", "!"]
    ) === "apples, plums\npears\noranges",

    // Test 2
    solution(
      "Q @b\nu\ne -e f g",
      ["@", "-"]
    ) === "Q\nu\ne"

  ].reduce((log, test) => (log += test + "\n"), '')
);
