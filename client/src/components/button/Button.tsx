import React from 'react';
import '../button/button.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    style,
    className = '',
    disabled = false,
    icon,
    ariaLabel,
}) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className={`custom-button ${className}`}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {icon && <span className="button-icon">{icon}</span>}
            <span className="button-label">{label}</span>
            <span></span>
        </button>
    );
};

export default Button;