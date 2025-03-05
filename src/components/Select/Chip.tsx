import React from 'react';
import './Chip.css';

interface ChipProps {
    label: string;
    onRemove?: () => void;
    disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, disabled }) => {
    return (
        <div className={`chip ${disabled ? 'disabled' : ''}`}>
            <span className="chip-label">{label}</span>
            {onRemove && !disabled && (
                <button
                    className="chip-remove"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    type="button"
                    aria-label="Remove"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Chip; 