// Definisce il tipo delle schermate
// e i tipi dei parametri che vengono
// passati
export type RootStackParamList = {
    Home: undefined;
    AggiungiPianta: undefined;
    InfoPianta: {plantId: number};
    ListaPiante: {searched: string};
    Analisi: undefined,
    Categoria: undefined,

    DBTest: undefined,
};