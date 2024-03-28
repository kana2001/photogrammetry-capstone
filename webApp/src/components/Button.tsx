import React, { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, style, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className='button-23'
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
