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

  if (isDragging) {
    return (
      <li
        ref={setNodeRef}
        style={style}
        className="w-64 p-2 bg-black rounded-xl opacity-60 border border-rose-500"
      ></li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-64 bg-deep-indigo/90 rounded-xl h-min p-1 overflow-auto"
      // className="w-64 bg-gray-900 rounded-xl h-96 p-2 cursor-auto"
    >
      <div className="p-2">
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
      <AddingCard columnId={column.id} />
    </li>
  );
};
