import React, {FC} from "react";
import {HiPlus} from "react-icons/hi"

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonAddingColumn: FC<ButtonProps> = ({onClick}) => {
  return (
    <button
      className="flex items-center gap-1 w-full justify-center bg-white/30 hover:bg-white/10 p-2 rounded-xl"
      onClick={onClick}
    >
      <HiPlus />
      Add new column
    </button>
  );
}
