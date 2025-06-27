import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { piantaButtonStyles } from "../styles/piantaButton";
import { DBRow, get } from "../database/Database";

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
            const info = await get<PiantaInfo>("PiantePossedute", piantaId);
            if (info) {
                setPianta(info);
            }
        };
        caricaPianta();
    }, [piantaId]);

    const handlePress = () => {
        navigation.navigate("InfoPianta", { plantId: piantaId });
    };

    return (
        <TouchableOpacity style={piantaButtonStyles.button} onPress={handlePress}>
            <View>
                <Image
                    source={pianta?.foto ? { uri: pianta.foto } : require('../assets/plant.png')}
                    style={piantaButtonStyles.image}
                    defaultSource={require('../assets/plant.png')}
                />
                <Text style={piantaButtonStyles.text}>{pianta?.nome ?? 'Caricamento...'}</Text>
            </View>
        </TouchableOpacity>
    );
}