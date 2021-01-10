export const getZeroPaddedNumber = (num: number) =>
  `${num < 10 ? "0" : ""}${num}`;

export const getSpacePaddedNumber = (num: number) =>
  `${num < 10 ? "  " : ""}${num}`;
