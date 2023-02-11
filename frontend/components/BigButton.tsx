import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
    title: string;
    onPress?: () => void;
    style?: any;
}

const BigButton = (props: Props) => {

    const {title, onPress} = props;

    return (
        <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#25E698',
        borderWidth: 1,
        borderRadius: 5,
        borderColor:'#218059',
        width: 140,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent:'center'

    },
    text: {
        alignItems: 'center',
        fontSize: 20,
        borderRadius: 5,
    }
});

export default BigButton;