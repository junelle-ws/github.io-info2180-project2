window.onload = main;


let blank = ["300px", "300px"]; 
let start = false; 


function start_grid() {
    let puzzlearea = document.getElementById("puzzlearea").childNodes;
    let initial = [];
    let x = 0, y = 0, top = 0, left = 0, count = 1;

    for (let i = 0; i < puzzlearea.length; i++) {
        if (puzzlearea[i].nodeName === "DIV") {
            initial.push([top.toString() + "px", left.toString() + "px"]);
            puzzlearea[i].className += "puzzlepiece";
            puzzlearea[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (count % 4 === 0) {
                y -= 100;
                top += 100;
                left = 0;
            }
            count += 1;

        }
    }

    return initial;
}


function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}


function check_for_win(winning_state, pieces) {
    if (start) {
        for (let i = 0; i < pieces.length; i++) {
            if ((winning_state[i][0] !== pieces[i].style.top) | (winning_state[i][1] !== pieces[i].style.left)) {
                return false;
            }
        }
        return true;
    }
    return false;
}


function move_piece(piece, animate) {
    blank_top = piece.style.top;
    blank_left = piece.style.left;

    if (animate) {
        let winning_state = arguments[2];
        let pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "fast", "linear", function () {
            if (check_for_win(winning_state, pieces)) {
                let win_string = 'You Win';
                $(".explanation")[0].innerText = win_string;
                $(".explanation")[0].style.textAlign = "Center";
            }
        });

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [blank_top, blank_left];
}


function random(pieces) {
    let pieceLength = pieces.length;
    let piece;
    let rand;

    for (let index = 0; index < pieceLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        move_piece(piece[0], false);
    }
}


function get_pieces() {
    return $(".puzzlepiece");
}


function shuffleimage() {
    let value = Math.floor(Math.random() * 5);
    if (value === 0) {
        value = "";
    }
   
}

function main() {
    let winning_state = start_grid();
    let puzzlepieces = get_pieces();

    var background_form =
        " <p align='Center'>Select a background color<p>  <button id= 'k'align = 'Center'> press me </button>";
    $("#controls").before(background_form);

    document.getElementById("k").onclick = function () {
        location.href = "troll.html";
    };

    document.getElementById("shufflebutton").onclick = function () {
        random(puzzlepieces);
        shuffleimage();
        start = true;
        moves = 0;
        puzzlepieces = get_pieces();
    }

    for (let i = 0; i < puzzlepieces.length; i++) {
        puzzlepieces[i].addEventListener("mouseover", function () {
            if (is_movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzlepieces[i].addEventListener("mouseleave", function () {
            this.className = "puzzlepiece";
        });

        puzzlepieces[i].addEventListener("click", function () {
            if (this.className.includes("movablepiece")) {
                move_piece(this, true, winning_state, puzzlepieces);
            }
        });
    }

}