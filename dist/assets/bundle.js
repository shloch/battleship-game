/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst boardFactory = () => {\n  const board = new Array(10);\n  for (let square = 0; square < 10; square += 1) {\n    board[square] = new Array(10).fill('empty');\n  }\n\n  const isShipCordinatesValid = (shipSize, isHorizontal, x, y) => {\n    if (\n      board[x][y] !== 'empty'\n      || (isHorizontal && y + shipSize > 10)\n      || (!isHorizontal && x + shipSize > 10)\n    ) return false;\n\n    let rowStart = x - 1;\n    if (x === 0) rowStart = 0;\n    let colStart = y - 1\n    if (y === 0) colStart = 0;\n\n    let rowEnd;\n    let colEnd;\n\n    if (isHorizontal) {\n      rowEnd = x + 2;\n      if (x === 9) rowEnd = 10;\n      colEnd = y + shipSize + 1;\n      if (y + shipSize === 10) colEnd = 10;\n    } else {\n      rowEnd = x + shipSize + 1;\n      if (x + shipSize === 10) rowEnd = 10;\n      colEnd = y + 2;\n      if (y === 9) colEnd = 10;\n    }\n\n    for (let i = rowStart; i < rowEnd; i += 1) {\n      for (let j = colStart; j < colEnd; j += 1) {\n        if (board[i][j] !== 'empty') return false;\n      }\n    }\n    return true;\n  };\n\n  const positionShip = (ship, x, y) => {\n    if ((x > 10) || (y > 10) || !isShipCordinatesValid(ship.length, ship.isHorizontal, x, y)) {\n      return 'invalid_XY';\n    }\n\n    if (ship.isHorizontal) {\n      const row = x;\n      for (\n        let i = y, count = 0;\n        i < y + ship.length;\n        i += 1, count += 1\n      ) {\n        ship.cells[count] = [row, i];\n        board[row][i] = ship;\n      }\n    } else {\n      const col = y;\n      for (\n        let i = x, count = 0;\n        i < x + ship.length;\n        i += 1, count += 1\n      ) {\n        ship.cells[count] = [i, col];\n        board[i][col] = ship;\n      }\n    }\n    return ship;\n  };\n\n  const receiveAttack = (x, y) => {\n    let isAttacked = false;\n    if (board[x][y] === 'empty') {\n      board[x][y] = 'no-ship';\n    } else {\n      const ship = board[x][y];\n      const attack = ship.cells.findIndex((cell) => cell[0] === x && cell[1] === y);\n      ship.hit(attack);\n      isAttacked = true;\n    }\n    return isAttacked;\n  };\n\n  const checkIfAllShipsSunk = () => {\n    for (let i = 0; i < board.length; i += 1) {\n      for (let j = 0; j < board.length; j += 1) {\n        if (typeof board[i][j] === 'object' && !board[i][j].isSunk()) return false;\n      }\n    }\n    return true;\n  };\n\n  return {\n    board,\n    positionShip,\n    receiveAttack,\n    checkIfAllShipsSunk,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (boardFactory);\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/domModule.js":
/*!**************************!*\
  !*** ./src/domModule.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameModule */ \"./src/gameModule.js\");\n\n\nconst DomModule = (() => {\n  const renderBoard = (parent, matrix) => {\n    for (let row = 0; row < 10; row += 1) {\n      for (let col = 0; col < 10; col += 1) {\n        const gridDiv = document.createElement('div');\n        if (matrix === null) {\n          gridDiv.setAttribute('data-index', `${row}${col}`);\n          gridDiv.classList.add('computerBoard');\n        } else {\n          gridDiv.setAttribute('id', `${row}${col}`);\n          gridDiv.classList.add('playerBoard');\n          if (matrix[row][col] !== 'empty' && matrix[row][col] !== 'no-ship') {\n            gridDiv.classList.add('ship');\n          }\n        }\n        parent.appendChild(gridDiv);\n      }\n    }\n  };\n\n  const displayShips = (allShips) => {\n    allShips.forEach((ship) => {\n      for (let i = 0; i < ship.cells.length; i += 1) {\n        const shipDiv = document.getElementById(`${ship.cells[i][0]}${ship.cells[i][1]}`);\n        if (i === 0) shipDiv.classList.add('head');\n        if (ship.cells.length - 1 === i) shipDiv.classList.add('tail');\n        if (ship.isHorizontal) {\n          shipDiv.classList.add('horizontal');\n        } else {\n          shipDiv.classList.add('vertical');\n        }\n      }\n    });\n  };\n\n  const emptyBoard = (babyCell, parentId) => {\n    const children = document.querySelectorAll(babyCell);\n    const parent = document.getElementById(parentId);\n\n    [...children].forEach((child) => {\n      parent.removeChild(child);\n    });\n  };\n\n  const announceWinner = (winningMessage) => {\n    const flashInfosDiv = document.getElementById('flashinfo2');\n    flashInfosDiv.textContent = winningMessage;\n  };\n\n  const displayRestartButton = () => {\n    const retstartButton = document.getElementById('restart');\n    retstartButton.classList.remove('hide');\n    retstartButton.addEventListener('click', () => { window.location.reload() }, false);\n  }\n\n  const updateTotalShipSunkStatus = (statusDiv, totalShipsSunk) => {\n    const status = document.getElementById(statusDiv);\n    status.innerHTML = `Number of ships sunk : ${totalShipsSunk}`;\n  }\n\n  return {\n    renderBoard, displayShips, emptyBoard, announceWinner, displayRestartButton, updateTotalShipSunkStatus,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DomModule);\n\n//# sourceURL=webpack:///./src/domModule.js?");

/***/ }),

