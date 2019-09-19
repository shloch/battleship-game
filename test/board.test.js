import boardFactory from '../src/board';

let gameboard;
let sample_ship;
beforeEach(() => {
  gameboard = boardFactory();
  sample_ship = {
    cells: [],
    length: 2,
    isHorizontal: true,
    hit: jest.fn(),
    isSunk: jest.fn(() => {
      return false;
    })
  };
});

test('SHIP IS POSITIONED ON THE BOARD', () => {
  gameboard.positionShip(sample_ship, 0, 0);
  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board.length; j++) {
      if (i === 0 && j < 2) {
        expect(typeof gameboard.board[i][j]).toBe('object');
        expect(typeof gameboard.board[i][j]).not.toBe('empty');
      }
    }
  }
});

test('SHIP CORDINATES SHOULD NOT BE OUT OF BOUNDS ON  BOARD', () => {
  sample_ship.length = 5;
  const ship2 = {
    cells: [],
    length: 4,
    isHorizontal: true
  };

  expect(gameboard.positionShip(sample_ship, 11, 17)).toBe('invalid_XY');
  expect(gameboard.positionShip(sample_ship, 9, 8)).toBe('invalid_XY');
  gameboard.positionShip(sample_ship, 0, 1);
  expect(gameboard.positionShip(ship2, 0, 1)).toBe('invalid_XY');

});

test('TESTING ATTACKS ON BOARD WITH OR WITHOUT SHIP', () => {
  gameboard.positionShip(sample_ship, 2, 2);
  expect(gameboard.receiveAttack(2, 2)).toBeTruthy();
  expect(sample_ship.hit).toHaveBeenCalled();
  expect(gameboard.receiveAttack(6, 6)).toBeFalsy();
});


test('VERIFY THAT ALL SHIPS ARE SUNK', () => {
  sample_ship.isSunk = jest.fn(() => {
    return true;
  });
  const ship2 = {
    cells: [],
    length: 1,
    isHorizontal: true,
    isSunk: jest.fn(() => {
      return true;
    })
  };

  gameboard.positionShip(sample_ship, 1, 1);
  gameboard.positionShip(ship2, 7, 7);
  expect(gameboard.checkIfAllShipsSunk()).toBeTruthy();
});

test('VERIFY NOT ALL SHIPS ARE SUNK', () => {
  const ship2 = {
    cells: [],
    length: 1,
    isHorizontal: true,
    isSunk: jest.fn(() => {
      return true;
    })
  };
  gameboard.positionShip(sample_ship, 1, 1);
  gameboard.positionShip(ship2, 7, 7);
  expect(gameboard.checkIfAllShipsSunk()).toBeFalsy();
});