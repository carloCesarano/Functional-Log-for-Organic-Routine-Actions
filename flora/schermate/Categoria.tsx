import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import CategorieCarosello from "../components/CategorieCarosello"; // Verifica il percorso
import { contaPerCategoria } from "../database/CategorieDAO";
import { categoriaStyles as styles } from "../styles/categoria";
import { useNavigation } from "@react-navigation/native";
import AggiungiCategoriaButton from "../components/AggiungiCategoriaButton";

interface CategoriaStat {
    categoria: string;
    conteggio: number;
}

export default function Categoria() {
    const [statsCategorie, setStatsCategorie] = useState<CategoriaStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoriaSelezionata, setCategoriaSelezionata] = useState<CategoriaStat | null>(null);
    const navigation = useNavigation();
    const [refreshKey, setRefreshKey] = useState(0);
    const ricaricaCategorie = () => {
        setRefreshKey(prev => prev + 1); // Forza il ricaricamento
    };

    useEffect(() => {
        const caricaStatistiche = async () => {
            const stats = await contaPerCategoria();
            setStatsCategorie(stats);
        };
        caricaStatistiche();
    }, [refreshKey]);

    useEffect(() => {
        const caricaStatistiche = async () => {
            try {
                const stats = await contaPerCategoria();
                setStatsCategorie(stats);
                if (stats.length > 0) {
                    setCategoriaSelezionata(stats[0]);
                }
            } catch (error) {
                console.error("Errore nel caricamento:", error);
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
                                    Hai {categoriaSelezionata.conteggio} piante nella categoria {' '}
                                    <Text style={styles.categoriaText}>
                                        {categoriaSelezionata.categoria}
                                    </Text>
                                </Text>
                            </View>
                        )}

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Modifica Categoria"
                                onPress={() => categoriaSelezionata && console.log("Modifica:", categoriaSelezionata.categoria)}
                            />
                            <AggiungiCategoriaButton

                             onAggiuntaCompletata={ricaricaCategorie}/>
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