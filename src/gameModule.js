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
        DomModule.updateTotalShipSunkStatus('shipsAttackedByComputer', 5)
        DomModule.announceWinner('GAME OVER : Player Won !!!');
      } else {
        DomModule.updateTotalShipSunkStatus('shipsAttackedByPlayer', 5)
        DomModule.announceWinner('GAME OVER : Computer Won !!!');
      }
      DomModule.displayRestartButton();
    }
    return isWinner;
  };

  mod.attackShip = (attacker, opponent, x, y, attackedDiv) => {

    if (!attacker.active) return;

    const isShipHit = opponent.board.receiveAttack(x, y);
    let hitOrMiss = (isShipHit) ? 'hit' : 'miss';
    attackedDiv.classList.add(hitOrMiss);
    if (attacker.pastMoves != null && hitOrMiss == 'hit') {
      attackedDiv.innerHTML = 'X';
    }
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

  mod.checkNumberOfShipSunk = (opponentTotalShips) => {
    let totalSunk = 0;
    for (let ship of opponentTotalShips) {
      if (ship.isSunk()) {
        totalSunk += 1;
      }
    }
    return totalSunk;
  }

  return mod;
})();

export default gameModule;
