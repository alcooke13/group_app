import { Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { EventData } from '../services/EventServices';
import { useEffect, useState } from 'react';
import BackArrow from '../components/BackArrow';
import BackgroundBox from '../components/BackgroundBox';
import TickBox from '../components/TickBox';
import SmallButton from '../components/SmallButton';
import LineBreak from '../components/LineBreak';
import { postEvent } from '../services/EventServices';
import CalendarNewEvent from '../components/CalendarNewEvent';
import InfoBox from '../components/InfoBox';
import MenuText from '../components/MenuText';
import TimeOfDayButton from '../components/TimeOfDayButton';
import BigButton from '../components/BigButton';


export interface GroupInfoProps {
    singleGroupId: string;
    singleGroupName: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    updateGroupChanges: React.Dispatch<React.SetStateAction<Object>>;
    setUpcomingEvent: React.Dispatch<React.SetStateAction<EventData>>
}


export default function NewEvent(props: GroupInfoProps) {
    const { setState, updateGroupChanges, setUpcomingEvent } = props;

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

    function goBackToDetailsKnown() {
        updateStage("Details Known")
    }

    const EventName = () => {
        let titleValue: string;
        const onEventTitleEnd = () => {
            setEventTitle(titleValue)
        }
        return (
            <>
                <View style={styles.backButtonheader}>
                    <BackArrow onPress={() => { goBackToSingleGroupView() }}></BackArrow>
                </View>
                <BackgroundBox boxHeight={"28%"}>
                    <View style={styles.questionBox}>
                        <Text style={styles.questionHeader}>What is your events name?</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={(eventTitleText: string) => {
                                    titleValue = eventTitleText;
                                }}
                                onEndEditing={() => { onEventTitleEnd() }}
                        />
                    </View>
                </BackgroundBox>
                <View style={styles.buttonParent}>
                    <BigButton title={"Submit"} onPress={() => {
                        if (!titleValue) {
                            alert('Please enter an event name');
                        }
                        else {
                            setEventTitle(titleValue)
                            StageController()
                        }
                    }} ></BigButton>
                </View>
            </> 
        );
    };


    function KnownDetails() {
        return (
            <>
                <View style={styles.backButtonheader}>
                    <BackArrow onPress={() => { goBackToEventName() }}></BackArrow>
                </View>
                <BackgroundBox boxHeight='65%' boxWidth={'90%'} >
                    <View>
                        <Text style={styles.questionHeader}>Select what you know:</Text>
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
                    <BigButton title={"Next"} onPress={() => {
                        setActivity("")
                        setLocation("")
                        setDate("")
                        StageController();
                    }} ></BigButton>
                </View>
            </>
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

            <>
                <View style={styles.backButtonheader}>
                    <BackArrow onPress={() => { goBackToDetailsKnown() }}></BackArrow>
                </View>
                <View>
                    <Text style={styles.dateQuestion}>What is the date of your event?</Text>
                </View>
                <InfoBox header={"Calendar"} boxMarginBottom='10%'>
                    <CalendarNewEvent
                        onPress={changeViewToDay}
                        setSavedDate={setCalendarDate}
                        changeViewToDay={changeViewToDay}
                    ></CalendarNewEvent>
                </InfoBox>
            </>
        )
    }

    function DayViewDateQuestion() {
        return (
            <>
                <View style={styles.backButtonheader}>
                    <BackArrow onPress={() => { 
                        setDateQuestionStage("calendar")
                        goBackToDetailsKnown();
                        }}></BackArrow>
                </View>
                <View>
                    <Text style={styles.dateQuestion}>What time of day will your event be?</Text>
                </View>
                <View>
                    <TimeOfDayButton timeOfDayOption='Morning' selected={timeProvided === "T09:00" ? true : false} onPress={() => setTime("T09:00")} />
                    <TimeOfDayButton timeOfDayOption='Afternoon' selected={timeProvided === "T12:00" ? true : false} onPress={() => setTime("T12:00")} />
                    <TimeOfDayButton timeOfDayOption='Evening' selected={timeProvided === "T18:00" ? true : false} onPress={() => setTime("T18:00")} />
                </View>
                <View style={styles.buttonParent}>
                    <BigButton title="Next" onPress={() => {
                        setDate(calendarDateProvided + timeProvided)
                        StageController()
                    }} />
                </View>
            </>
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
            <>
                <View style={styles.backButtonheader}>
                    <BackArrow onPress={() => { goBackToDetailsKnown() }}></BackArrow>
                </View>
                <BackgroundBox boxHeight={"30%"}>
                    <View style={styles.questionBox}>
                        <Text style={styles.questionHeader}>What is the activity for your event?</Text>
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
                <View style={styles.buttonParent}>
                <BigButton title={"Next"} onPress={() => {
                        if (!activityAnswer) {
                            alert('Please enter an activity');
                        }
                        else {
                            setActivity(activityAnswer)
                            StageController()
                        }
                    }} ></BigButton>
                </View>
                </> 
        )
    }

    function LocationQuestion() {
        let locationAnswer: string;
        const onLocationEnd = () => {
            setLocation(locationAnswer)
        }
        return (
            <>
                <View style={styles.backButtonheader}>
                    <BackArrow onPress={() => { goBackToDetailsKnown() }}></BackArrow>
                </View>
                <BackgroundBox boxHeight={"30%"}>
                    <View style={styles.questionBox}>
                        <Text style={styles.questionHeader}>What is the location of your event?</Text>
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
                <View style={styles.buttonParent}>
                <BigButton title={"Next"} onPress={() => {
                            setLocation(locationAnswer)
                            StageController()
                        }} ></BigButton>
                </View>
            </> 
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
        postEvent(newBundle).then((event) => {
            setUpcomingEvent(event);
            updateGroupChanges({"new event": event.id});
        })   
        setState("Single Group");

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

            <>
                <BackgroundBox boxHeight='55%' boxMarginTop='30%' boxMarginBottom='10%'>
                    <View style={{ margin: 20 }}>
                        <Text style={styles.questionHeader}> Are you happy with the below details? </Text>
                        <Text style={styles.reviewEventHeader} >{eventTitle}</Text>
                        <View style={{ width: '80%', alignSelf: 'center' }}>
                            <LineBreak></LineBreak>
                        </View>
                        <View style={styles.reviewInfo}>
                            {dateProvided != "" ? <Text style={styles.reviewText}>Date: {eventDate}</Text> : ""}
                            {dateProvided != "" ? <Text style={styles.reviewText}>Time: {eventTime}</Text> : ""}
                            {activityProvided != "" ? <Text style={styles.reviewText}>Activity: {activityProvided}</Text> : ""}
                            {locationProvided != "" ? <Text style={styles.reviewText}>Location: {locationProvided}</Text> : ""}
                        </View>
                    </View>
                </BackgroundBox>
                <View style={styles.buttonsParent}>
                    <View style={{ padding: 15 }}>
                        <BigButton title={"Yes"} onPress={() => {
                            prepareBundle();
                        }} ></BigButton>
                    </View>
                    <View style={{ padding: 15 }}>
                        <BigButton title={"No"} onPress={() => {
                            console.log(currentStage)
                            updateStage("Details Known")
                        }} ></BigButton>
                    </View>
                </View>
            </>
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
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'stretch',
        padding: 10,
        fontSize: 16,
        fontFamily:'Ubuntu-Regular'
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
        fontFamily:'Ubuntu-Regular'
    },
    questionTitle: {
        fontSize: 24,
        padding: 15,
        textAlign: 'center'
    },
    reviewText: {
        fontSize: 22,
        padding: 10,
        fontFamily:'Ubuntu-Regular'
    },
    buttonParent: {
        paddingTop: '10%',
        padding: '5%',
        alignSelf: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        width: "100%",
        justifyContent: 'space-around',
    },
    backButtonheader : {
        alignSelf: 'flex-start',
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingBottom: '10%'
    },
    questionBox: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '80%'
      },
    questionHeader: {
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 30,
        fontSize: 24,
        paddingHorizontal: '10%',
        fontFamily: 'Ubuntu-Bold'
    },
    dateQuestion: {
        fontSize: 24,
        marginHorizontal: '10%',
        marginVertical: '10%',
        textAlign: 'center',
        color: 'white',
        fontFamily:'Ubuntu-Bold'
    },
    reviewInfo: {
        paddingTop: '10%',
        alignSelf: 'center'
    },
    reviewEventHeader: {
        fontSize: 24,
        padding: 10,
        textAlign: 'center',
        color: "#1E1E1E",
        fontFamily:'Ubuntu-Regular'
    }
})


