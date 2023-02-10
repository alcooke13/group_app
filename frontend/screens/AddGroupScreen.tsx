import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import InfoBox from '../components/InfoBox';
import { useEffect, useState } from 'react';
import TextHeader from '../components/TextHeader';
import BigButton from '../components/BigButton';
import LineBreak from '../components/LineBreak';
import { useIsFocused } from "@react-navigation/native";
import BackgroundBox from '../components/BackgroundBox';
import { getFriendsByUserId, UserData } from '../services/UserServices';
import DatePollButton from '../components/DatePollButton';

interface Props {
    user: number
}

export default function AddGroupScreen(props: Props) {

    const isFocused = useIsFocused();

    const { user } = props;

    const [friends, setFriends] = useState<UserData[]>();


    useEffect(() => {
        if (isFocused) {
            getFriendsByUserId(user)
            .then((userFriends) => {
                setFriends(userFriends);
            })
        }
    }, [isFocused]);


    const memberItems = friends?.map((friend, index) => {

        return(
            <DatePollButton dateOption={friend.userName} onPress={() => {}} votedOn={false} key={index}></DatePollButton>
        )
    });

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundBox>
                <View style={styles.groupName}>
                    <Text style={styles.groupHeader}>Group name</Text>
                    <TextInput style={styles.groupInput}></TextInput>
                </View>
            </BackgroundBox>
            
            <InfoBox header='Group Members'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.members}>
                        {memberItems}
                    </View>
                </ScrollView>
            </InfoBox>
            <View style={styles.doneButton}>
                <BigButton title='Done' onPress={() => {}}></BigButton>
            </View>
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
    groupName: {
        justifySelf: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    groupHeader: {
        justifySelf: 'center',
        alignSelf: 'center',
        fontSize: 24,
        padding: 30
    },
    groupInput: {
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'stretch',
        padding: 10,
        fontSize: 16
    },
    members: {
        alignItems: 'center',
        paddingTop: 10
    },
    doneButton: {
        alignSelf: 'flex-end',
        paddingRight: '5%'
    }
});