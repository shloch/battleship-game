import shipFactory from '../src/ship';

test('Hitting the SHIP', () => {
  const ship = shipFactory(7, true);
  ship.hit(6);
  expect(ship.cells[6]).toEqual('X');
});

test('Ensure ship length is a number', () => {
  expect(typeof shipFactory(20).length).toBe('number');
  expect(shipFactory(20).length).toBe(20);
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

