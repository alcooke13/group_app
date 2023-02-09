import { Divider } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';

const LineBreak = () => {
    return (
        <View style={{
            height: 1,
            alignSelf: 'stretch'                    
            }}> 
        <Divider insetType="middle" color='#545264' width={1} ></Divider>
        </View> 
    );
};

export default LineBreak;
