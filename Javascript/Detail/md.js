
//Memo_area

let converted_result=document.createElement("div");
converted_result.classList.add("MD_display");

//  TODO LIST 
//  Memo가 바뀌면 md 검사 다시하기

function search_memo(){
    console.log("search_memo");
    // Text Area에 있는 데이터 가져오기
    let textData=Memo_area.value.split('\n'); // 한줄씩 끊어서 가져옴
    let text_array;
    let individual_text_tag;

    // Textarea에 있는 내용을 라인별로 p tag에 넣기
    let memo_rows=Memo_area.rows;
    let line_element = new Array(memo_rows); 
    
    let line_clsName;
    let text_clsName;

    let is_display_element=true;
    let letter_elemet;
    let line_md_setting;
    let applied_property;

    for (let step = 0; step < memo_rows; step++) {
        // Line별 Setting
        line_element[step]=document.createElement("P");
        
        line_clsName="Text_Line"+String(step+1);
        line_element[step].classList.add(line_clsName);
        
        line_element[step].style.display="flex";
        
        // Line내 텍스트별 Setting
        // splits every letter in string into an item in our array
        if (typeof(textData[step]) != "undefined"){
            
            // Line 검사
            line_md_setting=make_md_setting(textData[step]);

            // Line Data -> Individual Letter
            text_array = textData[step].split('');
            
            // Line tag generation
            for (let text_idx=0; text_idx< text_array.length; text_idx++){

                applied_property=apply_md_property(text_array,text_idx,line_md_setting);

                letter_elemet=applied_property[0];
                is_display_element=applied_property[1];

                console.log("letter_elemet,is_display_element",letter_elemet,is_display_element);
                // Add class name
                text_clsName="Ln"+String(step+1)+"_idx"+String(text_idx)
                letter_elemet.classList.add(text_clsName);
                
                if (is_display_element==true){ // MD Operator는 표시하지 않음
                    line_element[step].appendChild(letter_elemet);
                }
            }
        }

    }
    return line_element ;
}


let te_line_element = search_memo();
console.log("line emelent",te_line_element);

/*TEST PROGRAM */
Memo.appendChild(converted_result);
md_frame_setting(converted_result);
for (step = 0; step < Memo_area.rows; step++) {
    converted_result.appendChild(te_line_element[step]);
}

/*TEST PROGRAM */

function MD_func_make_emphasis(line){
     // return form : [contain_flag,start_loc,end_loc(=-1),bold_style];
    console.log("MD_func_make_emphasis",line);
    let start_loc;
    let end_loc;
    let emphasis_style=['**','*','__','_']; 
    // Notice 순서 주의!
    // 순서를 바꾸게 되면 정상적으로 동작하지 않음

    let emphasis_length;
    let is_contain=false;
    // Emphasis Style 검색

    for (let idx=0 ; idx<emphasis_style.length;idx++){
        if (line.indexOf(emphasis_style[idx])!=-1){ // 첫번째 '**' 위치 찾기
            start_loc=line.indexOf(emphasis_style[idx]);
            if (idx==0 || idx==2){
                emphasis_length=1;
            }else{
                emphasis_length=2;
            }

            if (line.indexOf(emphasis_style[idx],start_loc+emphasis_length)!=-1){ // 첫번째 위치부터 Search해서 두번쨰 '**' 검색
                // emphasis 적용이 가능한 경우


                end_loc=line.indexOf(emphasis_style[idx],start_loc+emphasis_length);
                let is_contain=true;
                return [is_contain,start_loc,end_loc,"E"+String(idx+1)];
                break;
            }
        }
    }
    
    return [false,undefined,undefined,undefined];
    
}

