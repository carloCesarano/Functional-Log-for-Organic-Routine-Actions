import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Modal} from "react-native";
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
import { styles } from "../styles/home";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    const [ultimePiante, setUltimePiante] = useState<number[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const caricaUltimePiante = async () => {
            const piantePossedute: PiantaPosseduta[] = await getAll();
            piantePossedute.sort((a,b) => b.getId() - a.getId());
            const ultimeQuattro = piantePossedute.slice(0, 4);
            setUltimePiante(ultimeQuattro.map(pianta => pianta.getId()));
        };
        caricaUltimePiante();
    }, []);


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
                <ProssimiInterventi navigation={navigation} />
            </ScrollView>
            <AggiungiPiantaButton onPress={() => setModalVisible(true)} />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.buttonModal}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('AggiungiPianta');
                            }}
                        >
                            <Text style={styles.buttonText}>Nuova pianta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonModal}
                            onPress={() => {
                                setModalVisible(false);
                               // navigation.navigate('Intervento'); // Schermata da creare
                            }}
                        >
                            <Text style={styles.buttonText}>Nuovo intervento</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonModal}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Indietro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Background>
    );
}