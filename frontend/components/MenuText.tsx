import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
    children: string;
}

const MenuText = (props: Props) => {

    const {children} = props;
    
    return (
        <Text style={styles.text}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 36,
        color:"#ff914d"
    }
});
export default MenuText;