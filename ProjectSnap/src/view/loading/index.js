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
} from 'react-native';

const LoadingView = () => {
 
    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
            width: '100%',
        }}>
            <Text>Loading</Text>
        </View>
    );
};



export default LoadingView;
