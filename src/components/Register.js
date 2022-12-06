import React from 'react'
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'
import {Image, Text, View , StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, BackHandler} from "react-native";

export default function Register(props) {
    const [loaded] = useFonts({
        Yantramanav: require('../../assets/fonts/Yantramanav-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    BackHandler.addEventListener('hardwareBackPress', function() {
        props.navigation.navigate('Login');
        return true;
    });

    const formik = useFormik({
        initialValues: {
            FirstName: '',
            LastName: ''},
        onSubmit: async (values) => { 
            
            props.navigation.navigate('Login');
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
                        <TextInput style={styles.input} placeholder='Nombre' placeholderTextColor='#ABABAB'/>

                        <TextInput style={styles.input} placeholder='Apellidos' placeholderTextColor='#ABABAB'/>

                        <DropDownPicker 
                            items = {[
                                        {label: 'Cochabamba', value: 'Cochabamba'},
                                        {label: 'La Paz', value: 'La Paz'},
                                        {label: 'Santa Cruz', value: 'Santa Cruz'},
                                    ]}
                            defaultIndex={0}
                            containerStyle={{height: 40}}
                            onChangeItem={item => console.log(item.label, item.value)}
                        />

                        <TextInput style={styles.input} placeholder='Numero de telefono' placeholderTextColor='#ABABAB' keyboardType='phone-pad'/>

                        <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#ABABAB' keyboardType='email-address'/>

                        <TextInput style={styles.input} placeholder='Contraseña' placeholderTextColor='#ABABAB' secureTextEntry={true}/>

                        <TextInput style={styles.input} placeholder='Repetir Contraseña' placeholderTextColor='#ABABAB' secureTextEntry={true}/>
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