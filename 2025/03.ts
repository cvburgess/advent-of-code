import { banks } from "./03-input.ts";

// Challenge: https://adventofcode.com/2025/day/3

const solution1 = () => {
  let maxJoltage = 0;

  banks.forEach((bank) => {
    const highestValues: number[] = [0, 0];

    bank.split("").forEach((batteryStr, index) => {
      const battery = parseInt(batteryStr, 10);
      const isLastBattery = index === bank.length - 1;

      if (!isLastBattery && battery > highestValues[0]) {
        highestValues[0] = battery;
        highestValues[1] = 0;
      } else if (battery > highestValues[1]) {
        highestValues[1] = battery;
      }
    });

    maxJoltage += parseInt(highestValues.join(""));
  });

  return maxJoltage;
};

const solution2 = (numberOfBatteries: number) => {
  let maxJoltage = 0;

  banks.forEach((bank, i) => {
    const highestValues: number[] = Array(numberOfBatteries).fill(0);

    bank.split("").forEach((batteryStr, bankIndex) => {
      const currentBattery = parseInt(batteryStr, 10);
      let hasBeenUsed = false;

      highestValues.map((highestValue, highestValueIndex) => {
        if (hasBeenUsed) {
          highestValues[highestValueIndex] = 0;
        } else {
          const isViableForIndex = bankIndex <=
            (bank.length - 1) -
              ((highestValues.length - 1) - highestValueIndex);

          if (isViableForIndex && currentBattery > highestValue) {
            highestValues[highestValueIndex] = currentBattery;
            hasBeenUsed = true;
          }
        }
      });
    });

    maxJoltage += parseInt(highestValues.join(""));
  });

  return maxJoltage;
};

console.log("PART 1:", solution1());
console.log("PART 1:", solution2(2));
console.log("PART 2:", solution2(12));
