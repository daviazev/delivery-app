import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Countdown() {
  const COUNT = 3;
  const [countdown, setCountdown] = useState(COUNT);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const TIME = 1000;

  useEffect(() => {
    if (countdown <= 0) navigate('/customer/orders/1');
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
