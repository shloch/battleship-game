import gameModule from './gameModule';
import DomModule from './DomModule';
import boardFactory from './board';
import playerFactory from './player';

const play = document.getElementById('play');

function beginsGame() {
  const computerBoardDivs = document.querySelectorAll('.computerBoard');
  [...computerBoardDivs].forEach((gridDiv) => {
    gridDiv.classList.remove('inactive');
  });
  play.classList.add('hide');
}

const checkShipSunkStatus = (attackersTotalShips) => {
  let totalSunk = 0;
  for (let ship of attackersTotalShips) {
    if (ship.isSunk()) {
      totalSunk += 1;
    }
  }
  return totalSunk;
}

play.addEventListener('click', beginsGame, false);

const startGame = () => {
  const playerBoardDiv = document.getElementById('playerBoard');
  const computerBoardDiv = document.getElementById('computerBoard');
  const playerBoard = boardFactory();
  const computerBoard = boardFactory();
  const playerShips = gameModule.initializeBoard(playerBoard);
  const computerShips = gameModule.initializeBoard(computerBoard);
  const player = playerFactory(true, playerBoard, null);
  const computer = playerFactory(false, computerBoard, []);
  DomModule.renderBoard(playerBoardDiv, player.board.board);
  DomModule.renderBoard(computerBoardDiv, null);
  DomModule.displayShips(playerShips);


  const computerBoardGridDivs = document.querySelectorAll('.computerBoard');
  [...computerBoardGridDivs].forEach((babyCell) => {
    babyCell.addEventListener('click', (event) => {
      const x = event.target.getAttribute('data-index')[0];
      const y = event.target.getAttribute('data-index')[1];

      //let totalPlayerShipsSunk = checkShipSunkStatus(playerShips);
      //DomModule.announceTotalShipSunk('.numberShipsPlayerAttacked', totalPlayerShipsSunk)
      gameModule.attackShip(player, computer, +x, +y, event.target);

      if (!gameModule.isThereWinner(player, computer)) {
        while (computer.active) {
          //let totalComputerShipsSunk = checkShipSunkStatus(computerShips);
          //const statusDiv = document.querySelector('.numberShipsComputerAttacked');
          //statusDiv.innerHTML = `SHIPS HIT FROM ATTACK : ${totalComputerShipsSunk}`;
          //DomModule.announceTotalShipSunk('.numberShipsComputerAttacked', totalComputerShipsSunk)
          gameModule.computerAIAttack(player, computer);

        }
      }
    }, false);
    babyCell.classList.add('inactive');
  });
};

startGame();
