import React, { useState } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import {Alert, Image, Text, View , StyleSheet, TextInput, TouchableOpacity, Dimensions, BackHandler, Button} from "react-native";
import { useFonts } from 'expo-font';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../data/firebase.js';


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = initializeApp(firebaseConfig);

    const [loaded] = useFonts({
        Yantramanav: require('../../assets/fonts/Yantramanav-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    const Register = () => {
        props.navigation.navigate('Register');
    }

    const Main = () => {
        props.navigation.navigate('Navigation');
    }

    const handleBackPress = () => {
        Alert.alert(
            'Salir',
            '¿Estas seguro que quieres salir?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Salir', onPress: () => BackHandler.exitApp() }
            ],
            { cancelable: false }
        )
        return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return (
        <View>
            <StatusBar style="light" />
            <View style={styles.container}>
                <Image source={require('../../assets/splash.png')} style={styles.logo} />
                <View>
                    <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='Email' placeholderTextColor='#ABABAB' keyboardType='email-address'/>
                </View>
                <View>
                    <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder='Contraseña' placeholderTextColor='#ABABAB' secureTextEntry={true}/>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={() => Main()}>
                        <Text style={styles.text}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => Register()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
                        <Text style={styles.texts}>No tienes cuenta? </Text>
                        <Text style={styles.register}>Registrate</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexGrow: 1,
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Yantramanav'
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 50
    },
    input: {
        width: Dimensions.get('window').width -40,
        height: 50,
        marginTop: 30,
        backgroundColor: '#714899',
        borderRadius: 10,
        borderWidth: 1,
        color: '#FFFFFF',
        padding: 10,
        fontFamily: 'Yantramanav'
    },
    button: {
        width: Dimensions.get('window').width -40,
        height: 50,
        marginTop: 30,
        backgroundColor: '#5D04AC',
        borderRadius: 10,
        borderWidth: 0,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Yantramanav',
    },
    texts: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Yantramanav',
        textAlign: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Yantramanav',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    register: {
        color: '#5D04AC',
        fontSize: 16,
        fontFamily: 'Yantramanav'
    },
    distance: {
        marginTop: 30
    }
});