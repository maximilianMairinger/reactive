import liveReloadServer from "./liveReloadServer"
let app = liveReloadServer("/")


app.ws("/admin", (ws) => {
  ws.send(JSON.stringify({
    abc: {name: "Client1", val: 2}, 
    abc2: {name: "Client2", val: 4}
  }))
  
  let n = 0
  const pid = setInterval(() => {
    ws.send(JSON.stringify({abc2: {name: "client " + (n++)}}))
  }, 5000)

  ws.on("close", () => {
    clearInterval(pid)
  })

  console.log("open")
  ws.on("message", (e) => {
    console.log("msg", e.data)
  })
  
})



