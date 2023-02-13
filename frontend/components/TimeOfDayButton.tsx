import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
    timeOfDayOption: string;
    onPress: () => void;
    backgroundColor: string;
}

const TimeOfDayButton = (props: Props) => {
    const {timeOfDayOption, onPress} = props;
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: '#E0E1F0',
            borderWidth: 1,
            borderRadius: 10,
            borderColor:'#25242B',
            width: 333,
            height: 72,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent:'center',
            shadowColor: '#171717',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.25,
            shadowRadius: 2,
            marginBottom:15,
            marginTop:15
        }}
        >
        <Text style={styles.text }>{timeOfDayOption}
            </Text>
            </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create ({
      
        text: {
            alignItems: 'center',
            fontSize: 20,
            borderRadius: 5,
        }
    })
    export default TimeOfDayButton;
