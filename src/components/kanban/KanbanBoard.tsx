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
import { SortableContext } from "@dnd-kit/sortable";
import { FC, useMemo, useState } from "react";
import { AddingColumn } from "./AddingColumn";
import { ColumnItem } from "./ColumnItem";

import type { RootState } from "@/store";
import { Card, swapCards } from "@/store/features/cardsSlice";
import { CardItem } from "./CardItem";
import { Column } from "@/store/features/types/types";

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
    console.log("start");

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
    console.log("over");

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveCard = active.data.current?.type === "card";
    const isOverCard = over.data.current?.type === "card";

    if (isActiveCard && isOverCard) {
      if (
        typeof active.data.current !== "undefined" &&
        typeof over.data.current !== "undefined"
      ) {
        const activeCard = active.data.current.card;
        const overCard = over.data.current.card;
        dispatch(swapCards({ activeCard, overCard }));
      }
    }
  };

  const onDragEnd = (e: DragEndEvent): void => {
    setActiveColumn(null);
    setActiveCard(null);
    console.log("end");

    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (active.data.current?.type === "column") {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      dispatch(swapColumns({ activeColumnIndex, overColumnIndex }));
    }

    if (active.data.current?.type === "card") {
      if (
        typeof active.data.current !== "undefined" &&
        typeof over.data.current !== "undefined"
      ) {
        const activeCard = active.data.current.card;
        const overCard = over.data.current.card;
        dispatch(swapCards({ activeCard, overCard }));
      }
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
        <SortableContext items={columnsIds}>
          <ul className="flex gap-7">
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
