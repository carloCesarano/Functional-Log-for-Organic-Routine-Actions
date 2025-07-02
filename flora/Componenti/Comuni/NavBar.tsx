import {isPortrait} from "./OrientazioneChecker";
// COMPONENTI NATIVI
import {View} from 'react-native';
// COMPONENTI CUSTOM
import Icona          from './Navbar/Icona';
import BarraDiRicerca from './Navbar/BarraDiRicerca';
import HamburgerMenu  from './Navbar/HamburgerMenu';
// FOGLI DI STILE
import {styles} from '../../Styles/NavBar';

export default function NavBar() {
    if (isPortrait())
        return (
            // Modalità Portrait
            <View style={styles.navbarP}>
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
                <HamburgerMenu/>
            </View>
        )
}