import { useState, useEffect } from 'react';
import { convert } from '../../src/api/binanceService';
import {
  CryptoCurrency,
  DefaultCurrency,
  OperationType,
  OrderType,
  platformFee,
} from '../../src/utils/consts';

interface PreviewResults {
  currencyPrice: number;
  usdFeeValue: number;
  amountWithFee: number;
  resultValue: number;
}

interface OrderValues {
  currency: CryptoCurrency;
  currencyPrice: number;
  amount: number;
  orderType: OrderType;
  visibleCurrency: boolean;
  visibleOrderType: boolean;
}

const useTransactionValues = (
  operationType: OperationType
): [PreviewResults, OrderValues, (values: Partial<OrderValues>) => void] => {
  const isBuyOrder = operationType === OperationType.BUY;

  const [previewResults, setPreviewResults] = useState<PreviewResults>({
    currencyPrice: 0,
    usdFeeValue: 0,
    amountWithFee: 0,
    resultValue: 0,
  });

  const [orderValues, setOrderValues] = useState<OrderValues>({
    currency: CryptoCurrency.BTC,
    currencyPrice: 0,
    amount: 0,
    orderType: OrderType.MARKET,
    visibleCurrency: false,
    visibleOrderType: false,
  });

  const updateCurrencyPrice = async () => {
    const result = await convert(orderValues.currency, DefaultCurrency.USDT, 1);

    setOrderValues((prevValues) => ({
      ...prevValues,
      currencyPrice: result,
    }));
  };

  const updateBuyOrderValues = () => {
    const usdFeeValue = orderValues.amount * platformFee.FEE;
    const amountWithFee = orderValues.amount + usdFeeValue;
    const amountAfterFee = orderValues.amount - usdFeeValue;
    const resultValue = amountAfterFee / orderValues.currencyPrice;

    setPreviewResults({
      currencyPrice: orderValues.currencyPrice,
      usdFeeValue,
      amountWithFee,
      resultValue,
    });
  };

  const updateSellOrderValues = () => {
    if (orderValues.amount === 0) {
      setPreviewResults({
        currencyPrice: orderValues.currencyPrice,
        usdFeeValue: 0,
        amountWithFee: 0,
        resultValue: 0,
      });
    } else {
      const amountOfChange = orderValues.currencyPrice * orderValues.amount;
      const usdFeeValue = amountOfChange * platformFee.FEE;
      const amountWithFee = amountOfChange - usdFeeValue;

      setPreviewResults({
        currencyPrice: orderValues.currencyPrice,
        usdFeeValue,
        amountWithFee,
        resultValue: orderValues.currencyPrice,
      });
    }
  };

  const updateOrderValues = (values: Partial<OrderValues>) => {
    setOrderValues((prevValues) => ({ ...prevValues, ...values }));
  };

  useEffect(() => {
    updateCurrencyPrice();
  }, [orderValues.currency]);

  useEffect(() => {
    if (isBuyOrder) {
      updateBuyOrderValues();
    } else {
      updateSellOrderValues();
    }
  }, [orderValues.amount, orderValues.currencyPrice, isBuyOrder]);

  return [previewResults, orderValues, updateOrderValues];
};

export default useTransactionValues;
