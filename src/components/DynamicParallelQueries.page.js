import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
  axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelQueriesPage = ({ heroIds }) => {
  const results = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({results});
  return <div>DynamicParallelQueries</div>;
};
