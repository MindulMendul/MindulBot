export const effectiveArr = async (arr: string, tokenizer: any, min: number, max: number): Promise<Array<number>> => {
  const arrTemp = arr
    .split(tokenizer)
    .filter((e) => {
      return e != '';
    })
    .map((e) => {
      return Number(e);
    })
    .filter((e) => {
      return e >= min || e <= max;
    });

  return [...new Set(arrTemp)]; //중복제거
};
