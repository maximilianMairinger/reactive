import { configureExpressApp } from "./../../server/src/setup"
import expressWs from "express-ws"
import LinkedList from "fast-linked-list"
import { Data, DataBase } from "josm"
import hash from "./hash"


const app = configureExpressApp("/", "public", undefined, (app) => {expressWs(app)}) as ReturnType<typeof configureExpressApp> & { ws: (route: string, fn: (ws: WebSocket & {on: WebSocket["addEventListener"], off: WebSocket["removeEventListener"]}, req: any) => void) => void }



const clients: DataBase<{[identifier: string]: {val: Data<number>, name: Data<string>}}> = new DataBase({}) as any;


app.ws("/admin", (ws) => {
  console.log("admin connect")
  clients((clients: any, diff: any) => {
    ws.send(JSON.stringify(diff, (k, v) => v === undefined ? null : v))
  }, true)

  ws.on("message", ({ data: diff}) => {
    clients(JSON.parse(diff, (k, v) => v === null ? undefined : v))
  })
})



app.ws("/client", (ws) => {
  console.log("client connect")

  const c = {}
  const h = hash()
  
  c[h] = {
    val: 0, 
    name: ""
  }


  const me = clients(c)[h]

  const sub1 = me.val.get((val) => {ws.send(JSON.stringify({val}))})
  const sub2 = me.name.get((name) => {ws.send(JSON.stringify({name}))})
  
  
  ws.on("message", (e) => {
    const msg = JSON.parse(e.data)
    for (let k in msg) {
      if (me[k]) me[k].set(msg[k])
    }
  })


  const close = () => {
    sub1.deactivate()
    sub2.deactivate()
    const o = {}
    o[h] = undefined
    clients(o)
  }

  ws.on("error", close)
  ws.on("close", close)
})


