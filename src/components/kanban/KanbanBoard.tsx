"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { swapColumns } from "@/store/features/columnsSlice";
import {
  DndContext,
  DragEndEvent,
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
import { Card, relocateCard, swapCards } from "@/store/features/cardsSlice";
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

  const onDragOver = (e: DragOverEvent): void => {
    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (active.data.current?.type && over.data.current?.type) {
      if (activeId === overId) return;

      const activeType = active.data.current.type;
      const overType = over.data.current.type;

      // console.log("over", activeType, overType);

      if (activeType === "card") {
        const activeCard = active.data.current.card;

        if (overType === "card") {
          const overCard = over.data.current.card;
          console.log("over card and card", activeCard, overCard);
          dispatch(swapCards({ activeCard, overCard }));
        }

        if (overType === "column") {
          const columnId = over.data.current.column.id;
          console.log(
            "over card and column",
            activeCard,
            over.data.current.column
          );
          dispatch(relocateCard({ activeCard, columnId }));
        }
      }
    }
  };

  const onDragEnd = (e: DragEndEvent): void => {
    setActiveColumn(null);
    setActiveCard(null);
    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (
      active.data.current?.type === "column" &&
      over.data.current?.type === "column"
    ) {
      console.log("end", active, over);
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      dispatch(swapColumns({ activeColumnIndex, overColumnIndex }));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext
          items={columnsIds}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="flex gap-4">
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
    </>
  );
};
