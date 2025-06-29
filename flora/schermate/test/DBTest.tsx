import React, {useEffect, useState} from "react";
import {ScrollView, Text} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";
import {PiantaPosseduta} from "../../model/PiantaPosseduta";
import {insert, getAll} from "../../database/PiantePosseduteDAO";

type Props = NativeStackScreenProps<RootStackParamList, 'DBTest'>;


export default function DBTest({ navigation }: Props) {
    const [testo, setTesto] = useState<string>("")

    const piantaTest = new PiantaPosseduta({
        id: 0,
        specie: "Ficus",
        nome: "Alberto",
        dataAcq: "2025-01-01",
        ultimaInnaff: "2025-01-02",
        ultimaPotat: "2025-01-03",
        ultimoRinv: "2025-01-04",
        foto: "",
        note: "NOTES"
    })

    useEffect(() => {
        const testInsert = async (pianta: PiantaPosseduta) => {
            await insert(pianta);
            const piante : PiantaPosseduta[] = await getAll();

            let tipiEValori = '';
            for (const pianta of piante) {

                for (const key in pianta) {
                    // @ts-ignore
                    const valore = pianta[key];
                    const tipo = valore === null ? 'null' : valore instanceof Date ? 'Date' : typeof valore;
                    tipiEValori += `${key}: (${tipo}) ${valore}\n`;
                }

                tipiEValori += "\n\n";
            }
            setTesto(tipiEValori);
        };
        testInsert(piantaTest);
    }, []);

    return (
        <ScrollView>
            <Text>
                {testo}
            </Text>
        </ScrollView>
    )
}