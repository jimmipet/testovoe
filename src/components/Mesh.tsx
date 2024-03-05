// Mesh.js
import React from 'react';
import Card from './Card';

const Mesh = () => {
  const cardsArray = Array.from({ length: 24 }, (_, index) => index + 1);

  return (
    <div className='w-[80%] h-[auto] overflow-auto grid grid-cols-3 gap-4 p-4'>
      {cardsArray.map((cardNumber) => (
        <Card key={cardNumber} cardNumber={cardNumber} />
      ))}
    </div>
  );
};

export default Mesh;
