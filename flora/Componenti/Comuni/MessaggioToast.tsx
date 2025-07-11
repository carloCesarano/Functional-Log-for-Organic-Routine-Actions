import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {styles} from '../../Styles/MessaggioToast';
import React from 'react';
import {View} from 'react-native';

const config = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={[styles.toast, {borderLeftColor: 'green'}]}
            contentContainerStyle={styles.contenuto}
            text1Style={styles.titolo}
            text2Style={styles.messaggio}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={[styles.toast, {borderLeftColor: 'red'}]}
            contentContainerStyle={styles.contenuto}
            text1Style={styles.titolo}
            text2Style={styles.messaggio}
        />
    ),
    warn: (props: any) => (
        <ErrorToast
            {...props}
            style={[styles.toast, {borderLeftColor: '#dfe23e'}]}
            contentContainerStyle={styles.contenuto}
            text1Style={styles.titolo}
            text2Style={styles.messaggio}
        />
    )
}

type Props = {
    tipo: string,
    titolo: string,
    messaggio: string
};

export function MostraToast({tipo, titolo, messaggio}: Props) {
    Toast.show({
        type: tipo,
        text1: titolo,
        text2: messaggio
    });
}

export default function MessaggioToast() {
    return (
        <View pointerEvents='none' style={styles.view}>
            <Toast config={config}/>
        </View>
    )
}