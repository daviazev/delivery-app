function mergeProductInfo(data) {
  const { sale, productSales, products } = data;
  const productInfo = products
    .reduce((acc, { id, name, price }) => (
      { ...acc, [id]: { name, price } }), {});

  const salesWithProductInfo = productSales.map((productSale) => {
    const { productId, quantity } = productSale;
    const { name, price } = productInfo[productId];
    return { productId, quantity, name, price };
  });
  
  return { sale, products: salesWithProductInfo };
}

module.exports = mergeProductInfo;
