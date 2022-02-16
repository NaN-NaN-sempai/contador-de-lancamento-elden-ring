var transl = {
    en: /* DEFALT LENGUAGE IN CASE OF UNDEFINED TRANSLATIONS */ {
        tableTitle: '<span class="biggerF">C</span>OUNTDOWN FOR<br><span class="biggerF">E</span>LDEN <span class="biggerF">R</span>ING',
        days: 'Days',
        hours: 'Hours',
        mins: 'Minutes',
        secs: 'Seconds',
        countdown: "Elden Ring Countdown"
    },
    pt: {
        tableTitle: '<span class="biggerF">L</span>ANÇAMENTO DO<br><span class="biggerF">E</span>LDEN <span class="biggerF">R</span>ING',
        days: 'Dias',
        hours: 'Horas',
        mins: 'Minutes',
        secs: 'Seconds',
        countdown: "Elden Ring Contagem Regrassiva"
    }
};

var getTransl = (text) => {
    var userLanguage = navigator.language || navigator.userLanguage;

    var selectedLeng = typeof transl[userLanguage.substr(0,2)] == "undefined"? transl["en"]:
                    typeof leng == "string"? transl[leng]:
                    transl[userLanguage.substr(0,2)];

    var textObj = text.replace(/\./g," ").split(" ");

    var returnTranslation;
    var fixedReturnTranslation;
    textObj.forEach((e)=>{
        returnTranslation = (returnTranslation==undefined?selectedLeng:returnTranslation)[e];
        fixedReturnTranslation = (fixedReturnTranslation==undefined?transl["en"]:fixedReturnTranslation)[e];
    });

    return returnTranslation == undefined? fixedReturnTranslation: returnTranslation;
}

window.addEventListener("load", () => {
    document.getElementsByClassName("invisibleInPhone")[0].innerHTML = getTransl("tableTitle");
    
    document.getElementById("Days2").innerHTML = getTransl("days");
    document.getElementById("Hours2").innerHTML = getTransl("hours");
    document.getElementById("Minutes2").innerHTML = getTransl("mins");
    document.getElementById("Seconds2").innerHTML = getTransl("secs");
});
  
  


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

    document.title = (remainingSeconds < 0? "": " (" + getNTxt(remainingDays, "d") + " " + getNTxt(remainingHours, "h") + " " + getNTxt(remainingMinutes, "m") + " " + getNTxt(remainingSeconds, "s") + ") ") + getTransl("countdown");
    
    setTimeout(CountDown, 1000)
}

window.onload = CountDown()


