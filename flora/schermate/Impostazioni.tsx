import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import Background from "../components/commons/Background";
import NavBar from "../components/navbar/NavBar";
import {getAll} from "../database/PiantePosseduteDAO";
import Button from "../components/inputs/Button";

type Props = NativeStackScreenProps<RootStackParamList, 'Impostazioni'>;


export default function Impostazioni({navigation}: Props) {

    const getAllPiante = async () => {
        const piante = await getAll();
        for (const p of piante) {
            console.log(p.toString())
        }
    }

    return (
        <Background>
            <NavBar/>
            <Button title="Stampa piante" onPress={getAllPiante}/>
        </Background>
    )
}