import React, { createContext, useEffect, useState } from 'react';
import { OrderStatus, OrderType } from '../utils/consts';
import { TOrder } from '../../customTypes';

interface TransactionsContextType {
  createOrder: (order: TOrder) => void;
  orders: TOrder[];
  getPendingOrders: () => void;
  accumulatedAmount: number;
}

const TransactionsContext = createContext<TransactionsContextType>({
  createOrder: () => {},
  orders: [],
  getPendingOrders: () => {},
  accumulatedAmount: 0,
});

interface TransactionsProviderProps {
  children: React.ReactNode;
}

const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  children,
}) => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [accumulatedAmount, setAccumulatedAmount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      checkOrderStatus();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const amount = calculateAccumulatedAmount();
    setAccumulatedAmount(amount);
  }, [orders]);

  const createOrder = (order: TOrder): void => {
    const newOrder: TOrder = {
      ...order,
      id: Math.random().toString(),
      status:
        order.orderType === OrderType.LIMIT
          ? OrderStatus.PENDING
          : OrderStatus.EXECUTED,
      createdAt: new Date(),
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const checkOrderStatus = (): void => {
    const currentTime = new Date().getTime();
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.createdAt &&
        order.status === OrderStatus.PENDING &&
        currentTime - order.createdAt.getTime() >= 60000
          ? { ...order, status: OrderStatus.EXECUTED }
          : order
      )
    );
  };

  const getPendingOrders = (): TOrder[] => {
    return orders
      .filter((order) => order.status === OrderStatus.PENDING)
      .sort(
        (a, b) =>
          a.currencyAmount * a.currencyPrice -
          b.currencyAmount * b.currencyPrice
      );
  };

  const calculateAccumulatedAmount = (): number => {
    return orders.reduce((sum, transaction) => {
      if (
        transaction.status === OrderStatus.EXECUTED &&
        transaction.usdFeeValue !== undefined
      ) {
        return sum + transaction.usdFeeValue;
      }
      return sum;
    }, 0);
  };

  return (
    <TransactionsContext.Provider
      value={{
        createOrder,
        orders,
        getPendingOrders,
        accumulatedAmount,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
