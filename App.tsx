import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { TransactionsProvider } from './src/context/TransactionsContext'; // Importa el TransactionsProvider desde el archivo de contexto correspondiente
import TransactionStack from './src/navigation/Navigation';

export default function App() {
  return (
    <PaperProvider>
      <TransactionsProvider>
        <NavigationContainer>
          <TransactionStack />
        </NavigationContainer>
      </TransactionsProvider>
    </PaperProvider>
  );
}
