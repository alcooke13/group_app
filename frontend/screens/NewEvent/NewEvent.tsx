import { Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getEventData, EventData } from '../../services/EventServices';
import { useEffect, useState } from 'react';

import BackArrow from '../../components/BackArrow';
import BackgroundBox from '../../components/BackgroundBox';
import TickBox from '../../components/TickBox';
import SmallButton from '../../components/SmallButton';
// import EventServices from '../../services/EventServices'


// const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };



export default function NewEvent() {
    const [eventNameKnown, setEventNameKnown] = useState<boolean>(false);


    const [eventTitle, setEventTitle] = useState('');
    const [knownEvent, setKnownEvent] = useState<boolean>(false);
    const [unknownEvent, setUnknownEvent] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [detailsKnown, updateDetailsKnown] = useState<{ [key: string]: boolean }>({ 'date': false, 'activity': false, 'location': false })
    const [questionOrder, setQuestions] = useState<string[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<string>("");
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    const [dateProvided, setDate] = useState<string>("")
    const [activityProvided, setActivity] = useState<string>("")
    const [locationProvided, setLocation] = useState<string>("")
    const [review, setReview] = useState<boolean>(false)
    const [currentStage, updateStage] = useState<string>("Event Name")

    useEffect(() => {
        
    }, []);


    // set up useStates for logic flow
    // starts from group page, creates a new event for that group

    const onDetailTickBoxPress = (detailType: string) => {
        const newDetailsKnown: { [key: string]: boolean } = { ...detailsKnown }
        newDetailsKnown[detailType] = !detailsKnown[detailType]
        updateDetailsKnown(newDetailsKnown);
        console.log(detailsKnown)
    }

    function StageController() {

        switch (currentStage) {
            case "Event Name":
                updateStage("Details Known");
                break;
            case "Details Known": case "Date Input": case "Activity Input": case "Location Input":
                if (detailsKnown.date) {
                    updateStage("Date Input");
                    onDetailTickBoxPress("date");
                    console.log(detailsKnown)
                    break;
                } else if (detailsKnown.location) {
                    updateStage("Location Input");
                    onDetailTickBoxPress("location");
                    break;
                } else if (detailsKnown.activity) {
                    updateStage("Activity Input");
                    onDetailTickBoxPress("activity");
                    break;
                } else {
                    updateStage("Review");
                    break;
                }

            case "Review":
                if (!review) {
                    updateStage("Event name");
                    setDate("");
                    setActivity("");
                    setLocation("");
                    break;
                } else {
                    // go to group
                }

        }



    }


    // Step 1: Ask user for the Events name
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
                            StageController()
                        }} ></SmallButton>
                    </View>
                </BackgroundBox>
            </>
        );



    };


    // Step 2: Get the known details of the event
    function KnownDetails() {
        return (
            <>
                <BackgroundBox>
                    <View>
                        <View>
                            <Text style={{ fontSize: 24, alignSelf: 'center', width: '80%', padding: 15 }} >Select what you know:</Text>
                        </View>

                        <View style={styles.checkBoxParent}>
                            <Text style={styles.checkboxText}>Date</Text>
                            <TickBox value={detailsKnown.date} onPress={() => { onDetailTickBoxPress("date") }}></TickBox>
                        </View>
                        <View style={styles.checkBoxParent}>
                            <Text style={styles.checkboxText} >Activity</Text>
                            <TickBox value={detailsKnown.activity} onPress={() => onDetailTickBoxPress("activity")}></TickBox>
                        </View>
                        <View style={styles.checkBoxParent} >
                            <Text style={styles.checkboxText} >Location</Text>
                            <TickBox value={detailsKnown.location} onPress={() => { onDetailTickBoxPress("location") }}></TickBox>
                        </View>

                    </View>
                </BackgroundBox>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}>
                    <SmallButton title={"Next"} onPress={() => {
                        StageController();


                    }} ></SmallButton>
                </View>

            </>
        )
    }


    function DateQuestion() {
        let dateAnswer: string;
        const onDateEnd = () => {
            setDate(dateAnswer)
        }


        return (

            <View>
                <BackgroundBox >
                    <View>
                        <Text style={styles.questionTitle} >What is the date of your event?</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                dateAnswer = text;
                            }}
                            onEndEditing={onDateEnd}
                        />
                    </View>
                </BackgroundBox>
                <View>
                    <SmallButton title={"Submit"} onPress={() => {
                        StageController()
                    }} ></SmallButton>

                </View>

            </View>
        )

    }


    function ActivityQuestion() {
        let activityAnswer: string;
        const onActivityEnd = () => {
            setActivity(activityAnswer)
        }

        return (

            <View style={styles.container}>
                <BackgroundBox >
                    <View>
                        <Text style={{ padding: 15 }}>What is the activity of your event?</Text>
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
                    StageController()
                }} ></SmallButton>
            </View>
        )


    }


    function LocationQuestion() {
        let locationAnswer: string;
        const onLocationEnd = () => {
            setLocation(locationAnswer)
        }

        return (

            <View style={styles.container}>
                <BackgroundBox >
                    <View>
                        <Text > What is the location of your event?</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                locationAnswer = text;
                            }}
                            onEndEditing={onLocationEnd}
                        />

                    </View>

                </BackgroundBox>
                <SmallButton title={"Submit"} onPress={() => {
                    StageController()
                }} ></SmallButton>
            </View>
        )

    }


    function Review() {

        return (
            <BackgroundBox>

                <Text>Review</Text>

            </BackgroundBox>
        )
    }


    return (
        <>
            {currentStage === "Event Name" ? <EventName></EventName> : ""}
            {currentStage === "Details Known" ? <KnownDetails></KnownDetails> : ""}
            {currentStage === "Date Input" ? <DateQuestion></DateQuestion> : ""}
            {currentStage === "Activity Input" ? <ActivityQuestion></ActivityQuestion> : ""}
            {currentStage === "Location Input" ? <LocationQuestion></LocationQuestion> : ""}
            {currentStage === "Review" ? <Review></Review> : ""}
        </>
    )

}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center'
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
    },
    checkBoxParent: {
        flexDirection: 'row',
        padding: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkboxText: {
        fontSize: 24,
        // paddingLeft: "10%"
    },
    questionTitle: {
        fontSize: 24,
        padding: 15,
    }

});


