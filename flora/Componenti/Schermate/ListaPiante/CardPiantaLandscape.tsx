import {JSX, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
// COMPONENTI NATIVI
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// UTILITY
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';
// FOGLI DI STILE
import { listaPianteStyles as styles } from '../../../Styles/ListaPiante';

export default function ({pianta}: {pianta: PiantaPosseduta}): JSX.Element {
    // VARIABILI DI STATO
    const [foto, setFoto] = useState<any>(null);

    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        let attivo = true;
        const caricaFoto = async () => {
            if (attivo)
                setFoto(await pianta.getFoto());
        };
        caricaFoto();
        return () => { attivo = false };
    }, [pianta]);

    return (
        <TouchableOpacity
            style={{borderRadius: 18, overflow: 'hidden', borderStyle: 'solid', borderWidth: 2}}
            onPress={() => navigation.navigate('InfoPianta', {ID: pianta.getId()})}
        >
            <LinearGradient
                colors={["white", pianta.coloreStato()]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{alignItems: 'center', justifyContent: 'center', width: 200, padding: 18, flex: 1}}
            >

                {foto ? (
                    <Image source={foto} style={[styles.cardImage, {width: 100, height: 100}]}/>
                ) : (
                    <View style={styles.cardImage}/>
                )}

                <View style={{marginTop: 8}}>
                    <Text style={styles.nome} numberOfLines={1} ellipsizeMode='tail'>{pianta.getNome()}</Text>
                    <Text style={styles.categoria} numberOfLines={1} ellipsizeMode='tail'>{pianta.getSpecie().getSpecie()}</Text>
                    <Text style={styles.acquisizione} numberOfLines={1} ellipsizeMode='tail'>Acquisita: {pianta.getAcq().toLocaleDateString()}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}