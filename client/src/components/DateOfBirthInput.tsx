// src/components/DateOfBirthInput.tsx
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '../style/customInput.css';

const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
    }
    return years;
};

const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
};

const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
};

const DateOfBirthInput: React.FC = () => {
    const years = generateYears();
    const months = generateMonths();
    const days = generateDays();

    return (
        <div className="input-container">
            <div className="dob-selectors">
                <div className="selector-container">
                    <select className="custom-input">
                        <option value="">年</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <FaChevronDown className="selector-icon" />
                </div>
                <div className="selector-container">
                    <select className="custom-input">
                        <option value="">月</option>
                        {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    <FaChevronDown className="selector-icon" />
                </div>
                <div className="selector-container">
                    <select className="custom-input">
                        <option value="">日</option>
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <FaChevronDown className="selector-icon" />
                </div>
            </div>
        </div>
    );
};

export default DateOfBirthInput;