import './Checkbox.css';

import React, { forwardRef, useEffect, useRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
    indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    error = false,
    size = 'md',
    className = '',
    disabled = false,
    indeterminate = false,
    onChange,
    checked,
    ...props
}, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const baseClass = 'custom-checkbox';
    const sizeClass = size !== 'md' ? `${baseClass}-${size}` : '';
    const errorClass = error ? `${baseClass}-error` : '';
    const disabledClass = disabled ? `${baseClass}-disabled` : '';
    const indeterminateClass = indeterminate ? `${baseClass}-indeterminate` : '';

    const checkboxClasses = [
        baseClass,
        sizeClass,
        errorClass,
        disabledClass,
        indeterminateClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <label className={checkboxClasses}>
            <input
                type="checkbox"
                className={`${baseClass}-input`}
                ref={combinedRef}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <span className={`${baseClass}-control`} />
            {label && <span className={`${baseClass}-label`}>{label}</span>}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 