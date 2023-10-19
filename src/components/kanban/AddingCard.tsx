"use client";
import React, { FC, useState, useEffect } from "react";
import { ButtonAdd } from "../UI/ButtonAdd";
import { ButtonCancel } from "../UI/ButtonCancel";
import { useAppDispatch } from "@/hooks/hooks";
import { addCard } from "@/store/features/cardsSlice";

interface AddingCardProps {
  columnId: number
  isDragging: boolean
}
export const AddingCard: FC<AddingCardProps> = ({ columnId, isDragging }) => {
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

  useEffect(() => {
    if (isDragging) {
      setIsAddingCard(false)
    }
  }, [isDragging])

  return (
    <div className="p-3">
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
        <form className="">
          <div className="">
            <textarea
              autoFocus={true}
              className="textarea bg-[#422569] border border-white/60 scroll-none mb-2"
              placeholder="Add text card"
              value={titleCard}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setTitleCard(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-1">
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
    </div>
  );
};
