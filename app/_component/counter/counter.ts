import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { Data, DataBase } from "josm"
import Input from "./../input/input"




export default class Counter extends Component {

  constructor(count: Data<number>) {
    super(false)

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


    const onInp = (c) => {
      debugger
      console.log("c", c, !isNaN(c as number))
      if (!isNaN(c as number)) {
        countSub.deactivate()
        count.set(c as number)
        countSub.activate(false)
      }
      
    }

    inp.onInput(onInp)

    const countSub = count.get((count) => {
      debugger
      inp.offInput(onInp)
      inp.value(count)
      inp.onInput(onInp)
    })



    

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



