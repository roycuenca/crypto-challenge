import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from '../../utils/Theme';

interface EmptyProps {
  text: string;
}

const EmptyComponent = ({ text }: EmptyProps) => (
  <View style={styles.emptyContainer}>
    <Icon name="exclamation-circle" size={50} color={Theme.colors.LIGHT_GREY} />
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default EmptyComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: Theme.colors.LIGHT_GREY,
  },
});
