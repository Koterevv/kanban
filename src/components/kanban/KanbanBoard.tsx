"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { swapColumns } from "@/store/features/columnsSlice";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC, useMemo, useState } from "react";
import { AddingColumn } from "./AddingColumn";
import { ColumnItem } from "./ColumnItem";

import type { RootState } from "@/store";
import { Card, relocateCard, relocateCardToColWithCards, swapCards } from "@/store/features/cardsSlice";
import { Column } from "@/store/features/types/types";
import { CardItem } from "./CardItem";

export const KanbanBoard: FC = () => {
  const columns = useAppSelector((state: RootState) => state.columns.columns);
  const cards = useAppSelector((state: RootState) => state.cards.cards);
  const dispatch = useAppDispatch();

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const columnsIds = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  const onDragStart = (e: DragStartEvent): void => {
    if (e.active.data.current?.type === "column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
    if (e.active.data.current?.type === "card") {
      setActiveCard(e.active.data.current.card);
      return;
    }
  };

  const onDragMove = (e: DragMoveEvent): void => {
    const { active, over } = e;
    if (!over) return;

    if (active.id === over.id) return;

    if (
      active.data.current?.type !== "undefined" &&
      over.data.current?.type !== "undefined"
    ) {
      if (
        active.data.current?.type === "column" &&
        over.data.current?.type === "column"
      ) {
        const activeColumn = active.data.current.column;
        const overColumn = over.data.current.column;
        dispatch(swapColumns({ activeColumn, overColumn }));
      }
      
      if (
        active.data.current?.type === "card" &&
        over.data.current?.type === "card"
      ) {
        if (active.data.current.card.columnId !== over.data.current.card.columnId) {
          const activeCard = active.data.current.card;
          const overCard = over.data.current.card;
          dispatch(relocateCardToColWithCards({ activeCard, overCard }));
        }
      }
      if (
        active.data.current?.type === "card" &&
        over.data.current?.type === "column"
      ) {
        if (active.data.current.card.columnId !== over.data.current.column.id) {
          const activeCard = active.data.current.card;
          const overColumn = over.data.current.column;
          dispatch(relocateCard({ activeCard, overColumn }));
        }
      }
      if (
        active.data.current?.type === "card" &&
        over.data.current?.type === "card"
      ) {
        if (
          active.data.current.card.columnId === over.data.current.card.columnId
        ) {
          console.log('over')
          const activeCard = active.data.current.card;
          const overCard = over.data.current.card;
          dispatch(swapCards({ activeCard, overCard }));
        }
      }
    }
  };

  const onDragEnd = (e: DragEndEvent): void => {
    setActiveColumn(null);
    setActiveCard(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div className="p-5">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={columnsIds}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="flex gap-10">
            {columns?.map((column) => {
              return (
                <ColumnItem
                  key={column.id}
                  column={column}
                  cards={cards}
                  activeCard={activeCard}
                />
              );
            })}
            <AddingColumn />
          </ul>
        </SortableContext>

        <DragOverlay>
          {activeColumn && (
            <ColumnItem
              column={activeColumn}
              cards={cards}
              activeCard={activeCard}
            />
          )}
          {activeCard && <CardItem card={activeCard} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
