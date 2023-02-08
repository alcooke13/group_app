import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SmallPlus from './SmallPlus';

interface Props {
  header: string;
  smallPlus?: any;
  children: JSX.Element|JSX.Element[];
};

const InfoBox = (props: Props) => {

  const {header, smallPlus, children} = props;

  return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.header}>
            {header}
          </Text>
          <View style={styles.plus}>
            {smallPlus}
          </View>
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
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#545264',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF914D',
  },
  plus: {
    position: 'absolute',
    right: 10,
    top: 4,
  },
  main: {
    backgroundColor: '#E0E1F0',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    minHeight: 225
  },
});

export default InfoBox;