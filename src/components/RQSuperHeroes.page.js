import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("Busca bem sucedida", data);
  };
  const onError = (error) => {
    console.log("Busca mal sucedida", error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const { mutate: addHero, isLoading: isAddingHero } = useAddSuperHeroData();

  const onAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          name="alterEgo"
          onChange={(event) => setAlterEgo(event.target.value)}
        />
        <input
          type="submit"
          value={isAddingHero ? "..." : "AddHero"}
          onClick={onAddHeroClick}
        />
      </div>
      <button onClick={refetch}>Fetch data</button>
      {data?.data.map((hero) => (
        <Link to={`/rq-super-heroes/${hero.id}`}>
          <div key={hero.name}>{hero.name}</div>
        </Link>
      ))}
      {/* {data.map((heroName) => {
        return (
            <div key={heroName}>{heroName}</div>
        );
      })} */}
    </>
  );
};
