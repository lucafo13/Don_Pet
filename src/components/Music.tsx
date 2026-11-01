// import { useState, useEffect } from "react"
import '../App.css'
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { listen } from '@tauri-apps/api/event';
import img from '../assets/don-quixote.gif'
import { convertFileSrc } from "@tauri-apps/api/core";
import { TitleBar } from "./TItlebar"
import { useEffect, useState, useRef } from 'react';
export const Music = ({atual}:any) => {
    const tocadento = async(caminho: string, nome: string) => {
         if (!audioRef.current) return;
    
        audioRef.current.src = convertFileSrc(caminho);
        try {
            
            await audioRef.current.play();
            setTocando(true);
        } catch (error) {
            return
        }
    }
    const [at, setAt] = useState('')
    const [path, setPath] = useState('')
    const [tocando, setTocando] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let stop: (() => void) | undefined

        listen('selected', async (event) => {
            const data = event.payload as {
                nome: string,
                caminho: string
            }
            setAt(data.nome)
            setPath(data.caminho)
            await tocadento(data.caminho, data.nome)
        }).then((unlisten) => {
            stop = unlisten
        })
        return () => {stop?.()}

    }, [])
    const abirSeletor = () => {
    new WebviewWindow("janela-musica-2", {
    url: "index.html?view=select",
    title: "Don's Music",
    width: 320,
    height: 320,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
  })
  
}
const mechernosom = async() => {
    if(!audioRef.current){
        return
    }
    if(tocando){
        audioRef.current.pause()
    }
    else{
        try {
          await  audioRef.current.play()
        } catch (error) {
            console.log(error);
            
        }
    }
}

    return(
    <>
    
     <audio
          ref={audioRef}
          onEnded={() => setTocando(false)}
          onPause={() => setTocando(false)}
          onPlay={() => setTocando(true)}
        />
    <TitleBar/>
    <br />
    <main className='container'>

        <h1>{at || "Musgas da don"}</h1>
        <div className="don">

        <img src={img} alt="" onClick={abirSeletor} />
        </div>
        <br />

    <div className="musics">
           <button>⏮</button>
        <button onClick={mechernosom}>{tocando ? "⏸" : "▶"}</button>
        <button>⏭</button>
    </div>
    </main>
    </>
    )
}