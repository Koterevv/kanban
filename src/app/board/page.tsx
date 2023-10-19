
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default async function BoardPage () {
  
  return (
    <div className="w-[calc(100wh-144px)] overflow-hidden">
      <KanbanBoard/>
    </div>
  );
}
