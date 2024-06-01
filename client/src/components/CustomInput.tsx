// src/components/CustomInput.tsx
import React from 'react';
import '../style/customInput.css';

interface CustomInputProps {
    label: string;
    type: string;
    placeholder: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
    return (
        <div className="input-container">
            {/* <label className="input-label">{props.label}</label> */}
            <input
                ref={ref}
                className="custom-input"
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    );
});

export default CustomInput;