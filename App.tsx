
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import SolarCalculator from './components/SolarCalculator';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
                <div 
                    className="absolute inset-0 opacity-10" 
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.1), transparent 30%),
                            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1), transparent 30%)
                        `
                    }}
                ></div>
            </div>
            <div className="relative z-10">
                <Header />
                <main>
                    <Hero />
                    <HowItWorks />
                    <SolarCalculator />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
