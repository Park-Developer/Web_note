
const CHART_BAR_COLOR = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"];

function update_chart(work_lists, work_chart) {
    console.log("update_chart");

    let work_list_number = work_lists.length;
    let bar_color_num = CHART_BAR_COLOR.length;


    let work_text = [];
    let work_time = [];
    let bar_color = [];

    for (let i = 0; i < work_list_number; i++) {
        work_text.push(work_lists[i]["text"]);

        work_time.push(parseInt(work_lists[i]["timer_stored__time"])); // 저장된 시간 

        bar_color.push(CHART_BAR_COLOR[i % bar_color_num]);
    }

    work_chart["data"]["labels"] = work_text;
    work_chart["data"]["datasets"][0]["data"] = work_time;
    work_chart["data"]["datasets"][0]["backgroundColor"] = bar_color;

    console.log("work_text", work_text);
    console.log("work_time", work_time);

    // return work_chart;
}

//update_chart(work_lists, work_chart);