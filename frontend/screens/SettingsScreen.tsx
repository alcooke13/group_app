import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackArrow from '../components/BackArrow';
import BackgroundBox from '../components/BackgroundBox';
import BigButton from '../components/BigButton';
import DatePollButton from '../components/DatePollButton';
import InfoBox from '../components/InfoBox';
import ScreenHeaderText from '../components/ScreenHeaderText';
import SmallPlus from '../components/SmallPlus';
import { getFriendsByUserId, getUserDataByUserId, UserData } from '../services/UserServices';

interface Props {
    user: number
}

export default function SettingsScreen(props: Props) {

  const { user } = props;
  const isFocused = useIsFocused();

  const [currentView, updateCurrentView] = useState<String>("Settings");
  const [userDetails, setUserDetails] = useState<UserData>();
  const [friends, setFriends] = useState<UserData[]>();
  const friendsToRemove = useRef<Array<number>>([]);

  useEffect(() => {
    if (isFocused) {
      updateCurrentView("Settings");
      getFriendsByUserId(user)
      .then((userFriends) => {
          setFriends(userFriends);
      })

      getUserDataByUserId(user)
      .then((user) => {
        setUserDetails(user);
      })
    }
  }, [isFocused]);


  function onPressAccountSetting(){
    return console.log("Account settings pressed")
  }
  function onPressContactsSetting(){
    return console.log("Contacts settings pressed")
  }
  function onPressNotificationSetting(){
    return console.log("Notification settings pressed")
  }


  function SettingsView() {
    return (
      <>
        <View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => updateCurrentView("Account")}>
            <Text style={styles.settingElements} >Account</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.7}onPress={() => updateCurrentView("Contacts")}>
            <Text style={styles.settingElements} >Contacts</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <TouchableOpacity activeOpacity={0.7} onPress={onPressNotificationSetting}>
            <Text style={styles.settingElements}>Notifications</Text>
          </TouchableOpacity> */}
        </View>
      </>
    )
  }

  function AccountView() {
    return (
      <>
        <BackgroundBox>
          <View style={styles.groupName}>
            <Text style={styles.groupHeader}>Group name</Text>
            <TextInput 
                style={styles.groupInput}
                placeholder=""
                onChangeText={groupName => setGroupName(groupName)}>
            </TextInput>
          </View>
        </BackgroundBox>
        <View>
          <TouchableOpacity activeOpacity={0.7}onPress={() => updateCurrentView("Contacts")}>
            <Text style={styles.settingElements} >Contacts</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <TouchableOpacity activeOpacity={0.7} onPress={onPressNotificationSetting}>
            <Text style={styles.settingElements}>Notifications</Text>
          </TouchableOpacity> */}
        </View>
      </>
    )
  }

  function ContactsView() {

    const memberItems = friends?.map((friend, index) => {
      return(
          <DatePollButton dateOption={friend.userName} 
                          onPress={() => {
                              if (!friendsToRemove.current.includes(friend.id)) {
                                  friendsToRemove.current.push(friend.id);
                              } else {
                                  const index = friendsToRemove.current.indexOf(friend.id);
                                  if (index !== -1) {
                                      friendsToRemove.current.splice(index, 1);
                                  }
                              }
                          }} 
                          votedOn={friendsToRemove.current.includes(friend.id)}
                          key={index}></DatePollButton>
      )
    });

    return (
      <>
        <View style={styles.contactsHeader}>
          <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
        </View>
        <InfoBox header='Group Members'
                  boxHeight='70%'
                  smallPlus={<SmallPlus onPress={() => {}} />} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contactsMembers}>
                    {memberItems}
                </View>
            </ScrollView>
        </InfoBox>
        <View style={styles.contactsButton}>
          <BigButton 
              title='Remove Selected' 
              onPress={() => {}}></BigButton>
        </View>
      </>
    )
  }

  return (
      <SafeAreaView style={styles.container}>
        {currentView === "Settings" ? <SettingsView/> : ""}
        {currentView === "Account"? <AccountView/>: ""}
        {currentView === "Contacts"? <ContactsView/>: ""}
        {currentView === "loading" ? "" : ""}
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25242B',
    alignItems: 'center',
  },
  settingElements: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D',
    paddingTop: '8%',
    marginLeft: '7.5%'
  },
  contactsMembers: {
    alignItems: 'center',
  },
  contactsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  contactsButton: {

  }
});