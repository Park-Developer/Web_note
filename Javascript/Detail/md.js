console.log("Memo" , Memo_area.value.split('\n'));
console.log("Memo" , Memo_area.value[0]);


const h1_size="50px"; // For H1 : # 
const h2_size="40px"; // For H2 : ##
const h3_size="30px"; // For H3 : ###
const h4_size="20px"; // For H4 : ####
const h5_size="10px"; // For H5 : #####


//Memo_area

let converted_result=document.createElement("div");


function search_memo(){
    console.log("search_memo");
    // Text Area에 있는 데이터 가져오기
    let textData=Memo_area.value.split('\n'); // 한줄씩 끊어서 가져옴

    // Textarea에 있는 내용을 라인별로 p tag에 넣기
    let memo_rows=Memo_area.rows;
    let line_element = new Array(memo_rows); 
    let line_clsName;

    for (let step = 0; step < memo_rows; step++) {
        // <p> tag 생성
        line_element[step]=document.createElement("P");
        
        // class 생성
        line_clsName="Text_Line"+String(step+1);
        line_element[step].classList.add(line_clsName);

        
        //Markdown 검사 & HtML 값 생성
        console.log("line Data" ,textData[step]);
        
        if (typeof(textData[step]) != "undefined"){
            // Mark Down 적용 가능 여부 검사
            if (make_header(textData[step])[0]==true){
                line_element[step]=make_header(textData[step])[1];
            }else{
                line_element[step].innerHTML=textData[step];
            }
        }else{
            line_element[step].innerHTML=textData[step]; //line data가 없으면 텍스트만 가져오기   
        }
    }

    return line_element;
}

let te_line_element = search_memo();
console.log("line emelent",te_line_element);

/*TEST PROGRAM */

for (step = 0; step < Memo_area.rows; step++) {
    Memo.appendChild(te_line_element[step]);
}

/*TEST PROGRAM */



function make_header(line){
    console.log("make_header",line);
    let applied_part=document.createElement("P");     
    let Non_applied_part=document.createElement("P");     
    let header;
    let header_size;

    if (line.indexOf("#####")!=-1){
        header="#####";
        header_size=h5_size;
    }else if (line.indexOf("####")!=-1){
        header="####";
        header_size=h4_size;
    }else if (line.indexOf("###")!=-1){
        header="###";
        header_size=h3_size;
    }else if (line.indexOf("##")!=-1){
        header="##";
        header_size=h2_size;
    }else if (line.indexOf("#")!=-1){
        header="#";
        header_size=h1_size;
    }else {
        return [false,undefined];
    }

  

    // 비적용 부분 설정
    Non_applied_part.innerHTML=line.split(header)[0];
    
    // 적용 부분 설정
    applied_part.innerHTML=line.split(header)[1];
    applied_part.style.fontSize=header_size;

    // Return Line 설정
    let return_line=document.createElement("P"); 
    return_line.appendChild(Non_applied_part);
    return_line.appendChild(applied_part);

    return_line.style.display="flex";

    return [true,return_line];
}
