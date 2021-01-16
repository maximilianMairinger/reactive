import ajaon from "ajaon"
import edom, { ElementList } from "extended-dom"
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



const btnAdmin = document.createElement("button").txt("admin")
const btnClient = document.createElement("button").txt("client")

document.body.apd(document.createElement("br"), btnAdmin as any, btnClient);


let id = {admin: 0, client: 0}
new ElementList(btnAdmin, btnClient).on("click", async (e) => {
  const url = e.target.txt()
  const ws = new WebSocket(wsUrl + "/" + url);
  const myId = id[url]++
  
  ws.addEventListener("open", () => {
    console.log("open", url, myId)
  })
  ws.addEventListener("close", () => {
    console.log("close", url, myId)
  })
})
