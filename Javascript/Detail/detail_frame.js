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

const selection_color="#000080";

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
    console.log('from',from_idx);
    console.log('to',to_idx);
 
    time_idx=from_idx;
    
    for (time_idx; time_idx < to_idx; time_idx++) {
        console.log('time idx', time_idx);
        console.log(return_className_from_Idx(time_idx));
        var selected_time_class=document.querySelector(return_className_from_Idx(time_idx));
        selected_time_class.style.backgroundColor= selection_color;
    }
}

function sheck_save_condition(from_hour_value,from_minute_value,to_hour_value,to_minute_value){
    // CASE1 : Time Selection Check
    if (from_hour_value=="--Hour--" || from_minute_value=="--Minutes--"){
        alert("[Error] Select Correct From Time");
    }
    
    if (to_hour_value=="--Hour--" || to_minute_value=="--Minutes--"){
        alert("[Error] Select Correct To Time");
    }

    // CASE2 : Time Range Check
    var from_timeIdx=calc_timeIdx(from_hour_value,from_minute_value);
    var to_timeIdx=calc_timeIdx(to_hour_value,to_minute_value);
    
    if (from_timeIdx>=to_timeIdx){
        alert("[Error] Time Range Error!");
    }
    
}

function save_click(){
    sheck_save_condition(from_hour.value,from_minute.value,to_hour.value,to_minute.value);
    select_related_times(from_hour, from_minute,to_hour, to_minute); //  Event 시간 색칠하기
    register_event(); // Event 이름 등록
}


function register_event(){

    // Class Name 확인
    var event_startTime_cls=extract_time_class_Info(from_hour.value,from_minute.value);

    // 해당 Class 선택 
    var startTime=document.querySelector(event_startTime_cls);
    var event_start_point=startTime.querySelector(".detail_event");

    // Event명 기록
    event_start_point.innerText=event_name.value;
    
}

function cancel_click(){

}



function init()
{
// Event Setting
save_btn.addEventListener("click", save_click);
cancel_btn.addEventListener("click", cancel_click);

}


init();


