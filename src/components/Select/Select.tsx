import './Select.css';

import React, { useState, useRef, useEffect } from 'react';

import Chip from './Chip';
import { useDebounce } from '../../hooks/useDebounce';

export interface SelectOption<T = any> {
    value: string;
    label: string;
    data?: T;
    [key: string]: any;
}

export interface SelectGroup<T = any> {
    label: string;
    options: SelectOption<T>[];
}

export interface SelectProps<T = any> {
    // Core props
    options: (SelectOption<T> | SelectGroup<T>)[] | T[];
    value: T | T[] | null;
    onChange: (value: T | T[] | null) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;

    // Selection mode props
    isMulti?: boolean;
    useChips?: boolean;

    // Search props
    isSearchable?: boolean;
    onSearch?: (searchTerm: string) => Promise<(SelectOption<T> | SelectGroup<T>)[]>;
    minSearchLength?: number;
    loadingText?: string;
    noOptionsText?: string;
    errorText?: string;

    // Custom mapping and rendering props
    valueKey?: keyof T & string;
    labelKey?: keyof T & string;
    renderOption?: (option: T) => React.ReactNode;
    renderValue?: (value: T) => React.ReactNode;
}

const isGroup = <T,>(option: SelectOption<T> | SelectGroup<T>): option is SelectGroup<T> => {
    return 'options' in option && Array.isArray(option.options);
};

