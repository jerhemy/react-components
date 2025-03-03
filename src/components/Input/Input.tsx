import './Input.css';

import React, { forwardRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
    variant?: 'default' | 'error';
    size?: 'sm' | 'md' | 'lg';
    multiline?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
    variant = 'default',
    size = 'md',
    multiline = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}, ref) => {
    const baseClass = 'custom-input';
    const variantClass = variant !== 'default' ? `${baseClass}-${variant}` : '';
    const sizeClass = size !== 'md' ? `${baseClass}-${size}` : '';
    const iconClass = icon ? `${baseClass}-with-icon ${baseClass}-icon-${iconPosition}` : '';

    const inputClasses = [
        baseClass,
        variantClass,
        sizeClass,
        iconClass,
        className
    ].filter(Boolean).join(' ');

    const renderInput = () => {
        const inputProps = {
            className: inputClasses,
            ref,
            ...props
        };

        if (multiline) {
            return <textarea {...inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>} />;
        }

        return <input {...inputProps as React.InputHTMLAttributes<HTMLInputElement>} />;
    };

    return (
        <div className={`${baseClass}-container`}>
            {icon && iconPosition === 'left' && <span className={`${baseClass}-icon`}>{icon}</span>}
            {renderInput()}
            {icon && iconPosition === 'right' && <span className={`${baseClass}-icon`}>{icon}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input; 