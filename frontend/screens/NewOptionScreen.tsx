import * as React from 'react'
import { View, StyleSheet, SafeAreaView, TextInput, Text } from 'react-native'
import { useState } from 'react'
import BackArrow from '../components/BackArrow'
import TextHeader from '../components/TextHeader'
import BackgroundBox from '../components/BackgroundBox'
import MenuText from '../components/MenuText'
import SmallButton from '../components/SmallButton'
import BigButton from '../components/BigButton'
import InfoBox from '../components/InfoBox'
import TimeOfDayButton from '../components/TimeOfDayButton'
import CalendarOption from '../components/CalenderOption'
import {
  updateDatePollDataWithNewOption,
  DatePollData
} from '../services/DatePollServices'
import {
  updateLocationPollDataWithNewOption,
  LocationPollData
} from '../services/LocationPollServices'
import {
  updateActivityPollDataWithNewOption,
  ActivityPollData
} from '../services/ActivityPollServices'
import LineBreak from '../components/LineBreak'
import ScreenHeaderText from '../components/ScreenHeaderText'

interface Props {
  user: number
  setActivePollType?: any
  activePollType?: any
  activeGroupPollId?: any
  setState: React.Dispatch<React.SetStateAction<string>>
  updatePollChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function (props: Props) {
  const {
    user,
    setActivePollType,
    setState,
    activePollType,
    activeGroupPollId,
    updatePollChange
  } = props
  const [pollView, setPollView] = useState<string>(activePollType)
  const [savedActivityPoll, setSavedActivityPoll] = useState<string>('')
  const [savedLocationPoll, setSavedLocationPoll] = useState<string>('')
  const [savedDate, setSavedDated] = useState<string>('')
  const [savedTime, setSavedTime] = useState<string>('')
  const [dateBundle, setDateBundle] = useState<DatePollData>()
  const [locationBundle, setLocationBundle] = useState<LocationPollData>()
  const [activityBundle, setActivityBundle] = useState<ActivityPollData>()

  // Change state functions
  const changeFromActivityToConfirmation = () => {
    if (activePollType === 'Activity') setPollView('confirmation');
  }

  const changeFromLocationToConfirmation = () => {
    if (activePollType === 'Location') setPollView('confirmation');
  }

  const changeViewToDay = () => {
    setPollView('dayOption');
  }

  const changeConfirmationScreen = () => {
    prepareBundle();
  }
  const ActivityPollInput = () => {
    let activityValue: string

    return (
      <View style={styles.outer}>
        <View style={styles.backButtonHeaderContainer}>
          <View style={styles.header}>
            <BackArrow onPress={() => setState('Single Group')} />
          </View>
          <ScreenHeaderText>Activity Poll</ScreenHeaderText>
        </View>

        <View style={styles.innerContainer}>
          <BackgroundBox boxHeight='35%'>
            <View style={styles.textBox}>
              <TextHeader>Add Activity Option</TextHeader>
              <TextInput
                style={styles.inputBox}
                onChangeText={(inputText: string) =>
                  (activityValue = inputText)
                }
              />
            </View>
          </BackgroundBox>
          <View style={styles.submitButton}>
            <BigButton
              title='Add Option'
              onPress={() => {
                setSavedActivityPoll(activityValue)
                changeFromActivityToConfirmation()
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  const LocationPollInput = () => {
    let locationValue: string

    return (
      <View style={styles.outer}>
        <View style={styles.backButtonHeaderContainer}>
          <View style={styles.header}>
            <BackArrow onPress={() => setState('Single Group')} />
          </View>
          <ScreenHeaderText>Location Poll</ScreenHeaderText>
        </View>

        <View style={styles.innerContainer}>
          <BackgroundBox boxHeight='35%'>
            <View style={styles.textBox}>
              <TextHeader>Option Input</TextHeader>
              <TextInput
                style={styles.inputBox}
                onChangeText={(inputText: string) =>
                  (locationValue = inputText)
                }
              />
            </View>
          </BackgroundBox>
          <View style={styles.submitButton}>
            <BigButton
              title='Add Option'
              onPress={() => {
                setSavedLocationPoll(locationValue)
                changeFromLocationToConfirmation()
              }}
            />
          </View>
        </View>
      </View>
    )
  }
  let eventDate = new Date(savedDate + savedTime).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  let eventTime = new Date(savedDate + savedTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const detailsReset = () => {
    if (activePollType === 'Activity') {
      setSavedActivityPoll('')
      setPollView('Activity')
    }

    if (activePollType === 'Location') {
      setSavedLocationPoll('')
      setPollView('Location')
    }
    if (activePollType === 'Date') {
      setSavedDated('')
      setSavedTime('')
      setPollView('Date')
    }
  }

  function prepareBundle() {
    // Date/Time Bundle
    let dateStringKey: string = savedDate + savedTime
    const newBundle: { [key: string]: [] } = {}
    newBundle[dateStringKey] = []

    //Location Bundle
    let locationStringKey: string = savedLocationPoll
    const newLocationBundle: { [key: string]: [] } = {}
    newLocationBundle[locationStringKey] = []

    //Activity Bundle
    let activityStringKey: string = savedActivityPoll
    const newActivityBundle: { [key: string]: [] } = {}
    newActivityBundle[activityStringKey] = []

    // Making the put requests:
    let pollId: number = activeGroupPollId

    // Date/Time
    if (dateStringKey !== '') {
      updateDatePollDataWithNewOption(pollId, newBundle).then(data => {
        setDateBundle(data)
      })
    }

    //Location Data
    if (locationStringKey !== '') {
      console.log(newLocationBundle)
      updateLocationPollDataWithNewOption(pollId, newLocationBundle).then(
        data => {
          setLocationBundle(data)
        }
      )
    }

    // Activity Data
    if (activityStringKey !== '') {
      updateActivityPollDataWithNewOption(pollId, newActivityBundle).then(
        data => {
          setActivityBundle(data)
        }
      )
    }

    setSavedActivityPoll('')
    setSavedLocationPoll('')
    setSavedDated('')
    setSavedTime('')

    updatePollChange(true)
    setState('Single Group')
  }


  return (
    // container
    <>
      {/* ACTIVITY */}

      {pollView === 'Activity' ? <ActivityPollInput></ActivityPollInput> : ''}

      {/* LOCATION */}

      {pollView === 'Location' ? (
        <>
          <LocationPollInput></LocationPollInput>
        </>
      ) : (
        ''
      )}

      {/* DATEPOLL CALENDER */}

      {pollView === 'Date' ? (
        <View style={styles.outer}>
          <View style={styles.backButtonHeaderContainer}>
            <View style={styles.header}>
              <BackArrow onPress={() => setState('Single Group')} />
            </View>
            <View style={{ marginLeft: '18%' }}>
              <ScreenHeaderText>Date Poll</ScreenHeaderText>
            </View>
          </View>
          <View style={styles.containerCalendar}>
            <InfoBox header='Calendar' boxMarginBottom='10%'>
              <CalendarOption
                onPress={changeViewToDay}
                changeViewToDay={changeViewToDay}
                setSavedDate={setSavedDated}
              />
            </InfoBox>
          </View>
        </View>
      ) : (
        ''
      )}

      {/* DAY VIEW */}

      {pollView === 'dayOption' ? (
        <View style={styles.outer}>
          <View>
            <View style={styles.backButtonHeaderContainer}>
              <View style={styles.header}>
                <BackArrow onPress={() => setState('Single Group')} />
              </View>
              <View style={{ marginLeft: '18%' }}>
                <ScreenHeaderText>Date Poll</ScreenHeaderText>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: '25%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View>
              <Text style={styles.dateQuestion}>
                What time of day will your event be?
              </Text>
            </View>

            <TimeOfDayButton
              timeOfDayOption='Morning'
              selected={savedTime === 'T09:00' ? true : false}
              onPress={() => setSavedTime('T09:00')}
            />
            <TimeOfDayButton
              timeOfDayOption='Afternoon'
              selected={savedTime === 'T12:00' ? true : false}
              onPress={() => setSavedTime('T12:00')}
            />
            <TimeOfDayButton
              timeOfDayOption='Evening'
              selected={savedTime === 'T18:00' ? true : false}
              onPress={() => setSavedTime('T18:00')}
            />
          </View>
          <View style={styles.submitButton}>
            <BigButton
              title='Add To Poll'
              onPress={() => changeConfirmationScreen()}
            />
          </View>
        </View>
      ) : (
        ''
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25242B'
  },

  backButtonHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  innerContainer: {
    backgroundColor: '#25242B',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  containerCalendar: {
    backgroundColor: '#25242B',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '15%'
  },
  outer: {
    width: '100%',
    height: '100%',
  },
  filteredBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%'
  },

  inputBox: {
    marginTop: '10%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: '5%',
    borderColor: 'white',
    backgroundColor: 'white',
    alignSelf: 'center',
    fontFamily: 'Ubuntu-Regular'
  },
  title: {
    fontSize: 24,
    padding: 15,
    textAlign: 'center',
    fontFamily: 'Ubuntu-Bold'
  },
  reviewText: {
    fontSize: 24,
    padding: 10,
    marginTop: '5%',
    fontFamily: 'Ubuntu-Regular'
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20
  },
  submitButton: {
    alignItems: 'flex-end',
    paddingRight: '5%',
    paddingTop: '10%',
  },
  dateQuestion: {
    fontSize: 24,
    marginHorizontal: '10%',
    marginVertical: '10%',
    textAlign: 'center',
    color: 'white',
    fontFamily:'Ubuntu-Bold'
  },
  header: {
    marginTop: '5%',
    marginLeft: '5%',
    marginBottom: '5%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    fontFamily: 'Ubuntu-Bold'
}, 
})
