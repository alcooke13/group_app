import { StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    onPress: () => void;
    size?: number;
    }
    const BackArrow = (props: Props) => {
    const { onPress, size } = props;
   return (
   <TouchableOpacity
     activeOpacity={0.7}
     style={[
       styles.checkBoxContainer,
       {
         backgroundColor: "transparent",
       },
     ]}
     onPress={onPress}
   >
    <Ionicons name="chevron-back-sharp" style={styles.activeIcon} size={size ? size : 48} color="white" /> 
   </TouchableOpacity>
   );
   };
   
   const styles = StyleSheet.create({
   activeIcon: {
    margin: "auto"
   },
    checkBoxContainer: {
    },
   });

   export default BackArrow;
