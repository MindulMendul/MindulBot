export const effectiveArr = (arr: string, min: number, max: number): Array<number> => {
  if (!arr) return [];
  const arrTemp = arr
    .split(' ')
    .filter((e) => {
      return e.length > 0;
    }) //길이가 있는 친구들만 (공백 문자 제거)
    .map((e) => {
      return Number(e);
    }) //숫자인 친구들만 (숫자가 아닌 친구는 NaN으로 바뀜)
    .filter((e) => {
      return e >= min && e <= max;
    }); // 범위 안 친구들만

  return [...new Set(arrTemp)]; //중복제거
};
