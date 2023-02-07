import { StyleSheet, View } from 'react-native'

interface BackgroundProps {
    children: JSX.Element;
}

const BackgroundBox = (props: BackgroundProps) => {
    const {children} = props
    
    return <View style={styles.boxContainer}>
              {children}
          </View>
}

const styles = StyleSheet.create({
    boxContainer: {
        width: "90%",
        minHeight: 250,
        backgroundColor: "#E0E1F0",
        borderRadius: 15,   
    },

})


export default BackgroundBox;