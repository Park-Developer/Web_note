const schedule_table=document.querySelector(".js-Schedule__Table");
const past_Color="#808080"; // #808080 : Gray 
const detail_setting=document.querySelector(".js-Detail_frame__setting");
const detail_modification=document.querySelector(".js-Detail_frame__modification");

const reset_button=document.querySelector(".js-Schedule__reset");

const event_frame_open_width="60%";
const event_frame_close_width="0%";
let event_use_state={
    // AM 6 Setting
    "AM_From_0600_To_0610" :false,
    "AM_From_0610_To_0620" :false,
    "AM_From_0620_To_0630" :false,
    "AM_From_0630_To_0640" :false,
    "AM_From_0640_To_0650" :false,
    "AM_From_0650_To_0700" :false,
    // AM 7 Setting
    "AM_From_0700_To_0710" :false,
    "AM_From_0710_To_0720" :false,
    "AM_From_0720_To_0730" :false,
    "AM_From_0730_To_0740" :false,
    "AM_From_0740_To_0750" :false,
    "AM_From_0750_To_0800" :false,
    // AM 8 Setting
    "AM_From_0800_To_0810" :false,
    "AM_From_0810_To_0820" :false,
    "AM_From_0820_To_0830" :false,
    "AM_From_0830_To_0840" :false,
    "AM_From_0840_To_0850" :false,
    "AM_From_0850_To_0900" :false,
    // AM 9 Setting
    "AM_From_0900_To_0910" :false,
    "AM_From_0910_To_0920" :false,
    "AM_From_0920_To_0930" :false,
    "AM_From_0930_To_0940" :false,
    "AM_From_0940_To_0950" :false,
    "AM_From_0950_To_1000" :false,
    // AM 10 Setting
    "AM_From_1000_To_1010" :false,
    "AM_From_1010_To_1020" :false,
    "AM_From_1020_To_1030" :false,
    "AM_From_1030_To_1040" :false,
    "AM_From_1040_To_1050" :false,
    "AM_From_1050_To_1100" :false,
    // AM 11 Setting
    "AM_From_1100_To_1110" :false,
    "AM_From_1110_To_1120" :false,
    "AM_From_1120_To_1130" :false,
    "AM_From_1130_To_1140" :false,
    "AM_From_1140_To_1150" :false,
    "AM_From_1150_To_1200" :false,
    // PM 12 Setting
    "PM_From_1200_To_1210" :false,
    "PM_From_1210_To_1220" :false,
    "PM_From_1220_To_1230" :false,
    "PM_From_1230_To_1240" :false,
    "PM_From_1240_To_1250" :false,
    "PM_From_1250_To_0100" :false,
    // PM 1 Setting
    "PM_From_0100_To_0110" :false,
    "PM_From_0110_To_0120" :false,
    "PM_From_0120_To_0130" :false,
    "PM_From_0130_To_0140" :false,
    "PM_From_0140_To_0150" :false,
    "PM_From_0150_To_0200" :false,
    // PM 2 Setting
    "PM_From_0200_To_0210" :false,
    "PM_From_0210_To_0220" :false,
    "PM_From_0220_To_0230" :false,
    "PM_From_0230_To_0240" :false,
    "PM_From_0240_To_0250" :false,
    "PM_From_0250_To_0300" :false,
    // PM 3 Setting
    "PM_From_0300_To_0310" :false,
    "PM_From_0310_To_0320" :false,
    "PM_From_0320_To_0330" :false,
    "PM_From_0330_To_0340" :false,
    "PM_From_0340_To_0350" :false,
    "PM_From_0350_To_0400" :false,
    // PM 4 Setting
    "PM_From_0400_To_0410" :false,
    "PM_From_0410_To_0420" :false,
    "PM_From_0420_To_0430" :false,
    "PM_From_0430_To_0440" :false,
    "PM_From_0440_To_0450" :false,
    "PM_From_0450_To_0500" :false,
    // PM 5 Setting
    "PM_From_0500_To_0510" :false,
    "PM_From_0510_To_0520" :false,
    "PM_From_0520_To_0530" :false,
    "PM_From_0530_To_0540" :false,
    "PM_From_0540_To_0550" :false,
    "PM_From_0550_To_0600" :false,
    // PM 6 Setting
    "PM_From_0600_To_0610" :false,
    "PM_From_0610_To_0620" :false,
    "PM_From_0620_To_0630" :false,
    "PM_From_0630_To_0640" :false,
    "PM_From_0640_To_0650" :false,
    "PM_From_0650_To_0700" :false,
    // PM 7 Setting
    "PM_From_0700_To_0710" :false,
    "PM_From_0710_To_0720" :false,
    "PM_From_0720_To_0730" :false,
    "PM_From_0730_To_0740" :false,
    "PM_From_0740_To_0750" :false,
    "PM_From_0750_To_0800" :false,
    // PM 8 Setting
    "PM_From_0800_To_0810" :false,
    "PM_From_0810_To_0820" :false,
    "PM_From_0820_To_0830" :false,
    "PM_From_0830_To_0840" :false,
    "PM_From_0840_To_0850" :false,
    "PM_From_0850_To_0900" :false,
    // PM 9 Setting
    "PM_From_0900_To_0910" :false,
    "PM_From_0910_To_0920" :false,
    "PM_From_0920_To_0930" :false,
    "PM_From_0930_To_0940" :false,
    "PM_From_0940_To_0950" :false,
    "PM_From_0950_To_1000" :false,
    // PM 10 Setting
    "PM_From_1000_To_1010" :false,
    "PM_From_1010_To_1020" :false,
    "PM_From_1020_To_1030" :false,
    "PM_From_1030_To_1040" :false,
    "PM_From_1040_To_1050" :false,
    "PM_From_1050_To_1100" :false,
    // PM 11 Setting
    "PM_From_1100_To_1110" :false,
    "PM_From_1110_To_1120" :false,
    "PM_From_1120_To_1130" :false,
    "PM_From_1130_To_1140" :false,
    "PM_From_1140_To_1150" :false,
    "PM_From_1150_To_1200" :false,
}
function check_priorTime(hours,minutes){
    var time;
    for (time = 6; time < 24; time++) {
        if (time < hours){
            hour_change_color(time);
        }else if(time >= hours){
            minute_change_color(hours,minutes);
            break;
        }
        
      }
      
}

