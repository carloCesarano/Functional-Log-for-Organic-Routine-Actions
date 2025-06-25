import React, { useEffect, useState } from "react";
import {Text, FlatList, View, StyleSheet, TouchableOpacity} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar"
import Button from "../components/Button";
import { select } from "../database/Database";
import { globalStyles } from "../styles/global";
import AggiungiPiantaButton from "../components/AggiungiPiantaButton";

type Props = NativeStackScreenProps<RootStackParamList, 'ListaPiante'>;

interface PiantaPosseduta {
    [key: string]: string | number;
    id: number;
    specie: string;
    acquisizione: string;
    ultimaInnaff: string;
    ultimaPotat: string;
    ultimoRinv: string;
    note: string;
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

    const styles = StyleSheet.create({
        card: {
            padding: 15,
            margin: 10,
            backgroundColor: '#fff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            elevation: 5,
        },
        specie: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        data: {
            fontSize: 14,
            color: '#666',
        },
        filterMenu: {
            position: 'absolute',
            bottom: 50,
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.80,
            elevation: 5,
            zIndex: 1,
            minWidth: 150,
        },
        filterOption: {
            padding: 10,
        },
        filterOptionText: {
            fontSize: 16,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 10,
        },
        backButton: {
            flex: 1,
            marginRight: 10,
        },
        filterButtonContainer: {
            flex: 1,
            position: 'relative',
            alignItems: 'center',
        },

        customAddButton: {
            flex: 1,
            alignItems: 'flex-end',
            width: 150,
            height: 50,
            borderRadius: 25,
        },
    });

    return (
        <Background>
            <NavBar />
            
            <Text style={globalStyles.titolo}>Le mie piante</Text>

            <FlatList
                data={piantePossedute}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.specie}>{item.specie}</Text>
                        <Text style={styles.data}>Acquisita: {item.acquisizione}</Text>
                    </View>
                )}
            />

            <View style={styles.buttonContainer}>
                <View style={{ position: 'relative' }}>
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
            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
                <AggiungiPiantaButton style={styles.customAddButton} />
            </View>
        </Background>
    );
}