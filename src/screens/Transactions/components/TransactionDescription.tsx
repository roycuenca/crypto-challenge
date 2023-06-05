import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { OperationType } from '../../../utils/consts';
import { Theme } from '../../../utils/Theme';

interface TransactionDescriptionProps {
  operationType: OperationType;
  previewResults: {
    currencyPrice: number;
    usdFeeValue: number;
    amountWithFee: number;
    resultValue: number;
  };
  orderValues: any;
}

const TransactionDescription: React.FC<TransactionDescriptionProps> = ({
  operationType,
  previewResults,
  orderValues,
}) => {
  return (
    <View style={styles.descriptionContent}>
      {operationType === OperationType.BUY ? (
        <>
          <Text style={styles.resultText}>
            Currency Price: {previewResults.currencyPrice}
          </Text>
          <Text style={styles.resultText}>
            USD Fee Value: {previewResults.usdFeeValue}
          </Text>
          <Text style={styles.resultText}>
            Amount with Fee: {previewResults.amountWithFee}
          </Text>
          <Text style={styles.resultText}>
            You will get: {previewResults.resultValue} from{' '}
            {orderValues.currency}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.resultText}>
            The user entered an amount of: {orderValues.amount}{' '}
            {orderValues.currency}
          </Text>
          <Text style={styles.resultText}>
            A commission of 1.5% has been charged, which is:{' '}
            {previewResults.usdFeeValue} USD
          </Text>
          <Text style={styles.resultText}>
            You will receive: {previewResults.amountWithFee} USD
          </Text>
          <Text style={styles.resultText}>
            Currency price: {previewResults.resultValue}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContent: {
    backgroundColor: Theme.colors.SECONDARY,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  resultText: {
    color: Theme.colors.PRIMARY,
    marginBottom: 10,
    fontSize: 13,
  },
});

export default TransactionDescription;
