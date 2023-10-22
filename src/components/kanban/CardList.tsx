"use client";
import { Card } from "@/store/features/cardsSlice";
import { SortableContext } from "@dnd-kit/sortable";
import { FC, useMemo } from "react";
import { CardItem } from "./CardItem";
import { useAppSelector } from "@/hooks/hooks";

interface CardListProps {
  columnId: number;
  cards: Card[];
  activeCard: Card | null;
}
export const CardList: FC<CardListProps> = ({ columnId, cards }) => {
  const isDisabled = useAppSelector((state) => state.dnd.isDisable)
  const cardsIds = useMemo(() => {
    return cards.map((card) => card.id);
  }, [cards]);

  return (
    <>
      {!cards.length ? null : (
        <div className="overflow-auto grow overflow-x-hidden px-3">
          <SortableContext items={cardsIds} disabled={isDisabled}>
            {cards?.map((card) => {
              if (card.columnId === columnId)
                return <CardItem key={card.id} card={card} />;
            })}
          </SortableContext>
        </div>
      )}
    </>
  );
};
