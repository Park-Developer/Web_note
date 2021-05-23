//datail.html
var is_alarm=false;
const selection_color="#000080";
const event_number=20;

var event_counter=0;

// Event Color Setting
var event_color={
    event_color_1:"#FF3300", // 진한 주황
    event_color_2:"#FFFF00", // 진한 노랑
    event_color_3:"#00CC00", // 진한 연두
    event_color_4:"#009999", // 진한 청록
    event_color_5:"#0099FF" ,// 진한 하늘
    event_color_6:"#0000FF", //진한 보라
    event_color_8:"#FF0099", //진한 보라

    event_color_9:"#FF6600",
    event_color_10:"#FFFF33",
    event_color_11:"#00FF00",
    event_color_12:"#00CCCC",
    event_color_13:"#00CCFF",
    event_color_14:"#3366FF",
    event_color_15:"#9933FF",
    event_color_16:"#FF00FF",

    event_color_17:"#FF9966",
    event_color_18:"#FFFF99",
    event_color_19:"#99FF99",
    event_color_20:"#66FFCC"
};


// Detail Frame
const detail_frame=document.querySelector(".js-Detail_frame");
cancel_btn =detail_frame.querySelector(".event_setting_cancel_buttons");
save_btn =detail_frame.querySelector(".event_setting_save_buttons");

// Event Name
event_name =detail_frame.querySelector(".event_setting__name_text");

//Event Time
from_hour=detail_frame.querySelector(".event_setting__Hour__From__option");
from_minute=detail_frame.querySelector(".event_setting__Minuete__From__option");
to_hour=detail_frame.querySelector(".event_setting__Hour__To__option");
to_minute=detail_frame.querySelector(".event_setting__Minuete__To__option");

event_alarm=detail_frame.querySelector(".event_setting__alarm_option");

// Scheduel 
const schedule=document.querySelector(".js-Schedule");



function extract_time_class_Info(selected_hour, selected_minute){
    // 선택된 데이터를 통해 해당 class명을 return
    var selected_time="row_";
    var regex = /[^0-9]/g;	
    var hour = selected_hour.replace(regex, "");
    var minute= selected_minute.replace(regex, "");
        if (minute=="00"){ // 00 중복 제거
            minute="0";
        }
    var result="";
    
    if (selected_hour.indexOf("AM")!=-1){
        result="."+selected_time+hour+"am"+"_"+minute+"m";
    }else{
        result="."+selected_time+hour+"pm"+"_"+minute+"m";
    }

    return result;
}


function calc_timeIdx(hour,minute){
    var regex = /[^0-9]/g;	
    var hour_int = parseInt(hour.replace(regex, ""));
    var minute_int= parseInt(parseInt(minute.replace(regex, ""))/10)%6;
    
    var time_idx=0;
    
    if (hour.indexOf("PM")!=-1 && hour_int!=12){
        //12시가 아닌 PM 시간인 경우
        time_idx=(hour_int+12-1)*6+minute_int;
    }else{
        time_idx=(hour_int-1)*6+minute_int;
    }

    return time_idx;
}

function return_className_from_Idx(time_idx){
    var hour = parseInt(time_idx/6); // 값은 2
    var minute = time_idx % 6; // 값은 3
    
    if (hour>=11){
        if (hour==11){
            result=".row_"+String(12)+"pm"+"_"+String((minute)*10)+"m";
        }else{
        result=".row_"+String(hour+1-12)+"pm"+"_"+String((minute)*10)+"m";
        }
    }else{
        result=".row_"+String(hour+1)+"am"+"_"+String((minute)*10)+"m";
    }

    return result;

}

