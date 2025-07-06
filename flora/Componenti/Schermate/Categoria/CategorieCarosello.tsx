// Componenti/Schermate/Categoria/CategorieCarosello.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import { PORTRAIT, LANDSCAPE } from '../../../Styles/CategorieCaroselloStyles';

interface IPianteCategoria {
    id: number;
    nome: string;
}

interface Props {
    onCategoriaSelezionata: (nome: string) => void;
}

export default function CategorieCarosello({ onCategoriaSelezionata }: Props) {
    const [categorie, setCategorie] = useState<IPianteCategoria[]>([]);
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    useEffect(() => {
        const caricaCategorie = async () => {
            const tutteCategorie = await CategorieDAO.getAll();
            setCategorie(tutteCategorie);
        };
        caricaCategorie();
    }, []);

    const renderCategoria = ({ item }: { item: IPianteCategoria }) => (
        <TouchableOpacity
            onPress={() => onCategoriaSelezionata(item.nome)}
            style={stile.cardCategoria}
        >
            <Text style={stile.nomeCategoria}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={stile.containerCarosello}>
            <FlatList
                horizontal
                keyExtractor={(item) => `${item.id}`}
                data={categorie}
                renderItem={renderCategoria}
                contentContainerStyle={stile.containerCategorie}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}
