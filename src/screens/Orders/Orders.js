import React, {useEffect, useState} from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import OrderItem from './OrderItem';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import repositories from '../../data/repositories';
import { Alert, Button, TextInput, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, BackHandler} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../data/firebase';
import { getFirestore, collection, where, doc,  query, getDocs, getDoc, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Orders = (props) => {
    const [orders, setOrders] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            props.navigation.navigate('Menu');
            return true;
        });
    }, [])

    useEffect(() => {
        if (isFocused) {
            setOrders([]);
            (async () => {
                const user = JSON.parse(await AsyncStorage.getItem('User'));
                if (user.id != null) {
                    const app = initializeApp(firebaseConfig);
                    const db = getFirestore(app);
                    const orderRef = collection(db, "Order");
                    const q = query(orderRef, where("UserId", "==", user.id));
                    const querySnapshot = await getDocs(orderRef);
                    if (querySnapshot.empty) {
                        console.log("No matching documents.");
                    }
                    querySnapshot.forEach(async (d) => {
                        let order = d.data();
                        order.id = d.id;
                        const docRef = doc(db, "Institution", order.InstitutionId);
                        const docSnap = await getDoc(docRef);
                        order.restaurant = docSnap.data();
                        setOrders(orders => [...orders, order]);
                    });
                }
                
            })()
        }
    }, [isFocused])

    
  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>Mis ordenes</Text>
          {orders.length > 0 && orders.map((e, i) => {
              return (
                  <TouchableOpacity key={i} onPress={() => props.navigation.navigate('OrderDetails', { order:e })}>
                      <OrderItem {...e} />
                  </TouchableOpacity>
              )
          })}
          {orders.length == 0 && <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>No tienes ordenes</Text>}
          
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 20,
        flexGrow: 1,
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        fontFamily: 'Yantramanav'
    },
    searchBar: {
        width: Dimensions.get('window').width - 40,
        height: 50,
        backgroundColor: '#303133',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Yantramanav'
    },
});