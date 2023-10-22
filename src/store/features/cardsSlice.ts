import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Column } from "./types/types";

interface PayloadCard {
  title: string;
  columnId: number;
}
export interface Card extends PayloadCard {
  id: number;
  description: string
}

type CardsState = {
  cards: Card[];
};

type RelocateCard = {
  activeCard: Card;
  overColumn: Column;
};

type SwipeCards = {
  activeCard: Card;
  overCard: Card;
};

type ChangeTitleType = {
  title: string
  id: number
}
type ChangeDescriptionType = {
  description: string
  id: number
}

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
          description: ''
        },
      ];
    },

    changeTitle: (state, action: PayloadAction<ChangeTitleType>) => {
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
    changeDescription: (state, action: PayloadAction<ChangeDescriptionType>) => {
      state.cards = state.cards.map((card) => {
        if (action.payload.id === card.id) {
          return {
            ...card,
            description: action.payload.description,
          };
        }
        return card;
      });
    },

    swapCards: (state, action: PayloadAction<SwipeCards>) => {
      const { activeCard, overCard } = action.payload;
      console.log('swap')
      const activeCardIndex = state.cards.findIndex(
        (card) => card.id === activeCard.id
      );
      const overCardIndex = state.cards.findIndex(
        (card) => card.id === overCard.id
      );

      state.cards[activeCardIndex] = {...overCard, columnId: activeCard.columnId}
      state.cards[overCardIndex] = {...activeCard, columnId: overCard.columnId}
    },

    relocateCard: (state, action: PayloadAction<RelocateCard>) => {
      const {activeCard, overColumn} = action.payload;
      const newColumnId = overColumn.id;

      state.cards = state.cards.map((card) => {
        if (card.id === activeCard.id) {
          return {...card, columnId: newColumnId}
        }
        return card;
      })
    },

    relocateCardToColWithCards: (state, action: PayloadAction<SwipeCards>) => {
      const {activeCard, overCard} = action.payload;

      const newColumnId = overCard.columnId;
      const activeIndex = state.cards.findIndex((card) => card.id === activeCard.id);

      state.cards.splice(activeIndex, 1)
      state.cards.push({...activeCard, columnId: newColumnId})
    }
  },
});

export const { addCard, changeTitle, swapCards,relocateCardToColWithCards, relocateCard, changeDescription } =
  cardsSlice.actions;

export default cardsSlice.reducer;
