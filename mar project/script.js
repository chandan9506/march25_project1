const timers = [];

function addTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0 || minutes >= 60 || seconds >= 60) {
        alert('Please enter valid time values!');
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        timers.push({ id: Date.now(), timeLeft: totalSeconds });
        renderTimers();
        document.getElementById('hours').value = '';
        document.getElementById('minutes').value = '';
        document.getElementById('seconds').value = '';
    } else {
        alert('Please set a valid timer duration.');
    }
}

function renderTimers() {
    const timerList = document.getElementById('timerList');
    timerList.innerHTML = timers.length ? '<p>Current Timers</p>' : '<p>You have no timers currently!</p>';

    timers.forEach(timer => {
        const listItem = document.createElement('li');
        const timeText = formatTime(timer.timeLeft);
        listItem.textContent = `Time Left: ${timeText}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTimer(timer.id);

        listItem.appendChild(deleteButton);
        timerList.appendChild(listItem);
    });
}

function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs} : ${mins} : ${secs}`;
}

function deleteTimer(id) {
    const index = timers.findIndex(timer => timer.id === id);
    if (index !== -1) {
        timers.splice(index, 1);
    }
    renderTimers();
}

setInterval(() => {
    const alarmSound = document.getElementById('alarmSound');
    timers.forEach(timer => {
        if (timer.timeLeft > 0) {
            timer.timeLeft--;
        } else if (timer.timeLeft === 0) {
            document.getElementById('message').style.display = 'block';
            alarmSound.play();
            setTimeout(() => document.getElementById('message').style.display = 'none', 3000);
            deleteTimer(timer.id);
        }
    });
    renderTimers();
}, 1000);