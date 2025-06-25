import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import AggiungiPiantaButton from "../components/AggiungiPiantaButton";
import HomeButton from "../components/HomeButton";
import ProssimiInterventi from "../components/ProssimiInterventi";
import { globalStyles } from "../styles/global";
import PiantaButton from "../components/PiantaButton";
import { selectUltimeQuattro } from "../database/Database";
import { DBRow } from "../database/Database";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface UltimePiante extends DBRow {
    id: number;
}

export default function Home({ navigation }: Props) {
    const [ultimePiante, setUltimePiante] = useState<number[]>([]);

    useEffect(() => {
        const caricaUltimePiante = async () => {
            const risultato = await selectUltimeQuattro<UltimePiante>();
            setUltimePiante(risultato.map(pianta => pianta.id));
        };
        caricaUltimePiante();
    }, []);

    const styles = StyleSheet.create({
        piantaContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            padding: 10
        }
    });

    return (
        <Background>
            <NavBar />

            <Text style={globalStyles.titolo}>Ultime piante aggiunte</Text>
            <View style={styles.piantaContainer}>
                {ultimePiante.map(id => (
                    <PiantaButton key={id} piantaId={id} />
                ))}
            </View>
            <HomeButton title="Vedi tutte le piante" onPress={() => navigation.navigate('ListaPiante', { searched: '' })} />

            <ProssimiInterventi navigation={navigation}/>

            <AggiungiPiantaButton />
        </Background>
    );
}