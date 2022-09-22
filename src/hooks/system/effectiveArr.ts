<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export const effectiveArr = (arr: string, min: number, max: number): Array<number> => {
  const arrTemp = arr
    .split(' ')
<<<<<<< HEAD
    .filter((e) => { return e.length > 0; }) //길이가 있는 친구들만 (공백 문자 제거)
    .map((e) => { return Number(e); }) //숫자인 친구들만 (숫자가 아닌 친구는 NaN으로 바뀜)
    .filter((e) => { return e >= min && e <= max; }); // 범위 안 친구들만

  return [...new Set(arrTemp)]; //중복제거
};
=======
export const effectiveArr = async (arr: string, tokenizer: any, min: number, max: number):Promise<Array<number>> => {
  const arrTemp = arr.split(tokenizer).filter((e) => {
    return (e != '');
  }).map((e)=>{
    return Number(e);
  }).filter((e)=>{
    return (e>=min)||(e<=max);
  });

  return [...new Set(arrTemp)]; //중복제거
}
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
=======
export const effectiveArr = async (arr: string, tokenizer: any, min: number, max: number): Promise<Array<number>> => {
=======
export const effectiveArr = (arr: string, min: number, max: number): Array<number> => {
>>>>>>> cbbf3d6f (music 리펙토링중 3)
  const arrTemp = arr
    .split(" ")
    .filter((e) => {return e.length>0})
    .map((e) => {return Number(e);})
    .filter((e) => {return e >= min && e <= max;});
=======
    .filter((e) => {
      return e.length > 0;
    })
    .map((e) => {
      return Number(e);
    })
    .filter((e) => {
      return e >= min && e <= max;
    });
>>>>>>> a468518a (pretter 적용)

  return [...new Set(arrTemp)]; //중복제거
};
>>>>>>> c7854135 (노래봇 버그 수정 (노래 끝나고 다시 노래 넣을 때 안 들어가던 거 수정))
