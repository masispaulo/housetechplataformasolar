
import React from 'react';
import { FileTextIcon, CpuIcon, BarChartIcon } from './Icons';

const StepCard: React.FC<{ icon: React.ReactNode; title: string; description: string; step: number }> = ({ icon, title, description, step }) => (
    <div className="relative bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1">
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-900 border-2 border-yellow-400 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xl">
            {step}
        </div>
        <div className="mb-4 inline-block text-yellow-400">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);


const HowItWorks: React.FC = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Como Funciona?</h2>
                    <p className="mt-4 text-lg text-gray-400">Em três passos simples, você tem seu futuro energético planejado.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <StepCard
                        step={1}
                        icon={<FileTextIcon className="w-12 h-12" />}
                        title="Informe seu Consumo"
                        description="Preencha o formulário abaixo com o valor médio mensal da sua conta de energia. É rápido e seguro."
                    />
                    <StepCard
                        step={2}
                        icon={<CpuIcon className="w-12 h-12" />}
                        title="Análise com IA"
                        description="Nossa IA processa seus dados, calcula o sistema ideal e projeta sua geração de energia mês a mês."
                    />
                    <StepCard
                        step={3}
                        icon={<BarChartIcon className="w-12 h-12" />}
                        title="Receba seu Orçamento"
                        description="Veja o detalhamento completo do seu kit, a economia gerada e o payback do seu investimento."
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
