function calc_schedule_timeValue(hour_value,minute_value){
    console.log("calc_schedule_timeValue",hour_value,minute_value);
    let regex = /[^0-9]/g;	
    console.log("hour_value,minute_value",hour_value,minute_value);
    let hour_num=parseInt(hour_value.replace(regex, ""));
    let muinute_num=parseInt(minute_value.replace(regex, ""));
    let timeValue=0;

    if (hour_value.indexOf("PM")!=-1 && hour_num !=12){
        hour_num+=12;
    }
    timeValue=hour_num+(muinute_num/100);
    
    return timeValue;
    
}

function search_duplicate(setting_from_time,setting_to_time){
    console.log("search_duplicate",setting_from_time,setting_to_time);
    /*
    : setting_from_time,setting_to_time은 모두 정수형이어야함
    */
    let event_counter=0;
    
    let from_hour_value=0;
    let from_minute_value=0;
    let to_hour_value=0;
    let to_minute_value=0;
    let key;

    let event_from_time=0;
    let event_to_time=0;
    let is_duplicate=false;

    //"to_minute_value":event_array[4]
    for(let i=0; i<localStorage.length; i++) {
        key=localStorage.key(i);
        console.log("kety ?",key);
        if (key.indexOf("Event #")!=-1){
            let regex = /[^0-9]/g;	
            event_counter = parseInt(key.replace(regex, ""));
            
            let data=localStorage.getItem(key);
            let event_info = make_eventInfo_fromLD(data);

            from_hour_value=event_info["from_hour_value"];
            from_minute_value=event_info["from_minute_value"];
            to_hour_value=event_info["to_hour_value"];
            to_minute_value=event_info["to_minute_value"];

            event_from_time= calc_schedule_timeValue(from_hour_value,from_minute_value);
            event_to_time_= calc_schedule_timeValue(to_hour_value,to_minute_value);
            
            if ((event_to_time>=setting_from_time) && (setting_to_time>=event_from_time)){
                let is_duplicate=true;
                return is_duplicate;
                break;
            }
        }
      }
    return is_duplicate;

}

function event_number_shift(removed_key){
    let event_counter= Number(localStorage.getItem("event_counter"));
    let last_event_data=localStorage["Event #"+String(event_counter)];

    localStorage[removed_key]=last_event_data;

    

    
    // Remove Last Event
    localStorage.removeItem("Event #"+String(event_counter));

    // Reduce Count Numbner
    event_counter-=1;
    localStorage.setItem("event_counter", event_counter);
    
    /* [Referece] : Rename Key of local Storage

    As you see, there is no move- or rename method. 
    So the only way to change the key of data is by using getItem to 
    get the data from the old key, setItem to put it to the new key 
    and removeItem to remove the old key.*/

}