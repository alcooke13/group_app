import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DatePollButton from './components/DatePollButton';

export default function App() {
  return (
    <View style={styles.container}>
      < DatePollButton dateOption={'Monday 15th'} votedOn={true}></DatePollButton>
      < DatePollButton dateOption={'Tuesday 16th'} votedOn={false}></DatePollButton>
      < DatePollButton dateOption={'Wednesday 17th'} votedOn={true} ></DatePollButton>
      < DatePollButton dateOption={'Saturday 20th'} votedOn={false} ></DatePollButton>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
