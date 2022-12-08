import React, { useEffect, useState }from 'react';
import Checkbox from 'expo-checkbox';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, Pressable} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { firebaseConfig } from '../../data/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query, getDocs, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryOrder = (props) => {
    const isFocused = useIsFocused();
    const [restaurant, setRestaurant] = useState(props.route.params.restaurant);
    const [isChecked, setChecked] = useState(false);

    const handleOrder = () => {
        Alert.alert(
            "Realizar Orden",
            "¿Estas seguro que quieres realizar la orden?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Aceptar", onPress: async () => {
                    const app = initializeApp(firebaseConfig);
                    const db = getFirestore(app);
                    const orderRef = collection(db, "Order");
                    var user = JSON.parse(await AsyncStorage.getItem('User'));
                    console.log(user)
                    console.log(user.id);
                    restaurant.Categories = restaurant.Categories.filter(e => e.Products != null);
                    if (user.id != null) { 
                        await addDoc(orderRef, {
                            UserId: user.id,
                            InstitutionId: restaurant.id,
                            Total: parseInt(restaurant.Categories.reduce((acc, curr) => curr.Products ? acc + curr.Products.filter(e => e.selected == true).reduce((a, c) => a + c.quantity * c.Price, 0) : acc + curr, 0)),
                            CreatedAt: new Date(),
                            OrderType: isChecked ? 2 : 1,
                            Status: 1,
                            OrderDetail: restaurant.Categories.reduce((acc, curr) => [...acc, ...curr.Products], []).filter(e => e.selected == true).map((product, index) => {
                                return {
                                    ProductId: product.id,
                                    Quantity: product.quantity
                                }
                             })
                        }).then(() => {
                            Alert.alert(
                                "Orden Realizada",
                                "Tu orden ha sido realizada con exito",
                                [
                                    {
                                        text: "Aceptar",
                                        onPress: () => props.navigation.navigate("Menu")
                                    }
                                ],
                                { cancelable: false }
                            )
                        })
                    }
                }
                }
            ],
            
        )
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
                        {
                            restaurant.Categories.map((category, index) => { 
                                return category.Products && category.Products.filter(e => e.selected == true).map((product, index) => { 
                                    return (
                                        <View style={[styles.orderCard, styles.corners]} key={index}>
                                            <View style={styles.orderItem}>
                                                <Image style={styles.image} source={{ uri: product.Photo,}} />
                                                <View>
                                                    <Text style={styles.text}>{product.Name}</Text>
                                                    <Text style={styles.text}>{product.Price} Bs.</Text>
                                                </View>
                                                <Text style={styles.quantity}>{product.quantity}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            })
                        }

                        <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                            <Text style={styles.infoOrder}>¿Consumir en el local?</Text>
                            <Checkbox style={styles.cbx} value={isChecked} onValueChange={setChecked} />
                        </View>
                        <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                            <Text style={styles.infoOrder}>Total</Text>
                            <Text style={styles.text}>{parseInt(restaurant.Categories.reduce((acc, curr) => curr.Products ? acc + curr.Products.filter(e => e.selected == true).reduce((a,c) => a + c.quantity * c.Price,0) : acc+curr, 0)) } Bs.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.button}>
                <TouchableOpacity onPress={handleOrder}>
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