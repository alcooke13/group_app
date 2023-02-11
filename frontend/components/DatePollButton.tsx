import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
    dateOption: string;
    onPress: Function;
    votedOn: boolean;
}

const DatePollButton = (props: Props) => {
    const {dateOption, onPress, votedOn} = props;
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[styles.container, votedOn ? styles.votedOn:styles.container]}
        >
        <Text style={styles.text }>{dateOption}
            </Text>
            </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create ({
        container:{
            backgroundColor: '#E0E1F0',
            borderWidth: 1,
            borderRadius: 10,
            borderColor:'#25242B',
            width: 262,
            height: 42,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent:'center',
            shadowColor: '#171717',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.25,
            shadowRadius: 2,
            marginBottom:5,
            marginTop:5
        },
        text: {
            alignItems: 'center',
            fontSize: 20,
            borderRadius: 5,
        },
        votedOn: {
            backgroundColor: '#FF914D',
        }
    })
    export default DatePollButton;
