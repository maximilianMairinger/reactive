import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { DataBase } from "josm"
import "./../counter/counter"
import Counter from "./../counter/counter"



export default class Client extends Component {

  private nameElem = this.q("name-heading")

  constructor(db: DataBase<{name: string, val: number}>) {
    super()

    this.nameElem.txt(db.name)
    
    this.apd(new Counter(db.val))

  }

  stl() {
    return require("./client.css")
  }
  pug() {
    return require("./client.pug")
  }
}

declareComponent("client", Client)
