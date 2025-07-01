import React, {useState} from 'react';
import {Platform, StyleProp, TextStyle, ViewStyle} from 'react-native';
// COMPONENTI NATIVI
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
// COMPONENTI CUSTOM
import Button from './Button';

interface Props {
    valore       : Date;
    onChange     : (data: Date) => void;
    nome        ?: string;
    minValore   ?: Date;
    maxValore   ?: Date;
    stileButton ?: StyleProp<ViewStyle>;
    stileTesto  ?: StyleProp<TextStyle>;
}

export default function DataPicker(props: Props) {
    // VARIABILI DI STATO
    const [visibile, setVisibile] = useState<boolean>(false);

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si sceglie una
    // nuova data.
    //
    // COSA FA:
    // Nasconde il picker e esegue la funzione
    // passata in input con la nuova data come
    // parametro.
    const onCambioValore = (_event: DateTimePickerEvent, nuovaData?: Date): void => {
        setVisibile(false);
        if (nuovaData)
            props.onChange(nuovaData);
    };

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si deve formattare
    // la data selezionata per mostrarla nel Button.
    //
    // COSA FA:
    // Applica una formattazione specifica alla data.
    const formattaData = (data: Date): string => {
        return data.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        })
    };

    return (
        <>
            <Button
                testo={props.nome ? `${props.nome}: ${formattaData(props.valore)}` : formattaData(props.valore)}
                onPress={() => setVisibile(true)}
                stileButton={props.stileButton}
                stileTesto={props.stileTesto}
                />

            {visibile && (
                <DateTimePicker
                    value={props.valore}
                    mode={"date"}
                    onChange={onCambioValore}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={props.maxValore}
                    minimumDate={props.minValore}/>
            )}
        </>
    )
}