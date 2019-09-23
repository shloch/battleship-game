import shipFactory from './ship';
import playerFactory from './player';
import boardFactory from './board';
//import DisplayModule from './displayModule';
//import { randomBoolean, randomCoordinates } from './utilities';

/**********utility functions*********************** */
let generateRandomNum23 = () => {
  let = randomNum = Math.random();
  if (randomNum > 0.6) randInt23();
  return Math.floor(randomNum * 3 + 2);
};

const toggleHorizontal = () => (Math.random() < 0.5);

export const randomCoordinates = () => {
  const x = Math.round(Math.random() * 9);
  const y = Math.round(Math.random() * 9);
  return [x, y];
};
/**********utility functions[end]*********************** */

const gameModule = (() => {
  const initializeBoard = (board) => {
    let count = 0;
    const allSHips = [];

    /*while (count1 < 4) {
      const ship = shipFactory(1, true);
      const placedShip = board.placeShip(ship, randomCoordinates());
      if (placedShip !== -1) {
        count1 += 1;
        placedShips.push(placedShip);
      }
    }*/

    while (count < 5) {
      const generatedShips = shipFactory(generateRandomNum23(), toggleHorizontal());
      let [x, y] = [...randomCoordinates()];
      const positionedShip = board.positionShip(generatedShips, x, y);
      if (positionedShip !== 'invalid_XY') {
        count += 1;
        allSHips.push(positionedShip);
      }
    }
    return allSHips;
  };

  const isThereWinner = (player, computer) => {
    let isWinner = false;
    if (player.board.allSunk() || computer.board.allSunk()) {
      isWinner = true;
      player.active = false;
      computer.active = false;
      if (computer.board.allSunk()) {
        DisplayModule.displayMessage('Player Wins!');
      } else {
        DisplayModule.displayMessage('Computer Wins!');
      }
      const retstartButton = document.getElementById('restart');
      retstartButton.classList.remove('hide');
      retstartButton.addEventListener('click', () => { window.location.reload() }, false);

    }
    return isWinner;
  };

  const attackShip = (attacker, opponent, row, col, attackedDiv) => {
    if (!attacker.active) return;

    const isShipHit = opponent.board.receiveAttack(row, col);
    let hitOrMiss = (isShipHit) ? 'hit' : 'miss';
    DisplayModule.addClassToDiv(attackedDiv, hitOrMiss);
    if (!isShipHit) {
      attacker.active = false;
      opponent.active = true;
    }
    return isShipHit;
  };

  const AttackByComputer = (player, computer) => {
    const x, y;
    let isValidSquare = false;

    while (!isValidSquare) {
      [x, y] = [...randomCoordinates()];
      const pastMovesIndex = computer.pastMoves
        .findIndex((historyMoves) => {
          historyMoves[0] === x && historyMoves[1] === y
        });
      if (pastMovesIndex === -1) {
        isValidSquare = true;
      };
    }
    computer.pastMoves.push([x, y]);
    const attackedDivID = document.getElementById(`${x}${y}`);
    attackShip(computer, player, x, y, attackedDivID);
    isThereWinner(player, computer);
  };
})();

export default gameModule;
