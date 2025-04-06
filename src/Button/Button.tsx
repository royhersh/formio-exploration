import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
}) => {
  return (
    <button className={`button button--${variant} button--${size}`} onClick={onClick}>
      {label}
    </button>
  );
};
