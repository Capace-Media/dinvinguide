const insert = (array, index, newItem) => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index),
];

export default insert;
