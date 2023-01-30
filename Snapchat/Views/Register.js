import React, {useState} from "react";
import { Button,TextInput, Image, StyleSheet, Text, ImageBackground, View } from "react-native";
import {NativeRouter, Link, Route, Routes as Router, Navigate} from 'react-router-native';
import axios from "axios";


const baseURL = 'http://snapi.epitech.eu:8000';

const imagesSnap = { uri: "https://f.hellowork.com/blogdumoderateur/2016/04/snapchat-logo.jpg" };

const RegisterForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onSubmitFormHandler = async (event) => {
    if (!email.trim() || !password.trim()) {
      alert("Name or Email is invalid");
      return;
    }

    setLoggedIn(true);


    try {
      const response = await axios.post(`${baseURL}/inscription`, { 'email':email, 'password':password }, { headers: {'content-type': 'application/json'}});
      if (response.status === 200) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setEmail('');
        setPassword('');
        setLoggedIn(false);

      
        
      } else {
        throw new Error("An error has occured");
      }
    } catch (error) {
      alert("An error has occurred");
    }
  }

    return(
      <View style={styles.container}>

      
        <ImageBackground source={imagesSnap} resizeMode='contain' style={styles.image}>
        <Text style={styles.text}>Register</Text>
        </ImageBackground>

        <View>
        <Image style={styles.logo} source={{uri: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-email-512.png"}} />
        <TextInput style={styles.input} 
        placeholder='Your Email'
        value={email}
        onChangeText={onChangeEmailHandler}
        placeholderTextColor="#000" />

        <Image style={styles.logo} source={{uri: "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_password-512.png"}} />
        <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor="#000"
        value={password}
        onChangeText={onChangePasswordHandler} />

        <Button title="Sign up" onPress={onSubmitFormHandler} />
        </View>

        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text style={styles.button}>Home</Text>
        </Link>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    paddingTop: 200,
    color: "black",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#3885db",
    color: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
    textAlign: "center" 
  },
  input: {
    color: 'black',
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    left: 50,
  
  },
  logo: {
    top: 55,
    left: 10,
    width: 50,
    height: 50,
  },

});

export default RegisterForm;