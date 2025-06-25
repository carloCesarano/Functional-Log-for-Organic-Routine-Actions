import React, { useEffect, useState } from "react";
import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar"
import Button from "../components/Button";
import { select } from "../database/Database";
import { globalStyles } from "../styles/global";
import AggiungiPiantaButton from "../components/AggiungiPiantaButton";
import { listaPianteStyles as styles } from "../styles/listaPiante";

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;

interface PiantaPosseduta {
    id: number;
    nome: string;
    specie: string;
    acquisizione: string;
    ultimaInnaff: string;
    ultimaPotat: string;
    ultimoRinv: string;
    note: string;
    foto: string | null;
    [key: string]: string | number | null;
}

export default function ListaPiante({ navigation, route }: Props) {
    const { searched } = route.params;
    const [piantePossedute, setPiantePossedute] = useState<PiantaPosseduta[]>([]);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filterType, setFilterType] = useState<'stato' | 'categoria' | null>(null);

    useEffect(() => {
        const caricaPiantePossedute = async () => {
            const risultato = await select<PiantaPosseduta>('PiantePossedute');
            setPiantePossedute(risultato);
        };
        caricaPiantePossedute();
    }, []);

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    const handleFilterSelect = (type: 'stato' | 'categoria') => {
        setFilterType(type);
        setShowFilterMenu(false);
        // Qui puoi implementare la logica di filtro effettiva
        console.log(`Filtra per: ${type}`);
    };


    return (
        <Background>
            <NavBar />
            
            <Text style={globalStyles.titolo}>Le mie piante</Text>

            <FlatList
                style={styles.flatList}
                data={piantePossedute}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('InfoPianta', { plantId: item.id.toString() })}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.categoria}>{item.specie}</Text>
                            <Text style={styles.acquisizione}>
                                Acquisita: {new Date(item.acquisizione).toLocaleDateString()}
                            </Text>
                        </View>
                        <Image
                            source={item.foto ? { uri: item.foto } : require('../assets/plant.png')}
                            style={styles.cardImage}
                            defaultSource={require('../assets/plant.png')}
                        />
                    </TouchableOpacity>
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
                        title="Filtra:"
                        onPress={toggleFilterMenu}
                    />
                    {showFilterMenu && (
                        <View style={styles.filterMenu}>
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => handleFilterSelect('stato')}
                            >
                                <Text style={styles.filterOptionText}>Per stato</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => handleFilterSelect('categoria')}
                            >
                                <Text style={styles.filterOptionText}>Per categoria</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <AggiungiPiantaButton style={styles.customAddButton} />
            </View>
        </Background>
    );
}