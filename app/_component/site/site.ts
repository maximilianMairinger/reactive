import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { DataBase } from "josm"
import Client from "./../client/client"

const db = new DataBase({})
const ws = new WebSocket((document.location.protocol === "https:" ? "wss://" : "ws://") + document.location.host + "/admin")

console.log((document.location.protocol === "https:" ? "wss://" : "ws://") + document.location.host + "/admin")
ws.addEventListener("open", () => {
  ws.addEventListener("message", ({ data }) => {
    db(JSON.parse(data, (k, v) => v === null ? undefined : v))
  })

  ws.send("hello")
})








export default class Site extends Component {

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
            this.componentBody.apd(elem)
          })
        }
      }
    }, false)

  }

  stl() {
    return require("./site.css")
  }
  pug() {
    return require("./site.pug")
  }
}

declareComponent("site", Site)
