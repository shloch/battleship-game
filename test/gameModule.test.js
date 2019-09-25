import shipFactory from '../src/ship';
import gameModule from '../src/gameModule';
import boardFactory from '../src/board';
import playerFactory from '../src/player';

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

  document.body.innerHTML =`
  <h1>Battleship</h1>
  <div id="flashinfo"></div>
  <h2 id="flashinfo2"></h2>
  <div id="main">    
    <div>
      <div id="shipsAttackedByPlayer" class="shipsAttacked"> Number of ships sunk : 0</div>
      <div id="playerBoard"></div>
      <!--<button id="randomize">Randomize</button>-->
    </div>
    <div>
      <div id="shipsAttackedByComputer" class="shipsAttacked">Number of ships sunk : 0</div>
      <div id="computerBoard"></div>
      <button id="play">Play</button>
    </div>
  </div>
  <button id="restart" class="hide">Play Again</button>
  <script src="assets/bundle.js"></script>
  `;  
});

test('Ensure the board is initialized', () => {
  const allShip = gameModule.initializeBoard(gameboard)
  expect(allShip.length).toBe(5);
  expect(allShip[0].length).toBeGreaterThan(1);
  expect(allShip[0].length).toBeLessThan(4);
  expect(typeof allShip[0]).toBe('object');
});

test.only('If winner exist', () => {
  const sample_board = boardFactory();
  const player = playerFactory(true, gameboard, null)
  const computer = playerFactory(false, sample_board, [])
  const playerShip = gameModule.initializeBoard(gameboard)
  const computerShip = gameModule.initializeBoard(sample_board)
  
  computerShip.forEach((ship) => {
    ship.isSunk = jest.fn(() => {
      return true;
    })
  })

  const status = document.getElementById('shipsAttackedByPlayer');
  const playerIsWinner = gameModule.isThereWinner(player, computer)
  expect(playerIsWinner).toBe(true);
});

test('Check if SHip sink', () => {
  const ship = shipFactory(4, false);
  expect(ship.isSunk()).toBe(false);
});

test('Check if SHip sink', () => {
  const ship = shipFactory(3, false);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
});

