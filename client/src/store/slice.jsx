import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tickers: [],
  tickerName: 'AAPL',
}

export const tickerSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    addToTickers: (state, action) => {
      const newTicker = action.payload
      const existingTickers = state.tickers
      const alreadyInTickers = existingTickers.find(ticker => ticker.name == newTicker.name)
      // deduplicate
      if (!alreadyInTickers) {
        state.tickers.push(newTicker)
      }

    },
    changeTickerName: (state, action) => {
      const tickerName = action.payload
      state.tickerName = tickerName
    }
  }
})

export const { addToTickers, changeTickerName } = tickerSlice.actions

export default tickerSlice.reducer