import { Card } from "@/store/features/cardsSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const CardItem = ({ card }: { card: Card }) => {
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? "card opacity-40 border border-[#A6A6ED]" : "card"}
    >
      <p className="card-text">{card.title}</p>
    </div>
  );
};
