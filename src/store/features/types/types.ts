export type Column = {
  id: number;
  title: string;
};

export type Card = {
  id: number
  title: string;
  columnId: number;
}
