import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, BackHandler} from 'react-native';
import repositories from '../../data/repositories.js';
import RestaurantItem from './RestaurantItem';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../data/firebase';
import { getFirestore, collection, where, query, getDocs, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrderMenu = (props) => {
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        (async () => {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const userRef = collection(db, "Institution");
            const querySnapshot = await getDocs(userRef);
            if (!querySnapshot.empty) {
                setRestaurants([]);
                querySnapshot.forEach((doc) => {
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    setRestaurants(restaurants => [...restaurants, restaurant]);
                });
            }
        })()
    },[])
    

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.searchBar}>
            <AntDesign name="search1" size={20} color='#D9D9D9' />
            <TextInput style={styles.input} placeholder='Buscar' placeholderTextColor='#D9D9D9'/>
        </View>
          {restaurants.length == 0 && <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>No hay restaurantes disponibles</Text>}
          {restaurants.length > 0 && restaurants.map((e, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => props.navigation.navigate('RestaurantMenuScreen', {restaurant: e})}>
                        <RestaurantItem {...e}/>
                    </TouchableOpacity>
                )
          })}
    </View>
  );
};

export default OrderMenu;

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
    input: {
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 18,
        color: 'white',
    }
});