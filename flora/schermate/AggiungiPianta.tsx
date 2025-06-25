import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Picker } from "@react-native-picker/picker";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { aggiungiPiantaStyles as styles } from "../styles/aggiungiPianta";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function AggiungiPianta({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [specie, setSpecie] = useState("");
  const [dataAcquisizione, setDataAcquisizione] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stato, setStato] = useState("");

  const handleAdd = () => {
    if (!nome || !specie || !dataAcquisizione || !categoria || !stato) {
      Alert.alert("Attenzione", "Compila tutti i campi obbligatori.");
      return;
    }
    navigation.navigate("InfoPianta", {
      plantId: "nuova123",
    });
  };

  const handleCancel = () => {
    navigation.navigate("Home");
  };

  const handleSelectPhoto = () => {
    Alert.alert("Info", "Funzione di caricamento foto non ancora implementata.");
  };

  return (
    <Background>
      <NavBar />

      <Text style={styles.title}>Aggiungi una nuova pianta</Text>

      <View style={styles.container}>
        <ScrollView style={styles.scrollArea} contentContainerStyle={styles.form}>
          <TouchableOpacity style={styles.photoBox} onPress={handleSelectPhoto}>
            <Text style={styles.photoText}>Foto</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nome"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Specie"
            style={styles.input}
            value={specie}
            onChangeText={setSpecie}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Data Acquisizione"
            style={styles.input}
            value={dataAcquisizione}
            onChangeText={setDataAcquisizione}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Categoria"
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
            placeholderTextColor="#888"
          />

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={stato}
              onValueChange={(itemValue) => setStato(itemValue)}
              style={styles.picker}
              dropdownIconColor="#888"
              mode="dropdown"
              itemStyle={{
                color: stato ? "#2E4A2C" : "#888",
                fontSize: 16,
                textAlign: "left",
              }}
            >
              <Picker.Item label="Seleziona stato" value="" color="#888" />
              <Picker.Item label="Sana" value="sana" />
              <Picker.Item label="Da controllare" value="da_controllare" />
              <Picker.Item label="Malata" value="malata" />
            </Picker>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
              title="Annulla"
              onPress={handleCancel}
              buttonStyle={styles.cancelButton}
              textStyle={styles.cancelText}/>
          <Button
              title="Aggiungi"
              onPress={handleAdd}
              buttonStyle={styles.addButton}
              textStyle={styles.addText}/>
        </View>
      </View>
    </Background>
  );
}