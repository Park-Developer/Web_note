const Memo = document.querySelector(".js-Memo"),
      Memo_Title= Memo.querySelector(".js-Memo_Title"),
      Memo_BTN_List= Memo.querySelector(".js-Memo__Button_list"),
      Memo_btn1= Memo.querySelector(".js-Memo__Button_1"),
      Memo_btn2= Memo.querySelector(".js-Memo__Button_2"),
      Memo_btn3= Memo.querySelector(".js-Memo__Button_3"),
      Memo_area= Memo.querySelector(".js-Memo_contents");

let Edit_Activation=true; // 편집가능 상태


// Button State
var btn1_state=false;  
var btn2_state=false;
var btn3_state=false;

let keysDown = {};

function Btn_list_setting()
{
    Memo_btn1.addEventListener("click",Btn1_click);
    Memo_btn2.addEventListener("click",Btn2_click);
    Memo_btn3.addEventListener("click",Btn3_click);

    // [Individual Setting]
    Btn1_setting();
    Btn2_setting();
    Btn3_setting();
}

// Button Setting
function Btn1_setting()
{

}
function Btn2_setting()
{
    
}
function Btn3_setting()
{
    
}

function change_Button_color(clicked_btn)
{
    console.log("change_Button_color",clicked_btn);
    if (clicked_btn==1){
        Memo_btn1.style.background=btn1_activate_color;
        Memo_btn2.style.background= deactivated_color;
        Memo_btn3.style.background= deactivated_color;
    }else if(clicked_btn==2){
        Memo_btn2.style.background=btn2_activate_color;
        Memo_btn1.style.background= deactivated_color;
        Memo_btn3.style.background= deactivated_color;
    }else if(clicked_btn==3){    
        Memo_btn3.style.background=btn3_activate_color;
        Memo_btn2.style.background= deactivated_color;
        Memo_btn1.style.background= deactivated_color;
    }
    else{
        alert("[Error] Memo color Error!!")
    }
}

function save_cur_data()
{   
    let current_activate_btn=parseInt(localStorage.getItem('memo_Btn'));
    console.log("current_activate_btn",current_activate_btn);
    if (current_activate_btn==1){
        localStorage.setItem("memo1",Memo_area.value);
    }else if (current_activate_btn==2){
        localStorage.setItem("memo2",Memo_area.value);
    }else if (current_activate_btn==3){
        localStorage.setItem("memo3",Memo_area.value);
    }else{
     //   alert("current activatged button Error");
    }
    

    localStorage.setItem("memo_Btn",String(current_activate_btn));
}

function change_btn_state(clicked_btn){
    console.log("change_btn_state",clicked_btn);
    let current_activate_btn=parseInt(localStorage.getItem('memo_Btn'));
    
    // 현재 데이터 저장히기
    save_cur_data(current_activate_btn);
    
    // Memo Button 색 변경
    change_Button_color(clicked_btn);

    // Click한 버튼번호로 변경
    localStorage.setItem("memo_Btn",String(clicked_btn));

    let memo_data="memo"+String(clicked_btn);
    Memo_area.value= localStorage.getItem(memo_data);

}

// Button Click Event
function Btn1_click()
{
    change_btn_state(1);
}
function Btn2_click()
{
    change_btn_state(2);

}
function Btn3_click()
{
    change_btn_state(3);

}

function text_focusing(event){
    console.log("text_focusing");
    Edit_Activation=true;
    Memo_area.style.background =memo_activated_color;
    
    //Memo_area.focus();
    //Memo_area.setstart(0,0); // 첫줄부터 시작

}

function shortkey_run_n_save(event, keysDown){
    let current_activate_btn=parseInt(localStorage.getItem('memo_Btn'));
    if (keysDown["Control"] && keysDown["Enter"]) {
        //do what you want when control and a is pressed for example
        save_cur_data(current_activate_btn); // 현재 데이터 저장
        // 여기에 마크업  변환 함수 넣기
        console.log("run and save");
        Edit_Activation=false;
      }
}

function text_focus_out()
{
    console.log("text_focus_out");
    let current_activate_btn=parseInt(localStorage.getItem('memo_Btn'));
    event.target.style.background =memo_deactivated_color;
    save_cur_data(current_activate_btn);
    Edit_Activation=false;
}

function keydown(event){
    
    keysDown[event.key] = true;
    shortkey_run_n_save(event, keysDown);
}


function keyup(event){
    keysDown[event.key] = false;
}    
function text_area_Setting(){
    // Event Setting
    console.log(Memo_area.selectionStart);

    Memo_area.addEventListener('focus',text_focusing);
    Memo_area.addEventListener('focusout',text_focus_out);
    Memo_area.addEventListener("keydown",keydown);
    Memo_area.addEventListener("keyup",keyup);


    // Initial UI Setting
    Memo_area.style.color=memo_font_color;
    //Memo_area.setSelectionRange(0,0); 
    Memo_area.style.background= memo_deactivated_color;

    Memo_area.placeholder="sd";   
}

function update_memo(){
    console.log("update_memo");
    let stored_activated_btn=localStorage.getItem('memo_Btn');
    let current_activate_btn;
    
    
    if(stored_activated_btn=="undefined"){
        console.log("update_memo11",stored_activated_btn);
        // 정의되어 있지 않으면 1로 초기화
        localStorage.setItem('memo_Btn',"1"); 
        current_activate_btn=1;
    }else{
        console.log("update_memo22",stored_activated_btn);
        current_activate_btn=parseInt(stored_activated_btn);
        console.log("current_activate_btn",current_activate_btn);
        let memo_data="memo"+String(current_activate_btn);
        Memo_area.value= localStorage.getItem(memo_data);
    }
    
    change_btn_state(current_activate_btn);
}




function init(){
    update_memo();
    Btn_list_setting();
    text_area_Setting();
  
  setInterval(save_cur_data,3000); // 3초에 한번씩 자동저장
    
}

init();
