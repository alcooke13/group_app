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
import LineBreak from '../../components/LineBreak';
import { postEvent } from '../../services/EventServices';
import CalendarNewEvent from '../../components/CalendarNewEvent';
import InfoBox from '../../components/InfoBox';
import MenuText from '../../components/MenuText';
import TimeOfDayButton from '../../components/TimeOfDayButton';

// const detailsKnownCheck: { [key: string]: boolean } = { 'date': false, 'activity': false, 'location': false };

export interface GroupInfoProps {
    singleGroupId: string;
    singleGroupName: string;
    setState: React.Dispatch<React.SetStateAction<string>>;

}

export default function NewEvent(props: GroupInfoProps) {
    const { singleGroupId, singleGroupName, setState } = props;

    const [dateQuestionStage, setDateQuestionStage] = useState('calendar');
    const [eventTitle, setEventTitle] = useState('');
    const [detailsKnown, updateDetailsKnown] = useState<{ [key: string]: boolean }>({ 'date': false, 'activity': false, 'location': false })
    const [dateProvided, setDate] = useState<string>("")
    const [calendarDateProvided, setCalendarDate] = useState<string>("")
    const [timeProvided, setTime] = useState<string>("")
    const [activityProvided, setActivity] = useState<string>("")
    const [locationProvided, setLocation] = useState<string>("")
    const [review, setReview] = useState<boolean>(false)
    const [currentStage, updateStage] = useState<string>("Event Name")
    const [bundle, setBundle] = useState<EventData>()

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
                console.log(eventTitle)
                if (detailsKnown.date) {
                    updateStage("Date Input");
                    onDetailTickBoxPress("date");
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
                    setDate("");
                    setActivity("");
                    setLocation("");
                    setCalendarDate("");
                    setTime("");
                    updateStage("Event name");
                    break;
                }
                else {

                    // go to group
                }
        }

    }

    function goBackToSingleGroupView() {
        setDate("");
        setActivity("");
        setLocation("");
        setState("Single Group")
    }

    function goBackToEventName() {
        setDate("");
        setActivity("");
        setLocation("");
        setEventTitle("");
        updateStage("Event Name")
    }

    function goBackToDetalsKnown() {
        updateStage("Details Known")
    }


    // Step 1: Ask user for the Events name
    const EventName = () => {
        let titleValue: string;
        const onEventTitleEnd = () => {
            setEventTitle(titleValue)
        }
        return (


            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.2, justifyContent: 'flex-start' }}>
                        <BackArrow onPress={() => { goBackToSingleGroupView() }}></BackArrow>
                    </View>
                    <View style={{ flex: 0.8, alignItems: 'center' }}>
                        <View style={{ marginVertical: '20%' }}>

                            <BackgroundBox boxHeight={250} >
                                <View>
                                    <Text style={{ fontSize: 24, color: 'black', margin: "10%", textAlign: 'center' }} >
                                        What is your events name?
                                    </Text>
                                    <View>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={(eventTitleText: string) => {
                                                titleValue = eventTitleText;
                                            }}
                                            onEndEditing={() => { onEventTitleEnd() }}
                                        />
                                    </View>
                                </View>
                            </BackgroundBox>
                        </View>
                        <View style={styles.buttonParent}>

                            <SmallButton title={"Submit"} onPress={() => {
                                if (!titleValue) {
                                    alert('Please enter an event name');
                                }
                                else {
                                    setEventTitle(titleValue)
                                    StageController()
                                }
                            }} ></SmallButton>

                            </View>
                        </View>

                    </View>
            </SafeAreaView> );
    };


    // Step 2: Get the known details of the event
    function KnownDetails() {
        return (

            <SafeAreaView style={{ justifyContent: 'space-between' }}>

                <View style={{ flex: 0.15, justifyContent: 'flex-start', marginLeft: -20 }} >
                    <BackArrow onPress={() => { goBackToEventName() }}></BackArrow>

                </View>

                <View style={{ flex: 0.85 }}>
                    <BackgroundBox boxHeight='75%' boxWidth={'100%'} >
                        <View>
                     
                            <View>
                                <Text style={{ fontSize: 24, alignSelf: 'center', padding: 15, marginTop: 15, marginHorizontal: 30 }} >Select what you know</Text>
                            </View>

                            <View style={styles.checkBoxParent}>
                                <Text style={styles.checkboxText}>Date</Text>
                                <TickBox value={detailsKnown.date} onPress={() => { onDetailTickBoxPress("date") }}></TickBox>
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <LineBreak></LineBreak>
                            </View>
                            <View style={styles.checkBoxParent}>
                                <Text style={styles.checkboxText} >Activity</Text>
                                <TickBox value={detailsKnown.activity} onPress={() => onDetailTickBoxPress("activity")}></TickBox>
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <LineBreak></LineBreak>
                            </View>
                            <View style={styles.checkBoxParent} >
                                <Text style={styles.checkboxText} >Location</Text>
                                <TickBox value={detailsKnown.location} onPress={() => { onDetailTickBoxPress("location") }}></TickBox>
                            </View>

                        </View>
                    </BackgroundBox>
                    <View style={styles.buttonParent}>
                        <SmallButton title={"Next"} onPress={() => {
                            setActivity("")
                            setLocation("")
                            setDate("")
                            StageController();

                        }} ></SmallButton>
                    </View>

                </View>

            </SafeAreaView>

        )
    }


    function CalendarViewDateQuestion() {
        let dateAnswer: string;
        const onDateEnd = () => {
        }
        const changeViewToDay = () => {
            setDateQuestionStage("dayView")
        }
        return (

            <SafeAreaView style={{ justifyContent: 'space-between' }}>
                <View style={{ flex: 0.15, justifyContent: 'flex-start' }} >
                    <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>

                </View>


                <View style={{ flex: 0.85, alignItems: 'center' }}>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            padding: 15,
                            textAlign: 'center',
                            color: '#FF914D'
                        }}>What is the date of your event?</Text>
                    </View>
                    <InfoBox header={"Calendar"} >
                        <CalendarNewEvent
                            onPress={changeViewToDay}
                            setSavedDate={setCalendarDate}
                            changeViewToDay={changeViewToDay}
                        ></CalendarNewEvent>
                    </InfoBox>
                </View>
            </SafeAreaView>
        )

    }

    function DayViewDateQuestion() {
        return (

            <SafeAreaView>
                <View style={{ flex: 0.15, justifyContent: 'flex-start' }}>
                    <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>

                </View>
                <View style={{ flex: 0.85, justifyContent: 'space-around' }} >
                    <View style={{ alignSelf: 'center' }}>
                        <MenuText>Date Poll</MenuText>
                    </View>
                    <View>
                        <TimeOfDayButton timeOfDayOption='Morning' selected={timeProvided === "T09:00" ? true : false} onPress={() => setTime("T09:00")} />
                        <TimeOfDayButton timeOfDayOption='Afternoon' selected={timeProvided === "T12:00" ? true : false} onPress={() => setTime("T12:00")} />
                        <TimeOfDayButton timeOfDayOption='Evening' selected={timeProvided === "T18:00" ? true : false} onPress={() => setTime("T18:00")} />
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <SmallButton title="Next" onPress={() => {
                            setDate(calendarDateProvided + timeProvided)
                            StageController()
                        }} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    function DateQuestion() {
        return (
            <>
                {dateQuestionStage === "calendar" ? <CalendarViewDateQuestion /> : ""}
                {dateQuestionStage === "dayView" ? <DayViewDateQuestion /> : ""}
            </>
        )
    }

    function ActivityQuestion() {
        let activityAnswer: string;
        const onActivityEnd = () => {
            setActivity(activityAnswer)
        }
        return (


            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={{ flex: 0.2 }}>

                    <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>
                </View>
                <View style={{ flex: 0.8, alignItems: 'center' }}>
                    <View style={{ marginVertical: '20%' }}>
                        <BackgroundBox boxHeight={250}  >
                            <View style={{ margin: 30 }}>
                                <Text style={styles.questionTitle} > What is the activity for your event?</Text>

                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        activityAnswer = text;
                                    }}
                                    onEndEditing={() => {
                                        onActivityEnd();
                                    }}
                                />
                            </View>
                        </BackgroundBox>
                    </View>
                </View>
                <View style={styles.buttonParent}>
                    <SmallButton title={"Next"} onPress={() => {
                        if (!activityAnswer) {
                            alert('Please enter an activity');
                        }
                        else {
                            setActivity(activityAnswer)
                            StageController()
                        }
                    }} ></SmallButton>
                </View>
            </View>
        )

    }


    function LocationQuestion() {
        let locationAnswer: string;
        const onLocationEnd = () => {
            setLocation(locationAnswer)
        }
        return (

            <SafeAreaView style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={{ flex: 0.2 }}>
                    <BackArrow onPress={() => { goBackToDetalsKnown() }}></BackArrow>
                </View>
                <View style={{ flex: 0.8, alignItems: 'center' }}>
                    <View style={{ marginVertical: '20%' }}>
                        <BackgroundBox boxHeight={250}  >
                            <View style={{ margin: 30 }}>
                                <Text style={styles.questionTitle} > What is the location of your event?</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        locationAnswer = text;
                                    }}
                                    onEndEditing={() => {
                                        onLocationEnd();
                                    }}
                                />
                            </View>
                        </BackgroundBox>
                    </View>
                    <View style={styles.buttonParent}>
                        <SmallButton title={"Next"} onPress={() => {
                            setLocation(locationAnswer)
                            StageController()
                        }} ></SmallButton>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    function prepareBundle() {
        const newBundle: any = { ...bundle }
        newBundle.eventName = eventTitle
        newBundle.group = { id: props.singleGroupId, title: props.singleGroupName };
        if (activityProvided) {
            newBundle.activity = activityProvided;
        }
        if (dateProvided) {
            newBundle.date = dateProvided;
        }
        if (locationProvided) {
            newBundle.eventLocation = locationProvided;
        }
        if (!activityProvided) {
            newBundle.activity = null;
        }
        if (!dateProvided) {
            newBundle.date = null;
        }
        if (!locationProvided) {
            newBundle.eventLocation = null;
        }
        postEvent(newBundle).then((data) => {
            setBundle(data)
        })
        setState("Single Group")

    }

    function Review() {
        const eventDate = new Date(dateProvided).toLocaleString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });

        const eventTime = new Date(dateProvided).toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        });

        return (

            <SafeAreaView>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <BackgroundBox boxHeight='80%' >
                        <View style={{ margin: 20 }}>
                            <Text style={styles.questionTitle}> Are you happy with the below details? </Text>
                            <Text style={{
                                fontSize: 24,
                                padding: 10,
                                textAlign: 'center',
                                color: "#1E1E1E"
                            }} >{eventTitle}</Text>
                            <View style={{ width: '80%', alignSelf: 'center' }}>
                                <LineBreak></LineBreak>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                {dateProvided != "" ? <Text style={styles.reviewText} ><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Date:</Text>  {eventDate}</Text> : ""}
                                {dateProvided != "" ? <Text style={styles.reviewText} ><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Time:</Text>  {eventTime}</Text> : ""}
                                {activityProvided != "" ? <Text style={styles.reviewText}><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Activity:</Text>  {activityProvided}</Text> : ""}
                                {locationProvided != "" ? <Text style={styles.reviewText}><Text style={{ color: "#1E1E1E", fontStyle: 'italic' }}>Location:</Text>  {locationProvided}</Text> : ""}
                            </View>
                        </View>
                    </BackgroundBox>
                </View>
                <View style={{ flex: 0.2 }}>
                    <View style={styles.buttonParent}>
                        <View style={{ flexDirection: 'row', padding: 15, marginBottom: '30%' }}>
                            <View style={{ padding: 15 }}>
                                <SmallButton title={"Yes"} onPress={() => {
                                    prepareBundle();
                                }} ></SmallButton>
                            </View>
                            <View style={{ padding: 15 }}>
                                <SmallButton title={"No"} onPress={() => {
                                    console.log(currentStage)
                                    updateStage("Details Known")
                                }} ></SmallButton>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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
        width: '80%'
        // flex: 1, alignItems: 'center', justifyContent: 'center', width: '80%'
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
        textAlign: 'center'
    },
    reviewText: {
        fontSize: 18,
        padding: 10,
    },
    buttonParent: {
        width: '100%',
        height: 50,
        padding: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
    },

    containerCalendar: {
        backgroundColor: "#25242B",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        width: "100%",
        justifyContent: 'space-around',

    },

    containerArea : {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly'
    },
    backButtonheader : {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        // paddingTop: '5%',
        // paddingLeft: '5%'
    }

})


