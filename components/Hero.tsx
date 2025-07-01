
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tighter">
                    O Futuro da Energia Solar na Palma da Sua Mão.
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                    Somos a <span className="text-yellow-400 font-semibold">House Tech Solar</span>, a plataforma que simplifica seu caminho para a independência energética. De forma intuitiva, transformamos o valor da sua conta de luz em um orçamento fotovoltaico completo e detalhado.
                </p>
                <div className="mt-10">
                    <a href="#calculator" className="inline-block bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-yellow-400/20">
                        Gerar meu Orçamento Grátis
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
