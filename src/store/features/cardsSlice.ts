import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PayloadCard {
  title: string;
  columnId: number;
}
export interface Card extends PayloadCard {
  id: number;
}

type CardsState = {
  cards: Card[];
};

type RelocateCard = {
  activeCard: Card;
  columnId: number;
};

type SwipeCards = {
  activeCard: Card;
  overCard: Card;
};

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<PayloadCard>) => {
      state.cards = [
        ...state.cards,
        {
          id: Date.now(),
          title: action.payload.title,
          columnId: action.payload.columnId,
        },
      ];
    },

    changeTitle: (state, action: PayloadAction<Card>) => {
      state.cards = state.cards.map((card) => {
        if (action.payload.id === card.id) {
          return {
            ...card,
            title: action.payload.title,
          };
        }
        return card;
      });
    },

    swapCards: (state, action: PayloadAction<SwipeCards>) => {
      const { activeCard, overCard } = action.payload;
      const activeCardIndex = state.cards.findIndex(
        (card) => card.id === activeCard.id
      );
      const overCardIndex = state.cards.findIndex(
        (card) => card.id === overCard.id
      );

      state.cards = state.cards.map((card, index) => {
        if (index === activeCardIndex) {
          return { ...overCard, columnId: activeCard.columnId };
        }
        if (index === overCardIndex) {
          return { ...activeCard, columnId: overCard.columnId };
        }
        return card;
      });
    },

    // swapCardsInDifferentColumn: (state, action) => {

    // },

    relocateCard: (state, action: PayloadAction<RelocateCard>) => {
      state.cards = state.cards.map((card) => {
        if (action.payload.activeCard.id === card.id) {
          return {
            ...card,
            columnId: action.payload.columnId,
          };
        }
        return card;
      });
    },


  },
});

export const { addCard, changeTitle, swapCards, relocateCard } =
  cardsSlice.actions;

export default cardsSlice.reducer;
