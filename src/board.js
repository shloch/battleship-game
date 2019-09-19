const boardFactory = () => {
  const board = new Array(10);
  for (let square = 0; square < 10; square += 1) {
    board[square] = new Array(10).fill('empty');
  }

  const isShipCordinatesValid = (shipSize, isHorizontal, x, y) => {
    if (
      board[x][y] !== 'empty'
      || (isHorizontal && y + shipSize > 10)
      || (!isHorizontal && x + shipSize > 10)
    ) return false;

    let rowStart = x - 1;
    if (x === 0) rowStart = 0;
    let colStart = y - 1
    if (y === 0) colStart = 0;

    let rowEnd;
    let colEnd;

    if (isHorizontal) {
      rowEnd = x + 2;
      if (x === 9) rowEnd = 10;
      colEnd = y + shipSize + 1;
      if (y + shipSize === 10) colEnd = 10;
    } else {
      rowEnd = x + shipSize + 1;
      if (x + shipSize === 10) rowEnd = 10;
      colEnd = y + 2;
      if (y === 9) colEnd = 10;
    }

    for (let i = rowStart; i < rowEnd; i += 1) {
      for (let j = colStart; j < colEnd; j += 1) {
        if (board[i][j] !== 'empty') return false;
      }
    }
    return true;
  };

  const positionShip = (ship, x, y) => {
    if ((x > 10) || (y > 10) || !isShipCordinatesValid(ship.length, ship.isHorizontal, x, y)) {
      return 'invalid_XY';
    }

    if (ship.isHorizontal) {
      const row = x;
      for (
        let i = y, count = 0;
        i < y + ship.length;
        i += 1, count += 1
      ) {
        ship.cells[count] = [row, i];
        board[row][i] = ship;
      }
    } else {
      const col = y;
      for (
        let i = x, count = 0;
        i < x + ship.length;
        i += 1, count += 1
      ) {
        ship.cells[count] = [i, col];
        board[i][col] = ship;
      }
    }
    return ship;
  };

  const receiveAttack = (x, y) => {
    let isAttacked = false;
    if (board[x][y] === 'empty') {
      board[x][y] = 'miss';
    } else {
      const ship = board[x][y];
      const attack = ship.cells.findIndex((cells) => cells[0] === x && cells[1] === y);
      ship.hit(attack);
      isAttacked = true;
    }
    return isAttacked;
  };

  const checkIfAllShipsSunk = () => {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board.length; j += 1) {
        if (typeof board[i][j] === 'object' && !board[i][j].isSunk()) return false;
      }
    }
    return true;
  };

  return {
    board,
    positionShip,
    receiveAttack,
    checkIfAllShipsSunk,
  };
};

export default boardFactory;