import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
    children: string;
}

const ScreenHeaderText = (props: Props) => {

    const {children} = props;
    
    return (
        <Text style={styles.text}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color:#ff914d,
        fontWeight: 'bold'
    }
});
export default ScreenHeaderText;