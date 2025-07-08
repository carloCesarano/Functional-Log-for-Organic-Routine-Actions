import {JSX, useState} from 'react';
// COMPONENTI CUSTOM
import Background from '../Componenti/Comuni/Background';
import NavBar     from '../Componenti/Comuni/NavBar';
import Titolo     from '../Componenti/Comuni/Titolo';
import AggiungiCategoriaButton from '../Componenti/Schermate/Categoria/AggiungiCategoriaButton';
import ModificaCategoriaButton from '../Componenti/Schermate/Categoria/ModificaCategoriaButton';
import NumPianteCategoria  from '../Componenti/Schermate/Categoria/NumPianteCategoria';
import CategorieCarosello from '../Componenti/Schermate/Categoria/CategorieCarosello';
import { ScrollView } from 'react-native';

export default function (): JSX.Element {
    //Costanti che permettono la comunicazione tra i vari componenti
    const [categoriaSelezionata, setCategoriaSelezionata] = useState<{ id: number; nome: string } | null>(null);
    const [aggiornaLista, setAggiornaLista] = useState(false);

    const triggerAggiorna = () => setAggiornaLista(prev => !prev);

    return (
        <Background>
            <NavBar/>
            <ScrollView>
                <Titolo nome='Categorie'/>
                <CategorieCarosello
                    key={aggiornaLista.toString()}
                    onCategoriaSelezionata={setCategoriaSelezionata}
                />
                <AggiungiCategoriaButton onCategoriaAggiunta={triggerAggiorna} />
                <ModificaCategoriaButton
                    categoriaSelezionata={categoriaSelezionata}
                    onCategoriaModificata={triggerAggiorna}
                />
                <NumPianteCategoria nomeCategoria={categoriaSelezionata?.nome ?? null} />
            </ScrollView>
        </Background>
    )
}