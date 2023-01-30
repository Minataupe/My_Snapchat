import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../../App';

import {launchImageLibrary} from 'react-native-image-picker';
const image = { uri: "https://f.hellowork.com/blogdumoderateur/2016/04/snapchat-logo.jpg" };


const HomeView = () => {
  const [dysplayListUser, setDisplayListUser] = React.useState(0); //view Users List; Set to 0 to hide the list
  const [imageGalerie, setImageGalerie] = React.useState(); //get Image from Galerie; setImage with Async Storage;
  const [listUsers, setListUsers] = React.useState([]); //get Users List; set with Async Storage;
  // const itemsRef = React.useRef(Array(listUsers.length).fill(React.createRef()));
  const itemEls = React.useRef(new Array())
  const {signOut} = React.useContext(AuthContext);
  
  // let myRefs = React.useRef();

  // /**
  //  *
  //  * @param {*} duration 10s
  //  * @param {*} to selected user; View mail, once selected, get the usertoken and send picture to the corresponding user
  //  * @param {*} image image selected (setImageGalerie) from the galerie;
  //  */
  const SendPicture = async (duration, to, image) => {
    let body = new FormData();
    body.append('duration', duration);
    body.append('to', to);
    body.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
    let token = await AsyncStorage.getItem('userToken');
    console.log('token', token);
    let res = await fetch('http://snapi.epitech.eu:8000/snap', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        token: token,
      },
      body: body,
    }).then(response => response.json());
    console.log('res', res);
    setDisplayListUser(0);
  };

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
    launchImageLibrary(options, response => {
      setImageGalerie(response.assets[0]);
      setDisplayListUser(true);
    });
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
  };

  const GetListUsers = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let res = await fetch('http://snapi.epitech.eu:8000/all', {
      method: 'GET',
      headers: {token: token},
    }).then(response => {
      return response.json();
    });
    setListUsers(res.data);
    // itemsRef = React.useRef(Array(listUsers.length).fill(React.createRef()));
  };
  React.useEffect(() => {
   
    GetListUsers();
  }, []);
  const test = () => {
    console.log('test');
  }
  if (dysplayListUser) {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}>
        <Text>ListUser</Text>
        <ScrollView>
          {listUsers.map((user, i) => (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                backgroundColor: '#333',
              }}
              onPress={(e) => {
                let to = itemEls.current[i]._internalFiberInstanceHandleDEV.memoizedProps.children
                SendPicture(10, to, imageGalerie);
              }}
            >
              <Text key={i} ref={(element) => itemEls.current[i] = element} style={{color: 'white'}}>{user.email}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      // View buttons Screen
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          width: '100%',
        }}>
        <Text>Project Snap</Text>
        <Button title="Ajoutez une image" onPress={openGallery} />
        <Button title="Choose Photo" onPress={handleChoosePhoto} />

        <Button title="Déconnection" onPress={() => signOut()} />
      </View>
    );
  }
};

export default HomeView;
