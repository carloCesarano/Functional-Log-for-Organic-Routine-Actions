import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import {getAll} from "../database/PiantePosseduteDAO";
import Background from "../components/commons/Background";
import NavBar from "../components/navbar/NavBar";
import AggiungiPiantaButton from "../components/commons/AggiungiPiantaButton";
import HomeButton from "../components/home/HomeButton";
import ProssimiInterventi from "../components/home/ProssimiInterventi";
import PiantaButton from "../components/home/PiantaButton";
import { globalStyles } from "../styles/global";
import {PiantaPosseduta} from "../model/PiantaPosseduta";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    const [ultimePiante, setUltimePiante] = useState<number[]>([]);

    useEffect(() => {
        const caricaUltimePiante = async () => {
            const piantePossedute: PiantaPosseduta[] = await getAll();
            piantePossedute.sort((a,b) => b.getId() - a.getId());
            const ultimeQuattro = piantePossedute.slice(0, 4);
            setUltimePiante(ultimeQuattro.map(pianta => pianta.getId()));
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
            <ScrollView>
                <Text style={globalStyles.titolo}>Ultime piante aggiunte</Text>
                <View style={styles.piantaContainer}>
                    {ultimePiante.map(id => (
                        <PiantaButton key={id} piantaId={id} />
                    ))}
                </View>
                <HomeButton title="Vedi tutte le piante" onPress={() => navigation.navigate('ListaPiante', { searched: '' })} />
                <ProssimiInterventi navigation={navigation}/>
            </ScrollView>
            <AggiungiPiantaButton />
        </Background>
    );
}