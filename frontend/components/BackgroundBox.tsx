import { StyleSheet, View } from 'react-native'

interface Props {
    children: JSX.Element,
    width?: number | string,
}

const BackgroundBox = (props: Props) => {

    const {children, width} = props;
    
    return (
        <View style={{
            width: "90%" || width,
            minHeight: 250,
            backgroundColor: "#E0E1F0",
            borderRadius: 15,   

        }}>
            {children}
        </View>
    );
};



export default BackgroundBox;