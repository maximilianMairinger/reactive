import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { DataBase } from "josm"



export default class Client extends Component {

  constructor(db: DataBase<{name: string, val: number}>) {
    super()

    

  }

  stl() {
    return require("./client.css")
  }
  pug() {
    return require("./client.pug")
  }
}

declareComponent("client", Client)
