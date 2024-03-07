// Card.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  card: {
    id: string;
    photo: string;
    about: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <Link href={`/product/${card.id}`}>
      <div
        id={card.id}
        className="p-2 m-2 h-[40vh] min-[500px]:h-[30vh] md:h-[40vh] lg:h-[37vh] xl:h-[35vh] 2xl:h-[37vh] 3xl:h-[45vh] flex flex-col rounded-lg shadow-lg bg-gray-200 transition-transform transform hover:scale-105"
      >
        <div className="rounded-t-lg h-[85%] w-[100%] relative">
          <Image
            src={card.photo}
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        <div>
          <p className="text-xl overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
            {card.about}
          </p>
          <div className="flex justify-between">
            <p className="text-l">Количество в наличии</p>
            <span>{card.count}</span>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-l">Цена</p>
            <span>{card.price},$</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
