import ajaon from "ajaon"
import edom from "extended-dom"
const wsUrl = (document.location.protocol === "https:" ? "wss://" : "ws://") + document.location.host


document.body.css({
  background: "black",
  color: "white",
  padding: 100,
  fontWeight: "bold",
  fontFamily: "sans-serif",
  fontSize: 24
})
document.body.txt("Open console")

let { post, get } = ajaon();


const input = document.createElement("input")
document.body.apd(input as any);

input.on("change", async () => {
  const ws = new WebSocket(wsUrl + "/" + input.value);
  let i = 1
  let pid: any
  ws.addEventListener("open", () => {
    console.log("open")
    pid = setInterval(() => {
      console.log("Sending hello " + i)
      ws.send(`Hello ${i++}`)
    }, 1000)
  })
  ws.addEventListener("close", () => {
    clearInterval(pid)
    console.log("closing")
  })
})
