import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import InfoBox from '../components/InfoBox';
import { getEventData, EventData } from '../services/EventServices';
import { getDatePollData, DatePollData } from '../services/DatePollServices';
import { getLocationPollData, LocationPollData } from '../services/LocationPollServices';
import { getActivityPollData, ActivityPollData } from '../services/ActivityPollServices';
import { useEffect, useState } from 'react';
import TextHeader from '../components/TextHeader';
import SmallButton from '../components/SmallButton';
import LineBreak from '../components/LineBreak';
import { useIsFocused } from "@react-navigation/native";

interface Props {
    user: number
}

export default function HomeScreen(props: Props) {

    const isFocused = useIsFocused();

    const { user } = props;

    const [events, setEvents] = useState<EventData[]>();
    const [polls, setPolls] = useState<(DatePollData | ActivityPollData | LocationPollData)[]>();

    useEffect(() => {

        if (isFocused) {
            getEventData()
            .then((allEvents) => {
                setEvents(allEvents);
            });

            const allPolls: Array<DatePollData | ActivityPollData | LocationPollData> = [];

            Promise.all([
                getDatePollData(),
                getActivityPollData(),
                getLocationPollData()
            ]).then((polls) => {
                polls.flat().forEach((poll) => {
                    if (Date.parse(poll.timeout) > Date.now()) {
                        for (const [option, user_ids] of Object.entries(poll.options)) {
                            if (user_ids.every((user_id) => user_id != user)) {
                                allPolls.push(poll);
                            }                        
                        }
                    }
                });
            }).then(() => setPolls(allPolls));
        }
    }, [isFocused]);

    const eventItems = events?.map((event, index) => {
        return(
            <TouchableOpacity onPress={() => {}}>
                <View style={styles.eventItem} key={index}>
                    <View style={styles.eventHeader}>
                        <TextHeader>{event.eventName}</TextHeader>
                    </View>
                    <View style={styles.eventInfo}>
                    <Text>Date:         {event.date}</Text>
                    <Text>Time:         TBC</Text>
                    <Text>Location:   {event.eventLocation}</Text>
                    </View>
                </View>
                {index !== events?.length - 1 ?  
                    <LineBreak/>
                : 
                   ""
                }
            </TouchableOpacity>
        )
    });

    const pollItems = polls?.map((poll, index) => {
        return(
            <>
                <View style={styles.pollItem} key={index}>
                    <TextHeader>{poll.event.eventName}</TextHeader>
                    <SmallButton title='Vote'></SmallButton>
                </View>
                {index !== polls?.length - 1 ?  
                    <LineBreak/>
                : 
                   ""
                }
            </>
        )
    });

    return (
        <SafeAreaView style={styles.container}>
            <InfoBox header='Upcoming Events'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {eventItems}
                </ScrollView>
            </InfoBox>
            
            <InfoBox header='Open Polls'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {pollItems}
                </ScrollView>
            </InfoBox>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#25242B'
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
      eventItem: {
        padding: 15,
        justifyContent: 'space-between',
      },
      eventHeader: {
        alignItems: 'center'
      },
      eventInfo: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10
      },
      pollItem: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
      }
  });