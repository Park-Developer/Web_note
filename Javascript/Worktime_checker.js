const Worktime_Checker = document.querySelector(".js-Worktime_checker"),
    Worktime_Checker__Title = Worktime_Checker.querySelector(".js-Worktime_checker_Title"),
    Worktime_Checker__Form = Worktime_Checker.querySelector(".js-Worktime_checker_Form"),
    Worktime_Checker__Input = Worktime_Checker__Form.querySelector("input"),
    Worktime_Checker__Lists = Worktime_Checker.querySelector(".js-Worktime_checker_Lists"),
    Worktime_Checker__Table = Worktime_Checker.querySelector(".js-Worktime_checker__StatisticTable");

const WORK_LISTS = "work_lists";

const WORK_TIMER_NUMBER = 15;

let TIMER_BUFFER = [];

var work_chart = new Chart(document.querySelector(".Summary_bar-chart"), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: []
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Work Chart'
        }
    }
});

// TIMMER_BUFFER Initialization
for (var i = 0; i < WORK_TIMER_NUMBER; i++) {
    var obj = new Object();

    var start_time__keyName = "Timer_" + String(i + 1) + "__Start";
    var end_time__keyName = "Timer_" + String(i + 1) + "__End";
    var recorded_time__keyName = "Timer_" + String(i + 1) + "__Time";

    obj[start_time__keyName] = 0;
    obj[end_time__keyName] = 0;
    obj[recorded_time__keyName] = 0;

    TIMER_BUFFER.push(obj);
}

/*
REFERENCE
    MD_converted_result.style.display="none";
    Memo_area.style.display="block";
 */
let work_lists = [];

function deleteWork(event) {
    console.log("deleteWork");
    let target_btn = event.target;
    let target_li = target_btn.parentNode;

    work_lists.splice(target_li.id - 1, 1);

    update_WL_index();

    Worktime_Checker__Lists.removeChild(target_li); // 화면에서 제거

    save_Workslist();
    //table update
    delete_newRow_toTable(Worktime_Checker__Table, work_lists);
}

function startTimer() {
    // [REF] Timer index = timer buffer array index + 1

    // Start Time Setitng
    let target_btn = event.target;
    let target_li = target_btn.parentNode;
    //[Reference]
    //target_id=worklist array index+1
    let worklist_idx = target_li.id - 1;

    // 밑에 보류
    //timer_index = target_li.id

    //TIMER_BUFFER[timer_index - 1].start_time__keyName = Date.now();
    // 보류

    // Visual Setting
    let delete_btn = target_li.children[1];
    let start_btn = target_li.children[2];
    let end_btn = target_li.children[3];

    delete_btn.style.display = "none";
    start_btn.style.display = "none";

    end_btn.style.display = "block";
    target_li.style.backgroundColor = 'lightgreen';

    // Timer Mode & Start Time Setting
    work_lists[worklist_idx].timer_running = true // Timer Mode Change
    work_lists[worklist_idx].timer_start__time = Date.now();

    //let stored_time = work_lists[worklist_idx].timer_time

}

function count_time() {
    var work_list_number = work_lists.length;

    for (var idx = 0; idx < work_list_number; idx++) {
        if (work_lists[idx].timer_running == true) { // Time측정 모드인 경우
            let stored_time = parseInt(work_lists[idx].timer_stored__time);

            //Target Element
            let running_list = Worktime_Checker__Lists.children[idx];
            let running_list__workname = running_list.children[0];

            // Time Update
            running_list__workname.innerText = work_lists[idx].text + " : " + String(Math.floor((stored_time + Date.now() - work_lists[idx].timer_start__time) / 1000));
            // Math.floor((record__end_time-record__start_time) / 1000);    
        }
    }

}

function endTimer() {
    console.log("endTimer");
    let target_btn = event.target;
    let target_li = target_btn.parentNode;


    //[Reference]
    //target_id=worklist array index+1

    //[Time Setting]
    let worklist_idx = target_li.id - 1;
    let recorded_history = target_li.children[0].innerText;
    work_lists[worklist_idx].timer_running = false;
    let recorded_time = recorded_history.split(":")[1].trim();

    //target_li.children[0].innerText = work_lists[worklist_idx].text;

    work_lists[worklist_idx].timer_stored__time = String(parseInt(work_lists[worklist_idx].timer_stored__time) + parseInt(recorded_time));

    //[Visual Setting]
    let delete_btn = target_li.children[1];
    let start_btn = target_li.children[2];
    let end_btn = target_li.children[3];

    delete_btn.style.display = "block";
    start_btn.style.display = "block";

    end_btn.style.display = "none";

    //[Data Update]
    save_Workslist(); //변경사항 저장
    update_worktable(event);
    target_li.style.backgroundColor = '#1f2124';
    console.log("work_lists", work_lists);
    update_chart(work_lists, work_chart);

    console.log("work chart", work_chart["data"]["datasets"][0]["data"]);
    console.log("work chart", work_chart["data"]["datasets"][0]["backgroundColor"]);
}

function save_Workslist() {
    console.log("save_Workslist() ");
    localStorage.setItem(WORK_LISTS, JSON.stringify(work_lists)); // 
}

