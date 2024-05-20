"use client";

import { brasilStates } from "@/utils/states-uf";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CovidTableData } from "./components/table";
import { useEffect, useState } from "react";
import { covidAPI } from "@/services/covid.api";
import {
  CountriesAPIResponse,
  CovidAPIResponse,
  CovidAPIResponseData,
} from "./@types";
import { countriesAPI } from "@/services/countries.api";
import { AxiosResponse } from "axios";
import { CreateCaseModal } from "./components/create-case-modal";

export default function Home() {
  const [searchData, setSearchData] = useState<CovidAPIResponseData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [searchType, setSearchType] = useState<string>("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSeletedCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    covidAPI
      .get("")
      .then((res: AxiosResponse<CovidAPIResponse>) => {
        setSearchData(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchType === "country" && countries.length === 0) {
      countriesAPI
        .get("")
        .then((res: AxiosResponse<CountriesAPIResponse[]>) => {
          const names = res.data.map((country) => {
            return country.nome;
          });
          setCountries(names as []);
        });
    }
  }, [searchType]);

  const submit = () => {
    if (searchType === "state") {
      setLoading(true);
      covidAPI
        .get(selectedState === "all" ? "" : `brazil/uf/${selectedState}`)
        .then((res) => {
          setSearchData(selectedState === "all" ? res.data.data : [res.data]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (searchType === "country") {
      setLoading(true);
      covidAPI
        .get(`${selectedCountry === "all" ? "countries" : selectedCountry}`)
        .then((res) => {
          setSearchData(
            selectedCountry === "all" ? res.data.data : [res.data.data]
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (searchType === "date") {
      const formatedDate = selectedDate.replace(/-/g, "");
      setLoading(true);
      covidAPI
        .get(`brazil/${formatedDate}`)
        .then((res) => {
          setSearchData(res.data.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box className="h-full w-full p-5">
      <Box className="flex items-center w-full justify-between">
        <div></div>
        <Heading size="lg">Dados COVID19</Heading>
        <Button onClick={onOpen} colorScheme="green">
          Adicionar caso
        </Button>
      </Box>
      <Box>
        <Text className="mb-5">Faça uma busca:</Text>
        <Grid templateColumns="repeat(4, 3fr)" gap={2}>
          <GridItem w="100%">
            <Select
              className="w-full"
              onChange={(ev) => setSearchType(ev.target.value)}
              placeholder="Tipo de busca"
            >
              <option value={"state"}>Estado</option>
              <option value={"date"}>Data específica</option>
              <option value={"country"}>País</option>
            </Select>
          </GridItem>
          {searchType === "state" && (
            <GridItem w="100%">
              <Select
                className="w-full"
                onChange={(ev) => setSelectedState(ev.target.value)}
                placeholder="Escolha um estado"
              >
                <option value={"all"}>Todos</option>
                {brasilStates.map((state) => (
                  <option value={state.uf}>{state.name}</option>
                ))}
              </Select>
            </GridItem>
          )}
          {searchType === "date" && (
            <GridItem w="100%">
              <Input
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(ev) => setSelectedDate(ev.target.value)}
                placeholder="Selecione uma data"
                size="md"
                type="text"
              />
            </GridItem>
          )}
          {searchType === "country" && (
            <GridItem w="100%">
              <Select
                className="w-full"
                onChange={(ev) => setSeletedCountry(ev.target.value)}
                placeholder="Escolha um país"
              >
                <option value={"all"}>Todos</option>
                {countries.map((country: any) => (
                  <option value={country.abreviado}>{country.abreviado}</option>
                ))}
              </Select>
            </GridItem>
          )}

          <GridItem w="100%">
            <Button onClick={submit}> Buscar</Button>
          </GridItem>
        </Grid>
      </Box>
      {loading === true ? (
        <Box className="flex justify-center mt-20">
          <CircularProgress isIndeterminate color="green.300" size={20} />
        </Box>
      ) : (
        <CovidTableData data={searchData} />
      )}
      <CreateCaseModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
