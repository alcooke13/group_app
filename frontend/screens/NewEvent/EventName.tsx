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
import Questions from './Questions';
import NewEvent from './NewEvent';



const EventName = ({setEventTitle}) => {
    let titleValue: string;

    const onTitleEnd = () => {
        setEventTitle(titleValue)
    }

    return (
        <>

            <BackgroundBox>
                <View>
                    <Text style={{ fontSize: 24, color: 'black', margin: "10%", textAlign: 'center' }} >
                        What is your events name?
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            titleValue = text;
                        }}
                        onEndEditing={onTitleEnd}
                    />
                    <SmallButton title={"Submit"} onPress={() => {
                        setEventNameKnown(!eventNameKnown)
                    }} ></SmallButton>
                </View>
            </BackgroundBox>
        </>
    );



};

export default EventName;