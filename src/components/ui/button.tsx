import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 ${props.className}`}
    >
      {children}
    </button>
  );
};
