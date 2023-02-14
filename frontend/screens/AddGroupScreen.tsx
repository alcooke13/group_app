import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import InfoBox from '../components/InfoBox';
import { useEffect, useRef, useState } from 'react';
import TextHeader from '../components/TextHeader';
import BigButton from '../components/BigButton';
import LineBreak from '../components/LineBreak';
import { ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import BackgroundBox from '../components/BackgroundBox';
import { getFriendsByUserId, UserData } from '../services/UserServices';
import ButtonSelector from '../components/ButtonSelector';
import { postGroup, updateGroupDataWithNewUsers } from '../services/GroupServices';
import BackArrow from '../components/BackArrow';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
    user: number
    setState: React.Dispatch<React.SetStateAction<String>>;
    newGroup: React.Dispatch<React.SetStateAction<Object>>;
}

export default function AddGroupScreen(props: Props) {

    const { user, newGroup, setState } = props;

    const [friends, setFriends] = useState<UserData[]>();
    const [groupName, setGroupName] = useState<String>();
    const [friendsToAdd, updateFriendsToAdd] = useState<Array<number>>([]);

    useEffect(() => {
        getFriendsByUserId(user)
        .then((userFriends) => {
            setFriends(userFriends);
        })

        const newFriendsToAdd = [... friendsToAdd];
        newFriendsToAdd.push(user);
        updateFriendsToAdd(newFriendsToAdd);
    }, []);

    function createGroup() {
        const groupDetails: Object = {"groupName": groupName};

        postGroup(groupDetails)
        .then((group) => {
            updateGroupDataWithNewUsers(group.id, friendsToAdd);
            newGroup({"new group": group.id});
        });
    }

    const memberItems = friends?.map((friend, index) => {

        return(
            <ButtonSelector option={friend.userName} 
                            onPress={() => {
                                if (!friendsToAdd.includes(friend.id)) {
                                    const newFriendsToAdd = [... friendsToAdd];
                                    newFriendsToAdd.push(friend.id);
                                    updateFriendsToAdd(newFriendsToAdd);
                                } else {
                                    const index = friendsToAdd.indexOf(friend.id);
                                    if (index !== -1) {
                                        const newFriendsToAdd = [... friendsToAdd];
                                        newFriendsToAdd.splice(index, 1);
                                        updateFriendsToAdd(newFriendsToAdd);
                                    }
                                }
                            }} 
                            selected={friendsToAdd.includes(friend.id)}
                            key={index}></ButtonSelector>
        )
    });

    return (
        <>
            <View style={styles.backArrow}>
                <BackArrow onPress={() => setState('All Groups')}></BackArrow>
            </View>

            <BackgroundBox boxHeight='21%' boxMarginTop='5%'>
                <View style={styles.groupName}>
                    <Text style={styles.groupHeader}>Group name</Text>
                    <TextInput 
                        style={styles.groupInput}
                        placeholder="Enter group name (max. 11 characters)"
                        onChangeText={groupName => setGroupName(groupName)}>
                    </TextInput>
                </View>
            </BackgroundBox>
            
            <InfoBox header='Group Members' boxHeight='70%'>
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
                        if (!groupName) {
                            alert('Please enter a group name');
                        } else if (groupName.length > 11) {
                            alert('Group names should be less than 12 characters');
                        } else {
                            createGroup();
                        }                     
                    }}
                    ></BigButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#25242B'
    },
    backArrow: {
        paddingTop: '5%',
        alignSelf: 'flex-start',
        paddingLeft: '5%'
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
        padding: '10%'
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
        paddingTop: 10,
        paddingBottom: 10
    },
    doneButton: {
        alignSelf: 'flex-end',
        paddingRight: '5%',
        paddingBottom: '10%'
    }
});