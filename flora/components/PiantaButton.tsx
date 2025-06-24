import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { piantaButtonStyles } from "../styles/piantaButton";
import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);
const dbPromise = SQLite.openDatabase({ name: "database.sqlite", location: "default" });

interface Props {
    piantaId: number;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "InfoPianta">;

export default function PiantaButton({ piantaId }: Props) {
    const [foto, setFoto] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const fetchFoto = async () => {
            try {
                const db = await dbPromise;
                const [results] = await db.executeSql("SELECT foto FROM PiantePossedute WHERE id = 1");
                if (results.rows.length > 0) {
                    const row = results.rows.item(0);
                    console.log(row);
                    setFoto(row.fotoUri);
                }
            } catch (error) {
                console.error("Errore nel recuperare la foto:", error);
            }
        };

        fetchFoto();
    }, [piantaId]);

    const handlePress = () => {
        navigation.navigate("InfoPianta", { plantId: piantaId.toString() });
    };

    return (
        <TouchableOpacity style={piantaButtonStyles.button} onPress={handlePress}>
            {foto ? (
                <Image source={{ uri: foto }} style={piantaButtonStyles.image} />
            ) : (
                <Text>Caricamento...</Text>
            )}
        </TouchableOpacity>
    );
}
