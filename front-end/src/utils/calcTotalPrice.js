module.exports = (array) => array.map(({ price, quantity }) => (
  Number(price) * Number(quantity)
))
  .reduce((acc, cur) => acc + cur).toFixed(2).replace('.', ',');
