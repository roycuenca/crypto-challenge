import { CryptoCurrency, OrderStatus, OrderType } from './src/utils/consts';

type TOrder = {
  id: string;
  operationType: string;
  cryptoCurrencySelected: CryptoCurrency;
  currencyPrice: number;
  currencyAmount: number;
  orderType: OrderType;
  status?: OrderStatus;
  createdAt?: Date;
  currency?: number;
  amount?: number;
  usdFeeValue?: number;
  resultValue?: string;
};

type TTransaction = {
  currencyPrice: number;
  usdFeeValue: number;
  amountWithFee: number;
  resultValue: number;
};
