import React from 'react';
import {Alert, Dimensions, View, Image, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';

const RestaurantItem = (props) => (

    <View key={props.id} style={styles.container}>
        <Image style={styles.image} source={{ uri: props.ownerAvatarUrl}} />
        <View style={styles.info}>
            <Text style={styles.nameRestaurant}>{props.fullName}</Text>
            <Text style={styles.timesRestaurant} >Horario: {props.languaje}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#303133',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        padding: 10,
    },
    corners: {
        backgroundColor: '#5D04AC',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
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
    info: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    nameRestaurant: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Yantramanav'
    },
    timesRestaurant: {
        color: '#FFFFFF',
    }
});

export default RestaurantItem;