/***/ "./src/gameModule.js":
/*!***************************!*\
  !*** ./src/gameModule.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _domModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domModule */ \"./src/domModule.js\");\n\n\n\nconst gameModule = (() => {\n\n  let generateRandomNum23 = () => {\n    let randomNum = Math.random();\n    return (randomNum > 0.5) ? 3 : 2;\n  };\n\n  const toggleHorizontal = () => (Math.random() < 0.5);\n\n  const randomCoordinates = () => {\n    const x = Math.round(Math.random() * 9);\n    const y = Math.round(Math.random() * 9);\n    return [x, y];\n  };\n\n  const checkAIPastMoves = (passMovesArray, xCoord, yCoord) => {\n    for (let elt of passMovesArray) {\n      if (elt[0] == xCoord && elt[1] == yCoord) return true;\n    }\n    return false;\n  };\n\n  const mod = {};\n  mod.initializeBoard = (board) => {\n    let count = 0;\n    const allSHips = [];\n\n    while (count < 5) {\n      const generatedShips = Object(_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(generateRandomNum23(), toggleHorizontal());\n      let [x, y] = [...randomCoordinates()];\n      const positionedShip = board.positionShip(generatedShips, x, y);\n      if (positionedShip !== 'invalid_XY') {\n        count += 1;\n        allSHips.push(positionedShip);\n      }\n    }\n    return allSHips;\n  };\n\n  mod.isThereWinner = (player, computer) => {\n    const gameOverDiv = document.querySelector('#flashinfo');\n    let isWinner = false;\n    if (player.board.checkIfAllShipsSunk() || computer.board.checkIfAllShipsSunk()) {\n      isWinner = true;\n      player.active = false;\n      computer.active = false;\n      if (computer.board.checkIfAllShipsSunk()) {\n        _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateTotalShipSunkStatus('shipsAttackedByComputer', 5)\n        _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].announceWinner('Player Won !!!');\n        gameOverDiv.innerHTML = '<img src=\"./assets/images/gameover.png\" alt=\"over\">';\n      } else {\n        _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateTotalShipSunkStatus('shipsAttackedByPlayer', 5)\n        _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].announceWinner('Computer Won !!!');\n        gameOverDiv.innerHTML = '<img src=\"./assets/images/gameover.png\" alt=\"over\">';\n      }\n      _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayRestartButton();\n    }\n    return isWinner;\n  };\n\n  mod.attackShip = (attacker, opponent, x, y, attackedDiv) => {\n\n    if (!attacker.active) return;\n\n    const isShipHit = opponent.board.receiveAttack(x, y);\n    let hitOrMiss = (isShipHit) ? 'hit' : 'miss';\n    attackedDiv.classList.add(hitOrMiss);\n    if (attacker.pastMoves != null && hitOrMiss == 'hit') {\n      attackedDiv.innerHTML = '<img src=\"./assets/images/sadguy.png\" alt=\"sad\">';\n    }\n    if (!isShipHit) {\n      attacker.active = false;\n      opponent.active = true;\n    }\n    return isShipHit;\n  };\n\n  mod.computerAIAttack = (player, computer) => {\n    let x, y;\n    let islegalMove = false;\n\n    while (!islegalMove) {\n      [x, y] = [...randomCoordinates()]\n      if (checkAIPastMoves(computer.pastMoves, x, y) == false) {\n        islegalMove = true;\n      }\n    }\n    computer.pastMoves.push([x, y]);\n    const attackedDivID = document.getElementById(`${x}${y}`);\n    gameModule.attackShip(computer, player, x, y, attackedDivID);\n\n    gameModule.isThereWinner(player, computer);\n  };\n\n  mod.checkNumberOfShipSunk = (opponentTotalShips) => {\n    let totalSunk = 0;\n    for (let ship of opponentTotalShips) {\n      if (ship.isSunk()) {\n        totalSunk += 1;\n      }\n    }\n    return totalSunk;\n  }\n\n  return mod;\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (gameModule);\n\n\n//# sourceURL=webpack:///./src/gameModule.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameModule */ \"./src/gameModule.js\");\n/* harmony import */ var _domModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domModule */ \"./src/domModule.js\");\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\n\n\nconst play = document.getElementById('play');\n\nfunction beginsGame() {\n  const computerBoardDivs = document.querySelectorAll('.computerBoard');\n  [...computerBoardDivs].forEach((gridDiv) => {\n    gridDiv.classList.remove('inactive');\n  });\n  play.classList.add('hide');\n}\n\nplay.addEventListener('click', beginsGame, false);\n\nconst startGame = () => {\n  const playerBoardDiv = document.getElementById('playerBoard');\n  const computerBoardDiv = document.getElementById('computerBoard');\n  const playerBoard = Object(_board__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  const computerBoard = Object(_board__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  const playerShips = _gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initializeBoard(playerBoard);\n  const computerShips = _gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initializeBoard(computerBoard);\n  const player = Object(_player__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(true, playerBoard, null);\n  const computer = Object(_player__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(false, computerBoard, []);\n  _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderBoard(playerBoardDiv, player.board.board);\n  _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderBoard(computerBoardDiv, null);\n  _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayShips(playerShips);\n\n\n  const computerBoardGridDivs = document.querySelectorAll('.computerBoard');\n  [...computerBoardGridDivs].forEach((babyCell) => {\n    babyCell.addEventListener('click', (event) => {\n      const x = event.target.getAttribute('data-index')[0];\n      const y = event.target.getAttribute('data-index')[1];\n\n      _gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].attackShip(player, computer, +x, +y, event.target);\n      const shipsSunkByPlayer = _gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].checkNumberOfShipSunk(playerShips);\n      _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateTotalShipSunkStatus('shipsAttackedByPlayer', shipsSunkByPlayer)\n\n      if (!_gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isThereWinner(player, computer)) {\n        while (computer.active) {\n          _gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].computerAIAttack(player, computer);\n          let shipsSunkByComputer = _gameModule__WEBPACK_IMPORTED_MODULE_0__[\"default\"].checkNumberOfShipSunk(computerShips);\n          _domModule__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateTotalShipSunkStatus('shipsAttackedByComputer', shipsSunkByComputer)\n\n        }\n      }\n    }, false);\n    babyCell.classList.add('inactive');\n  });\n};\n\nstartGame();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst playerFactory = (active, board, pastMoves) => {\n  return { active, board, pastMoves };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (playerFactory);\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst shipFactory = (length, isHorizontal) => {\n  const cells = new Array(length).fill(0);\n  const hit = (segment) => {\n    cells[segment] = 'X';\n    return cells;\n  };\n  const isSunk = () => cells.every((segment) => segment === 'X');\n  return {\n    length, cells, isSunk, hit, isHorizontal,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (shipFactory);\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ });