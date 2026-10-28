import donq from "../assets/test.jpg"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import gif from '../assets/don-quixote.gif'
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import car from '../assets/imagem.jpg'
type musica = {
  musga: boolean,
  setMusga: React.Dispatch<React.SetStateAction<boolean>>
}
export const Pet = ({musga, setMusga}: musica) => {
      const [ent, setEnt] = useState(false)
  let [danc, setD] = useState(false)

  const [carinhox, setCarinho] = useState(false);
  let dance = "https://media1.tenor.com/m/B-EMm24pVcAAAAAd/don-quixote-dance.gif"
    const imagemAtual = danc
    ? dance
    : ent
      ? gif
      : carinhox
        ? car
        : donq
        ;

  const carinho = () => {
    setCarinho((atual) => !atual)
  }
  
const mitose = () => {
   const novaJanela = new WebviewWindow(
    `don-${Date.now()}`,
    {
      url: "index.html",
      title: "Don Quixote assist",
      width: 320,
      height: 420,

      alwaysOnTop: true,
      resizable: false,
    }
  );

  novaJanela.once("tauri://error", (event) => {
    console.error("Erro ao criar janela:", event);
  });
}


const abrirMusica = () => {
  const musica = new WebviewWindow("janela-musica", {
    url: "index.html?view=music",
    title: "Don's Music",
    width: 320,
    height: 450,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
  });

  musica.once("tauri://error", (error) => {
    console.error("Erro ao abrir música:", error);
  });
};

    return (
        <>
        
            <div className="don">
        <img id="img" onMouseEnter={() => {setEnt(true)}} onMouseLeave={() => {setEnt(false)}}  src={imagemAtual} alt="DOnquixote" />
      </div>
      <br />
        <h2>{ent ? "Fazendo carinhoo.. " : "Nada ainda"}</h2>
      <div className="action">
        
        <button onClick={mitose}>Mitose</button>
        <button onClick={abrirMusica}>Carinho</button>          
        <button onClick={() => setD((atual) => !atual)}>
            {danc ? "Parar dança" : "morte"}
          </button>
      </div>
        </>
    )
}