import React, { useEffect, useState } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar"
import Button from "../components/Button";
import { select } from "../database/Database";
import { globalStyles } from "../styles/global";

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

    useEffect(() => {
        const caricaPiantePossedute = async () => {
            const risultato = await select<PiantaPosseduta>('PiantePossedute');
            setPiantePossedute(risultato);
        };
        caricaPiantePossedute();
    }, []);

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
        }
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

            <Button title="Indietro" onPress={() => navigation.navigate('Home')} />
        </Background>
    );
}