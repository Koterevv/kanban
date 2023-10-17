import React, { Children, FC } from 'react'
import {IoClose} from "react-icons/io5"

interface ButtonCancelProps {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonCancel: FC<ButtonCancelProps> = ({children, onClick}) => {
  return (
    <button onClick={onClick} className='text-2xl p-2 hover:bg-white/20 rounded-xl'>
      <IoClose/>
      {children}
    </button>
  )
}
