import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_ROUTES } from './Routes';

// Screens
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const HomeStack = createStackNavigator();

const TransactionStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={APP_ROUTES.HOME}
        component={HomeScreen}
        options={{ headerTransparent: true, title: '' }}
      />
      <HomeStack.Screen
        name={APP_ROUTES.TRANSACTION}
        component={TransactionsScreen}
        options={{ headerBackTitle: ' ' }}
      />
      <HomeStack.Screen
        name={APP_ROUTES.ORDERS}
        component={OrdersScreen}
        options={{ headerBackTitle: ' ' }}
      />
    </HomeStack.Navigator>
  );
};

export default TransactionStack;
