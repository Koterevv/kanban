'use client'
import React, { FC, useEffect } from "react";
import { HiPlus } from "react-icons/hi";

interface ButtonAddProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: string
}

type VariablesType = {
  empty: string
  fullfield: string
  fullfieldBlue: string
}

const variables: VariablesType = {
  empty: 'hover:bg-white/10 w-full',
  fullfield: 'bg-white/30 hover:bg-white/10 w-full',
  fullfieldBlue: 'bg-blue-500 hover:bg-blue-300 px-4'
}

export const ButtonAdd: FC<ButtonAddProps> = ({ children, onClick, variant }) => {
  const className = variables[variant as keyof VariablesType]

  return (
    <button onClick={onClick} className={'adding-button ' + className}>
      <HiPlus />
      {children}
    </button>
  );
};
