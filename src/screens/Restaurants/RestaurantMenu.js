import React, {useEffect, useState, useCallback} from 'react';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Alert, Button, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import { firebaseConfig } from '../../data/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query, getDocs, addDoc } from 'firebase/firestore';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const RestaurantMenuScreen = (props) => {
    const isFocused = useIsFocused();
    const [restaurant, setRestaurant] = useState(props.route.params.restaurant);

    useEffect(() => {
        (async () => {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const userRef = collection(db, "Product");
            const q = query(userRef, where("InstitutionId", "==", restaurant.id));
            const querySnapshot = await getDocs(q);
            let res = restaurant;
            res.Categories.map(e => e.Products = null);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => { 
                    let product = doc.data();
                    product.id = doc.id;
                    product.quantity = 1;
                    product.selected = false;
                    var i = res.Categories.findIndex(e => e.Name == product.Category) 
                    if (i != -1) { 
                        if (res.Categories[i].Products == null) {
                            res.Categories[i].Products = []
                            res.Categories[i].Products.push(product)
                        } else {
                            res.Categories[i].Products.push(product)
                        }
                    }
                })
                console.log('aa')
                props.navigation.navigate('RestaurantMenuScreen', {restaurant: res}) 
            }
        })()
    }, [restaurant])


    const addProdQty = (id, index) => {
        console.log(id, index)
        let res = restaurant;
        res.Categories[index].Products[res.Categories[index].Products.findIndex(e => e.id == id)].quantity += 1;
        props.navigation.navigate('RestaurantMenuScreen', {restaurant: res})
    }

    const subProdQty = (id, index) => {
        let res = restaurant;
        res.Categories[index].Products[res.Categories[index].Products.findIndex(e => e.id == id)].quantity -= 1;
        props.navigation.navigate('RestaurantMenuScreen', {restaurant: res}) 
    }

    const addProd = (id, index) => {
        let res = restaurant;
        res.Categories[index].Products[res.Categories[index].Products.findIndex(e => e.id == id)].selected = true;
        props.navigation.navigate('RestaurantMenuScreen', { restaurant: res })
    }

    const delProd = (id, index) => {
        let res = restaurant;
        res.Categories[index].Products[res.Categories[index].Products.findIndex(e => e.id == id)].selected = false;
        props.navigation.navigate('RestaurantMenuScreen', { restaurant: res })
    }

    const goBack = () => {
        props.navigation.goBack();
    }
    if (!restaurant) {
        return null
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.details}>
                        <View style={styles.infoRest}>
                            <Image style={styles.logo} source={{ uri: restaurant.Photo}} />
                            <Text style={styles.title}>{restaurant.Name}</Text>
                            <Text style={styles.info}>{restaurant.Category}</Text>
                            <Text style={styles.info}>{restaurant.Address}</Text>
                            {restaurant.Categories.length > 0 && restaurant.Categories.map((category, index) => {
                                if (category.Products != null && category.Products.length > 0) {
                                    return (
                                        <View style={styles.orderCard} key={index}>
                                            <Text style={styles.categories}>{category.Name}</Text>
    
                                            {category.Products.map((product, uid) => {
                                                
                                                return (
                                                        <View style={styles.orderItem} key={uid}>
                                                        <Image style={styles.image} source={{ uri: product.Photo, }} />
                                                        <View>
                                                            <Text style={styles.text}>{product.Name}</Text>
                                                            <Text style={styles.text}>{product.Price} Bs.</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => subProdQty(product.id,index)}>
                                                            <AntDesign name="minussquareo" size={30} color="white" />
                                                        </TouchableOpacity>
    
                                                        <Text style={styles.quantity}>{ product.quantity}</Text>
                                                            
                                                        <TouchableOpacity onPress={() => addProdQty(product.id, index)}>
                                                            <AntDesign name="plussquareo" size={30} color="white" />
                                                        </TouchableOpacity>
                                                        {!product.selected && (
                                                            <TouchableOpacity onPress={() => addProd(product.id, index)}>
                                                                <View style={styles.btnShop}>
                                                                    <AntDesign name="shoppingcart" size={24} color="white" />
                                                                </View>
                                                            </TouchableOpacity>
                                                        )}
                                                        {product.selected && (
                                                            <TouchableOpacity onPress={() => delProd(product.id, index)}>
                                                                <View style={styles.btnDelete}>
                                                                    <MaterialIcons name="delete" size={24} color="white" />
                                                                </View>
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    )
                                }
                                
                            })}
                            
                        </View>
                    </View>
                </ScrollView>
                {restaurant.Categories.reduce((acc, curr) => curr.Products && curr.Products.filter(e => e.selected == true).length > 0 ? acc + 1 : acc, 0) > 0 && (
                    <View>
                            <View style={styles.infoOrder}>
                            <Text style={styles.quantityFinal}>{ parseInt(restaurant.Categories.reduce((acc, curr) => curr.Products ? acc + curr.Products.filter(e => e.selected == true).reduce((a,c) => a + c.quantity,0) : acc+curr, 0)) }</Text>
                                <TouchableOpacity onPress={() => props.navigation.navigate('RestaurantSummaryOrder', {restaurant})}>
                                    <Text style={styles.categories}>Ver orden</Text>
                                </TouchableOpacity>
                                <Text style={styles.categories}>Total: {parseInt(restaurant.Categories.reduce((acc, curr) => curr.Products ? acc + curr.Products.filter(e => e.selected == true).reduce((a,c) => a + c.quantity * c.Price,0) : acc+curr, 0)) } Bs.</Text>
                            </View>
                    </View>
                )}
            </View>
        );
    }
    
};

export default RestaurantMenuScreen;

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
        marginTop: 10,
        marginBottom: 10,
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
        marginTop:10,
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