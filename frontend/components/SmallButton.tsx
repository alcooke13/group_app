import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
    title: string;
    onPress: () => void;
}

const SmallButton = (props: Props) => {
    const {title, onPress} = props;
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{...styles.container}}
        >
        <Text style={{...styles.text }}> {title}
            </Text>
            </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create ({
        container:{
            backgroundColor: '#25E698',
            borderWidth: 1,
            borderRadius: 5,
            borderColor:'#218059',
            width: 106,
            height: 33,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent:'center'

        },
        text: {
            alignItems: 'center',
            fontSize: 16,
            borderRadius: 5,
        }
    })
    SmallButton.defaultProps = {
        width: 106,
        height: 33,
        margin:5,
    }

    export default SmallButton;
