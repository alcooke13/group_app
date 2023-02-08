import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    onPress?: () => void;
}

const XButton = (props: Props) => {

    const {onPress} = props;

    return (
        <TouchableOpacity
        onPress={onPress}
        >
        <Ionicons name="ios-close-sharp" size={24} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

export default XButton;