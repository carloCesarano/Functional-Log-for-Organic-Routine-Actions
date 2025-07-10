import {JSX, useCallback, useState} from 'react';
// COMPONENTI NATIVI
import {FlatList} from "react-native";
// COMPONENTI CUSTOM
import CardPianta from './CardPianta';
import CardPiantaLandscape from './CardPiantaLandscape';
// UTILITY
import {PiantaPosseduta} from "../../../Model/PiantaPosseduta";
import {getAll} from "../../../Database/PiantePosseduteDAO";
import {isPortrait} from '../../Comuni/OrientazioneChecker';
// FOGLI DI STILE
import {listaPianteStyles as styles} from "../../../Styles/ListaPiante";
import {useFocusEffect} from "@react-navigation/native";

interface Props {
    cercato: string;
    filtri: { stati: string[]; categorie: string[] };
}

export default function ({cercato, filtri}: Props): JSX.Element {
    // HOOKS
    const [piante, setPiante] = useState<PiantaPosseduta[]>([]);
    const portraitMode: boolean = isPortrait();

    // EFFETTUA IL FETCH DELLE PIANTE
    useFocusEffect(useCallback(() => {
        async function caricaPiante() {
            const tutte = await getAll();
            setPiante(tutte);
        }

        caricaPiante();
    }, []));

    // FILTRA LE PIANTE IN BASE AI FILTRI SELEZIONATI
    const pianteFiltrate: PiantaPosseduta[] = piante.filter((pianta) => {
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
            // Deve contenere tutte le categorie selezionate
            if (!filtri.categorie.every(cat => categoriePianta.includes(cat))) {
                return false;
            }
        }
        // Filtro per stati
        if (filtri.stati.length > 0) {
            const statoMatch = filtri.stati.every(stato => {
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
    return (<>
            {portraitMode ? (
                <FlatList
                    style={styles.flatList}
                    key={'PORTRAIT'}
                    data={pianteFiltrate}
                    keyExtractor={(item) => item.getId().toString()}
                    renderItem={({item}) => (
                        <CardPianta pianta={item}/>
                    )}
                />
            ) : (
                <FlatList
                    style={styles.flatList}
                    key={'LANDSCAPE'}
                    horizontal={true}
                    data={pianteFiltrate}
                    contentContainerStyle={{gap: 18}}
                    keyExtractor={(item) => item.getId().toString()}
                    renderItem={({item}) => (
                        <CardPiantaLandscape pianta={item}/>
                    )}
                />
            )}
        </>
    );
}