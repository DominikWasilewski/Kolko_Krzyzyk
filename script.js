document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    let turn = "X";
    let isGameOver = false;

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (!isGameOver && box.innerHTML === "") {
                box.innerHTML = turn;
                checkWin();
                checkDraw();
                changeTurn();
            }
        });
    });

    function changeTurn() {
        turn = turn === "X" ? "O" : "X";
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        winConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
                isGameOver = true;
                document.querySelector("#results").innerHTML = `${turn} wins`;
                document.querySelector("#play-again").style.display = "inline";
                condition.forEach(index => {
                    boxes[index].style.backgroundColor = "#08D9D6";
                    boxes[index].style.color = "#000";
                });
            }
        });
    }

    function checkDraw() {
        if (!isGameOver) {
            const isDraw = [...boxes].every(box => box.innerHTML !== "");
            if (isDraw) {
                isGameOver = true;
                document.querySelector("#results").innerHTML = "Draw";
                document.querySelector("#play-again").style.display = "inline";
            }
        }
    }

    document.querySelector("#play-again").addEventListener("click", () => {
        isGameOver = false;
        turn = "X";
        document.querySelector("#results").innerHTML = "";
        document.querySelector("#play-again").style.display = "none";
        boxes.forEach(box => {
            box.innerHTML = "";
            box.style.backgroundColor = "";
            box.style.color = "#fff";
        });
    });
});
