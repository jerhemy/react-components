import './Select.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

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
    return 'options' in option;
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<(SelectOption<T> | SelectGroup<T>)[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = useCallback(async (term: string) => {
        if (!onSearch || term.length < minSearchLength) return;

        setLoading(true);
        setError(null);

        try {
            const results = await onSearch(term);
            setSearchResults(results);
        } catch (err) {
            setError(errorText);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }, [onSearch, minSearchLength, errorText]);

    const debouncedSearch = useDebounce(handleSearch, 300);

    useEffect(() => {
        if (onSearch && searchTerm.length >= minSearchLength) {
            debouncedSearch(searchTerm);
        } else if (onSearch) {
            setSearchResults([]);
        }
    }, [searchTerm, onSearch, minSearchLength, debouncedSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setHighlightedIndex(-1);
            setSearchTerm('');
        } else if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

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
            data: option as T
        };
    };

    const normalizedOptions = options.map(option => {
        if (isGroup(option as any)) {
            return {
                ...option,
                options: (option as SelectGroup<T>).options.map(normalizeOption)
            };
        }
        return normalizeOption(option as T);
    }) as (SelectOption<T> | SelectGroup<T>)[];

    const getAllOptions = (): SelectOption<T>[] => {
        const allOptions = onSearch ? searchResults : normalizedOptions;
        return allOptions.reduce<SelectOption<T>[]>((acc, option) => {
            if (isGroup(option)) {
                return [...acc, ...option.options];
            }
            return [...acc, option];
        }, []);
    };

    const getFilteredOptions = () => {
        const optionsToFilter = onSearch ? searchResults : normalizedOptions;
        if (!searchTerm || onSearch) return optionsToFilter;

        const filterOption = (option: SelectOption<T>) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase());

        return optionsToFilter.map(option => {
            if (isGroup(option)) {
                return {
                    ...option,
                    options: option.options.filter(filterOption),
                };
            }
            return option;
        }).filter(option => {
            if (isGroup(option)) {
                return option.options.length > 0;
            }
            return filterOption(option as SelectOption<T>);
        });
    };

    const isOptionSelected = (option: SelectOption<T>): boolean => {
        if (isMulti && Array.isArray(value)) {
            return value.some(v =>
                typeof v === 'object'
                    ? v[valueKey as keyof T] === option.data[valueKey as keyof T]
                    : v === option.data
            );
        }
        if (value === null) return false;
        return typeof value === 'object'
            ? value[valueKey as keyof T] === option.data[valueKey as keyof T]
            : value === option.data;
    };

    const handleSelect = (selectedOption: SelectOption<T>) => {
        if (isMulti) {
            const newValue = Array.isArray(value) ? value : [];
            const isSelected = isOptionSelected(selectedOption);

            if (isSelected) {
                onChange(newValue.filter(v =>
                    typeof v === 'object'
                        ? v[valueKey as keyof T] !== selectedOption.data[valueKey as keyof T]
                        : v !== selectedOption.data
                ));
            } else {
                onChange([...newValue, selectedOption.data]);
            }
        } else {
            onChange(selectedOption.data);
            setIsOpen(false);
        }
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!isOpen) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        const options = getAllOptions();

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setHighlightedIndex(prev =>
                    prev < options.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                event.preventDefault();
                setHighlightedIndex(prev =>
                    prev > 0 ? prev - 1 : options.length - 1
                );
                break;
            case 'Enter':
                event.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSelect(options[highlightedIndex]);
                }
                break;
            case 'Escape':
                event.preventDefault();
                setIsOpen(false);
                break;
            case 'Tab':
                setIsOpen(false);
                break;
        }
    };

    const renderSelectedValue = () => {
        if (!value) return placeholder;

        if (isMulti && Array.isArray(value)) {
            if (value.length === 0) return placeholder;

            if (useChips) {
                return (
                    <div className="select-chips" onClick={e => e.stopPropagation()}>
                        {value.map((v, index) => {
                            const label = typeof v === 'object'
                                ? String(v[labelKey as keyof T])
                                : String(v);
                            return (
                                <Chip
                                    key={index}
                                    label={label}
                                    onRemove={() => {
                                        const newValue = value.filter((_, i) => i !== index);
                                        onChange(newValue.length > 0 ? newValue : null);
                                    }}
                                    disabled={disabled}
                                />
                            );
                        })}
                    </div>
                );
            }

            return value.map(v =>
                typeof v === 'object'
                    ? String(v[labelKey as keyof T])
                    : String(v)
            ).join(', ');
        }

        if (renderValue) {
            return renderValue(value);
        }

        return typeof value === 'object'
            ? String(value[labelKey as keyof T])
            : String(value);
    };

    const renderDropdownContent = () => {
        if (loading) {
            return <div className="select-message">{loadingText}</div>;
        }

        if (error) {
            return <div className="select-message error">{error}</div>;
        }

        const filteredOptions = getFilteredOptions();
        if (filteredOptions.length === 0) {
            return <div className="select-message">{noOptionsText}</div>;
        }

        let optionIndex = -1;

        return filteredOptions.map((option, index) => {
            if (isGroup(option)) {
                return (
                    <div key={option.label} className="select-group">
                        <div className="select-group-label">{option.label}</div>
                        {option.options.map(groupOption => {
                            optionIndex++;
                            return (
                                <div
                                    key={groupOption.value}
                                    className={`select-option ${isOptionSelected(groupOption) ? 'selected' : ''
                                        } ${optionIndex === highlightedIndex ? 'highlighted' : ''}`}
                                    onClick={() => handleSelect(groupOption)}
                                    onMouseEnter={() => setHighlightedIndex(optionIndex)}
                                >
                                    {isMulti && !useChips && (
                                        <input
                                            type="checkbox"
                                            checked={isOptionSelected(groupOption)}
                                            onChange={() => { }}
                                            className="select-checkbox"
                                        />
                                    )}
                                    {renderOption ? renderOption(groupOption.data) : groupOption.label}
                                </div>
                            );
                        })}
                    </div>
                );
            }

            optionIndex++;
            return (
                <div
                    key={option.value}
                    className={`select-option ${isOptionSelected(option as SelectOption<T>) ? 'selected' : ''
                        } ${optionIndex === highlightedIndex ? 'highlighted' : ''}`}
                    onClick={() => handleSelect(option as SelectOption<T>)}
                    onMouseEnter={() => setHighlightedIndex(optionIndex)}
                >
                    {isMulti && !useChips && (
                        <input
                            type="checkbox"
                            checked={isOptionSelected(option as SelectOption<T>)}
                            onChange={() => { }}
                            className="select-checkbox"
                        />
                    )}
                    {renderOption ? renderOption((option as SelectOption<T>).data) : (option as SelectOption<T>).label}
                </div>
            );
        });
    };

    return (
        <div
            ref={containerRef}
            className={`select-container ${disabled ? 'disabled' : ''} ${className} ${useChips ? 'with-chips' : ''}`}
            onKeyDown={handleKeyDown}
        >
            <div
                className={`select-input ${isOpen ? 'open' : ''} ${loading ? 'loading' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                tabIndex={0}
            >
                <div className="select-value">
                    {renderSelectedValue()}
                </div>
                {isSearchable && isOpen && (
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        className="select-search"
                        placeholder="Search..."
                    />
                )}
                <span className={`select-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>

            {isOpen && !disabled && (
                <div ref={dropdownRef} className="select-dropdown">
                    {renderDropdownContent()}
                </div>
            )}
        </div>
    );
};

export default Select; 