//datail.html
let is_alarm=false;
let alarm_time=0;
const selection_color="#000080";
const event_number=20;
console.log('loc',window.location.href);
var temp=window.location.href.split('/');
let current_page=temp[temp.length-1];
console.log('current_page',current_page);
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


if (current_page=="index.html"){
    // Main Frame
    console.log('pass');
    var main_frame=document.querySelector(".main_frame"); //new
    console.log('main_frame',main_frame);
    var main_schedule=main_frame.querySelector(".js-Schedule"); 
    console.log('main_schedule',main_schedule);
}else if(current_page=="detail.html"){
    // Detail Frame
  
    var detail_frame=document.querySelector(".detail_frame");
    var detail_schedule=document.querySelector(".js-Schedule");

    var detail_frame__setting=detail_frame.querySelector(".js-Detail_frame__setting");
    var cancel_btn =detail_frame__setting.querySelector(".event_setting_cancel_buttons");
    var save_btn =detail_frame__setting.querySelector(".event_setting_save_buttons");

    // Event Name
    var event_name =detail_frame__setting.querySelector(".event_setting__name_text");

    //Event Time
    var from_hour=detail_frame__setting.querySelector(".event_setting__Hour__From__option");
    var from_minute=detail_frame__setting.querySelector(".event_setting__Minuete__From__option");
    var to_hour=detail_frame__setting.querySelector(".event_setting__Hour__To__option");
    var to_minute=detail_frame__setting.querySelector(".event_setting__Minuete__To__option");

    var event_alarm=detail_frame__setting.querySelector(".event_setting__alarm_option");
}else{
    alert("[Warning] Unknowned Page");
}


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

function select_related_times(event_info,event_counter){
    // Event 시간 대 색칠하기
    let from_idx=calc_timeIdx(event_info["from_hour_value"], event_info["from_minute_value"]);
    let to_idx=calc_timeIdx(event_info["to_hour_value"],event_info["to_minute_value"]);
 

    // Event 시간 영역 색칠하기
    let time_idx=from_idx; // 색칠 시작 포인트

    for (time_idx; time_idx < to_idx; time_idx++) {
        var selected_time_class=document.querySelector(return_className_from_Idx(time_idx));
        var color_code="event_color_"+String(event_counter);
        selected_time_class.style.backgroundColor= event_color[color_code];
    }
}

function check_time_condition(from_hour_value,from_minute_value,to_hour_value,to_minute_value){
    let is_pass=true;

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
        alarm_time=0;
    }else{
        is_alarm=true;
        alarm_time=event_alarm.value;
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
    var event_counter= Number(localStorage.getItem("event_counter"));
    event_counter+=1;

    localStorage.setItem("event_counter", event_counter);

    var is_save_possible=false;

    is_save_possible=check_save_condition(from_hour.value,from_minute.value,to_hour.value,to_minute.value);
    
    if(is_save_possible==true){
            // Event 정보 객체 
        let event_info={
            "event_name":event_name.value,
            "alarm_time":alarm_time,
            "from_hour_value":from_hour.value,
            "from_minute_value":from_minute.value,
            "to_hour_value":to_hour.value,
            "to_minute_value":to_minute.value
        };
        let is_update=false;

        register_event(event_info,event_counter,is_update); // Event 이름 등록
        //location.href = "index.html"; // index.html로 돌아가기
    }else{
        // Alarm 추가
    }
}

function register_event(event_info,event_counter,is_update){
    // Class Name 확인
    var event_startTime_cls=extract_time_class_Info(event_info["from_hour_value"],event_info["from_minute_value"]);
    console.log("event_startTime_cls",event_startTime_cls)
    // 해당 Class 선택 
    // Main Schedule에서 선택
    if (current_page=="index.html"){
        var startTime=main_schedule.querySelector(event_startTime_cls);
        console.log("startTime",startTime);
        var event_start_point=startTime.querySelector(".detail_event");
        console.log(event_start_point);
    }else if(current_page=="detail.html"){
        var startTime=detail_schedule.querySelector(event_startTime_cls);
        var event_start_point=startTime.querySelector(".detail_event");
    }else{
        alert("[Warning] Unknowned Page");
    }


    // Detatil Schedule에서 선택



    // Event 시간 행 합치기
    let from_idx=calc_timeIdx(event_info["from_hour_value"],event_info["from_minute_value"]);
    let to_idx=calc_timeIdx(event_info["to_hour_value"], event_info["to_minute_value"]);
    let span_number=(to_idx-from_idx);
    console.log(" event_start_point", event_start_point);
    event_start_point.setAttribute("rowspan", span_number); 

    // Event명 & Alarm 기록
    if (event_info["alarm_time"]!=0){
        event_start_point.innerText=event_info["event_name"]+"🕒";
        alarm_time=event_info["alarm_time"];
    }else{
        event_start_point.innerText=event_info["event_name"];
        alarm_time=0;
    }
    
    select_related_times(event_info,event_counter); // 관련 구역 색칠

    //Web storage에 데이터 저장
    //Data Form : Event_name,From_Hour,From_Minutes,To_Hour,To_Minutes,Alarm
    if(is_update==false){
    let data_name="Event #"+String(event_counter);
    let web_storage_data=event_info["event_name"]+","+event_info["from_hour_value"]+","+event_info["from_minute_value"]+","
    +event_info["to_hour_value"]+","+event_info["to_minute_value"]+","+event_info["alarm_time"];
    localStorage.setItem(data_name,web_storage_data);
    }

}

function make_eventInfo_fromLD(local_event_data){
    let event_array=local_event_data.split(',');
    /*
    ## Reference ##
    let event_name=event_array[0];
    let alarm_time=event_array[5];
    let from_hour_value=event_array[1];
    let from_minute_value=event_array[2];
    let to_hour_value=event_array[3];
    let to_minute_value=event_array[4];
    */

    let event_info={
        "event_name":event_array[0],
        "alarm_time":event_array[5],
        "from_hour_value":event_array[1],
        "from_minute_value":event_array[2],
        "to_hour_value":event_array[3],
        "to_minute_value":event_array[4]
    };

    return event_info;
}

function save_data(){
    
}

function cancel_click(){
    location.href = "index.html";
}

function update_event()
{
    // Event Counter 설정
    let event_counter=0;

    for(let i=0; i<localStorage.length; i++) {
        //let key = localStorage.key(i);
        //alert(`${key}: ${localStorage.getItem(key)}`);
        let key=localStorage.key(i);
        console.log("kety ?",key);
        if (key.indexOf("Event #")!=-1){
            let regex = /[^0-9]/g;	
            event_counter = parseInt(key.replace(regex, ""));
            
            let data=localStorage.getItem(key);
            let event_info = make_eventInfo_fromLD(data);
            let is_update=true;
            register_event(event_info,event_counter,is_update);
        
        }
      }
    localStorage.setItem("event_counter", event_counter);
}

function init()
{
   
    update_event();

    if (current_page=="index.html"){

    }else if(current_page=="detail.html"){
        save_btn.addEventListener("click", save_click);
        cancel_btn.addEventListener("click", cancel_click);
    }else{
        alert("[Warning] Unknowned Page");
    }
}


init();


