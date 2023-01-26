import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrder from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          />
          <Stack.Screen name="PreparingOrder" component={PreparingOrder}
          options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          }}
          />
          <Stack.Screen name="Delivery" component={DeliveryScreen}
          options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          }}
          />

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};