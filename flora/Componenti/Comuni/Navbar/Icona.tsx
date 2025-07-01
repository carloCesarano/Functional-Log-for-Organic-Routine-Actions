import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types';
// COMPONENTI NATIVI
import {TouchableOpacity, Image} from 'react-native';
// FOGLI DI STILE
import {styles} from '../../../Styles/NavBar';

export default function Icona() {
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
                style={styles.icona}
                source={require("../../../Assets/full_logo.png")}/>
        </TouchableOpacity>
    )
}