import { getCurrentWindow } from "@tauri-apps/api/window";

export const TitleBar = () => {
  const janela = getCurrentWindow();

  const minimizar = () => {
    janela.minimize();
  };

  const fechar = () => {
    janela.close();
  };

  return (
    <div className="titlebar" data-tauri-drag-region>
      <span className="titlebar-title" data-tauri-drag-region>
        teste da new barra
      </span>

      <div className="window-controls">
        <button
          className="window-btn minimize"
          onClick={minimizar}
          aria-label="Minimizar janela"
        >
          −
        </button>

        <button
          className="window-btn close"
          onClick={fechar}
          aria-label="Fechar janela"
        >
          ×
        </button>
      </div>
    </div>
  );
};
