import { TitleBar } from "./TItlebar";
import { useEffect, useState, useRef } from "react";
import { readDir } from "@tauri-apps/plugin-fs";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "../App.css";
import { emit } from "@tauri-apps/api/event";
export const Select = ({atual, setatual}: any) => {
  const musgas = async () => {
    const files = await readDir(
      "C:/Users/Davi/Desktop/projs/donquixote/src/music",
    );
    console.log(files);
    const musguitas = files
      .filter((arq) => arq.name?.endsWith(".mp3"))
      .map((arq) => ({ nome: arq.name, caminho: `C:/Users/Davi/Desktop/projs/donquixote/src/music/${arq.name}` }));
    console.log(musguitas);
    return musguitas;
  };


  const janela = getCurrentWindow()


  const tocarMusica = async (caminho: string, nome: string) => {
   
      try {
    setatual(nome)
    await emit("selected",{nome: nome, caminho: caminho})
    janela.close()
    } catch (erro) {
      console.error("Erro ao reproduzir:", erro);
    }
  };

  const [musgass, setMusgas] = useState<{ nome: string, caminho: string }[]>([]);
  useEffect(() => {
    const start = async () => {
      let recebe = await musgas();
      setMusgas(recebe);
    };
    start();
  }, []);
  return (
    <>

      <main className="container2">
        <h1>Escolha a musica</h1>
        <div className="pack">

      {musgass.map((musg) => (
          <div className="mini" onClick={() => {tocarMusica(musg.caminho, musg.nome)}} key={musg.nome}>
    <span>{musg.nome}</span>

  </div>
))}
</div>
      </main>
    </>
  );
};