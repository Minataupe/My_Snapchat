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
  TextInput,
} from 'react-native';

import {AuthContext} from '../../../App';

const LoginView = ({}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [display, setDisplay] = React.useState(false);

  const {signIn, signUp} = React.useContext(AuthContext);

  if (display) {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          width: '100%',
        }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Connexion"
          onPress={() => signIn({username: username, password: password})}
        />
        <Button
          title="Vous n'avez pas de compte"
          onPress={() => setDisplay(false)}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          width: '100%',
        }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Register"
          onPress={() => signUp({username: username, password: password})}
        />
        <Button
          title="Vous avez deja un compte"
          onPress={() => setDisplay(true)}
        />
      </View>
    );
  }
};

export default LoginView;
