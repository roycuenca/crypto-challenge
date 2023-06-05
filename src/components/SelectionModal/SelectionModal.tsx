import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { List, Paragraph } from 'react-native-paper';
import { CryptoCurrency, OrderType } from '../../utils/consts';
import { Theme } from '../../utils/Theme';

interface Option {
  value: CryptoCurrency | OrderType;
  label: string;
}

interface SelectionModalProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: any) => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value: CryptoCurrency) => {
    setVisible(false);
    onSelect(value);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={[styles.item, styles.buttonContainer]}>
          <Text style={styles.title}>{title}</Text>
          <Paragraph style={styles.buttonText}>{selectedValue}</Paragraph>
        </View>
      </TouchableOpacity>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Paragraph style={styles.modalTitle}>{title}</Paragraph>
            {options.map((option) => (
              <List.Item
                key={option.value}
                title={option.label}
                titleStyle={styles.buttonText}
                onPress={() => handleSelect(option.value as CryptoCurrency)}
              />
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Theme.colors.PRIMARY,
    borderRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Theme.colors.PRIMARY,
    marginRight: 10,
  },
  buttonText: {
    color: Theme.colors.PRIMARY,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Theme.colors.MODAL_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Theme.colors.WHITE,
    width: '90%',
    height: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SelectionModal;
