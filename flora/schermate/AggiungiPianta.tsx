import React, {useEffect, useState} from "react";
import {View, Image, Text, TextInput, TouchableOpacity, ScrollView, Alert} from "react-native";
import Toast from 'react-native-toast-message';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import * as ImagePicker from "expo-image-picker";
import Background from "../components/commons/Background";
import NavBar from "../components/navbar/NavBar";
import Button from "../components/inputs/Button";
import DatePicker from "../components/inputs/DatePicker";
import SinglePicker from "../components/inputs/SinglePicker";
import MultiPicker from "../components/inputs/MultiPicker";
import {ToastShow} from "../components/commons/ToastMessage";
import {PiantaPosseduta} from "../model/PiantaPosseduta";
import * as CategorieDAO from "../database/CategorieDAO";
import * as WikiDAO from "../database/WikiPianteDAO";
import {RigaTabella} from "../database/PiantePosseduteDAO";
import {aggiungiPiantaStyles as styles} from "../styles/aggiungiPianta";
import {customPickerStyles as stylesCustomPicker} from "../styles/customPicker";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function AggiungiPianta({navigation}: Props) {
    const [foto,                 setFoto]                 = useState<any>           (null);
    const [nome,                 setNome]                 = useState<string>        ("");
    const [dataAcq,              setDataAcq]              = useState<Date>          (new Date());
    const [categorieSelezionate, setCategorieSelezionate] = useState<string[]>      ([]);
    const [allCategorie,         setAllCategorie]         = useState<string[]>      ([]);
    const [specie,               setSpecie]               = useState<string>        ("");
    const [specieWiki,           setSpecieWiki]           = useState<string[]>      ([]);
    const [ultimaInnaff,         setUltimaInnaff]         = useState<Date>          (new Date());
    const [ultimaPotat,          setUltimaPotat]          = useState<Date>          (new Date());
    const [ultimoRinv,           setUltimoRinv]           = useState<Date>          (new Date());
    const [note,                 setNote]                 = useState<string>        ("");
    const [catPickerShow,        setCatPickerShow]        = useState<boolean>       (false);
    const [speciePickerShow,     setSpeciePickerShow]     = useState<boolean>       (false);

    useEffect(() => {
        const caricaCategorie = async () => {
            try {
                const nomiCategorie = await CategorieDAO.getAllCategorie();
                setAllCategorie(nomiCategorie);
            } catch (error) {
                console.error("Errore nel caricamento delle categorie:", error);
            }
        };

        caricaCategorie();
    }, []);

    useEffect(() => {
        const caricaWiki = async () => {
            try {
                const wikis = await WikiDAO.getAll();
                const nomiSpecie = wikis.map(s => s.getSpecie());
                setSpecieWiki(nomiSpecie.sort());
            } catch (error) {
                Alert.alert("Errore", "Errore nel caricamento delle specie");
                navigation.navigate('Home');
            }
        };

        caricaWiki();
    }, []);

    const handleSelezionaFoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });
        if (!result.canceled)
            setFoto({uri: result.assets[0].uri});
    };

    useEffect(() => {
        const cambiaMockupFoto = async () => {
            if (!specie || specie.trim() === '') return;
            if (!foto || typeof foto === 'number') {
                const wiki = await WikiDAO.get(specie);
                const nuovaFoto = wiki.getFoto();
                setFoto(nuovaFoto);
            }
        };
        cambiaMockupFoto();
    }, [specie]);

    const handleAnnulla = () => {
        Alert.alert(
            'Vuoi annullare la creazione?',
            'Tutte le modifiche andranno perse',
            [
                {
                    text: 'Conferma',
                    onPress: () => navigation.navigate('Home')
                }
            ],
            {cancelable: true}
        )
    }

    const isBlank = (str: string | null | undefined) :boolean => !str || str.trim() === '';

    const handleAggiungi = async () => {
        if (isBlank(nome) || isBlank(specie)) {
            ToastShow({
                type: "error",
                title: "Errore",
                message: "Il nome e la specie non possono essere vuoti"
            })
            return;
        }

        // Tento di creare la pianta
        try {
            const nuovaPianta: RigaTabella = {
                id: -1,
                nome: nome.trim(),
                specie: specie,
                dataAcq: dataAcq.toISOString(),
                ultimaInnaff: ultimaInnaff.toISOString(),
                ultimaPotat: ultimaPotat.toISOString(),
                ultimoRinv: ultimoRinv.toISOString(),
                note: note,
                foto: foto ?? ""
            };
            await PiantaPosseduta.creaNuova(nuovaPianta);
            navigation.navigate('ListaPiante', {searched: nome});
            Toast.show({
                type: "success",
                text1: "Pianta creata con successo",
                text2: "Prenditi cura della tua nuova pianta di " + specie + "!"
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Background>
            <NavBar/>
            <Text style={styles.titolo}>Aggiungi una nuova pianta</Text>
            <ScrollView contentContainerStyle={styles.form}>
                {/* Foto */}
                <TouchableOpacity
                    style={styles.fotoContainer}
                    onPress={handleSelezionaFoto}
                >
                    {foto ? (
                        <Image
                            source={foto}
                            style={styles.foto}
                            resizeMode="cover"
                        />
                    ) : (
                        <Text style={styles.fotoText}>Foto</Text>
                    )}
                </TouchableOpacity>
                {/* Nome */}
                <TextInput
                    placeholder="Nome"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor={"#888"}
                />
                {/* Acq */}
                <DatePicker
                    label="Data acquisizione"
                    value={dataAcq}
                    onChange={setDataAcq}
                    future={false}
                    buttonStyle={styles.datePicker}
                    textStyle={styles.datePickerText}
                />
                {/* Specie */}
                <SinglePicker
                    value={specie}
                    onValueChange={setSpecie}
                    placeholder="Specie"
                    options={specieWiki}
                    isVisible={speciePickerShow}
                    onClose={() => setSpeciePickerShow(false)}
                    onOpen={() => setSpeciePickerShow(true)}
                    styles={stylesCustomPicker}
                />
                {/* Categorie */}
                <MultiPicker
                    values={categorieSelezionate}
                    onValuesChange={setCategorieSelezionate}
                    placeholder="Categorie"
                    options={allCategorie}
                    isVisible={catPickerShow}
                    onClose={() => setCatPickerShow(false)}
                    onOpen={() => setCatPickerShow(true)}
                    styles={stylesCustomPicker}
                />
                {/* Ultime date */}
                <DatePicker
                    label="Ultima innaffiatura"
                    value={ultimaInnaff}
                    onChange={setUltimaInnaff}
                    minDate={dataAcq}
                    future={false}
                    buttonStyle={styles.datePicker}
                    textStyle={styles.datePickerText}
                />
                <DatePicker
                    label="Ultima potatura"
                    value={ultimaPotat}
                    onChange={setUltimaPotat}
                    minDate={dataAcq}
                    future={false}
                    buttonStyle={styles.datePicker}
                    textStyle={styles.datePickerText}
                />
                <DatePicker
                    label="Ultimo rinvaso"
                    value={ultimoRinv}
                    onChange={setUltimoRinv}
                    minDate={dataAcq}
                    future={false}
                    buttonStyle={styles.datePicker}
                    textStyle={styles.datePickerText}
                />
                {/* Note */}
                <TextInput
                    placeholder="Note"
                    style={styles.input}
                    value={note}
                    onChangeText={setNote}
                    multiline={true}
                    placeholderTextColor="#888"
                />
            </ScrollView>
            <View style={styles.buttons}>
                <Button
                    title="Annulla"
                    onPress={handleAnnulla}
                    buttonStyle={styles.annullaButton}
                    textStyle={styles.buttonText}
                />
                <Button
                    title="Aggiungi"
                    onPress={handleAggiungi}
                    buttonStyle={styles.aggiungiButton}
                    textStyle={styles.buttonText}
                />
            </View>
        </Background>
    )
}