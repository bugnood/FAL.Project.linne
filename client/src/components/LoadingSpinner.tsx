// src/components/LoadingSpinner.tsx
import React from 'react';
import '../style/loadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    );
};

export default LoadingSpinner;