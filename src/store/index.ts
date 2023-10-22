import { configureStore } from '@reduxjs/toolkit'
import columns from './features/columnsSlice'
import cards from './features/cardsSlice'
import dnd from './features/dndSlice'

export const store = configureStore({
  reducer: {
    columns,
    cards,
    dnd,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

