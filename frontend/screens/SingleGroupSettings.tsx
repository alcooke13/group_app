import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackArrow from '../components/BackArrow';
import BackgroundBox from '../components/BackgroundBox';
import BigButton from '../components/BigButton';
import ButtonSelector from '../components/ButtonSelector';
import InfoBox from '../components/InfoBox';
import SmallPlus from '../components/SmallPlus';
import { deleteFriendsByUserId, getFriendsByUserId, getUserDataByUserId, updateUserAddress, updateUserName, UserData } from '../services/UserServices';
import { getGroupData, getGroupDataByGroupId, updateGroupDataWithNewUsers, deleteMembersByGroupId, GroupData, updateGroupTitle } from '../services/GroupServices';
import { EventData } from '../services/EventServices';
import LineBreak from '../components/LineBreak';
import SmallButton from '../components/SmallButton';
interface Props {
    user: number,
    groupId: number;
    groupName: string;

}



export default function SingleGroupSettings(props: Props) {

    const { user, groupId, groupName } = props;
    const isFocused = useIsFocused();

    const [currentView, updateCurrentView] = useState<String>("Settings");
    const [userDetails, setUserDetails] = useState<UserData>();
    const [members, setGroupMembers] = useState<UserData[]>([]);
    const [settingsUpdated, updateSettingsUpdated] = useState<boolean>(false);
    const [membersToRemove, updateMembersToRemove] = useState<Array<number>>([]);
    const [singleGroup, setSingleGroup] = useState<any>({})
    const [refreshing, setRefreshing] = useState(false);
    const [pastEvents, setPastEvents] = useState<EventData[]>()
    const [title, setTitle] = useState<string >("")

    useEffect(() => {
        const newPastEvents: any[] = [];
        if (isFocused || settingsUpdated) {
            updateCurrentView("Settings");
            getGroupDataByGroupId(groupId)
                .then((group) => {
                    setSingleGroup(group);
                    setGroupMembers(group.users)
                    group.events.forEach(event => {
                        if (Date.parse(event.date) < Date.now()) {
                            newPastEvents.push(event);
                        }
                    })
                    setPastEvents(newPastEvents)
                }

                ).then(data => { console.log(data) })
            getUserDataByUserId(user)
                .then((user) => {
                    setUserDetails(user);
                })

            updateSettingsUpdated(false);
        }
    }, [isFocused, settingsUpdated, refreshing]);

    function TitleUpdate(){
        if (title){
            updateGroupTitle(groupId, title)
        }
       
        
    }




    function onPressAccountSetting() {
        return console.log("Account settings pressed")
    }
    function onPressContactsSetting() {
        return console.log("Contacts settings pressed")
    }
    function onPressNotificationSetting() {
        return console.log("Notification settings pressed")
    }


    function SettingsView() {
        return (
            <View style={styles.settingsContainer}>
                <View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Edit Group")}>
                        <Text style={styles.settingElements} >Edit Group</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Past Events")}>
                        <Text style={styles.settingElements} >Past Events</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Leave Group")}>
                        <Text style={styles.settingElements} >Leave Group</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Edit Event")}>
                        <Text style={styles.settingElements} >Edit Event</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Archive Event")}>
                        <Text style={styles.settingElements} >Archive Event</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    
    function EditGroupView() {
        // let newAddressValue: string;
        let newGroupTitle : string  
        
        
        
        function setNewGroupTitle(){
            
            if(newGroupTitle){
                
                setTitle(newGroupTitle)
                TitleUpdate()
            }
            console.log(newGroupTitle, "title_check")
            
        }
        const memberItems = members?.map((member, index) => {
            return (
                <ButtonSelector option={member.userName}
                onPress={() => {
                        if (!membersToRemove.includes(member.id)) {
                            const newMembersToRemove = [...membersToRemove];
                            newMembersToRemove.push(member.id);
                            updateMembersToRemove(newMembersToRemove);
                            console.log(newMembersToRemove)
                        } else {
                            const index = membersToRemove.indexOf(member.id);
                            if (index !== -1) {
                                const newMembersToRemove = [...membersToRemove];
                                newMembersToRemove.splice(index, 1);
                                updateMembersToRemove(newMembersToRemove);
                            }
                        }
                    }}
                    selected={membersToRemove.includes(member.id)}
                    key={index}></ButtonSelector>
                    )
                });
                
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 0.1 }}>
                    <BackArrow onPress={() => {
                        updateCurrentView("Settings")
                    }} />

                </View>
                <View style={{ width: 300, flex: 0.3 }}>
                    <BackgroundBox boxHeight={'100%'}>
                        <View >
                            <Text style={styles.accountHeader}>Group Name</Text>
                            <TextInput
                                style={styles.accountNameInput}
                                defaultValue={groupName}
                                onChangeText={(text) => {newGroupTitle = text}}
                                onEndEditing={() => {
                                    setTitle(newGroupTitle)
                            
                                }}
                            >

                            </TextInput>
                    <SmallButton title='Submit' onPress={() => {
                        setNewGroupTitle()
                        TitleUpdate()


                    }} ></SmallButton>
                    </View>
                    </BackgroundBox>
                </View>

                <View style={{ flex: 0.7 }}>

                    <InfoBox header='Contacts'
                        boxHeight='70%'
                    // smallPlus={<SmallPlus onPress={() => { }} />} 
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.contactsMembers}>
                                <ScrollView>

                                    {memberItems}
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </InfoBox>
                    <View style={styles.contactsButton}>
                        <BigButton
                            title='Remove Selected'
                            onPress={() => {
                                console.log(membersToRemove)
                                deleteMembersByGroupId(groupId, membersToRemove)
                                setRefreshing(true);
                                setTimeout(() => {
                                    setRefreshing(false);
                                }, 500);

                            }}></BigButton>
                    </View>
                </View>
            </View>
        )

    }

    function PastEvents() {

        const pastEventItems = pastEvents?.map((event, index) => {
            let eventDate = new Date(event.date).toLocaleString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });

            let eventTime = new Date(event.date).toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit'
            });


            return (
                <View style={{ width: '90%' }}>
                    <View style={{}}>
                        {index != 0 ? <LineBreak /> : ""}
                    </View>
                    <View key={index} style={{}} >
                        <Text style={{ fontSize: 18, color: '#1E1E1E', paddingBottom: 8 }} >{event.eventName}</Text>
                        <Text style={{ paddingVertical: 1 }} >
                            <Text style={{ fontStyle: 'italic', color: '#1E1E1E' }}>Date:</Text>
                            <Text>  {eventDate}</Text>
                        </Text>
                        <Text style={{ paddingVertical: 1 }}>
                            <Text style={{ fontStyle: 'italic', color: '#1E1E1E' }}>Time:</Text>
                            <Text>  {eventTime}</Text>
                        </Text>
                        <Text style={{ paddingVertical: 1 }}>
                            <Text style={{ fontStyle: 'italic', color: '#1E1E1E' }}>Activity:</Text>
                            <Text>  {event.activity}</Text>
                        </Text>
                        <Text style={{ paddingVertical: 1 }}>
                            <Text style={{ fontStyle: 'italic', color: '#1E1E1E' }}>Location:</Text>
                            <Text>  {event.eventLocation}</Text>
                        </Text>

                    </View>
                </View>
            )
        });



        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#25242B',
            }}>

                <InfoBox header='Past Events' boxHeight='60%' boxMarginTop='5%' >
                    <ScrollView style={{ padding: 10 }}>
                        {pastEventItems}
                    </ScrollView>
                </InfoBox>

            </SafeAreaView>
        )
    }



    return (
        <SafeAreaView style={styles.container}>
            {currentView === "Settings" ? <SettingsView /> : ""}
            {currentView === "Edit Group" ? <EditGroupView /> : ""}
            {currentView === "Past Events" ? <PastEvents /> : ""}
            {currentView === "loading" ? "" : ""}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25242B',
    },
    settingElements: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FF914D',
        paddingTop: '8%',
        textAlign: 'center'
    },
    contactsMembers: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    contactsHeader: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingTop: '5%',
        paddingLeft: '5%'
    },
    settingsContainer: {
        paddingTop: '10%',
        width: '100%',
        height: '100%'
    },
    accountContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // width: "100%",
        // height: "100%"
    },
    contactContainer: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    contactsButton: {
        alignSelf: 'flex-end',
        paddingBottom: '10%',
        paddingRight: '5%'
    },
    accountBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    accountHeader: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 24
    },
    accountNameInput: {
        padding: 10,
        backgroundColor: 'white',
        width: '70%',
        fontSize: 20,
        color: 'black',
    },
    accountPhoneNumber: {
        padding: 10,
        width: '70%',
        fontSize: 20,
        textAlign: 'center'
    },
    accountAddress: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        width: '70%',
        height: '50%',
        fontSize: 20,
    },
    accountButton: {
        alignSelf: 'flex-end',
        paddingRight: '5%'
    }
});