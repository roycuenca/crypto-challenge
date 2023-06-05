import axios from 'axios';

const API_BASE_URL = 'https://api.binance.com/api/v3';

const getRate = async (from: string, to: string): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ticker/price`, {
      params: {
        symbol: `${from}${to}`,
      },
      headers: {
        'X-MBX-APIKEY':
          'X3L8Zn0NCmJVqEcYwul9ZCDRKDyD2UfupFzuMGFQbtoLeidEiaZXaTfvNEhKGKHU',
      },
    });
    const { price } = response.data;
    return parseFloat(price);
  } catch (error) {
    throw error;
  }
};

const convert = async (from: string, to: string, amount: number) => {
  try {
    const rate = await getRate(from, to);
    const result = amount * rate;

    return result;
  } catch (error) {
    throw error;
  }
};

export { convert };
