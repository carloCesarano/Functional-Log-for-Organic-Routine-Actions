import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import * as PianteCategorieDAO from '../../../Database/PianteCategorieDAO';
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import { PORTRAIT, LANDSCAPE } from '../../../Styles/CategorieCaroselloStyles';

interface Props {
    nomeCategoria: string | null;
}

export default function NumPianteCategoria({ nomeCategoria }: Props) {
    // VARIABILI DI STATO:
    // numeroPiante: contiene il numero di piante per la categoria selezionata
    // loading: usata per mostrare un indicatore di caricamento mentre si calcola
    const [numeroPiante, setNumeroPiante] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Selezione dello stile in base all’orientamento del dispositivo
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    // CHIAMATA QUANDO:
    // Ogni volta che cambia `nomeCategoria`.
    //
    // COSA FA:
    // - Recupera l’ID della categoria a partire dal nome
    // - Filtra tutte le relazioni pianta-categoria per contare quante
    //   piante sono associate alla categoria selezionata
    useEffect(() => {
        const conta = async () => {
            if (!nomeCategoria) return; // Se nulla è selezionato, non fare nulla
            setLoading(true); // Mostra caricamento
            try {
                const idCategoria = await CategorieDAO.daNome(nomeCategoria);
                const tutte = await PianteCategorieDAO.getAll();
                const filtrate = tutte.filter(r => r.categoria === idCategoria);
                setNumeroPiante(filtrate.length);
            } catch (err) {
                console.error('Errore:', err);
                setNumeroPiante(0); // Mostra 0 in caso di errore
            } finally {
                setLoading(false);
            }
        };
        conta();
    }, [nomeCategoria]);

    // Se non è stata selezionata una categoria, non mostrare nulla
    if (!nomeCategoria) return null;

    return (
        <View style={stile.boxNumPiante}>
            {/* TITOLO */}
            <Text style={stile.titoloNumPiante}>
                Piante per la categoria "{nomeCategoria}":
            </Text>

            {/* NUMERO O INDICATORE DI CARICAMENTO */}
            {loading ? (
                <ActivityIndicator size="small" color="#333" />
            ) : (
                <Text style={stile.numeroPiante}>{numeroPiante}</Text>
            )}
        </View>
    );
}
