"use client";
import React, { FC, useState } from "react";
import { ButtonAdd } from "../UI/ButtonAdd";
import { ButtonCancel } from "../UI/ButtonCancel";
import { useAppDispatch } from "@/hooks/hooks";
import { addCard } from "@/store/features/cardsSlice";

interface AddingCardProps {
  columnId: number;
}
export const AddingCard: FC<AddingCardProps> = ({ columnId }) => {
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [titleCard, setTitleCard] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleAddCard = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (titleCard) {
      dispatch(addCard({ title: titleCard, columnId }));
    }
    setTitleCard("");
  };

  return (
    <>
      {!isAddingCard ? (
        <ButtonAdd
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
            e.preventDefault();
            setIsAddingCard(true);
          }}
          variant="empty"
        >
          Add a card
        </ButtonAdd>
      ) : (
        <form>
          <div className="p-2 -mb-4">
            <textarea
              autoFocus={true}
              className="textarea"
              placeholder="Add text card"
              value={titleCard}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setTitleCard(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-1 p-2 pb-3">
            <ButtonAdd variant="fullfieldBlue" onClick={handleAddCard}>
              Add card
            </ButtonAdd>
            <ButtonCancel
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setIsAddingCard(false);
              }}
            ></ButtonCancel>
          </div>
        </form>
      )}
    </>
  );
};
