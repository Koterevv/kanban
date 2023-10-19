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
  prevIndex: number | null
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
          prevIndex: null
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
      console.log('swap')
      const activeCardIndex = state.cards.findIndex(
        (card) => card.id === activeCard.id
      );
      const overCardIndex = state.cards.findIndex(
        (card) => card.id === overCard.id
      );

      state.cards[activeCardIndex] = {...overCard, columnId: activeCard.columnId}
      state.cards[overCardIndex] = {...activeCard, columnId: overCard.columnId}
      // state.cards = state.cards.map((card, index) => {
      //   if (index === activeCardIndex) {
      //     return { ...overCard, columnId: activeCard.columnId };
      //   }
      //   if (index === overCardIndex) {
      //     return { ...activeCard, columnId: overCard.columnId };
      //   }
      //   return card;
      // });
    },

    // swapCardsInDifferentColumn: (state, action) => {

    // },

    relocateCard: (state, action: PayloadAction<RelocateCard>) => {
      const {activeCard, overColumn} = action.payload;

      const newColumnId = overColumn.id;
      // const activeIndex = state.cards.findIndex((card) => card.id === activeCard.id);

      state.cards = state.cards.map((card) => {
        if (card.id === activeCard.id) {
          return {...card, columnId: newColumnId}
        }
        return card;
      })
      

      // state.cards = state.cards.filter((card) => card.id !== activeCard.id);
      // state.cards.push({...activeCard, columnId})
      // state.cards.splice(activeIndex, 1)
      // state.cards.push({...activeCard, columnId})

      // state.cards = state.cards.map((card) => {
      //   if (card.id === action.payload.activeCard.id) {
      //     return {...card, columnId: action.payload.columnId}
      //   }
      //   return card
      // })
    },

    relocateCardToColWithCards: (state, action: PayloadAction<SwipeCards>) => {
      const {activeCard, overCard} = action.payload;

      const newColumnId = overCard.columnId;
      const activeIndex = state.cards.findIndex((card) => card.id === activeCard.id);

      state.cards.splice(activeIndex, 1)
      state.cards.push({...activeCard, columnId: newColumnId})

      // state.cards = state.cards.map((card) => {
      //   if (card.id === activeCard.id) {
      //     return {...card, columnId: newColumnId}
      //   }
      //   return card;
      // })
    }
  },
});

export const { addCard, changeTitle, swapCards,relocateCardToColWithCards, relocateCard } =
  cardsSlice.actions;

export default cardsSlice.reducer;
