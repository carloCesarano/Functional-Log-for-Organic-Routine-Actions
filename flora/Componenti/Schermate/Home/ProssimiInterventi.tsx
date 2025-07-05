import React, { useEffect, useState } from "react";
import { View, Text,Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Riga,getAll as getAllPiante } from '../../../Database/PiantePosseduteDAO';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import { RootStackParamList } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import {useNavigation} from '@react-navigation/native'
import { prossimiInterventiStyles as styles } from "../../../Styles/ProssimiInterventi";

//INTERFACCIA CHE PERMETTE DI IMPLEMENTARE LA LOGICA DI USO DEL SINGOLO INTERVENTO
interface Intervento {
    id: number,
    pianta: PiantaPosseduta,
    tipo: "INN" | "POT" | "RINV",
    dataAcquisizione: Date,
    giorniRimanenti: number,
}

//QUANDO VIENE CHIAMATA:
//QUANDO L'UTENTE EFFETTUA L'ACCESSO ALLA SCHERMATA HOME
//LA FUNZIONE PRINCIPALE ProssimiInterventi CHIAMERA' QUESTO METODO
//
//COSA FA:
// ASSOCIA AD OGNI PIANTA POSSEDUTA DALL'UTENTE
// UNA DATA DI PARTENZA PER I TRE INTERVENTI
// E IL NUMERO DI GIORNI CHE MANCANO AL PROSSIMO INTERVENTO
async function caricaInterventi(): Promise<Intervento[]> {
    const righe = await getAllPiante(); // Recupera tutte le righe dal DB
    const interventi: Intervento[] = [];

    for (const riga of righe) {

        if (riga.id === undefined) continue;
            const pianta = await PiantaPosseduta.daRiga(riga as unknown as Riga);

        interventi.push({
            id: pianta.getId(),
            pianta: pianta,
            tipo: "INN",
            dataAcquisizione: pianta.getInnaff()[pianta.getInnaff().length - 1],
            giorniRimanenti: pianta.giorniProxInnaff(),
        });

        interventi.push({
            id: pianta.getId(),
            pianta: pianta,
            tipo: "POT",
            dataAcquisizione: pianta.getPotat()[pianta.getPotat().length - 1],
            giorniRimanenti: pianta.giorniProxPotat(),
        });

        interventi.push({
            id: pianta.getId(),
            pianta: pianta,
            tipo: "RINV",
            dataAcquisizione: pianta.getRinv()[pianta.getRinv().length - 1],
            giorniRimanenti: pianta.giorniProxRinv(),
        });
    }

    interventi.sort((a, b) => a.giorniRimanenti - b.giorniRimanenti);

    return interventi.filter(intervento => intervento.giorniRimanenti < 7);
}


//QUANDO VIENE CHIAMATA:
//QUANDO L'UTENTE SI TROVA NELLA SCHERMATA HOME
//QUESTA FUNZIONE MOSTRETA' UNA LISTA INTERAGIBILE DI TUTTI GLI INTERVENTI PIU' IMPORTANTI
//OVVERO QUELLI CON UNA SCADENZA MINORE DI DI UNA SETTIMANA E/O QUELLI SCADUTI
export default function ProssimiInterventi(){

    //HOOKS
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    //CHIAMATA ALLA FUNZIONE CaricaInterventi CHE OTTIENE TUTTI GLI INTERVENTI DAL DATABASE
    const [interventi, setInterventi] = useState<Intervento[]>([]);
    useEffect(() => {
        async function caricaDati() {
            const dati = await caricaInterventi();
            setInterventi(dati);
        }
        caricaDati();
    }, []);

    //VIENE CREATO UN TITOLO TESTUALE LEGGIBILE PER CIASCUN EVENTO
    //FORMATTATO IN BASE AI GIORNI RIMANENTI
    const setTitolo = (item: Intervento) :string => {
        const base =`${item.pianta.getId()} - ${item.tipo}`
        const giorni = item.giorniRimanenti;
        if(giorni ===0)
            return `${base} (oggi)`;
        if(giorni ===1)
            return `${base} (tra 1 giorno)`;
        if(giorni>1)
            return `${base} (tra ${giorni} giorni)`;
        if(giorni === -1)
            return `${base} (in ritardo di un 1 giorno)`;
        return `${base} (in ritardo di ${-giorni} giorno)`;
    }

    //IL TESTO VIENE MOSTRATO CON UN COLORE CHE VARIA IN BASE ALLA PROSSIMITA' TEMPORALE DELL'INTERVENTO
    const setColore = (giorni: number) => {
        if(giorni >=0)
            return "#7bc53d"
        if(giorni <= -10)
            return "#d94949"
        return "#ece179"
    }

    //LOGICA DI VISUALIZZAZIONE SU SCHERMO DEL COMPONENTE
    return(
        <View style={styles.wrapper}>
            <Text style={styles.title}>Prossimi Interventi</Text>
            <View style={styles.container}>
                {interventi.map((item) => {
                    const titolo = setTitolo(item);
                    const colore = setColore(item.giorniRimanenti);
                    return(
                        <LinearGradient
                            key={`${item.pianta.getId()}-${item.tipo}`}
                            colors={["transparent", colore]}
                            style={styles.gradient}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            >
                            <Button
                                title={titolo}
                                onPress={() => navigation.navigate("InfoPianta", {plantId: item.pianta.getId()})}>
                                buttonStyle={styles.button}
                                textStyle={styles.cardText}
                            </Button>
                        </LinearGradient>
                    )
                })}
            </View>
        </View>
    )

}
