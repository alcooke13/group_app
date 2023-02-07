import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

interface Props {
    title: string,
    onPress?: () => void;
    status: boolean
}


const GroupNameButton = (props: Props) => {
    const {title, onPress, status} = props

    return<View style={styles.container}>
        
    <TouchableOpacity onPress={onPress} style={styles.insideButton}>
            <Text style={styles.text}>
                {title}
            </Text>
            <View style={[styles.notificationOn, status ? styles.notificationOn: styles.notifationOff]}>
                <Text></Text>
            </View>
    </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E0E1F0",
        width: "90%",
        minHeight: 57,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    
    text: {
        color: "#FF914D",
        fontSize: 36,
    },

    notificationOn: {
        borderRadius: 50,
        backgroundColor: "#18D488",
        height: 10,
        width: 10,
        marginTop: 10,
        marginLeft: 40
    },

    notifationOff: {
        backgroundColor: "#E0E1F0"
    },

    insideButton: {
        flexDirection: "row",

    }

})

export default GroupNameButton;