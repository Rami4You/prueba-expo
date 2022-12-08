import React,{useState, useEffect} from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../data/firebase';
import { getFirestore, collection, where, doc,  query, getDocs, getDoc, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const CreateUserScreen = (props) => {
    const [order, setOrder] = useState(props.route.params.order);
    const isFocused = useIsFocused();

    useEffect(() => { 
        if(isFocused){
            (async () => {
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                const ordRef = doc(db, "Order", order.id);

                const ordSnap = await getDoc(ordRef);
                let ord = ordSnap.data();
                ord.restaurant = order.restaurant;
                console.log(ord)
                var m = ord.Detail.map(async (e) => {
                    let docRef = doc(db, "Product", e.ProductId);
                    const docSnap = await getDoc(docRef);
                    var p = docSnap.data();
                    p.id = e.ProductId;
                    p.Quantity = e.Quantity;
                    return p;
                })
                ord.Detail = await Promise.all(m);
                setOrder(ord);
            })()
        }
    }, [isFocused])

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
                        <Text style={styles.title}>Detalle de la orden</Text>
                        <View style={[styles.orderCard, styles.corners]}>
                            {order.Detail.map((e, i) => {
                            return (
                                <View style={styles.orderItem} key={i}>
                                    <Image style={styles.image} source={{ uri: e.Photo,}} />
                                    <View>
                                        <Text style={styles.text}>{e.Name}</Text>
                                        <Text style={styles.text}>{e.Price} Bs.</Text>
                                    </View>
                                    <Text style={styles.quantity}>{e.Quantity}</Text>
                                </View>
                            )
                        })}                    
                        </View>
                        

                        <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                            <Text style={styles.infoOrder}>Estado</Text>
                            <Text style={styles.text}>{order.Status == 1 ? "Puesta" : order.Status == 2 ? "Aprobada" : order.Status == 3 ? "Lista" : order.Status == 4 ? "Entregada" : "Cancelada"}</Text>
                        </View>
                        <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                            <Text style={styles.infoOrder}>Fecha</Text>
                            <Text style={styles.text}>{new Date().getDay()}/{new Date().getMonth()+1}/{new Date().getFullYear()}</Text>
                        </View>
                        <View style={[styles.orderCard, styles.corners, styles.orderItem]}>
                            <Text style={styles.infoOrder}>Total</Text>
                            <Text style={styles.text}>{order.Total} Bs.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateUserScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E'
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
        marginBottom: 10,
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
        
    }
});