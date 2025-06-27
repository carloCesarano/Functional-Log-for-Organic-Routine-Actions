import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { DBRow, select } from "../database/Database";
import {categoriaStyles as styles} from "../styles/categoria";

interface CarouselItem extends DBRow {
    id: number;
    nome: string;
    count:number;
}

interface CategorieCaroselloProps {
    onCategoriaSelezionata: (categoria: string) => void;
    categorieCount?: Array<{ categoria: string, count: number }>;
}

const CategorieCarosello = ({ onCategoriaSelezionata, categorieCount }: CategorieCaroselloProps) => {
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const caricaCategorie = async () => {
            try {
                const items = categorieCount
                    ? categorieCount.map((c, index) => ({
                        id: index,
                        nome: c.categoria,
                        count: c.count
                    }))
                    : []; // Fallback se categorieCount è undefined

                setCarouselItems(items);
            } catch (error) {
                console.error("Errore nel caricamento delle categorie:", error);
            } finally {
                setLoading(false);
            }
        };

        caricaCategorie();
    }, [categorieCount]);

    const handlePress = (item: CarouselItem) => {
        setSelectedId(item.id);
        onCategoriaSelezionata(item.nome);
    };

    const renderItem = (item: CarouselItem) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(item)}
            style={[
                styles.item,
                selectedId === item.id && styles.selectedItem
            ]}
        >
            <Text style={styles.itemText}>{item.nome}</Text>
            {'count' in item && (
                <Text style={styles.countText}>{item.count} piante</Text>
            )}
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (carouselItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nessuna categoria disponibile</Text>
            </View>
        );
    }

    return (
        <View style={styles.innercontainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {carouselItems.map((item) => renderItem(item))}
            </ScrollView>
        </View>
    );
};


export default CategorieCarosello;