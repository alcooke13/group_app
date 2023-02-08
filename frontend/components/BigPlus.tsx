import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    onPress?: () => void;
}

const BigPlus = (props: Props) => {

    const {onPress} = props;

    return (
        <TouchableOpacity
        onPress={onPress}
        >
            <Ionicons 
            name="add-circle-sharp" 
            size={60} 
            color="#25E698"
            />
        </TouchableOpacity>
    );
};

export default BigPlus;
