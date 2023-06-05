import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Title, Paragraph } from 'react-native-paper';

import { DefaultCurrency, OperationType } from '../../utils/consts';
import { TOrder } from '../../../customTypes';
import { Theme } from '../../utils/Theme';

interface OrderCardProps {
  order: TOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const isBuyOperation = order.operationType === OperationType.BUY;

  const renderIcon = () => {
    return isBuyOperation ? (
      <Icon name="arrow-back" size={20} color={Theme.colors.APPLE_GREEN} />
    ) : (
      <Icon name="arrow-forward" size={20} color={Theme.colors.APPLE_RED} />
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Title style={styles.titleText}>Transaction Details</Title>
            <Paragraph style={styles.descriptionText}>
              {isBuyOperation
                ? 'You purchased the following amount:'
                : 'You received: '}
            </Paragraph>
            <Paragraph style={styles.amountText}>
              {order.resultValue}{' '}
              {isBuyOperation
                ? order.cryptoCurrencySelected
                : DefaultCurrency.USDT}
            </Paragraph>
            <Paragraph style={styles.descriptionSecondaryText}>
              Price: ${order.currencyPrice}
            </Paragraph>
          </View>
          <View style={styles.iconContainer}>{renderIcon()}</View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 13,
  },
  amountText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  descriptionSecondaryText: {
    fontSize: 12,
    color: Theme.colors.LIGHT_GREY,
  },
});

export default OrderCard;
