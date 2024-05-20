import axios from "axios";

export const countriesAPI = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/paises/{paises}",
});
