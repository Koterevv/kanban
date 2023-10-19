import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addColumn } from "@/store/features/columnsSlice";
import React, { useState } from "react";
import { ButtonAdd } from "../UI/ButtonAdd";

interface FormAddingColumnType {
  changeAddingState: () => void;
}

export const FormAddingColumn: React.FC<FormAddingColumnType> = ({
  changeAddingState,
}) => {
  const dispatch = useAppDispatch();
  const [columnTitle, setColumnTitle] = useState<string>("");
  const columns = useAppSelector((state) => state.columns.columns);

  return (
    <form
      className="bg-[#231736] rounded-xl p-3"
      onSubmit={(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isExist = columns.some((column) => column.title === columnTitle);
        if (columnTitle.length && !isExist) {
          dispatch(addColumn(columnTitle));
          setColumnTitle("");
          changeAddingState();
        }
      }}
    >
      <div className="mb-6">
        <input
          autoFocus={true}
          className="p-2 cursor-pointer bg-transparent rounded-lg w-full"
          placeholder="Enter the column title"
          value={columnTitle}
          onChange={(e) => setColumnTitle(e.target.value)}
        />
      </div>

      <ButtonAdd variant="empty">Add column</ButtonAdd>
    </form>
  );
};
