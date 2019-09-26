import boardFactory from '../src/board';

let gameboard;
let sampleShip;

beforeEach(() => {
  gameboard = boardFactory();
  sampleShip = {
    cells: [],
    length: 2,
    isHorizontal: true,
    hit: jest.fn(),
    isSunk: jest.fn(() => {
      return false;
    }),
  };
});

test('SHIP IS POSITIONED ON THE BOARD', () => {
  const xAxis = 0;
  gameboard.positionShip(sampleShip, xAxis, 0);
  for (let i = 0; i < gameboard.board.length; i += 1) {
    for (let j = 0; j < gameboard.board.length; j += 1) {
      if (i === xAxis && j < sampleShip.length) {
        expect(typeof gameboard.board[i][j]).toBe('object');
        expect(gameboard.board[i][j]).not.toBe('empty');
      } else {
        expect(gameboard.board[i][j]).toBe('empty');
      }
    }
  }
});

test('SHIP CORDINATES SHOULD NOT BE OUT OF BOUNDS ON  BOARD', () => {
  sampleShip.length = 5;
  const ship2 = {
    cells: [],
    length: 4,
    isHorizontal: true,
  };

  expect(gameboard.positionShip(sampleShip, 11, 17)).toBe('invalid_XY');
  expect(gameboard.positionShip(sampleShip, 9, 8)).toBe('invalid_XY');
  gameboard.positionShip(sampleShip, 0, 1);
  expect(gameboard.positionShip(ship2, 0, 1)).toBe('invalid_XY');
});

test('TESTING ATTACKS ON BOARD WITH OR WITHOUT SHIP', () => {
  gameboard.positionShip(sampleShip, 2, 2);
  expect(gameboard.receiveAttack(2, 2)).toBeTruthy();
  expect(sampleShip.hit).toHaveBeenCalled();
  expect(gameboard.receiveAttack(6, 6)).toBeFalsy();
});


test('VERIFY THAT ALL SHIPS ARE SUNK', () => {
  sampleShip.isSunk = jest.fn(() => true);
  const ship2 = {
    cells: [],
    length: 1,
    isHorizontal: true,
    isSunk: jest.fn(() => {
      return true;
    }),
  };

  gameboard.positionShip(sampleShip, 1, 1);
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
    }),
  };
  gameboard.positionShip(sampleShip, 1, 1);
  gameboard.positionShip(ship2, 7, 7);
  expect(gameboard.checkIfAllShipsSunk()).toBeFalsy();
});
