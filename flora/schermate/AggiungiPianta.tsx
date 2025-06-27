import React, {useEffect, useState} from "react";
import {View, Image, Text, TextInput, TouchableOpacity, ScrollView, Alert} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import * as ImagePicker from "expo-image-picker";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import {aggiungiPiantaStyles as styles} from "../styles/aggiungiPianta";
import {customPickerStyles as stylesCustomPicker} from "../styles/customPicker";
import {select} from "../database/Database";
import CustomPicker from "../components/CustomPicker";


type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function AggiungiPianta({navigation}: Props) {
    const [foto,              setFoto]              = useState<string | null>(null);
    const [nome,              setNome]              = useState("");
    const [dataAcq,           setDataAcq]           = useState(new Date());
    const [categoria,         setCategoria]         = useState("");
    const [categorie, setCategorie] = useState<string[]>([]);

    const [specie,         setSpecie]         = useState("");
    const [specieWiki, setSpecieWiki] = useState<string[]>([]);
    const [ultimaInnaff,      setUltimaInnaff]      = useState(new Date());
    const [ultimaPotat,       setUltimaPotat]       = useState(new Date());
    const [ultimoRinv,        setUltimoRinv]        = useState(new Date());
    const [note,              setNote]              = useState("");

    const [categoriaModalVisible, setCategoriaModalVisible] = useState(false);
    const [specieModalVisible, setSpecieModalVisible] = useState(false);


    useEffect(() => {
        const caricaCategorie = async () => {
            try {
                const risultatoCategorie = await select<{ categoria: string }>("Categoria");
                const nomiCategorie = risultatoCategorie.map(c => c.categoria);

                setCategorie(nomiCategorie.sort());
            } catch (error) {
                console.error("Errore nel caricamento delle categorie:", error);
            }
        };

        const caricaSpecieWiki = async () => {
            try {
                const risultatoSpecie = await select<{ specie: string }>("WikiPiante");
                const nomiSpecieWiki = risultatoSpecie.map(s => s.specie);

                setSpecieWiki(nomiSpecieWiki.sort());
            } catch (error) {
                console.error("Errore nel caricamento delle specie:", error);
            }
        };

        caricaCategorie().catch(error => console.error("Errore nel caricamento delle categorie:", error));
        caricaSpecieWiki().catch(error => console.error("Errore nel caricamento delle Specie:", error));
    }, []);


    const handleSelectPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!nome || !dataAcq) {
            Alert.alert("Errore", "Nome e Data di Acquisizione sono obbligatori")
            return;
        }


        console.log({
            foto,
            nome,
            specie,
            categoria,
            dataAcq,
            ultimaInnaff,
            ultimaPotat,
            ultimoRinv,
            note

        });
        Alert.alert("Successo", "Controlla il log per i dati");
    };

    const handleCancel = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home');
        }
    };


    return (
        <Background>
            <NavBar/>

            <Text style={styles.title}>Aggiungi una nuova pianta</Text>

            <View style={styles.container}>
                <ScrollView style={styles.scrollArea} contentContainerStyle={styles.form}>

                    <TouchableOpacity
                        style={styles.photoBox}
                        onPress={handleSelectPhoto}>
                        {foto ? (
                            <Image
                                source={{uri: foto}}
                                style={styles.photo}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={styles.photoText}>Foto</Text>
                        )}
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Nome"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholderTextColor="#888"/>


                    <CustomPicker
                        value={categoria}
                        onValueChange={setCategoria}
                        options={categorie}
                        placeholder="Seleziona categoria"
                        isVisible={categoriaModalVisible}
                        onClose={() => setCategoriaModalVisible(false)}
                        onOpen={() => setCategoriaModalVisible(true)}
                        styles={stylesCustomPicker}
                    />

                    <CustomPicker
                        value={specie}
                        onValueChange={setSpecie}
                        options={specieWiki}
                        placeholder="Seleziona specie"
                        isVisible={specieModalVisible}
                        onClose={() => setSpecieModalVisible(false)}
                        onOpen={() => setSpecieModalVisible(true)}
                        styles={stylesCustomPicker}
                    />

                    <DatePicker
                        label="Data acquisizione"
                        value={dataAcq}
                        onChange={setDataAcq}
                        future={false}
                        buttonStyle={styles.picker}
                        textStyle={styles.pickerText}

                    />

                    <DatePicker
                        label="Ultima innaffiatura"
                        value={ultimaInnaff}
                        onChange={setUltimaInnaff}
                        future={false}
                        buttonStyle={styles.picker}
                        textStyle={styles.pickerText}
                        minDate={dataAcq} />

                    <DatePicker
                        label="Ultima potatura"
                        value={ultimaPotat}
                        onChange={setUltimaPotat}
                        future={false}
                        buttonStyle={styles.picker}
                        textStyle={styles.pickerText}
                        minDate={dataAcq} />

                    <DatePicker
                        label="Ultimo rinvaso"
                        value={ultimoRinv}
                        onChange={setUltimoRinv}
                        future={false}
                        buttonStyle={styles.picker}
                        textStyle={styles.pickerText}
                        minDate={dataAcq} />

                    <TextInput
                        placeholder="Note"
                        style={styles.input}
                        value={note}
                        onChangeText={setNote}
                        multiline={true}
                        placeholderTextColor="#888"/>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Annulla"
                        onPress={handleCancel}
                        buttonStyle={styles.cancelButton}
                        textStyle={styles.cancelText}/>
                    <Button
                        title="Aggiungi"
                        onPress={handleSubmit}
                        buttonStyle={styles.addButton}
                        textStyle={styles.addText}/>
                </View>
            </View>
        </Background>
    );
}