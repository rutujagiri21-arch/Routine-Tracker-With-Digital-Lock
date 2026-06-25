function updateClock() {

    let now = new Date();

    let time = now.toLocaleTimeString();

    let date = now.toDateString();

    document.getElementById("clock").innerHTML = time;

    document.getElementById("date").innerHTML = date;
}

setInterval(updateClock, 1000);

updateClock();

let totalTasks = 0;
let completedTasks = 0;

function addTask() {

    let taskName =
        document.getElementById("taskName").value;

    let taskTime =
        document.getElementById("taskTime").value;

    if (taskName === "" || taskTime === "") {
        alert("Please enter task name and time");
        return;
    }

    totalTasks++;

    let li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `
        <span>${taskName} - ${taskTime}</span>

        <div>
            <button class="complete-btn">
                ✓
            </button>

            <button class="delete-btn">
                🗑
            </button>
        </div>
    `;

    let completeBtn =
        li.querySelector(".complete-btn");

    completeBtn.addEventListener("click", function () {

        if (!li.classList.contains("done")) {

            li.classList.add("done");

            completedTasks++;

            updateProgress();
        }
    });

    let deleteBtn =
        li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {

        if (li.classList.contains("done")) {
            completedTasks--;
        }

        totalTasks--;

        updateProgress();

        li.remove();
    });

    document
        .getElementById("taskList")
        .appendChild(li);

    updateProgress();

    document.getElementById("taskName").value = "";

    document.getElementById("taskTime").value = "";
}


function updateProgress() {

    let percent = 0;

    if (totalTasks > 0) {

        percent =
            (completedTasks / totalTasks) * 100;
    }

    document.getElementById("progressText")
        .innerHTML =
        Math.round(percent) + "%";

    document.getElementById("progressFill")
        .style.width =
        percent + "%";
}


let alarmTime = "";

function setAlarm() {

    alarmTime =
        document.getElementById("alarmTime").value;

    document.getElementById("alarmStatus")
        .innerHTML =
        "Alarm set for " + alarmTime;
}

setInterval(() => {

    let now = new Date();

    let current =
        now.getHours().toString().padStart(2, "0")
        + ":" +
        now.getMinutes().toString().padStart(2, "0");

    if (current === alarmTime) {

        alert("⏰ Alarm Ringing!");
    }

}, 1000);

let stopwatchSeconds = 0;

let stopwatchInterval;

function startStopwatch() {

    if (stopwatchInterval) return;

    stopwatchInterval = setInterval(() => {

        stopwatchSeconds++;

        let hrs =
            Math.floor(stopwatchSeconds / 3600);

        let mins =
            Math.floor((stopwatchSeconds % 3600) / 60);

        let secs =
            stopwatchSeconds % 60;

        document.getElementById("stopwatch")
            .innerHTML =
            `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    }, 1000);
}

function pauseStopwatch() {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;
}

function resetStopwatch() {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    stopwatchSeconds = 0;

    document.getElementById("stopwatch")
        .innerHTML =
        "00:00:00";
}


function startTimer() {

    let time =
        parseInt(
            document.getElementById("timerInput").value
        );

    if (isNaN(time) || time <= 0) {

        alert("Enter valid seconds");

        return;
    }

    let timer =
        setInterval(() => {

            document.getElementById("timerDisplay")
                .innerHTML =
                time;

            time--;

            if (time < 0) {

                clearInterval(timer);

                alert("⏰ Timer Finished!");

                document.getElementById("timerDisplay")
                    .innerHTML =
                    "Done";
            }

        }, 1000);
}

let themeBtn =
    document.getElementById("themeBtn");

let darkMode = true;

themeBtn.addEventListener("click", () => {

    if (darkMode) {

        document.body.style.background =
            "#f4f4f4";

        document.body.style.color =
            "#000";

        themeBtn.innerHTML = "☀";

        darkMode = false;
    }

    else {

        document.body.style.background =
            "#050b1f";

        document.body.style.color =
            "#fff";

        themeBtn.innerHTML = "🌙";

        darkMode = true;
    }
});