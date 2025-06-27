import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import CategorieCarosello from "../components/CategorieCarosello";
import {selezionaNumeroCategorie} from "../database/MobileDatabase";
import {DBRow} from "../database/Database";
import {categoriaStyles as styles} from "../styles/categoria";

type Props = NativeStackScreenProps<RootStackParamList, 'Categoria'>;

interface CategoriaStats extends DBRow {
    categoria: string;
    count: number;
}

export default function Categoria({ navigation }: Props) {
    const [statsCategorie, setStatsCategorie] = useState<CategoriaStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoriaSelezionata, setCategoriaSelezionata] = useState<CategoriaStats | null>(null);

    useEffect(() => {
        const caricaStatistiche = async () => {
            try {
                const stats = await selezionaNumeroCategorie<CategoriaStats>();
                setStatsCategorie(stats);

                // Seleziona automaticamente la prima categoria se disponibile
                if (stats.length > 0) {
                    setCategoriaSelezionata(stats[0]);
                }
            } catch(error) {
                console.error("Errore nel caricamento delle statistiche:", error);
            } finally {
                setLoading(false);
            }
        };

        caricaStatistiche();
    }, []);

    const handleSelezioneCategoria = (categoria: string) => {
        const trovata = statsCategorie.find(c => c.categoria === categoria);
        setCategoriaSelezionata(trovata || null);
    };

    return (
        <Background>
            <NavBar />
            <View style={styles.container}>
                <Text style={styles.titolo}>Gestione Categorie</Text>

                {loading ? (
                    <Text>Caricamento in corso...</Text>
                ) : (
                    <>
                        <View style={styles.carouselContainer}>
                            <CategorieCarosello
                                categorieCount={statsCategorie}
                                onCategoriaSelezionata={handleSelezioneCategoria}
                            />
                        </View>

                        {categoriaSelezionata && (
                            <View style={styles.infoContainer}>
                                <Text style={styles.testoInfo}>
                                    Hai {categoriaSelezionata.count} piante nella categoria {' '}
                                    <Text style={styles.categoriaText}>
                                        {categoriaSelezionata.categoria}
                                    </Text>
                                </Text>
                            </View>
                        )}

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Modifica Categoria"
                                onPress={() => {
                                    if (categoriaSelezionata) {
                                        console.log("Modifica categoria:", categoriaSelezionata.categoria);
                                    }
                                }}

                            />

                            <Button
                                title="Aggiungi Nuova Categoria"
                                onPress={() => console.log("Aggiungi nuova categoria")}

                            />

                            <Button
                                title="Indietro"
                                onPress={() => navigation.navigate('Home')}

                            />
                        </View>
                    </>
                )}
            </View>
        </Background>
    );
}

