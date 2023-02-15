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
import ScreenHeaderText from '../components/ScreenHeaderText';
import { getGroupData, getGroupDataByGroupId, updateGroupDataWithNewUsers, deleteMembersByGroupId, GroupData, updateGroupTitle } from '../services/GroupServices';
import { EventData, deleteEvent } from '../services/EventServices';

import LineBreak from '../components/LineBreak';
import SmallButton from '../components/SmallButton';
import TextHeader from '../components/TextHeader';

interface Props {
    user: number,
    groupId: number;
    groupName: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    parentUpcomingEvent?: EventData;
}

export default function SingleGroupSettings(props: Props) {

    const { user, groupId, groupName, setState, parentUpcomingEvent } = props;
    const isFocused = useIsFocused();

    const [currentView, updateCurrentView] = useState<String>("Settings");
    const [userDetails, setUserDetails] = useState<UserData>();
    const [members, setGroupMembers] = useState<UserData[]>([]);
    const [settingsUpdated, updateSettingsUpdated] = useState<boolean>(false);
    const [membersToRemove, updateMembersToRemove] = useState<Array<number>>([]);
    const [singleGroup, setSingleGroup] = useState<any>({})
    const [refreshing, setRefreshing] = useState(false);
    const [pastEvents, setPastEvents] = useState<EventData[]>()
    const [title, setTitle] = useState<string>("")
    const [upcomingEvent, setUpcomingEvent] = useState<EventData>()


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


    function SettingsView() {
        return (
            <View style={styles.settingsContainer}>
                <View style={styles.header}>
                    <BackArrow onPress={() => setState("Single Group")}></BackArrow>
                    <View></View>
                </View>

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
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        updateCurrentView("Delete Event")
                    }}>
                        <Text style={styles.settingElements} >Delete Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    function EditGroupView() {
        const [name, setName] = useState("");

        function setNewGroupTitle() {
            const payload: { [key: string]: any } = {}
            if (name) {
                payload["title"] = name;
                updateGroupTitle(groupId, payload);
                payload["title"] = "";
                updateCurrentView("Settings");
            }
        }

        const memberItems = members?.map((member, index) => {
            return (
                <ButtonSelector option={member.userName} key={member.id}
                    onPress={() => {
                        if (!membersToRemove.includes(member.id)) {
                            const newMembersToRemove = [...membersToRemove];
                            newMembersToRemove.push(member.id);
                            updateMembersToRemove(newMembersToRemove);
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
                ></ButtonSelector>
            )
        });

        return (
            <>
                <View style={styles.header}>
                    <BackArrow onPress={() => { updateCurrentView("Settings") }}></BackArrow>
                </View>
                <BackgroundBox boxHeight='20%' >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.settingTitle}>Group Name</Text>
                        <TextInput
                            style={styles.newGroupNameInput}
                            defaultValue={groupName}
                            onChangeText={(value) => setName(value)}
                        >
                        </TextInput>
                    </View>
                </BackgroundBox>
                <View style={styles.groupNameButton}>
                    <BigButton
                        title='Update'
                        onPress={() => setNewGroupTitle()}
                        ></BigButton>
                </View>
                <InfoBox header='Contacts'boxHeight='70%'>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.contactsMembers}>
                            {memberItems}
                        </View>
                    </ScrollView>
                </InfoBox>
                <View style={styles.membersButton}>
                    <BigButton
                        title='Remove Selected'
                        onPress={() => {
                            console.log(membersToRemove)
                            deleteMembersByGroupId(groupId, membersToRemove)
                            setRefreshing(true);
                            setTimeout(() => {
                                setRefreshing(false);
                            }, 1000);

                        }}></BigButton>
                </View>
            </>
        )

    }

    function PastEvents() {
        const pastEventItems = pastEvents?.map((event, index) => {
            let eventDate = new Date(event.date).toLocaleString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: "numeric",
            });

            let eventTime = new Date(event.date).toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit'
            });

            return (
                <>
                    <View style={styles.eventItem} key={index.toString + event.eventName}>
                        <View style={styles.eventItem}>
                        <View style={styles.eventHeader}>
                            <TextHeader>{event.eventName}</TextHeader>
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.text}>Date:          {eventDate}</Text>
                            <Text style={styles.text}>Time:          {eventTime}</Text>
                            <Text style={styles.text}>Location:   {event.eventLocation}</Text>
                        </View>
                        </View>
                    </View>
                    {index !== pastEvents?.length - 1 ? <LineBreak /> : ''}
                </>
            
            )
        });

        return (
            <>
                <View style={styles.header}>
                    <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
                </View>
                <InfoBox header='Past Events' boxHeight='85%' boxMarginBottom='5%'>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {pastEventItems}
                    </ScrollView>
                </InfoBox>

            </>
        )
    }

    function LeaveGroup() {
        return (
            <>
                <View style={styles.header}>
                    <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
                </View>
                <InfoBox header='Leave Group' boxHeight='35%' boxMarginBottom='30%'>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.settingTitle}>Are you sure you want to leave the group?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ marginHorizontal: 15 }}>
                                <BigButton title={'Yes'} onPress={() => { deleteMembersByGroupId(groupId, [user]); setState("All Groups"); }} />
                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <BigButton title={'No'} onPress={() => { updateCurrentView("Settings") }} />
                            </View>
                        </View>
                    </View>
                </InfoBox>
            </>
        )
    }

    function DeleteEvent() {
        let eventDate: string = ""
        let eventTime: string = ""
        if (parentUpcomingEvent != undefined) {
            eventDate = new Date(parentUpcomingEvent.date).toLocaleString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
            });

            eventTime = new Date(parentUpcomingEvent.date).toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return (
            <>
                <View style={styles.header}>
                    <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
                </View>
                <InfoBox header='Delete Event' boxMarginBottom='20%'>
                    <>
                        {parentUpcomingEvent ?
                            <>
                                <Text style={styles.settingTitle}>Are you sure you want to delete the below?</Text>
                                <View style={styles.deleteEventInfo}>
                                    {parentUpcomingEvent ? <Text style={styles.reviewText} >Title: {parentUpcomingEvent?.eventName}</Text> : ""}
                                    {eventDate ? <Text style={styles.reviewText} >Date: {eventDate}</Text> : ""}
                                    {eventTime ? <Text style={styles.reviewText} >Time: {eventTime}</Text> : ""}
                                    {parentUpcomingEvent?.activity ? <Text style={styles.reviewText}>Activity: {parentUpcomingEvent?.activity}</Text> : ""}
                                    {parentUpcomingEvent?.eventLocation ? <Text style={styles.reviewText}>Location: {parentUpcomingEvent?.eventLocation}</Text> : ""}
                                </View>
                            </>
                            :
                            <View style={styles.deleteEventInfo}>
                                <Text style={styles.text}>No upcoming event.</Text>
                            </View>
                        }
                    </>
                    <View style={styles.deleteButtons} >
                        <View style={{ marginHorizontal: 15 }}>
                            <BigButton title={'Yes'} onPress={() => {
                                if (parentUpcomingEvent) {
                                    deleteEvent(parentUpcomingEvent?.id)
                                    setState("All Groups");
                                }
                                updateCurrentView("Settings")
                            }} />
                        </View>
                        <View style={{ marginHorizontal: 15 }}>
                            <BigButton title={'No'} onPress={() => { updateCurrentView("Settings") }} />
                        </View>
                    </View>
                </InfoBox>
            </>
        )
    }

    return (
        < >
            {currentView === "Settings" ? <SettingsView /> : ""}
            {currentView === "Edit Group" ? <EditGroupView /> : ""}
            {currentView === "Past Events" ? <PastEvents /> : ""}
            {currentView === "Leave Group" ? <LeaveGroup /> : ""}
            {currentView === "Delete Event" ? <DeleteEvent /> : ""}
            {currentView === "loading" ? "" : ""}
        </>
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
        textAlign: 'center',
        fontFamily: 'Ubuntu-Bold'
    },
    text: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 18,
        lineHeight: 30
    },
    settingsContainer: {
        width: '100%',
        height: '100%'
    },
    groupMembers: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    groupNameButton: {
        alignSelf: 'flex-end',
        paddingTop: '7%',
        paddingRight: '5%'
    },
    membersButton: {
        alignSelf: 'flex-end',
        paddingBottom: '8%',
        paddingRight: '5%'
    },
    contactsMembers: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Ubuntu-Regular'
    },
    settingTitle: {
        paddingTop: 20,
        paddingBottom: 30,
        fontSize: 24,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'Ubuntu-Regular'
    },
    newGroupNameInput: {
        padding: 10,
        backgroundColor: 'white',
        fontFamily: 'Ubuntu-Regular',
        width: '70%',
        fontSize: 20,
        color: 'black',
        justifyContent: 'center'
    },
    eventItem: {
        padding: 10,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    eventHeader: {
        alignItems: 'center'
    },
    eventInfo: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10
    },
    eventCategory: {
        fontStyle: 'italic', 
        color: '#1E1E1E'
    },
    eventName: {
        fontSize: 18, color: '#1E1E1E', paddingBottom: 8
    },
    header: {
        marginTop: '5%',
        marginLeft: '5%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        fontFamily: 'Ubuntu-Bold'
    }, 
    accountContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: "100%",
        height: "100%"
    },
    deleteEventInfo: {
        alignSelf: 'center',
        paddingBottom: '10%'
    },
    deleteButtons: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: '10%'
    },
    reviewText: {
        fontSize: 22,
        padding: 10,
        fontFamily:'Ubuntu-Regular'
    },
});