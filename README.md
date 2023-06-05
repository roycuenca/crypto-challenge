# Crypto Challenge App

React Native application using Expo for the Crypto Challenge.

## Description

The Crypto Challenge app allows users to create buy and sell orders for cryptocurrencies, meeting the following requirements:

1. The user can create a buy/sell order that includes:

   - Operation Type (Buy, Sell)
   - Selected Cryptocurrency (BTC, ETH, USDC)
   - Currency Price
   - Currency Amount
   - Order Type (Limit, Market)
   - If the order is a Limit order, it needs to be left open for 60 seconds and then be executed automatically. While it is not executed, it must be shown in the Order Book.
   - If the order is a Market order, it needs to be executed immediately. The app must show the user how much they will receive in exchange (USD when selling, cryptocurrency when buying).

2. The user can view the Order Book containing the open orders. The Order Book must show orders sorted by the order total price, and buy orders should be differentiated from sell orders. Executed orders must be removed from the Order Book.

3. Rates/quotes for the different assets must be taken from the Binance API to show the user a suggested price.

4. Every order processed by the system must charge the user a fee of 1.5%, and the accumulated amount needs to be shown in the top bar of the app.

## Installation

1. Clone this repository to your local machine.
2. In the terminal, navigate to the project directory and run the following command to install the dependencies:

```shell

npm install

```

## Execution

To run the app, follow these steps:

1. Make sure you have Expo installed on your machine.
2. In the terminal, within the project directory, run the following command to start the app with Expo:

```shell

npx expo start

```

This will open the Expo development page in your terminal. From there, you can run the app on a simulator/emulator or on your physical device using the Expo Go app.
# crypto-challenge
