import './Button.css';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = variant !== 'primary' ? `btn-${variant}` : '';
    const sizeClass = size !== 'md' ? `btn-${size}` : '';

    const buttonClasses = [
        baseClass,
        variantClass,
        sizeClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button; 