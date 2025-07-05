import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
// COMPONENTI NATIVI
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
// UTILITY
import { isPortrait } from '../../Comuni/OrientazioneChecker';
// FOGLI DI STILE
import { styles } from '../../../Styles/UltimePianteAggiunte';
// DATABASE
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';

/**
 * COMPONENTE UltimePianteAggiunte
 * 
 * QUANDO VIENE CHIAMATO:
 * - Nella schermata Home, come prima sezione prima del pulsante "Vedi tutte le piante"
 * 
 * COSA FA:
 * - Mostra le ultime 4 piante aggiunte al database
 * - Permette la navigazione alla schermata InfoPianta al tap su una pianta
 * - Gestisce gli stati di caricamento, errore e lista vuota
 */
export default function UltimePianteAggiunte() {
    // HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const portraitMode = isPortrait();

    // STATI
    const [ultimePiante, setUltimePiante] = useState<PiantaPosseduta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // EFFETTI
    useEffect(() => {
        /**
         * Funzione per caricare le ultime piante aggiunte dal database
         */
        const caricaPiante = async () => {
            try {
                // 1. Recupera tutte le piante dal database
                const piante = await PiantePosseduteDAO.getAll();
                
                // 2. Ordina per data di acquisizione (dalla più recente)
                const pianteOrdinate = piante.sort((a, b) => 
                    new Date(b.getAcq()).getTime() - new Date(a.getAcq()).getTime()
                );
                
                // 3. Prendi solo le ultime 4
                setUltimePiante(pianteOrdinate.slice(0, 4));
                setLoading(false);
            } catch (err) {
                // Gestione errori
                setError('Errore nel caricamento delle piante');
                setLoading(false);
                console.error("Errore UltimePianteAggiunte:", err);
            }
        };

        caricaPiante();

        // Ricarica i dati quando lo schermo riceve il focus
        const unsubscribe = navigation.addListener('focus', caricaPiante);
        return unsubscribe;
    }, [navigation]);

    /**
     * FUNZIONE: vaiAInfoPianta
     * 
     * QUANDO VIENE CHIAMATA:
     * - Quando l'utente preme su una pianta nella lista
     * 
     * COSA FA:
     * - Naviga alla schermata InfoPianta passando l'ID della pianta selezionata
     */
    const vaiAInfoPianta = (piantaId: number) => {
        navigation.navigate('InfoPianta', { ID: piantaId });
    };

    // STILI CONDIZIONALI
    const stileContenitore = portraitMode ? styles.containerP : styles.containerL;

    // RENDER CASI SPECIALI
    if (loading) {
        return (
            <View style={[stileContenitore, styles.caricamento]}>
                <ActivityIndicator size="large" color="#52B04E" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={stileContenitore}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (ultimePiante.length === 0) {
        return (
            <View style={stileContenitore}>
                <Text style={styles.testoVuoto}>Nessuna pianta aggiunta</Text>
            </View>
        );
    }

    // RENDER PRINCIPALE
    return (
        <View style={stileContenitore}>
            <Text style={styles.titolo}>Ultime piante aggiunte</Text>
            
            <View style={styles.listaPiante}>
                {ultimePiante.map((pianta) => (
                    <TouchableOpacity
                        key={pianta.getId()}
                        style={styles.card}
                        onPress={() => vaiAInfoPianta(pianta.getId())}>
                        
                        <Image
                            source={pianta.getFoto()}
                            style={styles.immagine}
                            resizeMode="cover"
                            onError={(e) => console.log("Errore caricamento immagine:", e.nativeEvent.error)}
                        />
                        <Text style={styles.nomePianta}>{pianta.getNome()}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}