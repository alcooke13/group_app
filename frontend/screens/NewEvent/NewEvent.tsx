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


const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };

export default function NewEvent() {


    // set up useStates for logic flow
    const [eventNameKnown, setEventNameKnown] = useState(false);

    const [showQuestions, setShowQuestions] = useState(false);

    const [eventTitle, setEventTitle] = useState('');
    const [title, onChangeTitle] = useState('');

    const [dateKnown, setDateKnown] = useState(false);
    const [activityKnown, setActivityKnown] = useState(false);
    const [locationKnown, setLocationKnown] = useState(false);

    const [knownEvent, setKnownEvent] = useState(false);
    const [unknownEvent, setUnknownEvent] = useState(false);

    const [activeQuestion, setActiveQuestion] = useState(0);

    const [counter, setCounter] = useState(0);

    const [dateProvided, setDate] = useState("")
    const [activityProvided, setActivity] = useState("")
    const [locationProvided, setLocation] = useState("")


    const questionOrder : Array<string> = [];
    const onPressYes = () => {
        setKnownEvent(true)
        console.log("You pressed yes!")
    }
    const onPressNo = () => {
        setUnknownEvent(true)
        console.log("You pressed no!")
    }

    const EventName = () => {
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

    const CheckDetailsKnown = () => {
        
        const onDateTickBoxPress = () => {
            detailsKnownCheck.date = !detailsKnownCheck.date
            setDateKnown(!dateKnown);

        }
        const onActivityTickBoxPress = () => {
            detailsKnownCheck.activity = !detailsKnownCheck.activity
            setActivityKnown(!activityKnown);

        }
        const onLocationTickBoxPress = () => {
            detailsKnownCheck.location = !detailsKnownCheck.location
            setLocationKnown(!locationKnown);

        }

        const onKnownQuestionCheck = () => {
            

            console.log(questionOrder)

            questionOrder.splice(0,questionOrder.length)
            if (detailsKnownCheck.date) {
                questionOrder.push("date")
            }
            if (detailsKnownCheck.activity) {
                questionOrder.push("activity")
            }
            if (detailsKnownCheck.location) {
                questionOrder.push("location")
            }
            setShowQuestions(true);


            console.log(questionOrder)
            // setNextPressed(!nextPressed)

        }


        if (knownEvent) {


            return (
                <View>
                    <BackgroundBox>
                        <View>
                            <Text>Known Event</Text>

                            <TickBox value={dateKnown} onPress={onDateTickBoxPress}></TickBox>
                            <TickBox value={activityKnown} onPress={onActivityTickBoxPress}></TickBox>
                            <TickBox value={locationKnown} onPress={onLocationTickBoxPress}></TickBox>

                        </View>
                    </BackgroundBox>
                    <SmallButton title={"Next"} onPress={onKnownQuestionCheck} ></SmallButton>

                </View>
            )
        }

        if (unknownEvent) {

            return (
                <Text>Unknown Event</Text>
            )
        }



        const updateCounter = () => {
            let newCounter = counter;
            if (counter < questionOrder.length) {
                newCounter += 1
                setCounter(newCounter)


            }
        }
        let dateAnswer: string;
        let locationAnswer: string;
        let activityAnswer: string;

        const onLocationEnd= () => {
            setLocation(locationAnswer)
        } 
        const onDateEnd = () => {
            setDate(dateAnswer)
        } 
        const onActivityEnd = () => {
            setActivity(activityAnswer)
        }


        const DateQuestion = () => {
            return (
                <View>
                    <Text>"What is the date of your event?"</Text>
                    <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                dateAnswer = text;
                            }}
                            onEndEditing={onDateEnd}
                        />
                        <SmallButton title={"Submit"} onPress={() => {
                            // setEventNameKnown(!eventNameKnown)
                        }} ></SmallButton>
                </View>
            )
        }
        const LocationQuestion = () => {
            return (
                <View>
                    <Text>"What is the location of your event?"</Text>
                    <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                locationAnswer = text;
                            }}
                            onEndEditing={onDateEnd}
                        />
                        <SmallButton title={"Submit"} onPress={() => {
                            // setEventNameKnown(!eventNameKnown)
                        }} ></SmallButton>
                </View>
            )
        }
        const ActivityQuestion = () => {
            return (
                <View>
                    <Text>"What is the activity of your event?"</Text>
                    <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                activityAnswer = text;
                            }}
                            onEndEditing={onActivityEnd}
                        />
                        <SmallButton title={"Submit"} onPress={() => {
                            // setEventNameKnown(!eventNameKnown)
                        }} ></SmallButton>
                </View>
            )
        }


        if (showQuestions && knownEvent) {



            return (
                <>
                    <BackgroundBox width={'90%'}>


                        <View style={styles.container}>
                        { dateProvided != "" && questionOrder.includes("date") ? <DateQuestion/> : <></> }
                        { activityProvided != "" && questionOrder.includes("activity") ? <ActivityQuestion/> : <></> }
                        { locationProvided != "" && questionOrder.includes("location") ? <LocationQuestion/> : <></> }
                        </View>
                    </BackgroundBox>
                    <SmallButton title={"Submit"} onPress={() => {

                    }} ></SmallButton>
                </>



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






    // set up question database
    // starts from group page, creates a new event for that group
    // asks user for title of event
    return (
        <>
            <View>
                <>
                    {!eventNameKnown ? <EventName /> : <CheckDetailsKnown />}
                </>
            </View>

        </>
    )
    // create new event to post to database. Request event name and make post


    // Ask user if they know details or not

    // if details are known, show tickboxes

    // from tickboxes show relevant questions, be able to go back and change response

    // if details are not known goes to event page 



}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
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


