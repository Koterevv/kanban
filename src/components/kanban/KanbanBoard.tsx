"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { swapColumns } from "@/store/features/columnsSlice";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
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
import {
  Card,
  relocateCard,
  swapCards
} from "@/store/features/cardsSlice";
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

  // const onDragOver = (e: DragOverEvent): void => {
  //   const { active, over } = e;

  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;

  //   if (active.data.current?.type && over.data.current?.type) {
  //     if (activeId === overId) return;

  //     const activeType = active.data.current.type;
  //     const overType = over.data.current.type;

  //     // console.log("over", activeType, overType);

  //     if (activeType === "card" && overType === "card") {
  //       const activeCard = active.data.current.card;
  //       const overCard = over.data.current.card;
  //       dispatch(swapCards({ activeCard, overCard }));
  //     }
  //   }
  // };

  const onDragMove = (e: DragMoveEvent): void => {
    const { active, over } = e;

    if (!over) return;

    if (active.id === over.id) return;

    if (active.data.current?.type && over.data.current?.type) {
      const activeType = active.data.current.type;
      const overType = over.data.current.type;

      // Handle Card Sorting
      if (activeType === "card" && overType === "card") {
        const activeCard = active.data.current.card;
        const overCard = over.data.current.card;

        // console.log("move", activeCard, overCard);
        const activeColumn = columns.find(
          (column) => column.id === activeCard.columnId
        );
        const overColumn = columns.find(
          (column) => column.id === overCard.columnId
        );

        // console.log("move", activeColumn, overColumn);

        if (!activeColumn || !overColumn) return;

        // Find the index of the active and over column
        // const activeColumnIndex = columns.findIndex(
        //   (column) => column.id === activeColumn.id
        // );
        // const overColumnIndex = columns.findIndex(
        //   (column) => column.id === overColumn.id
        // );

        // Find the index of the active and over card
        // const activeCardIndex = cards.findIndex(
        //   (card) => card.id === active.id
        // );
        // const overCardIndex = cards.findIndex(
        //   (card) => card.id === over.id
        // );
        // --- In the same container ---
        // if (activeColumnIndex === overColumnIndex) {
        dispatch(swapCards({ activeCard, overCard }));
        // } else {
        //   dispatch(swapCardsInDifferentColumn())
        // }

        // } else {
        // --- In different containers ---
        // let newItems = [...containers];
        // const [removeditem] = newItems[activeContainerIndex].items.splice(
        //   activeitemIndex,
        //   1
        // );
        // newItems[overContainerIndex].items.splice(
        //   overitemIndex,
        //   0,
        //   removeditem
        // );
        // setContainers(newItems);
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

    if (
      active.data.current?.type === "card" &&
      over.data.current?.type === "column"
    ) {
      const activeCard = active.data.current.card;
      const columnId = over.data.current.column.id;
      console.log(
        "over card and column",
        activeCard.columnId,
        over.data.current.column.id
      );
      dispatch(relocateCard({ activeCard, columnId }));
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
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        // onDragOver={onDragOver}
      >
        <SortableContext
          items={columnsIds}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="flex">
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
