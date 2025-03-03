import React from 'react';
import { IconName, IconSize, getIconSize, IconPaths } from './IconLibrary';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Name of the icon from IconLibrary */
  name: IconName;
  /** Size of the icon - can be predefined size or number in pixels */
  size?: IconSize;
  /** Color of the icon - defaults to currentColor */
  color?: string;
  /** Optional title for accessibility */
  title?: string;
  /** Optional description for accessibility */
  description?: string;
  /** Optional className for custom styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  title,
  description,
  className,
  style,
  ...props
}) => {
  const pixelSize = getIconSize(size);
  
  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      style={style}
      role={title ? 'img' : 'presentation'}
      aria-hidden={!title}
      {...props}
    >
      {title && (
        <title>{title}</title>
      )}
      {description && (
        <desc>{description}</desc>
      )}
      <path d={IconPaths[name]} />
    </svg>
  );
};

export default Icon; 