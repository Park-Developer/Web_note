const schedule_table=document.querySelector(".js-Schedule__Table");
const past_Color="#808080"; // #808080 : Gray 
const detail_setting=document.querySelector(".js-Detail_frame__setting");
const detail_modification=document.querySelector(".js-Detail_frame__modification");

const reset_button=document.querySelector(".js-Schedule__reset");

let event_use_state={
    /*
    0 : Not Use
    N : Event Number
     */

    // AM 6 Setting
    "AM_From_0600_To_0610" :0,
    "AM_From_0610_To_0620" :0,
    "AM_From_0620_To_0630" :0,
    "AM_From_0630_To_0640" :0,
    "AM_From_0640_To_0650" :0,
    "AM_From_0650_To_0700" :0,
    // AM 7 Setting
    "AM_From_0700_To_0710" :0,
    "AM_From_0710_To_0720" :0,
    "AM_From_0720_To_0730" :0,
    "AM_From_0730_To_0740" :0,
    "AM_From_0740_To_0750" :0,
    "AM_From_0750_To_0800" :0,
    // AM 8 Setting
    "AM_From_0800_To_0810" :0,
    "AM_From_0810_To_0820" :0,
    "AM_From_0820_To_0830" :0,
    "AM_From_0830_To_0840" :0,
    "AM_From_0840_To_0850" :0,
    "AM_From_0850_To_0900" :0,
    // AM 9 Setting
    "AM_From_0900_To_0910" :0,
    "AM_From_0910_To_0920" :0,
    "AM_From_0920_To_0930" :0,
    "AM_From_0930_To_0940" :0,
    "AM_From_0940_To_0950" :0,
    "AM_From_0950_To_1000" :0,
    // AM 10 Setting
    "AM_From_1000_To_1010" :0,
    "AM_From_1010_To_1020" :0,
    "AM_From_1020_To_1030" :0,
    "AM_From_1030_To_1040" :0,
    "AM_From_1040_To_1050" :0,
    "AM_From_1050_To_1100" :0,
    // AM 11 Setting
    "AM_From_1100_To_1110" :0,
    "AM_From_1110_To_1120" :0,
    "AM_From_1120_To_1130" :0,
    "AM_From_1130_To_1140" :0,
    "AM_From_1140_To_1150" :0,
    "AM_From_1150_To_1200" :0,
    
    // PM 12 Setting
    "PM_From_1200_To_1210" :0,
    "PM_From_1210_To_1220" :0,
    "PM_From_1220_To_1230" :0,
    "PM_From_1230_To_1240" :0,
    "PM_From_1240_To_1250" :0,
    "PM_From_1250_To_0100" :0,
    // PM 1 Setting
    "PM_From_0100_To_0110" :0,
    "PM_From_0110_To_0120" :0,
    "PM_From_0120_To_0130" :0,
    "PM_From_0130_To_0140" :0,
    "PM_From_0140_To_0150" :0,
    "PM_From_0150_To_0200" :0,
    // PM 2 Setting
    "PM_From_0200_To_0210" :0,
    "PM_From_0210_To_0220" :0,
    "PM_From_0220_To_0230" :0,
    "PM_From_0230_To_0240" :0,
    "PM_From_0240_To_0250" :0,
    "PM_From_0250_To_0300" :0,
    // PM 3 Setting
    "PM_From_0300_To_0310" :0,
    "PM_From_0310_To_0320" :0,
    "PM_From_0320_To_0330" :0,
    "PM_From_0330_To_0340" :0,
    "PM_From_0340_To_0350" :0,
    "PM_From_0350_To_0400" :0,
    // PM 4 Setting
    "PM_From_0400_To_0410" :0,
    "PM_From_0410_To_0420" :0,
    "PM_From_0420_To_0430" :0,
    "PM_From_0430_To_0440" :0,
    "PM_From_0440_To_0450" :0,
    "PM_From_0450_To_0500" :0,
    // PM 5 Setting
    "PM_From_0500_To_0510" :0,
    "PM_From_0510_To_0520" :0,
    "PM_From_0520_To_0530" :0,
    "PM_From_0530_To_0540" :0,
    "PM_From_0540_To_0550" :0,
    "PM_From_0550_To_0600" :0,
    // PM 6 Setting
    "PM_From_0600_To_0610" :0,
    "PM_From_0610_To_0620" :0,
    "PM_From_0620_To_0630" :0,
    "PM_From_0630_To_0640" :0,
    "PM_From_0640_To_0650" :0,
    "PM_From_0650_To_0700" :0,
    // PM 7 Setting
    "PM_From_0700_To_0710" :0,
    "PM_From_0710_To_0720" :0,
    "PM_From_0720_To_0730" :0,
    "PM_From_0730_To_0740" :0,
    "PM_From_0740_To_0750" :0,
    "PM_From_0750_To_0800" :0,
    // PM 8 Setting
    "PM_From_0800_To_0810" :0,
    "PM_From_0810_To_0820" :0,
    "PM_From_0820_To_0830" :0,
    "PM_From_0830_To_0840" :0,
    "PM_From_0840_To_0850" :0,
    "PM_From_0850_To_0900" :0,
    // PM 9 Setting
    "PM_From_0900_To_0910" :0,
    "PM_From_0910_To_0920" :0,
    "PM_From_0920_To_0930" :0,
    "PM_From_0930_To_0940" :0,
    "PM_From_0940_To_0950" :0,
    "PM_From_0950_To_1000" :0,
    // PM 10 Setting
    "PM_From_1000_To_1010" :0,
    "PM_From_1010_To_1020" :0,
    "PM_From_1020_To_1030" :0,
    "PM_From_1030_To_1040" :0,
    "PM_From_1040_To_1050" :0,
    "PM_From_1050_To_1100" :0,
    // PM 11 Setting
    "PM_From_1100_To_1110" :0,
    "PM_From_1110_To_1120" :0,
    "PM_From_1120_To_1130" :0,
    "PM_From_1130_To_1140" :0,
    "PM_From_1140_To_1150" :0,
    "PM_From_1150_To_1200" :0,
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

function modify_event(clicked_event_class){
    console.log("modify_event",clicked_event_class);

    // 창 크기 조정
    detail_modification.style.width = event_frame_open_width;
    detail_setting.style.width = event_frame_close_width;
    console.log("[Debug] find evet",find_event_from_Time(clicked_event_class));
    let target_event_data=find_event_from_Time(clicked_event_class)[0].split(",");

    //Registered Event Name
    event_name_Mod.value=target_event_data[0];
    
    //Registered Event Time
    from_hour_Mod.options[0].text=target_event_data[1];
    from_minute_Mod.options[0].text=target_event_data[2];
    to_hour_Mod.options[0].text=target_event_data[3];
    to_minute_Mod.options[0].text=target_event_data[4];
}

function calc_time_value(is_PM,hour,minute){
    let calced_hour;
    let calced_minute;
    let time_value;

    if (Number.isInteger(hour)==false){
        hour=parseInt(hour);
    }

    if (Number.isInteger(minute)==false){
        minute=parseInt(minute);
    }

    if (is_PM==true && hour!=12){
        calced_hour=12+hour;
    }else{
        calced_hour=hour;
    }
    calced_minute=minute/100;

    time_value=calced_hour+calced_minute;
    
    return time_value;

}

function find_event_from_Time(event_class_name){
    let regex = /[^0-9]/g;
    let key;
    let event_data;
    let temp;
    let event_From_hour;
    let event_From_minute;
    let event_To_hour;
    let event_To_minute;
    let from_time=0;
    let to_time=0;
    let is_PM=false;
    
    let temp1 = event_class_name;
    let temp2 = temp1.split(' ');
    let cls_name=temp2[1];
    console.log("cls_name",cls_name);
    let target_event_time = cls_name.split("_");

    let target_event_hour = parseInt(target_event_time[1].replace(regex,""));
    let target_event_minute = parseInt(target_event_time[2].replace(regex,""));

    if (cls_name.indexOf("pm")!=-1 && target_event_hour!=12){
        target_event_hour+=12;
    }
    
    let Comparison_time=target_event_hour+(target_event_minute/100);

    for(let i=0; i<localStorage.length; i++) {
        key=localStorage.key(i);
        if (key.indexOf("Event #")!=-1){
            event_data=localStorage[key];
            temp=event_data.split(",");
            console.log(temp);
            
            // From Time 계산
            if (temp[1].indexOf("PM")!=-1){
                is_PM=true;
            }else{
                is_PM=false;
            }

            event_From_hour=parseInt(temp[1].replace(regex, ""));
            event_From_minute=parseInt(temp[2].replace(regex, ""));

            from_time=calc_time_value(is_PM,event_From_hour,event_From_minute);

            // To Hour 계산
            if (temp[3].indexOf("PM")!=-1){
                is_PM=true;
            }else{
                is_PM=false;
            }

            event_To_hour=parseInt(temp[3].replace(regex, ""));
            event_To_minute=parseInt(temp[4].replace(regex, ""));

            to_time=calc_time_value(is_PM,event_To_hour,event_To_minute);

            if (Comparison_time>=from_time && Comparison_time<=to_time){
                return [event_data,key];
                break;
            }
       }
    }
    return [undefined,undefined];
}

function set_event(target_event_clsName){
    console.log("set_event",target_event_clsName);
    let time_info=target_event_clsName.split(" ")[1]

    let regex = /[^0-9]/g;	

    detail_setting.style.width = event_frame_open_width;
    detail_modification.style.width = event_frame_close_width;
    
    let hour_int;
    let minute_int;

    // Hour Setting
    if (time_info.indexOf("am")!=-1){
        hour_int =time_info.split("am")[0].replace(regex,"");
        minute_int= time_info.split("am")[1].replace(regex,"");

        from_hour.value=hour_int+" AM";
    }else{
        hour_int =time_info.split("pm")[0].replace(regex,"");
        minute_int= time_info.split("pm")[1].replace(regex,"");

        from_hour.value=hour_int+" PM";
    }

    // Minute Setting
    if (minute_int=="0"){
        minute_int="00";
    }
    from_minute.value=minute_int;
 
}

function find_event_state_para(class_name){
    console.log("find_event_state_para",class_name);
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
  

    let clicked_event=time_zone+"_From_"+hour+minute+"_To_"+next_hour+next_minute;
    return clicked_event;
}


function table_click_event(){
    console.log("event.target.parentNode.className",event.target.parentNode.className);
    let clicked_event_class=find_event_state_para(event.target.parentNode.className);
 
    let target_event_clsName=event.target.parentNode.className;
    
    if (event_use_state[clicked_event_class]!=0){
        console.log("event modification");
        modify_event(target_event_clsName);
        
    }else{
        console.log("event setting");
        set_event(target_event_clsName);
    }
}

function reset_schedule(){
    console.log("reset_schedule",reset_schedule);
    //localStorage에 저장되어 있는 Event reset

    for(let i=0; i<localStorage.length; i++) {
        let key=localStorage.key(i);
        if (key.indexOf("Event #")!=-1){
            localStorage.removeItem(key);
        }
      }
    
    // Event Counter 초기화
    localStorage.setItem("event_counter", "0");

    let state_obj_size = Object.keys(event_use_state).length;
    let k=0;

    for (k=0;k<state_obj_size;k++){
        Object.values(event_use_state)[k]=0;
    }

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
}

init();
