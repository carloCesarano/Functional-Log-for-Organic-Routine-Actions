import React, {useCallback, useState} from 'react';
import {View, Text, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
import stili from '../../../Styles/Analisi';
import {colora} from "../../../Model/Coloratore";

const styles = stili.PORTRAIT;

function commentoStato(stato: number): string {
    if (stato === 1) return 'Pollice verde!';
    if (stato < 0.3) return 'Killer di piante!';
    if (stato < 0.6) return 'Un po\' più di impegno, dai!';
    if (stato < 0.75) return 'Stai andando abbastanza bene';
    if (stato < 0.85) return 'Stai andando molto bene';
    else return 'Quasi perfetto!'
}

export default function StatoGeneraleCollezione() {
    const [loading, setLoading] = useState(true);
    const [statoCollezione, setStatoCollezione] = useState<number>(0);
    const [piantaPiuSalute, setPiantaPiuSalute] = useState<PiantaPosseduta | null>(null);
    const [piantaMenoSalute, setPiantaMenoSalute] = useState<PiantaPosseduta | null>(null);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const goToInfoPianta = (id: number) => {
        navigation.navigate('InfoPianta', {ID: id});
    };

    useFocusEffect(useCallback(() => {
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
    }, []));

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
                    <Text style={{textAlign: 'center', fontSize: 18, fontStyle: 'italic', marginBottom: 18}}>
                        {commentoStato(statoCollezione)}</Text>

                    <View style={styles.containerPiante}>
                        {/* Pianta più in salute - Button */}
                        {piantaPiuSalute && (
                            <View style={{flexDirection: 'column', justifyContent: 'center', width: '50%'}}>
                                <Text style={styles.cardLabel}>Più in salute</Text>
                                <TouchableOpacity
                                    style={[styles.cardPianta, {backgroundColor: piantaPiuSalute.coloreStato()}]}
                                    onPress={() => goToInfoPianta(piantaPiuSalute.getId())}
                                >
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
                            </View>
                        )}

                        {/* Pianta più malata - Button */}
                        {piantaMenoSalute && (
                            <View style={{flexDirection: 'column', justifyContent: 'center', width: '50%'}}>
                                <Text style={styles.cardLabel}>Meno in salute</Text>
                                <TouchableOpacity
                                    style={[styles.cardPianta, {backgroundColor: piantaMenoSalute.coloreStato()}]}
                                    onPress={() => goToInfoPianta(piantaMenoSalute.getId())}
                                >
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
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.nomePianta}>{piantaMenoSalute.getNome()}</Text>
                                    <Text style={styles.statoPianta}>
                                        {Math.round(piantaMenoSalute.stato() * 100)}%
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}