let table = [
    { Division: "official", SubDivision: "Meeting", Duration: "01.00", Task: "Project Explanation" },
    { Division: "personal", SubDivision: "Break", Duration: "03.00", Task: "Vacation" },
    { Division: "personal", SubDivision: "Work", Duration: "01.30", Task: "Daily activities" },
    { Division: "official", SubDivision: "Meeting", Duration: "01.00", Task: "HR Meeting" },
];

let t = document.querySelector("tbody");
table.forEach(a => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${a.Division}</td>
        <td>${a.SubDivision}</td>
        <td>${a.Duration}</td>
        <td>${a.Task}</td>
        <td>
            <button onclick="updateTask(this)">&nbsp;Update&nbsp;</button>&nbsp;
            <button onclick="deleteTask(this)">&nbsp;Delete&nbsp;</button>
        </td>`;
        
    t.appendChild(row);
});

function filterTable() {
    let Division = document.getElementById("filterDropdown").value;
    let rows = document.querySelectorAll("#tabledata tbody tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (Division === "all" || row.children[0].textContent === Division) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

let seconds = 0;
let minutes = 0;
let hours = 0;
isRunning = false;

function startstop() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
                if (minutes >= 60) {
                    hours++;
                    minutes = 0;
                }
            }
            let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            document.getElementById("stopwatch").innerText = formattedTime;
            document.getElementById("startstop").innerText = "Stop";
        }, 1000);
    } else {
        document.getElementById("startstop").innerText = "Start";
        clearInterval(timer);
        isRunning = false;
    }
}

function Reset() {
    seconds = 0;
    hours = 0;
    minutes = 0;
    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.getElementById("stopwatch").innerText = formattedTime;
}

function addTask() {
    const divisionInput = document.getElementById("formdropdown").value;
    const subdivisionInput = document.getElementById("Subdivision").value;
    const taskInput = document.getElementById("task").value;
    const stopwatchValue = document.getElementById("stopwatch").innerText;

    let table = document.querySelector("#tabledata tbody");
    let newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${divisionInput}</td>
        <td>${subdivisionInput}</td>
        <td>${stopwatchValue}</td>
        <td>${taskInput}</td>`;

    // Reset the form after adding the task
    // document.getElementById("taskForm").reset();
}
function updateTask(button) {
    let row = button.closest("tr");
    let divisionInput = row.cells[0].textContent;
    let subdivisionInput = row.cells[1].textContent;
    let taskInput = row.cells[3].textContent;

    document.getElementById("division").value = divisionInput;
    document.getElementById("Subdivision").value = subdivisionInput;
    document.getElementById("task").value = taskInput;

    row.remove(); // Remove the row from the table after updating
}

function deleteTask(button) {
    let row = button.closest("tr");
    row.remove();
}

