import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import loginView from './src/view/login';
import HomeView from './src/view/home';

const Stack = createNativeStackNavigator();
const image = { uri: "https://f.hellowork.com/blogdumoderateur/2016/04/snapchat-logo.jpg" };

export const AuthContext = React.createContext();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
     
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  let authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        let res = await fetch('http://snapi.epitech.eu:8000/connection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.username,
            password: data.password,
          }),
        }).then(response => response.json());

        console.log(res.data);
        if (res.data.token) {
          AsyncStorage.setItem('userToken', res.data.token);
          dispatch({ type: 'SIGN_IN', token: res.data.token });
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        let res = await fetch('http://snapi.epitech.eu:8000/inscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.username,
            password: data.password,
          }),
        }).then(response => response);


        if (res.status == 200) {
          let _res = await fetch('http://snapi.epitech.eu:8000/connection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.username,
              password: data.password,
            }),
          }).then(response => response.json());

          console.log(_res.data);
          if (_res.data.token) {
            SecureStore.setItemAsync('userToken', _res.data.token);
            dispatch({ type: 'SIGN_IN', token: _res.data.token });
          }
        }
      },
    }),
    [],
  );

  return (
    
    <AuthContext.Provider value={authContext} >
      <NavigationContainer>
        {state.userToken == null ? (
          <Stack.Navigator initialRouteName="logi">
            <Stack.Screen name="login" component={loginView} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Accueil" component={HomeView} />

            
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
