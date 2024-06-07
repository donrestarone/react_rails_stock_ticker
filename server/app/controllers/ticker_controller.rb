include ActionView::Helpers::NumberHelper

class TickerController < ApplicationController
  def index
    if !ENV['POLYGON_API_KEY']
      render json: {error: true, message: "polygon API key not set, please set API key in server environment"}
      return 
    end
    
    body = nil
    ticker_name = params[:ticker_name] ? params[:ticker_name] : 'AAPL'

    # to stub results for fast front-end dev set stubbing_for_performance to true
    stubbing_for_performance = false
    json_file = File.open(Rails.root.join('db/polygon-aapl-data.json'))
    if stubbing_for_performance && json_file
      body = JSON.load(json_file)
    else
      endpoint = "https://api.polygon.io/v2/aggs/ticker/#{ticker_name}/range/1/day/2023-01-01/2023-12-31?apiKey=#{ENV['POLYGON_API_KEY']}"
      response = HTTParty.get(endpoint)
      body = JSON.parse(response.body)
    end
    
    if !body["results"]
      if body["status"] == 'ERROR'  
        render json: {error: true, message: body["error"]}
        return 
      else
        # OK but no results
        render json: {error: true, message: "ticker name not found, please double check name and try again"}
        return 
      end
    end

    # get C number closing price for the given period
    prices = body["results"].map{|trading_day| trading_day["c"]}.sort
    # get V number trading volume for the given period
    volumes = body["results"].map{|trading_day| trading_day["v"]}.sort

    output = {
      ticker: {
        name: ticker_name,
        price: {
          minimum: prices.first,
          maximum: prices.last,
          average: (prices.inject{ |sum, el| sum + el }.to_f / prices.size ).round(2)
        },
        volume: {
          minimum: number_with_delimiter(volumes.first, delimiter: ','),
          maximum: number_with_delimiter(volumes.last, delimiter: ','),
          average: number_with_delimiter((volumes.inject{ |sum, el| sum + el }.to_f / volumes.size).round(2), delimiter: ',')
        }
      }
    }
    render json: output
  end
end
