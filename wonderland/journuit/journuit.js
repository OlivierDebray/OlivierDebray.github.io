var boutonJour = document.getElementById('jour');
var boutonNuit = document.getElementById('nuit');

var boutons = document.querySelectorAll('button');

var titre = document.querySelector('h1')

var img = document.getElementById('img');

var audioJour = document.getElementById("audioJour");
var audioNuit = document.getElementById("audioNuit");

document.body.style.background = "fixed linear-gradient(#88ADED, #ffffff)";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function passageJour() {
    document.body.style.background = "fixed linear-gradient(#88ADED, #ffffff)";
    img.src="Images/Jour.png";

    var i;

    for(i = 0; i < boutons.length; i++){
        boutons[i].style.backgroundColor = "black";
        boutons[i].style.color= "white";
    }

    titre.style.color = "black";

    fadeEffect(audioNuit,10);

    audioJour.currentTime = 0;
    audioJour.play();

}

function passageNuit() {
    document.body.style.background = "url('Images/cover.png')";
    document.body.style.backgroundSize = "cover";
    img.src="Images/Nuit.png";

    var i;

    for(i = 0; i < boutons.length; i++){
        boutons[i].style.backgroundColor = "white";
        boutons[i].style.color= "black";
    }

    titre.style.color = "white";

    audioNuit.volume = 1;
    audioNuit.currentTime = 0;
    audioNuit.play();
}

async function fadeEffect(audioSource,steps) {
    for (var i = 1 ; i <= steps ; i++)
    {
        await sleep(3000/steps);
        audioSource.volume = 1 - (i / steps)
    }
}

boutonJour.addEventListener('click',passageJour);
boutonNuit.addEventListener('click',passageNuit);