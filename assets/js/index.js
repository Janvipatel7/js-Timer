let timer;
let totalSeconds;
let runningState = false;
let paused = false;
let time = document.getElementById("timer");
let newFlag = false;

document.getElementById("start").addEventListener("click", function () {
    if (runningState) return;
    startTimer();
    newFlag = true;
});

function startTimer() {
    if (!paused) {
        let h = parseInt(document.getElementById("hours").value) || 0;
        let m = parseInt(document.getElementById("minutes").value) || 0;
        let s = parseInt(document.getElementById("seconds").value) || 0;
        totalSeconds = (h * 3600) + (m * 60) + s;

        if (totalSeconds <= 0) {
            Swal.fire({
                title: "Time waits for no one.",
                text: "Include Time ...",
                icon: "error"
            });
            return;
        }
    }

    timer = setInterval(() => {
        if (totalSeconds == -1) {
            clearInterval(timer);
            showModal();
            runningState = false;
        } else {
            updateTime();
            totalSeconds--;
        }
    }, 1000);

    runningState = true;
    paused = false;
}

document.getElementById("pause").addEventListener("click", () => {
    const pauseButton = document.getElementById("pause");

    if (newFlag) {
        if (runningState) {
            clearInterval(timer);
            runningState = false;
            paused = true;
            pauseButton.innerHTML = 'Play';
        } else {
            startTimer();
            pauseButton.innerHTML = 'Pause';
        }
    }
});

document.getElementById("reset").addEventListener("click", function () {
    const pauseButton = document.getElementById("pause");
    clearInterval(timer);
    runningState = false;
    paused = false;
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    pauseButton.innerHTML = "Pause"
    newFlag = false;
});

function updateTime() {
    let hrs = Math.floor(totalSeconds / 3600);
    let min = Math.floor((totalSeconds % 3600) / 60);
    let sec = totalSeconds % 60;

    document.getElementById("timer").innerText =
        `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('timeUpModal'));
    myModal.show();
    let audio = document.getElementById("sound");
    setTimeout(() => {
        const end = Date.now() + 5000;

        const colors = ["#bb0000", "#ffffff"];

        function launchConfetti() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });

            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(launchConfetti);
            }
        }

        launchConfetti();
    }, 300);
    audio.currentTime = 0;
    audio.play();
    newFlag = false;
    const pauseButton = document.getElementById("pause");
    pauseButton.innerHTML = "Pause";
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
}
