let timer;
let totalSeconds;
let time = document.getElementById("timer");
let runningState = false;

document.getElementById("start").addEventListener("click" , function (){
    if(runningState) return;
    startTimer();
})

function startTimer(){
    let h = parseInt(document.getElementById("hours").value) || 0;
    let m = parseInt(document.getElementById("minutes").value) || 0;
    let s = parseInt(document.getElementById("seconds").value) || 0;

    totalSeconds = (h * 3600) + (m * 60) + (s);

    if(totalSeconds <= 0){
        Swal.fire({
            title: "Time waits for no one.",
            text: "Include Time ...",
            icon: "Invalide"
          });
    }

    timer = setInterval(() => {
        runningState = true;
        if(totalSeconds == -1){
            clearInterval(timer)
        }else{
            displayTime();
            totalSeconds--;
        }
    } , 1000);
}

function displayTime(){
    let hrs = Math.floor(totalSeconds / 3600);
    let min = Math.floor((totalSeconds % 3600) / 60);
    let sec = totalSeconds % 60;

    time.innerHTML = `${hrs.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`
}

document.getElementById("reset").addEventListener("click" , function (){
    clearInterval(timer);
    runningState = false;
    document.getElementById("timer").innerHTML ="00:00:00";
    document.getElementById("hours").value = "";    
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

})