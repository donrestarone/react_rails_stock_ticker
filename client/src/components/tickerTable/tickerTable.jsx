import './tickerTable.css'

function TickerTable(props) {

  const renderTicker = () => {
    const ticker = props.tickers.find(ticker => ticker.name == props.tickerName)
    if (ticker) {
      return (
        <table>
          <tr className='ticker-header'>
            <th>Item</th>
            <th>Maximum</th>
            <th>Minimum</th>
            <th>Average</th>
          </tr>
          <tr>
            <td>Price</td>
            <td>${ticker.price.maximum}</td>
            <td>${ticker.price.minimum}</td>
            <td>${ticker.price.average}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{ticker.volume.maximum}</td>
            <td>{ticker.volume.minimum}</td>
            <td>{ticker.volume.average}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      )
    } else if (props.tickerName == '') {
      return <p>please enter a ticker name and hit submit</p>
    } else {
      return <p>loading</p>
    }
  }

  return (
    <>
      <div className="main">
        {renderTicker()}
      </div>
    </>
  )
}

export default TickerTable