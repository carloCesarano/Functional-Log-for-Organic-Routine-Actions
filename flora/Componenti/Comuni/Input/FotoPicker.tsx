import {JSX} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {launchImageLibraryAsync} from 'expo-image-picker';
import {styles} from '../../../Styles/FotoPicker';

interface Props {
    foto: any,
    setFoto: ({uri}: {uri: string}) => void;
}

export default function ({foto, setFoto}: Props): JSX.Element {

    const selettoreCliccato = async () => {
        const risultato = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1
        });
        if (!risultato.canceled)
            setFoto({uri: risultato.assets[0].uri})
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={selettoreCliccato}>

            {foto ? (
                <Image
                    source={foto}
                    style={styles.image}
                    resizeMode='cover'
                    />
            ) : (
                <Text
                    style={styles.text}>
                    Foto
                </Text>
            )}
        </TouchableOpacity>
    )
}