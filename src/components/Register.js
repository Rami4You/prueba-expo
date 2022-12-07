import React, {useEffect} from 'react'
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'
import {Image, Text, View , StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, BackHandler} from "react-native";
import { useFormik } from 'formik';
// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore, collection, where, query, getDocs, addDoc} from 'firebase/firestore';
import { firebaseConfig } from '../data/firebase';
import sha256 from 'sha256';

export default function Register(props) {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function() {
            props.navigation.navigate('Login');
            return true;
        });
    }, [])

    const formik = useFormik({
        initialValues: {
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Email: '',
            Password: '',
            RepeatPassword: '',
            City: ''
        },
        onSubmit: async (values) => {
            if(values.FirstName.trim() != '' && values.LastName.trim() != '' && values.PhoneNumber.trim() != '' && values.Email.trim() != '' && values.Password.trim() != '' && values.RepeatPassword.trim() != ''){
                if(values.Password == values.RepeatPassword)
                {
                    const app = initializeApp(firebaseConfig);
                    const db = getFirestore(app);
                    const userRef = collection(db, "User");
                    const q = query(userRef, where("Email", "==", values.Email.trim().toLowerCase()));
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot.empty) { 
                        let user = {}
                        user.FirstName = values.FirstName.trim();
                        user.LastName = values.LastName.trim();
                        user.PhoneNumber = values.PhoneNumber.trim();
                        user.Email = values.Email.trim().toLowerCase();
                        user.Password = sha256(values.Password);
                        user.Role = 4;
                        user.City = 1;
                        user.Status = 1;
                        user.CreatedAt = new Date();

                        const docRef = await addDoc(userRef, user);
                        if (docRef.id != null) {
                            alert("Usuario registrado correctamente.");
                            props.navigation.navigate('Login');
                            return;
                        }
                        alert("Error al registrar el usuario.");
                        return;

                    }

                    alert("Error el email ingresado ya se encuentra registrado.");
                    return;
                }
                alert("Error las contraseñas no coinciden.");
                return;
            }
            alert("Error, existen campos en blanco.");
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require('../../assets/splash.png')} style={styles.logo} />
                    <View>
                        <TextInput
                            defaultValue={formik.values.FirstName}
                            onChangeText={formik.handleChange('FirstName')}
                            style={styles.input} placeholder='Nombre' placeholderTextColor='#ABABAB' />

                        <TextInput
                            defaultValue={formik.values.LastName}
                            onChangeText={formik.handleChange('LastName')}
                            style={styles.input} placeholder='Apellidos' placeholderTextColor='#ABABAB' />

                        <TextInput
                            defaultValue={formik.values.PhoneNumber}
                            onChangeText={formik.handleChange('PhoneNumber')}
                            style={styles.input} placeholder='Numero de telefono' placeholderTextColor='#ABABAB' keyboardType='phone-pad' />

                        <TextInput
                            defaultValue={formik.values.Email}
                            onChangeText={formik.handleChange('Email')}
                            style={styles.input} placeholder='Email' placeholderTextColor='#ABABAB' keyboardType='email-address' />

                        <TextInput
                            defaultValue={formik.values.Password}
                            onChangeText={formik.handleChange('Password')}
                            style={styles.input} placeholder='Contraseña' placeholderTextColor='#ABABAB' secureTextEntry={true} />

                        <TextInput
                            defaultValue={formik.values.RepeatPassword}
                            onChangeText={formik.handleChange('RepeatPassword')}
                            style={styles.input} placeholder='Repetir Contraseña' placeholderTextColor='#ABABAB' secureTextEntry={true} />
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={formik.handleSubmit}>
                            <Text style={styles.texts}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Yantramanav'
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    input: {
        width: Dimensions.get('window').width - 40,
        height: 50,
        marginTop: 20,
        backgroundColor: '#714899',
        borderRadius: 10,
        borderWidth: 1,
        color: '#FFFFFF',
        padding: 10,
        fontFamily: 'Yantramanav'
    },
    button: {
        width: Dimensions.get('window').width - 40,
        height: 50,
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: '#5D04AC',
        borderRadius: 10,
        borderWidth: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Yantramanav'
    },
    distance: {
        marginTop: 30
    },
    header: {
        width: '100%',
        paddingLeft: 20,
        paddingTop: 20,
        justifyContent: 'flex-end',
    },
    texts: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Yantramanav',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});