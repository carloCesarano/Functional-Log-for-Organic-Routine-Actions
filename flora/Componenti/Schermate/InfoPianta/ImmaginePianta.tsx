import {JSX} from 'react';
import {PiantaPosseduta} from '../../../Model/PiantaPosseduta';
import {Image, View} from "react-native";

interface Props {
    pianta: PiantaPosseduta | null
}

export default function ({pianta}: Props): JSX.Element {
    const colore = pianta?.coloreStato() ?? '#acacac';

    return (
        <View style={{width: '100%', backgroundColor: colore, alignItems: 'center', paddingVertical: 20}}>
            <Image
                source={pianta?.getFoto()}
                defaultSource={require('../../../Assets/MOCKUP/generic.jpg')}
                style={{width: 150, height: 150, resizeMode: 'cover', borderRadius: 18}}
            />
        </View>
    )
}