
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
            <div className="container mx-auto text-center text-gray-500">
                <p>&copy; {currentYear} House Tech Solar. Todos os direitos reservados.</p>
                <p className="text-sm mt-1">Transformando luz do sol em economia para você.</p>
            </div>
        </footer>
    );
};

export default Footer;
