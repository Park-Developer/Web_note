const schedule_table=document.querySelector(".js-Schedule__Table");
const past_Color="#808080"; // #808080 : Gray 
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

function move_to_Detail(){
    location.href = "detail.html";
}


function setClickEvent(){
    for(var i = 0; i < schedule_table.rows.length; i++) {
        schedule_table.rows[i].cells[1].addEventListener('click',move_to_Detail);
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
  setClickEvent();

  console.log('length',schedule_table.rows.length);
  console.log(schedule_table.rows[2].cells[1]);

}
  
  init();
  