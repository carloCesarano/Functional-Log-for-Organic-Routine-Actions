// Componenti/Schermate/Categoria/NumPianteCategoria.tsx
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
    const [numeroPiante, setNumeroPiante] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    useEffect(() => {
        const conta = async () => {
            if (!nomeCategoria) return;
            setLoading(true);
            try {
                const idCategoria = await CategorieDAO.daNome(nomeCategoria);
                const tutte = await PianteCategorieDAO.getAll();
                const filtrate = tutte.filter(r => r.categoria === idCategoria);
                setNumeroPiante(filtrate.length);
            } catch (err) {
                console.error('Errore:', err);
                setNumeroPiante(0);
            } finally {
                setLoading(false);
            }
        };
        conta();
    }, [nomeCategoria]);

    if (!nomeCategoria) return null;

    return (
        <View style={stile.boxNumPiante}>
            <Text style={stile.titoloNumPiante}>
                Piante per la categoria "{nomeCategoria}":
            </Text>
            {loading ? (
                <ActivityIndicator size="small" color="#333" />
            ) : (
                <Text style={stile.numeroPiante}>{numeroPiante}</Text>
            )}
        </View>
    );
}
