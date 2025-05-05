'use client';

import { useEffect, useState } from 'react';

function HelloWorld() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    setTimeout(() => {
      setMessage('Bem-vindo!');
    }, 1000);
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Hello Garote!</h1>
      <p>{message}</p>
    </main>
  );
}

export default HelloWorld;
