import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { piantaButtonStyles } from "../styles/piantaButton";
import { selectPiantaInfo } from "../database/Database";
import { DBRow } from "../database/Database";


interface Props {
    piantaId: number;
}

interface PiantaInfo extends DBRow {
    nome: string;
    foto: string | null;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "InfoPianta">;

export default function PiantaButton({ piantaId }: Props) {
    const [pianta, setPianta] = useState<PiantaInfo | null>(null);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const caricaPianta = async () => {
            const info = await selectPiantaInfo<PiantaInfo>(piantaId);
            if (info) {
                setPianta(info);
            }
        };
        caricaPianta();
    }, [piantaId]);

    const getImage = () => {
        if (!pianta?.foto) {
            return require('../assets/plant.png');
        }

        try {

            // da dove prende le foto?

        } catch (error) {
            console.log("Errore caricamento immagine:", error);
            return require('../assets/plant.png');
        }
    };

    const handlePress = () => {
        navigation.navigate("InfoPianta", { plantId: piantaId.toString() });
    };

    return (
        <TouchableOpacity style={piantaButtonStyles.button} onPress={handlePress}>
            <View>
                <Image
                    source={getImage()}
                    style={piantaButtonStyles.image}
                    defaultSource={require('../assets/plant.png')}
                />
                <Text style={piantaButtonStyles.text}>{pianta?.nome ?? 'Caricamento...'}</Text>
            </View>
        </TouchableOpacity>
    );
}