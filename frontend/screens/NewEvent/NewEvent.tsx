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
import EventServices from '../../services/EventServices'


const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };



export default function NewEvent() {
    const [eventNameKnown, setEventNameKnown] = useState<boolean>(false);

    const [showQuestions, setShowQuestions] = useState<boolean>(false);

    const [eventTitle, setEventTitle] = useState('');
    const [questionOrder, setQuestions] = useState<string[]>([]);

    const [dateKnown, setDateKnown] = useState<boolean>(false);
    const [activityKnown, setActivityKnown] = useState<boolean>(false);
    const [locationKnown, setLocationKnown] = useState<boolean>(false);

    const [knownEvent, setKnownEvent] = useState<boolean>(false);
    const [unknownEvent, setUnknownEvent] = useState<boolean>(false);

    const [activeQuestion, setActiveQuestion] = useState<string>("");

    const [counter, setCounter] = useState<number>(0);

    const [dateProvided, setDate] = useState<string>("")
    const [activityProvided, setActivity] = useState<string>("")
    const [locationProvided, setLocation] = useState<string>("")


    // set up useStates for logic flow
    // starts from group page, creates a new event for that group
    
    
    let locationAnswer: string;
    let activityAnswer: string;
    
    
    const onLocationEnd = () => {
        setLocation(locationAnswer)
    }
    const onActivity = () => {
        setActivity(activityAnswer)
    }
    
    
    const onPressYes = () => {
        setKnownEvent(true)
        console.log("You pressed yes!")
    }
    const onPressNo = () => {
        setUnknownEvent(true)
        console.log("You pressed no!")
    }
    
    const UpdateCounter = () => {
        let newCounter = counter;
        newCounter += 1
        setCounter(newCounter)
        setActiveQuestion(questionOrder[counter])
    }
    
    // asks user for title of event
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

    const NewEventQuestions = () => {

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
            const userQuestions: Array<string> = [];

            console.log(questionOrder)

            if (detailsKnownCheck.date) {
                userQuestions.push("date")
            }
            if (detailsKnownCheck.activity) {
                userQuestions.push("activity")
            }
            if (detailsKnownCheck.location) {
                userQuestions.push("location")
            }
            setQuestions(userQuestions)
            setShowQuestions(true);
            setActiveQuestion(questionOrder[0])


            console.log(questionOrder)
            console.log(activeQuestion)
            console.log(questionOrder.includes("date"))
            // setNextPressed(!nextPressed)

        }

        if (showQuestions && eventNameKnown && activeQuestion === "date") {
            let dateAnswer: string;
            const onDateEnd = () => {
                setDate(dateAnswer)
            }


            return (

                <View style={styles.container}>
                    <BackgroundBox >
                        <View>
                            <Text>"What is the date of your event?"</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => {
                                    dateAnswer = text;
                                }}
                                onEndEditing={onDateEnd}
                            />
                        </View>
                    </BackgroundBox>

                    <SmallButton title={"Submit"} onPress={() => {
                        UpdateCounter();
                    }} ></SmallButton>
                </View>
            )

        }
        if (showQuestions && eventNameKnown && activeQuestion === "activity") {
            let activityAnswer: string;
            const onActivityEnd = () => {
                setActivity(activityAnswer)
            }

            return (

                <View style={styles.container}>
                    <BackgroundBox >
                        <View>
                            <Text>"What is the activity of your event?"</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => {
                                    activityAnswer = text;
                                }}
                                onEndEditing={onActivityEnd}
                            />
                        </View>

                    </BackgroundBox>
                    <SmallButton title={"Submit"} onPress={() => {
                        UpdateCounter();
                    }} ></SmallButton>
                </View>


            )



        }
        if (showQuestions && eventNameKnown && activeQuestion === "location") {
            let locationAnswer: string;
            const onLocationEnd = () => {
                setLocation(locationAnswer)
                console.log(locationProvided)
            }

            return (

                <View style={styles.container}>
                    <BackgroundBox >
                        <View>
                            <Text>"What is the location of your event?"</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => {
                                    locationAnswer = text;
                                }}
                                onEndEditing={onLocationEnd}
                            />
                            <SmallButton title={"Submit"} onPress={() => {
                                UpdateCounter();
                            }} ></SmallButton>
                        </View>

                    </BackgroundBox>
                    <SmallButton title={"Submit"} onPress={() => {
                        UpdateCounter();
                    }} ></SmallButton>
                </View>
            )

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


        if (!knownEvent && !unknownEvent) {


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
            <Text>Workflow Complete</Text>
        )




    }

   
    // starts from group page, creates a new event for that group
    // asks user for title of event
    return (
        <>
            <View>
               
                    {!eventNameKnown ? <EventName /> : <></>}
                    <NewEventQuestions></NewEventQuestions>
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
        justifyContent: 'center'
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


