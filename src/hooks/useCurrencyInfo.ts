import { useEffect, useState } from 'react';

interface CurrencyData {
    [key: string]: number;
}

function useCurrencyInfo(currency: string): CurrencyData | object | undefined {
    const [data, setData] = useState<object>({});

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then(res => res.json())
            .then(res => setData(res[currency]))
            .catch(err => console.error('Error fetching currency data:', err));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
