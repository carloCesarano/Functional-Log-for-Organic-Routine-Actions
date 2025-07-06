// COMPONENTI NATIVI
import {View} from 'react-native';
// COMPONENTI CUSTOM
import Icona          from './Navbar/Icona';
import BarraDiRicerca from './Navbar/BarraDiRicerca';
import HamburgerMenu  from './Navbar/HamburgerMenu';
// UTILITY
import {isPortrait} from "./OrientazioneChecker";
// FOGLI DI STILE
import {PORTRAIT, LANDSCAPE} from '../../Styles/NavBar';

export default function NavBar() {
    // HOOKS
    const portraitMode = isPortrait();

    const styles = portraitMode ? PORTRAIT : LANDSCAPE;

    return (
        <View style={styles.navbar}>
            <Icona
                style={styles.icona}/>
            <BarraDiRicerca stile={styles.barraRicerca}/>
            <HamburgerMenu
                iconStyle={styles.hamburgerIcon}
                menuStyle={styles.hamburgerMenu}
                optionStyle={styles.hamburgerOption}/>
        </View>
    )
}