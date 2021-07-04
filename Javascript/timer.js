const Timer = document.querySelector(".js-Timer"),
    start_button = Timer.querySelector(".js-Timer_button__start_button"),
    time_display = Timer.querySelector(".js-Timer_display__time"),
    cog_icon = Timer.querySelector(".cog_icon");
//dasdasdd
var record__start_time = 0;
var record__end_time = 0;
var pause__start_time = 0;
var pause__end_time = 0;

var is_timer_run = false;

var recorded_time = 0
var updated_time = 0

/*
const start = Date.now();

console.log('starting timer...');
// expected output: starting timer...

setTimeout(() => {
  const millis = Date.now() - start;

  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  // expected output: seconds elapsed = 2
*/
function timer_Update() {
    if (is_timer_run == true) {
        updated_time = Date.now() - record__start_time;
        time_display.innerText = Math.floor(updated_time / 1000);

    }
}

function time_logging() {
    if (is_timer_run == false) {
        is_timer_run = true;
        record__start_time = Date.now();
        cog_icon.classList.add("rotate");
    } else {
        record__end_time = Date.now();
        is_timer_run = false;


        recorded_time = Math.floor((record__end_time - record__start_time) / 1000);

        // Display
        time_display.innerText = recorded_time

        // Initialization
        record__start_time = 0;
        record__end_time = 0;
        cog_icon.classList.remove("rotate");
    }


}


function init() {
    start_button.addEventListener('click', time_logging);
    setInterval(timer_Update, 1000);
}

init();

