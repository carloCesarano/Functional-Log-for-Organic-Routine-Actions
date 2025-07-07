import {JSX, useState} from 'react';
// COMPONENTI NATIVI
import {ViewStyle, TextStyle, FlatList, Modal, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
// COMPONENTI CUSTOM
import Button from './Button';

type Opzione = {
    label: string;
    value: string;
};

interface Props {
    titolo             : string,
    opzioni            : Opzione[];
    selezionati        : string[];
    onCambia           : (selezionati: string[]) => void;
    stileButton       ?: ViewStyle;
    stileTesto        ?: TextStyle;
    stileTestoOpzione ?: TextStyle;
    stileContainer    ?: ViewStyle
}

export default function (props: Props): JSX.Element {
    // VARIABILI DI STATO
    const {
        titolo,
        opzioni,
        selezionati,
        onCambia,
        stileButton,
        stileTesto,
        stileTestoOpzione,
        stileContainer
    } = props;
    const [aperto, setAperto] = useState<boolean>(false);

    const toggleOpzione = (valore: string): void => {
        const nuovaLista: string[] = selezionati.includes(valore)
            ? selezionati.filter(v => v !== valore)
            : [...selezionati, valore];
        onCambia(nuovaLista);
    }

    const toggleAperto = (): void => {
        setAperto(prev => !prev);
    }

    const renderOpzione = ({item}: {item: Opzione}) => (
        <CheckBox
            title={item.label}
            checked={selezionati.includes(item.value)}
            onPress={() => toggleOpzione(item.value)}
            style={{margin: 0}}
            textStyle={stileTestoOpzione}/>
    )

    return (
        <>
            <Button
                testo={selezionati.length !== 0 ? `${titolo}: ${selezionati.join(', ')}` : titolo}
                onPress={toggleAperto}
                stileButton={stileButton}
                stileTesto={stileTesto}/>

            <Modal
                style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                animationType='fade'
                backdropColor={'rgba(0, 0, 0, 0.1)'}
                visible={aperto}
                onRequestClose={toggleAperto}>

                <TouchableOpacity
                    style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                    onPress={toggleAperto}>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={{width: '70%', maxHeight: '70%', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {}}>

                        <FlatList
                            data={opzioni}
                            keyExtractor={opz => opz.value}
                            renderItem={renderOpzione}
                            contentContainerStyle={[{backgroundColor: 'white'}, stileContainer]}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </>
    )
}