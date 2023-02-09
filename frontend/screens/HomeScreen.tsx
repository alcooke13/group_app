import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import InfoBox from '../components/InfoBox';
import { getEventData, EventData } from '../services/EventServices';
import { getDatePollData, DatePollData } from '../services/DatePollServices';
import { getLocationPollData, LocationPollData } from '../services/LocationPollServices';
import { getActivityPollData, ActivityPollData } from '../services/ActivityPollServices';
import { useEffect, useState } from 'react';

interface Props {
    user: number
}

export default function HomeScreen(props: Props) {

    const { user } = props;

    const [events, setEvents] = useState<EventData[]>();
    const [polls, setPolls] = useState<Array<DatePollData[] | ActivityPollData[] | LocationPollData[]>>();

    useEffect(() => {
        const allPolls: Array<DatePollData[] | ActivityPollData[] | LocationPollData[]> = [];

        Promise.all([
            getDatePollData(),
            getActivityPollData(),
            getLocationPollData()
        ]).then((polls) => {
            polls.flat().forEach((poll) => {
                if (Date.parse(poll.timeout) > Date.now() && ) {

                }
            })
        }

        // getDatePollData()
        // .then((datePolls) => {
        //     allPolls.push(datePolls);
        // })

        // getActivityPollData()
        // .then((activityPolls) => {
        //     allPolls.push(activityPolls);
        // })

        // getLocationPollData()
        // .then((locationPolls) => {
        //     allPolls.push(locationPolls);
        //     setPolls(allPolls);
        //     console.log(allPolls);
        // })
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <InfoBox header='Upcoming Events'>
                <Text>test</Text>
            </InfoBox>
        </SafeAreaView>
    )
   
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25242B'
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      }
  });