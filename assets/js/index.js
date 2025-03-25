let totalSeconds = 0;
let timer;
let time = document.getElementById("timer");
let runningState = false;
let confettiRunning;
let newFlag = false;
let paused = false;
let newQuote = document.getElementById("newQuote")
let newAuthor = document.getElementById("newAuthor")

let quotes = [
    { quote: "I don't believe in taking the right decisions, I take decisions and then make them right",
        author: "- Ratan Tata"},
   { quote: "To lose patience is to lose the battle.",
        author: "- Mahatma Gandhi" },
   { quote: "The two most powerful warriors are patience and time.",
        author: "- Leo Tolstoy" },
   { quote: "Whatever you are, be a good one.",
        author: "- Abraham Lincoln" },
   { quote: "All that we are is the result of what we have thought. The mind is everything. What we think we become.",
        author: "- Gautama Buddha." },
   { quote: "Even if we lose the wealth of thousands, and our life is sacrificed, we…should keep smiling and be cheerful keeping our faith in God and Truth.",
        author: "- Sardar Patel" },
   { quote: "You have to  dream before your DREAMS CAN COME TRUE",
        author: "- A.P.J. ABDUL KALAM" },
   { quote: "I don't carry the burden of the past or the madness of the future. I live in the present.",
        author: "- Narendra Modi" },
   { quote: "You are never too old to set another goal or to dream a new dream.",
        author: "- C.S. Lewis" },
   { quote: "To live is the rarest thing in the world. Most people just exist.",
        author: "- Oscar Wilde" }
]

document.getElementById("start").addEventListener("click", function () {
    const pauseButton = document.getElementById("pause");
    pauseButton.innerHTML = "pause"
    if (runningState) return;
    startTimer();
    newFlag = true;
});

function startTimer() {
    if (!paused) {
        let h = parseInt(document.getElementById("hours").value) || 0;
        let m = parseInt(document.getElementById("minutes").value) || 0;
        let s = parseInt(document.getElementById("seconds").value) || 0;
        totalSeconds = (h * 3600) + (m * 60) + (s);

        if (totalSeconds <= 0) {
            Swal.fire({
                title: "Time waits for no one.",
                text: "Include Time ...",
                icon: "error",
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

    if (totalSeconds <= 0) {
        Swal.fire({
            text: "Enter Time Parameters !",
            position: 'center',
            showConfirmButton: true,
            icon: "error",
        });
        return;
    }


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
    let randomValue = parseInt(Math.random() * 10)
    const myModal = new bootstrap.Modal(document.getElementById('timeUpModal'));
    newQuote.innerHTML = `${quotes[randomValue].quote}`
    newAuthor.innerHTML = `${quotes[randomValue].author}`
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
