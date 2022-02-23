var countOnLocal = true;

const ELDEN_RELEASE = countOnLocal?
                        new Date(2022, 1, 25):
                        new Date(2022, 1, 24, 23);

var transl = {
    en: /* DEFALT LENGUAGE IN CASE OF UNDEFINED TRANSLATIONS */ {
        tableTitle: '<span class="biggerF">C</span>OUNTDOWN FOR<br><span class="biggerF">E</span>LDEN <span class="biggerF">R</span>ING',
        days: 'Days',
        hours: 'Hours',
        mins: 'Minutes',
        secs: 'Seconds',
        countdown: "Elden Ring Countdown",
        launched: "Launched!",
        launchDate: `Release date:<br><br>${ELDEN_RELEASE.toLocaleDateString()} at ${("0"+ELDEN_RELEASE.getHours()).slice(-2)}:${("0"+ELDEN_RELEASE.getMinutes()).slice(-2)}<br><br>In your local time.`
    },
    pt: {
        tableTitle: '<span class="biggerF">L</span>ANÇAMENTO DO<br><span class="biggerF">E</span>LDEN <span class="biggerF">R</span>ING',
        days: 'Dias',
        hours: 'Horas',
        mins: 'Minutos',
        secs: 'Segundos',
        countdown: "Elden Ring Contagem Regrassiva",
        launched: "Lançado!",
        launchDate: `Data de lançamento:<br><br>${ELDEN_RELEASE.toLocaleDateString()} às ${("0"+ELDEN_RELEASE.getHours()).slice(-2)}:${("0"+ELDEN_RELEASE.getMinutes()).slice(-2)}<br><br>No seu horário local.`
    }
};

var getTransl = (text) => {
    var paramLeng = document.location.href.split("#")[1]?.slice(0,2);
    var userLanguage = (!transl[paramLeng]? undefined: paramLeng) || navigator.language || navigator.userLanguage;

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

    document.getElementsByClassName("launchDate")[0].innerHTML = getTransl("launchDate")
});
  
  
var lastN = {}

var removeIfZero = (n, id) => {
    if(n < 0) {
        if(id == "Days"){
            document.getElementById(id).textContent = getTransl("launched")
            document.getElementById(id).style.display = "inline"
            document.getElementById(id+"2").style.display = "none"
            document.getElementById(id).style.opacity = 1;

            document.getElementById(id).className = "jumpAnim"

            if(window.innerWidth < 897) {
                document.getElementById(id).style.fontSize = "2rem";
            } else {
                document.getElementById(id).style.fontSize = "4.2rem";
            }
            return
        }
        document.getElementById(id).style.display = document.getElementById(id+"2").style.display = "none"

    } else if(n) {
        document.getElementById(id).textContent = n

        document.getElementById(id).style.display = document.getElementById(id+"2").style.display = "";
        document.getElementById(id).style.opacity = document.getElementById(id+"2").style.opacity = 1;

        if(lastN[id] != n && lastN[id]){   
            document.getElementById(id).className = "jumpAnim";
            setTimeout(() => {
                document.getElementById(id).className = "";
            }, 950)
        }
        lastN[id] = n;

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

function CountDown(){
    
    var d = new Date();
    var nd = new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (3600000 * -6));
    
    var currentTime = (countOnLocal? d: nd).getTime();
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


