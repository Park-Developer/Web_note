function body_click_event(){
    console.log("body_click_event",event.target);
    
    // Memo와 MD 창이 아닌 영역에서만 Event 실행
    if (MD_converted_result.contains(event.target)==false || Memo_area.contains(event.target)){  
        change_to_MD_Display();
    } else{
    
    }
}

// Event Setting
function init(){
    document.body.addEventListener('click', body_click_event);  
}

init();