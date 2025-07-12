import { useEffect, useState } from 'react';
// COMPONENTI NATIVI
import { View, Text, ActivityIndicator,FlatList } from 'react-native';
// COMPONENTI CUSTOM
import CardPianta          from '../ListaPiante/CardPianta';
import CardPiantaLandscape from '../ListaPiante/CardPiantaLandscape';
// UTILITY
import { isPortrait } from '../../Comuni/OrientazioneChecker';
import * as CategorieDAO from '../../../Database/CategorieDAO';
import * as PianteCategorieDAO from '../../../Database/PianteCategorieDAO';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';
// FOGLI DI STILE
import { PORTRAIT, LANDSCAPE } from '../../../Styles/CategorieCaroselloStyles';


interface Props {
    nomeCategoria: string | null;
}

export default function NumPianteCategoria({ nomeCategoria }: Props) {
    // VARIABILI DI STATO:
    // numeroPiante: contiene il numero di piante per la categoria selezionata
    // loading: usata per mostrare un indicatore di caricamento mentre si calcola
    //piantePossedute: serve a gestire la logica della lista delle piante appartenenti alla categoria selezionata
    const [numeroPiante, setNumeroPiante] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [piantePossedute, setPiantePossedute] = useState<PiantaPosseduta[] | null >([]);

    // Selezione dello stile in base all’orientamento del dispositivo
    const portraitMode = isPortrait();
    const stile = portraitMode ? PORTRAIT : LANDSCAPE;


    // CHIAMATA QUANDO:
    // Ogni volta che cambia `nomeCategoria`.
    //
    // COSA FA:
    // - Recupera l’ID della categoria a partire dal nome
    // - Filtra tutte le relazioni pianta-categoria per contare quante
    //   piante sono associate alla categoria selezionata
    useEffect(() => {
        const conta = async () => {
            if (!nomeCategoria) return; // Se nulla è selezionato, non fare nulla
            setLoading(true); // Mostra caricamento
            try {
                const idCategoria = await CategorieDAO.daNome(nomeCategoria);
                const tutte = await PianteCategorieDAO.getAll();
                const filtrate = tutte.filter(r => r.categoria === idCategoria);
                setNumeroPiante(filtrate.length);
            } catch (err) {
                console.error('Errore:', err);
                setNumeroPiante(0); // Mostra 0 in caso di errore
            } finally {
                setLoading(false);
            }
        };
        conta();
    }, [nomeCategoria]);


    useEffect(() => {
        const caricaPianteCategoria = async () => {
            if (!nomeCategoria) return;
            setLoading(true);
            try {
                const idCategoria = await CategorieDAO.daNome(nomeCategoria);
                const relazioni = await PianteCategorieDAO.getAll();
                const pianteCorrette = relazioni
                    .filter(r => r.categoria === idCategoria)
                    .map(r => r.pianta);

                const tutteLePiante = await PiantePosseduteDAO.getAll();
                const pianteFiltrate = tutteLePiante.filter(p => {
                    const id = p.getId();
                    return id !== undefined && pianteCorrette.includes(id);
                });

                setPiantePossedute(pianteFiltrate);
            } catch (err) {
                console.error("Errore caricamento piante categoria:", err);
                setPiantePossedute([]);
            } finally {
                setLoading(false);
            }
        };
        caricaPianteCategoria();
    }, [nomeCategoria]);


    // Se non è stata selezionata una categoria, non mostrare nulla
    if (!nomeCategoria) return null;

    const renderPianta = ({item}: {item: PiantaPosseduta}) => {
        return portraitMode ? (
            <CardPianta pianta={item}/>
        ) : (
            <CardPiantaLandscape pianta={item}/>
        )
    }

    return (
        <View style={stile.boxNumPiante}>
            {/* TITOLO NUMERO PIANTE */}
            <Text style={stile.titoloNumPiante}>
                Hai <Text style={stile.numeroPiante}>{numeroPiante}</Text>{' '}
                {numeroPiante === 1 ? 'pianta' : 'piante'} per la categoria "{nomeCategoria}"
            </Text>

            {/* INDICATORE DI CARICAMENTO */}
            {loading ? (
                <ActivityIndicator size="small" color="#333" />
            ) : (
                <>
                    {piantePossedute && piantePossedute.length > 0 ? (
                        <FlatList
                            scrollEnabled={!portraitMode}
                            data={piantePossedute}
                            keyExtractor={(item) => item.getId().toString()}
                            renderItem={renderPianta}
                            horizontal={!portraitMode}
                            contentContainerStyle={!portraitMode ? { gap: 18, paddingHorizontal: 18 } : {}}
                            key={portraitMode ? 'PORTRAIT' : 'LANDSCAPE'}
                        />
                    ) : (
                        <Text style={stile.noPiantaTrovata}>Nessuna pianta in questa categoria.</Text>
                    )}
                </>
            )}
        </View>
    );


}
