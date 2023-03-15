import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import '../styles/countdown.css';

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
    <section className="countdown">
      <span>
        Compra realizada com sucesso!
      </span>
      <span>{`Você será redirecionado em ${countdown}...`}</span>
    </section>
  );
}

Countdown.propTypes = {
  saleId: propTypes.number.isRequired,
};
