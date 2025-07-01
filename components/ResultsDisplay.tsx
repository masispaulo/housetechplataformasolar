
import React from 'react';
import { QuoteDetails } from '../types';
import { SunIcon, TrendingUpIcon, RepeatIcon, ToolIcon, BarChartIcon, CheckCircleIcon } from './Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsDisplayProps {
    quote: QuoteDetails;
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string; colorClass: string }> = ({ icon, title, value, colorClass }) => (
    <div className={`bg-gray-800 p-4 rounded-lg flex items-center gap-4 border-l-4 ${colorClass}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ quote }) => {
    
    const chartData = quote.monthlyAnalysis.map(d => ({
        name: d.month.substring(0, 3),
        Geração: d.generationKwh,
        Consumo: d.consumptionKwh,
    }));

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white">Seu Orçamento Personalizado está Pronto!</h3>
                <p className="text-gray-400 mt-1">{quote.summary}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard icon={<SunIcon />} title="Tamanho do Sistema" value={`${quote.systemSizeKwP.toFixed(2)} kWp`} colorClass="border-yellow-400" />
                <InfoCard icon={<TrendingUpIcon />} title="Economia Anual Estimada" value={`R$ ${quote.annualSavingsBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} colorClass="border-green-400" />
                <InfoCard icon={<RepeatIcon />} title="Payback Simples" value={`~${quote.paybackYears.toFixed(1)} anos`} colorClass="border-blue-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ToolIcon /> Equipamentos do Kit</h4>
                    <ul className="space-y-3 text-gray-300">
                        {quote.equipment.map((item, index) => (
                           <li key={index} className="flex items-start gap-3">
                             <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                             <span><strong>{item.quantity}x {item.item}:</strong> {item.description}</span>
                           </li>
                        ))}
                    </ul>
                     <p className="text-sm text-gray-500 mt-4">Custo total estimado do sistema (equipamentos + instalação): <strong className="text-yellow-300">R$ {quote.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></p>
                </div>

                <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><BarChartIcon /> Análise Mensal</h4>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                                    contentStyle={{
                                        backgroundColor: '#1f2937',
                                        borderColor: '#4b5563'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="Geração" fill="#facc15" name="Geração (kWh)" />
                                <Bar dataKey="Consumo" fill="#3b82f6" name="Consumo (kWh)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
             <div className="bg-blue-900/30 border border-blue-700 text-center p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white">Próximo Passo</h3>
                <p className="mt-2 text-blue-200">Gostou da sua projeção? Fale com um de nossos especialistas para validar os detalhes técnicos e formalizar seu projeto sem compromisso.</p>
                <button className="mt-4 bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors">
                    Falar com um Especialista
                </button>
            </div>
        </div>
    );
};

export default ResultsDisplay;
