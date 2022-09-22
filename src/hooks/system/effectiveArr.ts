export const effectiveArr = (arr: string, min: number, max: number): Array<number> => {
  const arrTemp = arr
    .split(' ')
    .filter((e) => {
      return e.length > 0;
    })
    .map((e) => {
      return Number(e);
    })
    .filter((e) => {
      return e >= min && e <= max;
    });

  return [...new Set(arrTemp)]; //중복제거
};
