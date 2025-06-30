import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { PiantaPosseduta } from "../../model/PiantaPosseduta";
import { get } from "../../database/PiantePosseduteDAO"
import { piantaButtonStyles } from "../../styles/piantaButton";
import {LinearGradient} from "expo-linear-gradient";

interface Props {
    piantaId: number;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "InfoPianta">;

export default function PiantaButton({ piantaId }: Props) {
    const [pianta, setPianta] = useState<PiantaPosseduta | null>(null);
    const [foto,   setFoto  ] = useState<any>(null);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const caricaPianta = async () => {
            const piantaCaricata = await get(piantaId);
            setPianta(piantaCaricata);

            if (piantaCaricata)
                setFoto(await piantaCaricata.getFoto());
            else
                setFoto(require("../../assets/plantsMockup/generic.jpg"));
        };
        caricaPianta();
    }, [piantaId]);

    const handlePress = () => {
        navigation.navigate("InfoPianta", { plantId: piantaId });
    };

    return (
        <TouchableOpacity style={piantaButtonStyles.button} onPress={handlePress}>
            <LinearGradient
                colors={["#e2f0d5", pianta?.coloreStato() ?? "#ababab"]}
                start={{x: 0, y: 0}}
                end={{x:0.8, y: 0.8}}
                style={piantaButtonStyles.gradient}
            >
                <Image
                    source={foto}
                    style={piantaButtonStyles.image}
                    defaultSource={require('../../assets/plantsMockup/generic.jpg')}
                />
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={piantaButtonStyles.text}
                >{pianta?.getNome() ?? 'Caricamento...'}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}