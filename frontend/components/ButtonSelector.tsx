import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
    option: string;
    onPress: () => void;
    selected: boolean;
}

const ButtonSelector = (props: Props) => {
    const {option, onPress, selected} = props;
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[styles.container, selected ? styles.selected:styles.container]}
        >
            <Text style={styles.text }>{option}</Text>
        </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create ({
        container:{
            backgroundColor: '#E0E1F0',
            borderWidth: 1,
            borderRadius: 10,
            borderColor:'#25242B',
            width: '90%',
            height: 42,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent:'center',
            shadowColor: '#171717',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.25,
            shadowRadius: 2,
            margin: 5,
        },
        text: {
            alignItems: 'center',
            fontSize: 18,
            borderRadius: 5,
            fontFamily: 'Ubuntu-Regular'
        },
        selected: {
            backgroundColor: '#FF914D',
        }
    })
    export default ButtonSelector;
