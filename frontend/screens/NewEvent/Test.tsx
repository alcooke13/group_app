const eventCheckList = () => {
    return (
        <View>
            <Text> Checklist for new event with known details</Text>
        </View>
    )
}
const dateSelection = () => {
    return (
        <View>
            <Text> date input </Text>
        </View>
    )
}
const activitySelection = () => {
    return (
        <View>
            <Text> activity input </Text>
        </View>
    )
}
const locationSelection = () => {
    return (
        <View>
            <Text> location input </Text>
        </View>
    )
}
const landingPage = () => {
    return (
        <View>
            <Text style={styles.title}>Do you know the event details?</Text>
            <View style={styles.buttonsParent}>
                <View style={styles.buttons} >
                    <SmallButton title={"Yes"} onPress={onPressYes} ></SmallButton>
                </View>
                <View style={styles.buttons}>
                    <SmallButton title={"No"} onPress={onPressNo} ></SmallButton>
                </View>
            </View>
        </View>
    )
}



// Old code


import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
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


// interface Props {
//     knowsDetails: boolean,
//     knowsDate: boolean,
//     knowsLocation: boolean,
//     knowsActivity: boolean
// }
const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };
let questionOrder: string[] = [];
export default function NewEvent() {
    const detailsKnownInfo: { [key: string]: string } = {};

    const [knownEvent, setKnownEvent] = useState(false);
    const [unknownEvent, setUnknownEvent] = useState(false);
    const [nextPressed, setNextPressed] = useState(false);
    const [dateKnown, setDateKnown] = useState(false);
    const [activityKnown, setActivityKnown] = useState(false);
    const [locationKnown, setLocationKnown] = useState(false);

    const [counter, setCounter] = useState(0);


    // On press of button, it will render a question based on the ones ticked off. If the all three are known then each question will show up 


    // button on press
    const onPressYes = () => {
        setKnownEvent(true)
        console.log("You pressed yes!")
    }
    const onPressNo = () => {
        setUnknownEvent(true)
        console.log("You pressed no!")
    }
    const counterUpdate = () => {
        if (counter < questionOrder.length) {
            let newCounter = counter;
            newCounter += 1;
            setCounter(newCounter)
        }
        console.log("counter:" + counter)

    }
    const onDateQuestionSubmit = () => {


    }
    const onActivityQuestionSubmit = () => {


    }
    const onLocationQuestionSubmit = () => {


    }

    // tick box on press


    const onNextButtonPress = () => {
        questionOrder.splice(0, questionOrder.length)
        if (detailsKnownCheck.date) {
            questionOrder.push("date")
        }
        if (detailsKnownCheck.activity) {
            questionOrder.push("activity")
        }
        if (detailsKnownCheck.location) {
            questionOrder.push("location")
        }
        console.log(questionOrder)
        setNextPressed(!nextPressed)

    }

    const onDateTickBoxPress = () => {
        detailsKnownCheck.date = !detailsKnownCheck.date
        setDateKnown(!dateKnown);
        console.log(detailsKnownCheck)
    }
    const onActivityTickBoxPress = () => {
        detailsKnownCheck.activity = !detailsKnownCheck.activity
        setActivityKnown(!activityKnown);
    }
    const onLocationTickBoxPress = () => {

        detailsKnownCheck.location = !detailsKnownCheck.location
        setLocationKnown(!locationKnown);
        console.log(detailsKnownCheck)
    }

    function CheckDetails() {
        if (knownEvent && !nextPressed) {
            return (

                <>
                    <BackgroundBox width={'90%'}>
                        <View style={styles.container}>
                            <Text> Select what you know:</Text>
                            <View>
                                <TickBox value={dateKnown} onPress={onDateTickBoxPress}></TickBox>
                                <TickBox value={activityKnown} onPress={onActivityTickBoxPress}></TickBox>
                                <TickBox value={locationKnown} onPress={onLocationTickBoxPress}></TickBox>
                                <SmallButton title={"Next"} onPress={onNextButtonPress} ></SmallButton>
                            </View>

                        </View>

                    </BackgroundBox>

                </>


            )
        }
        else if (knownEvent && nextPressed) {
            if (counter === 0 ) {
                return (
                    <>
                        <BackgroundBox width={'90%'}>
                            <View style={styles.container}>
                                <Text> What is the date of your event? </Text>
                            </View>
                        </BackgroundBox>
                        <SmallButton title={"Submit"} onPress={() => counterUpdate} ></SmallButton>

                    </>
                )
            }
            if (counter === 1) {
                return (
                    <>
                        <BackgroundBox width={'90%'}>
                            <View style={styles.container}>
                                <Text> What is the activity? </Text>
                            </View>
                        </BackgroundBox>
                        <SmallButton title={"Next"} onPress={counterUpdate} ></SmallButton>
                    </>
                )
            }
            if (counter === 2) {
                return (
                    <>
                        <BackgroundBox width={'90%'}>
                            <View style={styles.container}>
                                <Text> Where is the location? </Text>
                            </View>
                        </BackgroundBox>
                        <SmallButton title={"Next"} onPress={counterUpdate} ></SmallButton>
                    </>
                )
            }


        }
        else if (unknownEvent) {
            return (

                <Text> unknown event</Text>

            )

        }
        return (

            <BackgroundBox width={'90%'}>


                <View style={styles.container}>
                    <Text style={styles.title}>Do you know the event details?</Text>
                    <View style={styles.buttonsParent}>
                        <View style={styles.buttons} >
                            <SmallButton title={"Yes"} onPress={onPressYes} ></SmallButton>
                        </View>
                        <View style={styles.buttons}>
                            <SmallButton title={"No"} onPress={onPressNo} ></SmallButton>
                        </View>
                    </View>
                </View>
            </BackgroundBox>
        )
    }

    return (
        <View>

            <CheckDetails></CheckDetails>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: 'black',
        margin: "10%",
        textAlign: 'center'
    },
    buttonsParent: {
        flex: 1,
        flexDirection: 'row',

    },
    buttons: {
        padding: 15
    }

});