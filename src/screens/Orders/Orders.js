import React from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import OrderItem from './OrderItem';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import repositories from '../../data/repositories';
import { Alert, Button, TextInput, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, BackHandler} from 'react-native';

const Orders = (props) => {
    
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
        <Text style={styles.title}>Mis ordenes</Text>
        <FlatList
            data={repositories}
            renderItem={({ item: repo}) =>(
                <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails')}>
                    <OrderItem {...repo}/>
                </TouchableOpacity>
            )}
        >
        </FlatList>
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