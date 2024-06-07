import { useState, useEffect } from 'react'
import './App.css'

import { useDispatch, useSelector } from "react-redux";
import { addToTickers, changeTickerName } from "./store/slice";
import TickerTable from './components/tickerTable/tickerTable';


function App() {
  const [tickerInput, setTickerInput] = useState('AAPL')

  const dispatch = useDispatch();

  const tickers = useSelector((state) => state.tickers.tickers);
  const tickerName = useSelector((state) => state.tickers.tickerName);

  useEffect(() => {
    getTickerData(tickerName)
  }, [])

  const getTickerData = (ticker) => {
    const response = fetch(`http://localhost:3000/?ticker_name=${ticker}`)
      .then(res => res.json())
      .then((body) => {
        if (body.error) {
          window.alert(body.message)
        } else {
          // success
          dispatch(
            addToTickers(body.ticker)
          );
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = tickerInput.toUpperCase()
    dispatch(
      changeTickerName(value)
    );
    // use redux cache, if ticker data exists on client
    const tickerExists = tickers.find(ticker => ticker.name == value)
    if (!tickerExists) {
      console.log(value, 'cache missed, retrieving from server')
      getTickerData(value)
    } else {
      console.log(tickerExists, 'matched ticker in redux')
    }
  }

  return (
    <>
      <form className='stock-form'>
        <p>Enter a Stock Ticker</p>
        <input placeholder={tickerName} onSubmit={handleSubmit} onChange={(e) => setTickerInput(e.target.value)} value={tickerInput}></input>
        <button type="submit" onClick={handleSubmit}>Search</button>
      </form>
      <div className="main">
        <TickerTable tickerName={tickerName} tickers={tickers} />
      </div>
    </>
  )
}

export default App
