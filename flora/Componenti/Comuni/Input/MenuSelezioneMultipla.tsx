import React, { useState } from "react";
import { View, ScrollView} from "react-native";
import { CheckBox } from "react-native-elements";
import Button from "./Button";

// Tipi per le opzioni e i menu
type Opzione = { label: string; value: string };
type Menu = { label: string; opzioni: Opzione[] };

interface Props {
    titolo: string; // Testo del pulsante principale
    opzioniMenu: Menu[]; // Array di menu con le relative opzioni
    selezionati: Record<string, string[]>; // Stato delle selezioni per ogni menu
    onCambia: (selezionati: Record<string, string[]>) => void; // Callback al cambio selezione
    stileMenu?: Record<string, any>; // Stili opzionali
}

// COMPONENTE PRINCIPALE DEL MENU DI SELEZIONE MULTIPLA
export default function MenuSelezioneMultipla({titolo, opzioniMenu, selezionati, onCambia, stileMenu }: Props) {
    // HOOKS DI STATO
    const [aperto, setAperto] = useState(false); // Se il menu è aperto
    const [menuAttivo, setMenuAttivo] = useState<string | null>(null); // Quale sottomenu è attivo

    // Funzione per selezionare/deselezionare un'opzione
    const toggleOpzione = (menu: string, value: string) => {
        const attuali = selezionati[menu] || [];
        const nuovo = attuali.includes(value)
            ? attuali.filter(v => v !== value)
            : [...attuali, value];
        onCambia({ ...selezionati, [menu]: nuovo });
    };

    return (
        <>
            {/* Pulsante principale che apre/chiude il menu */}
            <Button
                testo={titolo}
                onPress={() => {
                    setAperto(!aperto);
                    setMenuAttivo(null);
                }}
                stileButton={stileMenu?.button}
                stileTesto={stileMenu?.testo}
            />

            {/* Menu principale */}
            {aperto && !menuAttivo && (
                <View style={[stileMenu?.filterMenu, stileMenu]}>
                    {opzioniMenu.map(menu => (
                        <Button
                            key={menu.label}
                            testo={menu.label}
                            onPress={() => setMenuAttivo(menu.label)}
                            stileButton={stileMenu?.menuButton}
                            stileTesto={stileMenu?.menuButtonText}
                        />
                    ))}
                </View>
            )}

            {/* Sottomenu: mostra le opzioni come checkbox */}
            {aperto && menuAttivo && (
                <ScrollView style={[stileMenu?.filterMenu, stileMenu]}>
                    {opzioniMenu
                        .find(m => m.label === menuAttivo)!
                        .opzioni.map(opzione => (
                            <CheckBox
                                key={opzione.value}
                                title={opzione.label}
                                checked={(selezionati[menuAttivo] || []).includes(opzione.value)}
                                onPress={() => toggleOpzione(menuAttivo, opzione.value)}
                                textStyle={stileMenu?.filterOptionText}
                            />
                        ))}
                    {/* Pulsante per tornare indietro al menu principale */}
                    <Button
                        testo="Indietro"
                        onPress={() => setMenuAttivo(null)}
                        stileButton={stileMenu?.indietroButton}
                        stileTesto={stileMenu?.indietroButtonText}
                    />
                </ScrollView>
            )}
        </>
    );
}