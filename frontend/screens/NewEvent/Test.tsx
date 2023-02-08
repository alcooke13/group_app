const eventCheckList = () => {
    return (
        <View>
            <Text> Checklist for new event with known details</Text>
        </View>
    )
}
const dateSelection = () => {
    return (
        <View>
            <Text> date input </Text>
        </View>
    )
}
const activitySelection = () => {
    return (
        <View>
            <Text> activity input </Text>
        </View>
    )
}
const locationSelection = () => {
    return (
        <View>
            <Text> location input </Text>
        </View>
    )
}
const landingPage = () => {
    return (
        <View>
            <Text style={styles.title}>Do you know the event details?</Text>
            <View style={styles.buttonsParent}>
                <View style={styles.buttons} >
                    <SmallButton title={"Yes"} onPress={onPressYes} ></SmallButton>
                </View>
                <View style={styles.buttons}>
                    <SmallButton title={"No"} onPress={onPressNo} ></SmallButton>
                </View>
            </View>
        </View>
    )
}