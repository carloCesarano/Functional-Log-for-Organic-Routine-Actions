import React, {useEffect, useState} from "react";
import {ScrollView, Text} from 'react-native';
import {PiantaPosseduta} from "../../model/PiantaPosseduta";
import {getAll} from "../../database/PiantePosseduteDAO";


export default function DBTest() {
    const [testo, setTesto] = useState<string>("");



    useEffect(() => {
        const testInsert = async () => {
            await PiantaPosseduta.creaNuova({
                id: -1,     // id che non verrà utilizzato
                nome: "Alberto",
                specie: "Ficus",
                dataAcq: (new Date()).toISOString(),
                ultimaInnaff: (new Date()).toISOString(),
                ultimaPotat: (new Date()).toISOString(),
                ultimoRinv: (new Date()).toISOString(),
                note: "Note",
                foto: ""
            });

            const piante : PiantaPosseduta[] = await getAll();

            for (const pianta of piante) {
                let tipiEValori = '';

                for (const key in pianta) {
                    // @ts-ignore
                    const valore = pianta[key];
                    const tipo = valore === null ? 'null' : valore instanceof Date ? 'Date' : typeof valore;
                    tipiEValori += `${key}: (${tipo}) ${valore}\n`;
                }

                tipiEValori += "\n\n";
                setTesto(tipiEValori);
            }
        };
        testInsert();
    }, []);

    return (
        <ScrollView>
            <Text>
                {testo}
            </Text>
        </ScrollView>
    )
}