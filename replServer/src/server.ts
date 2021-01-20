import { DataBase } from "josm"
import liveReloadServer from "./liveReloadServer"
let app = liveReloadServer("/")


const db = new DataBase({
  abc: {name: "Client1", val: 2}, 
  abc2: {name: "Client2", val: 4}
})

let i = 0
app.ws("/admin", (ws) => {
  const clientNum = i++
  console.log("opening client " + clientNum)
  const sub = db((q, diff) => {
    ws.send(JSON.stringify(diff))
  }, true, true)


  ws.on("message", (e) => {
    sub.deactivate()
    db(JSON.parse(e as any))
    sub.activate(false)
  })
  
})