const Select = <T extends Record<string, any> | string = any>({
    options = [],
    value,
    onChange,
    placeholder = 'Select...',
    disabled = false,
    className = '',
    isMulti = false,
    useChips = false,
    isSearchable = false,
    onSearch,
    minSearchLength = 2,
    loadingText = 'Loading...',
    noOptionsText = 'No options found',
    errorText = 'Error loading options',
    valueKey = 'value',
    labelKey = 'label',
    renderOption,
    renderValue
}: SelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SelectOption<T>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Reset search when dropdown closes
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
            setSearchResults([]);
        } else if (isSearchable && inputRef.current) {
            // Focus the search input when dropdown opens
            setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
        }
    }, [isOpen, isSearchable]);

    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (onSearch && term.length >= minSearchLength) {
            setIsLoading(true);
            onSearch(term)
                .then(results => {
                    const flatResults = results.flatMap(result =>
                        isGroup(result) ? result.options : [result]
                    );
                    setSearchResults(flatResults);
                    setIsLoading(false);
                })
                .catch(() => {
                    setSearchResults([]);
                    setIsLoading(false);
                });
        }
    };

    // Normalize options to SelectOption format
    const normalizeOption = (option: T | SelectOption<T>): SelectOption<T> => {
        if (typeof option === 'object' && option !== null) {
            if ('value' in option && 'label' in option) {
                return option as SelectOption<T>;
            }
            return {
                value: String(option[valueKey as keyof T]),
                label: String(option[labelKey as keyof T]),
                data: option
            };
        }
        return {
            value: String(option),
            label: String(option),
            data: option
        };
    };

    // Get all options as a flat array (for selection checking)
    const getAllOptions = (): SelectOption<T>[] => {
        return options.flatMap(option => {
            if (isGroup(option as any)) {
                return (option as SelectGroup<T>).options;
            }
            return normalizeOption(option as any);
        });
    };

    // Check if an option is selected
    const isOptionSelected = (option: SelectOption<T>): boolean => {
        if (!value) return false;

        if (isMulti && Array.isArray(value)) {
            return value.some(v => {
                const normalizedOption = normalizeOption(v);
                return normalizedOption.value === option.value;
            });
        }

        const normalizedValue = normalizeOption(value);
        return normalizedValue.value === option.value;
    };

    // Handle option selection
    const handleSelect = (option: SelectOption<T>) => {
        if (isMulti) {
            const newValue = Array.isArray(value) ? [...value] : [];
            const isSelected = isOptionSelected(option);

            if (isSelected) {
                onChange(newValue.filter(v => {
                    const normalizedOption = normalizeOption(v);
                    return normalizedOption.value !== option.value;
                }));
            } else {
                onChange([...newValue, option.data || option]);
            }
        } else {
            onChange(option.data || option);
            setIsOpen(false);
        }
    };

    // Filter options based on search term
    const getFilteredOptions = () => {
        if (onSearch && searchTerm.length >= minSearchLength) {
            return searchResults;
        }

        if (!searchTerm) return options;

        return options.map(option => {
            if (isGroup(option as any)) {
                const group = option as SelectGroup<T>;
                const filteredOptions = group.options.filter(opt =>
                    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredOptions.length > 0) {
                    return {
                        ...group,
                        options: filteredOptions
                    };
                }
                return null;
            }

            const normalizedOption = normalizeOption(option as any);
            return normalizedOption.label.toLowerCase().includes(searchTerm.toLowerCase())
                ? normalizedOption
                : null;
        }).filter(Boolean) as (SelectOption<T> | SelectGroup<T>)[];
    };

    // Render the dropdown content
    const renderDropdownContent = () => {
        if (isLoading) {
            return <div className="select-message">{loadingText}</div>;
        }

        const filteredOptions = getFilteredOptions();

        if (filteredOptions.length === 0) {
            return <div className="select-message">{noOptionsText}</div>;
        }

        return filteredOptions.map((option, index) => {
            if (isGroup(option as any)) {
                const group = option as SelectGroup<T>;
                return (
                    <div key={`group-${index}`} className="select-group">
                        <div className="select-group-label">{group.label}</div>
                        <div className="select-group-options">
                            {group.options.map((groupOption) => (
                                <div
                                    key={groupOption.value}
                                    className={`select-option ${isOptionSelected(groupOption) ? 'selected' : ''}`}
                                    onClick={() => handleSelect(groupOption)}
                                >
                                    {renderOption ? renderOption(groupOption.data as T) : groupOption.label}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            const normalizedOption = option as SelectOption<T>;
            return (
                <div
                    key={normalizedOption.value}
                    className={`select-option ${isOptionSelected(normalizedOption) ? 'selected' : ''}`}
                    onClick={() => handleSelect(normalizedOption)}
                >
                    {renderOption ? renderOption(normalizedOption.data as T) : normalizedOption.label}
                </div>
            );
        });
    };

    // Normalize a value to a SelectOption
    const normalizeValue = (val: T | T[] | null): SelectOption<T> | SelectOption<T>[] | null => {
        if (val === null) return null;

        const allOptions = getAllOptions();

        if (Array.isArray(val)) {
            return val.map(v => {
                if (typeof v === 'object' && v !== null && 'value' in v && 'label' in v) {
                    return v as unknown as SelectOption<T>;
                }

                const matchingOption = allOptions.find(option =>
                    String(option.value) === String(typeof v === 'object' ? (v as any)[valueKey] : v)
                );

                return matchingOption || {
                    value: String(typeof v === 'object' ? (v as any)[valueKey] : v),
                    label: String(typeof v === 'object' ? (v as any)[labelKey] : v),
                    data: v
                };
            });
        }

        if (typeof val === 'object' && val !== null && 'value' in val && 'label' in val) {
            return val as unknown as SelectOption<T>;
        }

        const matchingOption = allOptions.find(option =>
            String(option.value) === String(typeof val === 'object' ? (val as any)[valueKey] : val)
        );

        return matchingOption || {
            value: String(typeof val === 'object' ? (val as any)[valueKey] : val),
            label: String(typeof val === 'object' ? (val as any)[labelKey] : val),
            data: val
        };
    };

    // Render the selected value
    const renderSelectedValue = () => {
        if (value === null || (Array.isArray(value) && value.length === 0)) {
            return <div className="placeholder">{placeholder}</div>;
        }

        const normalizedValue = normalizeValue(value);

        if (isMulti && Array.isArray(normalizedValue)) {
            if (useChips) {
                return (
                    <div className="select-chips">
                        {normalizedValue.map((option) => (
                            <div key={option.value} className="chip">
                                <span className="chip-label">
                                    {renderValue ? renderValue(option.data as T) : option.label}
                                </span>
                                <button
                                    type="button"
                                    className="chip-remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newValue = (value as T[]).filter(
                                            (v) => String(typeof v === 'object' ? (v as any)[valueKey] : v) !== option.value
                                        );
                                        onChange(newValue.length ? newValue : null);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                );
            }

            return (
                <div className="selected-value">
                    {normalizedValue.map(option => option.label).join(', ')}
                </div>
            );
        }

        return (
            <div className="selected-value">
                {normalizedValue && !Array.isArray(normalizedValue) && (
                    renderValue
                        ? renderValue(normalizedValue.data as T)
                        : normalizedValue.label
                )}
            </div>
        );
    };

    return (
        <div
            className={`select-container ${className}`}
            ref={containerRef}
        >
            <div
                className={`select-input ${isOpen ? 'is-open' : ''} ${disabled ? 'disabled' : ''} ${isSearchable ? 'searchable' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                {renderSelectedValue()}

                {isSearchable && (
                    <input
                        ref={inputRef}
                        type="text"
                        className="select-search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Search..."
                    />
                )}

                <div className="select-arrow">
                    {isOpen ? '▲' : '▼'}
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="select-dropdown">
                    {renderDropdownContent()}
                </div>
            )}
        </div>
    );
};

export default Select;