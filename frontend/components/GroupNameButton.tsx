import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

interface Props {
  title: string
  onPress: Function
  status: boolean
}

const GroupNameButton = (props: Props) => {
  const { title, onPress, status } = props

  return (
      <TouchableOpacity onPress={onPress} style={styles.insideButton}>
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          <View
            style={[
              styles.notificationOn,
              status ? styles.notificationOn : styles.notifationOff
            ]}
          >
            <Text></Text>
          </View>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E1F0',
    width: '100%',
    minHeight: 57,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15
  },

  text: {
    color: '#FF914D',
    fontSize: 36,
    alignItems: 'center',
    fontFamily: 'Ubuntu-Bold'
  },

  notificationOn: {
    borderRadius: 50,
    backgroundColor: '#18D488',
    height: 10,
    width: 10,
    marginTop: 10,
    marginLeft: 40,
    position: 'absolute',
    right: -30,
    top: -4
  },

  notifationOff: {
    backgroundColor: '#E0E1F0'
  },

  insideButton: {
    flexDirection: 'row'
  }
})

export default GroupNameButton
