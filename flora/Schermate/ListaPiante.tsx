import {JSX, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
// COMPONENTI NATIVI
import {View} from "react-native";
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import AggiungiPiantaButton from '../Componenti/Comuni/AggiungiPiantaButton';
import VistaPiante          from '../Componenti/Schermate/ListaPiante/VistaPiante';
import MenuFiltri           from '../Componenti/Schermate/ListaPiante/MenuFiltri';
import Button from '../Componenti/Comuni/Input/Button';
// UTILITY
import * as CategorieDAO from '../Database/CategorieDAO';
import { useRoute, RouteProp } from '@react-navigation/native';

// FOGLI DI STILE
import {styles} from "../Styles/ButtonListaPiante";


// COMPONENTE PRINCIPALE DELLA SCHERMATA LISTA PIANTE
export default function (): JSX.Element {
    // HOOKS DI STATO
    const route = useRoute<RouteProp<RootStackParamList, 'ListaPiante'>>();
    const cercato = route.params?.cercato ?? "";
    // Stati selezionati per il filtro
    const [stati, setStati] = useState<string[]>([]);
    // Categorie selezionate per il filtro
    const [categorie, setCategorie] = useState<string[]>([]);
    // Stato di visibilità dei vari menu di filtro
    const [mostraMenuFiltri, setMostraMenuFiltri] = useState(false);
    const [mostraCategorie, setMostraCategorie] = useState(false);
    const [mostraStati, setMostraStati] = useState(false);
    // Lista di tutte le categorie disponibili (caricate dal DB)
    const [listaCategorie, setListaCategorie] = useState<string[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


    // Carica tutte le categorie dal database all'avvio della schermata
    useEffect(() => {
        async function caricaCategorie() {
            const tutte = await CategorieDAO.getAll();
            setListaCategorie(tutte.map(c => c.nome));
        }
        caricaCategorie();
    }, []);

    // CALLBACK: Gestisce il click sul pulsante "Filtra"
    // Mostra o nasconde il menu principale dei filtri e chiude eventuali sottomenu
    const handleFiltriCliccato = () => {
        setMostraMenuFiltri(!mostraMenuFiltri);
        setMostraCategorie(false);
        setMostraStati(false);
    };

    // CALLBACK: Gestisce la selezione tra filtro per stato o per categoria
    // Mostra il sottomenu corrispondente
    const handleSelezionaFiltro = (filtro: 'stato' | 'categoria') => {
        setMostraMenuFiltri(false);
        if (filtro === 'categoria') {
            setMostraCategorie(true);
        } else {
            setMostraStati(true);
        }
    };

    // CALLBACK: Gestisce la selezione/deselezione di uno stato
    // Se si seleziona "In salute", deseleziona gli altri stati
    const handleStatoSelezionato = (stato: string) => {
        setStati(prev => {
            if (prev.includes(stato)) return prev.filter(s => s !== stato);
            if (stato === "In salute") return [stato];
            return [...prev.filter(s => s !== "In salute"), stato];
        });
    };

    // CALLBACK: Gestisce la selezione/deselezione di una categoria
    const handleCategoriaSelezionata = (categoria: string) => {
        setCategorie(prev =>
            prev.includes(categoria)
                ? prev.filter(c => c !== categoria)
                : [...prev, categoria]
        );
    };

    // RENDER DELLA SCHERMATA
    // Mostra la navbar, il titolo, la lista delle piante filtrata e il menu filtri
    return (
        <Background>
            <NavBar/>
            <Titolo nome="ListaPiante"/>
            {/* Lista delle piante filtrata in base a ricerca e filtri */}
            <VistaPiante cercato={cercato} filtri={{stati, categorie}}/>

            <View style={styles.buttonContainer}>
                <Button
                    testo="Indietro"
                    onPress={() => navigation.navigate('Home')}
                    stileButton={styles.button}
                    stileTesto={styles.testo}
                />
                <Button
                    testo="Filtra"
                    onPress={handleFiltriCliccato}
                    stileButton={styles.button}
                    stileTesto={styles.testo}

                />
            </View>

            {/* Menu per la selezione dei filtri */}
            <MenuFiltri
                mostraMenuFiltri={mostraMenuFiltri}
                mostraCategorie={mostraCategorie}
                mostraStati={mostraStati}
                listaCategorie={listaCategorie}
                categorieSelezionate={categorie}
                statiSelezionati={stati}
                onFiltriCliccato={handleFiltriCliccato}
                onSelezionaFiltro={handleSelezionaFiltro}
                onStatoSelezionato={handleStatoSelezionato}
                onCategoriaSelezionata={handleCategoriaSelezionata}
            />
            {/* Pulsante per aggiungere una nuova pianta */}
            <AggiungiPiantaButton/>
        </Background>
    )
}