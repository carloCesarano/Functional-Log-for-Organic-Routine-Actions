// COMPONENTI NATIVI
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
// COMPONENTI CUSTOM
import { PiantaPosseduta } from "../../../Model/PiantaPosseduta";
import CardPianta from "./CardPianta";
// FOGLI DI STILE
import { listaPianteStyles as styles } from "../../../Styles/ListaPiante";
// UTILITY
import { getAll } from "../../../Database/PiantePosseduteDAO";

interface Props {
    cercato: string;
    filtri: { stati: string[]; categorie: string[] };
}

export default function VistaPiante({ cercato, filtri }: Props) {
    // HOOKS
    const [piante, setPiante] = useState<PiantaPosseduta[]>([]);

    // EFFETTUA IL FETCH DELLE PIANTE
    useEffect(() => {
        async function caricaPiante() {
            const tutte = await getAll();
            setPiante(tutte);
        }
        caricaPiante();
    }, []);

    // FILTRA LE PIANTE IN BASE AI FILTRI SELEZIONATI
    const pianteFiltrate = piante.filter((pianta) => {
        // Filtro per testo cercato
        if (
            cercato &&
            !pianta.getNome().toLowerCase().includes(cercato.toLowerCase()) &&
            !pianta.getSpecie().getSpecie().toLowerCase().includes(cercato.toLowerCase())
        ) {
            return false;
        }
        // Filtro per categorie
        if (filtri.categorie.length > 0) {
            const categoriePianta = pianta.getCategorie();
            if (!categoriePianta.some(cat => filtri.categorie.includes(cat))) {
                return false;
            }
        }
        // Filtro per stati
        if (filtri.stati.length > 0) {
            const statoMatch = filtri.stati.some(stato => {
                if (stato === "In salute") return pianta.inSalute();
                if (stato === "Da innaffiare") return pianta.daInnaffiare();
                if (stato === "Da potare") return pianta.daPotare();
                if (stato === "Da rinvasare") return pianta.daRinvasare();
                return false;
            });
            if (!statoMatch) return false;
        }
        return true;
    });

    // RENDER DELLA LISTA DELLE PIANTE FILTRATE
    return (
        <FlatList
            style={styles.flatList}
            data={pianteFiltrate}
            keyExtractor={(item) => item.getId().toString()}
            renderItem={({ item }) => (
                <CardPianta pianta={item} />
            )}
        />
    );
}