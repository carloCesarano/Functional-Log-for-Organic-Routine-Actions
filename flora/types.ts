// Definisce il tipo delle schermate
// e i tipi dei parametri che vengono
// passati
export type RootStackParamList = {
    Home           : undefined;
    AggiungiPianta : undefined;
    InfoPianta     : {ID: number};
    ListaPiante    : {cercato: string};
    Analisi        : undefined;
    Categorie      : undefined;
    Sviluppatore   : undefined;
    Interventi     : undefined;
    Specie         : undefined;
    AggiungiSpecie : undefined;

};