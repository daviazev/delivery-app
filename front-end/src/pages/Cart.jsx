import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';
import api, { setToken } from '../axios/config';
import Table from '../components/Cart/Table';
import '../styles/cart.css';
import AddressForm from '../components/Cart/AddressForm';

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
          userId: JSON.parse(localStorage.getItem('userId')),
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
          <Table
            products={ products }
            removeProduct={ removeProduct }
          />
          <AddressForm
            sellers={ sellers }
            finishPurchase={ finishPurchase }
            handleChange={ handleChange }
          />
        </section>
      )}
    </section>
  );
}
