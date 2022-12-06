import React from 'react';
import {Alert, Dimensions, View, Image, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';

const OrderItem = (props) => (

    <View key={props.id} style={styles.container}>
        <Image style={styles.image} source={{ uri: props.ownerAvatarUrl}} />
        <View style={styles.info}>
            <Text style={styles.infoOrder} >Pendiente: {props.languaje} - {props.stargazersCount}</Text>
            <Text style={styles.nameRestaurant}>{props.fullName}</Text>
            <Text style={styles.infoOrder} >Bs: {props.forksCount} - {props.reviewCount} Productos</Text>
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
    infoOrder: {
        color: '#ABABAB',
        fontWeight: 'bold',
    }
});

export default OrderItem;