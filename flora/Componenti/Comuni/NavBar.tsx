import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {isPortrait} from "./OrientazioneChecker";
// COMPONENTI NATIVI
import {View} from 'react-native';
// COMPONENTI CUSTOM
import Icona          from './Navbar/Icona';
import BarraDiRicerca from './Navbar/BarraDiRicerca';
import HamburgerMenu  from './Navbar/HamburgerMenu';

export default function NavBar() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    if (isPortrait())
        return (
            // Modalità Portrait
            <View>
                <Icona/>
                <BarraDiRicerca/>
                <HamburgerMenu/>
            </View>
        )
    else
        return (
            // Modalità Landscape
            <View>
                <Icona/>
                <BarraDiRicerca/>
            </View>
        )
}