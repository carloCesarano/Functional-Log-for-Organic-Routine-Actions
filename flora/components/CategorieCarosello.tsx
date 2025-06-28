import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { categoriaStyles as styles } from "../styles/categoria";

interface CarouselItem {
    id: number;
    nome: string;
    count: number;
}

interface CategorieCaroselloProps {
    onCategoriaSelezionata: (categoria: string) => void;
    categorieCount?: Array<{ categoria: string, conteggio: number }>;
}

const CategorieCarosello: React.FC<CategorieCaroselloProps> = ({
                                                                   onCategoriaSelezionata,
                                                                   categorieCount
                                                               }) => {
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const caricaCategorie = () => {
            try {
                const items = categorieCount?.map((c, index) => ({
                    id: index,
                    nome: c.categoria,
                    count: c.conteggio
                })) || [];

                setCarouselItems(items);
            } catch (error) {
                console.error("Errore nel caricamento:", error);
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
            <Text style={styles.countText}>{item.count} piante</Text>
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
                {carouselItems.map(renderItem)}
            </ScrollView>
        </View>
    );
};

export default CategorieCarosello;