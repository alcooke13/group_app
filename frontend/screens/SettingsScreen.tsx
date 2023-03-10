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

interface Props {
    user: number
}

export default function SettingsScreen(props: Props) {

  const { user } = props;
  const isFocused = useIsFocused();

  const [currentView, updateCurrentView] = useState<String>("Settings");
  const [userDetails, setUserDetails] = useState<UserData>();
  const [friends, setFriends] = useState<UserData[]>([]);
  const [settingsUpdated, updateSettingsUpdated] = useState<boolean>(false);
  const [friendsToRemove, updateFriendsToRemove] = useState<Array<number>>([]);

  useEffect(() => {
    if (isFocused || settingsUpdated) {
      updateCurrentView("Settings");
      getFriendsByUserId(user)
      .then((userFriends) => {
          setFriends(userFriends);
      })

      getUserDataByUserId(user)
      .then((user) => {
        setUserDetails(user);
      })

      updateSettingsUpdated(false);
    }
  }, [isFocused, settingsUpdated]);


  function SettingsView() {
    return (
      <View style={styles.settingsContainer}>
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
        </View>
      </View>
    )
  }

  function AccountView() {
    let newUserNameValue: string;
    let newAddressValue: string;

    return (
      <View style={styles.accountContainer}>
        <View style={styles.settingsHeader}>
          <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
        </View>
        <BackgroundBox boxHeight={"18%"} boxMarginTop="5%">
          <View style={styles.accountBox}>
            <Text style={styles.accountHeader}>Username</Text>
            <TextInput 
                style={styles.accountNameInput}
                defaultValue={userDetails?.userName}
                onChangeText={(text) => newUserNameValue = text}>
            </TextInput>
          </View>
        </BackgroundBox>
        <BackgroundBox boxHeight={"18%"} boxMarginTop="10%">
          <View style={styles.accountBox}>
            <Text style={styles.accountHeader}>Phone Number</Text>
            <Text  style={styles.accountPhoneNumber}>{userDetails?.phoneNumber}</Text>
          </View>
        </BackgroundBox>
        <BackgroundBox boxHeight={"25%"} boxMarginTop="10%" boxMarginBottom='10%'>
          <View style={styles.accountBox}>
            <Text style={styles.accountHeader}>Address</Text>
            <TextInput 
                style={styles.accountAddress}
                multiline={true}
                defaultValue={userDetails?.address}
                onChangeText={(text) => newAddressValue = text}>
            </TextInput>
          </View>
        </BackgroundBox>
        <View style={styles.accountButton}>
          <BigButton 
              title='Update'
              onPress={() => {
                if (newUserNameValue) updateUserName(user, {'new': newUserNameValue});
                if (newAddressValue) updateUserAddress(user, {'new': newAddressValue});
                updateSettingsUpdated(true);
              }}></BigButton>
        </View>
      </View>
    )
  }

  function ContactsView() {
    const memberItems = friends?.map((friend, index) => {
      return(
          <ButtonSelector option={friend.userName} 
                          onPress={() => {
                              if (!friendsToRemove.includes(friend.id)) {
                                  const newFriendsToRemove = [... friendsToRemove];
                                  newFriendsToRemove.push(friend.id);
                                  updateFriendsToRemove(newFriendsToRemove);
                              } else {
                                  const index = friendsToRemove.indexOf(friend.id);
                                  if (index !== -1) {
                                    const newFriendsToRemove = [... friendsToRemove];
                                    newFriendsToRemove.splice(index, 1);
                                    updateFriendsToRemove(newFriendsToRemove);
                                  }
                              }
                          }} 
                          selected={friendsToRemove.includes(friend.id)}
                          key={index}></ButtonSelector>
      )
    });

    return (
      <View style={styles.contactContainer}>
        <View style={styles.settingsHeader}>
          <BackArrow onPress={() => updateCurrentView("Settings")}></BackArrow>
        </View>
        <InfoBox header='Contacts'
                  boxHeight='80%'
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
              onPress={() => {
                if (friendsToRemove.length > 0) deleteFriendsByUserId(user, friendsToRemove);
                updateSettingsUpdated(true);
              }}></BigButton>
        </View>
      </View>
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
  },
  settingElements: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF914D',
    paddingTop: '8%',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Bold'
  },
  contactsMembers: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Ubuntu-Regular'
  },
  settingsHeader: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
    fontFamily: 'Ubuntu-Bold'
  },
  settingsContainer: {
    paddingTop: '10%',
    width: '100%',
    height: '100%'
  },
  accountContainer: {
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    width: "100%",
    height: "100%"
  },
  contactContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  contactsButton: {
    alignSelf: 'flex-end',
    paddingBottom: '10%',
    paddingRight: '5%',
  },
  accountBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountHeader: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 24,
    fontFamily: 'Ubuntu-Bold'
  },
  accountNameInput: {
    padding: 10,
    backgroundColor: 'white',
    width: '70%',
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular'
  },
  accountPhoneNumber: {
    padding: 10,
    width: '70%',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Ubuntu-Regular'
  },
  accountAddress: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    width: '70%',
    height: '50%',
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular'
  },
  accountButton: {
    alignSelf: 'flex-end',
    paddingRight: '5%'
  }
});