import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Title } from 'react-native-paper';

import { TransactionsContext } from '../../context/TransactionsContext';
import { DefaultCurrency, OperationType } from '../../utils/consts';
import { GlobalStyles } from '../../utils/GlobalStyles';
import { APP_ROUTES } from '../../navigation/Routes';

const HomeScreen = () => {
  const { navigate } = useNavigation() as StackNavigationProp<
    ParamListBase,
    typeof APP_ROUTES.HOME
  >;

  const { accumulatedAmount } = useContext(TransactionsContext);

  const redirectToTransactions = (operationType: string) =>
    navigate(APP_ROUTES.TRANSACTION, { operationType });

  const redirectToOrders = () => navigate(APP_ROUTES.ORDERS, {});

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Fee Accumulated:</Title>
        <Text>
          {accumulatedAmount} {DefaultCurrency.USDT}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => redirectToTransactions(OperationType.BUY)}
            style={styles.button}
          >
            Buy
          </Button>
          <Button
            mode="contained"
            onPress={() => redirectToTransactions(OperationType.SELL)}
            style={styles.button}
          >
            Sell
          </Button>
          <Button
            mode="contained"
            onPress={() => redirectToOrders()}
            style={styles.button}
          >
            Orders
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 10,
  },
  button: {
    marginVertical: 10,
  },
});