function paintwork(text, id) {

    let work_item = document.createElement("li");

    let Timer_delBtn = document.createElement("button");
    Timer_delBtn.innerHTML = "✖";


    let Timer_Start_button = document.createElement("button");
    Timer_Start_button.innerHTML = "▶";

    let Timer_End_button = document.createElement("button");
    Timer_End_button.innerHTML = "⬜";
    Timer_End_button.style.display = "none"; // 안보이게 하기


    let span = document.createElement("span");
    let newId = id;
    span.innerText = "◽" + text;

    // Button Event Setting
    Timer_delBtn.addEventListener("click", deleteWork);
    Timer_Start_button.addEventListener("click", startTimer);
    Timer_End_button.addEventListener("click", endTimer);

    work_item.appendChild(span); // index 0 child
    work_item.appendChild(Timer_delBtn); // index 1 child
    work_item.appendChild(Timer_Start_button);
    work_item.appendChild(Timer_End_button);

    work_item.id = newId;
    work_item.style.display = "flex";
    Worktime_Checker__Lists.appendChild(work_item);



    let timer_time;

    let work_Obj = {
        text: text,
        id: newId,
        timer_stored__time: 0,
        timer_running: false, // true : Timer Running Mode, false : Timer Wait Mode 
        timer_start__time: 0
    };

    work_lists.push(work_Obj);

    save_Workslist();
}

function handleSubmit(event) {
    event.preventDefault();
    let currentValue = Worktime_Checker__Input.value;
    let id = work_lists.length + 1;

    paintwork(currentValue, id);
    Worktime_Checker__Input.value = "";

    // worktable update
    add_newRow_toTable(Worktime_Checker__Table, work_lists)
}

function loadToDos() {
    work_lists = [];
    console.log(" loadToDos()");
    // WORK_LISTS가 있는 경우에 데이터 불러오기
    var cnt = 1;

    let loaded_worklist = localStorage.getItem(WORK_LISTS);

    if (loaded_worklist !== null) {
        let parsed_worklists = JSON.parse(loaded_worklist);

        parsed_worklists.forEach(
            function (work) {
                work.id = cnt;
                var work_Obj = {
                    text: work.text,
                    id: work.id,
                    timer_stored__time: work.timer_stored__time,
                    timer_running: work.timer_running,
                    timer_start__time: work.timer_start__time
                };
                paintwork(work.text, work.id);
                cnt += 1;
            }
        );
    }

}

function update_WL_index() {
    var work_list_number = work_lists.length;

    // index shift
    for (var i = 0; i < work_list_number; i++) {
        work_lists[i].id = i + 1;
    }

}

function update_worktable(event) {
    let target_btn = event.target;
    let target_li = target_btn.parentNode;

    let worklist_idx = target_li.id - 1;

    cumulative_time_idx = 2;
    Worktime_Checker__Table.rows[worklist_idx + 1].cells[cumulative_time_idx].innerText = work_lists[worklist_idx].timer_stored__time;
}

function add_newRow_toTable(table_element, work_lists) {
    var table_row_number = table_element.rows.length;
    let newRow = table_element.insertRow();

    let row_idx = newRow.insertCell(0);
    row_idx.style.textAlign = 'center';
    let work_name = newRow.insertCell(1);
    let cumulative_time = newRow.insertCell(2);
    cumulative_time.style.textAlign = 'center';
    let detail_history = newRow.insertCell(3);

    // 가장 마지막 worlist으 정보를 Cell에 반영
    let last_idx = work_lists.length - 1;

    row_idx.innerText = work_lists[last_idx].id;
    work_name.innerText = work_lists[last_idx].text;
    cumulative_time.innerText = work_lists[last_idx].timer_stored__time;
    detail_history.innerText = "TBD";
}

function delete_newRow_toTable(table_element, work_lists) {
    let work_list_number = work_lists.length;

    // Index Match
    index_idx = 0;
    worklist_idx = 1;
    cumulative_idx = 2;
    detail_idx = 3;

    // Table 정보 업데이트
    for (var idx = 0; idx < work_list_number; idx++) {
        table_element.rows[idx + 1].cells[index_idx].innerText = work_lists[idx].id;
        table_element.rows[idx + 1].cells[worklist_idx].innerText = work_lists[idx].text;
        table_element.rows[idx + 1].cells[cumulative_idx].innerText = work_lists[idx].timer_stored__time;
        table_element.rows[idx + 1].cells[detail_idx].innerText = "TBD";
    }

    table_element.deleteRow(-1); // 마지막행 제거

}

function initialize_worktable(table_element, work_lists) {
    var work_list_number = work_lists.length;
    var table_row_number = table_element.rows.length;
    for (var idx = 0; idx < work_list_number; idx++) {
        // 새로운 행 추가 
        let newRow = table_element.insertRow();

        let row_idx = newRow.insertCell(0);
        row_idx.style.textAlign = 'center';
        let work_name = newRow.insertCell(1);
        let cumulative_time = newRow.insertCell(2);
        cumulative_time.style.textAlign = 'center';
        let detail_history = newRow.insertCell(3);

        // 각 Cell에 정보 반영
        row_idx.innerText = work_lists[idx].id;
        work_name.innerText = work_lists[idx].text;
        cumulative_time.innerText = work_lists[idx].timer_stored__time;
        detail_history.innerText = "TBD";
    }

}

function init() {
    loadToDos();     // WORK_LISTS가 있는 경우에 데이터 불러오기
    initialize_worktable(Worktime_Checker__Table, work_lists);
    Worktime_Checker__Form.addEventListener("submit", handleSubmit);

    setInterval(count_time, 1000); // 1초에 한번씨 Timer Update
}

init();