function MD_func_make_header(line){
    // return form : [contain_flag,start_loc,end_loc(=-1),header];
    console.log("MD_func_make_header",line);

    let header;

    if (line.indexOf("#####")!=-1){   
        header="h5";
        start_loc=line.indexOf("#####");
    }else if (line.indexOf("####")!=-1){
        header="h4";
        start_loc=line.indexOf("####");
    }else if (line.indexOf("###")!=-1){
        header="h3";
        start_loc=line.indexOf("###");
    }else if (line.indexOf("##")!=-1){
        header="h2";
        start_loc=line.indexOf("##");
    }else if (line.indexOf("#")!=-1){
        header="h1";
        start_loc=line.indexOf("#");
    }else {
        return [false,undefined,undefined,undefined];
    }

    // MD 적용 가능한 경우
    if (start_loc!=-1){ // heaer 연산자가 있는 경우
        return [true,start_loc,-1,header];
    }else{
        return [false,undefined,undefined,undefined];
    } 
}



function md_frame_setting(md_frame){
    md_frame.style.outline = md_frame_outline;
    md_frame.style.backgroundColor=md_frame_background;
}

function make_md_setting(line){
    let md_setting={
        header:false,
        emphasis:false,
        ordered:false,
        unordered:false,
        imgaes:false,
        link:false,
        blockquote:false,
        code:false,
        task_list:false,
        table:false,
        under_line:false,
        color:false,
        highlight:false,
        italics:false
    };

    // [M1] Header 속성 검사
    let check_header_MD=MD_func_make_header(line);
    if (check_header_MD[0]==true){
        md_setting["header"]=[true,check_header_MD[1],check_header_MD[2],check_header_MD[3]];
    }

    // [M2] emphasis 속성 검사
    let check_emphasis_MD=MD_func_make_emphasis(line);
    console.log("check_emphasis_MD",check_emphasis_MD);
    if (check_emphasis_MD[0]==true){
        md_setting["emphasis"]=[true,check_emphasis_MD[1],check_emphasis_MD[2],check_emphasis_MD[3]];
    }

    return md_setting;
}

function apply_md_property(text_array,text_idx,md_setting){
    console.log("apply_md_property");
    
    let individual_text_tag=document.createElement("P");
    individual_text_tag.innerHTML=text_array[text_idx];
    console.log("individual_text_tag",individual_text_tag);
    let is_display=true;
    
    // [M1] : header 속성 적용
    // md_setting["header"]=[true,start_loc,end_loc(= -1),header];
    if(md_setting["header"][0]==true){
        
        let header__start=md_setting["header"][1]; 
        let header__style=md_setting["header"][3];
        let header__length=parseInt(header__style.charAt(1));
        let header__size=HEADER_SIZE_MD["h"+header__style.charAt(1)+"_size"]
        
        // Header Applied Part
        if (text_idx>=header__start+header__length){
            individual_text_tag.classList.add(header__style);

            // header 속성 적용
            individual_text_tag.style.fontSize=header__size;
        }
                            
        // Header Operator
        if (text_idx>=header__start && text_idx<=header__start+header__length-1 ){
            is_display=false;  // MD 연산자는 표시하지 않음
        }

    }

    // [M2] : emphasis 속성 적용
    if(md_setting["emphasis"][0]==true){
        console.log("emphasis setting")
        let emphasis__start=md_setting["emphasis"][1]; 
        let emphasis__end=md_setting["emphasis"][2];
        let emphasis__style=md_setting["emphasis"][3];
        let emphasis__length;
        if(emphasis__style=="E1"|| emphasis__style=="E3"){  // E1:'*', E2:'**',
            emphasis__length=2;
        }else{  // E3:'_', E4:'__'
            emphasis__length=1;
        }
     
        // Emphasis Applied Part
        console.log("emphasis__start,emphasis__end,emphasis__length",emphasis__start,emphasis__end,emphasis__length);
        if (text_idx>=emphasis__start+emphasis__length && text_idx<=emphasis__end-1){
            individual_text_tag.classList.add(emphasis__style);

            // emphasis 속성 적용
            individual_text_tag.style.fontWeight="bold";
        }
                            
        // Emphasis Operator
        if ((text_idx>=emphasis__start && text_idx<=emphasis__start+emphasis__length-1) ||(text_idx>=emphasis__end && text_idx<=emphasis__end+emphasis__length-1)) {
            is_display=false;  // MD 연산자는 표시하지 않음
        }

    }
    return [individual_text_tag, is_display];
}