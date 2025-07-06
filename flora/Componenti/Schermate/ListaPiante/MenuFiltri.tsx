// REACT
import React, { useState, useEffect } from "react";
// COMPONENTI NATIVI
import {View, Text, ScrollView, Dimensions} from "react-native";
import { CheckBox } from "react-native-elements";
// FOGLI DI STILE
import { listaPianteStyles as styles } from "../../../Styles/ListaPiante";
// UTILITY
import * as CategorieDAO from "../../../Database/CategorieDAO";
import { isPortrait } from '../../Comuni/OrientazioneChecker';
// COMPONENTI CUSTOM
import Button from '../../Comuni/Input/Button';
// FOGLI DI STILE CUSTOM
import {stylesButton} from "../../../Styles/ButtonListaPiante";


interface Props {
    onFiltriCambiati: (filtri: { stati: string[]; categorie: string[] }) => void;
}

// COMPONENTE: MenuFiltri
// COSA FA: Mostra un menu per filtrare la lista delle piante per stato o categoria.
//          Comunica i filtri selezionati al componente padre tramite la prop onFiltriCambiati.
export default function MenuFiltri({ onFiltriCambiati }: Props) {
    // VARIABILI DI STATO
    const [mostraMenuFiltri, setMostraMenuFiltri] = useState(false);
    const [mostraCategorie, setMostraCategorie] = useState(false);
    const [mostraStati, setMostraStati] = useState(false);
    const [categorieSelezionate, setCategorieSelezionate] = useState<string[]>([]);
    const [statiSelezionati, setStatiSelezionati] = useState<string[]>([]);
    const [listaCategorie, setListaCategorie] = useState<string[]>([]);
    const portrait = isPortrait();

    // CHIAMATA QUANDO: il componente viene montato.
    // COSA FA: Carica la lista delle categorie dal database.
    useEffect(() => {
        async function caricaCategorie() {
            const tutte = await CategorieDAO.getAll();
            // Ordina alfabeticamente per nome
            const nomiOrdinati = tutte.map((c: any) => c.nome).sort((a: string, b: string) => a.localeCompare(b));
            setListaCategorie(nomiOrdinati);
        }
        caricaCategorie();
    }, []);

    // CHIAMATA QUANDO: cambiano i filtri selezionati.
    // COSA FA: Comunica i filtri selezionati al componente padre.
    useEffect(() => {
        onFiltriCambiati({
            stati: statiSelezionati,
            categorie: categorieSelezionate,
        });
    }, [statiSelezionati, categorieSelezionate]);

    // CHIAMATA QUANDO: si preme il pulsante "Filtra".
    // COSA FA: Apre o chiude il menu filtri e chiude eventuali sottomenu.
    const toggleMenu = () => {
        if (mostraMenuFiltri || mostraCategorie || mostraStati) {
            setMostraMenuFiltri(false);
            setMostraCategorie(false);
            setMostraStati(false);
        } else {
            setMostraMenuFiltri(true);
            setMostraCategorie(false);
            setMostraStati(false);
        }
    };

    // CHIAMATA QUANDO: si seleziona "Per stato" o "Per categoria".
    // COSA FA: Mostra il sottomenu corrispondente.
    const onSelezionaFiltro = (tipo: "stato" | "categoria") => {
        setMostraCategorie(tipo === "categoria");
        setMostraStati(tipo === "stato");
        setMostraMenuFiltri(false);
    };

    // CHIAMATA QUANDO: si seleziona/deseleziona uno stato.
    // COSA FA: Aggiorna la lista degli stati selezionati.
    const onStatoSelezionato = (stato: string) => {
        setStatiSelezionati((prev) => {
            if (stato === "In salute") {
                // Se selezioni "In salute", deseleziona tutto il resto
                return prev.includes("In salute") ? [] : ["In salute"];
            } else {
                // Se selezioni un altro stato, deseleziona "In salute"
                const altri = prev.filter(s => s !== "In salute");
                if (altri.includes(stato)) {
                    // Deseleziona lo stato se già selezionato
                    return altri.filter(s => s !== stato);
                } else {
                    // Seleziona lo stato
                    return [...altri, stato];
                }
            }
        });
    };

    // CHIAMATA QUANDO: si seleziona/deseleziona una categoria.
    // COSA FA: Aggiorna la lista delle categorie selezionate.
    const onCategoriaSelezionata = (categoria: string) => {
        setCategorieSelezionate((prev) =>
            prev.includes(categoria)
                ? prev.filter((c) => c !== categoria)
                : [...prev, categoria]
        );
    };

    // CHIAMATA QUANDO: si preme "Indietro" in un sottomenu.
    // COSA FA: Torna al menu principale dei filtri.
    const chiudiSottoMenu = () => {
        setMostraCategorie(false);
        setMostraStati(false);
        setMostraMenuFiltri(true);
    };

    // RENDER
    return (
        <>
            {/* Pulsante per aprire/chiudere il menu filtri */}
            <Button
                testo="Filtra"
                onPress={toggleMenu}
                stileButton={[
                    stylesButton.button,
                    portrait ? {} : { marginBottom: 55 }
                ]}
                stileTesto={stylesButton.testo}
            />

            {/* Menu principale: scelta tra filtro per stato o per categoria */}
            {mostraMenuFiltri && (
                <View style={styles.filterMenu}>
                    <Button
                        testo="Per stato"
                        onPress={() => onSelezionaFiltro("stato")}
                        stileButton={{backgroundColor: "#52B04E", marginBottom: 10}}
                        stileTesto={{color: "white"}}
                    />
                    <Button
                        testo="Per categoria"
                        onPress={() => onSelezionaFiltro("categoria")}
                        stileButton={{backgroundColor: "#52B04E"}}
                        stileTesto={{color: "white"}}
                    />
                </View>
            )}

            {/* Sottomenu: selezione categorie */}
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
                    <Button
                        testo="Indietro"
                        onPress={chiudiSottoMenu}
                        stileButton={{marginTop: 10, backgroundColor: "#aaa"}}
                        stileTesto={{color: "white"}}
                    />
                </ScrollView>
            )}

            {/* Sottomenu: selezione stati */}
            {mostraStati && (
                <View style={styles.filterMenu}>
                    {["In salute", "Da innaffiare", "Da potare", "Da rinvasare"].map(
                        (stato, index) => (
                            <CheckBox
                                key={index}
                                title={stato}
                                checked={statiSelezionati.includes(stato)}
                                onPress={() => onStatoSelezionato(stato)}
                                textStyle={styles.filterOptionText}
                            />
                        )
                    )}
                    <Button
                        testo="Indietro"
                        onPress={chiudiSottoMenu}
                        stileButton={{marginTop: 10, backgroundColor: "#aaa"}}
                        stileTesto={{color: "white"}}
                    />
                </View>
            )}
        </>
    );
}