
import "./App.css";
import { TitleBar } from "./components/TItlebar";
import { Pet } from "./components/Pet";
import { useState } from "react";
import { Base } from "./components/Base";
import { Select } from "./components/Select";
import { Music } from "./components/Music";
function App() {

let [atual, setatual] = useState('')
const params = new URLSearchParams(
  window.location.search
)
 
const view = params.get('view')
if (view === 'music'){
  return <Music atual={atual}/>
}
if(view === "select"){
  return <Select atual={atual} setatual = { setatual}/>
}
return <Base/>
}
export default App;
