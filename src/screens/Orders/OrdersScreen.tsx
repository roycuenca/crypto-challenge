import React, { useContext } from 'react';
import { FlatList, ListRenderItem, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { TransactionsContext } from '../../context/TransactionsContext';
import { GlobalStyles } from '../../utils/GlobalStyles';
import { TOrder } from '../../../customTypes';
import OrderCard from '../../components/OrderCard/OrderCard';
import EmptyComponent from '../../components/Empty/Empty';

const OrdersList = () => {
  const { getPendingOrders } = useContext(TransactionsContext);

  const renderItem: ListRenderItem<TOrder> = ({ item }) => (
    <OrderCard order={item} />
  );

  return (
    <View style={[GlobalStyles.container, styles.paddingTop]}>
      <FlatList
        data={getPendingOrders()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <EmptyComponent text="No Pending Orders" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 20,
  },
});

export default OrdersList;
