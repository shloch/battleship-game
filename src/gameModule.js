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
      const generatedShip = shipFactory(generateRandomNum23(), toggleHorizontal());
      [x, y] = [...randomCoordinates()];
      const positionedShip = board.positionShip(generatedShip, x, y);
      if (positionedShip !== 'invalid_XY') {
        count += 1;
        allSHips.push(positionedShip);
      }
    }
    return allSHips;
  };

  //ONCTINUE BELOW
  const checkForWin = (player, computer) => {
    let win;
    if (player.board.allSunk() || computer.board.allSunk()) {
      player.active = false;
      computer.active = false;
      if (computer.board.allSunk()) {
        DisplayModule.displayMessage('Player Wins!');
      } else {
        DisplayModule.displayMessage('Computer Wins!');
      }
      const button = document.getElementById('restart');
      button.classList.remove('hide');
      button.addEventListener('click', () => { window.location.reload() }, false);
      win = true;
    } else {
      win = false;
    }
    return win;
  };