import { rotations } from "./01-input.ts";

// Challenge: https://adventofcode.com/2025/day/1

let position = 50; // The lock starts at position 50
let numZeros = 0; // Track how many times the lock "clicks" at 0

const calculateEndPosition = (rotation: string): number => {
  const direction = rotation.charAt(0); // L or R
  let clicks = parseInt(rotation.slice(1), 10); // A number of any size

  while (clicks > 0) {
    if (direction === "L") {
      position === 0 ? position = 99 : position--;
    }

    if (direction === "R") {
      position === 99 ? position = 0 : position++;
    }

    if (position === 0) numZeros++;
    clicks--;
  }

  return position;
};

const endPositions = rotations.map(calculateEndPosition);
const endingZeros = endPositions.filter((position) => position === 0).length;

console.log(numZeros, endingZeros);
