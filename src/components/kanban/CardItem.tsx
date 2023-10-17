import { Card } from "@/store/features/cardsSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const CardItem = ({ card }: {card: Card}) => {
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

  if (isDragging)
    return (
      <div className="opacity-30 w-full p-2 mb-2 rounded-lg border border-pink" ref={setNodeRef} style={style}>
        <p className="overflow-hidden text-transparent">{card.title}</p>
      </div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full bg-[#432b5e] resize-none p-2 rounded-lg mb-2"
    >
      <p className="overflow-hidden">{card.title}</p>
    </div>
  );
};
