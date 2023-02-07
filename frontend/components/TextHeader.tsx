import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
    children: string;
}

const TextHeader = (props: Props) => {

    const {children} = props;
    
    return (
        <Text style={styles.text}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    },
});

export default TextHeader;