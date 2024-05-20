export interface CovidAPIResponse {
  data: CovidAPIResponseData[];
}
export interface CovidAPIResponseData {
  uid: number;
  uf?: string;
  country?: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: Date;
}

export interface CountriesAPIResponse {
  id: WelcomeID;
  nome: NomeClass;
  area: Area;
  localizacao: Localizacao;
  linguas: Lingua[];
  governo: Governo;
  "unidades-monetarias": UnidadesMonetaria[];
  historico: string;
}

export interface Area {
  total: string;
  unidade: Unidade;
}

export interface Unidade {
  nome: NomeEnum;
  símbolo: Símbolo;
  multiplicador: number;
}

export enum NomeEnum {
  QuilômetrosQuadrados = "quilômetros quadrados",
}

export enum Símbolo {
  Km2 = "km2",
}

export interface Governo {
  capital: Capital;
}

export interface Capital {
  nome: string;
}

export interface WelcomeID {
  M49: number;
}
