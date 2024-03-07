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
        className=" p-2 m-2 h-[70vh] min-[500px]:h-[50vh] md:h-[33vh] lg:h-[40vh] xl:h-[45vh] 2xl:h-[60vh] min-[1600px]:h-[50vh] min-[2000px]:h-[55vh] flex flex-col justify-between rounded-lg shadow-lg bg-gray-200 transition-transform transform hover:scale-105"
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
