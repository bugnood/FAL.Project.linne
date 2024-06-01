// src/components/CustomInput.tsx
import React from 'react';
import '../style/customInput.css';

interface CustomInputProps {
    label: string;
    type: string;
    placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, placeholder }) => {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input type={type} placeholder={placeholder} className="custom-input" />
        </div>
    );
};

export default CustomInput;