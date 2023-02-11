import { Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getEventData, EventData } from '../../services/EventServices';
import { useEffect, useState } from 'react';
import CalendarMonth from '../../components/Calendar';
import InfoBox from '../../components/InfoBox';
import TextHeader from '../../components/TextHeader';

import BackArrow from '../../components/BackArrow';
import BackgroundBox from '../../components/BackgroundBox';
import TickBox from '../../components/TickBox';
import SmallButton from '../../components/SmallButton';

interface Props {
    question: string,
    onChangeText: () => void,
    onEndEditing: () => void,
    onPress: Function;
    
}

export default function Questions(props: Props) {

    const { question, onChangeText, onEndEditing, onPress } = props;
    return (

        <View>
            <Text>{question}</Text>
            <TextInput
                style={{}}
                onChangeText={onChangeText}

                onEndEditing={onEndEditing}
            />
        </View>



    )

}