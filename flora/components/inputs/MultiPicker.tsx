import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import Button from "./Button";

type Props = {
    values: string[];
    onValuesChange: (values: string[]) => void;
    options: string[];
    placeholder?: string;
    isVisible: boolean;
    onClose: () => void;
    onOpen: () => void;
    styles: any
};

export default function MultiPicker({
    values,
    onValuesChange,
    options,
    placeholder,
    isVisible,
    onClose,
    onOpen,
    styles }: Props) {

    const toggleSelezionato = (option: string) => {
        const newValues = values.includes(option)
            ? values.filter(v => v !== option)
            : [...values, option].sort();
        onValuesChange(newValues);
    }

    return (
        <>
            <TouchableOpacity style={styles.input} onPress={onOpen}>
                <Text
                    style={{ color: values.length ? "#000" : "#888", marginTop: 13, fontSize: 16 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {values.length ? values.join(', ') : placeholder}
                </Text>
            </TouchableOpacity>

            <Modal visible={isVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {options.map((option, index) => (
                                <CheckBox
                                    key={index}
                                    title={option}
                                    checked={values.includes(option)}
                                    onPress={() => toggleSelezionato(option)}
                                />
                            ))}
                        </ScrollView>

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
    )
}