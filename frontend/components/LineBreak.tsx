import { Divider } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';

const LineBreak = () => {
    return (
        <View style={{
            height: 1,
            alignSelf: 'stretch'                    
            }}> 
        <Divider inset={true} insetType="middle" color='#E0E1F0' width={1} ></Divider>
        </View> 
    );
};

export default LineBreak;
