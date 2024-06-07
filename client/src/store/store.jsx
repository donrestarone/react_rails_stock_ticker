import { configureStore } from "@reduxjs/toolkit";
import tickerReducer from './slice'

const store = configureStore({ reducer: { tickers: tickerReducer } })

export default store