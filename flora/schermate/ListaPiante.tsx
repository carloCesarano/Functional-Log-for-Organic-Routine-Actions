import React, { useEffect, useState } from "react";
import { Text, FlatList, View, TouchableOpacity, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { PiantaPosseduta } from "../model/PiantaPosseduta";
import * as PiantePosseduteDAO from "../database/PiantePosseduteDAO";
import * as CategorieDAO from "../database/CategorieDAO";
import Background from "../components/commons/Background";
import NavBar from "../components/navbar/NavBar";
import Button from "../components/inputs/Button";
import CardPianta from "../components/listaPiante/CardPianta";
import AggiungiPiantaButton from "../components/commons/AggiungiPiantaButton";
import { globalStyles } from "../styles/global";
import { listaPianteStyles as styles } from "../styles/listaPiante";

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;

export default function ListaPiante({ navigation, route }: Props) {
    const { searched } = route.params;

    const [allPiante, setAllPiante] = useState<PiantaPosseduta[]>([]);
    const [pianteMostrate, setPianteMostrate] = useState<PiantaPosseduta[]>([]);
    const [mostraMenuFiltri, setMostraMenuFiltri] = useState(false);
    const [listaCategorie, setListaCategorie] = useState<string[]>([]);
    const [categorieSelezionate, setCategorieSelezionate] = useState<string[]>([]);
    const [statiSelezionati, setStatiSelezionati] = useState<string[]>([])
    const [mostraCategorie, setMostraCategorie] = useState(false);
    const [mostraStati, setMostraStati] = useState(false);


    useEffect(() => {
        const caricaPiantePossedute = async () => {
            setAllPiante(await PiantePosseduteDAO.getAll());
        };
        caricaPiantePossedute();
    }, []);

    useEffect(() => {
        const filtraPiante = () => {
            let filtrate = allPiante.filter(pianta =>
                pianta.getNome().toLowerCase().includes(searched.toLowerCase())
                || pianta.getSpecie().toLowerCase().includes(searched.toLowerCase())
            );

            if (categorieSelezionate.length > 0) {
                filtrate = filtrate.filter(pianta =>
                    categorieSelezionate.every(cat => pianta.getCategorie().includes(cat))
                );
            }

            if (statiSelezionati.includes("In salute"))
                filtrate = filtrate.filter(pianta => pianta.inSalute());
            if (statiSelezionati.includes("Da innaffiare"))
                filtrate = filtrate.filter(pianta => pianta.daInnaffiare());
            if (statiSelezionati.includes("Da potare"))
                filtrate = filtrate.filter(pianta => pianta.daPotare());
            if (statiSelezionati.includes("Da rinvasare"))
                filtrate = filtrate.filter(pianta => pianta.daRinvasare());

            setPianteMostrate(filtrate.sort((a,b) => b.getId() - a.getId()));
        };

        filtraPiante();
    }, [categorieSelezionate, statiSelezionati, allPiante, searched]);

    useEffect(() => {
        const caricaCategorie = async () => {
            setListaCategorie(await CategorieDAO.getAllCategorie())
        };
        caricaCategorie()
    }, []);

    const handleFiltriCliccato = () => {
        setMostraMenuFiltri(!mostraMenuFiltri);
        setMostraCategorie(false);
        setMostraStati(false);
    };

    const handleSelezionaFiltro = async (filtro: 'stato' | 'categoria') => {
        setMostraMenuFiltri(false);
        switch (filtro) {
            case "categoria":
                setMostraCategorie(true);
                break;
            case "stato":
                setMostraStati(true);
                break;
        }
    };

    const handleStatoSelezionato = (stato: string) => {
        setStatiSelezionati(prev => {
            // Se era già selezionato, deseleziona
            if (prev.includes(stato))
                return prev.filter(s => s !== stato)

            // Se si seleziona "In salute", deseleziona
            // gli altri stati
            if (stato === "In salute")
                return [stato];

            // Se si seleziona uno stato diverso da "In salute",
            // rimuovi "In salute"
            return [...prev.filter(s => s !== "In salute"), stato];
        });
    }

    return (
        <Background>
            <NavBar />
            <Text style={globalStyles.titolo}>Le mie piante</Text>

            <FlatList
                style={styles.flatList}
                data={pianteMostrate}
                keyExtractor={(item) => item.getId().toString()}
                renderItem={({ item }) => (
                    <CardPianta pianta={item} />
                )}
            />

            <View style={styles.buttonContainer}>
                <Button
                    title="Indietro"
                    onPress={() => navigation.navigate('Home')}
                    buttonStyle={styles.backButton}
                />

                <View style={styles.filterButtonContainer}>
                    <Button
                        title="Filtra"
                        onPress={handleFiltriCliccato}
                    />

                    {mostraMenuFiltri && (
                        <View style={styles.filterMenu}>
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => handleSelezionaFiltro('stato')}
                            >
                                <Text style={styles.filterOptionText}>Per stato</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => handleSelezionaFiltro('categoria')}
                            >
                                <Text style={styles.filterOptionText}>Per categoria</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {mostraCategorie && (
                        <ScrollView style={styles.filterMenu}>
                            {listaCategorie.map((categoria, index) => (
                                <CheckBox
                                    key={index}
                                    title={categoria}
                                    checked={categorieSelezionate.includes(categoria)}
                                    onPress={() => {
                                        setCategorieSelezionate(prev => {
                                            if (prev.includes(categoria)) {
                                                return prev.filter(c => c !== categoria); // Deseleziona
                                            } else {
                                                return [...prev, categoria]; // Seleziona
                                            }
                                        });
                                    }}
                                    textStyle={styles.filterOptionText}
                                />
                            ))}
                        </ScrollView>
                    )}

                    {mostraStati && (
                        <View style={styles.filterMenu}>
                            {["In salute", "Da innaffiare", "Da potare", "Da rinvasare"].map((stato, index) => (
                                <CheckBox
                                    key={index}
                                    title={stato}
                                    checked={statiSelezionati.includes(stato)}
                                    onPress={() => handleStatoSelezionato(stato)}
                                    textStyle={styles.filterOptionText}
                                />
                            ))}
                        </View>
                    )}

                </View>

                <AggiungiPiantaButton/>
            </View>
        </Background>
    );
}