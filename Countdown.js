var removeIfZero = (n, id) => {
    if(n < 0) {
        if(id == "Days"){
            console.log(2);
            document.getElementById(id).textContent = "Já foi lançado!"
            document.getElementById(id).style.display = "inline"
            document.getElementById(id+"2").style.display = "none"
            return
        }
        document.getElementById(id).style.display = document.getElementById(id+"2").style.display = "none"

    } else if(n) {
        document.getElementById(id).textContent = n

        document.getElementById(id).style.display = document.getElementById(id+"2").style.display = "";
        document.getElementById(id).style.opacity = document.getElementById(id+"2").style.opacity = 1;

        setTimeout(() => {
            if(window.innerWidth < 897) {
                document.getElementById(id).style.fontSize = "2rem";
                document.getElementById(id+"2").style.fontSize = "1rem";
            } else {
                document.getElementById(id).style.fontSize = "4.2rem";
                document.getElementById(id+"2").style.fontSize = "2rem";
            }
        }, 100);

    } else {
        document.getElementById(id).style.opacity = document.getElementById(id+"2").style.opacity = 0;
        document.getElementById(id).style.fontSize = document.getElementById(id+"2").style.fontSize = "0rem";
        setTimeout(() => {
            document.getElementById(id).style.display = document.getElementById(id+"2").style.display = "none";
        }, 501);
    }
}
var title = "";

const ELDEN_RELEASE = new Date(2022, 1, 25)
function CountDown(){
    
    var currentDate = new Date()
    
    var currentTime = currentDate.getTime()
    var releaseTime = ELDEN_RELEASE.getTime()
    
    var remainingTime = releaseTime - currentTime
    
    var remainingSeconds = Math.floor(remainingTime / 1000) 
    var remainingMinutes = Math.floor(remainingSeconds / 60) 
    var remainingHours = Math.floor(remainingMinutes / 60) 
    var remainingDays = Math.floor(remainingHours / 24) 
    
    remainingHours %= 24
    remainingMinutes %= 60
    remainingSeconds %= 60

    removeIfZero(remainingDays, "Days")
    removeIfZero(remainingHours, "Hours")
    removeIfZero(remainingMinutes, "Minutes")
    removeIfZero(remainingSeconds, "Seconds")

    var getNTxt = (n, s) =>(n?n+s: "")

    document.title = (remainingSeconds < 0? "": " (" + getNTxt(remainingDays, "d") + " " + getNTxt(remainingHours, "h") + " " + getNTxt(remainingMinutes, "m") + " " + getNTxt(remainingSeconds, "s") + ") ") + "Elden Ring Contagem Regrassiva";
    
    setTimeout(CountDown, 1000)
}

window.onload = CountDown()


