import { Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    value: boolean;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
    }
   
    const TickBox = (props: Props) => {
    const { value, onPress, size, backgroundColor } = props;
    let iconSize: number = 22;
   return (
   <TouchableOpacity
     activeOpacity={0.7}
     style={[
       styles.checkBoxContainer,
       {
         height: size || 38,
         width: size || 38,
         backgroundColor: "white",
         borderColor: '#FFFFFF',
       },
     ]}
     onPress={onPress}
   >

     {value ? <Ionicons name="checkmark-sharp" size={size ? size: iconSize} color="#FF914D" /> : <></>}
   </TouchableOpacity>
   );
   };
   
   const styles = StyleSheet.create({
   activeIcon: {
   width: 32,
   height: 32,
   tintColor: 'white',
   },
    checkBoxContainer: {
     borderRadius: 5,
     borderWidth: 1.3,
    },
   });

   export default TickBox;
