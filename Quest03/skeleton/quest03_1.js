
let rowLength = Number(prompt("줄 수를 입력해주세요(되도록이면 홀수로)")); //prompt는 입력을 문자형으로 받기때문에 숫자로 처리해줄라면 Numer()로 타입변환 해줘야함

// 브라우저 출력버전1 (바로바로 출력)
for(let row=1;row<rowLength+1;row++){
    for (let empty1=0;empty1<rowLength-row;empty1++){
        document.write("&nbsp");
    }
    for(let star=0;star<(row*2-1);star++){
        document.write("*");
    }
    document.write("<br>");
}
// 브라우저 출력버전2(모아서 출력)
var out1="";
for(let row=1;row<rowLength+1;row++){
    for (let empty1=0;empty1<rowLength-row;empty1++){
        out1+="&nbsp";
    }
    for(let star=0;star<(row*2-1);star++){
        out1+="*";
    }
    out1+="<br>";
}
document.write(out1);

// console버전
var out2 = "";
for(let row=1;row<rowLength+1;row++){
    for (let empty=0;empty<rowLength-row;empty++){
        out2+= " ";
    }
    for(let star=0;star<(row*2-1);star++){
        out2+="*";
    }
    out2+='\n';
}
console.log(out2);

// 브라우저 출력버전3(row를 0부터 시작)
var out3="";
for(let row=0;row<rowLength;row++){
    for (let empty1=0;empty1<rowLength-row-1;empty1++){
        out3+="&nbsp";
    }
    for(let star=0;star<(row*2+1);star++){
        out3+="*";
    }
    out3+="<br>";
}
document.write(out3);