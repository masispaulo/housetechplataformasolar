
import { useState, useCallback } from 'react';
import { QuoteDetails } from '../types';
import { generateSolarQuote } from '../services/geminiService';

export const useSolarCalculator = () => {
    const [consumption, setConsumption] = useState<string>('');
    const [quote, setQuote] = useState<QuoteDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateQuote = useCallback(async () => {
        const consumptionValue = parseFloat(consumption);
        if (isNaN(consumptionValue) || consumptionValue <= 0) {
            setError('Por favor, insira um valor válido para sua conta de luz.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setQuote(null);

        try {
            const result = await generateSolarQuote(consumptionValue);
            setQuote(result);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [consumption]);

    return {
        consumption,
        setConsumption,
        quote,
        isLoading,
        error,
        generateQuote,
    };
};
