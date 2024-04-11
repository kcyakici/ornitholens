export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function chooseRandomFromArrays(
  originalArray: string[] | [],
  count: number
) {
  let lengthOfOriginalArray = originalArray.length;
  const randomArray = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomNumber(0, lengthOfOriginalArray - 1);
    randomArray.push(originalArray[randomIndex]);
    lengthOfOriginalArray--;
  }
  return randomArray;
}
