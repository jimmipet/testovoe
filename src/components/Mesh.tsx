import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Mesh = ({ refreshKey }) => {
  const [cards, setCards] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalcount, setTotalcount] = useState(0);

  useEffect(() => {
    if (fetching ) {
      axios
        .get(`http://localhost:3001/cards?_page=${currentPage}&_per_page=8`)
        .then((response) => {
          setCards([...cards, ...response.data.data]);
          setCurrentPage(currentPage+1);
          setTotalcount(response.data.items);
        })
        .finally(() => setFetching(false));
    }
  }, [cards, currentPage, fetching]);

  useEffect(() => {
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
        cards.length < totalcount
      ) {
        setFetching(true);
      }
    };

    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [cards, totalcount, refreshKey]);

  return (
    <div className="w-[70%] min-[200px]:w-[90%] h-auto overflow-auto grid grid-cols-1 min-[500px]:grid-cols-2 min-[325px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-4 p-4 grid-auto-rows-[1fr]">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Mesh;
