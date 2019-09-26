import shipFactory from './ship';
import DomModule from './domModule';

const gameModule = (() => {
  const generateRandomNum23 = () => {
    const randomNum = Math.random();
    return (randomNum > 0.5) ? 3 : 2;
  };

  const toggleHorizontal = () => (Math.random() < 0.5);

  const randomCoordinates = () => {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    return [x, y];
  };

  const checkAIPastMoves = (passMovesArray, xCoord, yCoord) => {
    let response = false;
    passMovesArray.forEach((elt) => {
      if (elt[0] === xCoord && elt[1] === yCoord) response = true;
    });
    return response;
  };

  const mod = {};
  mod.initializeBoard = (board) => {
    let count = 0;
    const allSHips = [];

    while (count < 5) {
      const generatedShips = shipFactory(generateRandomNum23(), toggleHorizontal());
      const [x, y] = [...randomCoordinates()];
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
        DomModule.updateTotalShipSunkStatus('shipsAttackedByComputer', 5);
        DomModule.announceWinner('Player Won !!!');
      } else {
        DomModule.updateTotalShipSunkStatus('shipsAttackedByPlayer', 5);
        DomModule.announceWinner('Computer Won !!!');
      }
      DomModule.displayRestartButton();
    }
    return isWinner;
  };

  mod.attackShip = (attacker, opponent, x, y, attackedDiv) => {
    if (!attacker.active) return;
    const isShipHit = opponent.board.receiveAttack(x, y);
    const hitOrMiss = (isShipHit) ? 'hit' : 'miss';
    attackedDiv.classList.add(hitOrMiss);
    if (attacker.pastMoves !== null && hitOrMiss === 'hit') {
      DomModule.renderAngryFace(attackedDiv);
    }
    if (!isShipHit) {
      attacker.active = false;
      opponent.active = true;
    }
  };

  mod.computerAIAttack = (player, computer) => {
    let x;
    let y;
    let islegalMove = false;

    while (!islegalMove) {
      [x, y] = [...randomCoordinates()];
      if (checkAIPastMoves(computer.pastMoves, x, y) === false) {
        islegalMove = true;
      }
    }
    computer.pastMoves.push([x, y]);

    const attackedDivID = document.getElementById(`${x}${y}`);
    gameModule.attackShip(computer, player, x, y, attackedDivID);

    return gameModule.isThereWinner(player, computer);
  };

  mod.checkNumberOfShipSunk = (opponentTotalShips) => {
    let totalSunk = 0;
    opponentTotalShips.forEach((ship) => {
      if (ship.isSunk()) {
        totalSunk += 1;
      }
    });
    return totalSunk;
  };

  return mod;
})();

export default gameModule;
