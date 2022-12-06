import React from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';

const RestaurantMenu = (props) => {

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
                <View style={styles.infoRest}>
                    <Image style={styles.logo} source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-traditional-taco-mexican-food-vector_53876-161373.jpg',}} />
                    <Text style={styles.title}>La Chingada</Text>
                    <Text style={styles.info}>Comida Mexicana</Text>
                    <Text style={styles.info}>Av America 1093</Text>

                    <View style={styles.orderCard}>
                        <Text style={styles.categories}>Tacos</Text>
                        <Text style={styles.lines}>───────────────────────────────</Text>
                        <View style={styles.orderItem}>
                            <Image style={styles.image} source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-traditional-taco-mexican-food-vector_53876-161373.jpg',}} />
                            <View>
                                <Text style={styles.text}>Cabello de angel</Text>
                                <Text style={styles.text}>20 Bs.</Text>
                            </View>
                            <TouchableOpacity>
                                <AntDesign name="minussquareo" size={30} color="white" />
                            </TouchableOpacity>

                            <Text style={styles.quantity}>1</Text>

                            <TouchableOpacity>
                                <AntDesign name="plussquareo" size={30} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.btnShop}>
                                    <AntDesign name="shoppingcart" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.btnDelete}>
                                    <MaterialIcons name="delete" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.lines}>───────────────────────────────</Text>

                    </View>
                </View>
            </View>
        </ScrollView>
        <View>
                <View style={styles.infoOrder}>
                    <Text style={styles.quantityFinal}>1</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('RestaurantSummaryOrder')}>
                        <Text style={styles.categories}>Ver orden</Text>
                    </TouchableOpacity>
                    <Text style={styles.categories}>Total: 20 Bs.</Text>
                </View>
        </View>
    </View>
  );
};

export default RestaurantMenu;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E',
    },
    header: {
        width: '100%',
        height: Constants.statusBarHeight + 40,
        backgroundColor: '#5D04AC',
        paddingLeft: 10,
        paddingBottom: 10,
        justifyContent: 'flex-end',
    },
    details: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    infoRest: {
        alignItems: 'center',
    },
    categories: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Yantramanav',
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    info: {
        color: '#ABABAB',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Yantramanav'
    },
    lines: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    orderCard: {
        width: Dimensions.get('window').width - 20,
        marginTop: 20,
        marginBottom: 70,
        backgroundColor: '#303133',
        borderRadius: 10,
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 10,
        overflow: 'hidden'
    },
    quantity: {
        borderColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 2,
        width: 50,
        height: 27,
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
    btnShop: {
        backgroundColor: '#5D04AC',
        borderRadius: 2,
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnDelete: {
        backgroundColor: '#BC4343',
        borderRadius: 2,
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoOrder: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 75,
        backgroundColor: '#5D04AC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    quantityFinal: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 2,
        width: 50,
        height: 50,
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    },
});