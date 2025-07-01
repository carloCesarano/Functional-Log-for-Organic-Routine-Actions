import React from 'react';
import {TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {styles} from '../../../Styles/Button';

interface Props {
    testo: string;
    onPress ?: () => void;
    stileButton ?: StyleProp<ViewStyle>;
    stileTesto ?: StyleProp<TextStyle>
}

export default function Button(props: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, props.stileButton]}
            onPress={props.onPress}>

            <Text
                style={[styles.testo, props.stileTesto]}
                numberOfLines={1}
                ellipsizeMode="tail">

                {props.testo}
            </Text>

        </TouchableOpacity>
    )
}