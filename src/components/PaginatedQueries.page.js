import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isError, error, isLoading, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

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
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Prev page
      </button>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === 4}
      >
        Next page
      </button>
      <div>{isFetching && "Loading..."}</div>
    </>
  );
};
