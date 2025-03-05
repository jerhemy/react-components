import './Radio.css';

import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
    groupContext?: {
        name: string;
        value: string;
        onChange: (value: string) => void;
    };
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
    label,
    error = false,
    size = 'md',
    className = '',
    disabled = false,
    groupContext,
    onChange,
    checked,
    value,
    ...props
}, ref) => {
    const baseClass = 'custom-radio';
    const sizeClass = size !== 'md' ? `${baseClass}-${size}` : '';
    const errorClass = error ? `${baseClass}-error` : '';
    const disabledClass = disabled ? `${baseClass}-disabled` : '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (groupContext) {
            groupContext.onChange(e.target.value);
        } else {
            onChange?.(e);
        }
    };

    const isChecked = groupContext
        ? groupContext.value === value
        : checked;

    const radioClasses = [
        baseClass,
        sizeClass,
        errorClass,
        disabledClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <label className={radioClasses}>
            <input
                type="radio"
                className={`${baseClass}-input`}
                ref={ref}
                disabled={disabled}
                checked={isChecked}
                onChange={handleChange}
                value={value}
                name={groupContext?.name || props.name}
                {...props}
            />
            <span className={`${baseClass}-control`} />
            {label && <span className={`${baseClass}-label`}>{label}</span>}
        </label>
    );
});

Radio.displayName = 'Radio';

export default Radio; 