import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { DataBase } from "josm"

const db = new DataBase({})
const ws = new WebSocket((document.location.protocol === "https:" ? "wss://" : "ws://") + document.location.host + "/client")
ws.addEventListener("message", ({ data }) => {
  data(JSON.parse(data, (k, v) => v === null ? undefined : v))
})





export default class Site extends Component {

  private elementMap: {[key in string]: Element}
  constructor() {
    super()

    
    db((data: any, diff: any) => {
      for (let hash in diff) {
        if (diff[hash] === undefined) this.elementMap[hash].remove()
        else 
      }
    }, true)

  }

  stl() {
    return require("./site.css")
  }
  pug() {
    return require("./site.pug")
  }
}

declareComponent("site", Site)
