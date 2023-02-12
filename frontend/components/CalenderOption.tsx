import { Calendar } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { EventData } from '../services/EventServices';


interface Props {
    onPress: () => void;
    calendarEvents?: Array<EventData>;
    chooseDate?: () => void;
    setSavedDate?: any;
    resultDates?: any;
    changeViewToDay?: any
    
}

const CalendarOption = (props: Props) => {
    const {onPress, resultDates, changeViewToDay, setSavedDate} = props
    ;
    const currentDate: Date = new Date();
    const today = currentDate.toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        });
 

    function formatDate(year:number, month:number, day:number) {
        const date = new Date(year, month - 1, day)
        const result = date.toLocaleDateString("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })

          return result;
      
}
    return (
        <View style={styles.calendar}>
            <Calendar
               
                markedDates={resultDates}   
                current={today}
                minDate={today}
                // Handler which gets executed on day press. Default = undefined

                onDayPress={day => {
                    let newDate = (formatDate(day.year, day.month, day.day))
                    console.log(newDate)
                    setSavedDate(newDate)
                    changeViewToDay()
                }}
                // onDayPress={day => {
                //     console.log('selected day', day);
                //   }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM  yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
                style={{
                    backgroundColor: 'transparent',
                    height: 300,
                }}
                theme={{
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    textSectionTitleColor: '#25242B',
                    // textSectionTitleDisabledColor: '#d9e1e8',
                    // selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#FF914D',
                    todayTextColor: '#25242B',
                    dayTextColor: '#25242B',
                    textDisabledColor: '#8e8d94',
                    dotColor: '#FF914D',
                    // selectedDotColor: '#ffffff',
                    arrowColor: '#FF914D',
                    // disabledArrowColor: '#d9e1e8',
                    monthTextColor: '#25242B',
                    // indicatorColor: 'blue',
                    // textDayFontFamily: 'ubuntu',
                    // textMonthFontFamily: 'ubuntu',
                    // textDayHeaderFontFamily: 'ubuntu',
                    // textDayFontWeight: '300',
                    // textMonthFontWeight: 'bold',
                    // textDayHeaderFontWeight: '300',
                    textDayFontSize: 18,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendar: {
        width: "100%",
        minHeight: 380,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
});

export default CalendarOption;