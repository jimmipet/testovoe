// AboutCard.js
import React from "react";
import { useRouter } from "next/router";
import CardChange from "@/components/CardChange";
import axios from "axios";

const AboutCard = ({ card }) => {
  const router = useRouter();

  return (
    <div className="w-full h-screen">
      <CardChange id={router.query.id} card={card} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`http://localhost:3001/cards?id=${params.id}`);
    const card = response.data[0];

    return {
      props: {
        card,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}

export default AboutCard;
