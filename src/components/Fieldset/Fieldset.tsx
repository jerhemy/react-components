import React, { useState, ReactNode } from 'react';
import './Fieldset.css';

interface FieldsetProps {
  legend: ReactNode;
  children: ReactNode;
  toggleable?: boolean;
  collapsed?: boolean;
  onToggle?: (e: { originalEvent: React.MouseEvent<HTMLElement>; value: boolean }) => void;
  className?: string;
  style?: React.CSSProperties;
  toggleButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
  legendClassName?: string;
  contentClassName?: string;
}

const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  children,
  toggleable = false,
  collapsed: controlledCollapsed,
  onToggle,
  className = '',
  style,
  toggleButtonProps,
  legendClassName = '',
  contentClassName = '',
}) => {
  // Use internal state for uncontrolled component
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState<boolean>(false);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;
  
  const contentId = React.useId();
  const headerId = React.useId();
  
  const toggle = (e: React.MouseEvent<HTMLElement>) => {
    if (isControlled && onToggle) {
      onToggle({ originalEvent: e, value: !isCollapsed });
    } else {
      setUncontrolledCollapsed(prev => !prev);
    }
    
    e.preventDefault();
  };
  
  const renderToggleIcon = () => {
    return (
      <span className={`fieldset-toggle-icon ${isCollapsed ? 'pi-plus' : 'pi-minus'}`}></span>
    );
  };
  
  const renderLegend = () => {
    if (!legend) {
      return null;
    }
    
    if (toggleable) {
      const buttonProps = {
        onClick: toggle,
        'aria-controls': contentId,
        'aria-expanded': !isCollapsed,
        ...toggleButtonProps
      };
      
      return (
        <legend className={`fieldset-legend ${legendClassName}`} id={headerId}>
          <button type="button" className="fieldset-toggle" {...buttonProps}>
            {renderToggleIcon()}
            <span className="fieldset-legend-text">{legend}</span>
          </button>
        </legend>
      );
    }
    
    return (
      <legend className={`fieldset-legend ${legendClassName}`} id={headerId}>
        <span className="fieldset-legend-text">{legend}</span>
      </legend>
    );
  };
  
  const fieldsetClassName = `fieldset ${toggleable ? 'fieldset-toggleable' : ''} ${isCollapsed ? 'fieldset-collapsed' : ''} ${className}`;
  
  return (
    <fieldset className={fieldsetClassName} style={style}>
      {renderLegend()}
      <div 
        id={contentId}
        className={`fieldset-content ${contentClassName}`}
        aria-labelledby={headerId}
        role="region"
        style={{ display: isCollapsed ? 'none' : 'block' }}
      >
        {children}
      </div>
    </fieldset>
  );
};

export default Fieldset; 