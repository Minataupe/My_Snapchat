import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

const Picture = () => {


  const SendPicture = async (duration, to, image) => {
 
    let res = await fetch("http://snapi.epitech.eu:8000/snap", {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        "token": "cKhCngUozhkuq5KRotZGjqPz"
      },
      body: JSON.stringify({
        duration: duration,
        to: to,
        image: image,
      }),
    })
    console.log(res)
  }


  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  const handleChoosePhoto = () => {
    launchImageLibrary(options, (response) => {
      console.log("Res:", response.assets[0].fileName)
      SendPicture(5, 'enes.koc@epitech.eu', response.assets[0])
    });
  };


  const openGallery = async () => {
    const result = await launchImageLibrary(options);
  }

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '100%',
      width: '100%',
    }}>
      <Text>Project Snap</Text>
      <Button title="Ajoutez une image" onPress={openGallery} />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />


    </View>
  );
};



export default Picture;
