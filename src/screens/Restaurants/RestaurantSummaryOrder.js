import React, { useState }from 'react';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, Pressable} from 'react-native';

const SummaryOrder = (props) => {

    const [isChecked, setChecked] = useState(false);

    const [loaded] = useFonts({
        Yantramanav: require('../../../assets/fonts/Yantramanav-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={styles.details}>
                <View>
                    <Text style={styles.title}>Resumen de la orden</Text>

                    <View style={[styles.orderCard, styles.corners]}>
                        <Text style={styles.lines}>───────────────────────────────</Text>
                        <View style={styles.orderItem}>
                            <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-traditional-taco-mexican-food-vector_53876-161373.jpg',}} />
                            <View>
                                <Text style={styles.text}>Taco Sucio</Text>
                                <Text style={styles.text}>20 Bs.</Text>
                            </View>
                            <Text style={styles.quantity}>1</Text>
                        </View>
                        <Text style={styles.lines}>───────────────────────────────</Text>
                    </View>

                    <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                        <Text style={styles.infoOrder}>¿Consumir en el local?</Text>
                        <Checkbox style={styles.cbx} value={isChecked} onValueChange={setChecked} />
                    </View>
                    <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                        <Text style={styles.infoOrder}>NIT: </Text>
                        <TextInput style={styles.text}>11/24/2022</TextInput>
                    </View>
                    <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                        <Text style={styles.infoOrder}>Total</Text>
                        <Text style={styles.text}>20 Bs.</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        <View style={styles.button}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
                <Text style={styles.textbtn}>Confirmar orden</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default SummaryOrder;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: Constants.statusBarHeight + 40,
        backgroundColor: '#5D04AC',
        paddingLeft: 10,
        paddingBottom: 10,
        justifyContent: 'flex-end',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 50
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    textbtn: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    lines: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    details: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    orderCard: {
        width: Dimensions.get('window').width - 20,
        marginTop: 20,
        backgroundColor: '#303133',
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    corners: {
        padding : 20,
        backgroundColor: '#303133',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: 70,
        height: 70,
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
    },
    cbx: {
        padding: 15,
        borderColor: '#FFFFFF',
    },
    button: {
        width: Dimensions.get('window').width -40,
        height: 60,
        marginBottom: 20,
        backgroundColor: '#5D04AC',
        borderRadius: 10,
        borderWidth: 0,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Yantramanav',
    },
});