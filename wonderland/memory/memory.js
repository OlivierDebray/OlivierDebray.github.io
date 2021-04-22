var tableau;
var alreadyCreated = false;

var startButton = document.getElementById("start");

var paraSuccess = document.createElement("p");
var paraEssais = document.createElement("p");

var images = new Array;

var firstDraw;
var secondDraw;
var cptGame = 0;
var failFlag = 0;

var cptSuccess = 0;
var cptEssais = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function startGame() {
    cptGame = 0;
    failFlag = 0;
    cptEssais = 0;
    cptSuccess = 0;
    paraSuccess.textContent = "Paires trouvées : 0";
    paraEssais.textContent = "Nombre d'essais : 0";

    if (alreadyCreated)
        tableau.remove();

    alreadyCreated = true;

    tableau = document.createElement("div");
    tableau.id = "tableau";
    document.body.insertBefore(tableau,document.body.querySelector("footer"));

    drawCards();
    randomizeCards();
    displayGame();
}

function drawCards()
{
    for (var i = 1 ; i <= 8 ; i++)
        for (var j = 1 ; j <= 2 ; j++)
            images.push("Images/vignette" + i + ".jpg");
}

function randomizeCards()
{
    for (var i = 0 ; i < 16 ; i++)
    {
        var num = getRandomInt(16);

        var temp = images[num];
        images[num] = images[i];
        images[i] = temp;
    }
}

function displayGame()
{
    document.getElementById("text").appendChild(paraSuccess);
    document.getElementById("text").appendChild(paraEssais);

    var i = 0;

    for (var x = 1 ; x <= 4 ; x++)
    {
        var newLine = document.createElement("div");
        newLine.id = "ligne" + x;
        newLine.className = "ligne";
        tableau.appendChild(newLine);

        for (var y = 1 ; y <= 4 ; y++)
        {
            var div = document.createElement("div");
            div.id = "img" + (i+1);
            div.onclick = function () { playGame(this.id) };

            var img = document.createElement("img");
            img.src = images[i];

            div.appendChild(img);

            newLine.appendChild(div);

            i++;
        }
    }
}

function playGame(divID) {
    document.querySelector("#" + divID + " img").style.visibility = "visible";

    if (failFlag == 1)
    {
        console.log("Resetting tiles " + firstDraw + " " + secondDraw)
        document.querySelector("#" + firstDraw + " img").style.visibility = "hidden";
        document.querySelector("#" + secondDraw + " img").style.visibility = "hidden";
    }

    switch (cptGame)
    {
        case 0:
            failFlag = 0;
            firstDraw = divID;
            cptGame++;
            break;
        case 1:
            cptEssais++;
            secondDraw = divID;
            if (firstDraw == secondDraw)
            {
                cptEssais--;
                break;
            }
            else if (document.querySelector("#" + firstDraw + " img").src == document.querySelector("#" + secondDraw + " img").src)
            {
                document.querySelector("#" + firstDraw).onclick = null;
                document.querySelector("#" + secondDraw).onclick = null;

                cptSuccess++;
            }
            else
            {
                failFlag = 1;
            }
            cptGame = 0;
            break;
        default:
            break;
    }

    paraSuccess.textContent = "Paires trouvées : " + cptSuccess;
    paraEssais.textContent = "Nombre d'essais : " + cptEssais;

    if (cptSuccess == 8)
        alert("Bravo !");
}

startButton.addEventListener("click",startGame)

startGame();