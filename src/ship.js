const shipFactory = (length, isHorizontal) => {
  const cells = new Array(length).fill(0);
  const hit = (segment) => {
    cells[segment] = 'X';
    return cells;
  };
  const isSunk = () => cells.every((segment) => segment === 'X');
  return {
    length, cells, isSunk, hit, isHorizontal,
  };
};

export default shipFactory;
