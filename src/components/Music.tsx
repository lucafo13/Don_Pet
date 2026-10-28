// import { useState, useEffect } from "react"
import '../App.css'
import img from '../assets/don-quixote.gif'
import { TitleBar } from "./TItlebar"
export const Music = () => {

    return(
    <>
    <TitleBar/>
    <br />
    <main className='container'>

        <h1>Musicas da don</h1>
        <div className="don">

        <img src={img} alt="" />
        </div>
        <br />

    <div className="musics">
           <button>⏮</button>
        <button>▶</button>
        <button>⏭</button>
    </div>
    </main>
    </>
    )
}