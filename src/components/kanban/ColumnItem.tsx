"use client";
import { useAppDispatch } from "@/hooks/hooks";
import { changeTitle } from "@/store/features/columnsSlice";
import React, { FC, useEffect, useRef } from "react";
import { AddingCard } from "./AddingCard";
import { CardList } from "./CardList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/store/features/cardsSlice";
import { Column } from "@/store/features/types/types";

interface ColumnItemProps {
  column: Column;
  cards: Card[];
  activeCard: Card | null;
}

export const ColumnItem: FC<ColumnItemProps> = ({
  column,
  cards,
  activeCard,
}) => {
  const dispatch = useAppDispatch();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? "column opacity-60 border border-[#A6A6ED]" : "column"}
    >
      <div className="p-3">
        <input
          className="p-2 bg-transparent rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTitle({ title: e.target.value, id: column.id }));
            console.log("work");
          }}
          value={column.title}
        />
      </div>
      
      <CardList columnId={column.id} cards={cards} activeCard={activeCard} />
      <AddingCard columnId={column.id} isDragging={isDragging} />
    </li>
  );
};
