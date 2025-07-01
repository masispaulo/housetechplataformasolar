
import React from 'react';
import { useSolarCalculator } from '../hooks/useSolarCalculator';
import ResultsDisplay from './ResultsDisplay';
import { ZapIcon, AlertTriangleIcon } from './Icons';

const SolarCalculator: React.FC = () => {
    const { 
        consumption, 
        setConsumption, 
        quote, 
        isLoading, 
        error, 
        generateQuote 
    } = useSolarCalculator();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        generateQuote();
    };

    return (
        <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-8 shadow-2xl backdrop-blur-lg">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Calcule seu Potencial Solar</h2>
                    <p className="text-center text-gray-400 mb-8">Comece sua jornada para a economia. Este é o primeiro passo.</p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">R$</span>
                            <input
                                type="number"
                                value={consumption}
                                onChange={(e) => setConsumption(e.target.value)}
                                placeholder="Ex: 450.00"
                                required
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analisando...
                                </>
                            ) : (
                                <>
                                    <ZapIcon className="w-5 h-5" />
                                    Calcular
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12">
                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-center gap-3">
                                <AlertTriangleIcon className="w-6 h-6"/>
                                <div>
                                    <h4 className="font-bold">Ocorreu um erro</h4>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}
                        {!isLoading && !error && quote && <ResultsDisplay quote={quote} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolarCalculator;
