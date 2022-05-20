export async function effectiveArr(arr, tokenizer, min, max){
    let arrTemp=[];
    arr.split(tokenizer).forEach(elem=>{//string으로 받은 배열을
        if(elem!="")arrTemp.push(elem); //,단위로 쪼개어 하나하나 집어넣기
    });

    let arrCheck=[];//명령어가 유효한지 전수 조사
    while(arrTemp.length>0) {
        const tmpFunc = async ()=>{
            let tmp=arrTemp.shift(); tmp++; tmp--; if(isNaN(tmp)) return;//숫자로 형변환이 되는지 확인
            tmp=Math.floor(tmp); if(tmp<min || tmp>max) return;//숫자라면, 정수로 만들어서 1~8 사이에 있는지 확인
            arrCheck.push(tmp-1);
        }
        await tmpFunc();
    }
    
    return [...new Set(arrCheck)];//중복제거
}