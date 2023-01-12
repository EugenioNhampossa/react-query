import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // refetchInterval:<miliseconds> Actualização periódica dos dados. Está desactivado por defeito. //POOLING
    // refetchIntervalInBackground:<boolean>
    // enabled: false, // Desabilita a busca automática de dados
    onSuccess,
    onError,
    //O select permite seleccionar dados específicos ou transformalos antes que sejam exibidos.
    // select: (data) => {
    //   const superheroNames = data.data.map((hero) => hero.name);
    //   return superheroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      //queryClient.invalidateQueries("super-heroes"); //Refetch the data
      //Add returned data to the existing Array
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
