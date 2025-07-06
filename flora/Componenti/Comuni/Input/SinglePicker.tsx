import {Modal, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import Button from "./Button";
import {styles} from "../../../Styles/SinglePicker";

interface Props {
    valore: string,
    onCambio: (value: string) => void,
    opzioni: string[],
    placeholder?: string
}

export default function (props: Props) {
    // VARIABILI DI STATO
    const {valore, onCambio, opzioni, placeholder} = props;
    const [visibile, setVisibile] = useState<boolean>(false);

    return (
        <>
             {/* Pulsante per aprire il selettore */}
             <TouchableOpacity
                 style={styles.pulsanteApertura}
                 onPress={() => setVisibile(true)}>

                 <Text
                     style={{ color: valore ? '#000' : '#888', marginTop: 13, fontSize: 16}}
                     numberOfLines={1}
                     ellipsizeMode='tail'>

                     {valore || placeholder}
                 </Text>

             </TouchableOpacity>

             {/* Selettore */}
            <Modal
                visible={visibile}
                transparent={true}
                animationType='slide'>

                <View
                    style={styles.modal}>

                    <Picker
                        selectedValue={valore}
                        onValueChange={v => {onCambio(v); setVisibile(false)}}
                        style={styles.picker}
                        itemStyle={{color: 'black', fontSize: 18}}>

                        <Picker.Item label={placeholder} value='' style={styles.pickerItem}/>
                        {opzioni.map((opz, index) => (
                            <Picker.Item key={index} label={opz} value={opz} style={styles.pickerItem}/>
                        ))}

                    </Picker>

                    <Button
                        testo='Chiudi'
                        stileButton={styles.chiudiButton}
                        stileTesto={styles.chiudiText}
                        onPress={() => setVisibile(false)}/>
                </View>

            </Modal>

        </>
    )
}