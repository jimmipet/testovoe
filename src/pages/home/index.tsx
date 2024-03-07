import Header from "@/components/Header";
import Mesh from "@/components/Mesh";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [refreshMesh, setRefreshMesh] = useState(false);

  useEffect(() => {
    if (refreshMesh) {
      setRefreshMesh(false);
    }
  }, [refreshMesh]);

  const handleCardAdded = () => {
    setRefreshMesh(true);
  };

  return (
    <>
      <div className="w-full h-[100%] flex flex-col ">
        <Header onCardAdded={handleCardAdded} />
        <div className="w-full h-auto flex items-center justify-center flex-col">
          <Mesh key={refreshMesh} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
