const shipFactory = (length, isHorizontal) => {
  const cells = new Array(length).fill(0);
  const isSunk = () => cells.every((segment) => segment === 'X');
  const hit = (segment) => {
    cells[segment] = 'X';
    return cells;
  };
  return {
    length, cells, isSunk, hit, isHorizontal,
  };
};

export default shipFactory;