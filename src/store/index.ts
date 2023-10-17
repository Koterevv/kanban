import { configureStore } from '@reduxjs/toolkit'
import columns from './features/columnsSlice'
import cards from './features/cardsSlice'

export const store = configureStore({
  reducer: {
    columns,
    cards,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

