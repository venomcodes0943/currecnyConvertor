import { useEffect, useState } from 'react';

interface CurrencyData {
    [key: string]: number;
}

const currencyCache: { [key: string]: CurrencyData } = {};

function useCurrencyInfo(currency: string): CurrencyData | undefined {
    const [data, setData] = useState<CurrencyData | undefined>(undefined);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (currencyCache[currency]) {
                setData(currencyCache[currency]);
            } else {
                fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
                    .then(res => res.json())
                    .then(res => {
                        const fetchedData = res[currency];
                        currencyCache[currency] = fetchedData;
                        setData(fetchedData);
                    })
                    .catch(err => console.error('Error fetching currency data:', err));
            }
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
