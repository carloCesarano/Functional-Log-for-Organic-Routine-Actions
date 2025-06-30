import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from './Button';

type Props = {
    value: string;
    onValueChange: (value: string) => void;
    options: string[];
    placeholder?: string;
    isVisible: boolean;
    onClose: () => void;
    onOpen: () => void;
    styles: any;
};

export default function SinglePicker({value, onValueChange, options, placeholder = "Seleziona un'opzione", isVisible, onClose, onOpen, styles}: Props) {

    return (
        <>
            <TouchableOpacity
                style={styles.input}
                onPress={onOpen}
            >
                <Text
                    style={{ color: value ? "#000" : "#888", marginTop: 13, fontSize: 16}}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {value || placeholder}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Picker
                            selectedValue={value}
                            onValueChange={(itemValue) => {
                                onValueChange(itemValue);
                                onClose();
                            }}
                            style={{width: "100%", height: 150}}
                            itemStyle={{color: 'black', fontSize: 18}}
                        >
                            <Picker.Item label={placeholder} value="" style={{color: "black"}} />
                            {options.map((option, index) => (
                                <Picker.Item key={index} label={option} value={option} style={{color: "black"}} />
                            ))}
                        </Picker>

                        <Button
                            title="Chiudi"
                            onPress={onClose}
                            buttonStyle={styles.modalButton}
                            textStyle={styles.modalButtonText}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}