import React, { createContext, useCallback, useContext, useState } from 'react';

interface FormGroupContextType {
    values: Record<string, any>;
    setFieldValue: (name: string, value: any) => void;
    errors: Record<string, string>;
    setFieldError: (name: string, error: string) => void;
    touched: Record<string, boolean>;
    setFieldTouched: (name: string, isTouched: boolean) => void;
}

const FormGroupContext = createContext<FormGroupContextType | undefined>(undefined);

export const useFormGroup = () => {
    const context = useContext(FormGroupContext);
    if (!context) {
        throw new Error('useFormGroup must be used within a FormGroup component');
    }
    return context;
};

interface FormGroupProps {
    children: React.ReactNode;
    initialValues?: Record<string, any>;
    onSubmit?: (values: Record<string, any>) => void;
    onChange?: (values: Record<string, any>) => void;
    className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
    children,
    initialValues = {},
    onSubmit,
    onChange,
    className
}) => {
    const [values, setValues] = useState<Record<string, any>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const setFieldValue = useCallback((name: string, value: any) => {
        setValues(prev => {
            const newValues = { ...prev, [name]: value };
            onChange?.(newValues);
            return newValues;
        });
    }, [onChange]);

    const setFieldError = useCallback((name: string, error: string) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
        setTouched(prev => ({ ...prev, [name]: isTouched }));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(values);
    };

    const contextValue = {
        values,
        setFieldValue,
        errors,
        setFieldError,
        touched,
        setFieldTouched,
    };

    return (
        <FormGroupContext.Provider value={contextValue}>
            <form onSubmit={handleSubmit} className={className}>
                {children}
            </form>
        </FormGroupContext.Provider>
    );
};

export default FormGroup; 