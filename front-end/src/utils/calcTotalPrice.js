module.exports = (array) => array.map(({ price, quantity }) => price * quantity)
  .reduce((acc, cur) => acc + cur).toFixed(2).replace('.', ',');
