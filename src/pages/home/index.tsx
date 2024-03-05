import Header from "@/components/Header";
import Mesh from "@/components/Mesh";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col">
        <Header />
        <div className="w-full h-[auto] flex items-center justify-center flex-col">
          <Mesh />
        </div>
      </div>
    </>
  );
};

export default HomePage;
