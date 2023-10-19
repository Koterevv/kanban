import React, { FC, useState } from "react";
import { FormAddingColumn } from "./FormAddingColumn";
import { ButtonAdd } from "../UI/ButtonAdd";

export const AddingColumn: FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    changeAddingState();
  };

  const changeAddingState = (): void => {
    setIsAdding(!isAdding);
  };

  return (
    <li className="w-64 shrink-0">
      {isAdding ? (
        <FormAddingColumn changeAddingState={changeAddingState} />
      ) : (
        <>
          <ButtonAdd onClick={handleClick} variant="fullfield">
            Add new column
          </ButtonAdd>
        </>
      )}
    </li>
  );
};
