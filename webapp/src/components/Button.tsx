import React, { ReactNode } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, style, children }) => {
  return (
    <button
      onClick={onClick}
      style={style}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
