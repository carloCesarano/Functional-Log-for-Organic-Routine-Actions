import React, { useState } from "react";
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { styles } from "../styles/infoPianta";

type Props = NativeStackScreenProps<RootStackParamList, 'InfoPianta'>;

export default function InfoPianta({ navigation, route }: Props) {
    const { plantId } = route.params;
    
    // Stato originale (sola lettura)
    const [originalData] = useState({
        foto: null as string | null,
        nome: "Pianta Esempio",
        specie: "Specie Esempio",
        dataAcq: new Date(),
        categoria: "Interno",
        ultimaInnaffiatura: new Date(),
        ultimaPotatura: new Date(),
        ultimoRinvaso: new Date(),
        note: "",
    });

    // Stato modificabile
    const [plantData, setPlantData] = useState({...originalData});
    const [isEditing, setIsEditing] = useState(false);
    const [showPicker, setShowPicker] = useState({
        dataAcq: false,
        ultimaInnaffiatura: false,
        ultimaPotatura: false,
        ultimoRinvaso: false
    });

    const handleEdit = () => {
        // Crea una copia dei dati originali quando si entra in modalità modifica
        setPlantData({...originalData});
        setIsEditing(true);
    };

    const handleSave = () => {
        // Qui dovresti aggiungere la logica per salvare i dati
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Ripristina i dati originali
        setPlantData({...originalData});
        setIsEditing(false);
    };

    const handleChange = (field: string, value: any) => {
        setPlantData(prev => ({ ...prev, [field]: value }));
    };

    const handleImagePress = () => {
        if (!isEditing) return;

        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1,
            includeBase64: false
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert("Errore", "Impossibile selezionare l'immagine");
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setPlantData({...plantData, foto: response.assets[0].uri ?? null});
            }
        });
    };

    const renderDateField = (label: string, value: Date, fieldName: keyof typeof showPicker) => {
        if (isEditing) {
            return (
                <View style={styles.dateFieldContainer}>
                    <Text style={styles.dateFieldLabel}>{label}</Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowPicker({...showPicker, [fieldName]: true})}
                    >
                        <Text style={styles.dateInputText}>
                            {value.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    {showPicker[fieldName] && (
                        <DateTimePicker
                            value={value}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowPicker({...showPicker, [fieldName]: false});
                                if (selectedDate) {
                                    handleChange(fieldName, selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
            );
        }
        return (
            <Text style={styles.infoText}>{label}: {value.toLocaleDateString()}</Text>
        );
    };

    return (
        <Background>
            <NavBar />
            <View style={styles.container}>
                <ScrollView 
                    style={styles.scrollArea}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.plantImageContainer}>
                        <TouchableOpacity 
                            onPress={handleImagePress} 
                            activeOpacity={isEditing ? 0.7 : 1}
                        >
                            {plantData.foto ? (
                                <Image source={{ uri: plantData.foto }} style={styles.plantImage} />
                            ) : (
                                <Image source={require("../assets/plant.png")} style={styles.plantImage} />
                            )}
                            {isEditing && (
                                <View style={styles.editOverlay}>
                                    <Text style={styles.editOverlayText}>Modifica foto</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <View style={styles.healthTag}>
                            <Text style={styles.healthTagText}>sana</Text>
                        </View>
                        <View style={styles.waterTag}>
                            <Text style={styles.tagText}>da innaffiare</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        {isEditing ? (
                            <>
                                <View style={styles.rowContainer}>
                                    <TextInput
                                        style={[styles.editableInput, styles.halfInput, {marginRight: 8}]}
                                        value={plantData.nome}
                                        onChangeText={(text) => handleChange('nome', text)}
                                        placeholder="Nome"
                                    />
                                    <TextInput
                                        style={[styles.editableInput, styles.halfInput]}
                                        value={plantData.specie}
                                        onChangeText={(text) => handleChange('specie', text)}
                                        placeholder="Specie"
                                    />
                                </View>
                                {renderDateField("Data acquisizione", plantData.dataAcq, 'dataAcq')}
                                <TextInput
                                    style={styles.editableInput}
                                    value={plantData.categoria}
                                    onChangeText={(text) => handleChange('categoria', text)}
                                    placeholder="Categoria"
                                />
                                {renderDateField("Ultima innaffiatura", plantData.ultimaInnaffiatura, 'ultimaInnaffiatura')}
                                {renderDateField("Ultima potatura", plantData.ultimaPotatura, 'ultimaPotatura')}
                                {renderDateField("Ultimo rinvaso", plantData.ultimoRinvaso, 'ultimoRinvaso')}
                                <TextInput
                                    style={[styles.editableInput, { height: 80 }]}
                                    value={plantData.note}
                                    onChangeText={(text) => handleChange('note', text)}
                                    placeholder={plantData.note ? "" : "Nessuna nota"}
                                    multiline
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.infoTitle}>{plantData.nome} - {plantData.specie}</Text>
                                <Text style={styles.infoText}>Data Acquisizione: {plantData.dataAcq.toLocaleDateString()}</Text>
                                <Text style={styles.infoText}>Categoria: {plantData.categoria}</Text>
                                <Text style={styles.infoText}>Ultima innaffiatura: {plantData.ultimaInnaffiatura.toLocaleDateString()}</Text>
                                <Text style={styles.infoText}>Ultima potatura: {plantData.ultimaPotatura.toLocaleDateString()}</Text>
                                <Text style={styles.infoText}>Ultimo rinvaso: {plantData.ultimoRinvaso.toLocaleDateString()}</Text>
                                <Text style={styles.infoText}>Note: {plantData.note || "Nessuna nota"}</Text>
                            </>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    {isEditing ? (
                        <Button 
                            title="Annulla" 
                            onPress={handleCancel}
                            buttonStyle={styles.cancelButton}
                            textStyle={styles.buttonText}
                        />
                    ) : (
                        <Button 
                            title="Elimina" 
                            onPress={() => console.log("Elimina")}
                            buttonStyle={styles.deleteButton}
                            textStyle={styles.buttonText}
                        />
                    )}
                    <Button 
                        title={isEditing ? "Salva" : "Modifica"} 
                        onPress={isEditing ? handleSave : handleEdit}
                        buttonStyle={isEditing ? styles.saveButton : styles.editButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </Background>
    );
}