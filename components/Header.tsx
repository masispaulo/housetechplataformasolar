
import React from 'react';
import { SunIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="py-5 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <SunIcon className="w-8 h-8 text-yellow-400" />
                    <span className="text-2xl font-bold tracking-tight text-white">
                        House Tech <span className="text-yellow-400">Solar</span>
                    </span>
                </div>
                <nav>
                    {/* Future navigation links can go here */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
