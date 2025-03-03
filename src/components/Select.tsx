import '../styles/Select.css';

import { useEffect, useRef, useState } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  onChange: (selectedOption: Option | Option[] | null) => void;
  value?: Option | Option[] | null;
  isSearchable?: boolean;
  isClearable?: boolean;
  className?: string;
}

const Select = ({
  options,
  placeholder = 'Select...',
  isMulti = false,
  onChange,
  value = null,
  isSearchable = true,
  isClearable = true,
  className = '',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    isMulti ? (Array.isArray(value) ? value : []) : value ? [value as Option] : []
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMulti) {
      setSelectedOptions(Array.isArray(value) ? value : []);
    } else {
      setSelectedOptions(value ? [value as Option] : []);
    }
  }, [value, isMulti]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchValue('');
    }
  };

  const handleOptionClick = (option: Option) => {
    if (isMulti) {
      const isSelected = selectedOptions.some((selected) => selected.value === option.value);
      let newSelectedOptions: Option[];

      if (isSelected) {
        newSelectedOptions = selectedOptions.filter((selected) => selected.value !== option.value);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }

      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOptions([]);
    onChange(isMulti ? [] : null);
  };

  const handleRemoveOption = (e: React.MouseEvent, option: Option) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    onChange(isMulti ? newSelectedOptions : null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isOptionSelected = (option: Option) => {
    return selectedOptions.some((selected) => selected.value === option.value);
  };

  return (
    <div className={`custom-select ${className}`} ref={selectRef}>
      <div className="select-control" onClick={toggleDropdown}>
        <div className="select-value">
          {selectedOptions.length === 0 ? (
            <div className="placeholder">{placeholder}</div>
          ) : isMulti ? (
            <div className="multi-value-container">
              {selectedOptions.map((option) => (
                <div key={option.value} className="multi-value">
                  <span className="multi-value-label">{option.label}</span>
                  <span
                    className="multi-value-remove"
                    onClick={(e) => handleRemoveOption(e, option)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="single-value">{selectedOptions[0].label}</div>
          )}
        </div>
        <div className="select-indicators">
          {isClearable && selectedOptions.length > 0 && (
            <div className="clear-indicator" onClick={handleClear}>
              ×
            </div>
          )}
          <div className="dropdown-indicator">▼</div>
        </div>
      </div>

      {isOpen && (
        <div className="select-menu">
          {isSearchable && (
            <div className="select-search">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}
          <div className="select-options">
            {filteredOptions.length === 0 ? (
              <div className="no-options">No options</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`select-option ${isOptionSelected(option) ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select; 