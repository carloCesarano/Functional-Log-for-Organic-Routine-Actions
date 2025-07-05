// COMPONENTI NATIVI
import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
// UTILITY
import { CheckBox } from "react-native-elements";
// FOGLI DI STILE
import { listaPianteStyles as styles } from "../../../Styles/ListaPiante";

// Definizione delle props accettate dal componente MenuFiltri
interface Props {
    mostraMenuFiltri: boolean; // Se true, mostra il menu principale dei filtri
    mostraCategorie: boolean;  // Se true, mostra la lista delle categorie selezionabili
    mostraStati: boolean;      // Se true, mostra la lista degli stati selezionabili
    listaCategorie: string[];  // Tutte le categorie disponibili
    categorieSelezionate: string[]; // Categorie attualmente selezionate
    statiSelezionati: string[];     // Stati attualmente selezionati
    onFiltriCliccato: () => void;   // Callback per apertura/chiusura menu filtri
    onSelezionaFiltro: (filtro: 'stato' | 'categoria') => void; // Callback per selezione tipo filtro
    onStatoSelezionato: (stato: string) => void; // Callback per selezione/deselezione stato
    onCategoriaSelezionata: (categoria: string) => void; // Callback per selezione/deselezione categoria
}

// Componente principale che gestisce la UI dei filtri
export default function MenuFiltri({
                                       mostraMenuFiltri,
                                       mostraCategorie,
                                       mostraStati,
                                       listaCategorie,
                                       categorieSelezionate,
                                       statiSelezionati,
                                       onFiltriCliccato,
                                       onSelezionaFiltro,
                                       onStatoSelezionato,
                                       onCategoriaSelezionata
                                   }: Props) {



    // RENDER DEL MENU FILTRI
    // Mostra i pulsanti e i menu a seconda dello stato delle props
    return (
        <>

            {/* Menu principale: scelta tra filtro per stato o per categoria */}
            {mostraMenuFiltri && (
                <View style={styles.filterMenu}>
                    {/* Opzione filtro per stato */}
                    <TouchableOpacity
                        style={styles.filterOption}
                        onPress={() => onSelezionaFiltro('stato')}
                    >
                        <Text style={styles.filterOptionText}>Per stato</Text>
                    </TouchableOpacity>
                    {/* Opzione filtro per categoria */}
                    <TouchableOpacity
                        style={styles.filterOption}
                        onPress={() => onSelezionaFiltro('categoria')}
                    >
                        <Text style={styles.filterOptionText}>Per categoria</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Sezione per selezionare una o più categorie */}
            {mostraCategorie && (
                <ScrollView style={styles.filterMenu}>
                    {listaCategorie.map((categoria, index) => (
                        <CheckBox
                            key={index}
                            title={categoria}
                            checked={categorieSelezionate.includes(categoria)}
                            onPress={() => onCategoriaSelezionata(categoria)}
                            textStyle={styles.filterOptionText}
                        />
                    ))}
                </ScrollView>
            )}

            {/* Sezione per selezionare uno o più stati */}
            {mostraStati && (
                <View style={styles.filterMenu}>
                    {["In salute", "Da innaffiare", "Da potare", "Da rinvasare"].map((stato, index) => (
                        <CheckBox
                            key={index}
                            title={stato}
                            checked={statiSelezionati.includes(stato)}
                            onPress={() => onStatoSelezionato(stato)}
                            textStyle={styles.filterOptionText}
                        />
                    ))}
                </View>
            )}
        </>
    );
}