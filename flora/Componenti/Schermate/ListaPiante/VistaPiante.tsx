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

    // EFFETTUA IL FETCH DELLE PIANTE OGNI VOLTA CHE CAMBIA 'cercato' O 'filtri'
    useEffect(() => {
        async function caricaPiante() {
            let tutte = await getAll();
            if (cercato) {
                tutte = tutte.filter(p =>
                    p.getNome().toLowerCase().includes(cercato.toLowerCase())
                );
            }
            setPiante(tutte);
        }
        caricaPiante();
    }, [cercato, filtri]);

    // FILTRA LE PIANTE IN BASE AI FILTRI SELEZIONATI
    const pianteFiltrate = piante.filter((pianta) => {
        if (filtri.categorie.length > 0) {
            const categoriePianta = pianta.getCategorie();
            if (!categoriePianta.some(cat => filtri.categorie.includes(cat))) {
                return false;
            }
        }
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