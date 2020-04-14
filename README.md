# Websocket instrumentation tool

Take over debug through websockets.

## Disclaimer

:warning: WIP

## Before

Don't forget to :

```
npm i
```

## Server

### Dev

```
npm run dev
```

### Production

```
npm start
```
## Client

Change in `script/inject.js` websocket url corresponding to server.
Put a script tag in your html :

```
<script type="text/javascript" scr="path/to/inject.js"></script>
```