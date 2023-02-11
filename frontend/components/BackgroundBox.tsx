import { StyleSheet, View } from 'react-native'

interface Props {
    children: JSX.Element,
    boxWidth?: number | string,
    boxHeight?: string;
    boxMarginTop?: string;
    boxMarginBottom?: string;
}

const BackgroundBox = (props: Props) => {

    const {children, boxWidth, boxHeight, boxMarginTop, boxMarginBottom} = props;
    
    return (
        <View style={{
            width: "90%" || boxWidth,
            height: "10%" || boxHeight,
            marginTop: "0%" || boxMarginTop,
            marginBottom: "0%" || boxMarginBottom,
            backgroundColor: "#E0E1F0",
            borderRadius: 15, 
        }}>
            {children}
        </View>
    );
};


export default BackgroundBox;