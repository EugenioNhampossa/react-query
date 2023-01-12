import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchColors = () => {
  return axios.get(`http://localhost:4000/colors`);
};

export const InfiniteQueriesPage = () => {
  const { data, isError, error, isLoading } = useQuery("colors", fetchColors);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h1>colors</h1>
      {data.data.map((color) => {
        return (
          <div key={color.id}>
            <h3>
              {color.id}. {color.label}
            </h3>
          </div>
        );
      })}
    </>
  );
};
