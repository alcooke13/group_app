import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import InfoBox from '../components/InfoBox';
import { useEffect, useState } from 'react';
import TextHeader from '../components/TextHeader';
import SmallButton from '../components/SmallButton';
import LineBreak from '../components/LineBreak';
import { useIsFocused } from "@react-navigation/native";
import BackgroundBox from '../components/BackgroundBox';

interface Props {
    user: number
}

export default function AddGroupScreen(props: Props) {

    const isFocused = useIsFocused();

    const { user } = props;

    useEffect(() => {

        if (isFocused) {

        }
    }, [isFocused]);

    const memberItems = {}

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
                </ScrollView>
            </InfoBox>
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
    }
});