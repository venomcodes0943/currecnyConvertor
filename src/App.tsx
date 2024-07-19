import { useState, useMemo, useCallback } from 'react'
import { Card } from "@/components/ui/card"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import { Button } from "@/components/ui/button"
import InputCard from "./InputCard"


function App() {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>('usd');
  const [to, setTo] = useState<string>('pkr');
  const [result, setResult] = useState<string>('');

  const currencyInfo = useCurrencyInfo(from)
  const options = useMemo(() => currencyInfo ? Object.keys(currencyInfo) : [], [currencyInfo]);

  const swap = useCallback(() => {
    setResult(amount.toString());
    setFrom(to);
    setTo(from);
    setAmount(parseFloat(result) || 0);
  }, [amount, from, to, result]);

  const convert = useCallback(() => {
    if (currencyInfo) {
      setResult((amount * (currencyInfo[to] || 0)).toString());
    }
  }, [amount, currencyInfo, to]);

  const handleAmountChange = useCallback((value: number) => {
    setAmount(value);
  }, []);

  const handleFromCurrencyChange = useCallback((value: string) => {
    setFrom(value);
  }, []);

  const handleToCurrencyChange = useCallback((value: string) => {
    setTo(value);
  }, []);
  return (
    <div className=" h-screen px-2  bg-slate-100 flex items-center justify-center">
      <Card className="backdrop-blur-sm bg-slate-200/15 px-2 md:px-8 py-4 md:py-6">
        <InputCard
          label="From"
          amount={amount}
          currencyOptions={options}
          onAmountChange={handleAmountChange}
          selectCurrency={from}
          onCurrencyChange={handleFromCurrencyChange}
        />

        <Button className="font-bold w-full my-2 md:text-lg" onClick={swap}>Swap</Button>

        <InputCard
          label="To"
          amount={parseFloat(result) || 0}
          currencyOptions={options}
          onAmountChange={handleAmountChange}
          selectCurrency={to}
          onCurrencyChange={handleToCurrencyChange}
        />
        <div className="mt-3">
          <Button className="font-bold w-full my-2 md:text-lg bg-red-600 hover:bg-red-500"
            onClick={convert}
          >Convert</Button>
        </div>
      </Card>
    </div>
  )
}

export default App
