import { useEffect, useState } from 'react';
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

export default function CardPianta({ pianta }: { pianta: PiantaPosseduta }) {
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [foto, setFoto] = useState<any>(null);

    // EFFETTUA IL FETCH DELLA FOTO DELLA PIANTA QUANDO CAMBIA LA PROP
    useEffect(() => {
        let attivo = true;
        const caricaFoto = async () => {
            if (attivo)
                setFoto(await pianta.getFoto());
        };
        caricaFoto();
        return () => { attivo = false };
    }, [pianta]);

    // RENDER DELLA CARD DELLA PIANTA
    return (
        <TouchableOpacity
            style={[styles.card, {borderStyle: 'solid', borderWidth: 2, overflow: 'hidden'}]}
            onPress={() => navigation.navigate('InfoPianta', {ID: pianta.getId()})}
        >
            <LinearGradient
                colors={["white", pianta.coloreStato()]}
                start={{x: .25, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradient}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.nome}>{pianta.getNome()}</Text>
                    <Text style={styles.categoria}>{pianta.getSpecie().getSpecie()}</Text>
                    <Text style={styles.acquisizione}>Acquisita: {pianta.getAcq().toLocaleDateString()}</Text>
                </View>

                {foto ? (
                    <Image source={foto} style={styles.cardImage}/>
                ) : (
                    <View style={styles.cardImage}/>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
}