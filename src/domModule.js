
const DomModule = (() => {
  const renderBoard = (parent, matrix) => {
    for (let row = 0; row < 10; row += 1) {
      for (let col = 0; col < 10; col += 1) {
        const gridDiv = document.createElement('div');
        if (matrix === null) {
          gridDiv.setAttribute('data-index', `${row}${col}`);
          gridDiv.classList.add('computerBoard');
        } else {
          gridDiv.setAttribute('id', `${row}${col}`);
          gridDiv.classList.add('playerBoard');
          if (matrix[row][col] !== 'empty' && matrix[row][col] !== 'no-ship') {
            gridDiv.classList.add('ship');
          }
        }
        parent.appendChild(gridDiv);
      }
    }
  };

  const displayShips = (allShips) => {
    allShips.forEach((ship) => {
      for (let i = 0; i < ship.cells.length; i += 1) {
        const shipDiv = document.getElementById(`${ship.cells[i][0]}${ship.cells[i][1]}`);
        if (i === 0) shipDiv.classList.add('head');
        if (ship.cells.length - 1 === i) shipDiv.classList.add('tail');
        if (ship.isHorizontal) {
          shipDiv.classList.add('horizontal');
        } else {
          shipDiv.classList.add('vertical');
        }
      }
    });
  };

  const emptyBoard = (babyCell, parentId) => {
    const children = document.querySelectorAll(babyCell);
    const parent = document.getElementById(parentId);

    [...children].forEach((child) => {
      parent.removeChild(child);
    });
  };

  const announceWinner = (winningMessage) => {
    const gameOverDiv = document.querySelector('#flashinfo');
    const flashInfosDiv = document.getElementById('flashinfo2');
    flashInfosDiv.textContent = winningMessage;
    gameOverDiv.innerHTML = '<img src="./assets/images/gameover.png" alt="over">';    
  };

  const displayRestartButton = () => {
    const retstartButton = document.getElementById('restart');
    retstartButton.classList.remove('hide');
    retstartButton.addEventListener('click', () => { window.location.reload() }, false);
  }

  const updateTotalShipSunkStatus = (statusDiv, totalShipsSunk) => {
    const status = document.getElementById(statusDiv);
    status.innerHTML = `Number of ships sunk : ${totalShipsSunk}`;
  }

  const renderAngryFace = (attackedDiv) => {
    attackedDiv.innerHTML = '<img src="./assets/images/sadguy.png" alt="sad">';
  }

  return {
    renderBoard, displayShips, emptyBoard, announceWinner, displayRestartButton, updateTotalShipSunkStatus, renderAngryFace,
  };
})();

export default DomModule;