import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
import stili from '../../../Styles/Analisi';
import {colora} from "../../../Model/Coloratore";

const styles = stili.PORTRAIT;

export default function StatoGeneraleCollezione() {
    const [loading, setLoading] = useState(true);
    const [statoCollezione, setStatoCollezione] = useState<number>(0);
    const [piantaPiuSalute, setPiantaPiuSalute] = useState<PiantaPosseduta | null>(null);
    const [piantaMenoSalute, setPiantaMenoSalute] = useState<PiantaPosseduta | null>(null);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const goToInfoPianta = (id: number) => {
        navigation.navigate('InfoPianta', {ID: id});
    };

    useEffect(() => {
        const caricaDati = async () => {
            try {
                const piante = await PiantePosseduteDAO.getAll();

                if (piante.length === 0) {
                    setStatoCollezione(0);
                    return;
                }

                const mediaStato = piante.reduce((sum, pianta) => sum + pianta.stato(), 0) / piante.length;
                setStatoCollezione(mediaStato);

                const pianteOrdinate = [...piante].sort((a, b) => b.stato() - a.stato());
                setPiantaPiuSalute(pianteOrdinate[0]);
                setPiantaMenoSalute(pianteOrdinate[pianteOrdinate.length - 1]);

            } catch (err) {
                console.error('Errore nel caricamento:', err);
            } finally {
                setLoading(false);
            }
        };

        caricaDati();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titolo}>Stato generale delle tue piante</Text>

            {loading ? (
                <ActivityIndicator size="small" color="#333"/>
            ) : (
                <>
                    <Text style={[styles.percentuale, {color: colora(statoCollezione) || '#4CAF50'}]}>
                        {Math.round(statoCollezione * 100)}%
                    </Text>

                    <View style={styles.containerPiante}>
                        {/* Pianta più in salute - Button */}
                        {piantaPiuSalute && (
                            <TouchableOpacity
                                style={[styles.cardPianta, {backgroundColor: piantaPiuSalute.coloreStato()}]}
                                onPress={() => goToInfoPianta(piantaPiuSalute.getId())}
                            >
                                <Text style={styles.cardLabel}>Più in salute</Text>
                                {typeof piantaPiuSalute.getFoto() === 'number' ? (
                                    <Image
                                        source={piantaPiuSalute.getFoto() as number}
                                        style={styles.immaginePianta}
                                    />
                                ) : (
                                    <Image
                                        source={{uri: (piantaPiuSalute.getFoto() as { uri: string }).uri}}
                                        style={styles.immaginePianta}
                                    />
                                )}
                                <Text style={styles.nomePianta}>{piantaPiuSalute.getNome()}</Text>
                                <Text style={styles.statoPianta}>
                                    {Math.round(piantaPiuSalute.stato() * 100)}%
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Pianta più malata - Button */}
                        {piantaMenoSalute && (
                            <TouchableOpacity
                                style={[styles.cardPianta, {backgroundColor: piantaMenoSalute.coloreStato()}]}
                                onPress={() => goToInfoPianta(piantaMenoSalute.getId())}
                            >
                                <Text style={styles.cardLabel}>Meno in salute</Text>
                                {typeof piantaMenoSalute.getFoto() === 'number' ? (
                                    <Image
                                        source={piantaMenoSalute.getFoto() as number}
                                        style={styles.immaginePianta}
                                    />
                                ) : (
                                    <Image
                                        source={{uri: (piantaMenoSalute.getFoto() as { uri: string }).uri}}
                                        style={styles.immaginePianta}
                                    />
                                )}
                                <Text style={styles.nomePianta}>{piantaMenoSalute.getNome()}</Text>
                                <Text style={styles.statoPianta}>
                                    {Math.round(piantaMenoSalute.stato() * 100)}%
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}