import { Card } from "@/store/features/cardsSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as React from "react";
import { CardModal } from "./Modal/CardModal";
import { useAppDispatch } from "@/hooks/hooks";
import { toggleDndDisabled } from "@/store/features/dndSlice";

export const CardItem = ({ card }: { card: Card }) => {
  const [isModalActive, setIsModalActive] = React.useState<boolean>(false);
  const dispatch = useAppDispatch()
  // const toggleModal = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   setIsModalActive(!isModalActive);
  // };

  const openModal = (): void => {
    setIsModalActive(true);
    dispatch(toggleDndDisabled())
  };
  const closeModal = (): void => {
    setIsModalActive(false);
    dispatch(toggleDndDisabled())
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={
          isDragging ? "card opacity-40 border border-[#A6A6ED]" : "card"
        }
        onClick={openModal}
      >
        <p className="card-text">{card.title}</p>
      </div>
      {isModalActive && 
        <CardModal card={card} onClose={closeModal}/>
        }
        {/*  <Modal isOpen={isModalActive} onRequestClose={closeModal}>
           <CardModal card={card} handleClick={closeModal} />
         </Modal> */}
      {/* {!isModalActive
        ? null
      : <CardModal card={card} handleClick={toggleModal}/>
      } */}
    </>
  );
};
