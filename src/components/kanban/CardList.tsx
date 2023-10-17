"use client";
import { Card } from "@/store/features/cardsSlice";
import { SortableContext } from "@dnd-kit/sortable";
import { FC, useMemo } from "react";
import { CardItem } from "./CardItem";

interface CardListProps {
  columnId: number;
  cards: Card[];
  activeCard: Card | null;
}
export const CardList: FC<CardListProps> = ({ columnId, cards }) => {
  const cardsIds = useMemo(() => {
    return cards.map((card) => card.id);
  }, [cards]);

  return (
    <div className="px-2">
      <SortableContext items={cardsIds}>
        {cards?.map((card) => {
          if (card.columnId === columnId)
            return <CardItem key={card.id} card={card} />;
        })}
      </SortableContext>
    </div>
  );
};
