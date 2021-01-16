import liveReloadServer from "./liveReloadServer"
let app = liveReloadServer()


app.ws("admin", (ws) => {
  ws.send(JSON.stringify({abc: {name: "Client1", val: 2}}))
})



