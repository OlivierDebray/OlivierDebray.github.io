var numRow = 5, numCol = 5;

var imgNum = 1;

var boolAutoShow = false;
var cellNb = numRow * numCol;
var time = 2000 / cellNb;

var imgDiv = document.getElementById("img");
var hiddenCells = [], shownCells = [];

function startGuesser() {
    imgDiv.innerHTML = "";

    document.getElementById("imgNbr").innerHTML = "Image n°" + imgNum;

    imgDiv.style.background = "url('img/"+imgNum+".png') no-repeat";
    imgDiv.style.backgroundSize = "cover";

    var img = document.createElement("img");
    img.src = "img/"+imgNum+".png";

    imgDiv.style.width = (Math.floor(img.naturalWidth * 50 / img.naturalHeight)) + "vh";
    imgDiv.style.height = "50vh";

    var table = document.createElement("table");
    table.className = "imgTable";
    for (var i = 0 ; i < numRow ; i++) {
        var row = document.createElement("tr");
        hiddenCells[i] = [];
        shownCells[i] = [];
        for (var j = 0 ; j < numCol ; j++) {
            var cell = document.createElement("td");
            cell.className = "tableCell";
            hiddenCells[i][j] = cell;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    imgDiv.appendChild(table);

    if (boolAutoShow) {
        autoShow();
    }

    imgNum++;
}

function showCell() {
    if (hiddenCells.length != 0) {
        var row = getRandomInt(hiddenCells.length), col = getRandomInt(hiddenCells[row].length);
        hiddenCells[row][col].style.background = "none";
        shownCells[row][col] = hiddenCells[row][col];
        hiddenCells[row].splice(col, 1);
        if (hiddenCells[row].length == 0) {
            hiddenCells.splice(row, 1);
        }
    }
    else if (boolAutoShow) {
        startGuesser();
    }
}

function autoShow() {
    showCell();
    setTimeout(function () {
        autoShow()
    }, time);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}