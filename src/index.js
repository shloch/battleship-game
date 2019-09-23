import gameModule from './gameModule';
import DomModule from './DomModule';
import boardFactory from './board';
import playerFactory from './player';

const play = document.getElementById('play');
//const randomize = document.getElementById('randomize');

/*
function wipeDom() {
  const emptyBoard = (babyCell, parentId) => {
    DomModule.emptyBoard('.playerBoard', 'playerBoard');
    DomModule.emptyBoard('.computerBoard', 'computerBoard');
    gameModule.startGame();
  }
}
*/

function beginsGame() {
  const computerBoardDivs = document.querySelectorAll('.computerBoard');
  [...computerBoardDivs].forEach((gridDiv) => {
    gridDiv.classList.remove('inactive');
  });
  play.classList.add('hide');
}

//randomize.addEventListener('click', wipeDom, false);

play.addEventListener('click', beginsGame, false);

const startGame = () => {
  const playerBoardDiv = document.getElementById('playerBoard');
  const computerBoardDiv = document.getElementById('computerBoard');
  const playerBoard = boardFactory();
  const computerBoard = boardFactory();
  const playerShips = gameModule.initializeBoard(playerBoard);
  gameModule.initializeBoard(computerBoard);
  const player = playerFactory(true, playerBoard, null);
  const computer = playerFactory(false, computerBoard, []);
  DomModule.displayBoard(playerBoardDiv, player.board.board);
  DomModule.displayBoard(computerBoardDiv, null);
  DomModule.displayShips(playerShips);


  const computerBoardGridDivs = document.querySelectorAll('.computerBoard');
  [...computerBoardGridDivs].forEach((babyCell) => {
    babyCell.addEventListener('click', (event) => {
      const x = event.target.getAttribute('data-index')[0];
      const y = event.target.getAttribute('data-index')[1];
      attack(player, computer, +x, +y, event.target);

      if (!gameModule.isThereWinner(player, computer)) {
        while (computer.active) {
          gameModule.computerAIAttack(player, computer);
        }
      }
    }, false);
    babyCell.classList.add('inactive');
    //DomModule.addClassToDiv(div, 'inactive');
  });
};

startGame();
