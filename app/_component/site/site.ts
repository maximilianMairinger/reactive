import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { DataBase } from "josm"
import Client from "./../client/client"
import Notifier from "../../lib/notifier"

const db = new DataBase({})
const ws = new WebSocket((document.location.protocol === "https:" ? "wss://" : "ws://") + document.location.host + "/admin")

console.log((document.location.protocol === "https:" ? "wss://" : "ws://") + document.location.host + "/admin")

let fatalError = false
ws.addEventListener("open", () => {
  
  const onMsg = ({ data: strData }) => {
    let data: any
    try {
      data = JSON.parse(strData, (k, v) => v === null ? undefined : v)
    }
    catch(e) {
      if (!fatalError) {
        Notifier.error("Internal Server Error", {duration: Infinity})
        fatalError = true
      }
      
      return
    }

    





    serverSub.deactivate()
    db(data)
    serverSub.activate(false)
  }
  ws.addEventListener("message", onMsg)

  ws.addEventListener("close", () => {
    Notifier.error("Lost connection to server", "Please reload this page to retry.", {duration: Infinity})
    
    ws.removeEventListener("message", onMsg)
    serverSub.deactivate()
  })


  let serverSub = db((data, diff) => {
    console.log("send diff", diff)
    ws.send(JSON.stringify(diff))
  }, true, false)
})








export default class Site extends Component {

  private clientsBody = this.q("clients-body")
  private elementMap: {[key in string]: Element} = {}
  constructor() {
    super()

    
    db((data: any, diff: any) => {
      for (let hash in diff) {
        if (diff[hash] === undefined) this.elementMap[hash].remove()
        else {
          setTimeout(() => {
            const elem = new Client(db[hash])
            this.elementMap[hash] = elem
            this.clientsBody.apd(elem)
          })
        }
      }
    }, false)



    this.apd(Notifier.queue)
  }

  stl() {
    return require("./site.css")
  }
  pug() {
    return require("./site.pug")
  }
}

declareComponent("site", Site)
