import React from 'react';
import { Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens Restaurants
import Menu from '../screens/Restaurants/Menu';
import RestaurantMenu from '../screens/Restaurants/RestaurantMenu';
import RestaurantSummaryOrder from '../screens/Restaurants/RestaurantSummaryOrder';

const RestaurantStackNavigator = createNativeStackNavigator();

function RestaurantStack() {
    return(
        <RestaurantStackNavigator.Navigator initialRouteName='Menu'>
            <RestaurantStackNavigator.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
            <RestaurantStackNavigator.Screen name="RestaurantMenu" component={RestaurantMenu} options={{headerShown: false}}/>
            <RestaurantStackNavigator.Screen name="RestaurantSummaryOrder" component={RestaurantSummaryOrder} options={{headerShown: false}}/>
        </RestaurantStackNavigator.Navigator>
    );
};


//Screens Orders
import Orders from '../screens/Orders/Orders';
import DetailsOrder from '../screens/Orders/DetailsOrder';

const OrderStackNavigator = createNativeStackNavigator();

function OrdersStack() {
    return(
        <OrderStackNavigator.Navigator initialRouteName='OrdersMenu'>
            <OrderStackNavigator.Screen name="OrdersMenu" component={Orders} options={{headerShown: false}}/>
            <OrderStackNavigator.Screen name="OrderDetails" component={DetailsOrder} options={{headerShown: false}}/>
        </OrderStackNavigator.Navigator>
    );
};

//Screen Settings
import Settings from '../screens/Settings';



const Tab = createBottomTabNavigator();

function MyTabs( props ) {
    return(
        <Tab.Navigator
            initialRouteName='Restaurants'
            screenOptions={{
                tabBarActiveTintColor: '#5D04AC',
                tabBarInactiveTintColor: '#ABABAB',
                tabBarStyle: {
                    backgroundColor: '#1A1A1A',
                    borderTopColor: '#1A1A1A',
                    height: '8%',
                    paddingBottom: 10,
                    
                },
            }}
        >
            <Tab.Screen name="Orders" component={OrdersStack} options={{
                                                                        headerShown: false,
                                                                        tabBarLabel: 'Ordenes',
                                                                        tabBarIcon: ({ color, size }) => (
                                                                            <FontAwesome5 name="concierge-bell" size={size} color={color} />
                                                                        ),
                                                                      }}/>
            <Tab.Screen name="Restaurants" component={RestaurantStack} options= {{
                                                                                    headerShown: false,
                                                                                    tabBarLabel: 'Restaurantes',
                                                                                    tabBarIcon: ({ color, size }) => (
                                                                                        <MaterialIcons name="restaurant" size={30} color={color} />
                                                                                    ),
                                                                                  }}/>
            <Tab.Screen name="Settings" component={Settings} options={{
                                                                        headerShown: false,
                                                                        tabBarLabel: 'Configuracion',
                                                                        tabBarIcon: ({ color, size }) => (
                                                                            <MaterialIcons name="settings" size={size} color={color} />
                                                                        ),
                                                                      }}/>
        </Tab.Navigator>
    );
}

export default function Navigation() {

    const handleBackPress = () => {
        Alert.alert(
            'Salir',
            '¿Estas seguro que quieres salir?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Salir', onPress: () => BackHandler.exitApp() }
            ],
            { cancelable: false }
        )
        return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return(
        <NavigationContainer independent={true}>
            <MyTabs />
        </NavigationContainer>
    );
}