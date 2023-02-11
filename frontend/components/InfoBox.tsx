import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SmallPlus from './SmallPlus';

interface Props {
  header: string;
  smallPlus?: any;
  children: JSX.Element | JSX.Element[];
  boxHeight?: string;
  boxMarginTop?: string;
  boxMarginBottom?: string;
};

const InfoBox = (props: Props) => {

  const {header, smallPlus, children, boxHeight, boxMarginTop, boxMarginBottom} = props;

  return (
      <View style={[styles.container, {marginTop: boxMarginTop, marginBottom: boxMarginBottom}]}>
        <View style={styles.top}>
          <Text style={styles.header}>
            {header}
          </Text>
          <View style={styles.plus}>
            {smallPlus}
          </View>
        </View>
        <View style={[styles.main, {height: boxHeight}]}>
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
    width: '90%'
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
  },
});

export default InfoBox;