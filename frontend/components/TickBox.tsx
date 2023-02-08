import { StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    value: boolean;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
    }
   
    const TickBox = (props: Props) => {
    const { value, onPress, size, backgroundColor } = props;
   return (
   <TouchableOpacity
     activeOpacity={0.7}
     style={[
       styles.checkBoxContainer,
       {
         height: size || 59,
         width: size || 61,
         backgroundColor: "white" || backgroundColor,
         borderColor: '#FFFFFF',
       },
     ]}
     onPress={onPress}
   >

     {value ? <Ionicons name="checkmark-sharp" style={styles.activeIcon} size={size ? 0.9*size : 54} color="#FF914D" /> : <></>}
   </TouchableOpacity>
   );
   };
   
   const styles = StyleSheet.create({
   activeIcon: {
    margin: "auto"
   },
    checkBoxContainer: {
     borderRadius: 5,
     borderWidth: 1.3,
    },
   });

   export default TickBox;
