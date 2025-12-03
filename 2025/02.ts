import { Range, ranges } from "./02-input.ts";

// Challenge: https://adventofcode.com/2025/day/2

const sum = (arr: number[]) => arr.reduce((prev, cur) => prev + cur, 0);

const allIdsForRange = (range: Range) => {
  const [start, end] = range;
  const numIds = (end - start) + 1;

  return Array
    .from({ length: numIds })
    .map((_, index) => index + start);
};

const getInvalidIdsForRangePart1 = (range: Range) => {
  return allIdsForRange(range).filter((id) => {
    const numChars = id.toString().length;

    const isOddNumberOfChars = numChars % 2 !== 0;
    if (isOddNumberOfChars) return false;

    const halfWayIndex = numChars / 2;
    const firstHalf = id.toString().slice(0, halfWayIndex);
    const secondHalf = id.toString().slice(halfWayIndex);
    const isRepeatingSequence = firstHalf === secondHalf;

    return isRepeatingSequence;
  });
};

const splitStringByLength = (str: string, length: number) => {
  const subStrings = [];

  for (let i = 0; i < str.length; i += length) {
    subStrings.push(str.slice(i, i + length));
  }

  return subStrings;
};

const getInvalidIdsForRangePart2 = (range: Range) => {
  return allIdsForRange(range).filter((id) => {
    const idStr = id.toString();
    const numChars = idStr.length;
    let isValid = true;

    for (
      let subStrLength = 1;
      (subStrLength <= Math.floor(numChars / 2));
      subStrLength++
    ) {
      if (isValid) {
        if (numChars % subStrLength) continue;
        const subStrings = splitStringByLength(idStr, subStrLength);
        isValid = subStrings.some((subString) => subString !== subStrings[1]);
      }
    }

    return !isValid;
  });
};

const invalidIdsPart1 = ranges.flatMap(getInvalidIdsForRangePart1);
console.log(sum(invalidIdsPart1));

const invalidIdsPart2 = ranges.flatMap(getInvalidIdsForRangePart2);
console.log(sum(invalidIdsPart2));