function select_related_times(from_hour, from_minute,to_hour, to_minute){
    // Event 시간 대 색칠하기
    from_idx=calc_timeIdx(from_hour.value, from_minute.value);
    to_idx=calc_timeIdx(to_hour.value, to_minute.value);

    //var step;
    //var step_number=to_idx-from_idx;
    //console.log('from',from_idx);
    //console.log('to',to_idx);
 

    // Event 시간 영역 색칠하기
    time_idx=from_idx; // 색칠 시작 포인트
    for (time_idx; time_idx < to_idx; time_idx++) {
        //console.log('time idx', time_idx);
        //console.log(return_className_from_Idx(time_idx));
        var selected_time_class=document.querySelector(return_className_from_Idx(time_idx));
        var color_code="event_color_"+String(event_counter);
        selected_time_class.style.backgroundColor= event_color[color_code];
    }
}

function check_time_condition(from_hour_value,from_minute_value,to_hour_value,to_minute_value){
    is_pass=true;

    // CASE1 : Time Selection Check
    if (from_hour_value=="--Hour--" || from_minute_value=="--Minutes--"){
        alert("[Error] Select Correct From Time");
        is_pass=false;
    }
    
    if (to_hour_value=="--Hour--" || to_minute_value=="--Minutes--"){
        alert("[Error] Select Correct To Time");
        is_pass=false;
    }

    // CASE2 : Time Range Check
    var from_timeIdx=calc_timeIdx(from_hour_value,from_minute_value);
    var to_timeIdx=calc_timeIdx(to_hour_value,to_minute_value);
    
    if (from_timeIdx>=to_timeIdx){
        alert("[Error] Time Range Error!");
        is_pass=false;
    }
    return is_pass;
}

function check_alarm_condition(){
   
    if (event_alarm.value=="--Please choose an option--"){
        is_alarm=false;
    }else{
        is_alarm=true;
    }

    // error 처리 기능도 추가
}

function check_save_condition(from_hour_value,from_minute_value,to_hour_value,to_minute_value){
    var time_pass=false;
    
    time_pass=check_time_condition(from_hour_value,from_minute_value,to_hour_value,to_minute_value);
    check_alarm_condition();
    
    return time_pass;
}

function save_click(){
    event_counter+=1;
    var is_save_possible=false;

    is_save_possible=check_save_condition(from_hour.value,from_minute.value,to_hour.value,to_minute.value);
    select_related_times(from_hour, from_minute,to_hour, to_minute); //  Event 시간 색칠하기
    
    register_event(); // Event 이름 등록

    if(is_save_possible==true){
        location.href = "index.html"; // index.html로 돌아가기
    }else{
        
    }
    

}

function merging_table(event_start_point){
    from_idx=calc_timeIdx(from_hour.value, from_minute.value);
    to_idx=calc_timeIdx(to_hour.value, to_minute.value);
    var span_number=(to_idx-from_idx);


    //test_table=schedule.querySelector(".row_7am_50m");
    //console.log(test_table);
    //test_table__detail_property=test_table.querySelector(".detail_event");
    event_start_point.setAttribute("rowspan", span_number); 
    
}

function register_event(){

    // Class Name 확인
    var event_startTime_cls=extract_time_class_Info(from_hour.value,from_minute.value);

    // 해당 Class 선택 
    var startTime=document.querySelector(event_startTime_cls);
    var event_start_point=startTime.querySelector(".detail_event");

    // 행 합치기
    merging_table(event_start_point)

    /*
    test_table=schedule.querySelector(".row_7am_50m");
    console.log(test_table);
    test_table__detail_property=test_table.querySelector(".detail_event");
    test_table__detail_property.setAttribute("rowspan", 3); 
    */

    // Event명 & Alarm 기록
    if (is_alarm==true){
        event_start_point.innerText=event_name.value+"🕒";
    }else{
        event_start_point.innerText=event_name.value;
    }

    // Alarm 기록
    // test

}

function cancel_click(){
    location.href = "index.html";
}



function init()
{
// [TEST]
// [TEST]

// Event Setting
save_btn.addEventListener("click", save_click);
cancel_btn.addEventListener("click", cancel_click);

}


init();


