import { configureExpressApp } from "./../../server/src/setup"
import expressWs from "express-ws"
const app = configureExpressApp("/", "public", undefined, (app) => {expressWs(app)}) as ReturnType<typeof configureExpressApp> & { ws: (route: string, fn: (ws: WebSocket & {on: WebSocket["addEventListener"], off: WebSocket["removeEventListener"]}, req: any) => void) => void }


let admins = 1
app.ws("/admin", (ws) => {
  
  const c = admins
  ws.on("message", (e) => {
    console.log(e, "from admin " + c)
  })

  console.log("admin connected", admins++)
})

let clients = 1
app.ws("/client", (ws) => {
  
  const c = clients
  ws.on("message", (e) => {
    console.log(e, "from client " + c)
  })
  console.log("client connected", clients++)
})


app.post("/echo", (req, res) => {
  console.log("post")
  res.send(req.body)

})


