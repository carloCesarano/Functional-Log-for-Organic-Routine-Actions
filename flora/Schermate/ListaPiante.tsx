import {JSX, useCallback, useState} from 'react';
import {RootStackParamList} from '../types';
import {useRoute, RouteProp, useFocusEffect} from '@react-navigation/native';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import AggiungiPiantaButton from '../Componenti/Comuni/AggiungiPiantaButton';
import VistaPiante          from '../Componenti/Schermate/ListaPiante/VistaPiante';
import MenuFiltri           from '../Componenti/Schermate/ListaPiante/MenuFiltri';
// UTILITY
import {stampaTabella} from '../Database/DAO';

// COMPONENTE PRINCIPALE DELLA SCHERMATA LISTA PIANTE
export default function (): JSX.Element {
    // HOOKS DI STATO
    const route = useRoute<RouteProp<RootStackParamList, 'ListaPiante'>>();
    const cercato = route.params?.cercato ?? "";
    const [filtri, setFiltri] = useState<{stati: string[], categorie: string[]}>({stati: [], categorie: []});

    // LOG PER SVILUPPATORI
    useFocusEffect(useCallback(() => {
        stampaTabella('PiantePossedute')
    }, []));

    // RENDER DELLA SCHERMATA
    // Mostra la navbar, il titolo, la lista delle piante filtrata e il menu filtri
    return (
        <Background>
            <NavBar/>
            <Titolo nome="ListaPiante"/>
            <VistaPiante cercato={cercato} filtri={filtri}/>
            <MenuFiltri onFiltriCambiati={setFiltri}/>
            <AggiungiPiantaButton/>
        </Background>
    )
}