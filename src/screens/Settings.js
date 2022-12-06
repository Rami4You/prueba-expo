import React from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Alert, BackHandler, Button, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';

const CreateUserScreen = (props) => {

    const [loaded] = useFonts({
        Yantramanav: require('../../assets/fonts/Yantramanav-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    const LogOut = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de cerrar sesión?\nAl cerrar sesión, se cerrara la aplicacion.",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "OK",
                    onPress: () =>  BackHandler.exitApp()
                }
            ],
            { cancelable: false }
        );
    }

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <View>
            <Text style={styles.title}>Configuracion</Text>
            <View style={[styles.orderCard, styles.corners]}>
                <Text style={styles.textTitles}>Usuario</Text>
                <Text style={styles.lines}>──────────────────────────────</Text>
                <Text style={styles.text}>Sandro Estiven Garcia</Text>
            </View>

            <View style={[styles.orderCard, styles.corners]}>
                <Text style={styles.textTitles}>Correo</Text>
                <Text style={styles.lines}>──────────────────────────────</Text>
                <Text style={styles.text}>SandroGarciaLaTortugaNinja@gmail.com</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity>
                    <Text style={styles.text}>Cambiar Contraseña</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <TouchableOpacity>
                    <Text style={styles.text} onPress = {() => LogOut()} >Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
  );
};

export default CreateUserScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: Constants.statusBarHeight + 20,
        paddingHorizontal: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E'
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    textTitles: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    lines: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        width: Dimensions.get('window').width -40,
        height: 50,
        marginTop: 30,
        backgroundColor: '#5D04AC',
        borderRadius: 10,
        borderWidth: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Yantramanav'
    },
    orderCard: {
        width: Dimensions.get('window').width - 40,
        marginTop: 20,
        backgroundColor: '#303133',
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    corners: {
        paddingVertical : 15,
        paddingHorizontal: 20,
        backgroundColor: '#303133',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    quantity: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        width: 50,
        height: 50,
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
    infoOrder: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        
    }
});