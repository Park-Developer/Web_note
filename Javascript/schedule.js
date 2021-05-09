
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
            min_cls.style.backgroundColor="red";
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
    console.log(hour);
    /*
    var hour_cls1=`.row_${hour}${time_type}_0m`;
    var hour_cls2=`.row_${hour}${time_type}_10m`;
    var hour_cls3=`.row_${hour}${time_type}_20m`;
    var hour_cls4=`.row_${hour}${time_type}_30m`;
    var hour_cls5=`.row_${hour}${time_type}_40m`;
    var hour_cls6=`.row_${hour}${time_type}_50m`;
    var current_hour1=document.querySelector(hour_cls1);
    var current_hour2=document.querySelector(hour_cls2);
    var current_hour3=document.querySelector(hour_cls3);
    var current_hour4=document.querySelector(hour_cls4);
    var current_hour5=document.querySelector(hour_cls5);
    var current_hour6=document.querySelector(hour_cls6);
    current_hour1.style.backgroundColor="red";
    current_hour2.style.backgroundColor="red";
    current_hour3.style.backgroundColor="red";
    current_hour4.style.backgroundColor="red";
    current_hour5.style.backgroundColor="red";
    current_hour6.style.backgroundColor="red";
    */
    var hour_cls1=`.row_th_${hour}${time_type}`;
    var current_hours=document.querySelectorAll(hour_cls1);
    
    current_hours.forEach(hour=>hour.style.backgroundColor="red");


    //current_hour1.style.backgroundColor="red";
}

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds= date.getSeconds()
    
    const month = date.getMonth()
    const day = date.getDay();
    const year = date.getUTCFullYear();
    check_priorTime(hours,minutes);
  }  
  

  function init(){
  getTime();
  setInterval(getTime,1000);
 
}
  
  init();
  