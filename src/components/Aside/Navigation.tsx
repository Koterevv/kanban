import Link from "next/link";
import { BsFillKanbanFill } from "react-icons/bs";
import { LinkItem } from "./LinkItem";

interface Props {}

const links = [
  { link: "/board", title: "Kanban Board", icon: BsFillKanbanFill },
];

export const Navigation = async ({}: Props) => {
  return (
    <aside className="bg-deep-indigo">
      <nav className="p-2">
        {links.map((link) => {
          return <LinkItem key={link.link} icon={link.icon} link={link.link}>{link.title}</LinkItem>;
        })}
      </nav>
    </aside>
  );
};
