import gameModule from './gameModule';
import DomModule from './domModule';
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

      gameModule.attackShip(player, computer, +x, +y, event.target);
      const shipsSunkByPlayer = gameModule.checkNumberOfShipSunk(playerShips);
      DomModule.updateTotalShipSunkStatus('shipsAttackedByPlayer', shipsSunkByPlayer)

      if (!gameModule.isThereWinner(player, computer)) {
        while (computer.active) {
          gameModule.computerAIAttack(player, computer);
          let shipsSunkByComputer = gameModule.checkNumberOfShipSunk(computerShips);
          DomModule.updateTotalShipSunkStatus('shipsAttackedByComputer', shipsSunkByComputer)

        }
      }
    }, false);
    babyCell.classList.add('inactive');
  });
};

startGame();
