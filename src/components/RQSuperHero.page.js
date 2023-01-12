import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
  const { heroid } = useParams();
  const { data, isLoading, isError, error } = useSuperHeroData(heroid);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
    
  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};
