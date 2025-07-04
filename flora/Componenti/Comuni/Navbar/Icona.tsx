import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {TouchableOpacity, Image, ImageStyle} from 'react-native';

export default function Icona({style}: {style: ImageStyle}) {
    // Recupero il navigatore
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    // Creo le funzioni principali

    // CHIAMATA QUANDO:
    // Funzione chiamata quando si clicca sull'icona.
    //
    // COSA FA:
    // Passa alla schermata 'Home'.
    const goHome = () => {
        navigation.navigate('Home');
    }

    return (
        <TouchableOpacity
            onPress={goHome}>
            <Image
                style={style}
                source={require("../../../Assets/full_logo.png")}/>
        </TouchableOpacity>
    )
}