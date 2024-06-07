## Client setup

``` bash
cd client
npm install
npm run dev
```

## Server setup
set Polygon API key in local environment (depending on your shell, you can set it in `.bashrc` or `.zshrc`)
``` txt
export POLYGON_API_KEY="YOUR-API-KEY-HERE"
```

install dependencies and start server
``` bash
cd server
bundle install
rails s
```

## The app

visit http://localhost:5173/ to see the app in action

## Notes

1. the local variable `stubbing_for_performance` allows the server to stub its polygon API response to avoid hitting polygon API rate limits (in an attempt to accelerate frontend development)
2. The server will raise a REST API error if `POLYGON_API_KEY` is not, which will bubble up to the frontend and be presented to the user via a Javascript alert (API rate limits are bubbled up the same way)
3. The client will cache ticker data to make the UI performant and avoid sending unnecessary requests to the server