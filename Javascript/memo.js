const Memo = document.querySelector(".js-Memo"),
      Memo_Title= Memo.querySelector(".js-Memo_Title"),
      Memo_BTN_List= Memo.querySelector(".js-Memo__Button_list"),
      Memo_btn1= Memo.querySelector(".js-Memo__Button_1"),
      Memo_btn2= Memo.querySelector(".js-Memo__Button_2"),
      Memo_btn3= Memo.querySelector(".js-Memo__Button_3"),
      Memo_area= Memo.querySelector(".js-Memo_contents");

// Button Color
const deactivated_color="#696969";

const btn1_activate_color="#000080"
const btn2_activate_color="#FFA500";
const btn3_activate_color="#008000";

// Button State
var btn1_state=false;  
var btn2_state=false;
var btn3_state=false;

var current_activate_btn=0; //현재 작업중인 버튼 


// Text Area Setting 
const memo_font_color="	#000000";
const memo_activated_color="#FDFD96";
const memo_deactivated_color="#FFFFFF";
let keysDown = {};

function Btn_list_setting()
{
    // [Common Setting] 
    Memo_btn1.style.background= deactivated_color;
    Memo_btn2.style.background= deactivated_color;
    Memo_btn3.style.background= deactivated_color;

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

function save_cur_data(current_activate_btn)
{
    if (current_activate_btn==1){
        localStorage.setItem("memo1",Memo_area.value);
    }else if (current_activate_btn==2){
        localStorage.setItem("memo2",Memo_area.value);
    }else{
        localStorage.setItem("memo3",Memo_area.value);
    }

}

function change_btn_state(clicked_btn){
    if (clicked_btn==1){
        btn1_state=true;
        btn2_state=false;
        btn3_state=false;
    
        // 색 변경
        Memo_btn1.style.background=btn1_activate_color;
        Memo_btn2.style.background= deactivated_color;
        Memo_btn3.style.background= deactivated_color;

        // 현재 작성하던 메모 내용 저장하기
        save_cur_data(current_activate_btn);
        current_activate_btn=1;

       
        Memo_area.value= localStorage.getItem('memo1');

        
    }else if(clicked_btn==2){
        btn1_state=false;
        btn2_state=true;
        btn3_state=false;
    
        Memo_btn2.style.background=btn2_activate_color;
        Memo_btn1.style.background= deactivated_color;
        Memo_btn3.style.background= deactivated_color;

         // Local Storage에서 데이터 불러오기
         save_cur_data(current_activate_btn);
         current_activate_btn=2;

        Memo_area.value= localStorage.getItem('memo2');

    }else
    {   btn1_state=true;
        btn2_state=false;
        btn3_state=true;
    
        Memo_btn3.style.background=btn3_activate_color;
        Memo_btn2.style.background= deactivated_color;
        Memo_btn1.style.background= deactivated_color;
        
        // Local Storage에서 데이터 불러오기
        save_cur_data(current_activate_btn);
        current_activate_btn=3;

        Memo_area.value= localStorage.getItem('memo3');

    }

        

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
    Memo_area.style.background =memo_activated_color;
  
    //Memo_area.focus();
    //Memo_area.setstart(0,0); // 첫줄부터 시작

}

function shortkey_run_n_save(event, keysDown){

    if (keysDown["Control"] && keysDown["Enter"]) {
        //do what you want when control and a is pressed for example
        save_cur_data(current_activate_btn); // 현재 데이터 저장
        // 여기에 마크업  변환 함수 넣기
        console.log("run and save");
      }
}

function text_focus_out()
{
    event.target.style.background =memo_deactivated_color;
    save_cur_data(current_activate_btn);
    
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

function init(){
  
    Btn_list_setting();
    text_area_Setting();
    // Memo_area= Memo.querySelector(".memo_content");
    setInterval(save_cur_data,3000); // 3초에 한번씩 자동저장
    
}

init();
