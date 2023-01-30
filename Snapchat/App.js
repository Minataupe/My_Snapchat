import React from "react";
import Home from './Views/Home';
import RegisterForm from './Views/Register';
import LoginForm from './Views/Connect';
import {NativeRouter, Link, Route, Routes as Router, Navigate} from 'react-router-native';





const App = () => (
  
    <NativeRouter>
    <Router>
    <Route exact path="/" element={<Home />} />
    <Route  path="/register" element={<RegisterForm />} />

    <Route  path="/connect" element={<LoginForm />} />
    </Router>
    </NativeRouter>

);

export default App;