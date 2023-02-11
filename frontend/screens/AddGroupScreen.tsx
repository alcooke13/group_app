import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import InfoBox from '../components/InfoBox';
import { useEffect, useRef, useState } from 'react';
import TextHeader from '../components/TextHeader';
import BigButton from '../components/BigButton';
import LineBreak from '../components/LineBreak';
import { useIsFocused } from "@react-navigation/native";
import BackgroundBox from '../components/BackgroundBox';
import { getFriendsByUserId, UserData } from '../services/UserServices';
import DatePollButton from '../components/DatePollButton';
import { postGroup, updateGroupDataWithNewUsers } from '../services/GroupServices';

interface Props {
    user: number
}

export default function AddGroupScreen(props: Props) {

    const isFocused = useIsFocused();

    const { user } = props;

    const [friends, setFriends] = useState<UserData[]>();
    const [groupName, setGroupName] = useState<String>();
    const friendsAdded = useRef<Array<number>>([]);

    useEffect(() => {
        if (isFocused) {
            getFriendsByUserId(user)
            .then((userFriends) => {
                setFriends(userFriends);
            })
        }
    }, [isFocused]);

    function createGroup() {
        const groupDetails: Object = {"groupName": groupName};

        postGroup(groupDetails)
        .then((group) => {
            updateGroupDataWithNewUsers(group.id, friendsAdded.current);
        });
    }

    const memberItems = friends?.map((friend, index) => {

        return(
            <DatePollButton dateOption={friend.userName} 
                            onPress={() => {
                                if (!friendsAdded.current.includes(friend.id)) {
                                    friendsAdded.current.push(friend.id);
                                } else {
                                    const index = friendsAdded.current.indexOf(friend.id);
                                    if (index !== -1) {
                                        friendsAdded.current.splice(index, 1);
                                    }
                                }
                            }} 
                            votedOn={friendsAdded.current.includes(friend.id)}
                            key={index}></DatePollButton>
        )
    });

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundBox>
                <View style={styles.groupName}>
                    <Text style={styles.groupHeader}>Group name</Text>
                    <TextInput 
                        style={styles.groupInput}
                        placeholder="Type your new group nam here"
                        onChangeText={groupName => setGroupName(groupName)}>
                    </TextInput>
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
                <BigButton 
                    title='Done' 
                    onPress={() => {
                        createGroup();
                    }}></BigButton>
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