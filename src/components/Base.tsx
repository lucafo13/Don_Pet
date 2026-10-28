import { TitleBar } from "./TItlebar"
import { useState } from "react"
import { Pet } from "./Pet"
export const Base = () => {
    let [musga, setMusga] = useState(false)
    
    return (


        <>
  <TitleBar/>
    <main className="container">
      <h1>Don quixote</h1>
      <Pet musga={musga} setMusga={setMusga}/>
    </main>
    </>
    ) 
}