import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  header: string;
  children: JSX.Element;
};

const InfoBox = (props: Props) => {

  const {header, children} = props;

  return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>
            {header}
          </Text>
        </View>
        <View style={styles.main}>
          {children}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxHeight: '20%',
  },
  top: {
    width: '100%',
    height: '20',
    backgroundColor: '#545264',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
    color: '#FF914D',
  },
  main: {
    backgroundColor: '#E0E1F0',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default InfoBox;