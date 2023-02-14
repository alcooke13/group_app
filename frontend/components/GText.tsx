import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
    children: string;
}

const GText = (props: Props) => {

    const {children} = props;
    
    return (
        <Text style={styles.text}>{children}</Text>
    );
};
const styles = StyleSheet.create({
    text: {
        fontFamily:'Ubuntu-Regular',
        fontSize:16    
}
});
export default GText;