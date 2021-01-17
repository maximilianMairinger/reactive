import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { Data, DataBase } from "josm"
import Input from "./../input/input"




export default class Counter extends Component {

  constructor(public count: Data<number>) {
    super()

    const counter = ce("counter-wrapper")

    const counterPlus = ce("counter-plus").addClass("count")
    counterPlus.innerHTML = require("./icon/plus.pug").default
    counterPlus.on("click", () => {
      inp.value(inp.value() as number + 1)
      inp.select()
    })
    counter.apd(counterPlus)
    

    //@ts-ignore
    const inp = new Input(undefined, "number", undefined, undefined, (n: number) => {
      if (!isNaN(n)) {
        if (n < 0) {
          return "Positive Zahl erwartet"
        }
        if (n > 999) {
          return "Das scheint unrealistisch hoch zu sein"
        }
      }
    }, (e) => {
      if (e === 0) return ""
    })  


    const onInput = (e) => {
      inputCountSub.deactivate()
      count.set(e as number)
      inputCountSub.activate(false)
    }
    inp.onInput(onInput)
    
    let inputCountSub = new Data().get((e) => {
      inp.offInput(onInput)
      inp.value(e as number)
      inp.onInput(onInput)
    }, false)

    

    counter.apd(inp)
    const counterMinus = ce("counter-minus").addClass("count")
    counterMinus.innerHTML = require("./icon/minus.pug").default
    counterMinus.on("click", () => {
      inp.value(inp.value() as any as number - 1)
      inp.select()
    })
    counter.apd(counterMinus)





    inp.on("click", () => {
      inp.focus()
    })

    counter.on("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
    })

    this.componentBody.apd(counter)

  }

  stl() {
    return require("./counter.css")
  }
  pug() {
    return ""
  }
}

declareComponent("counter", Counter)



