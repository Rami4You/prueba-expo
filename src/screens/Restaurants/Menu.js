import React from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, BackHandler} from 'react-native';
import repositories from '../../data/repositories.js';
import RestaurantItem from './RestaurantItem';

const OrderMenu = (props) => {

    const [loaded] = useFonts({
        Yantramanav: require('../../../assets/fonts/Yantramanav-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
        props.navigation.navigate('Menu');
        return true;
    });

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.searchBar}>
            <AntDesign name="search1" size={20} color='#D9D9D9' />
            <TextInput style={styles.input} placeholder='Buscar' placeholderTextColor='#D9D9D9'/>
        </View>
        <FlatList
            data={repositories}
            renderItem={({ item: repo}) =>(
                <TouchableOpacity onPress={() => props.navigation.navigate('RestaurantMenu')}>
                    <RestaurantItem {...repo}/>
                </TouchableOpacity>
            )}
        >
        </FlatList>
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