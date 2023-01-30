import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const image = {uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-email-512.png"}
const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
     ...props
    }) => {
    return (
        
        <View style={[style.inputContainer]}>
        <Text style={style.label}>{label}</Text>
        <TextInput placeholder='email'/>
        <Image source={{uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-email-512.png"}} />
            
        
        </View>
   
    );
};

const style = StyleSheet.create({
    label:{
        marginVertical: 5,
        fontSize: 14,
        color: '#C5C5C5',
    },
    inputContainer:{
        height: 55,
        backgroundColor: '#979797',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: "center"
    }
})
export default Input;