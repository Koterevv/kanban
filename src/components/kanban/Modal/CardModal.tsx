import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useDebounced } from "@/hooks/useDebounced";
import { Card, changeDescription, changeTitle } from "@/store/features/cardsSlice";
import * as React from "react";
import { MdTitle } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdSubtitles } from "react-icons/md";

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export const CardModal = ({ card, onClose }: CardModalProps) => {
  const [title, setTitle] = React.useState(card.title);
  const [description, setDescription] = React.useState(card.description);
  const titleDebounced = useDebounced(title);
  const descriptionDebounced = useDebounced(description);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(changeTitle({ title: titleDebounced, id: card.id }));
    dispatch(changeDescription({description: descriptionDebounced, id: card.id}))
  }, [titleDebounced, descriptionDebounced]);

  return (
    <div
      className="absolute left-0 top-0 right-0 bottom-0 bg-black/70 flex items-center justify-center cursor-auto backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-1/2 bg-black-indigo rounded-xl p-3"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <form action="">
          <div className="flex gap-2 items-start mb-5">
            <div className="text-2xl p-1">
              <MdTitle />
            </div>
            <textarea
              className="w-full bg-transparent resize-none text-xl h-32"
              name=""
              value={title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTitle(e.target.value)
              }
            />
            <div
              className="hover:bg-white/30 p-2 text-2xl rounded-full justify-self-start"
              onClick={onClose}
            >
              <IoClose />
            </div>
          </div>
          <div className="flex items-start gap-2 ">
            <div className="text-2xl p-1">
              <MdSubtitles />
            </div>
            <div className="grow">
              <label htmlFor="description text-xl" className="text-xl">Description</label>
              <textarea
                className="w-full bg-transparent resize-none text-base h-auto overflow-hidden"
                name="description"
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
