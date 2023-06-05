import { CryptoCurrency, OrderType } from '../../../utils/consts';

export const currencyOptions = [
  { value: CryptoCurrency.BTC, label: CryptoCurrency.BTC },
  { value: CryptoCurrency.ETH, label: CryptoCurrency.ETH },
  { value: CryptoCurrency.USDC, label: CryptoCurrency.USDC },
];

export const orderTypeOptions = [
  { value: OrderType.LIMIT, label: OrderType.LIMIT },
  { value: OrderType.MARKET, label: OrderType.MARKET },
];
