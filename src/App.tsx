
import "./App.css";
import { TitleBar } from "./components/TItlebar";
import { Pet } from "./components/Pet";
import { useState } from "react";
import { Base } from "./components/Base";
import { Music } from "./components/Music";
function App() {


const params = new URLSearchParams(
  window.location.search
)
 
const view = params.get('view')
if (view === 'music'){
  return <Music/>
}
return <Base/>
}
export default App;
