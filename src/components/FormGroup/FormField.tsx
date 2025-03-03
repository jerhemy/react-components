import React from 'react';
import { useFormGroup } from './FormGroup';

interface FormFieldProps {
    name: string;
    children: (props: {
        value: any;
        onChange: (value: any) => void;
        onBlur: () => void;
        error?: string;
        touched?: boolean;
    }) => React.ReactNode;
    validate?: (value: any) => string | undefined;
}

const FormField: React.FC<FormFieldProps> = ({ name, children, validate }) => {
    const { values, setFieldValue, errors, setFieldError, touched, setFieldTouched } = useFormGroup();

    const handleChange = (value: any) => {
        setFieldValue(name, value);
        if (validate) {
            const error = validate(value);
            if (error) {
                setFieldError(name, error);
            } else {
                setFieldError(name, '');
            }
        }
    };

    const handleBlur = () => {
        setFieldTouched(name, true);
        if (validate) {
            const error = validate(values[name]);
            if (error) {
                setFieldError(name, error);
            }
        }
    };

    return (
        <>
            {children({
                value: values[name],
                onChange: handleChange,
                onBlur: handleBlur,
                error: errors[name],
                touched: touched[name]
            })}
        </>
    );
};

export default FormField; 