function minute_change_color(hours,minutes){
    if (hours<12){
        var time_type="am";
        var hour=hours;
    }else{
        var time_type="pm";
        if (hours !=12){
        var hour=hours-12;
        }
        else{
        var hour=hours;
        }
    }
    var min;
    for (min = 10; min < 60; min+=10) {
        if (min<=minutes){
            
            var cls_name=`.row_${hour}${time_type}_${min-10}m`;
            var min_cls=document.querySelector(cls_name);
            min_cls.style.backgroundColor= past_Color;
        }
        else{
            break;
        }
      }
}

function hour_change_color(hours){
    if (hours<12){
        var time_type="am";
        var hour=hours;
    }else{
        var time_type="pm";
        if (hours !=12){
        var hour=hours-12;
        }
        else{
        var hour=hours;
        }
    }
 
  
    var hour_cls1=`.row_th_${hour}${time_type}`;
    var current_hours=document.querySelectorAll(hour_cls1);
    
    current_hours.forEach(hour=>hour.style.backgroundColor= past_Color);

}

function modify_event(){
    detail_modification.style.width = event_frame_open_width;
    detail_setting.style.width = event_frame_close_width;
}

function set_event(){
    detail_setting.style.width = event_frame_open_width;
    detail_modification.style.width = event_frame_close_width;
}
function find_event_state_para(class_name){
    let temp1 = class_name;
    let temp2 = temp1.split(' ');
    let cls_name=temp2[1];
    
    let regex = /[^0-9]/g;	

    let time = cls_name.split("_");
    
    let hour = time[1].replace(regex,"");
    let minute = time[2].replace(regex,"");

    let time_zone;
    if (cls_name.indexOf("am")!=-1){
        time_zone="AM";
    }else{
        time_zone="PM";
    }

    let next_hour;
    let next_minute;

    if (minute=="50"){
        if (hour=="12"){
            next_hour="01";
        }
        else{
            next_hour=String(Number(hour)+1);
        }
        next_minute="00";
    }else{
        next_hour=hour;
        next_minute=String(10+Number(minute));
    }

    if (Number(hour)<10){
        hour="0"+hour;
    }
    if (Number(minute)<10){
        minute="0"+minute;
    }
    if (Number(next_hour)<10){
        next_hour="0"+next_hour;
    }
    if (Number(next_minute)<10){
        next_minute="0"+next_minute;
    }

    let clicked_event=time_zone+"_From_"+hour+minute+"_To_"+next_hour+next_minute;
    return clicked_event;
}


function table_click_event(){
    let clicked_event=find_event_state_para(event.target.parentNode.className);

    if (event_use_state[clicked_event]==true){
        modify_event();
    }else{
        set_event();
    }
}

function reset_schedule(){
    //localStorage에 저장되어 있는 Event reset

    for(let i=0; i<localStorage.length; i++) {
        let key=localStorage.key(i);
        if (key.indexOf("Event #")!=-1){
            localStorage.removeItem(key);
        }
      }
    
      // Event Counter 초기화
    localStorage.setItem("event_counter", "0");
    location.href="index.html";
}
function set_reset_event(){
    reset_button.addEventListener('click',reset_schedule);
}




function set_table_ClickEvent(){
    for(var i = 0; i < schedule_table.rows.length; i++) {
        if (i>=1){
            if ((i-1)%6==0){
                console.log("i",i);
                schedule_table.rows[i].cells[2].addEventListener('click',table_click_event);
            
            }
            else{
                schedule_table.rows[i].cells[1].addEventListener('click',table_click_event);
               
            }
        }
    }
}



function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds= date.getSeconds()
    
    const month = date.getMonth()
    const day = date.getDay();
    const year = date.getUTCFullYear();
    //test
    if (hours>=7){
        check_priorTime(hours,minutes);
    }else{
        
    }

  }  
  


  function init(){
  // 시간표시
  getTime();
  setInterval(getTime,1000);

  // Event 설정
  set_table_ClickEvent();
  set_reset_event();

  console.log('length',schedule_table.rows.length);
  console.log(schedule_table.rows[2].cells[1]);

}
  
  init();
  