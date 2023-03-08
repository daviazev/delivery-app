import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';
import api, { setToken } from '../axios/config';
import '../styles/cart.css';

export default function Cart() {
  const [products, setProducts] = useState([]);

  const [isFinish, setIsFinish] = useState(false);

  const [sellers, setSellers] = useState([]);

  const [newSale, setNewSale] = useState({
    userId: '',
    sellerId: '2',
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    products: [],
  });

  const [sallesApi, setSallesApi] = useState({});

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')));
    const getSellers = async () => {
      try {
        const { data } = await api.get('/seller', { params: { q: 'seller' } });
        setSellers(data);
      } catch (error) {
        console.error(error);
      }
    };
    getSellers();
  }, []);

  useEffect(() => {
    const setTotalProductPrice = () => {
      if (products.length) {
        setNewSale((prevState) => ({
          ...prevState,
          totalPrice: Number(calcTotalPrice(products).replace(',', '.')),
          userId: localStorage.getItem('userId'),
          products: products.map(({ id, quantity }) => ({ productId: id, quantity })),
        }));
      }
    };
    setTotalProductPrice();
  }, [products]);

  const removeProduct = (index) => {
    const newArr = [...products];
    newArr.splice(index, 1);
    setProducts(newArr);
  };

  const finishPurchase = async (event) => {
    event.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const { data } = await api.post('/sales', newSale);
    localStorage.setItem('sellerId', JSON.parse(data.sellerId));
    setSallesApi(data);
    setIsFinish(true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setNewSale((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section>
      {isFinish ? (
        <Countdown saleId={ sallesApi.id } />
      ) : (
        <section>
          <Navbar />
          <h1>Finalizar Pedido</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>productId</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
                <th>Remover Item</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ name, price, quantity, id }, i) => (
                <tr key={ i }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${i}`
                    }
                  >
                    {i + 1}
                  </td>
                  <td>{id}</td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${i}`
                    }
                  >
                    {name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${i}`
                    }
                  >
                    {quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${i}`
                    }
                  >
                    {`${Number(price).toFixed(2).replace('.', ',')}`}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${i}`
                    }
                  >
                    {`${(Number(price) * Number(quantity))
                      .toFixed(2).replace('.', ',')}`}
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid={
                        `customer_checkout__element-order-table-remove-${i}`
                      }
                      onClick={ () => removeProduct(i) }
                    >
                      Remover

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1
            data-testid="customer_checkout__element-order-total-price"
          >
            {products.length && `Total: R$ ${calcTotalPrice(products)}`}
          </h1>
          <h2>Detalhes e Endereço para Entrega</h2>
          <form onSubmit={ finishPurchase }>
            <label htmlFor="select">
              P. Vendedora Responsável:
              <select
                id="select"
                name="sellerId"
                data-testid="customer_checkout__select-seller"
                onChange={ handleChange }
              >
                {sellers.map(({ name, id }, index) => (
                  <option key={ index } value={ id }>{name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="address">
              Endereço
              <input
                type="text"
                id="address"
                placeholder="Digite seu Endereço"
                name="deliveryAddress"
                data-testid="customer_checkout__input-address"
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="houseNumber">
              Número
              <input
                type="number"
                id="houseNumber"
                name="deliveryNumber"
                data-testid="customer_checkout__input-address-number"
                onChange={ handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="customer_checkout__button-submit-order"
            >
              FINALIZAR PRODUTO
            </button>
          </form>
        </section>
      )}
    </section>
  );
}
