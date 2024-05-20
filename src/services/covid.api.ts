import axios from "axios";

export const covidAPI = axios.create({
  baseURL: "https://covid19-brazil-api.now.sh/api/report/v1",
});
