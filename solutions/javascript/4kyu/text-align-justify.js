// http://www.codewars.com/kata/text-align-justify/train/javascript

const chopLines = (text, width) => {
  
  const state = {
    lines: [],
    line: [],
    lineChars: 0,
    lineCharsMax: width
  };

  const chopper = (state, word, index, words) => {

    // Any word is followed by at least 1 space
    const len = word.length + 1;
    
    // Store this line
    if (state.lineChars + len > state.lineCharsMax) {
      state.lines.push(state.line.slice());
      state.lineChars = 0;
      state.line = [];
    }

    state.lineChars += len;
    state.line.push(word.substr(0));

    return state;
  };

  const result = text.split(' ').reduce(chopper, state);
  result.lines.push(result.line.slice());

  return result.lines;
};

const justify = (text, width) => {

  return chopLines(text, width).map(line => {
    const lineLength = line.reduce((len, word) => len += word.length, 0);
    let rest = width - lineLength;
    const wordsCount = line.length;
    const spacesCount = wordsCount - 1;
    const leftover = rest % spacesCount;

    if (leftover === 0) {
      const space = ' '.repeat(rest / spacesCount);
      return line.join(space);
    }
    
    else {
      const spaceLength = rest / spacesCount;
      const smallSpaceLength = parseInt(spaceLength);
      const smallSpace = ' '.repeat(smallSpaceLength);
      line = line.map((word, index, words) => {
        if (index < words.length - 1) word += smallSpace;
        return word;
      });
      for (let i = 0; i < leftover; i++) line[i] += ' ';
      return line.reduce((result, word) => result += word, '');
    }

  }).join('\n');
};

// Testing
const tests = [
  { // Test #1
    args: {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices porttitor eros, quis ullamcorper nisi pulvinar a. Cras feugiat iaculis quam et lacinia. Vestibulum ullamcorper, eros ac rhoncus tincidunt, urna dolor pulvinar neque, sit amet vulputate metus velit ac eros. Sed vulputate quam nec dolor luctus pharetra. Fusce et lectus lacus. Aliquam porta turpis non neque placerat ultricies. Cras maximus neque nec faucibus posuere. Sed non odio odio. Vivamus a nisl id neque volutpat ultricies. Cras augue diam, vehicula at porttitor tempor, placerat id erat.",
      width: 30
    }
  }
];
console.log(
  justify(
    tests[0].args.text,
    tests[0].args.width
  )
);
