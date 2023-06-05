import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Button,
  TextInput,
  Provider,
  Paragraph,
  Title,
} from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { CryptoCurrency, OperationType, OrderType } from '../../utils/consts';
import { currencyOptions, orderTypeOptions } from './components/FormOptions';
import { TransactionsContext } from '../../context/TransactionsContext';
import { GlobalStyles } from '../../utils/GlobalStyles';
import TransactionDescription from './components/TransactionDescription';
import useTransactionValues from '../../hooks/useTarnsaction';
import SelectionModal from '../../components/SelectionModal/SelectionModal';

const Transactions = () => {
  const { createOrder, orders } = useContext(TransactionsContext);
  const { params }: RouteProp<{ operationType: any }> = useRoute();
  const { goBack } = useNavigation();
  const operationType = params?.operationType;
  const isBuyOrder = operationType === OperationType.BUY;

  const [previewResults, orderValues, updateOrderValues] =
    useTransactionValues(operationType);

  const createNewOrder = () => {
    createOrder({
      id: '',
      operationType,
      cryptoCurrencySelected: orderValues.currency,
      currencyPrice: previewResults.currencyPrice,
      currencyAmount: orderValues.amount,
      orderType: orderValues.orderType,
      usdFeeValue: previewResults.usdFeeValue,
      resultValue: isBuyOrder
        ? String(previewResults.resultValue)
        : String(previewResults.amountWithFee),
    });
    goBack();
  };

  const handleCurrencySelect = (currency: CryptoCurrency) => {
    updateOrderValues({ currency });
  };

  const handleOrderTypeSelect = (orderType: OrderType) => {
    updateOrderValues({ orderType });
  };

  return (
    <Provider>
      <SafeAreaView style={GlobalStyles.container}>
        <View style={styles.formContainer}>
          <Title style={styles.title}>
            {isBuyOrder
              ? 'Purchase Cryptocurrency'
              : 'Sell Your Cryptocurrency'}
          </Title>

          <SelectionModal
            title="Select Currency"
            options={currencyOptions}
            selectedValue={orderValues.currency}
            onSelect={handleCurrencySelect}
          />

          <Paragraph style={styles.item}>
            Currency Price: {previewResults.currencyPrice}
          </Paragraph>

          <TextInput
            label="Amount"
            value={String(orderValues.amount)}
            keyboardType="decimal-pad"
            onChangeText={(text) =>
              updateOrderValues({ ...orderValues, amount: Number(text) })
            }
            style={styles.item}
          />

          <SelectionModal
            title="Select Order Type"
            options={orderTypeOptions}
            selectedValue={orderValues.orderType}
            onSelect={handleOrderTypeSelect}
          />

          {orderValues.amount !== 0 && (
            <TransactionDescription
              operationType={operationType}
              previewResults={previewResults}
              orderValues={orderValues}
            />
          )}
        </View>

        <Button
          mode="contained"
          onPress={createNewOrder}
          style={styles.item}
          disabled={orderValues.amount === 0}
        >
          {isBuyOrder ? 'Buy Currency' : 'Sell Currency'}
        </Button>
      </SafeAreaView>
    </Provider>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
});
