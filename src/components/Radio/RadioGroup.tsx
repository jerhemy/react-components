import './Radio.css';

import React from 'react';

export interface RadioGroupProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
    error?: boolean;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    value,
    onChange,
    children,
    error = false,
    className = '',
    orientation = 'vertical',
    size = 'md',
    disabled = false
}) => {
    const baseClass = 'custom-radio-group';
    const orientationClass = `${baseClass}-${orientation}`;
    const errorClass = error ? `${baseClass}-error` : '';
    const disabledClass = disabled ? `${baseClass}-disabled` : '';

    const groupClasses = [
        baseClass,
        orientationClass,
        errorClass,
        disabledClass,
        className
    ].filter(Boolean).join(' ');

    const groupContext = {
        name,
        value,
        onChange
    };

    return (
        <div className={groupClasses}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        groupContext,
                        error,
                        size,
                        disabled: disabled || child.props.disabled
                    });
                }
                return child;
            })}
        </div>
    );
};

export default RadioGroup; 