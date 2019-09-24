import shipFactory from './ship';
import DomModule from './DomModule';

const gameModule = (() => {

  let generateRandomNum23 = () => {
    let randomNum = Math.random();
    return (randomNum > 0.5) ? 3 : 2;
  };

  const toggleHorizontal = () => (Math.random() < 0.5);

  const randomCoordinates = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    return [x, y];
  };

  const checkAIPastMoves = (passMovesArray, xCoord, yCoord) => {
    for (let elt of passMovesArray) {
      if (elt[0] == xCoord && elt[1] == yCoord) return true;
    }
    return false;
  };

  const mod = {};
  mod.initializeBoard = (board) => {
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

  mod.isThereWinner = (player, computer) => {
    let isWinner = false;
    if (player.board.checkIfAllShipsSunk() || computer.board.checkIfAllShipsSunk()) {
      isWinner = true;
      player.active = false;
      computer.active = false;
      if (computer.board.checkIfAllShipsSunk()) {
        DomModule.announceWinner('GAME OVER : Player Won !!!');
      } else {
        DomModule.announceWinner('GAME OVER : Computer Won !!!');
      }
      DomModule.displayRestartButton();
    }
    return isWinner;
  };

  mod.attackShip = (attacker, opponent, x, y, attackedDiv) => {
    if (attacker.pastMoves == null) {
      console.log(`attacker = PLAYER `);
    } else {
      console.log(`attacker = AI `);
    }

    if (!attacker.active) return;

    const isShipHit = opponent.board.receiveAttack(x, y);
    let hitOrMiss = (isShipHit) ? 'hit' : 'miss';
    attackedDiv.classList.add(hitOrMiss);
    if (!isShipHit) {
      attacker.active = false;
      opponent.active = true;
    }
    return isShipHit;
  };

  mod.computerAIAttack = (player, computer) => {
    let x, y;
    let islegalMove = false;

    while (!islegalMove) {
      [x, y] = [...randomCoordinates()]
      if (checkAIPastMoves(computer.pastMoves, x, y) == false) {
        islegalMove = true;
      }
    }
    computer.pastMoves.push([x, y]);
    const attackedDivID = document.getElementById(`${x}${y}`);
    gameModule.attackShip(computer, player, x, y, attackedDivID);
    gameModule.isThereWinner(player, computer);
  };

  return mod;
})();

export default gameModule;
