console.log('test');


const startGame = () => {
  const playerBoardDiv = document.getElementById('playerBoard');
  const computerBoardDiv = document.getElementById('computerBoard');
  const playerBoard = gameboardFactory();
  const computerBoard = gameboardFactory();
  const playerShips = initializeBoard(playerBoard);
  initializeBoard(computerBoard);
  const player = playerFactory(true, playerBoard, null);
  const computer = playerFactory(false, computerBoard, []);
  DisplayModule.displayBoard(playerBoardDiv, player.board.board);
  DisplayModule.displayBoard(computerBoardDiv, null);
  DisplayModule.displayShips(playerShips);

  const callback = (e) => {
    const row = e.target.getAttribute('data-index')[0];
    const col = e.target.getAttribute('data-index')[1];

    attack(player, computer, +row, +col, e.target);

    if (!checkForWin(player, computer)) {
      while (computer.active) {
        computerMove(player, computer);
      }
    }
  };

  const computerBoardDivs = document.querySelectorAll('.computerBoard');
  [...computerBoardDivs].forEach((div) => {
    div.addEventListener('click', callback, false);
    DisplayModule.addClassToDiv(div, 'inactive');
  });
};
