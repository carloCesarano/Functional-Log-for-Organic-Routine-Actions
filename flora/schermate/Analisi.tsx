import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import * as PiantePosseduteDAO from "../database/PiantePosseduteDAO";
import styles from "../styles/analisi";

type Props = NativeStackScreenProps<RootStackParamList, 'Analisi'>;

const MS_IN_DAY = 86400000;

export default function Analisi({ navigation }: Props) {
    const [punteggioVerde, setPunteggioVerde] = useState<string>("...");
    const [totalPlants, setTotalPlants] = useState<number>(0);
    const [categories, setCategories] = useState<{categoria: string, count: number}[]>([]);
    const [careData, setCareData] = useState({
        innaffiature: 0,
        potature: 0,
        rinvasi: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPlants = await PiantePosseduteDAO.getAll();
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                // 1. Conteggio piante totali
                setTotalPlants(allPlants.length);

                // 2. Distribuzione per categorie
                const categoryCounts = allPlants
                    .flatMap(plant => plant.categorie)
                    .reduce((acc, category) => ({
                        ...acc,
                        [category]: (acc[category] || 0) + 1
                    }), {} as Record<string, number>);

                setCategories(
                    Object.entries(categoryCounts)
                        .map(([categoria, count]) => ({ categoria, count }))
                );

                // 3. Attività di cura mensili
                const isCurrentMonth = (date?: Date) => 
                    date?.getMonth() === currentMonth && 
                    date?.getFullYear() === currentYear;

                const { innaffiature, potature, rinvasi } = allPlants.reduce(
                    (acc, plant) => ({
                        innaffiature: acc.innaffiature + (isCurrentMonth(plant.getUltimaInnaff()) ? 1 : 0),
                        potature: acc.potature + (isCurrentMonth(plant.getUltimaPotat()) ? 1 : 0),
                        rinvasi: acc.rinvasi + (isCurrentMonth(plant.getUltimoRinv()) ? 1 : 0)
                    }), 
                    { innaffiature: 0, potature: 0, rinvasi: 0 }
                );

                setCareData({ innaffiature, potature, rinvasi });

                // 4. Punteggio verde (piante con cure in regola)
                const healthyCount = allPlants.filter(plant => {
                    const checks = [
                        !plant.getFreqInnaff() || 
                            (plant.getUltimaInnaff() && 
                             (now.getTime() - plant.getUltimaInnaff().getTime()) < plant.getFreqInnaff() * MS_IN_DAY),
                        !plant.getFreqPotat() || 
                            (plant.getUltimaPotat() && 
                             (now.getTime() - plant.getUltimaPotat().getTime()) < plant.getFreqPotat() * MS_IN_DAY),
                        !plant.getFreqRinv() || 
                            (plant.getUltimoRinv() && 
                             (now.getTime() - plant.getUltimoRinv().getTime()) < plant.getFreqRinv() * MS_IN_DAY)
                    ];
                    return checks.every(Boolean);
                }).length;

                setPunteggioVerde(`${Math.round((healthyCount / allPlants.length) * 100)}%`);

            } catch (error) {
                console.error("Errore nel calcolo:", error);
                setPunteggioVerde("0%");
                setTotalPlants(0);
                setCategories([]);
                setCareData({ innaffiature: 0, potature: 0, rinvasi: 0 });
            }
        };
        fetchData();
    }, []);

    const chartData = {
        labels: ["Innaffiature", "Potature", "Rinvasi"],
        datasets: [{
            data: [careData.innaffiature, careData.potature, careData.rinvasi],
            colors: [
                (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                (opacity = 1) => `rgba(244, 194, 66, ${opacity})`,
                (opacity = 1) => `rgba(66, 244, 131, ${opacity})`,
            ]
        }]
    };

    return (
        <Background>
            <NavBar />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Analisi Piante</Text>

                    <View style={styles.box}>
                        <Text style={styles.boxText}>Numero totale di piante: {totalPlants}</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.boxText}>Distribuzione per categorie:</Text>
                        {categories.map((cat, index) => (
                            <Text key={index} style={styles.boxText}>
                                {cat.categoria}: {cat.count} ({(cat.count / totalPlants * 100).toFixed(1)}%)
                            </Text>
                        ))}
                    </View>

                    <View style={styles.chartBox}>
                        <Text style={styles.boxText}>Attività cura eseguita (mese corrente)</Text>
                        <BarChart
                            data={chartData}
                            width={Dimensions.get('window').width * 0.8}
                            height={200}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundColor: "#a6e3a1",
                                backgroundGradientFrom: "#a6e3a1",
                                backgroundGradientTo: "#85c779",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(30, 61, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(30, 61, 0, ${opacity})`,
                                style: { borderRadius: 16 },
                                barPercentage: 0.5
                            }}
                            style={styles.chartStyle}
                            fromZero
                            showBarTops={false}
                        />
                        <View style={styles.activityContainer}>
                            <View style={styles.activityItem}>
                                <Text style={styles.activityValue}>{careData.innaffiature}</Text>
                                <Text style={styles.activityLabel}>Innaffiature</Text>
                            </View>
                            <View style={styles.activityItem}>
                                <Text style={styles.activityValue}>{careData.potature}</Text>
                                <Text style={styles.activityLabel}>Potature</Text>
                            </View>
                            <View style={styles.activityItem}>
                                <Text style={styles.activityValue}>{careData.rinvasi}</Text>
                                <Text style={styles.activityLabel}>Rinvasi</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.boxText}>Stato generale collezione:</Text>
                        <Text style={styles.score}>{punteggioVerde}</Text>
                        <Text style={styles.boxText}>Percentuale di piante con tutte le cure in regola</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Indietro"
                            onPress={() => navigation.navigate('Home')}
                            buttonStyle={styles.backButton}
                            textStyle={styles.backText}
                        />
                    </View>
                </View>
            </ScrollView>
        </Background>
    );
}