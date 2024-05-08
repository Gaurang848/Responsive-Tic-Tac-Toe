document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const resetbtn = document.querySelector(".reset");
  const msgcnt = document.querySelector(".winmsg");
  const msg = document.querySelector("#msg");
  let turnO = true;

  const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const clickSound = () => {
    const clicksound = document.getElementById("clicksound");
    clicksound.play();
  };

  const disableboxes = () => {
    boxes.forEach((box) => {
      box.disabled = true;
    });
  };

  const enableboxes = () => {
    boxes.forEach((box) => {
      box.disabled = false;
      box.innerText = "";
    });
  };

  function playWinSound() {
    const winSound = document.getElementById("winSound");
    winSound.play();
  }

  const displayWinAnimation = () => {
    const winAnimation = document.getElementById("winAnimation");
    winAnimation.src = "./excited.gif";
    winAnimation.classList.remove("hide");
  };

  const stopWinAnimation = () => {
    const winAnimation = document.getElementById("winAnimation");
    winAnimation.src = "";
    winAnimation.classList.add("hide");
  };

  const showWinner = (winner) => {
    msg.innerText = `Congratulations 🎉, Winner is ${winner}`;
    msgcnt.classList.remove("hide");
    playWinSound();
    disableboxes();
    displayWinAnimation();
  };

  const checkWinner = () => {
    for (let pattern of winpatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }

    let isTie = true;
    for (let box of boxes) {
      if (box.innerText === "") {
        isTie = false;
        break;
      }
    }

    if (isTie) {
      msg.innerText = "It's a tie!";
      msgcnt.classList.remove("hide");
      disableboxes();
      return true;
    }

    return false;
  };

  resetbtn.addEventListener("click", () => {
    turnO = true;
    msgcnt.classList.add("hide");
    enableboxes();
    stopWinAnimation();
  });

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      clickSound();
      checkWinner();
    });
  });
});
