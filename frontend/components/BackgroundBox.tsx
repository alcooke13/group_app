import { StyleSheet, View } from 'react-native'

interface Props {
    children: JSX.Element,
    boxWidth?: number | string,
    boxHeight?: string | number;
    boxMarginTop?: string;
    boxMarginBottom?: string;
}

const BackgroundBox = (props: Props) => {

    const {children, boxWidth, boxHeight, boxMarginTop, boxMarginBottom} = props;
    
    return (
        <View style={{
            width: boxWidth || "90%",
            height: boxHeight || "10%",
            marginTop: boxMarginTop || "0%",
            marginBottom: boxMarginBottom|| "0%",
            backgroundColor: "#E0E1F0",
            borderRadius: 15,
        }}>
            {children}
        </View>
    );
};


export default BackgroundBox;