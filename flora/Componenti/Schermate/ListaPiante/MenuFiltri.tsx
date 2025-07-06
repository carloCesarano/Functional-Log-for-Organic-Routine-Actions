import React, { useState, useEffect } from "react";
import * as CategorieDAO from "../../../Database/CategorieDAO";
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import MenuSelezioneMultipla from '../../Comuni/Input/MenuSelezioneMultipla';
import { msmListaPianteStylesPortrait, msmListaPianteStylesLandscape } from '../../../Styles/MSMListaPiante';

interface Props {
    onFiltriCambiati: (filtri: { stati: string[]; categorie: string[] }) => void;
}

// COMPONENTE DEL MENU FILTRI PER LA LISTA PIANTE
export default function MenuFiltri({ onFiltriCambiati }: Props) {
    // Stato delle categorie selezionate
    const [categorieSelezionate, setCategorieSelezionate] = useState<string[]>([]);
    // Stato degli stati selezionati (es: "In salute", "Da innaffiare", ecc.)
    const [statiSelezionati, setStatiSelezionati] = useState<string[]>([]);
    // Lista delle categorie disponibili (caricate dal DB)
    const [listaCategorie, setListaCategorie] = useState<string[]>([]);
    // Determina l'orientamento dello schermo
    const portrait = isPortrait();
    // Sceglie lo stile in base all'orientamento
    const msmListaPianteStyles = portrait ? msmListaPianteStylesPortrait : msmListaPianteStylesLandscape;

    // Carica le categorie dal database all'avvio del componente
    useEffect(() => {
        async function caricaCategorie() {
            const tutte = await CategorieDAO.getAll();
            const nomiOrdinati = tutte.map((c: any) => c.nome).sort((a: string, b: string) => a.localeCompare(b));
            setListaCategorie(nomiOrdinati);
        }
        caricaCategorie();
    }, []);

    // Ogni volta che cambiano i filtri, li comunica al componente genitore
    useEffect(() => {
        onFiltriCambiati({
            stati: statiSelezionati,
            categorie: categorieSelezionate,
        });
    }, [statiSelezionati, categorieSelezionate]);

    // Gestisce la selezione degli stati e delle categorie
    const onCambia = (selezionati: Record<string, string[]>) => {
        let stati = selezionati["Per stato"] || [];
        if (stati.includes("In salute")) {
            stati = ["In salute"];
        }
        setStatiSelezionati(stati);
        setCategorieSelezionate(selezionati["Per categoria"] || []);
    };

    // RENDER DEL MENU DI SELEZIONE MULTIPLA
    return (
        <MenuSelezioneMultipla
            titolo="Filtra"
            opzioniMenu={[
                { label: "Per stato", opzioni: [
                        { label: "In salute", value: "In salute" },
                        { label: "Da innaffiare", value: "Da innaffiare" },
                        { label: "Da potare", value: "Da potare" },
                        { label: "Da rinvasare", value: "Da rinvasare" },
                    ]},
                { label: "Per categoria", opzioni: listaCategorie.map(c => ({ label: c, value: c })) }
            ]}
            // Questa proprietà serve a passare al componente MenuSelezioneMultipla lo stato attuale delle selezioni per ciascun menu
            selezionati={{
                "Per stato": statiSelezionati,
                "Per categoria": categorieSelezionate
            }}
            // Azione eseguita ogni volta che viene spuntata una checkbox
            onCambia={onCambia}
            stileMenu={msmListaPianteStyles}
        />
    );
}