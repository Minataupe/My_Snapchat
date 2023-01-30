import React from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import {NativeRouter, Link, Route, Routes as Router} from 'react-router-native';

const image = { uri: "https://f.hellowork.com/blogdumoderateur/2016/04/snapchat-logo.jpg" };


    
    


const Home = () => (
    
  <View style={styles.container}>

    <ImageBackground source={image} resizeMode='contain' style={styles.image}>
      <Text style={styles.text}>Home</Text>
    </ImageBackground>

    <Link to="/register" underlayColor="#f0f4f7" style={styles.navItem}>
        <Text style={styles.button}>Register</Text>
    </Link>

    <Link to="/connect" underlayColor="#f0f4f7" style={styles.navItem}>
        <Text style={styles.buttonRed}>connect</Text>
    </Link>

  </View>
    
);

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
  buttonRed: {
    backgroundColor: "#ed0000",
    color: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
    textAlign: "center" 
  }
});

export default Home;