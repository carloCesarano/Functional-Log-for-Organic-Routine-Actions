// import React, { useEffect, useState } from "react";
// import { ScrollView, Text, View, Dimensions } from "react-native";
// import { BarChart } from "react-native-chart-kit";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types";
// import Background from "../components/Background";
// import NavBar from "../components/NavBar";
// import Button from "../components/Button";
// // import { countPlants, countPlantsByCategory, getMonthlyCareData, getPlantHealthStats } from "../database/MobileDatabase";
// import styles from "../styles/analisi";
//
// type Props = NativeStackScreenProps<RootStackParamList, 'Analisi'>;
//
export default function Analisi() {
//     const [punteggioVerde, setPunteggioVerde] = useState<string>("...");
//     const [totalPlants, setTotalPlants] = useState<number>(0);
//     const [categories, setCategories] = useState<{categoria: string, count: number}[]>([]);
//     const [careData, setCareData] = useState({
//         innaffiature: 0,
//         potature: 0,
//         rinvasi: 0
//     });
//
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             // Conteggio piante totali
//     //             const count = await countPlants();
//     //             setTotalPlants(count);
//     //
//     //             // Distribuzione per categorie
//     //             const categoryCounts = await countPlantsByCategory();
//     //             setCategories(categoryCounts);
//     //
//     //             // Attività di cura mensili
//     //             const curaData = await getMonthlyCareData();
//     //             setCareData(curaData);
//     //
//     //             // Stato generale della collezione
//     //             const {healthy, total} = await getPlantHealthStats();
//     //             setPunteggioVerde(`${Math.round((healthy / (total || 1)) * 100)}%`);
//     //         } catch (error) {
//     //             console.error("Errore nel calcolo:", error);
//     //             setPunteggioVerde("0%");
//     //             setTotalPlants(0);
//     //             setCategories([]);
//     //             setCareData({ innaffiature: 0, potature: 0, rinvasi: 0 });
//     //         }
//     //     };
//     //     fetchData();
//     // }, []);
//
//     const chartData = {
//         labels: ["Innaffiature", "Potature", "Rinvasi"],
//         datasets: [
//             {
//                 data: [careData.innaffiature, careData.potature, careData.rinvasi],
//                 colors: [
//                     (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
//                     (opacity = 1) => `rgba(244, 194, 66, ${opacity})`,
//                     (opacity = 1) => `rgba(66, 244, 131, ${opacity})`,
//                 ],
//             },
//         ],
//     };
//
//     return (
//         <Background>
//             <NavBar />
//             <ScrollView
//                 contentContainerStyle={styles.scrollContainer}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.container}>
//                     <Text style={styles.title}>Analisi Piante</Text>
//
//                     <View style={styles.box}>
//                         <Text style={styles.boxText}>Numero totale di piante: {totalPlants}</Text>
//                     </View>
//
//                     <View style={styles.box}>
//                         <Text style={styles.boxText}>Distribuzione per categorie:</Text>
//                         {categories.map((cat, index) => (
//                             <Text key={index} style={styles.boxText}>
//                                 {cat.categoria}: {cat.count} ({(cat.count / (totalPlants || 1) * 100).toFixed(1)}%)
//                             </Text>
//                         ))}
//                     </View>
//
//                     <View style={styles.chartBox}>
//                         <Text style={styles.boxText}>Attività cura eseguita (mese corrente)</Text>
//                         <BarChart
//                             data={chartData}
//                             width={Dimensions.get('window').width * 0.8}
//                             height={200}
//                             yAxisLabel=""
//                             yAxisSuffix=""
//                             chartConfig={{
//                                 backgroundColor: "#a6e3a1",
//                                 backgroundGradientFrom: "#a6e3a1",
//                                 backgroundGradientTo: "#85c779",
//                                 decimalPlaces: 0,
//                                 color: (opacity = 1) => `rgba(30, 61, 0, ${opacity})`,
//                                 labelColor: (opacity = 1) => `rgba(30, 61, 0, ${opacity})`,
//                                 style: { borderRadius: 16 },
//                                 barPercentage: 0.5,
//                             }}
//                             style={styles.chartStyle}
//                             fromZero
//                             showBarTops={false}
//                         />
//                         <View style={styles.activityContainer}>
//                             <View style={styles.activityItem}>
//                                 <Text style={styles.activityValue}>{careData.innaffiature}</Text>
//                                 <Text style={styles.activityLabel}>Innaffiature</Text>
//                             </View>
//                             <View style={styles.activityItem}>
//                                 <Text style={styles.activityValue}>{careData.potature}</Text>
//                                 <Text style={styles.activityLabel}>Potature</Text>
//                             </View>
//                             <View style={styles.activityItem}>
//                                 <Text style={styles.activityValue}>{careData.rinvasi}</Text>
//                                 <Text style={styles.activityLabel}>Rinvasi</Text>
//                             </View>
//                         </View>
//                     </View>
//
//                     <View style={styles.box}>
//                         <Text style={styles.boxText}>Stato generale collezione:</Text>
//                         <Text style={styles.score}>{punteggioVerde}</Text>
//                         <Text style={styles.boxText}>Percentuale di piante con tutte le cure in regola</Text>
//                     </View>
//
//                     <View style={styles.buttonContainer}>
//                         <Button
//                             title="Indietro"
//                             onPress={() => navigation.navigate('Home')}
//                             buttonStyle={styles.backButton}
//                             textStyle={styles.backText}
//                         />
//                     </View>
//                 </View>
//             </ScrollView>
//         </Background>
//     );
}