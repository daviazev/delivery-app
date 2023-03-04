import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

export default function Countdown({ saleId }) {
  const COUNT = 3;
  const [countdown, setCountdown] = useState(COUNT);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const TIME = 1000;

  useEffect(() => {
    if (countdown <= 0) navigate(`/customer/orders/${saleId}`);
  }, [countdown]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prevState) => prevState - 1);
    }, TIME);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section>
      <h1>
        <strong>Compra realizada com sucesso!</strong>
      </h1>
      <h2>{`Você será redirecionado em ${countdown}...`}</h2>
    </section>
  );
}

Countdown.propTypes = {
  saleId: propTypes.number.isRequired,
};
