// import React from 'react'
import { Card } from "@/components/ui/card"
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InputCardProps = {
    label: string;
    amount: number;
    onAmountChange: (amount: number) => void;
    onCurrencyChange: (currency: string) => void;
    currencyOptions: string[];
    selectCurrency?: string;
}

const InputCard: React.FC<InputCardProps> = (
    {
        label,
        amount,
        onAmountChange,
        onCurrencyChange,
        currencyOptions = [],
        selectCurrency = "usd",

    }
) => {
    return (
        <Card className="bg-white w-full md:w-[650px] p-3">
            <div className="flex items-center justify-center md:justify-between space-y-2 md:space-y-0 flex-wrap">
                <div className="w-full md:w-auto">
                    <Label htmlFor="from" className="block pb-2 text-md md:text-lg font-bold">{label}</Label>
                    <Input id="from" value={amount} onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} type="number" placeholder="Enter amount" className="w-full  md:w-80" />
                </div>
                <div className="w-full md:w-auto">
                    <Label className="block pb-2 text-md md:text-lg font-bold">Currency Type</Label>
                    <Select value={selectCurrency} onValueChange={onCurrencyChange}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Select a currency" className="text-black" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className="h-44">
                                <SelectLabel>Currencies</SelectLabel>
                                {currencyOptions.map((currency, index) => (
                                    <SelectItem key={index} value={currency}>
                                        {currency}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    )
}

export default InputCard