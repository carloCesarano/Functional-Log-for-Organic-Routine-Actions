import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import { PORTRAIT, LANDSCAPE } from '../../../Styles/CategorieCaroselloStyles';
import {useFocusEffect} from "@react-navigation/native";

// INTERFACCIA PER IL TIPO DI CATEGORIA
interface IPianteCategoria {
    id: number;
    nome: string;
}

interface Props {
    onCategoriaSelezionata: (categoria: { id: number; nome: string } | null) => void;
}

export default function CategorieCarosello({ onCategoriaSelezionata }: Props) {
    // VARIABILI DI STATO:
    // contiene la lista di categorie da mostrare nel carosello
    const [categorie, setCategorie] = useState<IPianteCategoria[]>([]);
    // è la categoria attualmente selezionata
    const [selezionata, setSelezionata] = useState<IPianteCategoria | null>(null);

    // Sceglie lo stile in base all’orientamento
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;

    // CHIAMATA QUANDO:
    // Ogni volta che il componente viene mostrato.
    //
    // COSA FA:
    // Carica tutte le categorie dal database e le salva nello stato locale.
    useFocusEffect(useCallback(() => {
        const caricaCategorie = async () => {
            const tutteCategorie = await CategorieDAO.getAll();
            setCategorie(tutteCategorie.sort((a,b) => a.nome.localeCompare(b.nome, 'it', {sensitivity: 'base'})));
        };
        caricaCategorie();
    }, []));

    // CHIAMATA QUANDO:
    // Per ogni elemento nella FlatList.
    //
    // COSA FA:
    // Mostra una "card" cliccabile con il nome della categoria.
    // Se cliccata, viene invocata `onCategoriaSelezionata`.
    const renderCategoria = ({ item }: { item: IPianteCategoria }) => (
        <TouchableOpacity
            onPress={() => {
                setSelezionata(item);
                onCategoriaSelezionata(item)}}>

            <Text
                style={(selezionata === item) ? stile.cardCategoriaSelezionata : stile.cardCategoria}
            >{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={stile.containerCarosello}>
            {/* TITOLO DELLA SEZIONE */}
            <Text style={stile.titolo}>Categorie presenti</Text>

            {/* LISTA ORIZZONTALE DELLE CATEGORIE */}
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
