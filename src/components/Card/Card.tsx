import React, { ReactNode } from 'react';
import './Card.css';

/**
 * Card component props
 */
export interface CardProps {
  /** Card title */
  title?: ReactNode;
  /** Card subtitle */
  subtitle?: ReactNode;
  /** Card content */
  children: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Optional header actions (e.g., buttons, icons) */
  headerActions?: ReactNode;
  /** Optional image URL to display at the top of the card */
  imageUrl?: string;
  /** Optional image alt text */
  imageAlt?: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Card elevation level (shadow depth) */
  elevation?: 0 | 1 | 2 | 3;
  /** Whether the card has a hover effect */
  hoverable?: boolean;
  /** Whether the card has a border */
  bordered?: boolean;
  /** Optional onClick handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Card component for displaying content in a contained, styled box
 */
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  headerActions,
  imageUrl,
  imageAlt = '',
  className = '',
  style,
  elevation = 1,
  hoverable = false,
  bordered = true,
  onClick,
}) => {
  // Build class names
  const cardClasses = [
    'card',
    `card-elevation-${elevation}`,
    hoverable ? 'card-hoverable' : '',
    bordered ? 'card-bordered' : '',
    className,
  ].filter(Boolean).join(' ');

  // Handle click events
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={cardClasses} 
      style={style} 
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {imageUrl && (
        <div className="card-image">
          <img src={imageUrl} alt={imageAlt} />
        </div>
      )}
      
      {(title || headerActions) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerActions && (
            <div className="card-header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 