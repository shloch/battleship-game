import shipFactory from '../src/ship';
import gameModule from '../src/gameModule';
import boardFactory from '../src/board';
import playerFactory from '../src/player';

let gameboard;
let sampleShip;

beforeEach(() => {
  gameboard = boardFactory();
  sampleShip = {
    cells: [],
    length: 2,
    isHorizontal: true,
    hit: jest.fn(),
    isSunk: jest.fn(() => false),
  };

  document.body.innerHTML = `
  <h1>Battleship</h1>
  <div id="flashinfo"></div>
  <h2 id="flashinfo2"></h2>
  <div id="main">    
    <div>
      <div id="shipsAttackedByPlayer" class="shipsAttacked"> Number of ships sunk : 0</div>
      <div id="playerBoard"></div>
    </div>
    <div>
      <div id="shipsAttackedByComputer" class="shipsAttacked">Number of ships sunk : 0</div>
      <div id="computerBoard">
          <div class="mockDiv2Attack"></div>
      </div>
      <button id="play">Play</button>
    </div>
  </div>
  <button id="restart" class="hide">Play Again</button>
  <script src="assets/bundle.js"></script>
  `;
});

test('Ensure the board is initialized', () => {
  const allShip = gameModule.initializeBoard(gameboard);
  expect(allShip.length).toBe(5);
  expect(allShip[0].length).toBeGreaterThan(1);
  expect(allShip[0].length).toBeLessThan(4);
  expect(typeof allShip[0]).toBe('object');
});

describe('Testing Game module functions', () => {
  test('If winner exist', () => {
    const sampleBoard = boardFactory();
    const player = playerFactory(true, gameboard, null);
    const computer = playerFactory(false, sampleBoard, []);
    const computerShips = gameModule.initializeBoard(sampleBoard);

    computerShips.forEach((ship) => {
      ship.isSunk = jest.fn(() => true);
    });
    const playerIsWinner = gameModule.isThereWinner(player, computer);
    expect(playerIsWinner).toBe(true);
  });


  test('check Number Of Ship Sunk', () => {
    const sampleBoard = boardFactory();
    const computerShip = gameModule.initializeBoard(sampleBoard);

    for (let ship = 0; ship < 3; ship += 1) {
      computerShip[ship].isSunk = jest.fn(() => true);
    }
    let totalShipSunk = gameModule.checkNumberOfShipSunk(computerShip);
    expect(totalShipSunk).toBe(3);

    for (let ship = 3; ship < 5; ship += 1) {
      computerShip[ship].isSunk = jest.fn(() => true);
    }
    totalShipSunk = gameModule.checkNumberOfShipSunk(computerShip);
    expect(totalShipSunk).toBe(5);
  });


  test('Test if ship is hit after attack from oponent', () => {
    const sampleBoard = boardFactory();
    const sampleShip1 = shipFactory(1, true);
    sampleBoard.positionShip(sampleShip1, 3, 4);
    const player = playerFactory(true, gameboard, null);
    const computer = playerFactory(false, sampleBoard, []);
    gameModule.initializeBoard(gameboard);
    gameModule.initializeBoard(sampleBoard);

    const mockDiv2Attack = document.querySelector('.mockDiv2Attack');
    gameModule.attackShip(player, computer, 3, 4, mockDiv2Attack);
    expect(player.active).toBe(true);
    expect(computer.active).toBe(false);
    const checkNewHitClass = document.querySelectorAll('.hit');
    expect(checkNewHitClass.length).toBe(1);
  });


  test('Test if COMPUTER AI attacks goes through', () => {
    const sampleBoard = boardFactory();

    const player = playerFactory(true, gameboard, null);
    const computer = playerFactory(false, sampleBoard, []);
    gameModule.initializeBoard(gameboard);

    gameModule.initializeBoard(sampleBoard);
    const AIAttachStatus = gameModule.computerAIAttack(player, computer);
    expect(AIAttachStatus).toBe(false);
  });
});
