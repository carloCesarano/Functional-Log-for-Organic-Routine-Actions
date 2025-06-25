import React, {useState} from "react";
import {Platform, StyleProp, TextStyle, ViewStyle} from "react-native";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import Button from "./Button";

interface Props {
    value        : Date;
    onChange     : (date: Date) => void;
    label       ?: string;
    mode        ?: "date" | "time";
    future      ?: boolean;
    minDate     ?: Date;
    buttonStyle ?: StyleProp<ViewStyle>;
    textStyle   ?: StyleProp<TextStyle>;
}

export default function DatePicker({value, onChange, label, mode = "date", future = true, minDate, buttonStyle, textStyle} : Props) {
    const [show, setShow] = useState(false);

    const handleChange = (_event: DateTimePickerEvent, nuovaData?: Date) : void => {
        setShow(Platform.OS === "ios");
        if (nuovaData) onChange(nuovaData);
    };

    const formatDate = (date: Date) =>
        date.toLocaleDateString("it-IT", {day: "2-digit", month: "2-digit", year: "2-digit"});

    return (
        <>
            <Button
                title={label ? `${label}: ${formatDate(value)}` : formatDate(value)}
                onPress={() => setShow(true)}
                buttonStyle={buttonStyle}
                textStyle={textStyle} />
            {show && (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    onChange={handleChange}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={future ? undefined : new Date()}
                    minimumDate={minDate}
                />
            )}
        </>
    );
}