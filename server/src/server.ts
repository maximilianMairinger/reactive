import { configureExpressApp } from "./../../server/src/setup"
import expressWs from "express-ws"
import LinkedList from "fast-linked-list"
import { Data, DataBase, DataBaseSubscription } from "josm"
import hash from "./hash"


const app = configureExpressApp("/", "public", undefined, (app) => {expressWs(app)}) as ReturnType<typeof configureExpressApp> & { ws: (route: string, fn: (ws: WebSocket & {on: WebSocket["addEventListener"], off: WebSocket["removeEventListener"]}, req: any) => void) => void }



const clients: DataBase<{[identifier: string]: {val: Data<number>, name: Data<string>}}> = new DataBase({}) as any;


app.ws("/admin", (ws) => {
  console.log("admin connect")
  let sub: DataBaseSubscription<any> = clients((clients: any, diff: any) => {
    try {
      ws.send(JSON.stringify(diff, (k, v) => v === undefined ? null : v))
    }
    catch(e) {}
    
  }, true, true)

  
  ws.on("message", (diff) => {
    console.log("msgAdmin", diff)
    try {
      clients(JSON.parse(diff as any, (k, v) => v === null ? undefined : v))
    }
    catch(e) {
      clients(JSON.parse(diff.data as any, (k, v) => v === null ? undefined : v))
    }
    
  })


  const close = () => {
    console.log("bye", "admin")
    sub.deactivate()
  }

  ws.on("error", close)
  ws.on("close", close)
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

  const sub1 = me.val.get((val) => {
    try {
      ws.send(JSON.stringify({val}))
    }
    catch(e) {

    }
  })
  const sub2 = me.name.get((name) => {
    try {
      ws.send(JSON.stringify({name})) 
    }
    catch(e) {
      
    }
  })
  
  
  ws.on("message", (e) => {
    console.log("msg client", e)
    let msg;
    try {
      msg = JSON.parse(e as any)
    }
    catch(e) {
      msg = JSON.parse(e.data as any)
    }
    
    for (let k in msg) {
      if (me[k]) me[k].set(msg[k])
    }
  })


  const close = () => {
    console.log("bye", h)
    sub1.deactivate()
    sub2.deactivate()
    const o = {}
    o[h] = undefined
    clients(o)
  }

  ws.on("error", close)
  ws.on("close", close)
})


