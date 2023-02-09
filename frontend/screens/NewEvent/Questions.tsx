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
    children: any
}

export default function Questions(props: Props) {

    const {updateCounter}= props; 

    const getQuestion = (questionType: string) => {
        let question: string;
        switch (questionType) {
            case "date":
                question = "What is the date of your event?"
                break;
            case "activity":
                question = "What is the events activity?"
                break;
            case "location":
                question = "Where is the events location?"
                break;

        }
    }

    updateCounter()

    return (
        <>

            {/* {questions[randIndex[qTracker]].answerOptions.map((option, index) => {
                return (

                    <button key={index} onClick={() => {
                        handleClick(option.isTrue)
                    }}>
                        {option.option}
                    </button>
                )
            }
            )} */}
        </>
    )

}