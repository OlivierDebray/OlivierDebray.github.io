var interstellar = document.getElementById("interstellar");
var life = document.getElementById("life");

function boot() {
    interstellar.currentTime = 42;
    interstellar.play();
    
    document.getElementById("bootingPanel").className = "hidden";
    document.getElementById("firstPanel").className = "";
}

function btnClick() {
    document.body.className = "discours";

    interstellar.pause();
    life.play();

    document.getElementById("firstPanel").className = "hidden";
    document.getElementById("secondPanel").className = "";
}

