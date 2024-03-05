// Card.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Card = ({ cardNumber }: { cardNumber: number }) => {
  const [cardInfo, setCardInfo] = useState({ id: 0, about: '', photo: '' });

  useEffect(() => {
    // Fetch card information from the server
    axios.get(`http://localhost:3001/cards/${cardNumber}`)
      .then(response => setCardInfo(response.data))
      .catch(error => console.error('Error fetching card information', error));
  }, [cardNumber]);

  return (
    <div className='border border-black border-solid p-2 m-2 h-[300px]'>
      <p>{cardInfo.id}</p>
      <Image src={cardInfo.photo} alt={cardInfo.about} width={200} height={150} />
      <p>{cardInfo.about}</p>
    </div>
  );
};

export default Card;
