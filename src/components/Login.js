import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import {Alert, Image, Text, View , StyleSheet, TextInput, TouchableOpacity, Dimensions, BackHandler, Button} from "react-native";
import { useFonts } from 'expo-font';
import { useFormik } from 'formik';
// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore, collection, where, query, getDocs, addDoc} from 'firebase/firestore';
import { firebaseConfig } from '../data/firebase';
import sha256 from 'sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const Login = (props) => {
    const navigation = useNavigation();

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

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        (async () => {
            await AsyncStorage.getItem('User').then((value) => {
                if (value != null) {
                    Main();
                }
            });
        })()
    }, [])

    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: ''
        },
        onSubmit: async (values) => { 
            if (values.Email.trim() != '' && values.Password.trim() != '') { 
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                const userRef = collection(db, "User");
                var q = query(userRef, where("Email", "==", values.Email.trim().toLowerCase()));
                q = query(q, where("Password", "==", sha256(values.Password)));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) { 
                    querySnapshot.forEach((doc) => { 
                        console.log('User: ', doc.data())
                        AsyncStorage.setItem('User', JSON.stringify(doc.data()));
                    });
                    Main();
                    return;
                }
                alert("Error, usuario o contraseña incorrectos");
                return;
            }
            alert("Error, existen campos en blanco");
            return;
        }
    })

    const Register = () => {
        navigation.navigate('Register');
    }

    const Main = () => {
        navigation.navigate('Navigation');
    }

    return (
        <View>
            <StatusBar style="light" />
            <View style={styles.container}>
                <Image source={require('../../assets/splash.png')} style={styles.logo} />
                <View>
                    <TextInput
                        defaultValue={formik.values.Email}
                        onChangeText={formik.handleChange('Email')}
                        style={styles.input} placeholder='Email' placeholderTextColor='#ABABAB' keyboardType='email-address' />
                </View>
                <View>
                    <TextInput
                        defaultValue={formik.values.Password}
                        onChangeText={formik.handleChange('Password')}
                        style={styles.input} placeholder='Contraseña' placeholderTextColor='#ABABAB' secureTextEntry={true} />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={formik.handleSubmit}>
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